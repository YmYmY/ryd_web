import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"

export default {
    name: 'addClientUser',
    data() {
        return {
            obj:{
                userName:null,
                userPhone:null,
                userPosition:null,
                userMailbox:null,
                userLogin:null,
                userPassword:null,
                regionIds:[],
                oragnizeIds:[],
                roleIds:[],
                showDefaultArea:false,
                userStatus:null,

            },
            checked:false,
            oragnizeList:[],
            regionList:[],
            userStatusList:[],
            roleList:[],
        }
    },
    mounted() {
        this.doQuerySysStaticData();
    },
    components: {
        tableCommon
    },
    methods: {
        //静态数据查询
        doQuerySysStaticData:function () {
            let that = this;
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"USER_STATUS"},function (data) {
                that.userStatusList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysRole",{},function (data) {
                that.roleList = data.items;
            })
        },
        doSave:function () {
            let that = this;
            if(that.common.isBlank(that.obj.userName)){
                that.$message.error('请填写员工名称！');
                return;
            }
            if(that.common.isBlank(that.obj.userPhone)){
                that.$message.error('请填写联系手机！');
                return;
            }
            if(that.obj.roleIds.length == 0){
                that.$message.error('请选择角色！');
                return;
            }
            if(that.common.isBlank(that.obj.userStatus)){
                that.$message.error('请选择状态！');
                return;
            }
            if(that.common.isBlank(that.obj.userLogin)){
                that.$message.error('请选择登录账号！');
                return;
            }
            if(that.common.isBlank(that.obj.userPassword)){
                that.$message.error('请选择登录密码！');
                return;
            }
            if(!that.common.validatemobile(that.obj.userPhone)){
                that.$message.error('请输入正确的联系手机号！');
                return;
            }
            if(!that.common.validatemobile(that.obj.userLogin)){
                that.$message.error('登录账号只能是手机号码！');
                return;
            }
            that.$confirm("", '是否新增员工？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysUserBO.ajax?cmd=doSaveClientUser";
                that.common.postUrl(url,that.obj,function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "新增员工成功！"
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
    }
}