import myFileModel from '@/components/myFileModel/myFileModel.vue'

export default {
    name: 'addJoin',
    data() {
        return {
            tenantTypeList:[],
            tenantStatusList:[],
            tenantPermissionList:[],
            obj:{
                tenantType:"1",
                tenantStatus:"1",
                tenantPermission:"1",
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
                showDefaultArea:false
            }
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
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"TENANT_TYPE"},function (data) {
                that.tenantTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"USER_STATUS"},function (data) {
                that.tenantStatusList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"TENANT_PERMISSION"},function (data) {
                that.tenantPermissionList = data.items;
            })
            that.obj.pTenantName = that.common.getCookie("tenantName")
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
        //企业信息保存
        doSave:function () {
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
            that.obj.cardId = this.$refs.cardId.getId()
            that.obj.businessLicense = this.$refs.businessLicense.getId()
            that.obj.tenantLogo = this.$refs.tenantLogo.getId()
            that.$confirm(that.rms, '是否新增加盟商？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysTenantDefBO.ajax?cmd=doSaveSysTenantDefPlatform";
                that.common.postUrl(url,that.obj,function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "新增加盟商成功"
                        });
                        that.$emit('clostToOther',that.$route.meta.id);
                    }
                });
            });
        },
        cancel:function () {
            let that = this;
            that.$emit('clostToOther', that.$route.meta.id);
        }
    },
    components: {
        myFileModel
    }
}