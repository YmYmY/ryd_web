import myFileModel from '@/components/myFileModel/myFileModel.vue'
import mycity from '@/components/mycity/mycity.vue'
export default {
    name: 'updateWarehouse',
    data() {
        return {
            warehouseTypeList:[],
            warehouseNatureList:[],
            brandList:[],
            warehouseId:this.$route.query.warehouseId,
            selectType:3,
            obj:{
                warehouseCode:null,
                warehouseType:"",
                warehouseFullName:null,
                warehouseName:null,
                warehousePeople:null,
                warehousePhone:null,
                warehouseTelephone:null,
                warehouseNature:null,
                warehouseArea:null,
                warehouseCost:null,
                warehouseAddress:null,
                attributionType:2,
                brandId:null,

            }
        }
    },
    mounted() {
        this.doQuerySysStaticData();
    },
    methods: {
        forceUpdate(){
            this.$forceUpdate();
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
            that.obj.warehouseType= data.warehouseType+"";
            that.obj.warehouseNature= data.warehouseNature+"";
            that.obj.warehouseArea = (data.warehouseArea /100).toFixed(2);
            that.obj.warehouseCost = (data.warehouseCost /100).toFixed(2);
            that.$refs.warehouseOne.initDate(data.warehouseOne);
            that.$refs.warehouseTwo.initDate(data.warehouseTwo);
            that.$refs.warehouseThree.initDate(data.warehouseThree);
            if(that.common.isNotBlank(data.brandId)){
                that.obj.brandId= data.brandId;
            }
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"WAREHOUSE_TYPE"},function (data) {
                that.warehouseTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"WAREHOUSE_NATURE"},function (data) {
                that.warehouseNatureList = data.items;
            })
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysBrand",{},function (data) {
                that.brandList = data.items;
            })
        },
        //企业信息保存
        doSave:function () {
            let that = this;
            if(that.common.isBlank(that.obj.warehouseCode)){
                that.$message.error('请填写仓库编码！');
                return;
            }
            if(that.common.isBlank(that.obj.warehouseType)){
                that.$message.error('请选择仓库类型！');
                return;
            }
            if(that.common.isBlank(that.obj.warehouseFullName)){
                that.$message.error('请填写仓库全称！');
                return;
            }
            if(that.common.isBlank(that.obj.warehouseName)){
                that.$message.error('请填写仓库简称！');
                return;
            }
            if(that.common.isBlank(that.obj.warehousePeople)){
                that.$message.error('请填写负责人！');
                return;
            }
            if(that.common.isBlank(that.obj.warehousePhone) && that.common.isBlank(that.obj.warehouseTelephone)){
                that.$message.error('联系手机与仓库座机必须二选一！');
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
                    that.$message.error('请填写正确仓库座机！');
                    return;
                }
            }
            if(that.common.isBlank(that.obj.warehouseNature)){
                that.$message.error('请选择仓库性质！');
                return;
            }
            that.city =that.$refs.city.getData()
            that.obj.provinceId = that.city.ProvinceId;
            that.obj.cityId = that.city.CityId;
            that.obj.districtId = that.city.DistrictId;
            that.obj.streetId = that.city.StreetId;
            if(that.common.isBlank(that.obj.provinceId)){
                that.$message.error('请选择仓库地址！');
                return;
            }
            if(that.common.isBlank(that.obj.cityId)){
                that.$message.error('请选择仓库地址城市！');
                return;
            }
            if(that.common.isBlank(that.obj.warehouseAddress)){
                that.$message.error('请填写详情地址！');
                return;
            }

            that.obj.warehouseOne = that.$refs.warehouseOne.getId()
            that.obj.warehouseTwo = that.$refs.warehouseTwo.getId()
            that.obj.warehouseThree = that.$refs.warehouseThree.getId()
            that.obj.warehouseId = that.warehouseId;
            that.$confirm(that.rms, '是否修改仓库？', {
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
                            message: "修改仓库成功"
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
            }else {
                that.showDisable=true;
            }
        }
    },
    components: {
        myFileModel,
        mycity
    }
}