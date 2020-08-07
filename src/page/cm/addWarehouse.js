import myFileModel from '@/components/myFileModel/myFileModel.vue'
import mycity from '@/components/mycity/mycity.vue'
export default {
    name: 'addWarehouse',
    data() {
        return {
            warehouseTypeList:[],
            warehouseNatureList:[],
            selectType:3,
            brandList:[],
            obj:{
                clientCode:"",
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
        selectSales:function(){
            let that = this;
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=getAddSysUserOragnize",{"oragnizeId":that.obj.salesId},function (data) {
                that.salesPersonList = data.items;
            })
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        //静态数据查询
        doQuerySysStaticData:function () {
            let that = this;
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"WAREHOUSE_TYPE"},function (data) {
                that.warehouseTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"WAREHOUSE_NATURE"},function (data) {
                that.warehouseNatureList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=queryNumAlias",{"type":3},function (data) {
                that.obj.warehouseCode = data;
                that.obj.clientCode = data;
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
            if(that.common.isBlank(that.obj.clientCode)){
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
            that.obj.warehouseOne = this.$refs.warehouseOne.getId()
            that.obj.warehouseTwo = this.$refs.warehouseTwo.getId()
            that.obj.warehouseThree = this.$refs.warehouseThree.getId()
            that.$confirm(that.rms, '是否新增仓库？', {
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
                            message: "新增仓库成功"
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