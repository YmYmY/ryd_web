import simpleTree from '@/components/simpleTree/simpleTree.vue'
import tableCommon from "@/components/table/tableCommon.vue"
export default {
    name: 'supplierSetUp',
    data() {
        return {
            data4: null,
            renderContent:null,
            dialogFormVisible:false,
            userName:null,
            userPhone:null,
            userLogin:null,
            userPassword:null,
            passwordType:2,
            defaultProps: {
                children: 'children',
                label: 'urlName'
            },
            obj:{
                userLogin:null,
                userPassword:null,
            },
            //table组件数据
            head :[
                {"name":"状态","code":"userStatusName","width":"110","type" : "text"},
                {"name":"姓名","code":"userName","width":"100","type" : "text"},
                {"name":"手机号码","code":"userPhone","width":"100","type" : "text"},
                {"name":"登录账号","code":"userLogin","width":"100","type" : "text"},
                {"name":"用户类型","code":"userTypeName","width":"100","type" : "text"},
                {"name":"创建人","code":"userCreateName","width":"100","type" : "text"},
                {"name":"创建时间","code":"createDate","width":"100","type" : "text"}
            ],
            tenantId:this.$route.query.tenantId,
            showPassword:true,
            openTransportShow:false,
        }
    },
    components:{
        simpleTree,
        tableCommon
    },
    mounted() {
        this.getSysMenuAll();
        this.doQuerySysStaticData();
        this.doQuerySupplierUser();
    },
    methods: {
        isTransporPassword:function(){
            let that = this;
            that.passwordType = 1;
            that.userPassword= null;
        },
        doSaveUser:function () {
            let that = this;
            if(that.common.isBlank(that.userName)){
                that.$message.error('请填写姓名！');
                return;
            }
            if(that.common.isBlank(that.userPhone)){
                that.$message.error('请填写手机！');
                return;
            }
            if(that.common.isBlank(that.userLogin)){
                that.$message.error('请填写店员登录账号！');
                return;
            }
            if(that.common.isBlank(that.userPassword)){
                that.$message.error('请填写店员登录密码！');
                return;
            }
            if(!that.common.validatemobile(that.userLogin)){
                that.$message.error('登陆账号只能是手机号！');
                return;
            }
            if(!that.common.validatemobile(that.userPhone)){
                that.$message.error('请输入正确的联系手机号！');
                return;
            }
            let obj = {
                userName:that.userName,
                userPhone:that.userPhone,
                userLogin:that.userLogin,
                userPassword:that.userPassword,
                tenantId:that.tenantId,
                userId:that.userId,
                isPassword:that.passwordType,
            }
            that.$confirm(that.rms, '是否确认操作？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysUserBO.ajax?cmd=doSaveTransportUser";
                that.common.postUrl(url,obj,function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "操作成功"
                        });
                        that.dialogFormVisible=false;
                        that.doQuerySupplierUser();
                    }
                });
            });
        },
        addSysUser:function(){
            let that = this;
            that.userName= null;
            that.userPhone= null;
            that.userLogin= null;
            that.userPassword= null;
            that.passwordType = 1;
            that.userId = null;
            that.dialogFormVisible=true;
        },
        updateSysUser:function(){
            let that = this;
            that.selectData = that.$refs.table.getSelectItem();
            if(that.selectData.length == 0){
                that.$message.error('请选择需要修改的的数据！');
                return;
            }
            if(that.selectData.length != 1){
                that.$message.error('只能选中一条数据！');
                return;
            }
            that.userId = that.selectData[0].userId;
            that.userName = that.selectData[0].userName;
            that.userPhone = that.selectData[0].userPhone;
            that.userLogin = that.selectData[0].userLogin;
            that.userPassword = 123456;
            that.passwordType = 2;
            that.dialogFormVisible=true;
        },
        deleteSysUser:function () {
            let that = this;
            that.selectData = that.$refs.table.getSelectItem();
            if(that.selectData.length == 0){
                that.$message.error('请选择需要删除的数据！');
                return;
            }
            for(let el of that.selectData){
                if(el.userType==1){
                    that.$message.error('不能删除系统默认员工！');
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
            that.$confirm(that.rms, '是否删除员工？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysUserBO.ajax?cmd=deleteSysUser";
                that.common.postUrl(url,{"userIds":that.userIds},function (data) {
                    if(data != 'success'){
                        that.$message.error('删除失败！');
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "删除成功"
                        });
                        that.doQuerySupplierUser();
                    }
                });
            });
        },
        doQuerySupplierUser:function () {
            let that = this;
            let url = "api/sysUserBO.ajax?cmd=doQuerySupplierUser";
            this.$refs.table.load(url,{"tenantId":that.tenantId});
        },
        isPassword:function(){
            let that = this;
            that.showPassword=false;
            that.obj.userPassword=null;
        },
        async doQuerySysStaticData(){
            let that = this;
            let sysTenantDef = await that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantDefDetails",{"tenantId":that.tenantId});
            if(sysTenantDef.openTransport == 1){
                that.openTransportShow = true;
            }else{
                that.openTransportShow = false;
            }
            let sysUser = await that.common.postUrl("api/sysUserBO.ajax?cmd=getSysUser",{"tenantId":that.tenantId});
            that.sysUser = sysUser;
            if(!that.common.isBlank(that.sysUser)){
                that.obj.userId = that.sysUser.userId;
                that.obj.userLogin = that.sysUser.userLogin;
                that.obj.userPassword = that.sysUser.userPassword;
                that.showPassword=true;
            }else {
                that.showPassword=false;
            }
            let sysRole = await that.common.postUrl("api/sysRoleBO.ajax?cmd=getSysRoleAdmin",{"tenantId":that.tenantId});
            that.sysRole = sysRole;
            if(!that.common.isBlank(that.sysRole)){
                that.obj.roleId = that.sysRole.roleId;
                let data = await this.common.postUrl("api/sysMenuBO.ajax?cmd=getSysMenuAndButton",{"roleId":that.sysRole.roleId,"tenantId":that.tenantId,"attributionType":3})
                this.$refs.tree.setCheckedKeys(data);
            }
        },
        getSysMenuAll:function () {
            let that = this;
            let url = "api/sysMenuBO.ajax?cmd=getSysMenuAll";
            that.common.postUrl(url,{"attributionType":3},function (data) {
                that.data4 =data.items;
            })
        },
        doSave:function () {
            let that = this;
            that.obj.urlIds=that.$refs.tree.getCheckedKeys();
            if(that.common.isBlank(that.obj.userLogin)){
                that.$message.error('请输入登录账号！');
                return;
            }
            if(that.common.isBlank(that.obj.userPassword)){
                that.$message.error('请输入登录密码！');
                return;
            }
            if(that.obj.urlIds.length == 0){
                that.$message.error('请选择菜单权限！');
                return;
            }
            if(!that.common.validatemobile(that.obj.userLogin)){
                that.$message.error('超级管理员登录账号只能是手机号！');
                return;
            }
            if(that.openTransportShow){
                that.obj.openTransport=1;
            }else {
                that.obj.openTransport=2;
            }
            if(!that.showPassword){
                that.obj.isPassword=1;
            }else {
                that.obj.isPassword=2;
            }
            that.obj.tenantId=that.tenantId;
            that.$confirm(that.rms, '确认该配置？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url = "api/sysTenantDefBO.ajax?cmd=supplierSetUp";
                that.common.postUrl(url,that.obj,function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "配置成功"
                        });
                        that.$emit('clostToOther',that.$route.meta.id);
                    }
                });
            });
        },
        cancel:function () {
            let that = this;
            that.$emit('clostToOther', that.$route.meta.id);
        }
    }
}