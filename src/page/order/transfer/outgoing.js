import {head} from './json.js'
import tableCommon from "@/components/table/tableCommon.vue"

export default {
  name: 'outgoing',
  props:['openTab'],
  beforeRouteEnter(to,from,next){        
    next(that => {
        //调用刷新方法
        that.doQuery();
    });
  },
  data() {
    return {
      head,
      queryTimes :[],
      selectOrderList:[],
      selectSupplierTypeList :[],  //供应商类型
      selectTransitOrderTimeList :[],//中转 时间
      selectOrderTimeList :[],// 开单时间
      regionList :[],// 区域列表
      supplierTenantList:[],// 供应商
      regionAllList:[],// 所有区域列表
      selectTransitPaymentTypeList :[], // 中转结算类型
      customerTenantList:[],
      query:{
        queryTimeType:"1",
        queryOrderType:"1",
        queryTimes:[],
        queryTransitTimes:[]
      },
      transitFlag: "1", // 1次中转 （中转派发）
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
      that.query.transitFlag = this.transitFlag;
      let params = that.query;
      if(that.common.isBlank(params.queryTransitTimes)){
        that.$message({"type":"success", message: "请选择查询时间范围"});   
        return;
      }
      if(that.common.isBlank(params.queryTransitTimes[0])){
         that.$message({"type":"success", message: "请选择查询开始时间"});   
         return;
      }else{
        params.beginTransitTime = params.queryTransitTimes[0];
      }
      if(that.common.isBlank(params.queryTransitTimes[1])){
        that.$message({"type":"success", message: "请选择查询结束时间"});   
        return;
      }else{
        params.endTransitTime = params.queryTransitTimes[1];
      }
      if(params.queryTimes.length > 0 && that.common.isNotBlank(params.queryTimes[0])){
         params.beginTime = params.queryTimes[0];
      }
      if(params.queryTimes.length > 0 && that.common.isNotBlank(params.queryTimes[1])){
         params.endTime = params.queryTimes[1];
      }
      let url = "api/ordTransitOutgoingBO.ajax?cmd=doQuery";
      this.$refs.outgoingManager.load(url, params, function (data) {
        //  console.log(data);
      })
    },

    // 初始化静态数据
    initSysStaticData(){
      let that = this;
      let url = "api/sysStaticDataBO.ajax?cmd=getSysStaticDataSimpleByCodeTypes";
      let codeTypes = [];
      codeTypes.push("SUPPLIER_TYPE");
      codeTypes.push("SELECT_ORDER_TRANSIT_TIME");
      codeTypes.push("SELECT_ORDER_TIME");
      codeTypes.push("TRANSIT_PAYMENT_TYPE");
      codeTypes.push("SELECT_ORDERS");
      that.common.postUrl(url,{"codeTypes":codeTypes.join(",")},function(data){
        that.selectSupplierTypeList = data.SUPPLIER_TYPE;
        that.selectSupplierTypeList.unshift({codeName:"所有",codeValue:"-1"});
        that.selectTransitOrderTimeList = data.SELECT_ORDER_TRANSIT_TIME;
        that.selectTransitPaymentTypeList = data.TRANSIT_PAYMENT_TYPE;
        that.selectTransitPaymentTypeList.unshift({codeName:"所有",codeValue:"-1"});

        that.selectOrderTimeList = [];
        that.selectOrderTimeList.push(data.SELECT_ORDER_TIME[0]);
        that.selectOrderTimeList.push(data.SELECT_ORDER_TIME[1]);
        that.selectOrderList = data.SELECT_ORDERS;
        that.initHtml();
      });
    },

    // 初始化其它数据
    initOtherData(){
      let params = {};
      let that = this;
      // 区域部门
      that.common.postUrl("api/sysRegionBO.ajax?cmd=getSysRegionSubordinate",params,function(data){
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
      this.query.queryTransitTimeType = "1";
      this.query.queryOrderType = "1";
      this.query.queryTimeType = "1";
      this.query.queryTransitTimes=[];
      this.query.queryTimes=[];
      var bnow = new Date();
      bnow.setDate(bnow.getDate() -30);  
      this.query.queryTransitTimes.push(this.common.formatTime(bnow,"yyyy-MM-dd")+" 00:00:00");
      this.query.queryTransitTimes.push(this.common.formatTime(new Date(),"yyyy-MM-dd")+" 23:59:59");
      this.query.queryTimes.push("");
      this.query.queryTimes.push("");
    },
    // 新增中转
    addTransitOrderView(){
        let item = {
          urlName: "新增配载",
          urlId: "add_transit_"+2,
          urlPath: "/order/transfer/transferAdd.vue",
          urlPathName: "/billingTransitOrder",
          query:{},
       }
      this.$emit('openTab', item);
    },
     // 修改/查看配载 1 修改 2查看
     toTransitOrderView(type){
      let that = this;
      let arrs = that.$refs.outgoingManager.getSelectItem();
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
      let arrs = that.$refs.outgoingManager.getSelectItem();
      if(that.common.isBlank(arrs) || arrs.length == 0){
          that.$message({"type":"success", message: "请先选择取消中转信息"});   
          return;
      }
      let orderIds = [];
      let omap = {};
      let arrsTem = [];
      let flag = false;
      for(let i in arrs){
          let d = arrs[i];
          orderIds.push(d.orderId);
          if(this.common.isBlank(omap[d.batchNum] )){
            arrsTem.push(d.batchNum);
          }
          omap[d.batchNum] = d.batchNum;
          if(d.combinedSts == 2){
            that.$message({"type":"success", message: "合单数据不允许取消单个单，请取操作批次取消 或者 修改配载里面移除相关单"});   
            flag = true;
            return;
          }
      }
      if(flag){
         return;
      }
      // if(arrsTem.length > 1){
      //   that.$message({"type":"success", message: "按单取消需要选择相同批次信息"});   
      //   return;
      // }
      
      let tsize = orderIds.length;
      if(tsize > 20){
        that.$message({"type":"success", message: "按单取消每次最多选择20条"});   
        return;
      }
      that.$confirm('确认取消'+tsize+"单中转信息?", '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
      }).then(async () => {
        for(let i in arrs){
          let order = arrs[i];
          let params = {};
          params.batchNum = order.batchNum;
          params.batchNumAlias = order.batchNumAlias;
          params.orderIdsStr = order.orderId;
          params.trackingNum = order.trackingNum;
          let d = await that.cancelTransit(params)
        }
        that.$refs.outgoingManager.load();
      }).catch(() => {
             
      });
    },
    // 循环单个取消
   async cancelTransit(params){
      let that = this;
      let data = await that.common.postUrl("api/ordTransitOutgoingBO.ajax?cmd=cancelTransit", params);
      that.$message({"type":"success", message: "批次【"+params.batchNumAlias+"】,运单号【"+params.trackingNum+"】取消成功"});   
      return data;
    },
    // 按批次取消
    cancelTransitBatchNum(){
      let that = this;
      let arrs = that.$refs.outgoingManager.getSelectItem();
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
          that.$refs.outgoingManager.load();
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
      if(that.common.isBlank(that.query.queryTransitTimes)){
        that.$message({"type":"success", message: "请选择导出时间范围"});   
        return;
      }
      if(that.common.isBlank(that.query.queryTransitTimes[0])){
         that.$message({"type":"success", message: "请选择导出开始时间"});   
         return;
      }else{
        that.query.beginTransitTime = that.query.queryTransitTimes[0];
      }
      if(that.common.isBlank(that.query.queryTransitTimes[1])){
        that.$message({"type":"success", message: "请选择导出结束时间"});   
        return;
      }else{
        that.query.endTransitTime = that.query.queryTransitTimes[1];
      }
      if(params.queryTimes.length > 0 && that.common.isNotBlank(params.queryTimes[0])){
         params.beginTime = params.queryTimes[0];
      }
      if(params.queryTimes.length > 0 && that.common.isNotBlank(params.queryTimes[1])){
         params.endTime = params.queryTimes[1];
      }
      this.$refs.outgoingManager.downloadExcelFile();
    },
    // 列表双击
    dblclickItem(data){
      let that = this;
      let batchNum = data.batchNum;
      let order = {};
      order.batchNum = batchNum;
      order.batchNumAlias = data.batchNumAlias;
      order.type = 0; // 默认物流
      order.view = false;
      let urlName = "配载详情";
      order.view = true;
      if(data.supplierTenantType != 3){
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
     // 跳转到 导入费用界面
     importTransitOrderFee(){
      let item = {
        urlName: "批量导入中转费用",
        urlId: new Date().getTime(),
        urlPath: "/common/importTemplate/importTemplate.vue",
        urlPathName: "/importTransitOrderFee",
        query:{
          importList : [
            {bizName:"批量导入中转费用",excelFile:"/static/excel/outgoingFee.xlsx",bizCode:"IMP_TRACK_FEE_100016",remarks:"批量导入外发费用"},
          ]
        },
    }
    this.$emit('openTab', item);
  },
    // 清除
    clear(){
      this.query = {
        queryTransitTimes:[],
        queryTimes:[],
      };
      this.initHtml();
    },
    // 默认值 select BUG  @change="forceUpdate()"
    forceUpdate(){
       this.$forceUpdate();
    }

  },
  components: {
    tableCommon
  }
}