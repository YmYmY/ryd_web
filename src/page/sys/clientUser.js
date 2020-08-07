import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"

export default {
    name: 'clientUser',
    data() {
        return {
            //table组件数据
            head :[
                {"name":"状态","code":"userStatusName","width":"110","type" : "text"},
                {"name":"姓名","code":"userName","width":"100","type" : "text"},
                {"name":"手机号码","code":"userPhone","width":"100","type" : "text"},
                {"name":"所属角色","code":"roleName","width":"100","type" : "text"},
                {"name":"登录账号","code":"userLogin","width":"100","type" : "text"},
                {"name":"用户类型","code":"userTypeName","width":"100","type" : "text"},
                {"name":"创建人","code":"userCreateName","width":"100","type" : "text"},
                {"name":"创建时间","code":"createDate","width":"100","type" : "text"}
            ],
            obj:{
                createDate:"",
                userStatus:"-1",
                roleId:-1,
                userName:null,
                userPhone:null,
                userType:"-1",
            },
            userTypeList:[],
            userStatusList:[],
            oragnizeList:[],
            roleList:[],
            tableData: [],
            dialogVisible:false,
            checked:false,
            checkList:[],
            regionList:[],
            regionIds:[],
            showDefaultArea:false,
        }
    },
    //进入页面
    beforeRouteEnter(to,from,next){
        next(that => {
            //调用刷新方法
            that.doQueryClientUser();
            that.doQuerySysStaticData();
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
        doQueryClientUser:function () {
            let that = this;
            let url = "api/sysUserBO.ajax?cmd=doQueryClientUser";
            this.$refs.table.load(url,that.obj);
        },
        //清空查询条件
        clear:function () {
            let that = this;
            that.obj = {
                createDate:"",
                userStatus:"-1",
                roleId:-1,
                userName:null,
                userPhone:null,
                userType:"-1",
            }
        },
        //静态数据查询
        doQuerySysStaticData:function () {
            let that = this;
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"USER_STATUS","hasAll":true},function (data) {
                that.userStatusList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"RED_USER_TYPE","hasAll":true},function (data) {
                that.userTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysRole",{"hasAll":true},function (data) {
                that.roleList = data.items;
            })
        },
        addClientUser:function () {
            let that = this;
            let item = {
                urlName: "新增员工",
                urlId: "10" + new Date().getTime(),
                urlPath: "/sys/addClientUser.vue",
                urlPathName: "/addClientUser",
                query: {}
            }
            that.$emit('openTab', item);
        },
        updateClientUser:function () {
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
                urlName: "修改员工",
                urlId: "10" + new Date().getTime(),
                urlPath: "/sys/updateClientUser.vue",
                urlPathName: "/updateClientUser",
                query:{"userId":selectData[0].userId,"userType":selectData[0].userType}
            }
            that.$emit('openTab', item);
        },
        async authorization(){
            let that = this;
            let selectData = that.$refs.table.getSelectItem();
            if(selectData.length == 0){
                that.$message.error('请选择需要授权的数据！');
                return;
            }
            if(selectData.length != 1){
                that.$message.error('只能选择一条数据！');
                return;
            }
            if(selectData[0].userType == 1){
                that.$message.error('系统默认员工不能手动授权！');
                return;
            }
            that.authorizationUserId = selectData[0].userId;
            let regionList =await that.common.postUrl("api/sysRegionBO.ajax?cmd=getSysRegionTenantList",{});
            let regionIds = await that.common.postUrl("api/sysUserBO.ajax?cmd=getSysUserRegion",{"userId":selectData[0].userId});
            that.regionList = regionList.items;
            that.regionIds=regionIds;
            that.dialogVisible = true;
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
                        that.doQueryClientUser();
                    }
                });
            });
        },

        doSave:function () {
            let that = this;
            if(that.regionIds.length == 0){
                that.$message.error('请选择授权区域！');
                return;
            }
            that.$confirm("", '确认授权？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysUserBO.ajax?cmd=doSaveUserAuthorization";
                that.common.postUrl(url,{"userId":that.authorizationUserId,"regionIds":that.regionIds,"regionId":that.regionId},function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "授权成功！"
                        });
                        that.dialogVisible = false;
                    }
                });
            });
        },
    }
}