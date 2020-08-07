import myFileModel from '@/components/myFileModel/myFileModel.vue'
import mycity from '@/components/mycity/mycity.vue'
import tableCommon from "@/components/table/tableCommon.vue"
import cmOrders from "./cmOrders.vue"

export default {
    name: 'addCmAbnormal',
    data() {
        return {
            //table组件数据
            head :[
                {"name":"登记时间","code":"register_date","width":"110","type" : "text"},
                {"name":"登记人","code":"register_people","width":"100","type" : "text"},
                {"name":"归属区域","code":"regionName","width":"100","type" : "text"},
                {"name":"处理状态","code":"dealTypeName","width":"100","type" : "text"},
                {"name":"责任方","code":"respon_name","width":"100","type" : "text"},
                {"name":"异常类型","code":"abnormalTypeName","width":"100","type" : "text"},
                {"name":"异常数量","code":"abnormal_num","width":"100","type" : "text"},
                {"name":"异常金额","code":"registerFee","width":"100","type" : "text"},
                {"name":"异常描述","code":"abnormal_note","width":"100","type" : "text"},
            ],
            query:{
                queryTimeType:"1",
                queryOrderType:"1",
                callSts:"-1",
                queryTimes :[],
            },
            obj:{
                responId:"",
                abnormalType:"",
                abnormalNum:"",
                registerFee:"",
                abnormalNote:"",
                id:this.$route.query.id,
                orderId:this.$route.query.orderId,
            },
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
            dialogTableShow:false,
            clientType:false,
            tenantName:"",
        }
    },
    mounted() {
        this.doQuerySysStaticData();
        this.doQueryCmAbnormalExt();
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
                that.customerTenant = data.order.customer.customerTenant;
                that.tenantFullName = data.order.customer.tenantFullName;
                that.tenantName = data.order.customer.tenantName;
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
        doQueryCmAbnormalExt:function(){
            let that = this;
            let url = "api/cmAbnormalBO.ajax?cmd=doQueryCmAbnormalExt";
            this.$refs.table.load(url,{"id":that.obj.id});
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        //静态数据查询
        async doQuerySysStaticData () {
            let that = this;
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"ABNORMAL_TYPE"},function (data) {
                that.abnormalTypeList = data.items;
            })
            let cmAbnormal=await that.common.postUrl("api/cmAbnormalBO.ajax?cmd=getCmAbnormal",{"id":that.obj.id});
            that.obj = cmAbnormal;
            if(!that.common.isBlank(cmAbnormal.abnormalType)){
                that.obj.abnormalType= cmAbnormal.abnormalType+"";
            }
            if(cmAbnormal.clientType == 1){
                that.clientType = true;
            }else{
                that.clientType = false;
            }
            that.obj.registerFee= cmAbnormal.registerFee/100;
            that.obj.dealFee = cmAbnormal.dealFee/100;
            that.$refs.abnormalOne.initDate(cmAbnormal.abnormalOne);
            that.$refs.abnormalTwo.initDate(cmAbnormal.abnormalTwo);
            that.$refs.abnormalThree.initDate(cmAbnormal.abnormalThree);
            that.$refs.abnormalFour.initDate(cmAbnormal.abnormalFour);
            that.$refs.abnormalFives.initDate(cmAbnormal.abnormalFives);

            let responTypeList=await that.common.postUrl("api/ordOrderInfoBO.ajax?cmd=queryExceptionItems",{"orderId":that.obj.orderId});
            that.responTypeList = responTypeList.items;

            if(!that.common.isBlank(cmAbnormal.responId)){
                that.obj.responId = cmAbnormal.responId;
            }

            that.common.postUrl("api/ordOrderInfoBO.ajax?cmd=queryOrderInfoDetail",{"orderId":that.obj.orderId},function (data) {
                that.trackingNum = data.order.trackingNum;
                that.customerTenant = data.order.customer.customerTenant;
                that.tenantFullName = data.order.customer.tenantFullName;
                that.tenantName = data.order.customer.tenantName;
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
            that.$confirm(that.rms, '是否修改异常信息？', {
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
                            message: "修改异常信息成功"
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
            let orderId =  selectItem[0].orderId;
            this.queryOrderInfoDetail(orderId);
            this.dialogTableShow = false;
        },
    },
    components: {
        myFileModel,
        mycity,
        tableCommon,
        cmOrders
    }
}