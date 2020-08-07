import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"

export default {
    name: 'sysCarrierInfo',
    data() {
        return {
            //table组件数据
            head :[
                {"name":"客户名称","code":"tenantFullName","width":"110","type" : "text"},
                {"name":"客户简称","code":"tenantName","width":"100","type" : "text"},
                {"name":"承运逻辑","code":"carrierTypeName","width":"100","type" : "text"},
                {"name":"设定关系主体","code":"carrierName","width":"80","type" : "text"},
                {"name":"供应商名称","code":"supplierFullName","width":"80","type" : "text"},
                {"name":"添加人","code":"user_create_name","width":"80","type" : "text"},
                {"name":"创建时间","code":"create_date","width":"80","type" : "text"}
            ],
            obj:{
                createDate:"",
                storeId:"-1",
                carrierId:"-1",
                clientTenantId:"",
                tenantFullName:null,
                storeFullName:null,
            },
            tableData: [],
            customerTenantList:[],
            carrierIdList:[],
            storeIdList:[],

        }
    },
    //进入页面
    beforeRouteEnter(to,from,next){
        next(that => {
            //调用刷新方法
            that.doQuerySysCarrierInfo();
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
                urlName: "承运关系导入",
                urlId: new Date().getTime(),
                urlPath: "/common/importTemplate/importTemplate.vue",
                urlPathName: "/importOrderTemplate",
                query:{
                    importList : [
                        {bizName:"承运关系导入",excelFile:"/static/excel/sysCarrier.xlsx",bizCode:"IMP_PRICE_100024",remarks:"承运关系导入"}
                    ]
                },
            }
            this.$emit('openTab', item);
        },
        downloadExcelFile:function(){
            this.$refs.table.downloadExcelFile();
        },
        //查询列表
        doQuerySysCarrierInfo:function () {
            let that = this;
            let url = "api/sysTenantDefBO.ajax?cmd=doQuerySysCarrierInfo";
            that.$refs.table.load(url,that.obj);
        },
        //清空查询条件
        clear:function () {
            let that = this;
            that.obj ={
                createDate:"",
                customerTenantId:"-1",
                storeId:"-1",
                carrierId:"-1",
                tenantFullName:null,
                storeFullName:null,
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
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"CARRIER_TYPE","hasAll":true},function (data) {
                that.carrierIdList = data.items;
            })
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
        selectStore(warehouseId){
            let that = this;
            that.obj.storeId=warehouseId;
        },
        //新增
        addSysCarrierInfo:function () {
            let that = this;
            let item = {
                urlName: "新增承运关系",
                urlId: "11" + new Date().getTime(),
                urlPath: "/sys/addSysCarrierInfo.vue",
                urlPathName: "/addSysCarrierInfo",
                query: {}
            }
            that.$emit('openTab', item);
        },
        //修改
        upSysCarrierInfo:function () {
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
                urlName: "修改承运关系",
                urlId: "11" + new Date().getTime(),
                urlPath: "/sys/updateSysCarrierInfo.vue",
                urlPathName: "/updateSysCarrierInfo",
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
                        that.doQuerySysCarrierInfo();
                    }
                });
            });
        }
    }
}