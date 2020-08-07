import myFileModel from '@/components/myFileModel/myFileModel.vue'
import mycity from '@/components/mycity/mycity.vue'
export default {
    name: 'addSysOrgInfo',
    data() {
        return {
            obj:{
                orgFullName:null,
                orgName:null,
                orgPeople:null,
                orgPhone:null,
                orgTelephone:null,
                orgAddress:null,
                userLogin:null,
                userPassword:null,
                userStatus:null,

            },
            showPassword:true,
            selectType:3,
            orgId:this.$route.query.orgId,
            userStatusList:[],
        }
    },
    mounted() {
        this.doQuerySysStaticData();
    },
    methods: {
        //更新视图
        forceUpdate(){
            this.$forceUpdate();
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        isPassword:function(){
            let that = this;
            that.showPassword=false;
            that.obj.userPassword=null;
        },
        //静态数据查询
        async doQuerySysStaticData () {
            let that = this;
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"USER_STATUS"},function (data) {
                that.userStatusList = data.items;
            })

            let obj  = await that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysOrgInfoId",{"orgId":that.orgId});
            that.obj = obj;
            that.$refs.city.initData(that.obj.provinceId, that.obj.cityId, that.obj.districtId, that.obj.streetId);
            let data  = await that.common.postUrl("api/sysUserBO.ajax?cmd=getSysUserExternal",{"externalId":that.orgId,"userType":4});

            that.obj.userId = data.userId;
            that.obj.userLogin = data.userLogin;
            that.obj.userPassword = data.userPassword;
            if(data.userStatus==1 || data.userStatus==2){
                that.obj.userStatus = data.userStatus+"";
            }
            this.$forceUpdate();
        },
        //企业信息保存
        doSave:function () {
            let that = this;
            if(that.common.isBlank(that.obj.orgFullName)){
                that.$message.error('请填写网点全称！');
                return;
            }
            if(that.common.isBlank(that.obj.orgName)){
                that.$message.error('请填写网点简称！');
                return;
            }
            if(that.common.isBlank(that.obj.orgPeople)){
                that.$message.error('请填写负责人！');
                return;
            }
            if(that.common.isBlank(that.obj.orgPhone)){
                that.$message.error('请填写联系手机！');
                return;
            }
            that.city =that.$refs.city.getData()
            that.obj.provinceId = that.city.ProvinceId;
            that.obj.cityId = that.city.CityId;
            that.obj.districtId = that.city.DistrictId;
            that.obj.streetId = that.city.StreetId;
            if(that.common.isBlank(that.obj.provinceId)){
                that.$message.error('请选择网点地址！');
                return;
            }
            if(that.common.isBlank(that.obj.orgAddress)){
                that.$message.error('请填写导航地址！');
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
            if(that.common.isBlank(that.obj.userStatus)){
                that.$message.error('请选择状态！');
                return;
            }
            if(!that.common.validatemobile(that.obj.userLogin)){
                that.$message.error('登录账号只能是手机号！');
                return;
            }
            if(!that.common.validatemobile(that.obj.orgPhone)){
                that.$message.error('请输入正确的联系手机号！');
                return;
            }
            if(!that.common.isBlank(that.obj.orgTelephone)){
                if(!that.common.validateTel(that.obj.orgTelephone)){
                    that.$message.error('请填写正确座机！');
                    return;
                }
            }
            if(!that.showPassword){
                that.obj.isPassword=1;
            }else {
                that.obj.isPassword=2;
            }
            that.$confirm(that.rms, '是否修改网点？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysTenantDefBO.ajax?cmd=doSaveSysOrgInfo";
                that.common.postUrl(url,that.obj,function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "修改网点成功"
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
    },
    components: {
        myFileModel,
        mycity
    }
}