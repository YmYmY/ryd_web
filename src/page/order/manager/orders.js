import {head,tabs} from './json.js'
import lodopUtil from "@/utils/lodop/lodop-business.js"
import makeUp from "@/page/fc/makeUp.vue"
import tableCommon from "@/components/table/tableCommon.vue"
import innerTab from "@/components/innerTab/innerTab.vue"
import printSet from "@/components/printSet/printSet.vue"
import myFileModel from "@/components/myFileModel/myFileModel.vue"
import cmAbnormal from '@/page/cm/cmAbnormal.vue'
import trackScheduleDialog from "@/components/trackScheduleDialog/trackScheduleDialog.vue"
export default {
  name: 'orders',
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
      selectOrderConsignorList :[], 
      selectOrderConsigneeList :[], 
      orderSourceTypeList :[], 
      orderCallStsList :[],
      orderPayStsList:[],
      oragnizeList :[],// 客服部门
      regionList :[],// 区域列表
      supplierTenantList:[],// 供应商
      supplierTenantAddList:[],//分配
      customerTenantList:[],// 下单客户
      orderSignExceptionList:[],//签收类型
      query:{
        queryTimeType:"1",
        queryOrderType:"1",
        callSts:"-1",
        queryTimes :[],
      },
        makeUpShow:false,
        queryType:"C",
      showPrinterView : false, //是否展开打印机设置
      currentPrinter : {}, // 当前打印机参数
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
    //分页查询
    doQuery() {
      let that = this;
      if(that.common.isNotBlank(this.currentTab) && (this.currentTab.orderState > 0 || this.currentTab.orderState.split(",")[0] > 0) ){
         that.query.orderOutStates = this.currentTab.orderState; //  运单状态
      }
      that.query.queryOrderOutStateTab = this.currentTab.orderState; //  切换tab状态
      that.query.auditSts = 2;// 只查询已审核运单（平台）
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
      let url = "api/ordOrderInfoBO.ajax?cmd=doQuery";
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
      let url = "api/ordOrderInfoBO.ajax?cmd=doQuerySum";
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
      codeTypes.push("ORDER_PAYMENT_TYPE");
      codeTypes.push("ORDER_PAY_STS");
      codeTypes.push("ORDER_OUT_STATE");
      codeTypes.push("SELECT_ORDER_TIME");
      codeTypes.push("SELECT_ORDERS");
      codeTypes.push("SELECT_CONSGINOR_ORDERS");
      codeTypes.push("SELECT_CONSGINEE_ORDERS");
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

        that.selectOrderConsignorList = data.SELECT_CONSGINOR_ORDERS;
        that.selectOrderConsigneeList = data.SELECT_CONSGINEE_ORDERS;

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
    

      // that.common.postUrl("api/sysRegionBO.ajax?cmd=getSysRegionTenantList",params,function(data){
      //   if(that.common.isNotBlank(data) && that.common.isNotBlank(data.items)){
      //     that.regionList = data.items;
      //     that.regionList.unshift({regionName:"所有",regionId:"-1"});
      //   }
      
      // });
      // 区域部门
      that.common.postUrl("api/sysRegionBO.ajax?cmd=getSysRegionSubordinate",params,function(data){
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

   // 供应商-分配供应商
    params = {};
    params.tenantStatus = 1;
    params.pTenantId = this.common.getCookie("tenantId");
    that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantDefCityName", params,function(data){
      if(that.common.isNotBlank(data) && that.common.isNotBlank(data.items)){
        that.supplierTenantAddList = data.items;
        that.supplierTenantAddList.unshift({tenantFullName:"所有",tenantId:"-1"});
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
      this.query.queryOrderConsignorType = "1";
      this.query.queryOrderConsigneeType = "1";
      this.query.callSts = "";
      this.query.queryTimes=[];
      var bnow = new Date();
      bnow.setDate(bnow.getDate() -30);  
      this.query.queryTimes.push(this.common.formatTime(bnow,"yyyy-MM-dd")+" 00:00:00");
      this.query.queryTimes.push(this.common.formatTime(new Date(),"yyyy-MM-dd")+" 23:59:59");
    },
    // 初始化打印机
    initDevices(){
      let that  = this;
      that.common.initDevices("1",function(arrs){
        if(that.common.isNotBlank(arrs) && arrs.length > 0){
            that.currentPrinter = arrs[0];
            console.log(that.currentPrinter);
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
        urlPath: "/order/billing/billing.vue",
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
         urlPath: "/order/billing/billing.vue",
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
          urlPath: "/order/billing/billing.vue",
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
      // if(arrs.length > 1 ){
      //   that.$message({"type":"success", message: "只能选择一条取消"});   
      //   return;
      // }
      let flag = false;
      for(let i in arrs){
        if(arrs[i].orderOutState == 88){
          that.$message({"type":"success", message: "存在已取消，不可再操作，请先剔除单信息"});   
          flag = true;
        }
      }
      if(flag){
           return;
      }
      that.$confirm('确认取消【'+arrs.length+"】单运单信息？", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.showCancelRemark = true;
      }).catch(() => {
             
      });
    },
    // 取消运单
    cancelOrder(){
      let that = this;
      let arrs = that.$refs.ordersManager.getSelectItem();
      if(that.common.isBlank(arrs) || arrs.length == 0){
         that.$message({"type":"success", message: "请先选择一条取消运单信息"});   
         return;
      }
      // if(arrs.length > 1 ){
      //   that.$message({"type":"success", message: "只能选择一条取消"});   
      //   return;
      // }
      // if(arrs[0].orderOutState == 88){
      //   that.$message({"type":"success", message: "已取消，不可再操作"});   
      //   return;
      // }
      let params = {};
      let orderIds = [];
      for(let i in arrs){
         orderIds.push(arrs[i].orderId);
      }
      params.orderIds = orderIds.join(",");
      params.cancelRemark = this.cancelRemark;
      that.common.postUrl("api/ordOrderInfoBO.ajax?cmd=cancelOrders", params,function(data){
        that.$message({"type":"success", message: "取消运单成功"});   
        that.showCancelRemark = false;
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
        let params = {};
        let orderIds = [];
        for(let i in arrs){
           orderIds.push(arrs[i].orderId);
        }
        params.orderIds = orderIds.join(",");
        that.$confirm("确认恢复"+orderIds.length+"运单信息？", '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           that.common.postUrl("api/ordOrderInfoBO.ajax?cmd=recoveryOrders", params,function(data){
              that.$message({"type":"success", message: "恢复运单成功"});   
              that.$refs.ordersManager.load();
          });
        }).catch(() => {
               
        });
    },
    // 操作接单
    acceptOrder(){
      let that = this;
      let arrs = that.$refs.ordersManager.getSelectItem();
      if(that.common.isBlank(arrs) || arrs.length == 0){
          that.$message({"type":"success", message: "请先选择运单信息"});   
          return;
      }
      let orderIds = [];
      for(let i in arrs){
          let d = arrs[i];
          if(d.orderOutState != 3){
            that.$message({"type":"success", message: "运单:"+d.trackingNum+"，非待接单状态，不可操作"});   
            return;
          }
          orderIds.push(d.orderId);
      }
      let tsize = orderIds.length;
      let params =  {};
      params.orderIds = orderIds.join(",");
      that.$confirm('确认操作'+tsize+"单运单信息?", '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
      }).then(() => {
             that.common.postUrl("api/ordOrderInfoBO.ajax?cmd=acceptOrders", params,function(data){
             that.$message({"type":"success", message: "操作"+orderIds.length+"单成功"});   
             that.$refs.ordersManager.load();
          });
      }).catch(() => {
             
      });
    },
    // 展示揽件 异常 页面
    savePackageExceptionsView(){
      let that = this;
      let arrs = that.$refs.ordersManager.getSelectItem();
      if(that.common.isBlank(arrs) || arrs.length == 0){
          that.$message({"type":"success", message: "请先选择运单信息"});   
          return;
      }
      this.showSavePackageExceptionsView = true;
      this.exception = {};
    },
     // 登记揽件异常状态
     savePackageExceptions(){
      let that = this;
      let arrs = that.$refs.ordersManager.getSelectItem();
      if(that.common.isBlank(arrs) || arrs.length == 0){
          that.$message({"type":"success", message: "请先选择运单信息"});   
          return;
      }
      let orderIds = [];
      for(let i in arrs){
          let d = arrs[i];
          orderIds.push(d.orderId);
      }
      
      let params =  this.exception;
      params.orderIds = orderIds.join(",");
      if(that.common.isBlank(params.exceptionType)){
        that.$message({"type":"success", message: "请选择类型"});   
        return;
      }
      if(that.common.isBlank(params.exceptionRemark)){
        that.$message({"type":"success", message: "请输入备注"});   
        return;
      }
      let tsize = orderIds.length;
      that.$confirm('确认操作'+tsize+"单运单信息?", '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
      }).then(() => {
          that.common.postUrl("api/ordOrderInfoBO.ajax?cmd=savePackageExceptions", params,function(data){
             that.exception = {};
             that.showSavePackageExceptionsView = false;
             that.$message({"type":"success", message: "登记揽件，"+orderIds.length+"单成功"});   
             that.$refs.ordersManager.load();
          });
      }).catch(() => {
             
      });
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
    // 展示 分配供应商 （分配 供应商）
    saveAddOrModifyTransferView(type){
      let that = this;
      let arrs = that.$refs.ordersManager.getSelectItem();
      if(that.common.isBlank(arrs) || arrs.length == 0){
          that.$message({"type":"success", message: "请先选择运单信息"});   
          return;
      }
      this.cancelTransferTitle = "分配供应商";
      if(type == 2){
         this.cancelTransferTitle = "修改分配供应商";
      }
      let checkMap = {};
      for(let i in arrs){
        let d = arrs[i];
        if(type == 1 && this.common.isNotBlank(d.supplierTenantName)){
           that.$message({"type":"success", message: "运单："+d.trackingNum+"，已分配。无法做分配操作"});   
           return;
        }
        if(type == 2 && this.common.isBlank(d.supplierTenantName)){
          that.$message({"type":"success", message: "运单："+d.trackingNum+"，未分配。无法做修改操作"});   
          return;
        }
        checkMap[d.supplierTenantId] = d.supplierTenantId;
      }
     
      if(that.common.getMapLength(checkMap) > 1 && type == 2){
         that.$message({"type":"success", message: "操作修改供应商，请选择相同承运商运单信息"});   
         return;
      }
      this.outgoing = {};
      this.outgoing.type = type;
      this.showSaveAddOrModifyTransferView = true;
    },
    // 分配供应商执行方法
    saveAddOrModifyTransfer(){
      let that = this;
      let arrs = that.$refs.ordersManager.getSelectItem();
      if(that.common.isBlank(arrs) || arrs.length == 0){
          that.$message({"type":"success", message: "请先选择运单信息"});   
          return;
      }
      let outgoing = this.outgoing;
      if(that.common.isBlank(outgoing.supplierTenantId)){
        that.$message({"type":"success", message: "请选择供应商信息"});   
        return;
      }
      let orderIds = [];
      for(let i in arrs){
          let d = arrs[i];
          orderIds.push(d.orderId);
      }
      outgoing.orderIds = orderIds.join(",");
      outgoing.outSourceType = 1;  // 来源
      that.common.postUrl("api/ordTransitOutgoingBO.ajax?cmd=saveOrderTransit", outgoing,function(data){
         if(that.outgoing.type == 1){
           that.$message({"type":"success", message: "分配供应商成功，生成批次号："+data.batchNumAlias+"，共"+data.orderSize+"单。"});   
         }else{
           that.$message({"type":"success", message: "修改供应商成功"});   
         }
         that.outgoing = {};
         that.showSaveAddOrModifyTransferView = false;
         that.$refs.ordersManager.load();
      },null,null,true);


    },
    // 取消供应商
    cancelTransfer(){
      let that = this;
      let arrs = that.$refs.ordersManager.getSelectItem();
      if(that.common.isBlank(arrs) || arrs.length == 0){
          that.$message({"type":"success", message: "请先选择取消供应商单信息"});   
          return;
      }
      let orderIds = [];
      let omap = {};
      let arrsTem = [];
      let transitFlag = -1;
      for(let i in arrs){
          let d = arrs[i];
          orderIds.push(d.orderId);
          if(this.common.isBlank(omap[d.batchNum] )){
            arrsTem.push(d.batchNum);
          }
          omap[d.batchNum] = d.batchNum;
          transitFlag = arrs[i].transitFlag;
      }
      if(arrsTem.length > 1){
         that.$message({"type":"success", message: "按单取消需要选择相同批次号单信息"});   
         return;
      }
      let params = {};
      params.batchNum = arrs[0].batchNum;
      params.batchNumAlias = arrs[0].batchNumAlias;
      params.orderIdsStr = orderIds.join(",");
      params.transitFlag = transitFlag;
      let tsize = orderIds.length;
      that.$confirm('确认取消'+tsize+"单中转信息?", '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
      }).then(() => {
          that.common.postUrl("api/ordTransitOutgoingBO.ajax?cmd=cancelOrderTransit", params,function(data){
             that.$message({"type":"success", message: "取消批次【"+arrs[0].batchNumAlias+"】【"+orderIds.length+"】单成功"});   
             that.$refs.ordersManager.load();
          },null,null,true);
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
    //  运单跟踪
    trackingOrderView(){
      let item = {
        urlName: "中转跟踪",
        urlId: "tracking_info"+2,
        urlPath: "/order/transfer/outgoingTracking.vue",
        urlPathName: "/outgoingTrackingView",
        query:{},
     }
     this.$emit('openTab', item);
      // 跳转到跟踪页面
   },
    // 弹出签收页面
    signOrderView(){
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
      this.signOrder = {};
      // 跳转到跟踪页面
      this.signOrder.signExceptionType = "1";
      this.signOrder.signDate = this.common.formatTime(new Date(),"yyyy-MM-dd HH:mm")+":00";
      this.showSignOrderView = true;
    },
    // 批量签收提示
    batchSignOrderView(){
      let that = this;
      let arrs = that.$refs.ordersManager.getSelectItem();
      if(that.common.isBlank(arrs) || arrs.length == 0){
        that.$message({"type":"success", message: "请先选择一条运单信息"});   
        return;
      }
      this.signOrder = {};
      that.$confirm('确认对所选'+arrs.length+"单进行批量签收？", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
     }).then(() => {
         that.batchSignOrder(2);
     }).catch(() => {
            
     });

    },
    // 批量签收
   batchSignOrder(type){
      let that = this;
      let arrs = that.$refs.ordersManager.getSelectItem();
      if(that.common.isBlank(arrs) || arrs.length == 0){
        that.$message({"type":"success", message: "请先选择一条运单信息"});   
        return;
      }
      this.signOrder.signType = 1; // 待客签收
      let orderIds = [];
      for(let i in arrs){
         orderIds.push(arrs[i].orderId);
      }
      let signFlowIds = [];
      if(type == 2){
        this.signOrder.signExceptionType = "1";
        this.signOrder.signDate = this.common.formatTime(new Date(),"yyyy-MM-dd HH:mm")+":00";
        this.signOrder.remarks = "批量签收成功";
      }else{
        // 签收图片
        let imgList = this.imgList;
        if(that.common.isNotBlank(imgList)){
           for(let i in imgList){
              let f = this.$refs[imgList[i].name];
              if(that.common.isNotBlank(f) && that.common.isNotBlank(f[0])){
                 let flowId = f[0].getId();
                 if(that.common.isNotBlank(flowId)){
                    signFlowIds.push(flowId);
                 }
              }
           }
        }
      }
      this.signOrder.orderIds = orderIds.join(",");
      this.signOrder.signFlowIds = signFlowIds.join(",");
      that.common.postUrl("api/ordOrderInfoBO.ajax?cmd=signOrder", this.signOrder,function(data){
         that.$message({"type":"success", message: "签收成功"}); 
         that.showSignOrderView = false; 
         that.cleanSignPicture();
         that.$refs.ordersManager.load();
     },null,null,true);
   },
   cleanSignPicture(){
      let that = this;
      let imgList = this.imgList;
      if(that.common.isNotBlank(imgList)){
        for(let i in imgList){
            let f = this.$refs[imgList[i].name];
            if(that.common.isNotBlank(f) && that.common.isNotBlank(f[0])){
              f[0].clean();
              that.forceUpdate();
            }
        }
      }
      that.imgList = [{name:"img1"}]; //签收图片集合
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
        //     urlPath: "/order/billing/order.vue",
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
         this.head = this.common.copyObj(tab.head);
         console.log(this.head);
         this.ordersTable = tab.ordersTable;
      }else{
        this.head = this.common.copyObj(this.headTem);
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
    // 待分配
    toWaitDealOrderNum(){
      // this.$message({"type":"success", message: "来到待匹配页面"});  
      this.clear();
      this.doQuery();
    },
    // 待接单
    toWaitReceiveOrderNum(){
      this.clear();
      this.doQuery();
    },
    // 待接单
    toWaitReceiveOrderNum(){
      this.clear();
      this.doQuery();
    },
   // 待揽收
   toWaitPackageOrderNum(){
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
  //待支付
  toNotPayNum(){
    this.clear();
    this.query.paySts = "1";
    this.doQuery();
  },
   // 已取消
   toCancalOrderNum(){
    this.clear();
    this.doQuery();
   },
   // 异常
   toExceptionView(item){
       // 直接跳转 ->> （页面打开）

   },
    //打印-设置确定回调
    sureCallback(data){
      if(this.common.isNotBlank(data)){
        this.currentPrinter = data[0];
        console.log("当前执行打印机：");
        console.log(this.currentPrinter);
      }
      
    },
    // 参数处理 -> 异常TAB 用到
    openTab(item){
      debugger
      this.$emit('openTab', item);
    },
    // 打印-回调外面状态 （隐藏）
    showChange(data){
      this.showPrinterView = data;
    },
    // 打印-设置打印机 （展示页面）
    printerViewHtml(){
      this.showPrinterView = true;
    },
    // 多个图片 回调
    successCallback(){
      let name = "img"+(this.imgList.length+1);
      this.imgList.unshift({name});
      // console.log(this.imgList);
    },
      closeCallback(){
          let that = this;
          that.makeUpShow=false;
      },
    //信息补录
    showMakeUp:function(){
      let that = this;
      let selectData = that.$refs.ordersManager.getSelectItem();
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
      that.queryType="C";
      that.orderId = selectData[0].orderId;
      that.makeUpShow=true;
  },
  },
  components: {
    tableCommon,
    innerTab,
    printSet,
    myFileModel,
    makeUp,
    cmAbnormal,
    trackScheduleDialog
  }
}