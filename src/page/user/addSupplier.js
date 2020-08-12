import myFileModel from '@/components/myFileModel/myFileModel.vue'
import mycity from '@/components/mycity/mycity.vue'
export default {
    name: 'addSupplier',
    data() {
        return {
            disabled:true,
            weightUnitList:[],
            discountTypeList:[],
            tenantTypeList:[],
            whetherPlatformList:[],
            platformTypeList:[],
            supplierNatureList:[],
            tenantStatusList:[],
            periodTypeList:[],
            bankTypeList:[],
            datTypeList:[],
            payTypeList:[],
            mergeTypeList:[],
            supplierTenantList:[],
            showPlatform:false,
            collectionType:false,
            payTo:false,
            stepPrice:false,
            standardPrice:false,
            obj:{
                supplierId:-1,
                payType:"-1",
                phoneTwo:null,
                phoneOne:null,
                supplierNature:null,
                platformType:null,
                tenantFullName:null,
                tenantName:null,
                tenantType:"",
                tenantPrincipal:null,
                tenantPhone:null,
                officeAddress:null,
                businessAddress:null,
                bankName:null,
                bankId:"-1",
                bankCard:null,
                tenantStatus:"",
                disableType:"",
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
                attributionType:3,
                jmDate:null,
                supplierCode:null,
                whetherPlatform:null,
                accountName:null,
                accountPhone:null,
                accountWx:null,
                accountQq:null,
                accountMailbox:null,
                accountAddress:null,
                weightAdvanced:"",
                collectAdvanced:"",
                settlementType:"",
                reconciliationType:"",
                mergeType:"-1",
            },
            weightAdvancedList:[],
            collectAdvancedList:[],
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
            ],
            accountIndex:0, //对账信息tab默认第一个
        }
    },
    mounted() {
        this.doQuerySysStaticData();
    },
    methods: {
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        //静态数据查询
        doQuerySysStaticData:function () {
            let that = this;
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"SUPPLIER_TYPE"},function (data) {
                that.tenantTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"WHETHER_PLATFORM"},function (data) {
                that.whetherPlatformList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"SUPPLIER_NATURE"},function (data) {
                that.supplierNatureList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"USER_STATUS"},function (data) {
                that.tenantStatusList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"BANK_TYPE","hasAll":true},function (data) {
                that.bankTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"PERIOD_TYPE","hasAll":true},function (data) {
                that.periodTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"PAY_TYPE","hasAll":true},function (data) {
                that.payTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"WHETHER_PLATFORM","hasAll":true},function (data) {
                that.mergeTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"PLATFORM_TYPE","hasAll":true},function (data) {
                that.platformTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=queryNumAlias",{"type":1},function (data) {
                that.obj.supplierCode = data;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"DAT_TYPE"},function (data) {
                that.datTypeList = data.items;
            })
            let tenantId=that.common.getCookie("tenantId");
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantDefCityName", {"pTenantId":tenantId},function(data){
                that.supplierTenantList = data.items;
                that.supplierTenantList.unshift({supplierFullName:"请选择",tenantId:-1});
            });
        },
        //企业信息保存
        doSave:function () {
            let that = this;
            if(that.common.isBlank(that.obj.supplierCode)){
                that.$message.error('请填写供应商编码！');
                return;
            }
            if(that.common.isBlank(that.obj.tenantType)){
                that.$message.error('请选择供应商类型！');
                return;
            }
            if(that.common.isBlank(that.obj.tenantFullName)){
                that.$message.error('请填写供应商全称！');
                return;
            }
            if(that.common.isBlank(that.obj.tenantName)){
                that.$message.error('请填写供应商简称！');
                return;
            }
            if(that.common.isBlank(that.obj.whetherPlatform)){
                that.$message.error('请选择归属平台！');
                return;
            }
            if(that.obj.whetherPlatform == 1){
                if(that.common.isBlank(that.obj.platformType) || that.obj.platformType=="-1"){
                    that.$message.error('请选择平台名称！');
                    return;
                }
            }
            if(that.common.isBlank(that.obj.supplierNature)){
                that.$message.error('请选择供应商性质！');
                return;
            }
            if(that.common.isBlank(that.obj.tenantPrincipal)){
                that.$message.error('请填写联系人！');
                return;
            }
            if(that.common.isBlank(that.obj.tenantPhone) && that.common.isBlank(that.obj.phoneOne)){
                that.$message.error('请填写联系手机或者客服电话！');
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
                    that.$message.error('请填写正确客服电话！');
                    return;
                }
            }
            that.cityOffice =that.$refs.city.getData()
            that.obj.provinceId = that.cityOffice.ProvinceId;
            that.obj.cityId = that.cityOffice.CityId;
            that.obj.districtId = that.cityOffice.DistrictId;
            that.obj.streetId = that.cityOffice.StreetId;
            if(that.common.isBlank(that.obj.provinceId)){
                that.$message.error('请选择办公地区！');
                return;
            }
            if(that.common.isBlank(that.obj.officeAddress)){
                that.$message.error('请填写办公详细地址！');
                return;
            }
            that.bankCity =that.$refs.bankCity.getData();
            that.obj.bankProvince = that.bankCity.ProvinceId;
            that.obj.bankCity = that.bankCity.CityId;
            that.obj.bankDistrict = that.bankCity.DistrictId;
            that.obj.bankStreet = that.bankCity.StreetId;
            if(that.common.isBlank(that.obj.bankProvince)){
                that.$message.error('请选择营业地区！');
                return;
            }
            if(that.common.isBlank(that.obj.businessAddress)){
                that.$message.error('请填写营业详细地址！');
                return;
            }
            if(that.common.isBlank(that.obj.tenantStatus)){
                that.$message.error('请选择状态！');
                return;
            }
            if(that.common.isBlank(that.obj.settlementType)){
                that.$message.error('请选择结算日！');
                return;
            }
            if(that.collectionType){
                that.obj.collectionType =1;
            }else {
                that.obj.collectionType =2;
            }
            if(that.payTo){
                that.obj.payTo =1;
            }else {
                that.obj.payTo =2;
            }
            that.obj.cardId = this.$refs.cardId.getId()
            that.obj.businessLicense = this.$refs.businessLicense.getId()
            that.obj.tenantLogo = this.$refs.tenantLogo.getId()
            that.obj.contract= this.$refs.contract.getId()
            that.obj.accountWxId = this.$refs.accountWxId.getId()
            that.obj.accountList = JSON.stringify(that.accountList);
            that.$confirm(that.rms, '是否新增供应商？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysTenantDefBO.ajax?cmd=doSaveSysTenantDefSupplier";
                that.common.postUrl(url,that.obj,function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "新增供应商成功"
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
        //对账信息tab切换
        accountChange(index){
            this.accountIndex = index;
            this.$forceUpdate();
        },
        selectType:function () {
            let that = this;
            if(that.obj.whetherPlatform == 1){
                that.showPlatform=true;
            }else {
                that.obj.platformType="-1";
                that.showPlatform=false;
            }
        },
    },
    components: {
        myFileModel,
        mycity
    }
}