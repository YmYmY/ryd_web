import lodopUtil from "@/utils/lodop/lodop-business.js"
export default {
    name: 'sysPrint',
    data() {
        return {
            dataItems:[],
        }
    },
    mounted() {
        this.doQuerySysStaticData();
    },
    methods: {
        //静态数据查询
        doQuerySysStaticData:function () {
            let that = this;
            let url = "api/sysPrintBO.ajax?cmd=queryEffectTablePrintConfig";
            that.common.postUrl(url,{},function (data) {
                that.dataItems = data.items;
            });
        },
        toSetEffectPrintConfig:function($event,printConfig,level){
            let that = this;
            that.printConfig=printConfig;
            that.printConfig.effectConfigLevel=level;
            let url = "api/sysPrintBO.ajax?cmd=saveEffectPrintConfig";
            that.common.postUrl(url,that.printConfig,function () {
                that.doQuerySysStaticData();
            });
        },
        toViewPrint:function(printConfig,configId){
            let that = this;
            that.title = printConfig.bizName;
            that.bizCode = printConfig.bizCode;
            that.printTime = new Date();
            that.configId = configId;
            lodopUtil.commonPrint(printConfig.bizName);
        },
        toViewExpressPrint:function(configId,bizCode){
            let that = this;
            let item = {
                urlName: "定义模板",
                urlId: "10" + new Date().getTime(),
                urlPath: "/sys/expressPrintConfig.vue",
                urlPathName: "/expressPrintConfig",
                query: {"configId":configId,"bizCode":bizCode,"isView":1}
            }
            that.$emit('openTab', item);
        },
        toSetPrintConfig:function(configId,bizCode,addFrom){
            let that = this;
            let item = {
                urlName: "定义模板",
                urlId: "10" + new Date().getTime(),
                urlPath: "/sys/setPrintConfig.vue",
                urlPathName: "/setPrintConfig",
                query: {"configId":configId,"bizCode":bizCode,"addFrom":addFrom}
            }
            that.$emit('openTab', item);
        },
        toExpressPrintConfig:function(configId,bizCode,addFrom){
            let that = this;
            let item = {
                urlName: "定义模板",
                urlId: "10" + new Date().getTime(),
                urlPath: "/sys/expressPrintConfig.vue",
                urlPathName: "/expressPrintConfig",
                query: {"configId":configId,"bizCode":bizCode,"addFrom":addFrom,"isView":0}
            }
            that.$emit('openTab', item);
        },
        cancel:function () {
            let that = this;
            that.$emit('clostToOther',that.$route.meta.id);
        },
    }
}