import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"
import mycity from '@/components/mycity/mycity.vue'
export default {
    name: 'sysVehicle',
    data() {
        return {
            //table组件数据
            head :[
                {"name":"添加时间","code":"createDate","width":"150","type" : "text"},
                {"name":"所属区域","code":"regionName","width":"150","type" : "text"},
                {"name":"注册区域","code":"cityName","width":"100","type" : "text"},
                {"name":"车牌号码","code":"vehicleCode","width":"100","type" : "text"},
                {"name":"司机姓名","code":"driverName","width":"80","type" : "text"},
                {"name":"司机手机","code":"driverPhone","width":"80","type" : "text"},
                {"name":"车辆属性","code":"vehicleAttributesName","width":"80","type" : "text"},
                {"name":"车辆类型","code":"vehicleTypeName","width":"80","type" : "text"},
                {"name":"车主姓名","code":"carName","width":"80","type" : "text"},
                {"name":"车主电话","code":"carPhone","width":"80","type" : "text"},
                {"name":"车主住址","code":"carAddress","width":"80","type" : "text"},
                {"name":"车主身份证","code":"carCard","width":"80","type" : "text"},
                {"name":"载重","code":"vehicleLoad","width":"80","type" : "text"},
                {"name":"载方","code":"vehicleZaifang","width":"100","type" : "text"},
            ],
            selectType:3,
            vehicleAttributesList:[],
            obj:{
                createDate:"",
                vehicleAttributes:'-1',
                vehicleCode:"",
                carName:"",
                driverName:"",
                clientIds:"",
            },
        }
    },
    //进入页面
    beforeRouteEnter(to,from,next){
        next(that => {
            //调用刷新方法
            that.doQuerySysVehicle();
            that.doQuerySysStaticData();
        });
    },
    components: {
        tableCommon,
        mycity
    },
    methods: {
        downloadExcelFile:function(){
            this.$refs.table.downloadExcelFile();
        },
        //清空查询条件
        clear:function () {
            let that = this;
            that.$refs.city.cleanData();
            that.obj ={
                createDate:"",
                vehicleAttributes:'-1',
                vehicleCode:"",
                convoyName:"",
                driverName:"",
            }
        },
        doQuerySysVehicle:function () {
            let that = this;
            that.regionCity =that.$refs.city.getData()
            that.obj.regionProvince = that.regionCity.ProvinceId;
            that.obj.regionCity = that.regionCity.CityId;
            that.obj.regionCounty = that.regionCity.DistrictId;
            let url = "api/sysVehicleBO.ajax?cmd=doQuerySysVehicle";
            this.$refs.table.load(url,that.obj);
        },
        //静态数据查询
        doQuerySysStaticData:function () {
            let that = this;
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"VEHICLE_ATTRIBUTES","hasAll":true},function (data) {
                that.vehicleAttributesList = data.items;
            })
        },
        //新增
        addSysVehicle:function () {
            let that = this;
            let item = {
                urlName: "新增车辆",
                urlId: "13" + new Date().getTime(),
                urlPath: "/sys/addSysVehicle.vue",
                urlPathName: "/addSysVehicle",
                query:{}
            }
            that.$emit('openTab', item);
        },
        //修改
        updateSysVehicle:function () {
            let that = this;
            let selectData = that.$refs.table.getSelectItem();
            if(selectData.length == 0){
                that.$message.error('请选择需要修改的数据！');
                return;
            }
            if(selectData.length != 1){
                that.$message.error('只能选择一条数据！');
                return;
            }
            let item = {
                urlName: "修改车辆",
                urlId: "13" + new Date().getTime(),
                urlPath: "/sys/updateSysVehicle.vue",
                urlPathName: "/updateSysVehicle",
                query:{"vehicleId":selectData[0].vehicleId}
            }
            that.$emit('openTab', item);
        },
        deleteSysVehicle:function () {
            let that = this;
            that.selectData = that.$refs.table.getSelectItem();
            if(that.selectData.length == 0){
                that.$message.error('请选择需要删除的数据！');
                return;
            }
            that.vehicleIds="";
            that.selectData.forEach((el,index)=>{
                if(index == that.selectData.length-1){
                    that.vehicleIds+=el.vehicleId ;
                }else {
                    that.vehicleIds+=el.vehicleId + ",";
                }
            })
            that.$confirm(that.rms, '是否删除车辆？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysVehicleBO.ajax?cmd=deleteSysVehicle";
                that.common.postUrl(url,{"vehicleIds":that.vehicleIds},function (data) {
                    if(data != 'success'){
                        that.$message.error('删除失败！');
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "删除成功"
                        });
                        that.doQuerySysVehicle();
                    }
                });
            });
        },

    },
}