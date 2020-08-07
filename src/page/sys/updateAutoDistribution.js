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
        this.doQueryAutoDistribution();
        this.doQuerySysStaticData();
    },
    components: {
        tableCommon
    },
    methods: {
        updateAutoDistribution:function () {
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
                urlName: "修改派发",
                urlId: "10" + new Date().getTime(),
                urlPath: "/sys/updateAutoDistribution.vue",
                urlPathName: "/updateAutoDistribution",
                query:{"id":selectData[0].id,"clientId":selectData[0].clientId}
            }
            that.$emit('openTab', item);
        },
        deleteAutoDistribution:function () {
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
            that.$confirm(that.rms, '是否删除选择的数据？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysAutoBO.ajax?cmd=deleteAutoDistribution";
                that.common.postUrl(url,{"ids":that.ids},function (data) {
                    if(data != 'success'){
                        that.$message.error('删除失败！');
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "删除成功"
                        });
                        that.doQuerySysStaticData();
                        that.doQueryAutoDistribution();
                    }
                });
            });
        },
        selectProjectName(projectId){
            let that = this;
            that.obj.projectId=projectId;
            this.$forceUpdate();
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
            that.common.postUrl("api/sysAutoBO.ajax?cmd=getSysProjectList", {"clientId":that.obj.clientId},function(data){
                if(that.common.isNotBlank(data) && that.common.isNotBlank(data.items)){
                    that.projectList = data.items;
                    that.projectList.unshift({projectName:"请选择",projectId:"-1"});
                    this.$forceUpdate();
                }
            });
        },
        doQueryAutoDistribution:function () {
            let that = this;
            let url = "api/sysAutoBO.ajax?cmd=doQueryAutoDistribution";
            this.$refs.table.load(url,{"clientId":that.obj.clientId});
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
            that.$confirm("", '如客户下配置了与此冲突的一对一匹配，会将其失效！是否确认此操作？', {
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
            that.common.postUrl("api/sysAutoBO.ajax?cmd=getSysAuto", {"id":that.obj.id},function(data){
               that.obj = data;
               that.obj.tenantFullName = data.clientId;
               that.obj.clientId=data.clientId;
               that.obj.supplierFullName = data.supplierId;
               that.obj.supplierId=data.supplierId;
               if(data.projectId != -1){
                   that.obj.projectName = data.projectId;
                   that.obj.projectId=data.projectId;
               }
            });
            let tenantId=that.common.getCookie("tenantId");
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantDefPName", {"pTenantId":tenantId},function(data){
                that.customerTenantList = data.items;
            });
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantDefCityName", {"pTenantId":tenantId},function(data){
                that.supplierTenantList = data.items;
            });
            that.common.postUrl("api/sysAutoBO.ajax?cmd=getSysProjectList", {"clientId":that.obj.clientId},function(data){
                if(that.common.isNotBlank(data) && that.common.isNotBlank(data.items)){
                    that.projectList = data.items;
                    that.projectList.unshift({projectName:"请选择",projectId:"-1"});
                    this.$forceUpdate();
                }
            });
        },
    }
}