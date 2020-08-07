import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"
import myFileModel from '@/components/myFileModel/myFileModel.vue'

export default {
    name: 'clientDetails',
    data() {
        return {
            obj:{
                tenantFullName:null,
                tenantName:null,
                tenantType:null,
                tenantPhone:null,
                tenantPrincipal:null,
                phoneOne:null,
                officeAddress:null,
            },
            isShowUser:true,
            userLogin:null,
        }
    },
    mounted() {
        this.doQuerySysStaticData();
    },
    components: {
        tableCommon,
        myFileModel
    },
    methods: {
        isUserLogin:function(){
            this.isShowUser=false;
        },
        doSave:function(){
            let that = this;
            if(that.common.isBlank(that.userLogin)){
                that.$message.error('请输入注册手机！');
                return;
            }
            if(!that.common.validatemobile(that.userLogin)){
                that.$message.error('注册手机只能是手机号码！');
                return;
            }
            that.$confirm("", '是否确认操作？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysUserBO.ajax?cmd=updateSysUserLogin";
                that.common.postUrl(url,{"userId":that.userId,"userLogin":that.userLogin},function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "操作成功！"
                        });
                        that.$emit('clostToOther', that.$route.meta.id);
                    }
                });
            });
        },
        //静态数据查询
        async doQuerySysStaticData () {
            let that = this;
            let data = await that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantDefDetails",{"tenantId":that.common.getCookie("tenantId")});
            that.obj = data;
            that.$refs.businessLicense.initDate(data.businessLicense);
            that.$refs.tenantLogo.initDate(data.tenantLogo);
            that.$refs.cardId.initDate(data.cardId);
            let sysUser = await that.common.postUrl("api/sysUserBO.ajax?cmd=getSysUser",{"tenantId":that.common.getCookie("tenantId")});
            that.userLogin = sysUser.userLogin;
            that.userId = sysUser.userId;
        },
        cancel:function () {
            let that = this;
            // eslint-disable-next-line no-irregular-whitespace
            that.$emit('clostToOther', that.$route.meta.id);
        },
    }
}