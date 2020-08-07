import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"

export default {
    name: 'autoDistribution',
    data() {
        return {
            //table组件数据
            head :[
                {"name":"创建时间","code":"createDate","width":"110","type" : "text"},
                {"name":"客户名称","code":"clientFullName","width":"110","type" : "text"},
                {"name":"客户简称","code":"clientName","width":"100","type" : "text"},
                {"name":"项目名称","code":"projectName","width":"100","type" : "text"},
                {"name":"关联类型","code":"projectTypeName","width":"100","type" : "text"},
                {"name":"供应商名称","code":"supplierFullName","width":"100","type" : "text"},
                {"name":"添加人","code":"userName","width":"100","type" : "text"},
            ],
            obj:{
                createDate:"",
                tenantFullName:null,
                projectName:null,
            },
            customerTenantList:[],
            projectList:[],
        }
    },
    //进入页面
    beforeRouteEnter(to,from,next){
        next(that => {
            //调用刷新方法
            that.doQueryAutoDistribution();
            that.doQuerySysStaticData();
        });
    },
    components: {
        tableCommon
    },
    methods: {
        selectProjectName(projectId){
            let that = this;
            that.obj.projectId=projectId;
        },
        // 选择客户
        selectCustomerTenant(tenantId){
            let that = this;
            that.obj.clientTenantId=tenantId;
        },
        downloadExcelFile:function(){
            this.$refs.table.downloadExcelFile();
        },
        doQueryAutoDistribution:function () {
            let that = this;
            let url = "api/sysAutoBO.ajax?cmd=doQueryAutoDistribution";
            this.$refs.table.load(url,that.obj);
        },
        //清空查询条件
        clear:function () {
            let that = this;
            that.obj = {
                createDate:"",
                tenantFullName:null,
                projectName:null,
            }
        },
        //静态数据查询
        doQuerySysStaticData:function () {
            let that = this;
            let tenantId=that.common.getCookie("tenantId");
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantDefPName", {"pTenantId":tenantId},function(data){
                if(that.common.isNotBlank(data) && that.common.isNotBlank(data.items)){
                    that.customerTenantList = data.items;
                }
            });
            that.common.postUrl("api/sysAutoBO.ajax?cmd=getSysProjectList", {},function(data){
                if(that.common.isNotBlank(data) && that.common.isNotBlank(data.items)){
                    that.projectList = data.items;
                }
            });
        },
        addAutoDistribution:function () {
            let that = this;
            let item = {
                urlName: "新增派发",
                urlId: "10" + new Date().getTime(),
                urlPath: "/sys/addAutoDistribution.vue",
                urlPathName: "/addAutoDistribution",
                query: {}
            }
            that.$emit('openTab', item);
        },
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
        projectMaintenance:function(){
            let that = this;
            let item = {
                urlName: "项目维护",
                urlId: "10" + new Date().getTime(),
                urlPath: "/sys/projectMaintenance.vue",
                urlPathName: "/projectMaintenance",
                query:{}
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
                        that.doQueryAutoDistribution();
                    }
                });
            });
        },
    }
}