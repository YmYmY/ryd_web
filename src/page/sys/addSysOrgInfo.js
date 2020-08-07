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
            selectType:3,
            userStatusList:[],
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
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"USER_STATUS"},function (data) {
                that.userStatusList = data.items;
            })
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
            that.$confirm(that.rms, '是否新增网点？', {
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
                            message: "新增网点成功"
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