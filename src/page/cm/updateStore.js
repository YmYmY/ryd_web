import myFileModel from '@/components/myFileModel/myFileModel.vue'
import mycity from '@/components/mycity/mycity.vue'
export default {
    name: 'updateStore',
    data() {
        return {
            obj:{
                warehouseCode:null,
                warehouseType:"",
                warehouseFullName:null,
                warehouseName:null,
                warehousePeople:null,
                salesName:null,
                manageType:"",
                belongsId:"",
                warehousePhone:null,
                warehouseTelephone:null,
                warehouseArea:null,
                warehouseCost:null,
                warehouseAddress:null,
                userLogin:null,
                userPassword:null,
                userStatus:null,
                regionName:null,
                startCreateDate:null,
                attributionType:1,
                brandId:"",
            },
            checked:false,
            storeTypeList:[],
            manageTypeList:[],
            belongsIdList:[],
            userStatusList:[],
            tenantList:[],
            cmDealerList:[],
            brandList:[],
            warehouseId:this.$route.query.warehouseId,
            tenantId:this.$route.query.tenantId,
            selectType:3,
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
            let data = await that.common.postUrl("api/cmWarehouseBO.ajax?cmd=getCmWarehouse",{"warehouseId":that.warehouseId});
            that.obj = data;
            that.$refs.city.initData(that.obj.provinceId, that.obj.cityId, that.obj.districtId, that.obj.streetId);
            that.obj.warehouseType = data.warehouseType+"";
            that.obj.manageType = data.manageType+"";
            if(!that.common.isBlank(data.startCreateDate)){
                that.obj.startCreateDate = data.startCreateDate;
            }
            if(!that.common.isBlank(data.belongsId)){
                that.obj.belongsId = data.belongsId;
            }
            if(that.common.isNotBlank(data.brandId)){
                that.obj.brandId= data.brandId;
            }
            that.obj.warehouseArea = (data.warehouseArea /100).toFixed(2);
            that.obj.warehouseCost = (data.warehouseCost /100).toFixed(2);
            let sysUser = await that.common.postUrl("api/sysUserBO.ajax?cmd=getSysUserExternal",{"externalId":that.warehouseId,"userType":3});
            if(that.common.isNotBlank(sysUser)){
                that.obj.userId = sysUser.userId;
                that.obj.userLogin = sysUser.userLogin;
                that.obj.userPassword = sysUser.userPassword;
                if(sysUser.userStatus==1 || sysUser.userStatus==2){
                    that.obj.userStatus = sysUser.userStatus+"";
                }
            }
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"STORE_TYPE"},function (data) {
                that.storeTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"MANAGE_TYPE"},function (data) {
                that.manageTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"USER_STATUS"},function (data) {
                that.userStatusList = data.items;
            })
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantDefAll", {"attributionType":2},function(data){
                that.tenantList = data.items;
            });
            that.common.postUrl("api/cmDealerBO.ajax?cmd=getCmDealerList",{},function (data) {
                that.cmDealerList = data.items;
            })
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysBrand",{"tenantId":that.tenantId},function (data) {
                that.brandList = data.items;
            })
            this.$forceUpdate();
        },
        //企业信息保存
        doSave:function () {
            let that = this;
            if(that.common.isBlank(that.obj.warehouseCode)){
                that.$message.error('请填写门店编码！');
                return;
            }
            if(that.common.isBlank(that.obj.warehouseType)){
                that.$message.error('请选择门店级别！');
                return;
            }
            if(that.common.isBlank(that.obj.warehouseFullName)){
                that.$message.error('请填写门店全称！');
                return;
            }
            if(that.common.isBlank(that.obj.warehouseName)){
                that.$message.error('请填写门店简称！');
                return;
            }
            if(that.common.isBlank(that.obj.manageType)){
                that.$message.error('请选择经营方式！');
                return;
            }
            if(that.common.isBlank(that.obj.regionName)){
                that.$message.error('请填写所选区域！');
                return;
            }
            if(that.common.isBlank(that.obj.warehousePhone) && that.common.isBlank(that.obj.warehouseTelephone)){
                that.$message.error('联系手机与门店座机必须二选一！');
                return;
            }
            if(that.common.isBlank(that.obj.warehousePeople)){
                that.$message.error('请填写店长名称！');
                return;
            }
            that.city =that.$refs.city.getData()
            that.obj.provinceId = that.city.ProvinceId;
            that.obj.cityId = that.city.CityId;
            that.obj.districtId = that.city.DistrictId;
            that.obj.streetId = that.city.StreetId;
            if(that.common.isBlank(that.obj.provinceId)){
                that.$message.error('请选择门店地址！');
                return;
            }
            if(that.common.isBlank(that.obj.cityId)){
                that.$message.error('请选择门店地址城市！');
                return;
            }
            if(that.common.isBlank(that.obj.warehouseAddress)){
                that.$message.error('请填写详细地址！');
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
            if(that.common.isNotBlank(that.obj.warehousePhone)) {
                if (!that.common.validatemobile(that.obj.warehousePhone)) {
                    that.$message.error('请输入正确的联系手机号！');
                    return;
                }
            }
            if(that.common.isNotBlank(that.obj.warehouseTelephone)){
                if(!that.common.validateTel(that.obj.warehouseTelephone)){
                    that.$message.error('请填写正确门店座机！');
                    return;
                }
            }
            if(!that.showPassword){
                that.obj.isPassword=1;
            }else {
                that.obj.isPassword=2;
            }
            that.obj.warehouseId = that.warehouseId;
            that.$confirm(that.rms, '是否修改门店？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/cmWarehouseBO.ajax?cmd=doSaveCmWarehouse";
                that.common.postUrl(url,that.obj,function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "修改门店成功"
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