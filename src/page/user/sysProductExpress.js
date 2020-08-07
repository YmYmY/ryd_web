import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"
import mycity from '@/components/mycity/mycity.vue'
export default {
    name: 'sysProductExpress',
    data() {
        return {
            //table组件数据
            head :[
                {"name":"始发地","code":"startCityName","width":"100"},
                {"name":"目的地","code":"endCityName","width":"100","type" : "text"},
                {"name":"线路折扣（%）","code":"lineDiscount","width":"100","type" : "text"},
                {"name":"取件时效（天）","code":"deliveryNum","width":"100","type" : "text"},
                {"name":"配送时效（天）","code":"agingNum","width":"100","type" : "text"},
                {"name":"截止收件日期","code":"cutoffDate","width":"100","type" : "text"},
                {"name":"起始重量（公斤）","code":"startWeight","width":"100"},
                {"name":"首价（元）","code":"startCost","width":"100"},
                {"name":"续重范围1（公斤）","code":"weightOne","width":"150"},
                {"name":"续价1（元/公斤）","code":"weightOneCost","width":"150"},
                {"name":"续重范围2（公斤） ","code":"weightTwo","width":"150"},
                {"name":"续价2（元/公斤）","code":"weightTwoCost","width":"150"},
                {"name":"续重范围3（公斤） ","code":"weightThree","width":"150"},
                {"name":"续价3（元/公斤）","code":"weightThreeCost","width":"150"},
                {"name":"续重范围4（公斤） ","code":"weightFour","width":"150"},
                {"name":"续价4（元/公斤）","code":"weightFourCost","width":"150"},
                {"name":"续重范围5（公斤） ","code":"weightFives","width":"150"},
                {"name":"续价5（元/公斤）","code":"weightFivesCost","width":"150"},
                {"name":"截止收件时间","code":"cutoffDate","width":"80","type" : "text"},
            ],
            obj:{},
        }
    },
    //进入页面
    beforeRouteEnter(to,from,next){
        next(that => {
            //调用刷新方法
            that.doQuerySysProductExpress();
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
                urlName: "快运价格导入",
                urlId: new Date().getTime(),
                urlPath: "/common/importTemplate/importTemplate.vue",
                urlPathName: "/importOrderTemplate",
                query:{
                    importList : [
                        {bizName:"快运导入",excelFile:"/static/excel/sysProductExpress.xlsx",bizCode:"IMP_PRICE_100013",remarks:"快运价格导入"},
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
            that.$refs.endCity.cleanData();
        },
        doQuerySysProductExpress:function () {
            let that = this;
            that.startCity =that.$refs.startCity.getData()
            if(!that.common.isBlank(that.startCity.ProvinceId)){
                that.obj.startCityId = that.startCity.ProvinceId;
            }
            if(!that.common.isBlank(that.startCity.CityId)){
                that.obj.startCityId = that.startCity.CityId;
            }
            if(!that.common.isBlank(that.startCity.DistrictId)){
                that.obj.startCityId = that.startCity.DistrictId;
            }
            that.endCity =that.$refs.endCity.getData()
            if(!that.common.isBlank(that.endCity.ProvinceId)){
                that.obj.endCityId = that.endCity.ProvinceId;
            }
            if(!that.common.isBlank(that.endCity.CityId)){
                that.obj.endCityId = that.endCity.CityId;
            }
            if(!that.common.isBlank(that.endCity.DistrictId)){
                that.obj.endCityId = that.endCity.DistrictId;
            }
            let url = "api/sysPriceBO.ajax?cmd=doQuerySysProductExpress";
            this.$refs.table.load(url,that.obj);
        },
        //新增
        addSysProductExpress:function () {
            let that = this;
            let item = {
                urlName: "新增快运运价",
                urlId: "13" + new Date().getTime(),
                urlPath: "/user/addSysProductExpress.vue",
                urlPathName: "/addSysProductExpress",
                query:{}
            }
            that.$emit('openTab', item);
        },
        //修改
        updateSysProductExpress:function () {
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
                urlName: "修改快运运价",
                urlId: "13" + new Date().getTime(),
                urlPath: "/user/addSysProductExpress.vue",
                urlPathName: "/addSysProductExpress",
                query:{"cityId":that.selectData[0].startCityId,"cityType":that.selectData[0].startCityType}
            }
            that.$emit('openTab', item);
        },
        deleteSysProductExpress:function () {
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
            that.$confirm(that.rms, '是否删除快运运价？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysPriceBO.ajax?cmd=deleteSysProductExpress";
                that.common.postUrl(url,{"ids":that.ids},function (data) {
                    if(data != 'success'){
                        that.$message.error('删除失败！');
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "删除成功"
                        });
                        that.doQuerySysProductExpress();
                    }
                });
            });
        },
    },
}