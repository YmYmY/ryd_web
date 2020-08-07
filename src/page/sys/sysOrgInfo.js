import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"

export default {
    name: 'sysOrgInfo',
    data() {
        return {
            //table组件数据
            head :[
                {"name":"网点全称","code":"orgFullName","width":"110","type" : "text"},
                {"name":"网点简称","code":"orgName","width":"100","type" : "text"},
                {"name":"负责人","code":"orgPeople","width":"100","type" : "text"},
                {"name":"联系手机","code":"orgPhone","width":"100","type" : "text"},
                {"name":"网点电话","code":"orgTelephone","width":"100","type" : "text"},
                {"name":"登录账号","code":"userLogin","width":"100","type" : "text"},
                {"name":"创建时间","code":"createDate","width":"100","type" : "text"},
                {"name":"网点地址","code":"orgAddress","width":"100","type" : "text"}
            ],
            obj:{
                createDate:null,
                orgName:null,
                orgPhone:null,
                userLogin:null
            },
            userStatusList:[],
        }
    },
    //进入页面
    beforeRouteEnter(to,from,next){
        next(that => {
            //调用刷新方法
            that.doQuerySysOrgInfo();
        });
    },
    components: {
        tableCommon
    },
    methods: {
        downloadExcelFile:function(){
            this.$refs.table.downloadExcelFile();
        },
        doQuerySysOrgInfo:function () {
            let that = this;
            let url = "api/sysTenantDefBO.ajax?cmd=doQuerySysOrg";
            this.$refs.table.load(url,that.obj);
        },
        //清空查询条件
        clear:function () {
            let that = this;
            that.obj = {
                createDate:null,
                orgName:null,
                orgPhone:null,
                userLogin:null
            }
        },
        addSysOrgInfo:function () {
            let that = this;
            let item = {
                urlName: "新增网点",
                urlId: "10" + new Date().getTime(),
                urlPath: "/sys/addSysOrgInfo.vue",
                urlPathName: "/addSysOrgInfo",
                query: {}
            }
            that.$emit('openTab', item);
        },
        updateSysOrgInfo:function () {
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
                urlName: "修改网点",
                urlId: "10" + new Date().getTime(),
                urlPath: "/sys/updateSysOrgInfo.vue",
                urlPathName: "/updateSysOrgInfo",
                query:{"orgId":selectData[0].orgId}
            }
            that.$emit('openTab', item);
        },
        deleteSysOrgInfo:function () {
            let that = this;
            that.selectData = that.$refs.table.getSelectItem();
            if(that.selectData.length == 0){
                that.$message.error('请选择需要删除的数据！');
                return;
            }
            that.orgIds="";
            that.selectData.forEach((el,index)=>{
                if(index == that.selectData.length-1){
                    that.orgIds+=el.orgId ;
                }else {
                    that.orgIds+=el.orgId + ",";
                }
            })
            that.$confirm(that.rms, '是否删除网点？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysTenantDefBO.ajax?cmd=deleteSysOrgInfo";
                that.common.postUrl(url,{"orgIds":that.orgIds},function (data) {
                    if(data != 'success'){
                        that.$message.error('删除失败！');
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "删除成功"
                        });
                        that.doQuerySysOrgInfo();
                    }
                });
            });
        },
    }
}