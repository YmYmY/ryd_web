import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"
import mycity from '@/components/mycity/mycity.vue'
export default {
    name: 'addSysCarrierInfo',
    data() {
        return {
            obj:{
                clientTenantId:"-1",
                storeId:"-1",
                carrierId:"1",
                tenantFullName:null,
                storeFullName:null,
                remark:null,
                supplierFullName:null,
                regionGrade:"-1",
                allocateCarrierId:"",
                warehouseCarrierId:"",
                factoryCarrierId:"",
                reverseCarrierId:"",
                retailerCarrierId:"",
            },
            customerTenantList:[],
            carrierIdList:[],
            storeIdList:[],
            supplierTenantList:[],
            regionGradeList:[],
            selectType:1,
            tenantList:[],
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
                that.common.postUrl("api/cmWarehouseBO.ajax?cmd=doQueryStoreAll",{"tenantId":that.obj.clientTenantId},function (data) {
                    that.storeIdList = data.items;
                })
            }
        },
        //选择门店
        selectStore(id){
            let that = this;
            that.obj.storeId=id;
        },
        //静态数据查询
        doQuerySysStaticData:function () {
            let that = this;
            let tenantId=that.common.getCookie("tenantId");
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantDefPName", {"pTenantId":tenantId},function(data){
                that.customerTenantList = data.items;
            });
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantDefCityName", {"pTenantId":tenantId},function(data){
                that.supplierTenantList = data.items;
            });
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"CARRIER_TYPE"},function (data) {
                that.carrierIdList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"REGION_GRADE","hasAll":true},function (data) {
                that.regionGradeList = data.items;
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
            if(from.carrierId != 3){
                if(that.common.isBlank(that.obj.supplierTenantId) ||  that.obj.supplierTenantId == "-1"){
                    that.$message.error('请选择供应商名称！');
                    return;
                }
                from.supplierTenantId =that.obj.supplierTenantId;
            }
            if(from.carrierId == 4 || from.carrierId == 5){
                if(that.common.isBlank(that.obj.storeId) ||  that.obj.storeId == "-1"){
                    that.$message.error('请选择店仓名称！');
                    return;
                }
                from.storeId =that.obj.storeId;
            }
            if(from.carrierId == 2){
                if(that.common.isBlank(that.obj.regionGrade) ||  that.obj.regionGrade == "-1"){
                    that.$message.error('请选择区域级别！');
                    return;
                }
                from.regionGrade = that.obj.regionGrade;
                that.city =that.$refs.city.getData()
                from.provinceId = that.city.ProvinceId;
                from.cityId = that.city.CityId;
                from.districtId = that.city.DistrictId;
                if(that.obj.regionGrade == 1 &&  that.common.isBlank(from.provinceId)){
                    that.$message.error('请选择省！');
                    return;
                }
                if(that.obj.regionGrade == 2 && that.common.isBlank(from.cityId)){
                    that.$message.error('请选择市！');
                    return;
                }
                if(that.obj.regionGrade == 3 &&  that.common.isBlank(from.districtId)){
                    that.$message.error('请选择县区！');
                    return;
                }
            }
            if(from.carrierId == 3){
                if(that.common.isBlank(that.obj.allocateCarrierId) ||  that.obj.allocateCarrierId == "-1"){
                    that.$message.error('请选择任意调拨承运商！');
                    return;
                }
                from.allocateCarrierId = that.obj.allocateCarrierId;
                if(that.common.isBlank(that.obj.warehouseCarrierId) ||  that.obj.warehouseCarrierId == "-1"){
                    that.$message.error('请选择仓库始发承运商！');
                    return;
                }
                from.warehouseCarrierId = that.obj.warehouseCarrierId;
                if(that.common.isBlank(that.obj.factoryCarrierId) ||  that.obj.factoryCarrierId == "-1"){
                    that.$message.error('请选择工厂直发承运商！');
                    return;
                }
                from.factoryCarrierId = that.obj.factoryCarrierId;
                if(that.common.isBlank(that.obj.reverseCarrierId) ||  that.obj.reverseCarrierId == "-1"){
                    that.$message.error('请选择逆向回货承运商！');
                    return;
                }
                from.reverseCarrierId = that.obj.reverseCarrierId;
                if(that.common.isBlank(that.obj.retailerCarrierId) ||  that.obj.retailerCarrierId == "-1"){
                    that.$message.error('请选择云仓电商承运商！');
                    return;
                }
                from.retailerCarrierId = that.obj.retailerCarrierId;
            }
            from.remark =that.obj.remark;
            that.$confirm("", '是否新增承运关系？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysTenantDefBO.ajax?cmd=doSaveSysCarrierInfo";
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