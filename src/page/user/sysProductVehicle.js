import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"
import mycity from '@/components/mycity/mycity.vue'
export default {
    name: 'sysProductVehicle',
    data() {
        return {
            //table组件数据
            head :[
                {"name":"所在区域","code":"startCityName","width":"100"},
                {"name":"车型","code":"vehicleTypeName","width":"100","type" : "text"},
                {"name":"起步价（元）","code":"startFee","width":"80","type" : "text"},
                {"name":"包含公里","code":"includeKilometers","width":"80","type" : "text"},
                {"name":"超里程（元/公里）","code":"overMileage","width":"80","type" : "text"},
                {"name":"载重（公斤）","code":"loadOnline","width":"80","type" : "text"},
                {"name":"体积（方）","code":"volumeCost","width":"100"},
                {"name":"生效时间","code":"takeEffectDate","width":"100"},
                {"name":"截止收件时间","code":"cutoffDate","width":"80","type" : "text"},
                {"name":"备注","code":"vehicleNote","width":"80","type" : "text"},
            ],
            obj:{},
        }
    },
    //进入页面
    beforeRouteEnter(to,from,next){
        next(that => {
            //调用刷新方法
            that.doQuerySysProductVehicle();
        });
    },
    components: {
        tableCommon,
        mycity
    },
    methods: {
        // 跳转到 导入界面
        importOrder(){
            let item = {
                urlName: "整车价格导入",
                urlId: new Date().getTime(),
                urlPath: "/common/importTemplate/importTemplate.vue",
                urlPathName: "/importOrderTemplate",
                query:{
                    importList : [
                        {bizName:"整车价格导入",excelFile:"/static/excel/sysProductVehicle.xlsx",bizCode:"IMP_PRICE_100015",remarks:"整车价格导入"},
                    ]
                },
            }
            this.$emit('openTab', item);
        },
        downloadExcelFile:function(){
            this.$refs.table.downloadExcelFile();
        },
        //清空查询条件
        clear:function () {
            let that = this;
            that.$refs.startCity.cleanData();
        },
        doQuerySysProductVehicle:function () {
            let that = this;
            that.startCity =that.$refs.startCity.getData()
            if(!that.common.isBlank(that.startCity.ProvinceId)){
                that.obj.cityId = that.startCity.ProvinceId;
            }
            if(!that.common.isBlank(that.startCity.CityId)){
                that.obj.cityId = that.startCity.CityId;
            }
            if(!that.common.isBlank(that.startCity.DistrictId)){
                that.obj.cityId = that.startCity.DistrictId;
            }
            let url = "api/sysPriceBO.ajax?cmd=doQuerySysProductVehicle";
            this.$refs.table.load(url,that.obj);
        },
        //新增
        addSysProductVehicle:function () {
            let that = this;
            let item = {
                urlName: "新增整车运价",
                urlId: "13" + new Date().getTime(),
                urlPath: "/user/addSysProductVehicle.vue",
                urlPathName: "/addSysProductVehicle",
                query:{}
            }
            that.$emit('openTab', item);
        },
        //修改
        updateSysProductVehicle:function () {
            let that = this;
            that.selectData = that.$refs.table.getSelectItem();
            if(that.selectData.length == 0){
                that.$message.error('请选择需要修改的数据！');
                return;
            }
            if(that.selectData.length != 1){
                that.$message.error('只能选择一条数据！');
                return;
            }
            let item = {
                urlName: "修改整车运价",
                urlId: "13" + new Date().getTime(),
                urlPath: "/user/addSysProductVehicle.vue",
                urlPathName: "/addSysProductVehicle",
                query:{"cityId":that.selectData[0].cityId,"cityType":that.selectData[0].cityType}
            }
            that.$emit('openTab', item);
        },
        deleteSysProductVehicle:function () {
            let that = this;
            that.selectData = that.$refs.table.getSelectItem();
            if(that.selectData.length == 0){
                that.$message.error('请选择需要删除的数据！');
                return;
            }
            that.ids="";
            that.selectData.forEach((el,index)=>{
                if(index == that.selectData.length-1){
                    that.ids+=el.id ;
                }else {
                    that.ids+=el.id + ",";
                }
            })
            that.$confirm(that.rms, '是否删除物流运价？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysPriceBO.ajax?cmd=deleteSysProductVehicle";
                that.common.postUrl(url,{"ids":that.ids},function (data) {
                    if(data != 'success'){
                        that.$message.error('删除失败！');
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "删除成功"
                        });
                        that.doQuerySysProductVehicle();
                    }
                });
            });
        },
    },
}