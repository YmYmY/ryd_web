import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"
import mycity from '@/components/mycity/mycity.vue'
export default {
    name: 'supplier',
    data() {
        return {
            //table组件数据
            head :[
                {"name":"添加时间","code":"createDate","width":"150","type" : "text"},
                {"name":"供应商类型","code":"tenantTypeName","width":"100","type" : "text"},
                {"name":"供应商性质","code":"supplierNatureName","width":"100","type" : "text"},
                {"name":"办公地区","code":"cityName","width":"100","type" : "text"},
                {"name":"归属平台","code":"whetherPlatformName","width":"80","type" : "text"},
                {"name":"平台名称","code":"platformTypeName","width":"80","type" : "text"},
                {"name":"企业供应商全称","code":"tenantFullName","width":"120","type" : "text"},
                {"name":"企业供应商简称","code":"tenantName","width":"120","type" : "text"},
                {"name":"合并结算","code":"mergeTypeName","width":"120","type" : "text"},
                {"name":"结算供应商","code":"supplierName","width":"120","type" : "text"},
                {"name":"是否对接项目","code":"isProjectName","width":"80","type" : "text"},
                {"name":"联系人","code":"tenantPrincipal","width":"80","type" : "text"},
                {"name":"联系手机","code":"tenantPhone","width":"100","type" : "text"},
                {"name":"代收货款","code":"collectionTypeName","width":"150","type" : "text"},
                {"name":"到付款","code":"payToName","width":"80","type" : "text"},
                {"name":"结算方式","code":"payTypeName","width":"80","type" : "text"},
                {"name":"状态","code":"tenantStatusName","width":"80","type" : "text"}
            ],
            selectType:3,
            obj:{
                createDate:"",
                tenantName:null,
                tenantType:"-1",
                tenantStatus:"-1",
                payType:"-1",
            },
            payTypeList:[],
            supplierTenantList:[],
            tenantStatusList:[],
            tenantTypeList: [],
            dialogFormVisible:false,
            disableRemarks:null,

        }
    },
    //进入页面
    beforeRouteEnter(to,from,next){
        next(that => {
            //调用刷新方法
            that.doQuerySysTenantDefSupplier();
            that.doQuerySysStaticData();
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
                urlName: "供应商导入",
                urlId: new Date().getTime(),
                urlPath: "/common/importTemplate/importTemplate.vue",
                urlPathName: "/importOrderTemplate",
                query:{
                    importList : [
                        {bizName:"供应商导入",excelFile:"/static/excel/supplier.xlsx",bizCode:"IMP_TENANT_10023",remarks:"供应商导入"}
                    ]
                },
            }
            this.$emit('openTab', item);
        },
        dblclickItem:function(obj){
            let that = this;
            let item = {
                urlName: "客户详情",
                urlId: "48" + obj.tenantId,
                urlPath: "/user/supplierDetails.vue",
                urlPathName: "/supplierDetails",
                query:{tenantId: obj.tenantId},
            }
            that.$emit('openTab', item);
        },
        downloadExcelFile:function(){
            this.$refs.table.downloadExcelFile();
        },
        //清空查询条件
        clear:function () {
            let that = this;
            that.$refs.city.cleanData();
            that.obj ={
                createDate:"",
                tenantName:null,
                tenantType:"-1",
                tenantStatus:"-1",
                payType:"-1",
            }
        },
        doQuerySysTenantDefSupplier:function () {
            let that = this;
            that.cityOffice =that.$refs.city.getData()
            that.obj.provinceId = that.cityOffice.ProvinceId;
            that.obj.cityId = that.cityOffice.CityId;
            that.obj.districtId = that.cityOffice.DistrictId;
            that.obj.streetId = that.cityOffice.StreetId;
            let url = "api/sysTenantDefBO.ajax?cmd=doQuerySysTenantDefSupplier";
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
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"PAY_TYPE","hasAll":true},function (data) {
                that.payTypeList = data.items;
            })
            let tenantId=that.common.getCookie("tenantId");
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantDefCityName", {"pTenantId":tenantId},function(data){
                that.supplierTenantList = data.items;
            });
        },
        //新增
        addSupplier:function () {
            let that = this;
            let item = {
                urlName: "新增供应商",
                urlId: "13" + new Date().getTime(),
                urlPath: "/user/addSupplier.vue",
                urlPathName: "/addSupplier",
                query:{}
            }
            that.$emit('openTab', item);
        },
        //修改
        updateSupplier:function () {
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
                urlName: "修改供应商",
                urlId: "13" + new Date().getTime(),
                urlPath: "/user/updateSupplier.vue",
                urlPathName: "/updateSupplier",
                query:{"tenantId":selectData[0].tenantId}
            }
            that.$emit('openTab', item);
        },
        //修改
        dockingSystem:function () {
            let that = this;
            let selectData = that.$refs.table.getSelectItem();
            if(selectData.length == 0){
                that.$message.error('请选择需要对接的数据！');
                return;
            }
            if(selectData.length != 1){
                that.$message.error('只能选择一条数据！');
                return;
            }
            let item = {
                urlName: "项目对接",
                urlId: "13" + new Date().getTime(),
                urlPath: "/user/dockingSystem.vue",
                urlPathName: "/dockingSystem",
                query:{"tenantId":selectData[0].tenantId}
            }
            that.$emit('openTab', item);
        },

        //供应商配置
        setUpSupplier:function(){
            let that = this;
            let selectData = that.$refs.table.getSelectItem();
            if(selectData.length == 0){
                that.$message.error('请选择需要配置的数据！');
                return;
            }
            if(selectData.length != 1){
                that.$message.error('只能选择一条数据！');
                return;
            }
            let item = {
                urlName: "供应商配置",
                urlId: "13" + new Date().getTime(),
                urlPath: "/user/supplierSetUp.vue",
                urlPathName: "/supplierSetUp",
                query:{"tenantId":selectData[0].tenantId}
            }
            that.$emit('openTab', item);
        },
        //启用/停用
        updateStatus:function () {
            let that = this;
            let selectData = that.$refs.table.getSelectItem();
            if(selectData.length == 0){
                that.$message.error('请选择需要操作的数据！');
                return;
            }
            if(selectData.length != 1){
                that.$message.error('只能选择一条数据！');
                return;
            }
            if(selectData[0].tenantStatus == 1){
                that.tenantStatus=2;
                that.tenantId=selectData[0].tenantId;
                that.rms = "确认禁用该供应商"
                that.message="禁用成功！"
                that.dialogFormVisible=true;
                that.disableRemarks=null;
                return;
            }else {
                that.tenantStatus=1;
                that.tenantId=selectData[0].tenantId;
                that.rms = "确认启用该供应商"
                that.message="启用成功！"
            }
            that.$confirm(that.rms, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.common.postUrl("api/sysTenantDefBO.ajax?cmd=updateSysTenantDefPlatform",{"tenantId": that.tenantId,"tenantStatus":that.tenantStatus},function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.doQuerySysTenantDefSupplier();
                        that.$message({
                            type: 'success',
                            message: that.message
                        });
                    }
                });
            });
        },
        //禁用
        disable:function(){
            let that = this;
            if(that.common.isBlank(that.disableRemarks)){
                that.$message.error('请输入禁用原因！');
                return;
            }
            that.$confirm(that.rms, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.common.postUrl("api/sysTenantDefBO.ajax?cmd=updateSysTenantDefPlatform",{"tenantId": that.tenantId,"tenantStatus":that.tenantStatus,"disableRemarks":that.disableRemarks},function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.dialogFormVisible=false;
                        that.doQuerySysTenantDefSupplier();
                        that.$message({
                            type: 'success',
                            message: that.message
                        });
                    }
                });
            });
        },
    },
}