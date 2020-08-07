import myFileModel from '@/components/myFileModel/myFileModel.vue'
import mycity from '@/components/mycity/mycity.vue'
export default {
    name: 'supplierDetails',
    data() {
        return {

            disabled:true,
            tenantTypeList:[],
            whetherPlatformList:[],
            platformTypeList:[],
            supplierNatureList:[],
            tenantStatusList:[],
            periodTypeList:[],
            bankTypeList:[],
            payTypeList:[],
            projectTypeList:[],
            projectList:[],
            showPlatform:false,
            collectionType:false,
            payTo:false,
            tenantId:this.$route.query.tenantId,
            obj:{
                payType:"-1",
                phoneTwo:null,
                phoneOne:null,
                supplierNature:null,
                platformType:null,
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
                projectOne:null,
                projectTwo:null,
                projectTypeOne:"-1",
                projectTypeTwo:"-1",
                accountName:null,
                accountPhone:null,
                accountWx:null,
                accountQq:null,
                accountMailbox:null,
                accountAddress:null,
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
            ],
            accountIndex:0, //对账信息tab默认第一个
            configListOne:[],   //项目一
            configListTwo:[],   //项目二
            showConfigListOne:false,    //项目选择后
            showConfigListTwo:false,
        }
    },
    mounted() {
        this.doQuerySysStaticData();
    },
    methods: {
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        //对账信息tab切换
        accountChange(index){
            this.accountIndex = index;
            this.$forceUpdate();
        },
        //静态数据查询
        async doQuerySysStaticData () {
            this.common.diabledInput('supplierDetails')
            let that = this;
            let data = await that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantDefDetails",{"tenantId":that.tenantId});
            that.obj = data;
            that.obj.tenantType=data.tenantType+"";
            that.obj.whetherPlatform=data.whetherPlatform+"";
            if(that.common.isNotBlank(data.platformType)){
                that.obj.platformType=data.platformType+"";
            }
            if(that.common.isNotBlank(data.periodType)){
                that.obj.periodType=data.periodType+"";
            }
            if(that.common.isNotBlank(data.payType)){
                that.obj.payType=data.payType+"";
            }
            that.obj.supplierNature=data.supplierNature+"";
            that.obj.tenantStatus=data.tenantStatus+"";
            that.obj.bankId= data.bankId+"";
            that.$refs.city.initData(that.obj.provinceId, that.obj.cityId, that.obj.districtId, that.obj.streetId);
            that.$refs.bankCity.initData(that.obj.bankProvince, that.obj.bankCity, that.obj.bankDistrict, that.obj.bankStreet);
            that.$refs.accountWxId.initDate(data.accountWxId);
            that.$refs.cardId.initDate(data.cardId);
            that.$refs.businessLicense.initDate(data.businessLicense);
            that.$refs.tenantLogo.initDate(data.tenantLogo);
            that.$refs.contract.initDate(data.contract);
            if(that.obj.whetherPlatform == "1"){
                that.showPlatform=true;
            }else {
                that.showPlatform=false;
            }
            if(that.obj.collectionType == 1){
                that.collectionType=true;
            }else {
                that.collectionType=false;
            }
            if(that.obj.payTo == 1){
                that.payTo=true;
            }else {
                that.payTo=false;
            }
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysReconciliation",{"tenantId":that.tenantId},function (data) {
                if(that.common.isNotBlank(data) && data.items.length > 0){
                    that.accountList = data.items;
                    that.accountList[0].active = true;
                    that.accountList[0].name = "开票信息1";
                    that.accountList[1].active = true;
                    that.accountList[1].name = "开票信息2";
                }
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"PROJECT_TYPE","hasAll":true},function (data) {
                that.projectTypeList = data.items;
            })
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
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"PLATFORM_TYPE","hasAll":true},function (data) {
                that.platformTypeList = data.items;
            })
            let {items} = await that.common.postUrl("api/kdBusinessParamBO.ajax?cmd=queryProjects",{})
            that.projectList = items;
            that.common.postUrl("api/kdBusinessParamBO.ajax?cmd=queryProjectRels",{"tenantId":that.tenantId},function ({items}) {
                items.forEach((item,index) => {
                    that.projectList.forEach(el => {
                        if(item.kdId == el.kdId){
                            if(index==0){   //第一个
                                that.obj.projectOne = item.kdId+"";
                                that.obj.projectTypeOne = (item.state == 1 ? "1" : "2");
                                // that.configListOne = item.configs;
                                // that.showConfigListOne = true;
                                that.getConfigsOne(item.kdId,item.configs)
                            }
                            if(index==1){   //第二个
                                that.obj.projectTwo = item.kdId+"";
                                that.obj.projectTypeTwo = (item.state == 1 ? "1" : "2");
                                // that.configListTwo = item.configs;
                                // that.showConfigListTwo = true;
                                that.getConfigsTwo(item.kdId,item.configs)
                            }
                        }                    
                    })
                });
            })
        },
        forceUpdate(){
            this.$forceUpdate();
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
            if(!that.common.isBlank(that.obj.projectOne)){
                if(that.obj.projectTypeOne == "-1"){
                    that.$message.error('请选择是否开启对接！');
                    return;
                }
            }
            if(!that.common.isBlank(that.obj.projectTwo)){
                if(that.obj.projectTypeTwo == "-1"){
                    that.$message.error('请选择是否开启对接！');
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
            that.obj.projectList = that.common.copyObj(that.projectList);
            that.obj.projectList.forEach(el => {    //系统对接
                if(el.kdId == this.obj.projectOne){
                    el.configs = this.configListOne;
                }
                if(el.kdId == this.obj.projectTwo){
                    el.configs = this.configListTwo;
                }
            })
            that.obj.projectList.forEach(el => {    //系统对接
                if(el.kdId == this.obj.projectOne){
                    el.configs = this.configListOne;
                }
                if(el.kdId == this.obj.projectTwo){
                    el.configs = this.configListTwo;
                }
            })
            that.obj.projectList = JSON.stringify(that.obj.projectList);
            that.obj.accountList = JSON.stringify(that.accountList);
            that.$confirm(that.rms, '是否修改供应商？', {
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
                            message: "修改供应商成功"
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
            if(that.obj.whetherPlatform == 1){
                that.showPlatform=true;
                that.obj.platformType="-1";
            }else {
                that.showPlatform=false;
            }
        },
        getConfigsOne(data,configs){
            // this.projectList.forEach(el => {
            //     if(el.kdId == data){
            //         this.configListOne = el.configs;
            //     }
            // });
            // this.showConfigListOne = true;
            let that = this;
            that.common.postUrl("api/kdBusinessParamBO.ajax?cmd=queryProjectsDetails",{"kdId":data},function (data) {
                that.configListOne = data.items;
                if(that.common.isNotBlank(configs) && configs.length > 0){
                    configs.forEach(el => {
                        that.configListOne.forEach(e2 => {
                            if(el.fieldKey == e2.fieldKey){
                                e2.fieldValue = el.fieldValue;
                            }
                        });
                    });
                }
                that.showConfigListOne = true;
            });
        },
        getConfigsTwo(data,configs){
            // this.projectList.forEach(el => {
            //     if(el.kdId == data){
            //         this.configListTwo = el.configs;
            //     }
            // });
            // this.showConfigListTwo = true;
            let that = this;
            that.common.postUrl("api/kdBusinessParamBO.ajax?cmd=queryProjectsDetails",{"kdId":data},function (data) {
                that.configListTwo = data.items;
                if(that.common.isNotBlank(configs) && configs.length > 0){
                    configs.forEach(el => {
                        that.configListTwo.forEach(e2 => {
                            if(el.fieldKey == e2.fieldKey){
                                e2.fieldValue = el.fieldValue;
                            }
                        });
                    });
                }
                that.showConfigListTwo = true;
            });
        },
    },
    components: {
        myFileModel,
        mycity
    }
}