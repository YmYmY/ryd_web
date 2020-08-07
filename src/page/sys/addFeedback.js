import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"

export default {
    name: 'addFeedback',
    data() {
        return {
            //table组件数据
            head :[
                {"name":"处理时间","code":"dealDate","width":"110","type" : "text"},
                {"name":"处理人","code":"handlerName","width":"100","type" : "text"},
                {"name":"状态","code":"suggestStateName","width":"100","type" : "text"},
                {"name":"处理描述","code":"handlerNote","width":"100","type" : "text"},
            ],
            obj:{
                suggestName:"",
                suggestPhone:"",
                suggestDate:"",
                orderId:"",
                suggestNote:"",
            },
            id:this.$route.query.id,
            handlerNote:"",
            suggestState:"",
            suggestStateList:[],
        }
    },
    mounted() {
        this.doQueryFeedbackExt();
        this.doQuerySysStaticData();
    },
    components: {
        tableCommon
    },
    methods: {
        doQueryFeedbackExt:function(){
            let that = this;
            let url = "api/sysTenantDefBO.ajax?cmd=doQuerySuggestInfoExt";
            this.$refs.table.load(url,{"id":that.id});
        },
        downloadExcelFile:function(){
            this.$refs.table.downloadExcelFile();
        },
        doSave:function(){
            let that = this;
            if(that.common.isBlank(that.suggestState)){
                that.$message.error('请选择处理结果！');
                return;
            }
            that.$confirm("", '是否确认操作？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysTenantDefBO.ajax?cmd=doSaveSuggestExt";
                that.common.postUrl(url,{"id":that.id,"handlerNote":that.handlerNote,"suggestState":that.suggestState},function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "操作成功！"
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
        //清空查询条件
        clear:function () {
            let that = this;
            that.obj = {
                suggestType:"-1",
                suggestNote:"",
            }
        },
        //静态数据查询
        doQuerySysStaticData:function () {
            let that = this;
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"SUGGEST_STATE"},function (data) {
                that.suggestStateList = data.items;
            })
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSuggestInfo",{"id":that.id},function (data) {
                that.obj = data;
            })
        },
    }
}