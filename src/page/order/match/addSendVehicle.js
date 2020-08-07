import myFileModel from '@/components/myFileModel/myFileModel.vue'
import mycity from '@/components/mycity/mycity.vue'
import mapDialog from '@/components/mapDialog/mapDialog.vue'
export default {
    name: 'addSendVehicle',
    data() {
        return {
            customerTenantList:[],
            warehouseList:[],
            paymentTypeList:[],
            vehicleList:[],
            driverList:[],
            licensePlateColorList:[],
            selectType:3,
            obj:{
                sendBatch:"",
                tenantFullName:"",
                sendClientName:"",
                sendClientPhone:"",
                sendClientPerson:"",
            },
            sendObj:{
                dependDate:null,
                dependWarehouseId:null,
                dependWarehouseName:null,
                dependWarehousePhone:null,
                dependAddress:"",
                arriveDate:null,
                arriveWarehouseId:null,
                arriveWarehouseName:null,
                arriveWarehousePhone:null,
                arriveAddress:"",
                vehicleId:"",
                driverName:"",
                driverPhone:"",
                packageWeight:"",
                packageVolume:"",
                sendNumber:"",
                paymentType:"-1",
                sendCost:"",
                sendRemarks:"",
                dependWarehousePerson:"",
                arriveWarehousePerson:"",
                dependStoreFullName:"",
                arriveStoreFullName:"",
                vehicle:"",
                licensePlateColor:"",
            },
            sendIndex:0, //对账信息tab默认第一个
            sendList:[],
            isShowMap:false,
            mapPoint:null,
        }
    },
    mounted() {
        this.doQuerySysStaticData();
        //this.initData();
    },
    methods: {
        initData(){
            this.sendList = [   //对账信息数组对象
                {
                    ...this.sendObj,
                    active:true,
                    name:"派车单1"
                },
                {
                    ...this.sendObj,
                    name:"派车单2"
                },
                {
                    ...this.sendObj,
                    name:"派车单3"
                },
                {
                    ...this.sendObj,
                    name:"派车单4"
                },
                {
                    ...this.sendObj,
                    name:"派车单5"
                },
            ]
            this.pushSendNumber();
            this.$forceUpdate();
        },
        cleanCity:function(){
            let that = this;
            for(let i=0;i<5;i++){
                that.$refs['dependCity'+i][0].cleanData();
                that.$refs['arriveCity'+i][0].cleanData();
            }
            this.$forceUpdate();
        },
        selectDependCity:function(){
            let that = this;
            that.dependCity =that.$refs['dependCity'+that.sendIndex][0].getData();
            that.sendList[that.sendIndex].dependProvince = that.dependCity.ProvinceId;
            that.sendList[that.sendIndex].dependCity = that.dependCity.CityId;
            that.sendList[that.sendIndex].dependCounty = that.dependCity.DistrictId;
            this.$forceUpdate();
        },
        selectArriveCity:function(){
            let that = this;
            that.arriveCity =that.$refs['arriveCity'+that.sendIndex][0].getData();
            that.sendList[that.sendIndex].arriveProvince = that.arriveCity.ProvinceId;
            that.sendList[that.sendIndex].arriveCity = that.arriveCity.CityId;
            that.sendList[that.sendIndex].arriveCounty = that.arriveCity.DistrictId;
            this.$forceUpdate();
        },
        selectVehicle:function(obj){
            let that = this;
            that.sendList[that.sendIndex].vehicleId = obj.vehicleId;
            that.sendList[that.sendIndex].vehicleCode = obj.vehicleCode;
            that.sendList[that.sendIndex].licensePlateColor = obj.licensePlateColor+"";
            this.$forceUpdate();
        },
        selectDriver:function(obj){
            let that = this;
            that.sendList[that.sendIndex].driverName = obj.driverName;
            that.sendList[that.sendIndex].driverPhone = obj.driverPhone;
            that.sendList[that.sendIndex].driver = obj.driverName;
            this.$forceUpdate();
        },
        selectDependWarehouse:function(obj){
            let that = this;
            that.sendList[that.sendIndex].dependWarehouseId = obj.id;
            that.sendList[that.sendIndex].dependWarehouseName = obj.storeFullName;
            that.sendList[that.sendIndex].dependWarehousePerson = obj.warehousePeople;
            that.sendList[that.sendIndex].dependWarehousePhone = obj.warehousePhone;
            that.sendList[that.sendIndex].dependAddress = obj.warehouseAddress;
            that.sendList[that.sendIndex].dependProvince = obj.provinceId;
            that.sendList[that.sendIndex].dependCity = obj.cityId;
            that.sendList[that.sendIndex].dependCounty = obj.districtId;
            that.$refs['dependCity'+that.sendIndex][0].initData(obj.provinceId, obj.cityId, obj.districtId, null);
            this.$forceUpdate();
        },
        selectArriveWarehouse:function(obj){
            let that = this;
            that.sendList[that.sendIndex].arriveWarehouseId = obj.id;
            that.sendList[that.sendIndex].arriveWarehouseName = obj.storeFullName;
            that.sendList[that.sendIndex].arriveWarehousePerson = obj.warehousePeople;
            that.sendList[that.sendIndex].arriveWarehousePhone = obj.warehousePhone;
            that.sendList[that.sendIndex].arriveAddress = obj.warehouseAddress;
            that.sendList[that.sendIndex].arriveProvince = obj.provinceId;
            that.sendList[that.sendIndex].arriveCity = obj.cityId;
            that.sendList[that.sendIndex].arriveCounty = obj.districtId;
            that.$refs['arriveCity'+that.sendIndex][0].initData(obj.provinceId, obj.cityId, obj.districtId, null);
            this.$forceUpdate();
        },
        selectCustomerTenant:function(obj){
            let that = this;
            that.obj.sendClientName = obj.tenantFullName;
            that.obj.sendClientId = obj.tenantId;
            that.obj.sendClientPerson = obj.tenantPrincipal;
            that.obj.sendClientPhone = obj.tenantPhone;
            that.common.postUrl("api/cmWarehouseBO.ajax?cmd=doQueryStoreAll", {"attributionType":2,"tenantId":obj.tenantId},function(data){
                if(that.common.isNotBlank(data) && that.common.isNotBlank(data.items)){
                    that.warehouseList = data.items;
                }
            });
            let tenantId=that.common.getCookie("tenantId");
            that.common.postUrl("api/sysVehicleBO.ajax?cmd=getSendVehicleCode", {"clientId":obj.tenantId,"tenantId":tenantId,"queryType":8},function(data){
                if(that.common.isNotBlank(data) && that.common.isNotBlank(data.items)){
                    that.vehicleList = data.items;
                }
            });
            that.common.postUrl("api/sysVehicleBO.ajax?cmd=getSendVehicleDriver", {"clientId":obj.tenantId,"tenantId":tenantId,"queryType":8},function(data){
                if(that.common.isNotBlank(data) && that.common.isNotBlank(data.items)){
                    that.driverList = data.items;
                }
            });
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"LICENSE_PLATE_COLOR"},function (data) {
                that.licensePlateColorList = data.items;
            })
            that.cleanCity();
            that.initData();
            this.$forceUpdate();
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        //静态数据查询
        doQuerySysStaticData:function () {
            let that = this;
            let tenantId=that.common.getCookie("tenantId");
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantDefPName", {"pTenantId":tenantId},function(data){
                if(that.common.isNotBlank(data) && that.common.isNotBlank(data.items)){
                    that.customerTenantList = data.items;
                }
            });
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"ORDER_PAYMENT_TYPE","hasAll":true},function (data) {
                that.paymentTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=getSendBatch",{"type":"1"},function (data) {
                that.obj.sendBatch = data;
                that.initData();
            })
        },
        pushSendNumber:function(){
          let that = this;
          for(let i=0;i<5;i++){
              let j = i + 1;
              if(that.common.isNotBlank(that.obj.sendBatch)){
                  that.sendList[i].sendNumber = that.obj.sendBatch + "-" + j;
              }else {
                  that.sendList[i].sendNumber = "";
              }
          }
          this.$forceUpdate();
        },
        setVehicleCode:function(obj){
            let that = this;
            that.sendList[that.sendIndex].vehicleCode = obj.target.value;
            that.sendList[that.sendIndex].vehicle = obj.target.value;
            this.$forceUpdate();
        },
        setDriverName:function(obj){
            let that = this;
            that.sendList[that.sendIndex].driverName = obj.target.value;
            that.sendList[that.sendIndex].driver = obj.target.value;
            this.$forceUpdate();
        },
        doSave:function () {
            let that = this;
            if(that.common.isBlank( that.obj.sendBatch)){
                that.$message.error('请输入派车批次！');
                return;
            }
            if(that.common.isBlank( that.obj.sendClientId)){
                that.$message.error('请选择客户！');
                return;
            }
            let sendListNew = [];
            for(let el of that.sendList){
                if(that.common.isNotBlank(el.dependDate) && that.common.isNotBlank(el.vehicleCode)){
                    if(that.common.isBlank(el.dependWarehousePerson)){
                        that.$message.error('请输入靠台联系人！');
                        return;
                    }
                    if(that.common.isBlank(el.dependWarehousePhone)){
                        that.$message.error('请输入靠台联系电话！');
                        return;
                    }
                    if(that.common.isBlank(el.dependProvince)){
                        that.$message.error('请选择靠台地区！');
                        return;
                    }
                    if(that.common.isBlank(el.dependAddress)){
                        that.$message.error('请输入靠台详细地址！');
                        return;
                    }
                    if(that.common.isBlank(el.arriveWarehousePerson)){
                        that.$message.error('请输入到达联系人！');
                        return;
                    }
                    if(that.common.isBlank(el.arriveWarehousePhone)){
                        that.$message.error('请输入到达联系电话！');
                        return;
                    }
                    if(that.common.isBlank(el.arriveProvince)){
                        that.$message.error('请选择到达地区！');
                        return;
                    }
                    if(that.common.isBlank(el.arriveAddress)){
                        that.$message.error('请输入到达详细地址！');
                        return;
                    }
                    if(that.common.isBlank(el.vehicleCode)){
                        that.$message.error('请输入车牌号码！');
                        return;
                    }
                    if(that.common.isBlank(el.licensePlateColor)){
                        that.$message.error('请选择车牌颜色！');
                        return;
                    }
                    if(that.common.isBlank(el.driverName)){
                        that.$message.error('请选择司机！');
                        return;
                    }

                    if(that.common.isBlank(el.driverName)){
                        that.$message.error('请选择司机！');
                        return;
                    }
                    if(that.common.isBlank(el.driverPhone)){
                        that.$message.error('请输入司机电话！');
                        return;
                    }
                    if(that.common.isBlank(el.arriveDate)){
                        el.arriveDate="";
                    }
                    sendListNew.push(el);
                }
            }
            if(sendListNew.length == 0){
                that.$message.error('请完善派车信息！');
                return;
            }
            that.obj.sendList = JSON.stringify(sendListNew);
            that.$confirm(that.rms, '是否新增项目派发？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysVehicleBO.ajax?cmd=doSaveSendProject";
                that.common.postUrl(url,that.obj,function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "新增派发成功"
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
        //对账信息tab切换
        accountChange(index){
            this.sendIndex = index;
            this.$forceUpdate();
        },
        //地图确认回调
        mapCallback(mapInfo){
            this.mapPoint = mapInfo;
            let that = this;
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=getBaiduAdderByLatAndLngV3",{"lat":mapInfo.lat,"lng":mapInfo.lng},function (data) {
                if(that.type == 1){
                    that.sendList[that.sendIndex].dependAddress = mapInfo.mapText;
                    that.$refs['dependCity'+that.sendIndex][0].initData(data.provinceId, data.cityId, data.countyId, null);
                }else {
                    that.sendList[that.sendIndex].arriveAddress = mapInfo.mapText;
                    that.$refs['arriveCity'+that.sendIndex][0].initData(data.provinceId, data.cityId, data.countyId, null);
                }
                that.$forceUpdate();
            })
        },
        hideMapBack(){
            this.isShowMap = false;
        },

        //显示地图
        showMap(type){
            this.type = type;
            this.isShowMap = true;
            // 回显选中地址
            // this.$refs.mapDialog.setMapPoint(this.mapInfo);
        },
        forceUpdate:function () {
            this.$forceUpdate();
        },
    },
    components: {
        myFileModel,
        mycity,
        mapDialog
    }
}