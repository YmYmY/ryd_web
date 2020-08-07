import myFileModel from '@/components/myFileModel/myFileModel.vue'
import mycity from '@/components/mycity/mycity.vue'
import coordtransform from '@/utils/coordtransform.js'
export default {
    name: 'trackInfo',
    data() {
        return {
            center:{lng: 116.404, lat: 39.915},
            zoom:12,
            obj:{
                createDate:[],
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
        this.initHtml();
        this.doQuerySysStaticData();
    },
    methods: {
        initHtml:function(){
            var bnow = new Date();
            bnow.setDate(bnow.getDate());
            let that = this;
            that.obj.createDate = that.common.formatTime(bnow,"yyyy-MM-dd HH:mm:ss") + "," + that.common.formatTime(bnow,"yyyy-MM-dd HH:mm:ss");
            that.obj.createDate = that.obj.createDate.split(",");
        },

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
            if(that.obj.createDate.length == 0 || that.obj.createDate.length !=2){
                that.$message.error('请选择行车时间！');
                return;
            }
            that.obj.qryBtm = that.obj.createDate[0];
            that.obj.qryEtm = that.obj.createDate[1];
            var dateStr = that.obj.qryBtm.substring(0,8);
            var dateEnd = that.obj.qryEtm.substring(0,8);
            dateStr = dateStr.replace(/-/g,'');
            dateEnd = dateEnd.replace(/-/g,'');
            if(dateStr != dateEnd){
                that.$message.error('开始时间与结束时间必须是同一个月！');
                return;
            }
            if(that.common.isBlank(that.obj.vehicleCode)){
                that.$message.error('请选择或者输入车牌号！');
                return;
            }
            if(that.common.isBlank(that.obj.licensePlateColor) || that.obj.licensePlateColor == "-1" ){
                that.$message.error('请选择车牌颜色！');
                return;
            }
            that.common.postUrl("api/sysVehicleBO.ajax?cmd=getTrack", that.obj,function(data){
                if(that.common.isBlank(data.listVehicle)){
                    that.$message.error('未查询到轨迹信息！');
                    return;
                }
                that.listVehicle = data.listVehicle;
                that.setCarsTrack();
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
        setCarsTrack(){
            this.map.clearOverlays();
            let tracelist = [];
            this.listVehicle.forEach(item => {                
                let lat = item.lat/600000;  //换算城WGS84坐标系
                let lng = item.lon/600000;
                // WGS84转GCj02
                let GcjPoint = coordtransform.wgs84togcj02(lng,lat);
                // 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
                let bdPoint = coordtransform.gcj02tobd09(GcjPoint.lng,GcjPoint.lat);                

                let point = new this.BMap.Point(bdPoint.lng,bdPoint.lat);
                tracelist.push(point);
            })
            let polyline =new this.BMap.Polyline(tracelist, {
                enableEditing: false,//是否启用线编辑，默认为false
                enableClicking: false,//是否响应点击事件，默认为true
                strokeWeight:'4',//折线的宽度，以像素为单位
                strokeOpacity: 0.8,//折线的透明度，取值范围0 - 1
                strokeColor:"red" //折线颜色
            });
            this.map.addOverlay(polyline);          //增加折线
            this.map.centerAndZoom(tracelist[this.listVehicle.length-1], 12);
            //首尾加上标注点
            let markerStartIcon = new this.BMap.Icon("/static/image/mapstart.png", new this.BMap.Size(30, 33));
            let markerStart = new this.BMap.Marker(tracelist[0],{icon: markerStartIcon}); // 创建点
            this.map.addOverlay(markerStart);                 // 加载标注

            let markerEndIcon = new this.BMap.Icon("/static/image/mapend.png", new this.BMap.Size(30, 33));
            let markerEnd = new this.BMap.Marker(tracelist[this.listVehicle.length-1],{icon: markerEndIcon}); // 创建点
            this.map.addOverlay(markerEnd);
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
                createDate:"",
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