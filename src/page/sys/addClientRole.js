import simpleTree from '@/components/simpleTree/simpleTree.vue'
export default {
    name: 'addClientRole',
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
        }
    },
    components:{
        simpleTree
    },
    mounted() {
        this.getSysMenuAll();
    },
    methods: {
        getSysMenuAll:function () {
            let that = this;
            let url = "api/sysMenuBO.ajax?cmd=doQueryClientMenu";
            that.common.postUrl(url,{"tenantId":that.common.getCookie("tenantId")},function (data) {
                that.data4 =data.items;
            })
        },
        doSave:function () {
            let that = this;
            that.obj.urlIds=that.$refs.tree.getCheckedKeys();
            if(that.common.isBlank(that.obj.roleName)){
                that.$message.error('请输入角色名称！');
                return;
            }
            if(that.obj.urlIds.length == 0){
                that.$message.error('请选择角色权限！');
                return;
            }
            that.$confirm(that.rms, '是否新增角色？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url = "api/sysMenuBO.ajax?cmd=doSaveSysMenuRole";
                that.common.postUrl(url,that.obj,function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "新增角色成功"
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