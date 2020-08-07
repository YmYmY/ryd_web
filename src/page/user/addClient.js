import myFileModel from '@/components/myFileModel/myFileModel.vue'
import mycity from '@/components/mycity/mycity.vue'
export default {
    name: 'addClient',
    data() {
        return {
            customerUserName:"",
            disabled:true,
            tenantTypeList:[],
            tenantStatusList:[],
            disableTypeList:[],
            periodTypeList:[],
            salesList:[],
            bankTypeList:[],
            salesPersonList:[],
            franchiseStoreList:[],
            quotaTypeList:[],
            ordNumTypeList:[],
            datTypeList:[],
            regionList:[],
            userOragnize:[],
            showDisable:false,
            monPay:false,
            nowPay:false,
            appPay:false,
            recPay:false,
            showQuotaType:false,
            obj:{
                customerUserPhone:"",
                customerUserName:"",
                customerUserId:"",
                quotaType:"2",
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
                orderAmount:"",
                franchiseStore:"1",
                paymentType:"",
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
        selectCustomerUser:function(obj){
            let that = this;
            that.obj.customerUserId=obj.userId;
            that.obj.customerUserPhone = obj.userPhone;
            that.obj.customerUserName = obj.userName;
            this.$forceUpdate();
        },
        selectSales:function(){
            let that = this;
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=getAddSysUserOragnize",{"oragnizeId":that.obj.salesId},function (data) {
                that.salesPersonList = data.items;
            })
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        //静态数据查询
        doQuerySysStaticData:function () {
            let that = this;
            // 区域部门
            that.common.postUrl("api/sysRegionBO.ajax?cmd=getSysRegionTenantList",{},function(data){
                if(that.common.isNotBlank(data) && that.common.isNotBlank(data.items)){
                    that.regionList = data.items;
                }
            });
            that.common.postUrl("api/sysOragnizeBO.ajax?cmd=getUserDepartment",{"oragnizeType":4},function(data){
                if(that.common.isNotBlank(data) && that.common.isNotBlank(data.items)){
                    that.userOragnize = data.items;
                }
            });
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
            if(that.obj.jmDate.length == 0){
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
            that.$confirm(that.rms, '是否新增客户？', {
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
                            message: "新增客户成功"
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
                that.obj.disableType="-1";
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