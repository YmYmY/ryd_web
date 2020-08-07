import myFileModel from '@/components/myFileModel/myFileModel.vue'
import mycity from '@/components/mycity/mycity.vue'
export default {
    name: 'addSysVehicle',
    data() {
        return {
            obj:{
                licensePlateColor:"",
                vehicleCode:"",
                vehicleType:"",
                vehicleTrailerType:"-1",
                vehicleAttribution:"-1",
                paymentType:"-1",
                vehicleAttributes:"-1",
                vehicleTrailerCode:"",
                vehicleLoad:"",
                vehicleZaifang:"",
                vehicleDedicated:"",
                tenantFullName:"",
                vehicleRemarks:"",
                convoyName:"",
                carName:"",
                carPhone:"",
                carCard:"",
                bankName:"",
                bankAccount:"",
                bankCard:"",
                carAddress:"",
                driverName:"",
                driverPhone:"",
                clientIds:[],
            },
            selectType:3,
            licensePlateColorList:[],
            paymentTypeList:[],
            vehicleAttributionList:[],
            vehicleDedicatedList:[],
            vehicleTypeList:[],
            vehicleTrailerTypeList:[],
            vehicleAttributesList:[],
            customerTenantList:[],
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
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"VEHICLE_CODE"},function (data) {
                that.vehicleTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"PAY_CONSGINOR_FLAG","hasAll":true},function (data) {
                that.vehicleDedicatedList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"VEHICLE_PAYMENT_TYPE","hasAll":true},function (data) {
                that.paymentTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"VEHICLE_ATTRIBUTION","hasAll":true},function (data) {
                that.vehicleAttributionList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"VEHICLE_TRAILER_TYPE","hasAll":true},function (data) {
                that.vehicleTrailerTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"VEHICLE_ATTRIBUTES","hasAll":true},function (data) {
                that.vehicleAttributesList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"LICENSE_PLATE_COLOR"},function (data) {
                that.licensePlateColorList = data.items;
            })
            let tenantId=that.common.getCookie("tenantId");
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantDefPName", {"pTenantId":tenantId},function(data){
                that.customerTenantList = data.items;
            });
        },
        //企业信息保存
        doSave:function () {
            let that = this;
            if(that.common.isBlank(that.obj.vehicleCode)){
                that.$message.error('请输入车牌号码！');
                return;
            }
            if(that.common.isBlank(that.obj.vehicleType)){
                that.$message.error('请选择车型！');
                return;
            }
            that.city =that.$refs.city.getData()
            that.obj.regionProvince = that.city.ProvinceId;
            that.obj.regionCity = that.city.CityId;
            that.obj.regionCounty = that.city.DistrictId;
            if(that.common.isBlank(that.obj.regionProvince)){
                that.$message.error('请选择注册地区！');
                return;
            }
            if(that.common.isBlank(that.obj.licensePlateColor)){
                that.$message.error('请选择车牌颜色！');
                return;
            }
            that.bankCity =that.$refs.bankCity.getData()
            that.obj.bankProvince = that.bankCity.ProvinceId;
            that.obj.bankCity = that.bankCity.CityId;
            that.obj.bankCounty = that.bankCity.DistrictId;
            that.carCity =that.$refs.carCity.getData()
            that.obj.carProvince = that.carCity.ProvinceId;
            that.obj.carCity = that.carCity.CityId;
            that.obj.carCounty = that.carCity.DistrictId;
            that.obj.drivingIcense = this.$refs.drivingIcense.getId()
            that.obj.bodyShot = this.$refs.bodyShot.getId()
            that.obj.driverLicense = this.$refs.driverLicense.getId()
            that.obj.cardFront = this.$refs.cardFront.getId()
            that.obj.cardReverse= this.$refs.cardReverse.getId()
            that.$confirm(that.rms, '是否新增车辆？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysVehicleBO.ajax?cmd=doSaveSysVehicle";
                that.common.postUrl(url,that.obj,function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "新增车辆成功"
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