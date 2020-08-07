import ladderTable from '@/components/ladderTable/ladderTable.vue'
import mycity from '@/components/mycity/mycity.vue'
export default {
    name: 'addSysProductVehicle',
    data(){
        return{
            obj:{
                takeEffectDate:"",
                priceType:"4",
            },
            vehicleCodeList:[{
                codeName:"",
                vehicleType:"",
                startFee:"",
                includeKilometers:"",
                overMileage:"",
                loadOnline:"",
                volumeCost:"",
                vehicleNote:"",
                takeEffectDate:"",
            }],
            cityId:this.$route.query.cityId,
            cityType:this.$route.query.cityType,
        }
    },
    mounted(){
        this.doQuerySysStaticData();
    },
    methods:{
        //赋值到表格
        setToTable(isSel,code,value){
            let that = this;
            if(isSel){
                for(let el of that.vehicleCodeList){
                    el.takeEffectDate =value;
                }
            }
        },
        doSave:function(){
            let that = this;
            that.obj.ladderTable = JSON.stringify(that.vehicleCodeList);
            that.obj.priceType=4;
            that.city =that.$refs.city.getData()
            that.obj.provinceId = that.city.ProvinceId;
            that.obj.cityId = that.city.CityId;
            that.obj.districtId = that.city.DistrictId;
            if(!that.common.isBlank(that.obj.provinceId)){
                that.obj.startCityType =1;
                that.obj.startCityId=that.obj.provinceId;
            }
            if(!that.common.isBlank(that.obj.cityId)){
                that.obj.startCityType =2;
                that.obj.startCityId=that.obj.cityId;
            }
            if(!that.common.isBlank(that.obj.districtId)){
                that.obj.startCityType =3;
                that.obj.startCityId=that.obj.districtId;
            }
            if(that.common.isBlank(that.obj.startCityId)){
                that.$message.error('请选择归属地！');
                return;
            }
            for(let el of that.vehicleCodeList){
                if(that.common.isBlank(el.startFee)){
                    that.$message.error("请填写起步价！");
                    return;
                }
                if(that.common.isBlank(el.includeKilometers)){
                    that.$message.error("包含公里数！");
                    return;
                }
                if(that.common.isBlank(el.overMileage)){
                    that.$message.error("请填写超里程（元/公里）");
                    return;
                }
            }
            that.$confirm(that.rms, '确认此运价？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysPriceBO.ajax?cmd=doSaveSysProductPrice";
                that.common.postUrl(url,that.obj,function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "操作成功"
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
        //城市选择回调
        selectCallback(data){
            let that = this;
            if(!that.common.isBlank(data.ProvinceId)){
                that.obj.startCityId=data.ProvinceId;
            }
            if(!that.common.isBlank(data.CityId)){
                that.obj.startCityId=data.CityId;
            }
            if(!that.common.isBlank(data.DistrictId)){
                that.obj.startCityId=data.DistrictId;
            }
            that.getSysPriceAll();
        },
        //目的地数据查询
        async getSysPriceAll(){
            let that = this;
            if(!that.common.isBlank(that.obj.startCityId)){
                let data = await that.common.postUrl("api/sysPriceBO.ajax?cmd=getSysProductPrice",that.obj);
                if(!that.common.isBlank(data)){
                    that.obj.id=data.id;
                    if(that.common.isNotBlank(data.takeEffectDate)){
                        that.obj.takeEffectDate =data.takeEffectDate;
                    }
                    let sysPrice = await that.common.postUrl("api/sysPriceBO.ajax?cmd=getSysProductVehicle",that.obj);
                    for(let el of sysPrice.items){
                        for(let e of that.vehicleCodeList){
                            if(el.vehicleType == e.vehicleType){
                                e.startFee = el.startFee;
                                e.includeKilometers = el.includeKilometers;
                                e.overMileage = el.overMileage;
                                e.loadOnline = el.loadOnline;
                                e.volumeCost = el.volumeCost;
                                if(that.common.isNotBlank(el.vehicleNote)){
                                    e.vehicleNote = el.vehicleNote;
                                }
                                if(that.common.isNotBlank(el.takeEffectDate)){
                                    e.takeEffectDate = el.takeEffectDate;
                                }
                            }
                        }
                    }
                }else {
                    that.clear();
                }
            }
        },
        //静态数据查询
        doQuerySysStaticData:function () {
            let that = this;
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"VEHICLE_CODE"},function (data) {
                for(let el of data.items){
                    that.vehicleCodeList.push({
                        codeName:el.codeName,
                        vehicleType:el.codeValue,
                        startFee:"",
                        includeKilometers:"",
                        overMileage:"",
                        loadOnline:"",
                        volumeCost:"",
                        vehicleNote:"",
                        takeEffectDate:"",
                    })
                }
                that.vehicleCodeList.splice(0,1);
            })
            that.common.postUrl("api/sysPriceBO.ajax?cmd=getCity",{"cityId":that.cityId,"cityType":that.cityType},function (data) {
                let city = data;
                that.$refs.city.initData(city.ProvinceId, city.CityId, city.DistrictId, null);
                that.selectCallback(city);
            })
        },
        //清空查询条件
        clear:function () {
            let that = this;
            that.obj.id = null;
            that.obj.takeEffectDate = null;
            that.obj.priceType = 4;
        },

    },
    components:{
        ladderTable,
        mycity
    }
}