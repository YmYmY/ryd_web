import tree from '@/components/tree/tree.vue'
import {head} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"

export default {
    name: 'sysOragnize',
    data() {
        return {
            treedata:[],
            head :[
                {"name":"登录手机","code":"userLogin","width":"110","type" : "text"},
                {"name":"员工姓名","code":"userName","width":"100","type" : "text"},
                {"name":"部门主管","code":"userTypeName","width":"100","type" : "text"},
                {"name":"所属区域","code":"regionName","width":"100","type" : "text"},
                {"name":"职位","code":"userPosition","width":"100","type" : "text"},
                {"name":"创建时间","code":"createDate","width":"100","type" : "text"}
            ],
            obj:[],
            checkStaffList:[],
            showAddSysUser:false,
            addUser:[],
            deleteUser:[],
            deleteUserList:[],
            addUserList:[],
            checked:false,
            currentItem:[],
            tenantName:null,
            oragnizeName:null,
        }
    },
    //进入页面
    beforeRouteEnter(to,from,next){
        next(that => {
            //调用刷新方法
            that.queryTreeData();
            that.queryTable();
        });
    },
    components:{
        tree,
        tableCommon
    },
    methods:{
        downloadExcelFile:function(){
            this.$refs.table.downloadExcelFile();
        },
        hoverItem(data){
            let that = this;
            that.currentItem = data;
        },
        deleteSysOragnize(currentItem){
            let that = this;
            if(currentItem.oragnizeStatus == 1){
                that.$message.error('当前组织不可删除！');
                return;
            }
            that.$confirm("是否删除组织", '是否删除组织？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysOragnizeBO.ajax?cmd=deleteSysOragnize";
                that.common.postUrl(url,{"oragnizeId":currentItem.oragnizeId},function (data) {
                    if(data != 'success'){
                        that.$message.error('删除失败！');
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "删除成功"
                        });
                        that.queryTreeData();
                    }
                });
            });

        },
        selectCallBack(data){
            let that = this;
            that.obj=data;
            that.oragnizeName = data.oragnizeName;
            that.queryTable();
        },
        queryTreeData(){
            let that = this;
            that.tenantName = that.common.getCookie("tenantName");
            let url = "api/sysOragnizeBO.ajax?cmd=getSysOragnize";
            that.common.postUrl(url,{},function({items}){
                if(that.treedata.length>0){
                    //本来有数据的时候刷新树,但不刷新树当前状态(展开/选中)
                    that.treedata = that.$refs.tree.resetTree(items);
                }else{
                    that.treedata = items;
                }
            })
        },
        queryTable(){
            let that = this;
            that.$refs.table.load('api/sysUserBO.ajax?cmd=doQuerySysUserOragnize',that.obj);
        },
        editItem(item){
            console.log(item)
        },
        disableItem(item){
            console.log(item)
        },
        saveItem(item){         
            let that = this;
            if(that.common.isBlank(item.oragnizeName)){
                that.$message.error('请填写组织名称！');
                return;
            }
            if(item.oragnizeId > 0){
                that.rms = "是否修改当前组织";
            }else {
                that.rms = "是否新增当前组织";
            }
            this.$confirm(that.rms, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                item.isEdit = false;
                item.PId = that.obj.oragnizeId;
                let url = "api/sysOragnizeBO.ajax?cmd=doSaveSysOragnize";
                that.common.postUrl(url,item,function(data){
                    if(data == "success"){
                        that.queryTreeData();
                        that.$message({
                            type: 'success',
                            message: "操作成功"
                        });
                    }
                },function(data){
                    that.queryTreeData();
                    that.$alert(data.data.message)
                },null,true)
              }).catch(() => {
                that.queryTreeData();
            });
        },
        addLower(){
            let that = this;
            if(that.common.isBlank(that.obj.oragnizeId)){
                that.$message.error('请选择上级组织！');
                return;
            }

            this.$refs.tree.addLower(that.obj);
        },
        setUpSupervisor(userType) {
            let that = this;

            if(userType == 1){
                that.selectData = that.$refs.table.getSelectItem();
                if(that.selectData.length == 0){
                    that.$message.error('请选择需要移除主管或副主管的员工！');
                    return;
                }
                for(let el of that.selectData){
                    if(el.userType==1){
                        that.$message.error('员工不是主管或副主管无法移除职位！');
                        return;
                    }
                }
                that.userIds="";
                that.selectData.forEach((el,index)=>{
                    if(index == that.selectData.length-1){
                        that.userIds+=el.userId ;
                    }else {
                        that.userIds+=el.userId + ",";
                    }
                })
                that.$confirm(that.rms, '是否移除主管或副主管职位？', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let url ="api/sysUserBO.ajax?cmd=setUpSupervisor";
                    that.common.postUrl(url,{"userIds":that.userIds,"userType":userType,"oragnizeId":that.obj.oragnizeId},function (data) {
                        if(data != 'success'){
                            that.$message.error('设置失败！');
                            return;
                        }else {
                            that.$message({
                                type: 'success',
                                message: "设置成功"
                            });
                            that.queryTable();
                        }
                    });
                });
            }else if(userType == 2){
                that.selectData = that.$refs.table.getSelectItem();
                if(that.selectData.length == 0){
                    that.$message.error('请选择需要设置主管的员工！');
                    return;
                }
                if(that.selectData.length != 1){
                    that.$message.error('只能选择一条数据！');
                    return;
                }
                that.userIds = that.selectData[0].userId;
                that.$confirm("", '是否设置员工为主管？', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let url ="api/sysUserBO.ajax?cmd=setUpSupervisor";
                    that.common.postUrl(url,{"userIds":that.userIds,"userType":userType,"oragnizeId":that.obj.oragnizeId},function (data) {
                        if(data != 'success'){
                            that.$message.error('设置失败！');
                            return;
                        }else {
                            that.$message({
                                type: 'success',
                                message: "设置成功"
                            });
                            that.queryTable();
                        }
                    });
                });
            }else {
                that.selectData = that.$refs.table.getSelectItem();
                if(that.selectData.length == 0){
                    that.$message.error('请选择需要设置副主管的员工！');
                    return;
                }
                that.userIds="";
                that.selectData.forEach((el,index)=>{
                    if(index == that.selectData.length-1){
                        that.userIds+=el.userId ;
                    }else {
                        that.userIds+=el.userId + ",";
                    }
                })
                that.$confirm("", '是否设置员工为副主管？', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let url ="api/sysUserBO.ajax?cmd=setUpSupervisor";
                    that.common.postUrl(url,{"userIds":that.userIds,"userType":userType,"oragnizeId":that.obj.oragnizeId},function (data) {
                        if(data != 'success'){
                            that.$message.error('设置失败！');
                            return;
                        }else {
                            that.$message({
                                type: 'success',
                                message: "设置成功"
                            });
                            that.queryTable();
                        }
                    });
                });
            }
        },
        addSysUser() {
            let that = this;
            this.addUserList = [];
            this.deleteUserList = [];
            this.addUser = [];
            this.deleteUser = [];
            that.common.postUrl("api/sysUserBO.ajax?cmd=getAddSysUserOragnize",{"oragnizeId":that.obj.oragnizeId},function(data){
                that.addUser = data.items;
            })
            that.common.postUrl("api/sysUserBO.ajax?cmd=getDeleteSysUserOragnize",{"oragnizeId":that.obj.oragnizeId},function(data){
                that.deleteUser = data.items;
            })
            that.showAddSysUser = true;
        },
        deleteUserFn(){            
            for(let index=0;index<this.addUser.length;index++){
                let el = this.addUser[index];
                for(let i in this.addUserList){
                    if(this.addUserList[i] == el.userId){
                        this.addUser.splice(index,1);
                        this.deleteUser.push(el);
                        index--;
                        break;
                    }
                }
            }
            this.addUserList = [];
            this.deleteUserList = [];
        },
        addUserFn(){
            for(let index=0;index<this.deleteUser.length;index++){
                let el = this.deleteUser[index];
                for(let i in this.deleteUserList){
                    if(this.deleteUserList[i] == el.userId){
                        this.deleteUser.splice(index,1);
                        this.addUser.push(el);
                        index--;
                        break;
                    }
                }
            }
            this.addUserList = [];
            this.deleteUserList = [];
        },
        doSaveUserOragnize:function () {
            let that = this;
            let addUserIds=[];
            let deleteUserIds=[];
            for(let i in that.addUser){
                addUserIds.push(that.addUser[i].userId);
            }
            for(let i in that.deleteUser){
                deleteUserIds.push(that.deleteUser[i].userId);
            }
            that.$confirm("", '确认操作？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysUserBO.ajax?cmd=doSaveUserOragnize";
                that.common.postUrl(url,{"oragnizeId":that.obj.oragnizeId,"addUserIds":addUserIds,"deleteUserIds":deleteUserIds},function (data) {
                    if(data != 'success'){
                        that.$message.error('设置失败！');
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "设置成功"
                        });
                        that.showAddSysUser=false;
                        that.queryTable();
                    }
                });
            });
        },
    }
}