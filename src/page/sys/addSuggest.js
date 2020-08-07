import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"

export default {
    name: 'addSuggest',
    data() {
        return {
            obj:{
                suggestType:"1",
                suggestNote:"",
                orderId:"",
            },
            isShow:false,
            suggestTypeList:[],
        }
    },
    mounted() {
        this.doQuerySysStaticData();
    },
    components: {
        tableCommon
    },
    methods: {
        selectType:function(){
            if(this.obj.suggestType == "4"){
                this.isShow=true;
            }else {
                this.isShow=false;
            }
        },
        downloadExcelFile:function(){
            this.$refs.table.downloadExcelFile();
        },
        doSave:function(){
            let that = this;
            if(that.common.isBlank(that.obj.suggestNote)){
                that.$message.error('请填写建议内容！');
                return;
            }
            that.obj.suggestSource = this.$route.query.suggestSource;
            that.$confirm("", '是否新增建议反馈？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysTenantDefBO.ajax?cmd=doSaveSuggest";
                that.common.postUrl(url,that.obj,function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "新增建议反馈成功！"
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
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"SUGGEST_TYPE"},function (data) {
                that.suggestTypeList = data.items;
            })
        },
    }
}