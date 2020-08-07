import myFileModel from '@/components/myFileModel/myFileModel.vue'
import mycity from '@/components/mycity/mycity.vue'
import cmOrders from "./cmOrders.vue"
export default {
    name: 'addCmAbnormal',
    data() {
        return {
            obj:{
                responId:"",
                abnormalType:"",
                abnormalNum:"",
                registerFee:"",
                abnormalNote:"",
                orderId:"",
            },
            clientType:false,
            responTypeList:[],
            abnormalTypeList:[],
            customerTenant:"",
            tenantFullName:"",
            goodsName:"",
            packageNumber:"",
            packageWeight:"",
            consignorName:"",
            consignorLinkmanName:"",
            consignorBill:"",
            consigneeName:"",
            consigneeLinkmanName:"",
            consigneeBill:"",
            tenantPhone:"",
            trackingNum:"",
            tenantName:"",
            orderId:this.$route.query.orderId,
            dialogTableShow:false,
        }
    },
    mounted() {
        this.doQuerySysStaticData();
    },
    methods: {
        selectType:function(obj){
            let that = this;
            that.responTypeList.forEach((el)=>{
                if(el.objectId == obj){
                    that.obj.responType = el.objectType;
                    that.obj.responName = el.objectName;
                }
            })
        },
        queryOrderInfoDetail:function(orderId){
            let that = this;
            that.obj.orderId = orderId;
            that.obj.responId = "";
            that.common.postUrl("api/ordOrderInfoBO.ajax?cmd=queryExceptionItems",{"orderId":that.obj.orderId},function (data) {
                that.responTypeList = data.items;
            })
            that.common.postUrl("api/ordOrderInfoBO.ajax?cmd=queryOrderInfoDetail",{"orderId":that.obj.orderId},function (data) {
                that.trackingNum = data.order.trackingNum;
                that.tenantName =  data.order.customer.tenantName;
                that.customerTenant = data.order.customer.customerTenant;
                that.tenantFullName = data.order.customer.tenantFullName;
                that.tenantPhone =  data.order.customer.tenantPhone;
                that.consignorName = data.order.consignorName;
                that.consignorLinkmanName = data.order.consignorLinkmanName;
                that.consignorBill = data.order.consignorBill;
                that.consigneeName = data.order.consigneeName;
                that.consigneeLinkmanName = data.order.consigneeLinkmanName;
                that.consigneeBill = data.order.consigneeBill;
                that.goodsName= data.order.goodsName ;
                that.packageNumber=data.order.packageNumber ;
                that.packageWeight=data.order.packageWeight ;
            })
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        //静态数据查询
        doQuerySysStaticData:function () {
            let that = this;
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"ABNORMAL_TYPE"},function (data) {
                that.abnormalTypeList = data.items;
            })
            if(that.orderId > 0){
                that.queryOrderInfoDetail(that.orderId);
            }
        },
        //企业信息保存
        doSave:function () {
            let that = this;
            if(that.common.isBlank(that.obj.orderId)){
                that.$message.error('请先查找订单！');
                return;
            }
            if(that.common.isBlank(that.obj.responId)){
                that.$message.error('请选择责任方！');
                return;
            }
            if(that.common.isBlank(that.obj.abnormalType)){
                that.$message.error('请选择异常类型！');
                return;
            }
            if(that.common.isBlank(that.obj.abnormalNum)){
                that.$message.error('请输入异常件数！');
                return;
            }
            if(that.clientType){
                that.obj.clientType = 1;
            }else {
                that.obj.clientType = 2;
            }
            that.obj.abnormalOne = this.$refs.abnormalOne.getId();
            that.obj.abnormalTwo = this.$refs.abnormalTwo.getId();
            that.obj.abnormalThree = this.$refs.abnormalThree.getId();
            that.obj.abnormalFour = this.$refs.abnormalFour.getId();
            that.obj.abnormalFives = this.$refs.abnormalFives.getId();
            that.$confirm(that.rms, '是否登记异常？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/cmAbnormalBO.ajax?cmd=doSaveCmAbnormal";
                that.common.postUrl(url,that.obj,function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "异常登记成功"
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
        //查询订单
        showDialog(){
            this.dialogTableShow = false;
            this.$nextTick(() => {
                this.dialogTableShow = true;
            })
        },
        //弹窗确认回调
        sureCallback(){
            let selectItem = this.$refs.cmOrders.getSelectOrder();
            this.dialogTableShow = false;
            let orderId =  selectItem[0].orderId;
            this.queryOrderInfoDetail(orderId);
        }
    },
    components: {
        myFileModel,
        mycity,
        cmOrders,
    }
}