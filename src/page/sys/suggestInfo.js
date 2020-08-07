import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"

export default {
    name: 'suggestInfo',
    data() {
        return {
            //table组件数据
            head :[
                {"name":"反馈类型","code":"suggestTypeName","width":"110","type" : "text"},
                {"name":"状态","code":"suggestStateName","width":"100","type" : "text"},
                {"name":"反馈时间","code":"suggestDate","width":"100","type" : "text"},
                {"name":"处理时间","code":"dealDate","width":"100","type" : "text"},
                {"name":"反馈人","code":"suggestName","width":"100","type" : "text"},
                {"name":"联系手机","code":"suggestPhone","width":"100","type" : "text"},
                {"name":"邮箱地址","code":"suggestMailbox","width":"100","type" : "text"},
                {"name":"反馈内容","code":"suggestNote","width":"100","type" : "text"},
                {"name":"关联订单号","code":"orderId","width":"100","type" : "text"},
                {"name":"处理人","code":"handlerName","width":"100","type" : "text"},
            ],
            obj:{
                suggestDate:"",
                suggestType:"-1",
                suggestPhone:"",
            },
            suggestTypeList:[],
        }
    },
    //进入页面
    beforeRouteEnter(to,from,next){
        next(that => {
            //调用刷新方法
            that.doQueySuggestInfo();
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
        doQueySuggestInfo:function () {
            let that = this;
            let url = "api/sysTenantDefBO.ajax?cmd=doQueySuggestInfo";
            this.$refs.table.load(url,that.obj);
        },
        //清空查询条件
        clear:function () {
            let that = this;
            that.obj = {
                suggestDate:"",
                suggestType:"-1",
                suggestPhone:"",
            }
        },
        //静态数据查询
        doQuerySysStaticData:function () {
            let that = this;
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"SUGGEST_TYPE","hasAll":true},function (data) {
                that.suggestTypeList = data.items;
            })
        },
        addSuggest:function () {
            let that = this;
            let item = {
                urlName: "新增建议反馈",
                urlId: "10" + new Date().getTime(),
                urlPath: "/sys/addSuggest.vue",
                urlPathName: "/addSuggest",
                query: {"suggestSource":3}
            }
            that.$emit('openTab', item);
        },
        deleteSuggest:function () {
            let that = this;
            that.selectData = that.$refs.table.getSelectItem();
            if(that.selectData.length == 0){
                that.$message.error('请选择需要删除的数据！');
                return;
            }
            that.ids="";
            that.selectData.forEach((el,index)=>{
                if(index == that.selectData.length-1){
                    that.ids+=el.id ;
                }else {
                    that.ids+=el.id + ",";
                }
            })
            that.$confirm(that.rms, '是否删除建议反馈？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysTenantDefBO.ajax?cmd=deleteSuggest";
                that.common.postUrl(url,{"ids":that.ids},function (data) {
                    if(data != 'success'){
                        that.$message.error('删除失败！');
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "删除成功"
                        });
                        that.doQueySuggestInfo();
                    }
                });
            });
        },
    }
}