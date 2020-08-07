import myFileModel from '@/components/myFileModel/myFileModel.vue'
import mycity from '@/components/mycity/mycity.vue'
export default {
    name: 'addClient',
    data() {
        return {
            obj:{
                warehouseFullName:null,
                warehousePeople:null,
                warehousePhone:null,
                warehouseAddress:null,
                attributionType:3,
            },
            selectType:3,
        }
    },
    mounted() {
    },
    methods: {
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },

        //企业信息保存
        doSave:function () {
            let that = this;
            if(that.common.isBlank(that.obj.warehousePeople)){
                that.$message.error('请选择收货人！');
                return;
            }
            if(that.common.isBlank(that.obj.warehousePhone)){
                that.$message.error('请填写手机号码！');
                return;
            }
            that.city =that.$refs.city.getData()
            that.obj.provinceId = that.city.ProvinceId;
            that.obj.cityId = that.city.CityId;
            that.obj.districtId = that.city.DistrictId;
            that.obj.streetId = that.city.StreetId;
            if(that.common.isBlank(that.obj.provinceId)){
                that.$message.error('请选择省市区！');
                return;
            }
            if(that.common.isBlank(that.obj.cityId)){
                that.$message.error('请选择省市区地址城市！');
                return;
            }
            if(that.common.isBlank(that.obj.warehouseAddress)){
                that.$message.error('请填写详细地址！');
                return;
            }
            if(!that.common.validatemobile(that.obj.warehousePhone)){
                that.$message.error('请输入正确的联系手机号！');
                return;
            }
            that.$confirm(that.rms, '是否新增客户？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/cmWarehouseBO.ajax?cmd=doSaveCmWarehouseClient";
                that.common.postUrl(url,that.obj,function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "新增客户成功"
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