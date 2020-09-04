import {head,tabs} from './json.js'
import lodopUtil from "@/utils/lodop/lodop-business.js"
import commonPrint from '@/page/order/kd/commonPrint.js'
import tableCommon from "@/components/table/tableCommon.vue"
import innerTab from "@/components/innerTab/innerTab.vue"
import printSet from "@/components/printSet/printSet.vue"
import cmAbnormal from '@/page/cm/cmAbnormalClient.vue'
import trackScheduleDialog from "@/components/trackScheduleDialog/trackScheduleDialog.vue"


export default {
  name: 'orders',
  props:['openTab'],
  beforeRouteEnter(to,from,next){        
    next(that => {
        //调用刷新方法
        that.doQuery();

        // 初始化话异常
        that.$refs.ordersException.doQueryCmAbnormal();
        that.$refs.ordersException.doQuerySysStaticData();
    });
  },
  data() {
    return {
      head:head,
      headTem:head, // 缓存head
      ordersTable: "ordersTable", //名称
      ordersTableTem: "ordersTable", //缓存名称
      tabs, 
      currentTab:{}, 
      paymentTypeList :[],
      orderTypeList :[],
      orderProductTypeList :[],
      orderOutStateList :[],
      selectOrderTimeList :[],
      selectOrderList :[], 
      orderSourceTypeList :[], 
      orderCallStsList :[],
      supplierTenantList:[],// 供应商
      cancelConfirmStsList:[],
      query:{
        queryTimeClientType:"1",
        queryOrderClientType:"1",
        callSts:"-1",
        queryTimes :[],
      },
      showPrinterView : false, //是否展开打印机设置
      currentPrinter : {}, // 当前打印机参数 尚品面单
      currentPrinter4: {},// 当前打印机参数 电子面单
      showCancelRemark : false, //取消运单
      cancelRemark : "",
      outgoing :{},//供应商修改、新增 
      showSaveAddOrModifyTransferView :false, //供应商展示修改
      cancelTransferTitle:"分配供应商",
      showSavePackageExceptionsView : false, // 展示揽件异常
      exception :{},//揽件异常信息集合
      showSignOrderView : false, // 签收状态
      signOrder : {},//签收集合
      imgList:[{name:"img1"}], //签收图片集合
      purchaseNumList:[
        {codeName:"所有",codeValue:"-1"},
        {codeName:"重复",codeValue:"1"},
        {codeName:"不重复",codeValue:"2"}
      ], 
      showCancelConfirmRemark:false,
      cancelConfirmRemark:"",
      refreshTable:true,  //表格切换重载
    }
  },
  mounted() {
    this.initSysStaticData();
    this.initOtherData();
    this.initHtml();
    // this.doQuery();  
    this.initDevices();
    this.currentTab = this.tabs[0];
  },
  methods: {
    // 打印电子面单
   doPrintBtach(){
      let that = this;
      if(that.common.isBlank(that.currentPrinter4) || that.common.isBlank(that.currentPrinter4.printerName)){
        that.$message({"type":"success", message: "请先选择打印打印机"});   
        that.printerViewHtml(); //设置打印机
        return;
      }
      let orders = that.$refs.ordersManager.getSelectItem();
      if(that.common.isBlank(orders) || orders.length == 0){
         that.$message({"type":"success", message: "请先选择打印信息"});   
         return;
      }
      let ordersTem = [];
      let ordersMap = {};
      for(let i in orders ){
          let o = orders[i];
          if(that.common.isBlank(o.outgoingTrackingNum)){
            that.$message({"type":"success", message: "请选择存在中转单号的信息"});   
            return;
          }
          ordersMap[o.outgoingTrackingNum] = o;
      }

      for(let k in ordersMap){
         ordersMap[k].orderNo =ordersMap[k].trackingNum ;
         ordersTem.push(ordersMap[k]);
      }
      commonPrint.doPrintBtach(that.currentPrinter4,ordersTem);
    }, 
    //分页查询
    doQuery() {
      let that = this;
        if(that.common.isNotBlank(this.currentTab) && that.common.isNotBlank(this.currentTab.orderStates) ){
            that.query.orderOutStates = this.currentTab.orderStates; //  运单状态
       }
      that.query.queryOrderOutStateTab = this.currentTab.queryOrderOutStateTab; //  切换tab状态
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
      this.doQuerySum();
      
      let url = "api/ordOrderInfoBO.ajax?cmd=doQueryClient";
      this.$refs.ordersManager.load(url, params, function (data) {
        //  console.log(data);
      })
    },
    doQuerySum(){
      let params = this.query;
      let that = this;
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
      let url = "api/ordOrderInfoBO.ajax?cmd=doQuerySumClient";
      that.common.postUrl(url,params,function(data){
        if(that.common.isNotBlank(data)){
          that.tabs.forEach(el => {
             el.num = data[el.code];
          });
          that.$forceUpdate();
        }
      });
    },


    // 初始化静态数据
    initSysStaticData(){
      let that = this;
      let url = "api/sysStaticDataBO.ajax?cmd=getSysStaticDataSimpleByCodeTypes";
      let codeTypes = [];
      codeTypes.push("ORDER_PRODUCT_TYPE");
      codeTypes.push("ORDER_TYPE");
      codeTypes.push("ORDER_CLIENT_PAYMENT_TYPE");
       codeTypes.push("ORDER_OUT_CLIENT_STATE");
      codeTypes.push("SELECT_ORDER_CLIENT_TIME");
      codeTypes.push("SELECT_CLIENT_ORDERS");
      codeTypes.push("ORDER_SOURCE_TYPE");
      codeTypes.push("ORDER_CALL_STS");
      codeTypes.push("CANCEL_CONFIRM_STS");
      that.common.postUrl(url,{"codeTypes":codeTypes.join(",")},function(data){
        that.cancelConfirmStsList = data.CANCEL_CONFIRM_STS;
        that.cancelConfirmStsList.unshift({codeName:"所有",codeValue:"-1"});

        that.paymentTypeList = data.ORDER_CLIENT_PAYMENT_TYPE;
        that.paymentTypeList.unshift({codeName:"所有",codeValue:"-1"});

        that.orderTypeList = data.ORDER_TYPE;
        that.orderTypeList.unshift({codeName:"所有",codeValue:"-1"});

        that.orderProductTypeList = data.ORDER_PRODUCT_TYPE;
        that.orderProductTypeList.unshift({codeName:"所有",codeValue:"-1"});

        that.orderOutStateList = data.ORDER_OUT_CLIENT_STATE;
        that.orderOutStateList.unshift({codeName:"所有",codeValue:"-1"});

        that.orderSourceTypeList = data.ORDER_SOURCE_TYPE;
        that.orderSourceTypeList.unshift({codeName:"所有",codeValue:"-1"});

        that.orderCallStsList = data.ORDER_CALL_STS;
        that.orderCallStsList.unshift({codeName:"所有",codeValue:"-1"});

        that.selectOrderList = data.SELECT_CLIENT_ORDERS;
        that.selectOrderTimeList = data.SELECT_ORDER_CLIENT_TIME;
        that.initHtml();
      });
    },

    // 初始化其它数据
    initOtherData(){
      let params = {};
      let that = this;
      // 供应商 （父级供应商）
      params = {};
      that.supplierTenantList = [];
      that.supplierTenantList.unshift({tenantFullName:"所有",tenantId:"-1"});
      params.pTenantId = this.common.getCookie("pTenantId");
      that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantDefCityName", params,function(data){
        if(that.common.isNotBlank(data) && that.common.isNotBlank(data.items)){
          for(let i in data.items){
              that.supplierTenantList.push(data.items[i])
          }
          
        }
      });
      // 供应商 （自己供应商）
      let paramsTem = {};
      paramsTem.pTenantId = this.common.getCookie("tenantId");
      that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantDefCityName", paramsTem,function(data){
        if(that.common.isNotBlank(data) && that.common.isNotBlank(data.items)){
          for(let i in data.items){
            that.supplierTenantList.push(data.items[i])
          }
        }
      });
     
    },
    initHtml(){
      this.query.queryTimeClientType = "1";
      this.query.queryOrderClientType = "1";
      this.query.callSts = "";
      this.query.queryTimes = [];
      var bnow = new Date();
      bnow.setDate(bnow.getDate() -30);  
      this.query.queryTimes.push(this.common.formatTime(bnow,"yyyy-MM-dd")+" 00:00:00");
      this.query.queryTimes.push(this.common.formatTime(new Date(),"yyyy-MM-dd")+" 23:59:59");
    },
    // 初始化打印机
    initDevices(){
      let that  = this;
      that.common.initDevices("1,4",function(arrs){
        if(that.common.isNotBlank(arrs) && arrs.length > 0){
            // that.currentPrinter = arrs[0];
            // console.log(that.currentPrinter);
            for(let i in arrs){
              if(arrs[i].businessTypes == 1){
                 that.currentPrinter = arrs[i];
                 console.log("执行面单打印机：");
                 console.log(that.currentPrinter);
              }
              if(arrs[i].businessTypes == 4){
                that.currentPrinter4 = arrs[i];
                console.log("执行电子面单打印机：");
                console.log(that.currentPrinter4);
              }
           }
        }
      });
    },
    // 修改 运单
    modifyOrder(){
       let arrs = this.$refs.ordersManager.getSelectItem();
       let that = this;
       if(that.common.isBlank(arrs) || arrs.length == 0){
          that.$message({"type":"success", message: "请先选择一条修改运单信息"});   
          return;
       }
       if(arrs.length > 1 ){
         that.$message({"type":"success", message: "只能选择一条修改"});   
         return;
       }
       let o = arrs[0];
       if(o.orderOutState == 88){
         that.$message({"type":"success", message: "已取消，不可再修改"});   
         return;
       }
        let item = {
        urlName: "修改运单",
        urlId: "modify_order_"+o.orderId,
        urlPath: "/order/billingClient/billing.vue",
        urlPathName: "/modifyOrder",
        query:{order : {orderId: o.orderId, viewType: 1}},
      }
      this.$emit('openTab', item);
    },
      // 打印 运单-单个
     printOrder(){
        let arrs = this.$refs.ordersManager.getSelectItem();
        let that = this;
        if(that.common.isBlank(arrs) || arrs.length == 0){
           that.$message({"type":"success", message: "请先选择一条运单信息"});   
           return;
        }
        if(arrs.length > 1 ){
          that.$message({"type":"success", message: "只能选择一条"});   
          return;
        }
        let o = arrs[0];
         let item = {
         urlName: "打印运单",
         urlId: "print_order_"+o.orderId,
         urlPath: "/order/billingClient/billing.vue",
         urlPathName: "/printOrder",
         query:{order : {orderId: o.orderId, viewType: 1,printHtmlFlag:true}},
       }
       this.$emit('openTab', item);
     },
    // 新增 运单
    addOrder(){
        let item = {
          urlName: "运单录入",
          urlId: "add_order_"+2,
          urlPath: "/order/billingClient/billing.vue",
          urlPathName: "/billingOrder",
          query:{},
      }
      this.$emit('openTab', item);
    },
    // 打印运单
    async printOrders(){
      let that = this;
      let arrs = this.$refs.ordersManager.getSelectItem();
      if(that.common.isBlank(arrs) || arrs.length == 0){
         that.$message({"type":"success", message: "请先选择打印运单信息"});   
         return;
      }
      if(that.common.isBlank(this.currentPrinter) || that.common.isBlank(this.currentPrinter.printerName)){
        that.$message({"type":"success", message: "请先选择打印运单打印机"});   
        that.printerViewHtml(); //设置打印机
        return;
      }
      let url = "api/ordOrderInfoBO.ajax?cmd=queryOrderInfoPrintDetail";
      for(let i in arrs){
          let o = arrs[i];
          let orderMap = {};
          orderMap.orderId = o.orderId;
          orderMap.businessTypes = that.currentPrinter.businessTypes;
          let orderDetail =  await that.common.postUrl(url, orderMap);
          if(that.common.isBlank(orderDetail)){
              that.$message({"type":"success", message: "运单号："+o.trackingNum+",未找到到数据，打印失败"});   
          }
          // 批量打印
          lodopUtil.commonPrint(orderDetail,1,false,that.currentPrinter.printerName);         
      }
    },
    // 取消运单
    showCancelOrder(){
      let that = this;
      let arrs = that.$refs.ordersManager.getSelectItem();
      if(that.common.isBlank(arrs) || arrs.length == 0){
          that.$message({"type":"success", message: "请先选择一条取消运单信息"});   
          return;
      }
      if(arrs.length > 1 ){
        that.$message({"type":"success", message: "只能选择一条取消"});   
        return;
      }
      if(arrs[0].orderOutState == 88){
        that.$message({"type":"success", message: "已取消，不可再操作"});   
        return;
      }
      this.showCancelRemark = true;

    },
    // 取消运单
    cancelOrder(){
      let that = this;
      let arrs = that.$refs.ordersManager.getSelectItem();
      if(that.common.isBlank(arrs) || arrs.length == 0){
         that.$message({"type":"success", message: "请先选择一条取消运单信息"});   
         return;
      }
      if(arrs.length > 1 ){
        that.$message({"type":"success", message: "只能选择一条取消"});   
        return;
      }
      if(arrs[0].orderOutState == 88){
        that.$message({"type":"success", message: "已取消，不可再操作"});   
        return;
      }
      let params = {};
      params.orderId = arrs[0].orderId;
      params.cancelRemark = this.cancelRemark;
      that.common.postUrl("api/ordOrderInfoBO.ajax?cmd=cancelOrderClient", params,function(data){
        that.$message({"type":"success", message: "取消运单成功"});   
        that.showCancelRemark = false;
        that.$refs.ordersManager.load();
      });
    },
 // 确认-取消运单
 showCancelConfirmOrder(){
  let that = this;
  let arrs = that.$refs.ordersManager.getSelectItem();
  if(that.common.isBlank(arrs) || arrs.length == 0){
      that.$message({"type":"success", message: "请先选择待确认取消运单信息"});   
      return;
  }
  let flag = false;
  for(let i in arrs){
    let o = arrs[i];
    if(o.orderOutState != 88){
      that.$message({"type":"success", message: "请选择取消运单信息"});   
      flag = true;
      return;
    }
    if(o.cancelConfirmSts == 2){
      that.$message({"type":"success", message: "请选择待确认取消运单信息"});   
      flag = true;
      return;
    }
  }
  if(flag){
    return;
  }
  this.showCancelConfirmRemark = true;

},
// 确认-取消运单
cancelConfirmOrders(){
  let that = this;
  let arrs = that.$refs.ordersManager.getSelectItem();
  if(that.common.isBlank(arrs) || arrs.length == 0){
     that.$message({"type":"success", message: "请先选择取消运单信息"});   
     return;
  }
  let params = {};
  let orderIds = [];
  for(let i in arrs){
    let o = arrs[i];
    orderIds.push(o.orderId);
  }
  params.orderIds = orderIds.join(",");
  params.cancelConfirmRemark = this.cancelConfirmRemark;
  that.common.postUrl("api/ordOrderInfoBO.ajax?cmd=cancelConfirmOrdersClient", params,function(data){
    that.$message({"type":"success", message: "确认取消成功"});   
    that.showCancelConfirmRemark = false;
    that.$refs.ordersManager.load();
  });
},
    // 恢复运单信息
    recoveryOrder(){
        let that = this;
        let arrs = that.$refs.ordersManager.getSelectItem();
        if(that.common.isBlank(arrs) || arrs.length == 0){
          that.$message({"type":"success", message: "请先选择一条取消运单信息"});   
          return;
        }
        if(arrs.length > 1 ){
          that.$message({"type":"success", message: "只能选择一条运单恢复"});   
          return;
        }
        let trackingNum = arrs[0].trackingNum;
        that.$confirm('确认恢复运单：'+trackingNum+"？", '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           let params = {};
           params.orderId = arrs[0].orderId;
           that.common.postUrl("api/ordOrderInfoBO.ajax?cmd=recoveryOrderClient", params,function(data){
              that.$message({"type":"success", message: "运单:"+ trackingNum+"恢复成功"});   
              that.$refs.ordersManager.load();
          });
        }).catch(() => {
               
        });
    },
   
    // 异常登记
    addException(){
        let that = this;
        let arrs = that.$refs.ordersManager.getSelectItem();
        if(that.common.isBlank(arrs) || arrs.length == 0){
          that.$message({"type":"success", message: "请先选择一条运单信息"});   
          return;
        }
        if(arrs.length > 1 ){
          that.$message({"type":"success", message: "只能选择一条运单"});   
          return;
        }
        // 跳转到登记页面
    },
    // 查看跟踪日志
    dialogScheduleShowView(){
      let that = this;
      let orders = that.$refs.ordersManager.getSelectItem();
     
      if(that.common.isBlank(orders) || orders.length == 0){
         that.$message({"type":"success", message: "请选择数据"});   
         return false;
      }
      if (orders.length > 1  ) {
        that.$message({"type":"success", message: "只能选择一条数据"});   
        return false;
      }
      let data = orders[0];
      that.dblclickItem(data);
    //   let outgoingTrackingNum = data.outgoingTrackingNum;
    //   that.orderShowData = {};
    //   that.orderShowData.supplierTenantName = data.supplierTenantName;
    //   that.orderShowData.outgoingTrackingNum = data.outgoingTrackingNum;
    //   that.orderShowData.orderId = data.orderId;
    //   if(that.common.isBlank(outgoingTrackingNum)){
    //      that.$message({"type":"success", message: "请选择存在中转单号数据"});   
    //      return false;
    //  }
    //  that.$refs.trackScheduleDialog.showDialog(that.orderShowData);
  },
    // 批量导出
    exportOrders(){
      let that = this;
      if(that.common.isBlank(that.query.queryTimes)){
        that.$message({"type":"success", message: "请选择导出时间范围"});   
        return;
      }
      if(that.common.isBlank(that.query.queryTimes[0])){
         that.$message({"type":"success", message: "请选择导出开始时间"});   
         return;
      }else{
        that.query.beginTime = that.query.queryTimes[0];
      }
      if(that.common.isBlank(that.query.queryTimes[1])){
        that.$message({"type":"success", message: "请选择导出结束时间"});   
        return;
      }else{
        that.query.endTime = that.query.queryTimes[1];
      }
      this.$refs.ordersManager.downloadExcelFile();

    },
    // 列表双击
    dblclickItem(data){
        let that = this;
        // let item = {
        //     urlName: "订单详情",
        //     urlId: "48" + order.orderId,
        //     urlPath: "/order/billingClient/order.vue",
        //     urlPathName: "/order",
        //     query:{order : {orderId: order.orderId, viewType: 1, view:1}},
        // }
        // that.$emit('openTab', item);
        let outgoingTrackingNum = data.outgoingTrackingNum;
        that.orderShowData = {};
        that.orderShowData.supplierTenantName = data.supplierTenantName;
        that.orderShowData.outgoingTrackingNum = data.outgoingTrackingNum;
        that.orderShowData.orderId = data.orderId;
        if(that.common.isBlank(outgoingTrackingNum)){
           that.$message({"type":"success", message: "请选择存在中转单号数据"});   
           return false;
       }
       that.$refs.trackScheduleDialog.showDialog(that.orderShowData);
    },
    // 查看详情
    orderView(){
      let that = this;
      let orders = that.$refs.ordersManager.getSelectItem();
     
      if(that.common.isBlank(orders) || orders.length == 0){
         that.$message({"type":"success", message: "请选择数据"});   
         return false;
      }
      if (orders.length > 1  ) {
        that.$message({"type":"success", message: "只能选择一条数据"});   
        return false;
      }
      let order = orders[0];
      let item = {
        urlName: "订单详情",
        urlId: "48" + order.orderId,
        urlPath: "/order/billing/order.vue",
        urlPathName: "/order",
        query:{order : {orderId: order.orderId, viewType: 1, view:1}},
      }
      that.$emit('openTab', item);
    },

    // 清除
    clear(){
      this.query = {
        queryTimes : []
      };
      this.initHtml();
    },
    // 默认值 select BUG  @change="forceUpdate()"
    forceUpdate(){
       this.$forceUpdate();
    },
    changeSel(data){
      console.log(data);
    },
    selectCallback(tab){
      this.currentTab = tab;
      console.log("切换到::::::"+tab.name);
      this.$refs.ordersManager.clean();
      this.refreshTable = false;
      if(this.common.isNotBlank(tab.head) ){
         this.head = tab.head;
         console.log(this.head);
         this.ordersTable = tab.ordersTable;
      }else{
        this.head = this.headTem;
        this.ordersTable = this.ordersTableTem;
      }
      this.$nextTick(()=>{  //表头变动后重载表格(解决多tab切换code重复问题)
        this.refreshTable = true;
        this.$nextTick(()=>{  //重载后渲染成功再查询数据
          if(tab.itemType == "function"){
            this[tab.item](tab);
          }else{
            this.$emit('openTab', tab.item);
          }
        })
      })
    },
    // 所有订单
    toOrdersNumTem(){
      // this.$message({"type":"success", message: "来到全部页面"});  
      this.clear();
      this.doQuery();
    },
    // 待揽收
    waitReceiveOrderNum(){
      this.clear();
      this.doQuery();
    },
    // 待取件
    toWaitDealOrderNum(){
      this.clear();
      this.doQuery();
    },
  // 运输中
   toTransferOrderNum(){
    this.clear();
    this.doQuery();
   },
   // 已签收
   toSignOrderNum(){
    this.clear();
    this.doQuery();
   },
  // 未入库
  toNotCallInNum(){
      this.clear();
      this.query.callSts = "1";
      this.doQuery();
  },

   // 已取消
   toCancalOrderNum(){
    this.clear();
    this.doQuery();

   },
   // 参数处理 -> 异常TAB 用到
   openTab(item){
    this.$emit('openTab', item);
    },
    //打印-设置确定回调
    sureCallback(data){
      console.log(data);
      if(this.common.isNotBlank(data)){
     
        for(let i in data){
           if(data[i].businessTypes == 1){
              this.currentPrinter = data[i];
              console.log("当前执行面单打印机：");
              console.log(this.currentPrinter);
           }
           if(data[i].businessTypes == 4){
             this.currentPrinter4 = data[i];
             console.log("当前执行电子面单打印机：");
             console.log(this.currentPrinter4);
           }
        }
      }
    },
    // 打印-回调外面状态 （隐藏）
    showChange(data){
      this.showPrinterView = data;
    },
    // 打印-设置打印机 （展示页面）
    printerViewHtml(){
      this.showPrinterView = true;
    },
  },
  components: {
    tableCommon,
    innerTab,
    printSet,
    cmAbnormal,
    trackScheduleDialog
  }
}