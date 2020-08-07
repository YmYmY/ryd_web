
export default {
    name: 'updateSupplierRole',
    data() {
        return {
            data4: null,
            renderContent:null,
            defaultProps: {
                children: 'children',
                label: 'urlName'
            },
            obj:{
                roleName:null,
                remarks:null
            },
            roleId:this.$route.query.roleId
        }
    },
    mounted() {
        this.getInfo();
    },
    methods: {
        async getInfo(){
            this.obj = await this.common.postUrl("api/sysRoleBO.ajax?cmd=getSysRole",{"roleId":this.roleId});

            let {items} = await this.common.postUrl("api/sysMenuBO.ajax?cmd=getSysMenuAll",{"attributionType":3})
            this.data4 = items;
            if(this.obj.roleType==1) this.disabledTree(this.data4);

            let data = await this.common.postUrl("api/sysMenuBO.ajax?cmd=getSysMenuAndButton",{"roleId":this.roleId})
            this.$refs.vuetree.setCheckedKeys(data);

        },
        doSave:function () {
            let that = this;
            that.obj.urlIds=that.$refs.vuetree.getCheckedKeys();
            //获取全部选择id
            that.obj.urlIds = that.common.treeFn.getTreeParentId(that.data4,that.obj.urlIds);
            if(that.common.isBlank(that.obj.roleName)){
                that.$message.error('请输入角色名称！');
                return;
            }
            if(that.obj.urlIds.length == 0){
                that.$message.error('请选择角色权限！');
                return;
            }
            that.$confirm(that.rms, '是否修改角色？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url = "api/sysMenuBO.ajax?cmd=updateSysMenuRoleSupplier";
                that.common.postUrl(url,that.obj,function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "修改角色成功"
                        });
                        that.$emit('clostToOther',that.$route.meta.id);
                    }
                });
            });
        },
        disabledTree(obj){
            obj.forEach(el =>{
                el.disabled = true
                if(el.children!=null){
                    this.disabledTree(el.children);
                }
            })
        },
        cancel:function () {
            let that = this;
            that.$emit('clostToOther', that.$route.meta.id);
        }
    }
}