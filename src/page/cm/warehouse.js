import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"
import mycity from '@/components/mycity/mycity.vue'
export default {
    name: 'warehouse',
    data() {
        return {
            //table组件数据
            head :[
                {"name":"仓库编码","code":"clientCode","width":"150","type" : "text"},
                {"name":"仓库名称","code":"warehouseFullName","width":"100","type" : "text"},
                {"name":"仓库类型","code":"warehouseTypeName","width":"100","type" : "text"},
                {"name":"联系人","code":"warehousePeople","width":"100","type" : "text"},
                {"name":"联系手机","code":"warehousePhone","width":"80","type" : "text"},
                {"name":"添加时间","code":"createDate","width":"80","type" : "text"},
                {"name":"联系电话","code":"warehouseTelephone","width":"120","type" : "text"},
                {"name":"省市区","code":"cityName","width":"120","type" : "text"},
                {"name":"详细地址","code":"warehouseAddress","width":"120","type" : "text"},
                {"name":"经营品牌","code":"brandName","width":"120","type" : "text"},
            ],
            obj:{
                createDate:"",
                warehouseFullName:null,
                warehousePeople:null,
                warehousePhone:null,
                warehouseType:"-1",
                type:2,
            },
            brandId:"",
            showBrand:false,
            warehouseTypeList: [],
            brandList:[],
        }
    },
    //进入页面
    beforeRouteEnter(to,from,next){
        next(that => {
            //调用刷新方法
            that.doQueryWarehouse();
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
                warehouseFullName:null,
                warehousePeople:null,
                warehousePhone:null,
                warehouseType:"-1",
            }
        },
        doQueryWarehouse:function () {
            let that = this;
            let url = "api/cmWarehouseBO.ajax?cmd=doQueryCmWarehouse";
            this.$refs.table.load(url,that.obj);
        },
        //静态数据查询
        doQuerySysStaticData:function () {
            let that = this;
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"WAREHOUSE_TYPE","hasAll":true},function (data) {
                that.warehouseTypeList = data.items;
            })
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysBrand",{},function (data) {
                that.brandList = data.items;
            })
        },
        //新增
        addWarehouse:function () {
            let that = this;
            let item = {
                urlName: "新增仓库",
                urlId: "13" + new Date().getTime(),
                urlPath: "/cm/addWarehouse.vue",
                urlPathName: "/addWarehouse",
                query:{}
            }
            that.$emit('openTab', item);
        },
        //修改
        updateWarehouse:function () {
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
                urlName: "修改仓库",
                urlId: "13" + new Date().getTime(),
                urlPath: "/cm/updateWarehouse.vue",
                urlPathName: "/updateWarehouse",
                query:{"warehouseId":selectData[0].warehouseId}
            }
            that.$emit('openTab', item);
        },
        doSaveBrand:function(){
            let that = this;
            if(this.common.isBlank(that.brandId)){
                that.$message.error('请选择品牌！');
                return;
            }
            that.$confirm("确认设置品牌？", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.common.postUrl("api/cmWarehouseBO.ajax?cmd=setBrand",{"warehouseIds": that.warehouseIds,"brandId":that.brandId},function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.doQueryWarehouse();
                        that.showBrand=false;
                        that.$message({
                            type: 'success',
                            message: "设置成功"
                        });
                    }
                });
            });
        },
        //品牌设置
        setBrand:function(){
            let that = this;
            that.selectData = that.$refs.table.getSelectItem();
            if(that.selectData.length == 0){
                that.$message.error('请选择需要设置品牌数据！');
                return;
            }
            that.warehouseIds="";
            that.selectData.forEach((el,index)=>{
                if(index == that.selectData.length-1){
                    that.warehouseIds+=el.warehouseId ;
                }else {
                    that.warehouseIds+=el.warehouseId + ",";
                }
            })
            that.showBrand=true;
        },
        //删除
        deleteWarehouse:function () {
            let that = this;
            that.selectData = that.$refs.table.getSelectItem();
            if(that.selectData.length == 0){
                that.$message.error('请选择需要删除的数据！');
                return;
            }
            that.warehouseIds="";
            that.selectData.forEach((el,index)=>{
                if(index == that.selectData.length-1){
                    that.warehouseIds+=el.warehouseId ;
                }else {
                    that.warehouseIds+=el.warehouseId + ",";
                }
            })
            that.$confirm("确认删除？", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.common.postUrl("api/cmWarehouseBO.ajax?cmd=deleteCmWarehouse",{"warehouseIds": that.warehouseIds},function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.doQueryWarehouse();
                        that.$message({
                            type: 'success',
                            message: "删除成功"
                        });
                    }
                });
            });
        },
    },
}