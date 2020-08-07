import tableCommon from "@/components/table/tableCommon.vue"
export default {
    name: 'cmAbnormal',
    data() {
        return {
            //table组件数据
            head :[
                {"name":"登记时间","code":"registerDate","width":"150","type" : "text"},
                {"name":"开单时间","code":"billingDate","width":"100","type" : "text"},
                {"name":"异常编号","code":"id","width":"100","type" : "text"},
                {"name":"运单号","code":"trackingNum","width":"120","type" : "text"},
                {"name":"反馈类型","code":"feedbackTypeName","width":"100","type" : "text"},
                {"name":"反馈人","code":"feedbackPeople","width":"80","type" : "text"},
                {"name":"归属区域","code":"regionName","width":"80","type" : "text"},
                {"name":"订单状态","code":"orderOutStateName","width":"120","type" : "text"},
                {"name":"处理类型","code":"dealTypeName","width":"120","type" : "text"},
                {"name":"费用类型","code":"feeTypeName","width":"120","type" : "text"},
                {"name":"登记区域","code":"registerName","width":"120","type" : "text"},
                {"name":"登记人","code":"registerPeople","width":"150","type" : "text"},
                {"name":"异常金额","code":"registerFee","width":"100","type" : "text"},
                {"name":"异常类型","code":"abnormalTypeName","width":"100","type" : "text"},
                {"name":"处理金额","code":"dealFee","width":"100","type" : "text"},
                {"name":"异常件数","code":"abnormalNum","width":"80","type" : "text"},
                {"name":"责任方","code":"responTypeName","width":"80","type" : "text"},
                {"name":"异常描述","code":"abnormalNote","width":"120","type" : "text"},
                {"name":"处理时间","code":"dealDate","width":"120","type" : "text"},
                {"name":"处理人","code":"dealPeople","width":"120","type" : "text"},
                {"name":"处理描述","code":"dealNote","width":"120","type" : "text"},
                {"name":"发货店仓","code":"consignorName","width":"150","type" : "text"},
                {"name":"发货人","code":"consignorLinkmanName","width":"100","type" : "text"},
                {"name":"发货手机","code":"consignorBill","width":"100","type" : "text"},
                {"name":"发货电话","code":"consignorTelephone","width":"100","type" : "text"},
                {"name":"收货客户","code":"consigneeName","width":"100","type" : "text"},
                {"name":"收货人","code":"consigneeLinkmanName","width":"100","type" : "text"},
                {"name":"收货手机","code":"consigneeBill","width":"100","type" : "text"},
                {"name":"收货电话","code":"consigneeTelephone","width":"100","type" : "text"},
            ],
            obj:{
                registerDate:"",
                registerId:"",
                otherName:"",
                abnormalType:"",
                billingDate:"",
                dealType:"",
                trackingNum:"",
                feedbackPeople:"",
                xuanType:"2",
                orderType:""
            },
            //选择框数据
            options: [{
                value: '2',
                label: '发货店仓'
            }, {
                value: '3',
                label: '收货店仓'
            },{
                value: '4',
                label: '发货人'
            },{
                value: '5',
                label: '收货人'
            },],
            abnormalTypeList:[],
            dealTypeList:[],
            orderTypeList:[]
         }
    },
    //进入页面
    beforeRouteEnter(to,from,next){
        next(that => {
            //调用刷新方法
            that.doQueryCmAbnormal();
            that.doQuerySysStaticData();
        });
    },
    mounted() {
       
    },
    components: {
        tableCommon,
    },
    methods: {
        downloadExcelFile:function(){
            this.$refs.table.downloadExcelFile();
        },
        //清空查询条件
        clear:function () {
            let that = this;
            that.obj ={
                registerDate:"",
                registerId:"",
                otherName:"",
                abnormalType:"",
                billingDate:"",
                dealType:"",
                trackingNum:"",
                feedbackPeople:"",
                xuanType:"2",
                orderType:"",
            }
        },
        doQueryCmAbnormal:function () {
            let that = this;
            let url = "api/cmAbnormalBO.ajax?cmd=doQueryCmAbnormalClient";
            this.$refs.table.load(url,that.obj);
        },
        //静态数据查询
        doQuerySysStaticData:function () {
            let that = this;
            let url = "api/sysStaticDataBO.ajax?cmd=getSysStaticDataSimpleByCodeTypes";
            let codeTypes = [];
            codeTypes.push("ABNORMAL_TYPE");
            codeTypes.push("DEAL_TYPE");
            codeTypes.push("ORDER_TYPE");
            that.common.postUrl(url,{"codeTypes":codeTypes.join(",")},function(data){
                debugger
                that.abnormalTypeList = data.ABNORMAL_TYPE;
                that.dealTypeList = data.DEAL_TYPE;
                that.orderTypeList = data.ORDER_TYPE;
            });
        },
    }
}