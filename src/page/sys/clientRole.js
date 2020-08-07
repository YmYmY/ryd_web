import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"

export default {
    name: 'clientRole',
    data() {
        return {
            //table组件数据
            head :[
                {"name":"角色名称","code":"roleName","width":"110","type" : "text"},
                {"name":"添加人","code":"addPerson","width":"100","type" : "text"},
                {"name":"创建时间","code":"createDate","width":"100","type" : "text"},
                {"name":"备注说明","code":"remarks","width":"80","type" : "text"}
            ],
            obj:{
                createDate:"",
                roleName:null
            },
            tableData: [],
        }
    },
    //进入页面
    beforeRouteEnter(to,from,next){
        next(that => {
            //调用刷新方法
            that.doQueryClientRole();
        });
    },
    components: {
        tableCommon
    },
    methods: {
        downloadExcelFile:function(){
            this.$refs.table.downloadExcelFile();
        },
        //查询角色列表
        doQueryClientRole:function () {
            let that = this;
            let url = "api/sysRoleBO.ajax?cmd=doQueryClientRole";
            this.$refs.table.load(url,that.obj);
        },
        //清空查询条件
        clear:function () {
            let that = this;
            that.obj ={
                createDate:"",
                roleName:null
            }
        },
        //新增角色
        addSysRole:function () {
            let that = this;
            let item = {
                urlName: "新增角色",
                urlId: "11" + new Date().getTime(),
                urlPath: "/sys/addClientRole.vue",
                urlPathName: "/addClientRole",
                query: {}
            }
            that.$emit('openTab', item);
        },
        //修改角色
        updateSysRole:function () {
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
                urlName: "修改角色",
                urlId: "11" + new Date().getTime(),
                urlPath: "/sys/updateClientRole.vue",
                urlPathName: "/updateClientRole",
                query:{"roleId":selectData[0].roleId}
            }
            that.$emit('openTab', item);
        },
        //删除角色
        deleteSysRole:function () {
            let that = this;
            that.selectData = that.$refs.table.getSelectItem();
            if(that.selectData.length == 0){
                that.$message.error('请选择需要删除的数据！');
                return;
            }
            for(let el of that.selectData){
                if(el.roleType==1){
                    that.$message.error('不能删除超级管理员！');
                    return;
                }
            }
            that.roleIds="";
            that.selectData.forEach((el,index)=>{
                if(index == that.selectData.length-1){
                    that.roleIds+=el.roleId ;
                }else {
                    that.roleIds+=el.roleId + ",";
                }
            })
            that.$confirm(that.rms, '是否删除角色？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysRoleBO.ajax?cmd=updateSysRole";
                that.common.postUrl(url,{"roleIds":that.roleIds},function (data) {
                    if(data != 'success'){
                        that.$message.error('删除失败！');
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "删除成功"
                        });
                        that.doQueryClientRole();
                    }
                });
            });
        }
    }
}