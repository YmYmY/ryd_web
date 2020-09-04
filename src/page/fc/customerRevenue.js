import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"
import makeUp from "@/page/fc/makeUp.vue"
export default {
    name: 'customerRevenue',
    data() {
        return {
            //table组件数据
            head :[
                {"name":"所属区域","code":"regionName","width":"150","type" : "text"},
                {"name":"下单时间","code":"createDate","width":"150","type" : "text"},
                {"name":"推送状态","code":"payFlagName","width":"150","type" : "text"},
                {"name":"运单号","code":"trackingNum","width":"150","type" : "text"},
                {"name":"下单客户","code":"customerTenantName","type" : "text","width":"200"},
                {"name":"客户联系人","code":"customerTenantPrincipal","type" : "text","width":"120"},
                {"name":"客户联系手机","code":"customerTenantPhone","type" : "text","width":"120"},
                {"name":"运单状态","code":"orderOutStateName","width":"100","type" : "text"},
                {"name":"收入合计","code":"orderIncomeDouble","width":"120","type" : "text","isSum":true},
                {"name":"退款金额","code":"refundFeeDouble","width":"120","type" : "text","isSum":true},
                {"name":"运费","code":"freightDouble","width":"120","type" : "text","isSum":true},
                {"name":"申明价值","code":"goodsPriceDouble","width":"120","type" : "text","isSum":true},
                {"name":"保险费","code":"insureFeeDouble","width":"120","type" : "text","isSum":true},
                {"name":"代收货款","code":"collectingMoneyDouble","width":"120","type" : "text","isSum":true},
                {"name":"代收货款手续费","code":"procedureFeeDouble","width":"120","type" : "text","isSum":true},
                {"name":"送货费","code":"deliveryCostsDouble","width":"120","type" : "text","isSum":true},
                {"name":"提货费","code":"pickingCostsDouble","width":"120","type" : "text","isSum":true},
                {"name":"包装费","code":"packingCostsDouble","width":"120","type" : "text","isSum":true},
                {"name":"其他费","code":"otherFeeDouble","width":"120","type" : "text","isSum":true},
                {"name":"上楼费","code":"upstairFeeDouble","width":"120","type" : "text","isSum":true},
                {"name":"面单费","code":"facelistFeeDouble","width":"120","type" : "text","isSum":true},
                {"name":"装卸费","code":"handingCostsDouble","width":"120","type" : "text","isSum":true},
                {"name":"到付上浮费","code":"floatingPriceDouble","width":"120","type" : "text","isSum":true},
                {"name":"付款状态","code":"payStsName","width":"100","type" : "text"},
                {"name":"付款方式","code":"payWayName","width":"150","type" : "text"},
                {"name":"付款时间","code":"payDate","width":"120","type" : "text"},
                {"name":"结算方式","code":"paymentTypeName","width":"120","type" : "text"},
                {"name":"取消人","code":"cancelOpName","width":"120","type" : "text"},
                {"name":"取消原因","code":"cancelRemark","width":"120","type" : "text"},
                {"name":"客户类型","code":"customerTypeName","width":"120","type" : "text"},
                {"name":"货品名","code":"goodsName","width":"120","type" : "text"},
                {"name":"打包件数","code":"packageNumber","width":"120","type" : "text","isSum":true},
                {"name":"打包体积（方）","code":"packageVolume","width":"120","type" : "text","isSum":true},
                {"name":"打包重量（公斤）","code":"packageWeight","width":"120","type" : "text","isSum":true},
                {"name":"发货店仓","code":"consignorName","width":"120","type" : "text"},
                {"name":"发货人","code":"consignorLinkmanName","width":"120","type" : "text"},
                {"name":"发货省市区","code":"sourceCityAddr","width":"120","type" : "text"},
                {"name":"发货详细地址","code":"sourceAddress","width":"120","type" : "text"},
                {"name":"前端交货方式","code":"beginDeliveryTypeName","width":"120","type" : "text"},
                {"name":"期待上门时间","code":"prePickupDate","width":"200","type" : "text"},
                {"name":"收货客户","code":"consigneeName","width":"120","type" : "text"},
                {"name":"收货人","code":"consigneeLinkmanName","width":"120","type" : "text"},
                {"name":"收货人手机","code":"consigneeBill","width":"120","type" : "text"},
                {"name":"收货省市区","code":"destCityAddr","width":"120","type" : "text"},
                {"name":"收货详细地址","code":"destAddress","width":"120","type" : "text"},
                {"name":"产品类型","code":"productTypeName","width":"120","type" : "text"},
                {"name":"运单类型","code":"orderTypeName","width":"120","type" : "text"},
                {"name":"运单来源","code":"sourceTypeName","width":"120","type" : "text"},
                {"name":"供应商名称","code":"supplierTenantName","width":"120","type" : "text"},
                {"name":"中转单号","code":"outgoingTrackingNum","width":"120","type" : "text"},
            ],
            obj:{
                queryMatchTimeType :"1",
                queryTimes:[],
                regionId:"-1",
                paySts:"-1",
                trackingNum:"",
                payDate:[],
                orderOutState:"-1",
                paymentType:"-1",
                customerTenantId:"-1",
                payFlag:"-1",
                queryType:"B",
            },
            refundAmount:"",
            refundDesc:"",
            customerTenantList:[],
            regionList:[],
            orderPayStsList:[],
            paymentTypeList:[],
            orderOutStateList:[],
            payFlagList:[],
            orderPaySts:[],
            makeUpShow:false,
            dialogFormVisible:false,
        }
    },
    //进入页面
    beforeRouteEnter(to,from,next){
        next(that => {
            //调用刷新方法
            that.doQueryFcIncomeExpenses();
            that.doQuerySysStaticData();
        });
    },
    components: {
        tableCommon,
        makeUp
    },
    mounted(){        
        this.initHtml();
    },
    methods: {
        // 跳转到 导入界面
        importOrder(){
            let item = {
                urlName: "B端在线收益费用导入",
                urlId: new Date().getTime(),
                urlPath: "/common/importTemplate/importTemplate.vue",
                urlPathName: "/importOrderTemplate",
                query:{
                    importList : [
                        {bizName:"B端在线收益费用导入",excelFile:"/static/excel/customerRevenue.xlsx",bizCode:"IMP_ORDER_10020",remarks:"B端在线收益费用导入"}
                    ]
                },
            }
            this.$emit('openTab', item);
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
        refund:function(){
            let that = this;
            if(that.common.isBlank(that.refundAmount)){
                that.$message.error('请填写退款退款金额！');
                return;
            }
            if(that.refundAmount > that.orderIncomeDouble){
                that.$message.error('退款金额不能大于付款金额！');
                return;
            }
            if(that.common.isBlank(that.refundDesc)){
                that.$message.error('请填写退款原因！');
                return;
            }
            that.$confirm("", "确认申请退款？", {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/fcIncomeBO.ajax?cmd=refund";
                that.common.postUrl(url,{"refundAmount":that.refundAmount,"orderId":that.orderId,"refundDesc":that.refundDesc},function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "申请退款成功！"
                        });
                        that.dialogFormVisible=false;
                        that.doQueryFcIncomeExpenses();
                    }
                });
            });
        },
        closeCallback(){
            let that = this;
            that.makeUpShow=false;
        },
        showRefund:function(){
            let that = this;
            let selectData = that.$refs.table.getSelectItem();
            if(selectData.length == 0){
                that.$message.error('请选择需要退款的数据！');
                return;
            }
            if(selectData.length != 1){
                that.$message.error('只能选择一条数据！');
                return;
            }
            if(selectData[0].paySts != 2 && selectData[0].paySts != 5 && selectData[0].paySts != 6){
                that.$message.error('付款状态不是已付款部分退款或退款失败不能申请退款！');
                return;
            }
            that.dialogFormVisible = true;
            that.orderIncomeDouble = (selectData[0].orderIncomeDouble - selectData[0].refundFeeDouble).toFixed(2);
            that.refundAmount = (selectData[0].orderIncomeDouble - selectData[0].refundFeeDouble).toFixed(2);
            that.orderId = selectData[0].orderId;
        },
        cancelOrder:function(){
            let that = this;
            let selectData = that.$refs.table.getSelectItem();
            if(selectData.length == 0){
                that.$message.error('请选择需要取消的数据！');
                return;
            }
            if(selectData.length != 1){
                that.$message.error('只能选择一条数据！');
                return;
            }
            if(selectData[0].orderOutState == 88){
                that.$message.error('订单已取消！');
                return;
            }
            that.orderId = selectData[0].orderId;
            that.$confirm("", "确认取消订单？", {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/fcIncomeBO.ajax?cmd=cancelOrder";
                that.common.postUrl(url,{"orderId":that.orderId},function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "取消成功！"
                        });
                        that.doQueryFcIncomeExpenses();
                    }
                });
            });
        },
        pushFee:function(){
            let that = this;
            let selectData = that.$refs.table.getSelectItem();
            if(selectData.length == 0){
                that.$message.error('请选择需要补录的数据！');
                return;
            }
            for(let el of selectData){
                if(el.paySts!=1){
                    that.$message.error('付款状态是待付款状态才能推送费用！');
                    return;
                }
                if(el.payFlag!=1){
                    that.$message.error('推送状态是待推送状态才能推送费用！');
                    return;
                }
                if(el.orderIncomeDouble == 0 || that.common.isBlank(el.orderIncomeDouble)){
                    that.$message.error('费用为零不能推送！');
                    return;
                }
                if(el.orderOutState==88){
                    that.$message.error('订单已取消！');
                    return;
                }
            }
            that.orderIds="";
            selectData.forEach((el,index)=>{
                if(index == selectData.length-1){
                    that.orderIds+=el.orderId ;
                }else {
                    that.orderIds+=el.orderId + ",";
                }
            })
            that.$confirm(that.rms, '确认所勾选的运单费用信息准确，用户可支付？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/fcIncomeBO.ajax?cmd=pushFee";
                that.common.postUrl(url,{"orderIds":that.orderIds},function (data) {
                    if(data != 'success'){
                        that.$message.error('推送失败！');
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "推送成功"
                        });
                        that.doQueryFcIncomeExpenses();
                    }
                });
            });
        },
        showMakeUp:function(){
            let that = this;
            let selectData = that.$refs.table.getSelectItem();
            if(selectData.length == 0){
                that.$message.error('请选择需要补录的数据！');
                return;
            }
            if(selectData.length != 1){
                that.$message.error('只能选择一条数据！');
                return;
            }
            if(selectData[0].paySts != 1){
                that.$message.error('付款状态是待付款状态才能补录信息！');
                return;
            }
            if(selectData[0].orderOutState == 88){
                that.$message.error('订单已取消！');
                return;
            }
            that.orderId = selectData[0].orderId;
            that.makeUpShow=true;
        },
        initHtml:function(){
            var bnow = new Date();
            bnow.setDate(bnow.getDate() -30);
            this.obj.queryTimes.push(this.common.formatTime(bnow,"yyyy-MM-dd ")+"00:00:00");
            this.obj.queryTimes.push(this.common.formatTime(new Date(),"yyyy-MM-dd ")+"23:59:59");
        },
        downloadExcelFile:function(){
            this.$refs.table.downloadExcelFile();
        },
        //清空查询条件
        clear:function () {
            let that = this;
            that.obj ={
                createDate:"",
                regionId:"-1",
                paySts:"-1",
                trackingNum:"",
                payDate:[],
                orderOutState:"-1",
                paymentType:"-1",
                customerTenantId:"-1",
                queryMatchTimeType :"1",
                payFlag:"-1",
                queryType:"B",
                queryTimes:[],
            }
            this.initHtml();
        },
        doQueryFcIncomeExpenses:function () {
            let that = this;
            if(that.common.isBlank(that.obj.queryTimes)){
                that.$message.error('请选择查询下单时间范围！');
                return;
            }
            if(that.common.isBlank(that.obj.queryTimes[0])){
                that.$message.error('请选择查询下单开始时间！');
                return;
            }else{
                that.obj.beginTime = that.obj.queryTimes[0];
            }
            if(that.common.isBlank(that.obj.queryTimes[1])){
                that.$message.error('请选择查询下单结束时间！');
                return;
            }else{
                that.obj.endTime = that.obj.queryTimes[1];
            }
            if(!that.common.isBlank(that.obj.payDate[0])){
                that.obj.payDateBegin = that.obj.payDate[0];
            }
            if(!that.common.isBlank(that.obj.payDate[1])){
                that.obj.payDateEnd = that.obj.payDate[1];
            }
            let url = "api/fcIncomeBO.ajax?cmd=doQueryFcIncomeExpenses";
            this.$refs.table.load(url,that.obj);
        },
        //静态数据查询
        doQuerySysStaticData:function () {
            let that = this;
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantDefPName", {"pTenantId":that.common.getCookie("tenantId")},function(data){
                if(that.common.isNotBlank(data) && that.common.isNotBlank(data.items)){
                    that.customerTenantList = data.items;
                    that.customerTenantList.unshift({tenantFullName:"所有",tenantId:"-1"});
                }
            });
            that.common.postUrl("api/sysRegionBO.ajax?cmd=getSysRegionSubordinate",{},function(data){
                that.regionList = data.items;
                that.regionList.unshift({regionName:"所有",regionId:"-1"});
            });
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"ORDER_PAYMENT_TYPE","hasAll":true},function (data) {
                that.paymentTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"ORDER_PAY_STS","hasAll":true},function (data) {
                that.orderPayStsList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"ORDER_OUT_STATE","hasAll":true},function (data) {
                that.orderOutStateList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"PAY_FLAG","hasAll":true},function (data) {
                that.payFlagList = data.items;
            })
        },
    },
}