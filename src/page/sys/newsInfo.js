import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"
export default {
    name: 'newsInfo',
    data() {
        return {
            newsDate:"",
            infoList:[],
            page:1,
            pageList:[],
        }
    },
    mounted() {
        this.initHtml();
        this.doQuerySysPushParam();
    },
    components: {
        tableCommon
    },
    methods: {
        updatePushReadState:function(item){
            let that = this;
            if(item.pushState != 2){
                return;
            }
            let url = "api/sysPushParamBO.ajax?cmd=updatePushReadState";
            that.yyyyMMId = that.newsDate.replace("-","");
            that.yyyyMMId += "_" + item.id;
            that.common.postUrl(url, {"yyyyMMId":that.yyyyMMId}, function (data) {
                console.log(data);
            })
        },

        initHtml:function(){
            var bnow = new Date();
            bnow.setDate(bnow.getDate());
            this.newsDate=this.common.formatTime(bnow,"yyyyMM");
        },
        downloadExcelFile:function(){
            this.$refs.table.downloadExcelFile();
        },
        doQuerySysPushParam:function (clear) {
            if(clear) this.page = 1;
            let that = this;
            if(that.common.isBlank(that.newsDate)){
                that.$message.error('请选择消息时间！');
                return;
            }
            that.newsDate = that.newsDate.replace("-","");
            var bnow = new Date();
            if(that.newsDate > this.common.formatTime(bnow,"yyyyMM")){
                that.$message.error('消息时间不能大于当前月份！');
                return;
            }
            if(that.newsDate < 202001){
                that.$message.error('消息时间不能小于2020年1月！');
                return;
            }
            let url = "api/sysPushParamBO.ajax?cmd=doQuerySysPushParam";
            that.common.postUrl(url, {"newsDate":that.newsDate,page:this.page}, function (data) {
                that.infoList = data.items;
                that.page = data.page;
                that.totalPage = Math.ceil(data.totalNum/10);
                that.pageList = [];
                for(let i=0;i<that.totalPage;i++){
                    that.pageList[i] = i+1;
                }
            })
        },
        prePage(){
            if(this.page>1) this.page--;          
            this.doQuerySysPushParam();  
        },
        nextPage(){
            if(this.page<this.totalPage) this.page++;    
            this.doQuerySysPushParam();
        },
        changePage(page){
            this.page = page;
            this.doQuerySysPushParam();
        }
    }
}