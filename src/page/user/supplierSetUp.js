import simpleTree from '@/components/simpleTree/simpleTree.vue'
export default {
    name: 'supplierSetUp',
    data() {
        return {
            data4: null,
            renderContent:null,
            defaultProps: {
                children: 'children',
                label: 'urlName'
            },
            obj:{
                userLogin:null,
                userPassword:null
            },
            tenantId:this.$route.query.tenantId,
            showPassword:true,
        }
    },
    components:{
        simpleTree
    },
    mounted() {
        this.getSysMenuAll();
        this.doQuerySysStaticData();
    },
    methods: {
        isPassword:function(){
            let that = this;
            that.showPassword=false;
            that.obj.userPassword=null;
        },
        async doQuerySysStaticData(){
            let that = this;
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