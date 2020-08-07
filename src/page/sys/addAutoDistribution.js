import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"

export default {
    name: 'addAutoDistribution',
    data() {
        return {
            //table组件数据
            head :[
                {"name":"客户名称","code":"clientFullName","width":"110","type" : "text"},
                {"name":"客户简称","code":"clientName","width":"100","type" : "text"},
                {"name":"项目名称","code":"projectName","width":"100","type" : "text"},
                {"name":"关联类型","code":"projectTypeName","width":"100","type" : "text"},
                {"name":"供应商名称","code":"supplierFullName","width":"100","type" : "text"},
                {"name":"添加入","code":"userName","width":"100","type" : "text"},
            ],
            obj:{
                tenantFullName:null,
                supplierFullName:null,
                projectName:null,
                id:this.$route.query.id,
                clientId:this.$route.query.clientId,
            },
            customerTenantList:[],
            supplierTenantList:[],
            projectList:[],
        }
    },
    mounted() {
        //this.doQueryAutoDistribution();
        this.doQuerySysStaticData();
    },
    components: {
        tableCommon
    },
    methods: {
        selectProjectName(projectId){
            let that = this;
            that.obj.projectId=projectId;
        },
        // 选择供应商
        selectSupplierTenant(tenantId){
            let that = this;
            this.$forceUpdate();
            that.obj.supplierId=tenantId;
        },
        // 选择客户
        selectCustomerTenant(tenantId){
            let that = this;
            that.obj.clientId=tenantId;
            that.obj.projectName = "";
            that.obj.projectId = "";
            that.common.postUrl("api/sysAutoBO.ajax?cmd=getSysProjectList", {"clientId":tenantId},function(data){
                if(that.common.isNotBlank(data) && that.common.isNotBlank(data.items)){
                    that.projectList = data.items;
                    that.projectList.unshift({projectName:"请选择",projectId:"-1"});
                }
            });
        },
        doQueryAutoDistribution:function () {
            let that = this;
            let url = "api/sysAutoBO.ajax?cmd=doQueryAutoDistribution";
            this.$refs.table.load(url,that.obj);
        },
        downloadExcelFile:function(){
            this.$refs.table.downloadExcelFile();
        },
        doSave:function(){
            let that = this;
            if(that.common.isBlank(that.obj.clientId)){
                that.$message.error('请选择客户！');
                return;
            }
            if(that.common.isBlank(that.obj.supplierId)){
                that.$message.error('请选择供应商！');
                return;
            }
            that.$confirm("", '如客户下配置了与此冲突的一对一匹配，会将其失效！是否确认此操作', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysAutoBO.ajax?cmd=doSaveAutoDistribution";
                that.common.postUrl(url,that.obj,function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "操作成功！"
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
        },
    }
}