import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"
import makeTransitShow from "@/page/fc/makeTransitShow.vue"
export default {
    name: 'paymentReport',
    data() {
        return {
            //table组件数据
            head :[
                {"name":"付款时间","code":"payTime","width":"150","type" : "text"},
                {"name":"下单客户","code":"customerTenantName","type" : "text","width":"200"},
                {"name":"申请总额","code":"applicationAmount","type" : "text","width":"200"},
                {"name":"审核总额","code":"auditAmount","type" : "text","width":"200"},
                {"name":"供应商名称","code":"supplierTenantName","type" : "text","width":"200"},
                {"name":"开户名","code":"bankPeople","type" : "text","width":"200"},
                {"name":"银行名称","code":"bankName","type" : "text","width":"200"},
                {"name":"银行账号","code":"bankCard","type" : "text","width":"200"},
                {"name":"外发单号","code":"outgoingTrackingNum","type" : "text","width":"200"},
                {"name":"子单号","code":"transitTrackingNum","type" : "text","width":"200"},
                {"name":"批次号","code":"batchNumAlias","type" : "text","width":"200"},
                {"name":"所属区域","code":"regionName","type" : "text","width":"200"},
                {"name":"订单类型","code":"orderTypeName","type" : "text","width":"200"},
                {"name":"发货方","code":"consignorName","type" : "text","width":"200"},
                {"name":"发货省市区","code":"consignorCityName","type" : "text","width":"200"},
                {"name":"收货方","code":"consigneeName","type" : "text","width":"200"},
                {"name":"收货省市区","code":"consigneeCityName","type" : "text","width":"200"},
                {"name":"中转重量","code":"packageWeight","type" : "text","width":"120"},
                {"name":"中转件数","code":"packageNumber","type" : "text","width":"120"},
                {"name":"中转体积","code":"packageVolume","type" : "text","width":"120"},
                {"name":"计费产品","code":"calculatePriceName","type" : "text","width":"120"},
                {"name":"运费","code":"freight","type" : "text","width":"120"},
                {"name":"提货费","code":"pickingCosts","type" : "text","width":"120"},
                {"name":"送货费","code":"deliveryCosts","type" : "text","width":"120"},
                {"name":"包装费","code":"packingCosts","type" : "text","width":"120"},
                {"name":"装卸费","code":"handingCosts","type" : "text","width":"120"},
                {"name":"其他费","code":"otherFee","width":"100","type" : "text"},
            ],
            obj:{
                payTime:[],
                auditStatus:"2",
                payStatus:"2",
                bankPeople:"",
                outgoingTrackingNum:"",
                payApplicantName:"",
                supplierTenantId:-1,
                customerTenantId:-1,
            },
            makeUpShow:false,
            customerTenantList:[],
            auditStatusList:[],
            supplierTenantList:[],
            outgoingId:"",
            orderId:"",
            flowId:"",
        }
    },
    //进入页面
    beforeRouteEnter(to,from,next){
        next(that => {
            //调用刷新方法
            that.doQueryPaymentInfo();
            that.doQuerySysStaticData();
        });
    },
    components: {
        tableCommon,
        makeTransitShow
    },
    mounted(){
        this.initHtml();
    },
    methods: {
        //清空查询条件
        clear:function () {
            let that = this;
            that.obj ={
                payTime:[],
                auditStatus:"2",
                payStatus:"2",
                bankPeople:"",
                outgoingTrackingNum:"",
                payApplicantName:"",
                supplierTenantId:-1,
                customerTenantId:-1,
            }
            this.initHtml();
        },
        closeCallback(){
            let that = this;
            that.makeUpShow=false;
        },
        doQueryPaymentInfo:function () {
            let that = this;
            if(that.common.isBlank(that.obj.payTime)){
                that.$message.error('请选择查询付款时间范围！');
                return;
            }
            if(that.common.isBlank(that.obj.payTime[0])){
                that.$message.error('请选择查询付款开始时间！');
                return;
            }
            if(that.common.isBlank(that.obj.payTime[1])){
                that.$message.error('请选择查询付款结束时间！');
                return;
            }
            let url = "api/fcIncomeBO.ajax?cmd=doQueryPaymentInfo";
            this.$refs.table.load(url,that.obj);
        },
        // 列表双击
        dblclickItem(order){
            let that = this;
            that.makeUpShow = true;
            that.flowId=order.flowId;
            that.outgoingId = order.outgoingId;
            that.orderId = order.orderId;
        },
        initHtml:function(){
            var bnow = new Date();
            bnow.setDate(bnow.getDate() -30);
            this.obj.payTime.push(this.common.formatTime(bnow,"yyyy-MM-dd ")+"00:00:00");
            this.obj.payTime.push(this.common.formatTime(new Date(),"yyyy-MM-dd ")+"23:59:59");
        },
        downloadExcelFile:function(){
            this.$refs.table.downloadExcelFile();
        },
        //静态数据查询
        doQuerySysStaticData:function () {
            let that = this;
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"AUDIT_STATUS"},function (data) {
                that.auditStatusList = data.items;
            })
            let tenantId=that.common.getCookie("tenantId");
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantDefCityName", {"pTenantId":tenantId},function(data){
                that.supplierTenantList = data.items;
                that.supplierTenantList.unshift({supplierFullName:"请选择",tenantId:-1});
            });
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantDefPName", {"pTenantId":tenantId},function(data){
                that.customerTenantList = data.items;
                that.customerTenantList.unshift({tenantFullName:"请选择",tenantId:-1});
            });
        },
    },
}