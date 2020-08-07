import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"
import mycity from '@/components/mycity/mycity.vue'
export default {
    name: 'addSysOnly',
    data() {
        return {
            obj:{
                clientTenantId:"-1",
                storeId:"-1",
                carrierId:"6",
                receiveStoreId:"-1",
                tenantFullName:null,
                storeFullName:null,
                remark:null,
                storeName:null,
                supplierFullName:null,
            },
            customerTenantList:[],
            carrierIdList:[],
            storeIdList:[],
            supplierTenantList:[],
            tenantList:[],
            receiveStoreIdList:[],
        }
    },
    mounted() {
        this.doQuerySysStaticData();
    },
    components: {
        tableCommon,
        mycity
    },
    methods: {
        //选择区域等级
        selectCity:function(){
            let that = this;
            that.selectType=that.obj.regionGrade;
        },
        // 选择供应商
        selectSupplierTenant(tenantId){
            let that = this;
            this.$forceUpdate();
            that.obj.supplierTenantId=tenantId;
        },
        // 选择客户
        selectCustomerTenant(tenantId){
            let that = this;
            that.obj.clientTenantId=tenantId;
            that.obj.storeId="-1";
            that.obj.storeFullName="";
            if(!that.common.isBlank(that.obj.clientTenantId)){
                that.common.postUrl("api/cmWarehouseBO.ajax?cmd=doQueryStoreAll",{"tenantId":that.obj.clientTenantId,"queryType":3},function (data) {
                    that.storeIdList = data.items;
                })
                that.common.postUrl("api/cmWarehouseBO.ajax?cmd=doQueryStoreAll",{"tenantId":that.obj.clientTenantId,"queryType":4},function (data) {
                    that.receiveStoreIdList = data.items;
                })
            }
        },
        //选择门店
        selectStore(id){
            let that = this;
            that.obj.storeId=id;
        },
        //选择门店
        receiveStore(id){
            let that = this;
            that.obj.receiveStoreId=id;
        },

        //静态数据查询
        doQuerySysStaticData:function () {
            let that = this;
            let tenantId=that.common.getCookie("tenantId");
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantDefPName", {"pTenantId":tenantId,"queryType":2},function(data){
                that.customerTenantList = data.items;
            });
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantDefCityName", {"pTenantId":tenantId},function(data){
                that.supplierTenantList = data.items;
            });
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"CARRIER_TYPE_ONLY"},function (data) {
                that.carrierIdList = data.items;
            })
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantDefAll", {"attributionType":3},function(data){
                that.tenantList = data.items;
            });
        },
        doSave:function () {
            let that = this;
            let from = {};
            if(that.common.isBlank(that.obj.clientTenantId) || that.obj.clientTenantId == "-1"){
                that.$message.error('请选择客户名称！');
                return;
            }
            from.clientTenantId =that.obj.clientTenantId;
            if(that.common.isBlank(that.obj.carrierId) ||  that.obj.carrierId == "-1"){
                that.$message.error('请选择承运逻辑！');
                return;
            }
            from.carrierId =that.obj.carrierId;
            if(that.common.isBlank(that.obj.supplierTenantId) ||  that.obj.supplierTenantId == "-1"){
                that.$message.error('请选择供应商名称！');
                return;
            }
            from.supplierTenantId =that.obj.supplierTenantId;
            if(that.common.isBlank(that.obj.storeId) ||  that.obj.storeId == "-1"){
                that.$message.error('请选择发货店仓名称！');
                return;
            }
            from.storeId =that.obj.storeId;
            if(that.common.isBlank(that.obj.receiveStoreId) ||  that.obj.receiveStoreId == "-1"){
                that.$message.error('请选择收货店仓名称！');
                return;
            }
            from.receiveStoreId =that.obj.receiveStoreId;
            from.remark =that.obj.remark;
            that.$confirm("", '是否新增一对一匹配？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysTenantDefBO.ajax?cmd=doSaveSysOnly";
                that.common.postUrl(url,from,function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "新增成功！"
                        });
                        that.$emit('clostToOther',that.$route.meta.id);
                    }
                });
            });
        },
        cancel:function () {
            let that = this;
            that.$emit('clostToOther', that.$route.meta.id);
        },
    }
}