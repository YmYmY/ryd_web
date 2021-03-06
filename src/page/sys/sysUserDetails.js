import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"

export default {
    name: 'sysUserDetails',
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
                userId:this.$route.query.userId,
            },
            type:this.$route.query.type,
            checked:false,
            showPassword:true,
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
        isPassword:function(){
            let that = this;
            that.showPassword=false;
            that.obj.userPassword=null;
        },
        //静态数据查询
        async doQuerySysStaticData () {
            let that = this;
            let data = await that.common.postUrl("api/sysUserBO.ajax?cmd=getSysUserDetails",{"userId":that.obj.userId});
            that.obj = data;
            if(that.type != 1){
                that.obj.password = "";
            }
            that.obj.userStatus=data.userStatus+"";
            that.obj.regionIds=[];
            that.obj.roleIds=[];
            that.obj.oragnizeIds=[];
            let regionIds = await that.common.postUrl("api/sysUserBO.ajax?cmd=getSysUserRegion",{"userId":that.obj.userId});
            that.obj.regionIds= regionIds;
            let roleIds = await that.common.postUrl("api/sysUserBO.ajax?cmd=getSysUserRole",{"userId":that.obj.userId});
            that.obj.roleIds= roleIds;
            let oragnizeIds = await that.common.postUrl("api/sysUserBO.ajax?cmd=getSysUserOragnize",{"userId":that.obj.userId});
            that.obj.oragnizeIds=oragnizeIds;

            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"USER_STATUS"},function (data) {
                that.userStatusList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysOragnize",{},function (data) {
                that.oragnizeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysRole",{},function (data) {
                that.roleList = data.items;
            })
            that.common.postUrl("api/sysRegionBO.ajax?cmd=getSysRegionTenantList",{},function (data) {
                that.regionList = data.items;
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
            if(that.obj.oragnizeIds.length == 0){
                that.$message.error('请选择归属组织！');
                return;
            }
            if(that.obj.regionIds.length == 0){
                that.$message.error('请选择加盟区域！');
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
            if(!that.showPassword){
                that.obj.isPassword=1;
            }else {
                that.obj.isPassword=2;
            }
            that.$confirm("", '确认操作？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysUserBO.ajax?cmd=updateSysUser";
                that.common.postUrl(url,that.obj,function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "操作成功请重新登录！"
                        });
                        that.common.postUrl("api/portalBusiBO.ajax?cmd=doLogout",{},function (data) {
                            if(data == "0"){
                                setTimeout(() => {
                                     window.location.href = "/login";
                                },1000)
                            }
                        })
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