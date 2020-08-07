import ladderTable from '@/components/ladderTable/ladderTable.vue'
import mycity from '@/components/mycity/mycity.vue'
export default {
    name: 'addPriceStandard',
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
            //选择框数据
            options: [{
                value: '1',
                label: '按出发地'
            }, {
                value: '2',
                label: '按目的地'
            },],
            head:[],
            showNumCost:true,
            showBox:true,
            selVal:'',
            billingTypeList:[],
            boxTypeList:[],
            orderTypeList:[],
            brandList:[],
            attributionType:this.$route.query.attributionType,
            obj:{
                boxType:null,
                billingType:null,
                weightCost:null,
                deliveryCost:null,
                pickupCost:null,
                receiveCost:null,
                insuranceCost:null,
                lowestCost:null,
                sysPriceType:2,
                takeEffectDate:null,
                otherCost:null,
                cityType:"1",
                tenantId:this.$route.query.tenantId,
                brandId:[],
            },
        }
    },
    mounted(){
        this.doQuerySysStaticData();
        this.initHead();
    },
    methods:{
        initHead(){
            this.head = [
                /*
                   ismust      是否为必填
                   type        默认为输入框,text时为展示框,selectTime时为选择时间,city为可展开省市
                     inputType:"num/double"
               */
              {name:"目的地",code:"name",width:"120",type:"city"},
              {name:"时效(天)",code:"agingNum",width:"100",inputType:"num"},
              {name:"按体积（方）",code:"volumeCost",width:"100",inputType:"double"},
              {name:"按重量（公斤）",code:"weightCost",width:"100",inputType:"double"},
              {name:"按数量（件）",code:"numCost",width:"100",inputType:"double",disabledEdit:this.showNumCost},
              {name:"大箱（件）",code:"maxBox",width:"100",inputType:"double",disabledEdit:this.showBox},
              {name:"中箱（件）",code:"inBox",width:"100",inputType:"double",disabledEdit:this.showBox},
              {name:"小箱（件）",code:"minBox",width:"100",inputType:"double",disabledEdit:this.showBox},
              {name:"提货费计算方式",code:"pickupType",width:"120",type:"select",selectData:[]},
              {name:"提货费单价",code:"pickupCost",width:"100",inputType:"double"},
              {name:"提货费最低收费",code:"pickupLowestCost",width:"100",inputType:"double"},
              {name:"送货费计算方式",code:"deliveryType",width:"120",type:"select",selectData:[]},
              {name:"送货费单价",code:"deliveryCost",width:"100",inputType:"double"},
              {name:"送货费最低收费",code:"deliveryLowestCost",width:"100",inputType:"double"},
              {name:"包装费计算方式",code:"publicType",width:"120",type:"select",selectData:[]},
              {name:"包装费单价",code:"publicCost",width:"100",inputType:"double"},
              {name:"包装费最低收费",code:"publicLowestCost",width:"100",inputType:"double"},
              {name:"其他费",code:"otherCost",width:"100",inputType:"double"},
              {name:"装卸费",code:"handingCost",width:"100",inputType:"double"},
              {name:"运费最低收费",code:"receiveCost",width:"100",inputType:"double"},
              {name:"线路折扣（%）",code:"lineDiscount",width:"100",inputType:"double"},
              {name:"生效时间",code:"takeEffectDate",width:"200",type:'selectTime'},
            ]
        },
        selectBoxType:function(){
            let that = this;
            if(that.obj.boxType == 1){
                that.showBox=false;
                that.showNumCost= true;
                that.initHead();
            }else {
                that.showBox=true;
                that.showNumCost= false;
                that.initHead();
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
            that.obj.tenantPrice= this.priceId;
            if(!that.common.isBlank(that.obj.provinceId)){
                that.obj.startCityType =1;
                that.obj.startCityId=that.obj.provinceId;
                that.disabled=false;
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
            if(that.common.isBlank(that.obj.boxType)){
                that.$message.error('请选择按大小箱计费！');
                return;
            }
            that.obj.brandList = JSON.stringify(that.obj.brandId);
            that.obj.orderList = JSON.stringify(that.obj.orderType);
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
        },
        //静态数据查询
        doQuerySysStaticData:function () {
            let that = this;
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"BILLING_STANDARD"},function (data) {
                that.billingTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"WHETHER_PLATFORM"},function (data) {
                that.boxTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"ORDER_TYPE"},function (data) {
                that.orderTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"BILLING_STANDARD"},function (data) {
                that.billingTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"CALCULATION_TYPE"},function (data) {
                that.head.forEach(el => {
                    if(el.code == 'pickupType' || el.code == 'deliveryType' || el.code == 'publicType'){
                        el.selectData = data.items;
                    }
                })
            })
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysBrand",{"tenantId":that.obj.tenantId},function (data) {
                that.brandList = data.items;
            })
        },
        //赋值到表格
        setToTable(isSel,code,value){
            if(isSel){
                this.$refs.ladderTable.setRowValue(code,value);
            }
        },
    },
    components:{
        ladderTable,
        mycity
    }
}