import myFileModel from '@/components/myFileModel/myFileModel.vue'

export default {
    name: 'reviewJoin',
    data() {
        return {
            checked:false,
            userPassword:"******",
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
                approvalRemarks:null,
            },
            tenantId:this.$route.query.tenantId,
            createTenantId:this.$route.query.createTenantId,


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
            that.obj.startDate = data.startDate.replace(" 00:00:00","");
            that.obj.endDate =  data.endDate.replace(" 00:00:00","");
            that.obj.jmDate= (this.obj.startDate + "," + this.obj.endDate).split(",");
            that.obj.tenantStatus = data.tenantStatus+"";
            that.obj.tenantPermission = data.tenantPermission+"";
            that.obj.tenantCost = data.tenantCost / 100;
            that.obj.approvalRemarks ="";
            that.obj.pTenantName = data.pTenantName;
            that.$refs.cardId.initDate(data.cardId);
            that.$refs.businessLicense.initDate(data.businessLicense);
            that.$refs.tenantLogo.initDate(data.tenantLogo);
            let sysUser = await that.common.postUrl("api/sysUserBO.ajax?cmd=getSysUser",{"tenantId":that.tenantId});
            that.obj.userLogin = sysUser.userLogin;
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
        //审核
        review:function (type) {
            let that = this;
            that.obj.approvalStatus = type;
            that.obj.tenantId = that.tenantId;
            that.$confirm(that.rms, '是否确认操作？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.common.postUrl("api/sysTenantDefBO.ajax?cmd=reviewSysTenantDefPlatform",that.obj,function (data) {
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
        }
    },
    components: {
        myFileModel
    }
}