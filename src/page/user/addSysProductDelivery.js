import ladderTable from '@/components/ladderTable/ladderTable.vue'
import mycity from '@/components/mycity/mycity.vue'
export default {
    name: 'addSysProductDelivery',
    data(){
        return{
            head:[
                /*
                    ismust      是否为必填
                    type        默认为输入框,text时为展示框,selectTime时为选择时间,city为可展开省市
                    inputType:"num/double"
                */
                {name:"目的地",code:"name",width:"120",type:"city"},
                {name:"配送时效(天) ",code:"agingNum",width:"100",inputType:"num"},
                {name:"首重",code:"startWeight",width:"100",inputType:"double",ismust:true},
                {name:"首重价（元）",code:"startCost",width:"100",ismust:true,inputType:"double"},
                {name:"续重范围（公斤）",code:"weightOne",width:"180",inputType:"double",ismust:true},
                {name:"续价（元/公斤）",code:"weightOneCost",width:"100",inputType:"double",ismust:true},
                {name:"线路折扣（%）",code:"lineDiscount",width:"100",inputType:"double"},
                {name:"生效时间",code:"takeEffectDate",width:"100",type:'selectTime'},


            ],
            selVal:'',
            obj:{
                agingNum:"",
                insuranceCost:"",
                lowestCost:"",
                takeEffectDate:"",
                priceType:"1",
            },
            cityId:this.$route.query.cityId,
            cityType:this.$route.query.cityType,
        }
    },
    mounted(){
        this.doQuerySysStaticData();
    },
    methods:{
        //赋值到表格
        setToTable(isSel,code,value){
            if(isSel){
                this.$refs.ladderTable.setRowValue(code,value);
            }
        },
        doSave:function(){
            let that = this;
            let ladderTable = this.$refs.ladderTable.getSelect();
            that.obj.ladderTable = JSON.stringify(ladderTable);
            that.obj.priceType=1;
            that.city =that.$refs.city.getData()
            that.obj.provinceId = that.city.ProvinceId;
            that.obj.cityId = that.city.CityId;
            that.obj.districtId = that.city.DistrictId;
            if(!that.common.isBlank(that.obj.provinceId)){
                that.obj.startCityType =1;
                that.obj.startCityId=that.obj.provinceId;
            }
            if(!that.common.isBlank(that.obj.cityId)){
                that.obj.startCityType =2;
                that.obj.startCityId=that.obj.cityId;
            }
            if(!that.common.isBlank(that.obj.districtId)){
                that.obj.startCityType =3;
                that.obj.startCityId=that.obj.districtId;
            }
            if(that.common.isBlank(that.obj.startCityId)){
                that.$message.error('请选择出发地！');
                return;
            }
            for(let el of ladderTable){
                if(that.common.isBlank(el.startWeight)){
                    that.$message.error("请填写首重！");
                    return;
                }
                if(that.common.isBlank(el.startCost)){
                    that.$message.error("请填写首重价！");
                    return;
                }
                if(that.common.isBlank(el.weightOne)){
                    that.$message.error("请填写续重范围（公斤）！");
                    return;
                }
                if(that.common.isBlank(el.weightOneCost)){
                    that.$message.error("请填写续价（元/公斤）！");
                    return;
                }
            }
            that.$confirm(that.rms, '确认此运价？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysPriceBO.ajax?cmd=doSaveSysProductPrice";
                that.common.postUrl(url,that.obj,function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "操作成功"
                        });
                        that.$emit('clostToOther',that.$route.meta.id);
                    }
                });
            });

        },
        cancel:function () {
            let that = this;
            that.$emit('clostToOther', that.$route.meta.id);
        },
        //城市选择回调
        selectCallback(data){
            let that = this;
            if(!that.common.isBlank(data.ProvinceId)){
                that.obj.startCityId=data.ProvinceId;
            }
            if(!that.common.isBlank(data.CityId)){
                that.obj.startCityId=data.CityId;
            }
            if(!that.common.isBlank(data.DistrictId)){
                that.obj.startCityId=data.DistrictId;
            }
            that.getSysPriceAll();
        },
        //目的地数据查询
        async getSysPriceAll(){
            let that = this;
            await that.$refs.ladderTable.getProvince();
            if(!that.common.isBlank(that.obj.startCityId)){
                let data = await that.common.postUrl("api/sysPriceBO.ajax?cmd=getSysProductPrice",that.obj);
                if(!that.common.isBlank(data)){
                    that.obj.id=data.id;
                    that.obj.agingNum=data.agingNum;
                    that.obj.insuranceCost= (data.insuranceCost/1000).toFixed(2);
                    that.obj.lowestCost= (data.lowestCost/100).toFixed(2);
                    if(that.common.isNotBlank(data.takeEffectDate)){
                        that.obj.takeEffectDate =data.takeEffectDate;
                    }
                    let sysPrice = await that.common.postUrl("api/sysPriceBO.ajax?cmd=getSysProductDelivery",that.obj);
                    that.$refs.ladderTable.setData(sysPrice.items);
                }else {
                    that.clear();
                }
            }
        },
        //静态数据查询
        doQuerySysStaticData:function () {
            let that = this;
            that.common.postUrl("api/sysPriceBO.ajax?cmd=getCity",{"cityId":that.cityId,"cityType":that.cityType},function (data) {
                let city = data;
                that.$refs.city.initData(city.ProvinceId, city.CityId, city.DistrictId, null);
                that.selectCallback(city);
            })
        },
        //选择计费方式
        selectBillingType(){
            let that = this;
            that.getSysPriceAll();
        },
        //展开省市回调
        areaCallback(data){
            console.log(data);
        },
        //清空查询条件
        clear:function () {
            let that = this;
            that.obj.id = null;
            that.obj.agingNum = null;
            that.obj.insuranceCost = null;
            that.obj.lowestCost = null;
            that.obj.takeEffectDate = null;
            that.obj.priceType = 1;
        },

    },
    components:{
        ladderTable,
        mycity
    }
}