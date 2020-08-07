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
                vehicleId:this.$route.query.vehicleId,
            },
            selectType:3,
            licensePlateColorList:[],
            customerTenantList:[],
            paymentTypeList:[],
            vehicleAttributionList:[],
            vehicleDedicatedList:[],
            vehicleTypeList:[],
            vehicleTrailerTypeList:[],
            vehicleAttributesList:[],
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
        async doQuerySysStaticData () {
            let that = this;
            let tenantId=that.common.getCookie("tenantId");
            let customerTenantList = await that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantDefPName",{"pTenantId":tenantId});
            that.customerTenantList = customerTenantList.items;
            let data = await that.common.postUrl("api/sysVehicleBO.ajax?cmd=getSysVehicle",{"vehicleId":that.obj.vehicleId});
            that.obj = data;
            if(that.common.isNotBlank(data.vehicleType)){
                that.obj.vehicleType = data.vehicleType+"";
            }
            if(that.common.isNotBlank(data.vehicleTrailerType)){
                that.obj.vehicleTrailerType = data.vehicleTrailerType+"";
            }
            if(that.common.isNotBlank(data.licensePlateColor)){
                that.obj.licensePlateColor = data.licensePlateColor+"";
            }
            that.obj.vehicleLoad = (data.vehicleLoad/100).toFixed(2);
            that.obj.vehicleZaifang = (data.vehicleZaifang/100).toFixed(2);
            that.$refs.city.initData(data.regionProvince, data.regionCity, data.regionCounty, null);
            if(that.common.isNotBlank(data.vehicleAttributes)){
                that.obj.vehicleAttributes = data.vehicleAttributes+"";
            }
            if(that.common.isNotBlank(data.vehicleDedicated)){
                that.obj.vehicleDedicated = data.vehicleDedicated+"";
            }
            if(that.common.isNotBlank(data.vehicleAttribution)){
                that.obj.vehicleAttribution = data.vehicleAttribution+"";
            }
            if(that.common.isNotBlank(data.paymentType)){
                that.obj.paymentType = data.paymentType+"";
            }
            if(that.common.isNotBlank(data.clientIds)){
                that.obj.clientIds = (data.clientIds.split(",")).map(Number);
            }
            that.$refs.bankCity.initData(data.bankProvince, data.bankCity, data.bankCounty, null);
            that.$refs.carCity.initData(data.carProvince, data.carCity, data.carCounty, null);
            that.$refs.drivingIcense.initDate(data.drivingIcense);
            that.$refs.bodyShot.initDate(data.bodyShot);
            that.$refs.driverLicense.initDate(data.driverLicense);
            that.$refs.cardFront.initDate(data.cardFront);
            that.$refs.cardReverse.initDate(data.cardReverse);

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
            that.$confirm(that.rms, '是否修改车辆？', {
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
                            message: "修改车辆成功"
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