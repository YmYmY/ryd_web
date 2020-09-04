import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"

export default {
    name: 'projectMaintenance',
    data() {
        return {
            //table组件数据
            head :[
                {"name":"客户名称","code":"clientFullName","width":"110","type" : "text"},
                {"name":"客户简称","code":"clientName","width":"100","type" : "text"},
                {"name":"项目名称","code":"projectName","width":"100","type" : "text"},
                {"name":"关联类型","code":"projectTypeName","width":"100","type" : "text"},
            ],
            obj:{
                projectName:null,
                projectType:"1",
                projectId:this.$route.query.projectId,
                clientId:this.$route.query.clientId,
                warehouseIds:[],
            },
            id:this.$route.query.id,
            checked:false,
            showWarehouse:false,
            projectTypeList:[],
            warehouseList:[],
            customerTenantList:[],
        }
    },
    mounted() {
        this.doQuerySysStaticData();
    },
    components: {
        tableCommon
    },
    methods: {
        // 选择客户
        selectCustomerTenant(tenantId){
            let that = this;
            that.obj.clientId=tenantId;
            that.obj.warehouseIds=[];
            that.obj.projectName = "";
            that.obj.projectType="1";
            this.doQueryProject();
            that.selectType();
        },
        doQueryProject:function () {
            let that = this;
            let url = "api/sysAutoBO.ajax?cmd=doQueryProject";
            this.$refs.table.load(url,{"clientId":that.obj.clientId});
        },
        downloadExcelFile:function(){
            this.$refs.table.downloadExcelFile();
        },
        doSave:function(){
            let that = this;
            if(that.common.isBlank(that.obj.projectName)){
                that.$message.error('请输入项目！');
                return;
            }
            if(that.common.isBlank(that.obj.projectType)){
                that.$message.error('请选择关联类型！');
                return;
            }
            if(that.obj.projectType !="1"){
                if(that.common.isBlank(that.obj.warehouseIds) || that.obj.warehouseIds.length==0){
                    that.$message.error('请选择店仓！');
                    return;
                }
            }
            that.obj.id  =that.id;
            that.$confirm("", '是否确认操作？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysAutoBO.ajax?cmd=doSaveProject";
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
        async doQuerySysStaticData () {
            let that = this;
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"PROJECT_TYPE_AUTO"},function (data) {
                that.projectTypeList = data.items;
            })
            let tenantId=that.common.getCookie("tenantId");
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantDefPName", {"pTenantId":tenantId},function(data){
                that.customerTenantList = data.items;
            });
            if(that.obj.projectId > 0){
                let data = await that.common.postUrl("api/sysAutoBO.ajax?cmd=getSysProject",{"projectId":that.obj.projectId});
                that.obj = data;
                that.obj.projectType = data.projectType+"";
                let warehouseIds = await that.common.postUrl("api/sysAutoBO.ajax?cmd=getSysProjectShop",{"projectId":that.obj.projectId});
                that.selectType();
                this.doQueryProject();
                that.obj.warehouseIds = warehouseIds;
                this.$forceUpdate();
            }
        },
        selectType:function(){
            let that = this;
            if(that.obj.projectType == "2" || that.obj.projectType == "5"){
                that.type = 2;
                that.obj.warehouseIds=[];
                that.showWarehouse=true;
            }else if(that.obj.projectType == "3" || that.obj.projectType == "6"){
                that.type = 1;
                that.obj.warehouseIds=[];
                that.showWarehouse=true;
            }else if(that.obj.projectType == "1"){
                that.obj.warehouseIds=[];
                that.showWarehouse=false;
            }else {
                that.obj.warehouseIds=[];
                that.type = "";
                that.showWarehouse=true;
            }
            if(that.obj.projectType == "2" || that.obj.projectType == "3" || that.obj.projectType == "4"){
                that.queryType = 1;
            }else if(that.obj.projectType == "5" || that.obj.projectType == "6" || that.obj.projectType == "7"){
                that.queryType = 2;
            }
            if(that.obj.projectType !="1" ){
                that.common.postUrl("api/cmWarehouseBO.ajax?cmd=doQueryProjectWarehouseAll",{"type":that.type,"clientId":that.obj.clientId,"projectId":that.obj.projectId,"queryType":that.queryType},function (data) {
                    that.warehouseList = data.items;
                })
            }
            this.$forceUpdate();
        },
        forceUpdate:function(){
            this.$forceUpdate();
        },
        updateProject:function () {
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
                urlName: "修改项目",
                urlId: "10" + new Date().getTime(),
                urlPath: "/sys/projectMaintenance.vue",
                urlPathName: "/projectMaintenance",
                query:{"projectId":selectData[0].projectId,"id":that.id}
            }
            that.$emit('openTab', item);
        },
        deleteProject:function () {
            let that = this;
            that.selectData = that.$refs.table.getSelectItem();
            if(that.selectData.length == 0){
                that.$message.error('请选择需要删除的数据！');
                return;
            }
            that.ids="";
            that.selectData.forEach((el,index)=>{
                if(index == that.selectData.length-1){
                    that.ids+=el.projectId ;
                }else {
                    that.ids+=el.projectId + ",";
                }
            })
            that.$confirm(that.rms, '是否删除选择的数据？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysAutoBO.ajax?cmd=deleteProject";
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
                        that.doQueryProject();
                    }
                });
            });
        },
    }
}