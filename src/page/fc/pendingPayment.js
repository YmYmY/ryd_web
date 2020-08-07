import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"
export default {
    name: 'pendingPayment',
    data() {
        return {
            //table组件数据
            head :[
                {"name":"申请时间","code":"payApplicationTime","width":"150","type" : "text"},
                {"name":"申请单号","code":"payApplicationCode","width":"150","type" : "text"},
                {"name":"申请人","code":"payApplicantName","width":"150","type" : "text"},
                {"name":"中转时间","code":"outGoingDate","width":"150","type" : "text"},
                {"name":"付款状态","code":"payStatusName","width":"150","type" : "text"},
                {"name":"下单客户","code":"customerTenantName","type" : "text","width":"200"},
                {"name":"申请总额","code":"applicationAmount","type" : "text","width":"200"},
                {"name":"审核总额","code":"auditAmount","type" : "text","width":"200"},
                {"name":"审核日期","code":"auditTime","type" : "text","width":"200"},
                {"name":"子单号","code":"transitTrackingNum","type" : "text","width":"200"},
                {"name":"批次号","code":"batchNumAlias","type" : "text","width":"200"},
                {"name":"供应商名称","code":"supplierTenantName","type" : "text","width":"200"},
                {"name":"所属区域","code":"regionName","type" : "text","width":"200"},
                {"name":"开户名","code":"bankPeople","type" : "text","width":"200"},
                {"name":"银行名称","code":"bankName","type" : "text","width":"200"},
                {"name":"银行账号","code":"bankCard","type" : "text","width":"200"},
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
                payApplicationTime:[],
                auditStatus:"2",
                payApplicantName:"",
                outgoingTrackingNum:"",
                auditTime:[],
                supplierTenantId:-1,
            },
            desItem:"",
            payNotes:"",
            payTime:"",
            payType:"",
            dialogFormVisible:false,
            payTypeList:[],
            auditStatusList:[],
            supplierTenantList:[],
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
        tableCommon
    },
    mounted(){
        this.initHtml();
    },
    methods: {
        selectPay:function(obj){
            let that = this;
            that.payType = obj.id;
            that.payTypeName = obj.desItemName;
        },
        //清空查询条件
        clear:function () {
            let that = this;
            that.obj ={
                payApplicationTime:[],
                auditStatus:"2",
                payApplicantName:"",
                outgoingTrackingNum:"",
                auditTime:[],
                supplierTenantId:-1,
            }
            this.initHtml();
        },
        doQueryPaymentInfo:function () {
            let that = this;
            if(that.common.isBlank(that.obj.payApplicationTime)){
                that.$message.error('请选择查询申请时间范围！');
                return;
            }
            if(that.common.isBlank(that.obj.payApplicationTime[0])){
                that.$message.error('请选择查询申请开始时间！');
                return;
            }
            if(that.common.isBlank(that.obj.payApplicationTime[1])){
                that.$message.error('请选择查询申请结束时间！');
                return;
            }
            let url = "api/fcIncomeBO.ajax?cmd=doQueryPaymentInfo";
            this.$refs.table.load(url,that.obj);
        },
        // 列表双击
        dblclickItem(order){
            let that = this;
            let item = {
                urlName: "订单详情",
                urlId: "48" + order.orderId,
                urlPath: "/order/billing/order.vue",
                urlPathName: "/order",
                query:{order : {orderId: order.orderId, viewType: 1, view:1}},
            }
            that.$emit('openTab', item);
        },
        showPay:function(){
            let that = this;
            let selectData = that.$refs.table.getSelectItem();
            if(selectData.length == 0){
                that.$message.error('请选择需要登记的数据！');
                return;
            }
            if(selectData.length != 1){
                that.$message.error('只能选择一条数据！');
                return;
            }
            if(selectData[0].auditStatus != 2 || selectData[0].payStatus != 1){
                that.$message.error('付款状态必须是待付款！');
                return;
            }
            that.desItem="";
            that.payType="";
            that.payTypeName="";
            that.flowId = selectData[0].flowId;
            that.dialogFormVisible=true;
        },
        pay:function(){
            let that = this;
            if(that.common.isBlank(that.payTime)){
                that.$message.error('请选择付款时间！');
                return;
            }
            if(that.common.isBlank(that.payType)){
                that.$message.error('请选择付款方式！');
                return;
            }
            if(that.common.isBlank(that.payNotes)){
                that.$message.error('请填写付款备注！');
                return;
            }
            that.$confirm("", "确认登记付款？", {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/fcIncomeBO.ajax?cmd=payRegister";
                that.common.postUrl(url,{"payTime":that.payTime,"payType":that.payType,"payNotes":that.payNotes,"payTypeName":that.payType,"flowId":that.flowId},function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "登记成功！"
                        });
                        that.dialogFormVisible=false;
                        that.doQueryPaymentInfo();
                    }
                });
            });
        },
        initHtml:function(){
            var bnow = new Date();
            bnow.setDate(bnow.getDate() -30);
            this.obj.payApplicationTime.push(this.common.formatTime(bnow,"yyyy-MM-dd HH:mm")+":00");
            this.obj.payApplicationTime.push(this.common.formatTime(new Date(),"yyyy-MM-dd HH:mm:ss"));
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
            that.common.postUrl("api/fcBaseBO.ajax?cmd=queryCheckDes",{"desItemType":"2"},function (data) {
                that.payTypeList = data.items;
            })
            let tenantId=that.common.getCookie("tenantId");
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantDefCityName", {"pTenantId":tenantId},function(data){
                that.supplierTenantList = data.items;
                that.supplierTenantList.unshift({supplierFullName:"请选择",tenantId:-1});
            });
        },
    },
}