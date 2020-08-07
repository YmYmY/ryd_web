import ladderTable from '@/components/ladderTable/ladderTable.vue'
import mycity from '@/components/mycity/mycity.vue'
export default {
    name: 'addPriceLadder',
    props:['priceId'],
    data(){
        return{
            tabs:[
                {
                    name:"阶梯价",
                    active:true
                },
                {
                    name:"标准价"
                }
            ],
            head:[
                /*
                    ismust      是否为必填
                    type        默认为输入框,text时为展示框,selectTime时为选择时间,city为可展开省市
                      inputType:"num/double"
                */
                {name:"目的地",code:"name",width:"120",type:"city"},
                {name:"时效(天) ",code:"agingNum",width:"100",inputType:"num"},
                {name:"首重",code:"startWeight",width:"100",inputType:"double"},
                {name:"首重价（元）",code:"startCost",width:"100",ismust:true,inputType:"double"},
                {name:"续重范围1（公斤）",code:"weightOne",width:"180",ismust:true,inputType:"double"},
                {name:"续价1（元/公斤）",code:"weightOneCost",width:"100",ismust:true,inputType:"double"},
                {name:"续重范围2（公斤） ",code:"weightTwo",width:"180",inputType:"double"},
                {name:"续价2（元/公斤）",code:"weightTwoCost",width:"100",inputType:"double"},
                {name:"续重范围3（公斤） ",code:"weightThree",width:"180",inputType:"double"},
                {name:"续价3（元/公斤）",code:"weightThreeCost",width:"100",inputType:"double"},
                {name:"续重范围4（公斤） ",code:"weightFour",width:"180",inputType:"double"},
                {name:"续价4（元/公斤）",code:"weightFourCost",width:"100",inputType:"double"},
                {name:"续重范围5（公斤） ",code:"weightFives",width:"180",inputType:"double"},
                {name:"续价5（元/公斤）",code:"weightFivesCost",width:"100",inputType:"double"},
                {name:"最低收费",code:"receiveCost",width:"100",inputType:"double"},
                {name:"线路折扣（%）",code:"lineDiscount",width:"100",inputType:"double"},
                {name:"生效时间",code:"takeEffectDate",width:"200",type:'selectTime'},
            ],
            selVal:'',
            billingTypeList:[],
            distinguishTypeList:[],
            orderTypeList:[],
            brandList:[],
            attributionType:this.$route.query.attributionType,
            obj:{
                billingType:null,
                weightCost:null,
                facelistCost:null,
                publicCost:null,
                upstairsCost:null,
                otherCost:null,
                insuranceCost:null,
                lowestCost:null,
                sysPriceType:1,
                startCityId:"",
                cityType:"1",
                handingCost:null,
                takeEffectDateCheck:null,
                tenantId:this.$route.query.tenantId,
                brandId:[],
            },
            //选择框数据
            options: [{
                value: '1',
                label: '按出发地'
            }, {
                value: '2',
                label: '按目的地'
            },],
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
            if(that.common.isBlank(that.obj.takeEffectDate)){
                that.$message.error('请选择生效时间！');
                return;
            }
            if(that.attributionType==3){
                if(that.common.isBlank(that.obj.billingType)){
                    that.$message.error('请选择计费方式！');
                    return;
                }
            }
            if(that.attributionType == 2){
                if(that.common.isBlank(that.obj.orderType) || that.obj.orderType.length==0){
                    that.$message.error('请选择订单类型！');
                    return;
                }
            }
            that.obj.tenantPrice= this.priceId;
            that.obj.brandList = JSON.stringify(that.obj.brandId);
            that.obj.orderList = JSON.stringify(that.obj.orderType);
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
                    that.$message.error("请填写续重范围1（公斤）！");
                    return;
                }
                if(that.common.isBlank(el.weightOneCost)){
                    that.$message.error("请填写续价1（元/公斤）！");
                    return;
                }
                if(Number(el.weightOne) < Number(el.startWeight)){
                    that.$message.error("续重范围1（公斤）必须大于首重！");
                    return;
                }
            }
            that.$confirm(that.rms, '确认此运价？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysPriceBO.ajax?cmd=doSysPrice";
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
        //静态数据查询
        doQuerySysStaticData:function () {
            let that = this;
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"BILLING_LADDER"},function (data) {
                that.billingTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"DISTINGUISH_TYPE"},function (data) {
                that.distinguishTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"ORDER_TYPE"},function (data) {
                that.orderTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"BILLING_LADDER"},function (data) {
                that.billingTypeList = data.items;
            })
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysBrand",{"tenantId":that.obj.tenantId},function (data) {
                that.brandList = data.items;
            })
        },
    },
    components:{
        ladderTable,
        mycity
    }
}