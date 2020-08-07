import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"

export default {
    name: 'sysOnly',
    data() {
        return {
            //table组件数据
            head :[
                {"name":"客户名称","code":"tenantFullName","width":"110","type" : "text"},
                {"name":"客户简称","code":"tenantName","width":"100","type" : "text"},
                {"name":"承运逻辑","code":"carrierTypeName","width":"100","type" : "text"},
                {"name":"发货店仓","code":"storeName","width":"80","type" : "text"},
                {"name":"发货省市区","code":"cityName","width":"80","type" : "text"},
                {"name":"收货店仓","code":"receiveStoreName","width":"80","type" : "text"},
                {"name":"收货省市区","code":"receiveCityName","width":"80","type" : "text"},
                {"name":"供应商名称","code":"supplierFullName","width":"80","type" : "text"},
                {"name":"添加人","code":"user_create_name","width":"80","type" : "text"},
                {"name":"创建时间","code":"create_date","width":"80","type" : "text"},
                {"name":"备注说明","code":"remark","width":"80","type" : "text"}
            ],
            obj:{
                createDate:"",
                storeId:"-1",
                carrierId:"-1",
                receiveStoreId:"-1",
                clientTenantId:"",
                tenantFullName:null,
                storeFullName:null,
                storeName:null,
            },
            customerTenantList:[],
            storeIdList:[],

        }
    },
    //进入页面
    beforeRouteEnter(to,from,next){
        next(that => {
            //调用刷新方法
            that.doQuerySysOnly();
            that.doQuerySysStaticData();
        });
    },
    components: {
        tableCommon
    },
    methods: {
        // 跳转到 导入界面
        importOrder(){
            let item = {
                urlName: "一对一匹配导入",
                urlId: new Date().getTime(),
                urlPath: "/common/importTemplate/importTemplate.vue",
                urlPathName: "/importOrderTemplate",
                query:{
                    importList : [
                        {bizName:"一对一匹配导入",excelFile:"/static/excel/sysOnly.xlsx",bizCode:"IMP_PRICE_100016",remarks:"一对一匹配导入"}
                    ]
                },
            }
            this.$emit('openTab', item);
        },
        downloadExcelFile:function(){
            this.$refs.table.downloadExcelFile();
        },
        //查询列表
        doQuerySysOnly:function () {
            let that = this;
            let url = "api/sysTenantDefBO.ajax?cmd=doQuerySysOnly";
            that.$refs.table.load(url,that.obj);
        },
        //清空查询条件
        clear:function () {
            let that = this;
            that.obj ={
                createDate:"",
                storeId:"-1",
                carrierId:"-1",
                receiveStoreId:"-1",
                clientTenantId:"",
                tenantFullName:null,
                storeFullName:null,
                storeName:null,
            }
        },
        doQuerySysStaticData:function(){
            let that = this;
            let tenantId=that.common.getCookie("tenantId");
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantDefPName", {"pTenantId":tenantId},function(data){
                if(that.common.isNotBlank(data) && that.common.isNotBlank(data.items)){
                    that.customerTenantList = data.items;
                }
            });
        },
        // 选择下单客户
        selectCustomerTenant(tenantId){
            let that = this;
            that.obj.clientTenantId=tenantId;
            that.obj.storeId="-1";
            that.obj.storeFullName="";
            if(!that.common.isBlank(that.obj.clientTenantId)){
                that.common.postUrl("api/cmWarehouseBO.ajax?cmd=doQueryStoreAll",{"tenantId":that.obj.clientTenantId},function (data) {
                    that.storeIdList = data.items;
                })
            }
        },
        //选择门店
        receiveStore(id){
            let that = this;
            that.obj.receiveStoreId=id;
        },
        //选择门店
        selectStore(warehouseId){
            let that = this;
            that.obj.storeId=warehouseId;
        },
        //新增
        addSysOnly:function () {
            let that = this;
            let item = {
                urlName: "新增一对一匹配",
                urlId: "11" + new Date().getTime(),
                urlPath: "/sys/addSysOnly.vue",
                urlPathName: "/addSysOnly",
                query: {}
            }
            that.$emit('openTab', item);
        },
        //修改
        updateSysOnly:function () {
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
                urlName: "修改一对一匹配",
                urlId: "11" + new Date().getTime(),
                urlPath: "/sys/updateSysOnly.vue",
                urlPathName: "/updateSysOnly",
                query:{"id":selectData[0].id}
            }
            that.$emit('openTab', item);
        },
        //删除
        deleteSysCarrierInfo:function () {
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
            that.$confirm(that.rms, '是否删除承运关系？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysTenantDefBO.ajax?cmd=deleteSysCarrierInfo";
                that.common.postUrl(url,{"ids":that.ids},function (data) {
                    if(data != 'success'){
                        that.$message.error('删除失败！');
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "删除成功"
                        });
                        that.doQuerySysOnly();
                    }
                });
            });
        }
    }
}