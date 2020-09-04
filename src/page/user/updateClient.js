import myFileModel from '@/components/myFileModel/myFileModel.vue'
import mycity from '@/components/mycity/mycity.vue'
export default {
    name: 'updateClient',
    data() {
        return {
            customerUserName:"",
            disabled:true,
            customerList:[],
            operationList:[],
            orderTypeList:[],
            tenantTypeList:[],
            tenantStatusList:[],
            disableTypeList:[],
            periodTypeList:[],
            userOragnize:[],
            salesList:[],
            bankTypeList:[],
            salesPersonList:[],
            franchiseStoreList:[],
            quotaTypeList:[],
            ordNumTypeList:[],
            datTypeList:[],
            contractSubjectList:[],
            regionList:[],
            showDisable:false,
            monPay:false,
            recPay:false,
            nowPay:false,
            appPay:false,
            showQuotaType:false,
            tenantId:this.$route.query.tenantId,
            obj:{
                contractSubject:"-1",
                customerUserPhone:"",
                customerUserName:"",
                customerUserId:"",
                quotaType:"2",
                orderAmount:"",
                franchiseStore:"1",
                paymentType:"",
                tenantFullName:null,
                tenantName:null,
                tenantType:"",
                socialCreditCode:null,
                tenantPrincipal:null,
                tenantPhone:null,
                officeAddress:null,
                bankName:null,
                bankId:"-1",
                bankCard:null,
                tenantStatus:"",
                disableType:"-1",
                startDate:null,
                endDate:null,
                tenantCost:null,
                periodType:"-1",
                salesId:"",
                salesPersonId:"",
                remark:null,
                provinceId:null,
                cityId:null,
                districtId:null,
                streetId:null,
                bankProvince:null,
                bankCity:null,
                bankDistrict:null,
                bankStreet:null,
                attributionType:2,
                jmDate:[],
                ordNumType:"1",
                phoneOne:"",
                accountName:null,
                accountPhone:null,
                accountWx:null,
                accountQq:null,
                accountMailbox:null,
                accountAddress:null,
                settlementType:"",
                reconciliationType:"",
                createRegion:"",
                orderTypeOne:"1",
                orderTypeTwo:"2",
                orderTypeThree:"3",
                orderTypeFour:"4",
                orderTypeFives:"5",
                customerIdOne:"-1",
                operationIdOne:"-1",
                customerIdTwo:"-1",
                operationIdTwo:"-1",
                customerIdThree:"-1",
                operationIdThree:"-1",
                customerIdFour:"-1",
                operationIdFour:"-1",
                customerIdFives:"-1",
                operationIdFives:"-1",
            },
            accountObj:{
                billingName:null,
                taxId:null,
                bankName:null,
                bankNo:null,
                bankAddress:null,
                bankPhone:null,
            },
            accountList:[   //对账信息数组对象
                {
                    ...this.accountObj,
                    active:true,
                    name:"开票信息1"
                },
                {
                    ...this.accountObj,
                    name:"开票信息2"
                },
                {
                    ...this.accountObj,
                    name:"开票信息3"
                },
            ],
            accountIndex:0, //对账信息tab默认第一个
        }
    },
    mounted() {
        this.doQuerySysStaticData();
    },
    methods: {
        selectQuotaType:function(){
            let that = this;
            if(that.obj.quotaType != '2'){
                that.showQuotaType = true;
            }else {
                that.showQuotaType = false;
            }
        },
        selectSales:function(){
            let that = this;
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=getAddSysUserOragnize",{"oragnizeId":that.obj.salesId},function (data) {
                that.salesPersonList = data.items;
                that.obj.salesPersonId= "";
            })
        },
        selectCustomerUser:function(obj){
            let that = this;
            that.obj.customerUserId=obj.userId;
            that.obj.customerUserPhone = obj.userPhone;
            that.obj.customerUserName = obj.userName;
            this.$forceUpdate();
        },
        forceUpdate:function(){
            this.$forceUpdate();
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        //静态数据查询
        async doQuerySysStaticData () {
            let that = this;
            let data = await that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantDefDetails",{"tenantId":that.tenantId});
            that.obj = data;
            that.$refs.cityOffice.initData(that.obj.provinceId, that.obj.cityId, that.obj.districtId, that.obj.streetId);
            that.obj.tenantType = data.tenantType+"";
            that.obj.tenantStatus= data.tenantStatus+"";
            that.obj.franchiseStore= data.franchiseStore+"";
            that.obj.quotaType= data.quotaType+"";
            if(that.common.isNotBlank(data.customerUserId)){
                that.obj.customerUserName = data.customerUserName;
                that.obj.customerUserPhone = data.customerUserPhone;
                that.obj.customerUserId = data.customerUserId;
                that.customerUserName = data.customerUserName;
            }
            if(that.obj.quotaType != '2'){
                that.showQuotaType = true;
            }else {
                that.showQuotaType = false;
            }
            that.obj.ordNumType= data.ordNumType+"";
            that.obj.bankId= data.bankId+"";
            that.obj.startDate = data.startDate;
            that.obj.endDate =  data.endDate;
            that.obj.tenantCost = (data.tenantCost / 100).toFixed(2);
            that.obj.orderAmount = (data.orderAmount / 100).toFixed(2);
            that.obj.jmDate= (this.obj.startDate + "," + this.obj.endDate).split(",");
            if(that.common.isNotBlank(data.disableType)){
                that.obj.disableType= data.disableType+"";
            }
            if(that.common.isNotBlank(data.settlementType)){
                that.obj.settlementType= data.settlementType+"";
            }
            if(that.common.isNotBlank(data.reconciliationType)){
                that.obj.reconciliationType= data.reconciliationType+"";
            }
            if(that.common.isNotBlank(data.periodType)){
                that.obj.periodType= data.periodType+"";
            }
            if(that.common.isNotBlank(data.contractSubject)){
                that.obj.contractSubject= data.contractSubject+"";
            }
            if(that.obj.tenantStatus == "1"){
                that.showDisable=false;
            }else {
                that.showDisable=true;
            }
            that.obj.createRegion = data.createRegion;
            if(that.common.isNotBlank(data.paymentType)){
                let paymentType  = data.paymentType.split(",");
                for (let  i=0;i<paymentType.length ;i++ ){
                    if(paymentType[i] == "3"){
                        that.monPay = true;
                    }else if(paymentType[i] == "1"){
                        that.nowPay = true;
                    }else if(paymentType[i] == "2"){
                        that.appPay = true;
                    }else if(paymentType[i] == "4"){
                        that.recPay = true;
                    }
                }
            }
            that.$refs.accountWxId.initDate(data.accountWxId);
            that.$refs.cardId.initDate(data.cardId);
            that.$refs.businessLicense.initDate(data.businessLicense);
            that.$refs.tenantLogo.initDate(data.tenantLogo);
            that.$refs.contract.initDate(data.contract);
            that.obj.salesId= data.salesId;
            let salesPersonList = await that.common.postUrl("api/sysStaticDataBO.ajax?cmd=getAddSysUserOragnize",{"oragnizeId":that.obj.salesId});
            that.salesPersonList = salesPersonList.items;
            that.obj.salesPersonId= data.salesPersonId;
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysReconciliation",{"tenantId":that.tenantId},function (data) {
                if(that.common.isNotBlank(data) && data.items.length > 0){
                    that.accountList = data.items;
                    that.accountList[0].active = true;
                    that.accountList[0].name = "开票信息1";
                    that.accountList[1].active = true;
                    that.accountList[1].name = "开票信息2";
                    that.accountList[2].active = true;
                    that.accountList[2].name = "开票信息3";
                }
            })
            that.common.postUrl("api/sysUserBO.ajax?cmd=getSysOrderOragnizeList",{"tenantId":that.tenantId},function (data) {
                that.obj.orderTypeOne= "1";
                that.obj.orderTypeTwo= "2";
                that.obj.orderTypeThree= "3";
                that.obj.orderTypeFour= "4";
                that.obj.orderTypeFives= "5";
                that.obj.customerIdOne= "-1";
                that.obj.operationIdOne= "-1";
                that.obj.customerIdTwo= "-1";
                that.obj.operationIdTwo= "-1";
                that.obj.customerIdThree= "-1";
                that.obj.operationIdThree= "-1";
                that.obj.customerIdFour= "-1";
                that.obj.operationIdFour= "-1";
                that.obj.customerIdFives= "-1";
                that.obj.operationIdFives= "-1";
                for (let  i=0;i<data.items.length ;i++){
                    if(data.items[i].orderType == that.obj.orderTypeOne){
                        if(data.items[i].customerId > 0){
                            that.obj.customerIdOne= data.items[i].customerId;
                        }
                        if(data.items[i].operationId > 0){
                            that.obj.operationIdOne= data.items[i].operationId;
                        }
                    }
                    if(data.items[i].orderType == that.obj.orderTypeTwo){
                        if(data.items[i].customerId > 0){
                            that.obj.customerIdTwo= data.items[i].customerId;
                        }
                        if(data.items[i].operationId > 0){
                            that.obj.operationIdTwo= data.items[i].operationId;
                        }
                    }
                    if(data.items[i].orderType == that.obj.orderTypeThree){
                        if(data.items[i].customerId > 0){
                            that.obj.customerIdThree= data.items[i].customerId;
                        }
                        if(data.items[i].operationId > 0){
                            that.obj.operationIdThree= data.items[i].operationId;
                        }
                    }
                    if(data.items[i].orderType == that.obj.orderTypeFour){
                        if(data.items[i].customerId > 0){
                            that.obj.customerIdFour= data.items[i].customerId;
                        }
                        if(data.items[i].operationId > 0){
                            that.obj.operationIdFour= data.items[i].operationId;
                        }
                    }
                    if(data.items[i].orderType == that.obj.orderTypeFives){
                        if(data.items[i].customerId > 0){
                            that.obj.customerIdFives= data.items[i].customerId;
                        }
                        if(data.items[i].operationId > 0){
                            that.obj.operationIdFives= data.items[i].operationId;
                        }
                    }
                }
            })
            that.common.postUrl("api/sysOragnizeBO.ajax?cmd=getUserDepartment",{"oragnizeType":4},function(data){
                if(that.common.isNotBlank(data) && that.common.isNotBlank(data.items)){
                    that.userOragnize = data.items;
                }
            });
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"CONTRACT_SUBJECT","hasAll":true},function (data) {
                that.contractSubjectList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"TENANT_TYPE_CLIENT"},function (data) {
                that.tenantTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"USER_STATUS"},function (data) {
                that.tenantStatusList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"DISABLE_TYPE","hasAll":true},function (data) {
                that.disableTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"PERIOD_TYPE","hasAll":true},function (data) {
                that.periodTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=getSysOragnizeList",{"oragnizeType":"2"},function (data) {
                that.salesList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"BANK_TYPE","hasAll":true},function (data) {
                that.bankTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"FRANCHISE_STORE"},function (data) {
                that.franchiseStoreList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"QUOTA_TYPE"},function (data) {
                that.quotaTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"ORD_NUM_TYPE"},function (data) {
                that.ordNumTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"DAT_TYPE"},function (data) {
                that.datTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"ORDER_TYPE"},function (data) {
                that.orderTypeList = data.items;
            })
            that.common.postUrl("api/sysOragnizeBO.ajax?cmd=getUserOragnizeListChild",{"oragnizeType":4},function(data){
                that.customerList = data.items;
                that.customerList.unshift({oragnizeName:"全部",oragnizeId:"-1"});
            });
            that.common.postUrl("api/sysOragnizeBO.ajax?cmd=getUserOragnizeListChild",{"oragnizeType":6},function(data){
                that.operationList = data.items;
                that.operationList.unshift({oragnizeName:"全部",oragnizeId:"-1"});
            });
            that.common.postUrl("api/sysRegionBO.ajax?cmd=getSysRegionTenantList",{},function(data){
                if(that.common.isNotBlank(data) && that.common.isNotBlank(data.items)){
                    that.regionList = data.items;
                }
            });
        },
        //企业信息保存
        doSave:function () {
            let that = this;
            if(that.common.isBlank(that.obj.tenantFullName)){
                that.$message.error('请填写企业全称！');
                return;
            }
            if(that.common.isBlank(that.obj.tenantName)){
                that.$message.error('请填写企业简称！');
                return;
            }
            if(that.common.isBlank(that.obj.tenantType)){
                that.$message.error('请选择企业类型！');
                return;
            }
            if(that.common.isBlank(that.obj.tenantPrincipal)){
                that.$message.error('请填写联系人！');
                return;
            }
            if(that.common.isBlank(that.obj.tenantPhone) && that.common.isBlank(that.obj.phoneOne)){
                that.$message.error('请填写联系手机或者联系电话！');
                return;
            }
            if(!that.common.isBlank(that.obj.tenantPhone)){
                if(!that.common.validatemobile(that.obj.tenantPhone)){
                    that.$message.error('请输入正确的联系手机号！');
                    return;
                }
            }
            if(!that.common.isBlank(that.obj.phoneOne)){
                if(!that.common.validateTel(that.obj.phoneOne)){
                    that.$message.error('请填写正确联系电话！');
                    return;
                }
            }
            that.cityOffice =that.$refs.cityOffice.getData()
            that.obj.provinceId = that.cityOffice.ProvinceId;
            that.obj.cityId = that.cityOffice.CityId;
            that.obj.districtId = that.cityOffice.DistrictId;
            that.obj.streetId = that.cityOffice.StreetId;
            if(that.common.isBlank(that.obj.provinceId)){
                that.$message.error('请选择办公区域！');
                return;
            }
            if(that.common.isBlank(that.obj.cityId)){
                that.$message.error('请选择办公区域城市！');
                return;
            }
            if(that.common.isBlank(that.obj.officeAddress)){
                that.$message.error('请填写办公地址！');
                return;
            }
            if(that.common.isBlank(that.obj.tenantStatus)){
                that.$message.error('请选择状态！');
                return;
            }
            if(that.obj.tenantStatus == 2){
                if(that.common.isBlank(that.obj.disableType)){
                    that.$message.error('请选择停用期限！');
                    return;
                }
            }
            if(that.common.isBlank(that.obj.jmDate)){
                that.$message.error('请选择合同期限！');
                return;
            }
            that.obj.paymentType="";
            if(that.monPay){
                that.obj.paymentType="3"
            }
            if(that.nowPay){
                if(that.common.isNotBlank(that.obj.paymentType)){
                    that.obj.paymentType+= ",1";
                }else {
                    that.obj.paymentType=  "1";
                }
            }
            if(that.appPay){
                if(that.common.isNotBlank(that.obj.paymentType)){
                    that.obj.paymentType+= ",2";
                }else {
                    that.obj.paymentType=  "2";
                }
            }
            if(that.recPay){
                if(that.common.isNotBlank(that.obj.paymentType)){
                    that.obj.paymentType+= ",4";
                }else {
                    that.obj.paymentType=  "4";
                }
            }
            if(that.common.isBlank(that.obj.paymentType)){
                that.$message.error('请选择支持结算方式！');
                return;
            }
            if(that.common.isBlank(that.obj.settlementType)){
                that.$message.error('请选择结算日！');
                return;
            }
            if(that.common.isBlank(that.obj.salesId)){
                that.$message.error('请选择销售部门！');
                return;
            }
            if(that.common.isBlank(that.obj.salesPersonId)){
                that.$message.error('请选择销售专员！');
                return;
            }
            if(that.obj.quotaType == 1){
                if(that.common.isBlank(that.obj.orderAmount)){
                    that.$message.error('请填写店铺下单额度！');
                    return;
                }
                if(that.common.isBlank(that.obj.franchiseStore)){
                    that.$message.error('请选择加盟店铺！');
                    return;
                }
            }
            that.obj.accountWxId = this.$refs.accountWxId.getId()
            that.obj.cardId = this.$refs.cardId.getId()
            that.obj.businessLicense = this.$refs.businessLicense.getId()
            that.obj.tenantLogo = this.$refs.tenantLogo.getId()
            that.obj.contract= this.$refs.contract.getId()
            that.obj.accountList = JSON.stringify(that.accountList);
            that.$confirm(that.rms, '是否修改客户？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysTenantDefBO.ajax?cmd=doSaveSysTenantDefClient";
                that.common.postUrl(url,that.obj,function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "修改客户成功"
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
        selectType:function () {
            let that = this;
            if(that.obj.tenantStatus == 1){
                that.showDisable=false;
            }else {
                that.showDisable=true;
            }
        },
        //对账信息tab切换
        accountChange(index){
            this.accountIndex = index;
            this.$forceUpdate();
        }
    },
    components: {
        myFileModel,
        mycity
    }
}