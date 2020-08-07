import myFileModel from '@/components/myFileModel/myFileModel.vue'
import mycity from '@/components/mycity/mycity.vue'
export default {
    name: 'addCmDealer',
    data() {
        return {
            obj:{
                dealerCode:null,
                dealerType:null,
                dealerFullName:null,
                dealerName:null,
                dealerNature:null,
                dealerPeople:null,
                dealerPhone:null,
                dealerTelephone:null,
                regionName:null,
                dateType:"-1",
                dealerDiscount:null,
                dealerRate:null,
                dealerAddress:null,
            },
            collectionType:false,
            dateTypeList:[],
            dealerTypeList:[],
            userStatusList:[],
            selectType:3,
            dealerId:this.$route.query.dealerId,
            showPassword:true,
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
        isPassword:function(){
            let that = this;
            that.showPassword=false;
            that.obj.userPassword=null;
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        //静态数据查询
        async doQuerySysStaticData () {
            let that = this;
            let data = await that.common.postUrl("api/cmDealerBO.ajax?cmd=getCmDealer",{"dealerId":that.dealerId});
            that.obj = data;
            that.$refs.city.initData(that.obj.provinceId, that.obj.cityId, that.obj.districtId, that.obj.streetId);
            that.obj.dateType = data.dateType+"";
            that.obj.dealerType = data.dealerType+"";
            that.obj.startCreateDate = data.startCreateDate;
            that.obj.dealerDiscount = (data.dealerDiscount / 1000).toFixed(2);
            that.obj.dealerRate = (data.dealerRate / 1000).toFixed(2);
            let sysUser = await that.common.postUrl("api/sysUserBO.ajax?cmd=getSysUserExternal",{"externalId":that.dealerId,"userType":5});
            if(!that.common.isBlank(sysUser)){
                that.obj.userId = sysUser.userId;
                that.obj.userLogin = sysUser.userLogin;
                that.obj.userPassword = sysUser.userPassword;
                if(sysUser.userStatus==1 || sysUser.userStatus==2){
                    that.obj.userStatus = sysUser.userStatus+"";
                }
                that.collectionType=true;
            }
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"STORE_TYPE"},function (data) {
                that.dealerTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"USER_STATUS"},function (data) {
                that.userStatusList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"DATE_TYPE","hasAll":true},function (data) {
                that.dateTypeList = data.items;
            })
            that.forceUpdate();
        },
        //企业信息保存
        doSave:function () {
            let that = this;
            if(that.common.isBlank(that.obj.dealerCode)){
                that.$message.error('请填写经销商编码！');
                return;
            }
            if(that.common.isBlank(that.obj.dealerType)){
                that.$message.error('请选择经销商级别！');
                return;
            }
            if(that.common.isBlank(that.obj.dealerFullName)){
                that.$message.error('请填写经销商全称！');
                return;
            }
            if(that.common.isBlank(that.obj.dealerName)){
                that.$message.error('请填写经销商简称！');
                return;
            }
            if(that.common.isBlank(that.obj.dealerNature)){
                that.$message.error('请填写经销商类别！');
                return;
            }
            if(that.common.isBlank(that.obj.regionName)){
                that.$message.error('请填写销售区域！');
                return;
            }
            if(that.common.isBlank(that.obj.dealerPeople)){
                that.$message.error('请填写联系人！');
                return;
            }
            if(that.common.isBlank(that.obj.dealerPhone)){
                that.$message.error('请填写联系手机！');
                return;
            }
            that.city =that.$refs.city.getData()
            that.obj.provinceId = that.city.ProvinceId;
            that.obj.cityId = that.city.CityId;
            that.obj.districtId = that.city.DistrictId;
            that.obj.streetId = that.city.StreetId;
            if(that.common.isBlank(that.obj.provinceId)){
                that.$message.error('请选择经销商地址！');
                return;
            }
            if(that.common.isBlank(that.obj.cityId)){
                that.$message.error('请选择经销商地址城市！');
                return;
            }
            if(that.common.isBlank(that.obj.dealerAddress)){
                that.$message.error('请填写详细地址！');
                return;
            }
            if(!that.common.validatemobile(that.obj.dealerPhone)){
                that.$message.error('请输入正确的联系手机号！');
                return;
            }
            if(!that.common.isBlank(that.obj.dealerTelephone)){
                if(!that.common.validateTel(that.obj.dealerTelephone)){
                    that.$message.error('请填写正确座机！');
                    return;
                }
            }
            if(that.collectionType){
                if(that.common.isBlank(that.obj.userLogin)){
                    that.$message.error('请填写登陆账号！');
                    return;
                }
                if(that.common.isBlank(that.obj.userPassword)){
                    that.$message.error('请填写登陆密码！');
                    return;
                }
                if(that.common.isBlank(that.obj.userStatus)){
                    that.$message.error('请选择状态！');
                    return;
                }
                if(!that.common.validatemobile(that.obj.userLogin)){
                    that.$message.error('登陆账号只能是手机号！');
                    return;
                }
                if(!that.showPassword){
                    that.obj.isPassword=1;
                }else {
                    that.obj.isPassword=2;
                }
                that.obj.type=1;
            }else {
                that.obj.type=2;
            }
            that.$confirm(that.rms, '是否新增经销商？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/cmDealerBO.ajax?cmd=doSaveCmDealer";
                that.common.postUrl(url,that.obj,function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "新增经销商成功"
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