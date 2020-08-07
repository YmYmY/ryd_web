import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"
import mycity from '@/components/mycity/mycity.vue'
export default {
    name: 'store',
    data() {
        return {
            //table组件数据
            head :[
                {"name":"公司名称","code":"warehouseFullName","width":"100","type" : "text"},
                {"name":"收货人","code":"warehousePeople","width":"100","type" : "text"},
                {"name":"手机号码","code":"warehousePhone","width":"100","type" : "text"},
                {"name":"省市区","code":"cityName","width":"100","type" : "text"},
                {"name":"详细地址","code":"warehouseAddress","width":"80","type" : "text"},
                {"name":"创建人","code":"userName","width":"80","type" : "text"},
                {"name":"创建时间","code":"createDate","width":"120","type" : "text"},
            ],
            obj:{
                createDate:"",
                warehousePeople:null,
                warehousePhone:null,
                userName:null,
                type:3,
            },
        }
    },
    //进入页面
    beforeRouteEnter(to,from,next){
        next(that => {
            //调用刷新方法
            that.doQueryClient();
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
            that.obj ={
                createDate:"",
                warehousePeople:null,
                warehousePhone:null,
                userName:null,
                type:3,
            }
        },
        doQueryClient:function () {
            let that = this;
            let url = "api/cmWarehouseBO.ajax?cmd=doQueryCmWarehouse";
            this.$refs.table.load(url,that.obj);
        },
        //静态数据查询
        doQuerySysStaticData:function () {
            let that = this;
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"USER_STATUS","hasAll":true},function (data) {
                that.tenantStatusList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"SUPPLIER_TYPE","hasAll":true},function (data) {
                that.tenantTypeList = data.items;
            })
        },
        //新增
        addClient:function () {
            let that = this;
            let item = {
                urlName: "客户新增",
                urlId: "13" + new Date().getTime(),
                urlPath: "/cm/addClient.vue",
                urlPathName: "/addClient",
                query:{}
            }
            that.$emit('openTab', item);
        },
        //修改
        updateClient:function () {
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
                urlName: "修改客户",
                urlId: "13" + new Date().getTime(),
                urlPath: "/cm/updateClient.vue",
                urlPathName: "/updateClient",
                query:{"warehouseId":selectData[0].warehouseId}
            }
            that.$emit('openTab', item);
        },
        //删除
        deleteClient:function () {
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
            that.$confirm("是否删除！", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.common.postUrl("api/cmWarehouseBO.ajax?cmd=deleteCmWarehouse",{"warehouseIds": that.warehouseIds},function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.doQueryClient();
                        that.$message({
                            type: 'success',
                            message: "删除成功！"
                        });
                    }
                });
            });
        },
        dblclickItem:function (data) {
            let that = this;
            let item = {
                urlName: "客户详情",
                urlId: "13" + new Date().getTime(),
                urlPath: "/cm/storeDetails.vue",
                urlPathName: "/storeDetails",
                query:{"warehouseId":data.warehouseId}
            }
            that.$emit('openTab', item);
        },
    },
}