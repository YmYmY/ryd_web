import myFileModel from '@/components/myFileModel/myFileModel.vue'

export default {
    name: 'updateJoin',
    data() {
        return {
            checked:false,
            tenantTypeList:[],
            tenantStatusList:[],
            tenantPermissionList:[],
            obj:{
                tenantType:"",
                tenantStatus:"",
                tenantPermission:"",
                tenantName:null,
                tenantFullName:null,
                pTenantName:null,
                socialCreditCode:null,
                officeAddress:null,
                tenantCost:null,
                jmDate:"",
                userLogin:null,
                userPassword:null,
                imageUrl:"",
                isReadOnly:true,
                showTenant:true,
                tenantPrincipal:null,
                tenantPhone:null,
                pTenantId:null,
            },
            tenantId:this.$route.query.tenantId,
            createTenantId:this.$route.query.createTenantId,
            showPassword:true,
        }
    },
    mounted() {
        this.doQuerySysStaticData();
    },
    methods: {
        isPassword:function(){
            this.showPassword=false;
            this.obj.userPassword=null;
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        //静态数据查询
        async doQuerySysStaticData() {
            let that = this;
            let data = await that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantDefDetails",{"tenantId":that.tenantId});
            that.obj = data;
            that.obj.tenantType = data.tenantType+"";
            if(that.obj.tenantType == "1"){
                that.obj.showTenant=true;
            }else {
                that.obj.showTenant=false;
            }
            that.obj.startDate = data.startDate;
            that.obj.endDate =  data.endDate;
            that.obj.jmDate= (this.obj.startDate + "," + this.obj.endDate).split(",");
            that.obj.tenantStatus = data.tenantStatus+"";
            that.obj.tenantPermission = data.tenantPermission+"";
            that.obj.tenantCost = data.tenantCost / 100;
            that.$refs.cardId.initDate(data.cardId);
            that.$refs.businessLicense.initDate(data.businessLicense);
            that.$refs.tenantLogo.initDate(data.tenantLogo);
            let sysUser = await that.common.postUrl("api/sysUserBO.ajax?cmd=getSysUser",{"tenantId":that.tenantId});
            that.obj.userLogin = sysUser.userLogin;
            that.obj.userPassword = sysUser.userPassword;
            let sys = await that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantDefDetails",{"tenantId":data.pTenantId});
            that.obj.pTenantName = sys.tenantFullName;

            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"TENANT_TYPE"},function (data) {
                that.tenantTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"USER_STATUS"},function (data) {
                that.tenantStatusList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"TENANT_PERMISSION"},function (data) {
                that.tenantPermissionList = data.items;
            })
        },
        //企业类型发生改变
        selectType:function () {
            let that = this;
            if(that.obj.tenantType == "1"){
                that.obj.showTenant=true;
            }else {
                that.obj.showTenant=false;
            }
        },
        //企业信息更新
        doUpdate:function () {
            let that = this;
            if(that.obj.tenantType == 1){
                if(that.common.isBlank(that.obj.tenantFullName)){
                    that.$message.error('请填写企业全称！');
                    return;
                }
                if(that.common.isBlank(that.obj.tenantName)){
                    that.$message.error('请填写企业简称！');
                    return;
                }
                if(that.common.isBlank(that.obj.socialCreditCode)){
                    that.$message.error('请填写社会信用代码！');
                    return;
                }
                if(that.common.isBlank(that.obj.officeAddress)){
                    that.$message.error('请填写办公地址！');
                    return;
                }
            }
            if(that.common.isBlank(that.obj.tenantPrincipal)){
                that.$message.error('请填写联系人！');
                return;
            }
            if(that.common.isBlank(that.obj.tenantPhone)){
                that.$message.error('请填写联系手机！');
                return;
            }
            if(that.common.isBlank(that.obj.tenantCost)){
                that.$message.error('请填写加盟费！');
                return;
            }
            if(that.common.isBlank(that.obj.jmDate)){
                that.$message.error('请填写加盟期限！');
                return;
            }
            if(that.common.isBlank(that.obj.userLogin)){
                that.$message.error('请填写登录账号！');
                return;
            }
            if(that.common.isBlank(that.obj.userPassword)){
                that.$message.error('请填写登录密码！');
                return;
            }
            if(!that.common.validatemobile(that.obj.tenantPhone)){
                that.$message.error('请输入正确的联系手机号！');
                return;
            }
            if(!that.common.validatemobile(that.obj.userLogin)){
                that.$message.error('登录账号只能是手机号码！');
                return;
            }
            if(!that.showPassword){
                that.obj.isPassword=1;
            }else {
                that.obj.isPassword=2;
            }
            that.obj.cardId = this.$refs.cardId.getId()
            that.obj.businessLicense = this.$refs.businessLicense.getId()
            that.obj.tenantLogo = this.$refs.tenantLogo.getId()
            that.obj.tenantId = that.tenantId;
            that.$confirm(that.rms, '是否确认操作？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.common.postUrl("api/sysTenantDefBO.ajax?cmd=modifySysTenantDefPlatform",that.obj,function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.$emit('clostToOther', that.$route.meta.id);
                        that.$message({
                            type: 'success',
                            message: "操作成功"
                        });
                    }
                });
            });
        },
        cancel:function () {
            let that = this;
            that.$emit('clostToOther', that.$route.meta.id);
        },
        //更新视图
        forceUpdate(){
            this.$forceUpdate();
        }
    },
    components: {
        myFileModel
    }
}