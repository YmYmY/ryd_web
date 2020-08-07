import myFileModel from '@/components/myFileModel/myFileModel.vue'
import mycity from '@/components/mycity/mycity.vue'
import coordtransform from '@/utils/coordtransform.js'
export default {
    name: 'realTimePositioning',
    data() {
        return {
            center:{lng: 116.404, lat: 39.915},
            zoom:12,
            obj:{
                positioningType:"2",
                tenantFullName:"",
                vehicleCode:"",
                sendClientId:"",
                licensePlateColor:"-1",
                vehicle:"",
                driverName:"",
                driverPhone:"",
            },
            licensePlateColorList:[],
            positioningTypeList:[],
            customerTenantList:[],
            vehicleList:[],
        }
    },
    mounted() {
        this.doQuerySysStaticData();
    },
    methods: {
        selectVehicle:function(obj){
            let that = this;
            that.obj.vehicle = obj.vehicleCode;
            that.obj.vehicleCode = obj.vehicleCode;
            that.obj.driverName = obj.driverName;
            that.obj.driverPhone = obj.driverPhone;
            that.obj.licensePlateColor = obj.licensePlateColor+"";
            this.$forceUpdate();
        },
        setVehicleCode:function(obj){
            let that = this;
            that.obj.vehicleCode= obj.target.value;
            that.obj.vehicle= obj.target.value;
            this.$forceUpdate();
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
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"POSITIONING_TYPE","hasAll":true},function (data) {
                that.positioningTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"LICENSE_PLATE_COLOR","hasAll":true},function (data) {
                that.licensePlateColorList = data.items;
            })
        },
        selectCustomerTenant:function(obj){
            let that = this;
            that.obj.sendClientId = obj.tenantId;
            let tenantId=that.common.getCookie("tenantId");
            that.common.postUrl("api/sysVehicleBO.ajax?cmd=getSendVehicleCode", {"clientId":obj.tenantId,"tenantId":tenantId,"queryType":9},function(data){
                if(that.common.isNotBlank(data) && that.common.isNotBlank(data.items)){
                    that.vehicleList = data.items;
                }
            });
        },
        doQuery:function(){
            let that = this;
            if(that.obj.positioningType == "1"){
                if(that.common.isBlank(that.obj.sendClientId)){
                    that.$message.error('请选择客户！');
                    return;
                }
            }else {
                if(that.common.isBlank(that.obj.vehicleCode)){
                    that.$message.error('请选择或者输入车牌号！');
                    return;
                }
                if(that.common.isBlank(that.obj.licensePlateColor) || that.obj.licensePlateColor == "-1" ){
                    that.$message.error('请选择车牌颜色！');
                    return;
                }
            }
            that.common.postUrl("api/sysVehicleBO.ajax?cmd=getRealTimeLocation", that.obj,function(data){
                that.listVehicle = data.items;
                if(that.listVehicle.length == 0){
                    that.$message.error('未查询到定位信息！');
                    return;
                }
                that.setCarsMark();
            });
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        mapHandler({BMap, map}){
            this.BMap = BMap;
            this.map = map; 
            map.enableScrollWheelZoom(true);
        },
        // 向地图添加标注
        setCarsMark(){
            this.map.clearOverlays();
            this.listVehicle.forEach((item,idnex) => {
                let myIcon = new this.BMap.Icon("/static/image/marker.png", new this.BMap.Size(28, 78), {
                    // 指定定位位置
                    offset: new this.BMap.Size(0, 0),
                });
                let lat = item.lat/600000;  //换算城WGS84坐标系
                let lng = item.lon/600000;
                // WGS84转GCj02
                let GcjPoint = coordtransform.wgs84togcj02(lng,lat);
                // 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
                let bdPoint = coordtransform.gcj02tobd09(GcjPoint.lng,GcjPoint.lat);
                let point = new this.BMap.Point(bdPoint.lng,bdPoint.lat);
                
                // 创建标注对象并添加到地图 
                let marker = new this.BMap.Marker(point,{icon: myIcon});
                marker.setRotation(item.drc);
                this.map.addOverlay(marker);
                this.map.panTo(point);//移动地图中心点
                let sContent=`
                    <div style="line-height:30px">车牌：${item.vehicleCode}</div>
                    <div style="line-height:30px">司机：${item.driverName}</div>
                    <div style="line-height:30px">最新时间：${item.utc}</div>
                    <div style="line-height:30px">经度：${point.lng}</div>
                    <div style="line-height:30px">纬度：${point.lat}</div>
                `    
                let infoWindow = new this.BMap.InfoWindow(sContent);  // 创建信息窗口对象
                var label = new this.BMap.Label(item.vehicleCode,{offset:new this.BMap.Size(-30,0)});
                label.setStyle({
                    border:"1px solid #999",
                    borderRadius:"3px",
                    background:"#fff",
                    padding:"0 5px"
                })
                marker.setLabel(label);
                //只有一条数据时默认展示悬浮窗
                if(this.listVehicle.length==1){
                    this.map.openInfoWindow(infoWindow,point);
                }
                marker.addEventListener("click", function(){
                    this.map.openInfoWindow(infoWindow,point);
                });
            })
        },
        //设置悬浮窗
        setLabel(){
            let data = this.listVehicle[0];
            var sContent=`
                <div style="line-height:30px">车牌：${data.vehicleCode}</div>
                <div style="line-height:30px">司机：${data.driverName}</div>
                <div style="line-height:30px">最新时间：${data.utc}</div>
                <div style="line-height:30px">经度：${data.lon}</div>
                <div style="line-height:30px">纬度：${data.lat}</div>
            `    
            let infoWindow = new this.BMap.InfoWindow(sContent);  // 创建信息窗口对象
            marker.addEventListener("click", function(){          
                this.openInfoWindow(infoWindow);
            });
        },
        clear:function(){
            let that = this;
            that.obj={
                positioningType:"2",
                tenantFullName:"",
                vehicleCode:"",
                sendClientId:"",
                licensePlateColor:"-1",
                vehicle:"",
                driverName:"",
                driverPhone:"",
            }
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