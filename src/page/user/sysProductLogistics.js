import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"
import mycity from '@/components/mycity/mycity.vue'
export default {
    name: 'sysProductLogistics',
    data() {
        return {
            //table组件数据
            head :[
                {"name":"始发地","code":"startCityName","width":"100"},
                {"name":"目的地","code":"endCityName","width":"100","type" : "text"},
                {"name":"按体积（方）","code":"volumeCost","width":"80","type" : "text"},
                {"name":"按重量（公斤）","code":"weightCost","width":"80","type" : "text"},
                {"name":"按数量（件）","code":"numCost","width":"80","type" : "text"},
                {"name":"截止收件日期","code":"cutoffDate","width":"80","type" : "text"},
                {"name":"线路折扣（%）","code":"lineDiscount","width":"100"},
                {"name":"取件时效（天）","code":"deliveryNum","width":"80","type" : "text"},
                {"name":"配送时效（天）","code":"agingNum","width":"80","type" : "text"},
                {"name":"生效时间","code":"takeEffectDate","width":"80","type" : "text"},
                {"name":"截止收件时间","code":"cutoffDate","width":"80","type" : "text"},

            ],
            obj:{},
        }
    },
    //进入页面
    beforeRouteEnter(to,from,next){
        next(that => {
            //调用刷新方法
            that.doQuerySysProductLogistics();
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
                urlName: "物流价格导入",
                urlId: new Date().getTime(),
                urlPath: "/common/importTemplate/importTemplate.vue",
                urlPathName: "/importOrderTemplate",
                query:{
                    importList : [
                        {bizName:"物流价格导入",excelFile:"/static/excel/sysProductLogistics.xlsx",bizCode:"IMP_PRICE_100014",remarks:"物流价格导入"},
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
        doQuerySysProductLogistics:function () {
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
            let url = "api/sysPriceBO.ajax?cmd=doQuerySysProductLogistics";
            this.$refs.table.load(url,that.obj);
        },
        //新增
        addSysProductLogistics:function () {
            let that = this;
            let item = {
                urlName: "新增物流运价",
                urlId: "13" + new Date().getTime(),
                urlPath: "/user/addSysProductLogistics.vue",
                urlPathName: "/addSysProductLogistics",
                query:{}
            }
            that.$emit('openTab', item);
        },
        //修改
        updateSysProductLogistics:function () {
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
                urlName: "修改物流运价",
                urlId: "13" + new Date().getTime(),
                urlPath: "/user/addSysProductLogistics.vue",
                urlPathName: "/addSysProductLogistics",
                query:{"cityId":that.selectData[0].startCityId,"cityType":that.selectData[0].startCityType}
            }
            that.$emit('openTab', item);
        },
        deleteSysProductLogistics:function () {
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
                let url ="api/sysPriceBO.ajax?cmd=deleteSysProductLogistics";
                that.common.postUrl(url,{"ids":that.ids},function (data) {
                    if(data != 'success'){
                        that.$message.error('删除失败！');
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "删除成功"
                        });
                        that.doQuerySysProductLogistics();
                    }
                });
            });
        },
    },
}