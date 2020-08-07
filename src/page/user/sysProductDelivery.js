import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"
import mycity from '@/components/mycity/mycity.vue'
export default {
    name: 'sysProductDelivery',
    data() {
        return {
            //table组件数据
            head :[
                {"name":"出发地","code":"startCityName","width":"100","type" : "text"},
                {"name":"目的地","code":"endCityName","width":"100","type" : "text"},
                {"name":"首价（元）","code":"startCost","width":"80","type" : "text"},
                {"name":"起始重量（公斤）","code":"startWeight","width":"80","type" : "text"},
                {"name":"续价（元/公斤）","code":"weightOneCost","width":"80","type" : "text"},
                {"name":"线路折扣（%）","code":"lineDiscount","width":"80","type" : "text"},
                {"name":"取件时效（天）","code":"deliveryNum","width":"80","type" : "text"},
                {"name":"配送时效（天）","code":"agingNum","width":"80","type" : "text"},
                {"name":"截止收件时间","code":"cutoffDate","width":"80","type" : "text"},
                {"name":"生效时间","code":"takeEffectDate","width":"80","type" : "text"}
            ],
            obj:{},
        }
    },
    //进入页面
    beforeRouteEnter(to,from,next){
        next(that => {
            //调用刷新方法
            that.doQuerySysProductDelivery();
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
                urlName: "快递价格导入",
                urlId: new Date().getTime(),
                urlPath: "/common/importTemplate/importTemplate.vue",
                urlPathName: "/importOrderTemplate",
                query:{
                    importList : [
                        {bizName:"快递导入",excelFile:"/static/excel/sysProductDelivery.xlsx",bizCode:"IMP_PRICE_100012",remarks:"快递价格导入"},
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
        doQuerySysProductDelivery:function () {
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
            let url = "api/sysPriceBO.ajax?cmd=doQuerySysProductDelivery";
            this.$refs.table.load(url,that.obj);
        },
        //新增
        addSysProductDelivery:function () {
            let that = this;
            let item = {
                urlName: "新增快递运价",
                urlId: "13" + new Date().getTime(),
                urlPath: "/user/addSysProductDelivery.vue",
                urlPathName: "/addSysProductDelivery",
                query:{}
            }
            that.$emit('openTab', item);
        },
        //修改
        updateSysProductDelivery:function () {
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
                urlName: "修改快递运价",
                urlId: "13" + new Date().getTime(),
                urlPath: "/user/addSysProductDelivery.vue",
                urlPathName: "/addSysProductDelivery",
                query:{"cityId":that.selectData[0].startCityId,"cityType":that.selectData[0].startCityType}
            }
            that.$emit('openTab', item);
        },
        deleteSysProductDelivery:function () {
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
            that.$confirm(that.rms, '是否删除快递运价？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysPriceBO.ajax?cmd=deleteSysProductDelivery";
                that.common.postUrl(url,{"ids":that.ids},function (data) {
                    if(data != 'success'){
                        that.$message.error('删除失败！');
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "删除成功"
                        });
                        that.doQuerySysProductDelivery();
                    }
                });
            });
        },
    },
}