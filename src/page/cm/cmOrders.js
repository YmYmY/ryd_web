import tableCommon from "@/components/table/tableCommon.vue"
export default {
  name: 'cmOrders',
  props:['sureCallback','dialogTableShow','openTab'],
  data() {
    return {
      head:[ 
          {"name":"所属区域","code":"regionName","type" : "text","width":"120"},
          {"name":"产品类型","code":"productTypeName","type" : "text","width":"120"},
          {"name":"运单号","code":"trackingNum","type" : "text","width":"120"},
          {"name":"客户单号","code":"ordNum","type" : "text","width":"150"},
          {"name":"客户类型","code":"customerTypeName","type" : "text","width":"120"},
          {"name":"下单客户","code":"customerTenantName","type" : "text","width":"200"},
          {"name":"客户联系人","code":"customerTenantPrincipal","type" : "text","width":"120"},
          {"name":"客户联系手机","code":"customerTenantPhone","type" : "text","width":"120"},
          {"name":"运单状态","code":"orderOutStateName","type" : "text","width":"120"},
          {"name":"运单类型","code":"orderTypeName","type" : "text","width":"120"},
          {"name":"运单来源","code":"sourceTypeName","type" : "text","width":"120"},
          {"name":"下单时间","code":"createDate","type" : "text","width":"150"},
          {"name":"实际托运时间","code":"billingDate","type" : "text","width":"150"},
          {"name":"三方结算","code":"payConsignorFlagName","type" : "text","width":"120"},
          {"name":"三方结算状态","code":"payConsignorStateName","type" : "text","width":"120"},
          {"name":"结算店铺","code":"payConsignorName","type" : "text","width":"120"},
          {"name":"发货店仓","code":"consignorName","type" : "text","width":"120"},
          {"name":"发货人","code":"consignorLinkmanName","type" : "text","width":"120"},
          {"name":"发货手机","code":"consignorBill","type" : "text","width":"120"},
          {"name":"发货电话","code":"consignorTelephone","type" : "text","width":"120"},
          {"name":"发货省市区","code":"sourceCityAddr","type" : "text","width":"120"},
          {"name":"发货详细地址","code":"sourceAddress","type" : "text","width":"200"},
          {"name":"收货店仓","code":"consigneeName","type" : "text","width":"120"},
          {"name":"收货人","code":"consigneeLinkmanName","type" : "text","width":"120"},
          {"name":"收货手机","code":"consigneeBill","type" : "text","width":"120"},
          {"name":"收货电话","code":"consigneeTelephone","type" : "text","width":"120"},
          {"name":"收货省市区","code":"destCityAddr","type" : "text","width":"120"},
          {"name":"收货详细地址","code":"destAddress","type" : "text","width":"200"},
          {"name":"前端交货方式","code":"beginDeliveryTypeName","type" : "text"},
          {"name":"末端交货方式","code":"endDeliveryTypeName","type" : "text"},
          {"name":"结算方式","code":"paymentTypeName","type" : "text"},
          {"name":"支付方式","code":"payWayName","type" : "text"},
          {"name":"收入合计","code":"orderIncomeDouble","type" : "text","isSum":"true"},
          {"name":"货品名","code":"goodsName","type" : "text","width":"120"},
          {"name":"打包件数","code":"packageNumber","type" : "text","isSum":"true"},
          {"name":"打包体积（方）","code":"packageVolume","type" : "text","isSum":"true","width":"150"},
          {"name":"打包重量（公斤）","code":"packageWeight","type" : "text","isSum":"true","width":"150"},
          {"name":"调出数量","code":"callOutCount","type" : "text","isSum":"true"},
          {"name":"入库数量","code":"callInCount","type" : "text","isSum":"true"},
          {"name":"跟踪信息","code":"trackingContent","type" : "text"},
          {"name":"供应商类型","code":"supplierTenantTypeName","type" : "text"},
          {"name":"批次号","code":"batchNumAlias","type" : "text","width":"120"},
          {"name":"供应商名称","code":"supplierTenantName","type" : "text","width":"150"},
          {"name":"中转单号","code":"outgoingTrackingNum","type" : "text","width":"150"},
          {"name":"中转费用","code":"outgoingFeeDouble","type" : "text","isSum":"true"},
          {"name":"配送员姓名","code":"deliveryUserName","type" : "text"},
          {"name":"配送员电话","code":"deliveryUserPhone","type" : "text"},
          {"name":"签收时间","code":"signDate","type" : "text","width":"150"},
          {"name":"接单时间","code":"acceptDate","type" : "text","width":"150"},
          {"name":"客服专员","code":"customBusinessName","type" : "text"},
          {"name":"销售专员","code":"salesmanBusinessName","type" : "text"},
          {"name":"客户备注","code":"customerRemarks","width":"200","type" : "text"},
          {"name":"内部备注","code":"remarks","width":"200","type" : "text"},
          {"name":"取消人","code":"cancelOpName","width":"150","type" : "text"},
          {"name":"取消时间","code":"cancelTime","width":"150","type" : "text"},
          {"name":"取消备注","code":"cancelRemark","width":"200","type" : "text"}
      ],
      paymentTypeList :[],
      orderTypeList :[],
      orderProductTypeList :[],
      orderOutStateList :[],
      selectOrderTimeList :[],
      selectOrderList :[], 
      orderSourceTypeList :[], 
      orderCallStsList :[],
      orderPayStsList:[],
      oragnizeList :[],// 客服部门
      regionList :[],// 区域列表
      supplierTenantList:[],// 供应商
      customerTenantList:[],// 下单客户
      orderSignExceptionList:[],//签收类型
      query:{
        queryTimeType:"1",
        queryOrderType:"1",
        callSts:"-1",
        queryTimes :[],
      },
      dialogShow:false,
    }
  },
  mounted() {
    this.initSysStaticData();
    this.initOtherData();
    this.initHtml();
    // this.doQuery();  
  },
  methods: {
    //分页查询
    doQuery() {
      let that = this;
      let params = that.query;
      if(that.common.isBlank(params.queryTimes)){
        that.$message({"type":"success", message: "请选择查询时间范围"});   
        return;
      }
      if(that.common.isBlank(params.queryTimes[0])){
         that.$message({"type":"success", message: "请选择查询开始时间"});   
         return;
      }else{
        params.beginTime = params.queryTimes[0];
      }
      if(that.common.isBlank(params.queryTimes[1])){
        that.$message({"type":"success", message: "请选择查询结束时间"});   
        return;
      }else{
        params.endTime = params.queryTimes[1];
      }
      let url = "api/ordOrderInfoBO.ajax?cmd=doQuery";
      this.$refs.ordersManager.load(url, params, function (data) {
        //  console.log(data);
      })
    },
   
    // 初始化静态数据
    initSysStaticData(){
      let that = this;
      let url = "api/sysStaticDataBO.ajax?cmd=getSysStaticDataSimpleByCodeTypes";
      let codeTypes = [];
      codeTypes.push("ORDER_PRODUCT_TYPE");
      codeTypes.push("ORDER_TYPE");
      codeTypes.push("ORDER_PAYMENT_TYPE");
      codeTypes.push("ORDER_PAY_STS");
      codeTypes.push("ORDER_OUT_STATE");
      codeTypes.push("SELECT_ORDER_TIME");
      codeTypes.push("SELECT_ORDERS");
      codeTypes.push("ORDER_SOURCE_TYPE");
      codeTypes.push("ORDER_CALL_STS");
      codeTypes.push("ORDER_SIGN_EXCEPTION_TYPE");
      
      that.common.postUrl(url,{"codeTypes":codeTypes.join(",")},function(data){
        that.paymentTypeList = data.ORDER_PAYMENT_TYPE;
        that.paymentTypeList.unshift({codeName:"所有",codeValue:"-1"});

        that.orderTypeList = data.ORDER_TYPE;
        that.orderTypeList.unshift({codeName:"所有",codeValue:"-1"});

        that.orderProductTypeList = data.ORDER_PRODUCT_TYPE;
        that.orderProductTypeList.unshift({codeName:"所有",codeValue:"-1"});

        that.orderOutStateList = data.ORDER_OUT_STATE;
        that.orderOutStateList.unshift({codeName:"所有",codeValue:"-1"});

        that.orderSourceTypeList = data.ORDER_SOURCE_TYPE;
        that.orderSourceTypeList.unshift({codeName:"所有",codeValue:"-1"});

        that.orderCallStsList = data.ORDER_CALL_STS;
        that.orderCallStsList.unshift({codeName:"所有",codeValue:"-1"});

        that.orderPayStsList = data.ORDER_PAY_STS;
        that.orderPayStsList.unshift({codeName:"所有",codeValue:"-1"});
        that.orderSignExceptionList = data.ORDER_SIGN_EXCEPTION_TYPE;
        that.selectOrderList = data.SELECT_ORDERS;
        that.selectOrderTimeList = data.SELECT_ORDER_TIME;



        that.initHtml();
      });
    },

    // 初始化其它数据
    initOtherData(){
      let params = {};
      params.oragnizeType = 4;
      let that = this;
      // 客服部门
      that.common.postUrl("api/sysStaticDataBO.ajax?cmd=getSysOragnizeList",params,function(data){
        if(that.common.isNotBlank(data) && that.common.isNotBlank(data.items)){
            that.oragnizeList = data.items; 
            that.oragnizeList.unshift({oragnizeName:"所有",oragnizeId:"-1"});
        }
      });
      // 区域部门
      that.common.postUrl("api/sysRegionBO.ajax?cmd=getSysRegionTenantList",params,function(data){
        if(that.common.isNotBlank(data) && that.common.isNotBlank(data.items)){
          that.regionList = data.items;
          that.regionList.unshift({regionName:"所有",regionId:"-1"});
        }
      
      });
      // 供应商
      params = {};
      params.pTenantId = this.common.getCookie("tenantId");
      that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantDefCityName", params,function(data){
        if(that.common.isNotBlank(data) && that.common.isNotBlank(data.items)){
          that.supplierTenantList = data.items;
          that.supplierTenantList.unshift({tenantFullName:"所有",tenantId:"-1"});
        }
      });

      // 下单客户
      params = {};
      params.pTenantId = this.common.getCookie("tenantId");
      that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantDefPName", params,function(data){
        if(that.common.isNotBlank(data) && that.common.isNotBlank(data.items)){
          that.customerTenantList = data.items;
          that.customerTenantList.unshift({tenantFullName:"所有",tenantId:"-1"});
        }
      });
     
    },
    initHtml(){
      this.query.queryTimeType = "1";
      this.query.queryOrderType = "1";
      this.query.callSts = "";
      this.query.queryTimes=[];
      var bnow = new Date();
      bnow.setDate(bnow.getDate() -30);  
      this.query.queryTimes.push(this.common.formatTime(bnow,"yyyy-MM-dd HH:mm")+":00");
      this.query.queryTimes.push(this.common.formatTime(new Date(),"yyyy-MM-dd HH:mm:ss"));
    },
    //获取选中订单
    getSelectOrder(){
      return this.$refs.ordersManager.getSelectItem();
    },
    //弹窗确认
    dialogSure(){
      this.$emit("sureCallback",this.getSelectOrder());//往上递归触发方法
      this.hideDialog();
    },
    hideDialog(){
      this.dialogShow = false;
      this.$emit("cancelCallback");//触发父页面关闭方法   
    }
  },
  components: {
    tableCommon,
  },
  watch:{
    dialogTableShow:{
      handler(n){
        this.dialogShow = n;
        if(n){
          this.$nextTick(() => {
            this.doQuery();
          })
        }
      }
    }
  }
}