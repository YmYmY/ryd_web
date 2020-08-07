import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"

export default {
    name: 'sysOrder',
    data() {
        return {
            obj:{
                orderMode:[],
                maxLowestCost:null,
                insuranceCost:null,
                minLowestCost:null,
                maxCost:null,
                handlingFee:null,
                mimCost:null,
                orderType:"-1",
                deliveryType:"-1",
                intervalType:"-1",
                giveDeliveryType:"-1",
                payType:"-1",
                otherName:null,
            },
            orderModelList:[],
            orderTypeList:[],
            beginDeliveryTypeList:[],
            endDeliveryTypeList:[],
            payTypeList:[],
            deliveryTypeList:[],
            showType:false,
        }
    },
    //进入页面
    beforeRouteEnter(to,from,next){
        next(that => {
            //调用刷新方法
            that.doQuerySysStaticData();
        });
    },
    components: {
        tableCommon
    },
    methods: {
        selectType:function(){
            let that = this;
            if(that.obj.deliveryType == "1"){
                that.showType=true;
            }else {
                that.showType=false;
                that.obj.intervalType="-1";
            }
        },
        cancel:function () {
            let that = this;
            that.$emit('clostToOther', that.$route.meta.id);
        },
        //静态数据查询
        doQuerySysStaticData:function () {
            let that = this;
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysOrderCostObjct",{},function (data) {
                if(data.length > 0){
                    that.obj.orderMode = data;
                }
            })
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysSetup",{},function (data) {
               if(!that.common.isBlank(data)){
                   that.obj.maxLowestCost = (data.maxLowestCost /100).toFixed(2);
                   that.obj.minLowestCost = (data.minLowestCost /100).toFixed(2);
                   that.obj.insuranceCost = (data.insuranceCost /1000).toFixed(2);
                   that.obj.maxCost = (data.maxCost /100).toFixed(2);
                   that.obj.mimCost = (data.mimCost /100).toFixed(2);
                   that.obj.handlingFee = (data.handlingFee /1000).toFixed(2);
                   if(!that.common.isBlank(data.orderType)){
                       that.obj.orderType = data.orderType+"";
                   }
                   if(!that.common.isBlank(data.deliveryType)){
                       that.obj.deliveryType = data.deliveryType+"";
                       that.selectType();
                   }
                   if(!that.common.isBlank(data.intervalType)){
                       that.obj.intervalType = data.intervalType+"";
                   }
                   if(!that.common.isBlank(data.giveDeliveryType)){
                       that.obj.giveDeliveryType = data.giveDeliveryType+"";
                   }
                   if(!that.common.isBlank(data.payType)){
                       that.obj.payType = data.payType+"";
                   }
                   if(!that.common.isBlank(data.otherName)){
                       that.obj.otherName = data.otherName;
                   }
               }
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"ORDER_MODEL"},function (data) {
                that.orderModelList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"hasAll":true,"codeType":"ORDER_TYPE"},function (data) {
                that.orderTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"hasAll":true,"codeType":"ORDER_BEGIN_DELIVERY_TYPE"},function (data) {
                that.beginDeliveryTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"hasAll":true,"codeType":"ORDER_END_DELIVERY_TYPE"},function (data) {
                that.endDeliveryTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"hasAll":true,"codeType":"ORDER_PAYMENT_TYPE"},function (data) {
                that.payTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"hasAll":true,"codeType":"DELIVERY_TYPE"},function (data) {
                that.deliveryTypeList = data.items;
            })


        },
        doSave:function () {
            let that = this;
            that.$confirm("", '确认保存？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysTenantDefBO.ajax?cmd=sysSetup";
                that.common.postUrl(url,that.obj,function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "保存成功！"
                        });
                        that.dialogVisible = false;
                    }
                });
            });
        },
    }
}