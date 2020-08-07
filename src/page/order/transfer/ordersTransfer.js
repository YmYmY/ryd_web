import {headAddWait,tabsOrderTranfer} from './json.js'
import lodopUtil from "@/utils/lodop/lodop-business.js"
import tableCommon from "@/components/table/tableCommon.vue"
import innerTab from "@/components/innerTab/innerTab.vue"
import printSet from "@/components/printSet/printSet.vue"
import mycity from '@/components/mycity/mycity.vue'

export default {
  name: 'orders',
  beforeRouteEnter(to,from,next){        
    next(that => {
        //调用刷新方法
        that.doQuery();
        that.doQuerySum(that.tabs[1]);
    });
  },
  data() {
    return {
      head:headAddWait,
      headTem:headAddWait, // 缓存head
      ordersTransferTable: "ordersTransferTable_1", //名称
      ordersTransferTableTem: "ordersTransferTable_1", //缓存名称
      tabs:tabsOrderTranfer, 
      currentTab:{}, 
      selectOrderTimeList :[],// 开单时间
      regionList :[],// 区域列表
      regionAllList:[],// 所有区域列表
      selectOrderList:[], //查询列表
      customerTenantList:[],
      query:{
        queryTimes:[],
        queryTimeType:"1",
        queryOrderType:"1",
        queryTransitTimes:[]
      },
      supplierTenantList:[],
      selectSupplierTypeList :[],  //供应商类型
      selectTransitOrderTimeList :[],//中转 时间
      selectTransitPaymentTypeList :[], // 中转结算类型
      transitFlag: "", // 中转 
      selectTransferOrderList:[],
      showPrinterView : false, //是否展开打印机设置
      currentPrinter : {}, // 当前打印机参数
      showCancelRemark : false, //取消运单
      cancelRemark : "",
      supplierList : [
        {codeValue:"supplierTenantIdByCarrier",codeName:"承运关系"},
        {codeValue:"supplierTenantIdByCustomer",codeName:"客户优先"},
        {codeValue:"supplierTenantIdByTime",codeName:"时效优先"},
        {codeValue:"supplierTenantIdByCost",codeName:"成本优先"},
      ],
      purchaseNumList:[
        {codeName:"所有",codeValue:"-1"},
        {codeName:"重复",codeValue:"1"},
        {codeName:"不重复",codeValue:"2"}
     ], 
      
    }
  },
  mounted() {
    this.initSysStaticData();
    this.initOtherData();
    this.initDevices();
    this.currentTab = this.tabs[0];
    this.initHtml();
  },
  methods: {
    //分页查询
    doQuery(currentTab) {
      let that = this;
      let currentTabFlag = that.common.isNotBlank(currentTab) ? true : false; // 是否初始化  填写时间
      if(that.common.isBlank(currentTab)){
         currentTab = that.currentTab;
      }
      let params = that.query;
      if(currentTab.selectType == 1){
          if(that.common.isBlank(params.queryTimes)){
            that.$message({"type":"success", message: "请选择查询时间范围"});   
            return;
          }
          if(that.common.isBlank(params.queryTimes[0])){
            that.$message({"type":"success", message: "请选择查询开始时间"});   
            return;
          }
          if(that.common.isBlank(params.queryTimes[1])){
            that.$message({"type":"success", message: "请选择查询结束时间"});   
            return;
          }
          if(params.queryTimes.length > 0 && that.common.isNotBlank(params.queryTimes[0])){
            params.beginTime = params.queryTimes[0];
         }
         if(params.queryTimes.length > 0 && that.common.isNotBlank(params.queryTimes[1])){
            params.endTime = params.queryTimes[1];
         }
         params[that.query.selectSupplierTenant] = that.query.selectSupplierTenantValue;
         params.beginTransitTime ="";
         params.endTransitTime ="";
      }else{
          if(currentTabFlag){
              let bnow = new Date();
              bnow.setDate(bnow.getDate() -30);  
              params.beginTransitTime = that.common.formatTime(bnow,"yyyy-MM-dd HH:mm:ss");
              params.endTransitTime = that.common.formatTime(new Date(),"yyyy-MM-dd HH:mm:ss");     
              params.beginTime = "";
              params.endTime = "";         
          }else{
            if(that.common.isBlank(params.queryTransitTimes)){
              that.$message({"type":"success", message: "请选择查询时间范围"});   
              return;
            }
            if(that.common.isBlank(params.queryTransitTimes[0])){
              that.$message({"type":"success", message: "请选择查询开始时间"});   
              return;
            }
            if(that.common.isBlank(params.queryTransitTimes[1])){
              that.$message({"type":"success", message: "请选择查询结束时间"});   
              return;
            }
              
           if(params.queryTransitTimes.length > 0 && that.common.isNotBlank(params.queryTransitTimes[0])){
               params.beginTransitTime = params.queryTransitTimes[0];
           }
           if(params.queryTransitTimes.length > 0 && that.common.isNotBlank(params.queryTransitTimes[1])){
               params.endTransitTime = params.queryTransitTimes[1];
           }
          }
      }
      let url = currentTab.url;
      that.$refs.ordersTransferManager.load(url, params, function (data) {
          currentTab.num = data.totalNum+"";
      })
    },

    // 统计处理
    doQuerySum(currentTab) {
      let that = this;
      let currentTabFlag = that.common.isNotBlank(currentTab) ? true : false; // 是否初始化  填写时间
      if(that.common.isBlank(currentTab)){
         currentTab = that.currentTab;
      }
      let params = that.query;
      if(currentTab.selectType == 1){
          if(that.common.isBlank(params.queryTimes)){
            that.$message({"type":"success", message: "请选择查询时间范围"});   
            return;
          }
          if(that.common.isBlank(params.queryTimes[0])){
            that.$message({"type":"success", message: "请选择查询开始时间"});   
            return;
          }
          if(that.common.isBlank(params.queryTimes[1])){
            that.$message({"type":"success", message: "请选择查询结束时间"});   
            return;
          }
          if(params.queryTimes.length > 0 && that.common.isNotBlank(params.queryTimes[0])){
            params.beginTime = params.queryTimes[0];
         }
         if(params.queryTimes.length > 0 && that.common.isNotBlank(params.queryTimes[1])){
            params.endTime = params.queryTimes[1];
         }
         params[that.query.selectSupplierTenant] = that.query.selectSupplierTenantValue;
         params.beginTransitTime ="";
         params.endTransitTime ="";
      }else{
          if(currentTabFlag){
              let bnow = new Date();
              bnow.setDate(bnow.getDate() -30);  
              params.beginTransitTime = that.common.formatTime(bnow,"yyyy-MM-dd HH:mm:ss");
              params.endTransitTime = that.common.formatTime(new Date(),"yyyy-MM-dd HH:mm:ss");     
              params.beginTime = "";
              params.endTime = "";         
          }else{
            if(that.common.isBlank(params.queryTransitTimes)){
              that.$message({"type":"success", message: "请选择查询时间范围"});   
              return;
            }
            if(that.common.isBlank(params.queryTransitTimes[0])){
              that.$message({"type":"success", message: "请选择查询开始时间"});   
              return;
            }
            if(that.common.isBlank(params.queryTransitTimes[1])){
              that.$message({"type":"success", message: "请选择查询结束时间"});   
              return;
            }
              
           if(params.queryTransitTimes.length > 0 && that.common.isNotBlank(params.queryTransitTimes[0])){
               params.beginTransitTime = params.queryTransitTimes[0];
           }
           if(params.queryTransitTimes.length > 0 && that.common.isNotBlank(params.queryTransitTimes[1])){
               params.endTransitTime = params.queryTransitTimes[1];
           }
          }
      }
      let url = currentTab.url;
      that.common.postUrl(url,params,function(data){
        currentTab.num = data.totalNum+"";
      });
    },
    // 初始化静态数据
      initSysStaticData(){
        let that = this;
        let url = "api/sysStaticDataBO.ajax?cmd=getSysStaticDataSimpleByCodeTypes";
        let codeTypes = [];
        codeTypes.push("SELECT_ORDER_TIME");
        codeTypes.push("SUPPLIER_TYPE");
        codeTypes.push("SELECT_ORDER_TRANSIT_TIME");
        codeTypes.push("TRANSIT_PAYMENT_TYPE");
        codeTypes.push("SELECT_ORDERS");
        codeTypes.push("SELECT_TRANSIT_ADD_ORDERS");
        that.common.postUrl(url,{"codeTypes":codeTypes.join(",")},function(data){
          that.selectOrderTimeList = [];
          that.selectOrderTimeList.push(data.SELECT_ORDER_TIME[0]);
          that.selectOrderTimeList.push(data.SELECT_ORDER_TIME[1]);
          that.selectSupplierTypeList = data.SUPPLIER_TYPE;
          that.selectSupplierTypeList.unshift({codeName:"所有",codeValue:"-1"});
          that.selectTransitOrderTimeList = data.SELECT_ORDER_TRANSIT_TIME;
          that.selectTransitPaymentTypeList = data.TRANSIT_PAYMENT_TYPE;
          that.selectOrderList = data.SELECT_ORDERS;
          that.selectTransferOrderList = data.SELECT_TRANSIT_ADD_ORDERS;
          that.selectTransitPaymentTypeList.unshift({codeName:"所有",codeValue:"-1"});
          that.initHtml();
        });
      },
  
      // 初始化其它数据
      initOtherData(){
        let params = {};
        let that = this;
        // 区域部门
        that.common.postUrl("api/sysRegionBO.ajax?cmd=getSysRegionTenantList",params,function(data){
          if(that.common.isNotBlank(data) && that.common.isNotBlank(data.items)){
            that.regionList = data.items;
            that.regionList.unshift({regionName:"所有",regionId:"-1"});
          }
        });
        // 所有区域部门
        that.common.postUrl("api/sysRegionBO.ajax?cmd=getSysRegionAll",params,function(data){
          if(that.common.isNotBlank(data) && that.common.isNotBlank(data.items)){
            that.regionAllList = data.items;
            that.regionAllList.unshift({regionName:"所有",regionId:"-1"});
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
        // 供应商
      params = {};
      params.pTenantId = this.common.getCookie("tenantId");
      that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantDefCityName", params,function(data){
        if(that.common.isNotBlank(data) && that.common.isNotBlank(data.items)){
          that.supplierTenantList = data.items;
          that.supplierTenantList.unshift({tenantFullName:"所有",tenantId:"-1"});
        }
      });
    },

    initHtml(){
      this.query.queryTimeType = "1";
      this.query.queryTansitAddType = "1";
      this.query.queryTimes=[];
      this.query.queryTransitTimeType = "1";
      this.query.queryOrderType = "1";
      this.query.queryTransitTimes=[];
      this.query.selectSupplierTenant = "supplierTenantIdByCarrier";
      let bnow = new Date();
      bnow.setDate(bnow.getDate() -7);  
      if(this.currentTab.selectType == 1){
        this.query.queryTimes.push(this.common.formatTime(bnow,"yyyy-MM-dd HH:mm"));
        this.query.queryTimes.push(this.common.formatTime(new Date(),"yyyy-MM-dd HH:mm"));
      }else{
        bnow.setDate(bnow.getDate() -23);  
        this.query.queryTransitTimes.push(this.common.formatTime(bnow,"yyyy-MM-dd HH:mm:ss"));
        this.query.queryTransitTimes.push(this.common.formatTime(new Date(),"yyyy-MM-dd HH:mm:ss"));
      }
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
       let arrs = this.$refs.ordersTransferManager.getSelectItem();
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
    // 打印运单
    async printOrders(){
      let that = this;
      let arrs = this.$refs.ordersTransferManager.getSelectItem();
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
      let arrs = that.$refs.ordersTransferManager.getSelectItem();
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
      let arrs = that.$refs.ordersTransferManager.getSelectItem();
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
      that.common.postUrl("api/ordOrderInfoBO.ajax?cmd=cancelOrder", params,function(data){
        that.$message({"type":"success", message: "取消运单成功"});   
        that.showCancelRemark = false;
        that.$refs.ordersTransferManager.load();
      });
    },
    // 重新派单
    updateOrderThreeSystem(){
      let that = this;
      let arrs = that.$refs.ordersTransferManager.getSelectItem();
      if(that.common.isBlank(arrs) || arrs.length == 0){
         that.$message({"type":"success", message: "请先选择一条运单信息"});   
         return;
      }
      if(arrs.length > 1 ){
        that.$message({"type":"success", message: "只能选择一条信息"});   
        return;
      }
      let order = arrs[0];
      if(that.common.isBlank(order.systemBusiNum)){
         that.$message({"type":"success", message: "非系统对接供应商不可下单操作"});   
         return;
      }
      let params = {};
      params.busiNum = order.systemBusiNum;
      params.supplierTenantId = order.supplierTenantId; 
      
      // let combinedSts = order.combinedSts;
      that.$confirm('确认运单号【'+order.trackingNum+'】系统商家单号：【'+order.systemBusiNum+'】对接状态【'+order.systemStatusName+'】重新派单到三方系统？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
     }).then(() => {
         that.common.postUrl("api/ordTransitOutgoingBO.ajax?cmd=updateOrderThreeSystem", params,function(data){
            that.$message({"type":"success", message: "【"+order.systemStatusName+"】状态，重新派单操作成功，生成最新对接系统商家单号："+data.busiNum});   
            that.$refs.ordersTransferManager.load();
         },null,null,true);
     }).catch(() => {
            
     });
    },
      // 修改/查看配载 1 修改 2查看
      toTransitOrderView(type){
        let that = this;
        let arrs = that.$refs.ordersTransferManager.getSelectItem();
        if(that.common.isBlank(arrs) || arrs.length == 0){
            that.$message({"type":"success", message: "请先选择一条信息"});   
            return;
        }
        if(arrs.length > 1 ){
          that.$message({"type":"success", message: "只能选择一条信息"});   
          return;
        }
        let batchNum = arrs[0].batchNum;
        let order = {};
        order.batchNum = batchNum;
        order.type = 0; // 默认物流
        order.view = false;
        let urlName = "修改配载";
        if(type == 2){
            urlName = "配载详情";
            order.view = true;
        }
        if(arrs[0].supplierTenantType != 3){
           // 快递专线
           order.type = 1;
        }
        let item = {
          urlName: urlName,
          urlId: "modify_or_view_transit_"+order.batchNum,
          urlPath: "/order/transfer/transferAdd.vue",
          urlPathName: "/modifyOrViewTransitOrder",
          query:order,
        }
        this.$emit('openTab', item);
      },
      // 按单取消 批量
      cancelTransitOrders(){
        let that = this;
        let arrs = that.$refs.ordersTransferManager.getSelectItem();
        if(that.common.isBlank(arrs) || arrs.length == 0){
            that.$message({"type":"success", message: "请先选择取消中转信息"});   
            return;
        }
        let orderIds = [];
        let omap = {};
        let arrsTem = [];
        for(let i in arrs){
            let d = arrs[i];
            orderIds.push(d.orderId);
            if(this.common.isBlank(omap[d.batchNum] )){
              arrsTem.push(d.batchNum);
            }
            omap[d.batchNum] = d.batchNum;
        }
    
        if(arrsTem.length > 1){
          that.$message({"type":"success", message: "按单取消需要选择相同批次信息"});   
          return;
        }
        let params = {};
        params.batchNum = arrs[0].batchNum;
        params.batchNumAlias = arrs[0].batchNumAlias;
        params.orderIdsStr = orderIds.join(",");
        let tsize = orderIds.length;
        that.$confirm('确认取消'+tsize+"单中转信息?", '提示', {
           confirmButtonText: '确定',
           cancelButtonText: '取消',
           type: 'warning'
        }).then(() => {
            that.common.postUrl("api/ordTransitOutgoingBO.ajax?cmd=cancelTransit", params,function(data){
               that.$message({"type":"success", message: "取消批次【"+arrs[0].batchNumAlias+"】【"+orderIds.length+"】单成功"});   
               that.$refs.ordersTransferManager.load();
            },null,null,true);
        }).catch(() => {
               
        });
       
      },
      // 按批次取消
      cancelTransitBatchNum(){
        let that = this;
        let arrs = that.$refs.ordersTransferManager.getSelectItem();
        if(that.common.isBlank(arrs) || arrs.length == 0){
           that.$message({"type":"success", message: "请先选择一条取消批次信息"});   
           return;
        }
        if(arrs.length > 1 ){
          that.$message({"type":"success", message: "只能选择一条取消"});   
          return;
        }
        let params = {};
        params.batchNum = arrs[0].batchNum;
        params.batchNumAlias = arrs[0].batchNumAlias;
        that.$confirm('确认取消批次'+params.batchNumAlias+"中转信息?", '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
       }).then(() => {
         that.common.postUrl("api/ordTransitOutgoingBO.ajax?cmd=cancelBatchNumTransit", params,function(data){
            that.$message({"type":"success", message: "取消批次"+params.batchNumAlias+"成功"});   
            that.$refs.ordersTransferManager.load();
         },null,null,true);
       }).catch(() => {
              
       });
  
      
      },
      // 中转跟踪
      trackingOrderView(){
        let item = {
          urlName: "中转跟踪",
          urlId: "tracking_info"+2,
          urlPath: "/order/transfer/outgoingTracking.vue",
          urlPathName: "/outgoingTrackingView",
          query:{},
       }
      this.$emit('openTab', item);
    },
  
    // 跳转到 导入中转信息
    importTransitOrder(){
          let item = {
            urlName: "批量导入中转信息",
            urlId: new Date().getTime(),
            urlPath: "/common/importTemplate/importTemplate.vue",
            urlPathName: "/importTransitOrderTemplate",
            query:{
              importList : [
                {bizName:"快递快运模板导入",excelFile:"/static/excel/orderTransitInfo.xlsx",bizCode:"IMP_TRANSIT_10001",remarks:"中转批量导入"},
                {bizName:"专线物流模板导入",excelFile:"/static/excel/orderTransitLineInfo.xlsx",bizCode:"IMP_TRANSIT_10002",remarks:"中转批量导入"}
              ]
            },
        }
        this.$emit('openTab', item);
      },
   
    // 批量导出
    exportOrders(){
      let that = this;
      let params = that.query;
      if(this.currentTab.selectType == 1){
        if(that.common.isBlank(params.queryTimes)){
          that.$message({"type":"success", message: "请选择查询时间范围"});   
          return;
        }
        if(that.common.isBlank(params.queryTimes[0])){
          that.$message({"type":"success", message: "请选择查询开始时间"});   
          return;
        }
        if(that.common.isBlank(params.queryTimes[1])){
          that.$message({"type":"success", message: "请选择查询结束时间"});   
          return;
        }
    }else{
        if(that.common.isBlank(params.queryTransitTimes)){
          that.$message({"type":"success", message: "请选择查询时间范围"});   
          return;
        }
        if(that.common.isBlank(params.queryTransitTimes[0])){
          that.$message({"type":"success", message: "请选择查询开始时间"});   
          return;
        }
        if(that.common.isBlank(params.queryTransitTimes[1])){
          that.$message({"type":"success", message: "请选择查询结束时间"});   
          return;
        }
    }
    if(params.queryTimes.length > 0 && that.common.isNotBlank(params.queryTimes[0])){
       params.beginTime = params.queryTimes[0];
    }
    if(params.queryTimes.length > 0 && that.common.isNotBlank(params.queryTimes[1])){
       params.endTime = params.queryTimes[1];
    }
    if(params.queryTransitTimes.length > 0 && that.common.isNotBlank(params.queryTransitTimes[0])){
       params.beginTransitTime = params.queryTransitTimes[0];
    }
    if(params.queryTransitTimes.length > 0 && that.common.isNotBlank(params.queryTransitTimes[1])){
       params.endTransitTime = params.queryTransitTimes[1];
    }
    this.$refs.ordersTransferManager.downloadExcelFile();

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

    // 清除
    clear(){
      this.query = {
        queryTimes : [],
        queryTransitTimes : [],
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
      this.$refs.ordersTransferManager.clean();
      if(this.common.isNotBlank(tab.head) ){
         this.head = tab.head;
         this.ordersTransferTable = tab.ordersTransferTable;
      }else{
        this.head = this.headTem;
        this.ordersTransferTable = this.ordersTransferTableTem;
      }
      this.clear();
      debugger
      this.doQuery();
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
  },
  components: {
    tableCommon,
    innerTab,
    printSet,
    mycity
  }
}