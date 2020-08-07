import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"
import common from "../../utils/common";

export default {
    name: 'join',
    data() {
        return {
            //table组件数据
            head :[
                {"name":"创建时间","code":"createDate","width":"150","type" : "text"},
                {"name":"审核状态","code":"approvalStatusName","width":"100","type" : "text"},
                {"name":"加盟商全称","code":"tenantFullName","width":"100","type" : "text"},
                {"name":"加盟商简称","code":"tenantName","width":"80","type" : "text"},
                {"name":"加盟区域","code":"regionName","width":"80","type" : "text"},
                {"name":"上级组织","code":"pTenantName","width":"80","type" : "text"},
                {"name":"状态","code":"tenantStatusName","width":"80","type" : "text"},
                {"name":"联系人","code":"tenantPrincipal","width":"80","type" : "text"},
                {"name":"联系手机","code":"tenantPhone","width":"100","type" : "text"},
                {"name":"审核时间","code":"approvalDate","width":"150","type" : "text"},
                {"name":"审核备注","code":"approvalRemarks","width":"80","type" : "text"},
                {"name":"审核人","code":"approvalPeople","width":"80","type" : "text"},
                {"name":"服务时长(年)","code":"fwNum","width":"80","type" : "text"},
                {"name":"服务周期","code":"fwDate","width":"200","type" : "text"},
                {"name":"平台使用费（元）","code":"tenantCostDouble","width":"100","type" : "text"},
                {"name":"禁用人","code":"disablePeople","width":"80","type" : "text"},
                {"name":"禁用原因","code":"disableRemarks","width":"80","type" : "text"}
            ],
            obj:{
                createDate:"",
                approvalStatus:"-1",
                tenantName:null,
                tenantPrincipal:null
            },
            approvalStatusList:[],
            tableData: [],
            baseUser:[],
            dialogFormVisible:false,
            disableRemarks:null,
        }
    },
    //进入页面
    beforeRouteEnter(to,from,next){
        next(that => {
            //调用刷新方法
            that.doQuerySysTenantDefPlatform();
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
        doQuerySysTenantDefPlatform:function () {
            let that = this;
            let url = "api/sysTenantDefBO.ajax?cmd=doQuerySysTenantDefPlatform";
            this.$refs.table.load(url, that.obj);

        },
        //清空查询条件
        clear:function () {
            let that = this;
            that.obj ={
                createDate:"",
                approvalStatus:"-1",
                tenantName:null,
                tenantPrincipal:null
            }
        },
        //静态数据查询
        doQuerySysStaticData:function () {
            let that = this;
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"APPROVAL_STATUS","hasAll":true},function (data) {
                that.approvalStatusList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=getBaseUser",{},function (data) {
                that.baseUser = data;
            })
        },
        //新增
        addJoin:function () {
            let that = this;
            let item = {
                urlName: "新增加盟商",
                urlId: "13" + new Date().getTime(),
                urlPath: "/user/addJoin.vue",
                urlPathName: "/addJoin",
                query:{}
            }
            that.$emit('openTab', item);
        },
        //修改
        updateJoin:function () {
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
                urlName: "修改加盟商",
                urlId: "13" + new Date().getTime(),
                urlPath: "/user/updateJoin.vue",
                urlPathName: "/updateJoin",
                query:{"tenantId":selectData[0].tenantId,"createTenantId":selectData[0].pTenantId}
            }
            that.$emit('openTab', item);
        },
        //启用/停用
        updateStatus:function () {
            let that = this;
            let selectData = that.$refs.table.getSelectItem();
            if(selectData.length == 0){
                that.$message.error('请选择需要操作的数据！');
                return;
            }
            if(selectData.length != 1){
                that.$message.error('只能选择一条数据！');
                return;
            }
            if(selectData[0].tenantStatus == 1){
                that.tenantStatus=2;
                that.tenantId=selectData[0].tenantId;
                that.rms = "确认禁用该加盟商"
                that.message="禁用成功！"
                that.dialogFormVisible=true;
                that.disableRemarks=null;
                return;
            }else {
                that.tenantStatus=1;
                that.tenantId=selectData[0].tenantId;
                that.rms = "确认启用该加盟商"
                that.message="启用成功！"
            }
            that.$confirm(that.rms, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.common.postUrl("api/sysTenantDefBO.ajax?cmd=updateSysTenantDefPlatform",{"tenantId": that.tenantId,"tenantStatus":that.tenantStatus},function (data) {
                   if(data != 'success'){
                       return;
                   }else {
                       that.doQuerySysTenantDefPlatform();
                       that.$message({
                           type: 'success',
                           message: that.message
                       });
                   }
                });
            });
        },
        //禁用
        disable:function(){
            let that = this;
            if(that.common.isBlank(that.disableRemarks)){
                that.$message.error('请输入禁用原因！');
                return;
            }
            that.$confirm(that.rms, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.common.postUrl("api/sysTenantDefBO.ajax?cmd=updateSysTenantDefPlatform",{"tenantId": that.tenantId,"tenantStatus":that.tenantStatus,"disableRemarks":that.disableRemarks},function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.dialogFormVisible=false;
                        that.doQuerySysTenantDefPlatform();
                        that.$message({
                            type: 'success',
                            message: that.message
                        });
                    }
                });
            });
        },
        //审核
        updateReview:function () {
            let that = this;
            let selectData = that.$refs.table.getSelectItem();
            if(selectData.length == 0){
                that.$message.error('请选择需要操作的数据！');
                return;
            }
            if(selectData.length != 1){
                that.$message.error('只能选择一条数据！');
                return;
            }
            if(selectData[0].approvalStatus != 1){
                that.$message.error('该条数据不为待审核！');
                return;
            }
            let item = {
                urlName: "审核加盟商",
                urlId: "13" + new Date().getTime(),
                urlPath: "/user/reviewJoin.vue",
                urlPathName: "/reviewJoin",
                query:{"tenantId":selectData[0].tenantId,"createTenantId":selectData[0].pTenantId}
            }
            that.$emit('openTab', item);
        }
    }
}