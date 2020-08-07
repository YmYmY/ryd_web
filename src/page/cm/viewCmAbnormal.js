import myFileModel from '@/components/myFileModel/myFileModel.vue'
import mycity from '@/components/mycity/mycity.vue'
import tableCommon from "@/components/table/tableCommon.vue"
import cmOrders from "./cmOrders";
export default {
    name: 'viewCmAbnormal',
    data() {
        return {
            //table组件数据
            head :[
                {"name":"登记时间","code":"register_date","width":"110","type" : "text"},
                {"name":"登记人","code":"register_people","width":"100","type" : "text"},
                {"name":"归属区域","code":"regionName","width":"100","type" : "text"},
                {"name":"责任方","code":"respon_name","width":"100","type" : "text"},
                {"name":"处理状态","code":"dealTypeName","width":"100","type" : "text"},
                {"name":"异常类型","code":"abnormalTypeName","width":"100","type" : "text"},
                {"name":"异常数量","code":"abnormal_num","width":"100","type" : "text"},
                {"name":"异常金额","code":"registerFee","width":"100","type" : "text"},
                {"name":"异常描述","code":"abnormal_note","width":"100","type" : "text"},
            ],
            obj:{
                responId:"",
                abnormalType:"",
                abnormalNum:"",
                registerFee:"",
                abnormalNote:"",
                id:this.$route.query.id,
                orderId:this.$route.query.orderId,
                dealType:"",
                feeType:"-1",
                dealNote:"",
                dealFee:"",
                writeOffId:"",
                claimId:"",
                clientClaimId:"",
                supplierClaimId:"",
                clientFeeType:"-1",
                clientDealFee:"",
                supplierFeeType:"-1",
                supplierDealFee:"",
                remarks:"",
                queryType:"6",
            },
            supplierFeeTypeList:[],
            clientFeeTypeList:[],
            supplierClaimIdList:[],
            clientClaimIdList:[],
            claimIdList:[],
            feeTypeList:[],
            dealTypeList:[],
            responTypeList:[],
            abnormalTypeList:[],
            regionList:[],
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
            clientType:false,
            dialogTableShow:false,
            platformType:false,
            clientOneType:false,
            supplierType:false,
        }
    },
    mounted() {
        this.doQuerySysStaticData();
        this.doQueryCmAbnormalExt();
    },
    methods: {
        clickType:function(){
            let that = this;
            if(!that.platformType){
                that.obj.claimId="";
                that.obj.claimType ="";
                that.obj.claimName ="";
                that.obj.feeType="-1";
                that.obj.dealFee="0";
            }
            if(!that.clientOneType){
                that.obj.clientClaimId="";
                that.obj.clientClaimType ="";
                that.obj.clientClaimName ="";
                that.obj.clientFeeType="-1";
                that.obj.clientDealFee="0";
            }
            if(!that.supplierType){
                that.obj.supplierClaimId="";
                that.obj.supplierClaimType ="";
                that.obj.supplierClaimName ="";
                that.obj.supplierFeeType="-1";
                that.obj.supplierDealFee="0";
            }
        },
        selectType:function(obj){
            let that = this;
            that.responTypeList.forEach((el)=>{
                if(el.objectId == obj){
                    that.obj.responType = el.objectType;
                    that.obj.responName = el.objectName;
                }
            })
        },
        selectTypeClient:function(obj){
            let that = this;
            that.clientClaimIdList.forEach((el)=>{
                if(el.objectId == obj){
                    that.obj.clientClaimType = el.objectType;
                    that.obj.clientClaimName = el.objectName;
                }
            })
        },
        selectTypeSupplier:function(obj){
            let that = this;
            that.supplierClaimIdList.forEach((el)=>{
                if(el.objectId == obj){
                    that.obj.supplierClaimType = el.objectType;
                    that.obj.supplierClaimName = el.objectName;
                }
            })
        },
        selectTypePlatform:function(obj){
            let that = this;
            that.claimIdList.forEach((el)=>{
                if(el.objectId == obj){
                    that.obj.claimType = el.objectType;
                    that.obj.claimName = el.objectName;
                }
            })
        },
        queryOrderInfoDetail:function(orderId){
            let that = this;
            that.obj.orderId = orderId;
            that.obj.responId = "";
            that.obj.claimId = "";
            that.obj.clientClaimId = "";
            that.obj.supplierClaimId = "";
            that.common.postUrl("api/ordOrderInfoBO.ajax?cmd=queryExceptionItems",{"orderId":that.obj.orderId},function (data) {
                that.responTypeList = data.items;
            })
            that.common.postUrl("api/ordOrderInfoBO.ajax?cmd=queryExceptionItems",{"orderId":that.obj.orderId,"attributionType":1},function (data) {
                that.claimIdList = data.items;
            })
            that.common.postUrl("api/ordOrderInfoBO.ajax?cmd=queryExceptionItems",{"orderId":that.obj.orderId,"attributionType":2},function (data) {
                that.clientClaimIdList = data.items;
            })
            that.common.postUrl("api/ordOrderInfoBO.ajax?cmd=queryExceptionItems",{"orderId":that.obj.orderId,"attributionType":3},function (data) {
                that.supplierClaimIdList = data.items;
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
        async doQuerySysStaticData  () {
            let that = this;
            // 区域部门
            that.common.postUrl("api/sysRegionBO.ajax?cmd=getSysRegionTenantList",{},function(data){
                if(that.common.isNotBlank(data) && that.common.isNotBlank(data.items)){
                    that.regionList = data.items;
                }
            });
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"ABNORMAL_TYPE"},function (data) {
                that.abnormalTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"DEAL_TYPE"},function (data) {
                that.dealTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"FEE_TYPE","hasAll":true},function (data) {
                that.feeTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"CLIENT_FEE_TYPE","hasAll":true},function (data) {
                that.clientFeeTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"CLIENT_FEE_TYPE","hasAll":true},function (data) {
                that.clientFeeTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"SUPPLIER_FEE_TYPE","hasAll":true},function (data) {
                that.supplierFeeTypeList = data.items;
            })
            let cmAbnormal=await that.common.postUrl("api/cmAbnormalBO.ajax?cmd=getCmAbnormal",{"id":that.obj.id});
            that.obj = cmAbnormal;
            if(that.common.isNotBlank(cmAbnormal.abnormalType)){
                that.obj.abnormalType= cmAbnormal.abnormalType+"";
            }
            if(that.common.isNotBlank(cmAbnormal.feeType)){
                that.obj.feeType= cmAbnormal.feeType+"";
            }
            if(that.common.isNotBlank(cmAbnormal.clientFeeType)){
                that.obj.clientFeeType= cmAbnormal.clientFeeType+"";
            }
            if(that.common.isNotBlank(cmAbnormal.supplierFeeType)){
                that.obj.supplierFeeType= cmAbnormal.supplierFeeType+"";
            }
            if(that.common.isNotBlank(cmAbnormal.dealType)){
                that.obj.dealType= cmAbnormal.dealType+"";
            }
            if(cmAbnormal.clientType == 1){
                that.clientType = true;
            }else{
                that.clientType = false;
            }
            that.obj.registerFee= cmAbnormal.registerFee/100;
            that.obj.dealFee = cmAbnormal.dealFee/100;
            that.obj.clientDealFee = cmAbnormal.clientDealFee/100;
            that.obj.supplierDealFee = cmAbnormal.supplierDealFee/100;
            that.$refs.abnormalOne.initDate(cmAbnormal.abnormalOne);
            that.$refs.abnormalTwo.initDate(cmAbnormal.abnormalTwo);
            that.$refs.abnormalThree.initDate(cmAbnormal.abnormalThree);
            that.$refs.abnormalFour.initDate(cmAbnormal.abnormalFour);
            that.$refs.abnormalFives.initDate(cmAbnormal.abnormalFives);
            //责任方
            let responTypeList=await that.common.postUrl("api/ordOrderInfoBO.ajax?cmd=queryExceptionItems",{"orderId":that.obj.orderId});
            that.responTypeList = responTypeList.items;
            //平台理赔对象
            let claimIdList=await that.common.postUrl("api/ordOrderInfoBO.ajax?cmd=queryExceptionItems",{"orderId":that.obj.orderId,"attributionType":1});
            that.claimIdList = claimIdList.items;
            //客户理赔对象
            let clientClaimIdList=await that.common.postUrl("api/ordOrderInfoBO.ajax?cmd=queryExceptionItems",{"orderId":that.obj.orderId,"attributionType":2});
            that.clientClaimIdList = clientClaimIdList.items;
            //平台理赔对象
            let supplierClaimIdList=await that.common.postUrl("api/ordOrderInfoBO.ajax?cmd=queryExceptionItems",{"orderId":that.obj.orderId,"attributionType":3});
            that.supplierClaimIdList = supplierClaimIdList.items;
            if(that.common.isNotBlank(cmAbnormal.responId)){
                that.obj.responId = cmAbnormal.responId;
            }
            if(that.common.isNotBlank(cmAbnormal.claimId)){
                that.obj.claimId = cmAbnormal.claimId;
                that.platformType=true;
            }
            if(that.common.isNotBlank(cmAbnormal.clientClaimId)){
                that.obj.clientClaimId = cmAbnormal.clientClaimId;
                that.clientOneType=true;
            }
            if(that.common.isNotBlank(cmAbnormal.supplierClaimId)){
                that.obj.supplierClaimId = cmAbnormal.supplierClaimId;
                that.supplierType=true;
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
            if(that.common.isBlank(that.obj.dealType)){
                that.$message.error('请选择处理状态！');
                return;
            }
            if(that.platformType){
                if(that.common.isBlank(that.obj.claimId) || that.obj.claimId=="-1"){
                    that.$message.error('请选择平台理赔对象！');
                    return;
                }
                if(that.common.isBlank(that.obj.feeType) || that.obj.feeType=="-1"){
                    that.$message.error('请选择平台费用类型！');
                    return;
                }
                if(that.common.isBlank(that.obj.dealFee)){
                    that.$message.error('请输入平台处理金额！');
                    return;
                }
            }
            if(that.clientOneType){
                if(that.common.isBlank(that.obj.clientClaimId) || that.obj.clientClaimId=="-1"){
                    that.$message.error('请选择客户理赔对象！');
                    return;
                }
                if(that.common.isBlank(that.obj.clientFeeType) || that.obj.clientFeeType=="-1"){
                    that.$message.error('请选择客户费用类型！');
                    return;
                }
                if(that.common.isBlank(that.obj.clientDealFee)){
                    that.$message.error('请输入客户处理金额！');
                    return;
                }
            }
            if(that.supplierType){
                if(that.common.isBlank(that.obj.supplierClaimId) || that.obj.supplierClaimId=="-1"){
                    that.$message.error('请选择供应商理赔对象！');
                    return;
                }
                if(that.common.isBlank(that.obj.supplierFeeType) || that.obj.supplierFeeType=="-1"){
                    that.$message.error('请选择供应商费用类型！');
                    return;
                }
                if(that.common.isBlank(that.obj.supplierDealFee)){
                    that.$message.error('请输入供应商处理金额！');
                    return;
                }
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
            that.obj.queryType = 6;
            that.$confirm(that.rms, '是否处理异常？', {
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
                            message: "处理异常成功"
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
            this.dialogTableShow = true;
            this.$forceUpdate();
        },
        //弹窗确认回调
        sureCallback(){
            let selectItem = this.$refs.cmOrders.getSelectOrder();
            let orderId =  selectItem[0].orderId;
            this.dialogTableShow = false;
            this.queryOrderInfoDetail(orderId);
        }
    },
    components: {
        cmOrders,
        myFileModel,
        mycity,
        tableCommon
    }
}