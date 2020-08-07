import {head,tabs} from './json.js'
import tableCommon from "@/components/table/tableCommon.vue"
import innerTab from "@/components/innerTab/innerTab.vue"
import mycity from '@/components/mycity/mycity.vue'

export default {
  name: 'ordersMatch',
  props:['openTab'],
  beforeRouteEnter(to,from,next){        
    next(that => {
        //调用刷新方法
        that.doQuery();
    });
  },
  data() {
    return {
      head:head,
      tabs:tabs,
      headTem:head, // 缓存head
      ordersTableTem:"ordersMatchTable",
      ordersMatchTable:"ordersMatchTable",
      paymentTypeList :[],
      orderTypeList :[],
      selectOrderTimeList :[],
      selectOrderList :[], 
      orderSourceTypeList :[], 
      oragnizeList :[],// 客服部门
      regionList :[],// 区域列表
      customerTenantList:[],// 下单客户
      selectMatchTypeList:[],//优先数据
      supplierTenantList:[],
      selectOrderConsigneeList:[],
      query:{
        queryMatchTimeType :"1",
        queryMatchOrderType :"1",
        queryMatchOrderConsigneeType:"1",
        queryMatchType :"1",
        queryTimes:[],
        matchType:1,// 智能匹配
      },
      currentTab:tabs[0], // 默认第一个
      showSelectCombinedAiView:false,
      radioDesignate:'',
      showSelectCombinedView : false,
      showSelectCombinedNotView : false,
      outgoing :{
        order:{
          packageNumber:"",
          packageWeight:"",
          packageVolume:""}
      },
      outgoingTem: [],
    }
  },
  mounted() {
    // this.selectCallback(tabs[0]);
    this.initSysStaticData();
    this.initOtherData();
    this.initHtml();
    // this.doQuery();  
    this.outgoingTem = this.common.copyObj(this.outgoing);
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
      let source =  this.$refs.sourceCityAddr;
      if(that.common.isNotBlank(source)){
        params.sourceProvince = source.chooseProvinceId;
        params.sourceCity = source.chooseCityId;
        params.sourceCounty = source.chooseDistrictId;
      }

      let dest =  this.$refs.destCityAddr;
      if(that.common.isNotBlank(dest)){
        params.destProvince = dest.chooseProvinceId;
        params.destCity = dest.chooseCityId;
        params.destCounty = dest.chooseDistrictId;
      }
      params.lodingSts = 1; // 待处理
      params.queryCombinedSts = this.currentTab.queryCombinedSts;
      if(that.common.isNotBlank(params.queryCombinedSts) && params.queryCombinedSts == 2){
         params.matchType = ""; 
      }else{
        params.matchType = 1;
      }
      let url = "api/ordOrderMatchBO.ajax?cmd=doQuery";
      let queryCostType = this.currentTab.queryCostType; // 切换  TAB
      if(this.common.isNotBlank(queryCostType) && queryCostType > 0){
        url = "api/ordOrderMatchBO.ajax?cmd=doQueryDtl";
        params.queryCostType = queryCostType;
      }
      this.$refs.ordersMatchManager.load(url, params, function (data) {
        //  console.log(data);
      })
    },
    // 初始化静态数据
    initSysStaticData(){
      let that = this;
      let url = "api/sysStaticDataBO.ajax?cmd=getSysStaticDataSimpleByCodeTypes";
      let codeTypes = [];
      codeTypes.push("ORDER_TYPE");
      codeTypes.push("ORDER_PAYMENT_TYPE");
      codeTypes.push("ORDER_PAY_STS");
      codeTypes.push("ORDER_OUT_STATE");
      codeTypes.push("SELECT_MATCH_ORDER_TIME");
      codeTypes.push("SELECT_MATCH_ORDERS");
      codeTypes.push("SELECT_MATCH_CONSIGNEE_ORDERS");
      codeTypes.push("SELECT_MATCH_TYPES");
      codeTypes.push("ORDER_SOURCE_TYPE");
      that.common.postUrl(url,{"codeTypes":codeTypes.join(",")},function(data){
        that.paymentTypeList = data.ORDER_PAYMENT_TYPE;
        that.paymentTypeList.unshift({codeName:"所有",codeValue:"-1"});

        that.orderTypeList = data.ORDER_TYPE;
        that.orderTypeList.unshift({codeName:"所有",codeValue:"-1"});
        that.orderSourceTypeList = data.ORDER_SOURCE_TYPE;
        that.orderSourceTypeList.unshift({codeName:"所有",codeValue:"-1"});

        that.selectOrderList = data.SELECT_MATCH_ORDERS;
        that.selectOrderConsigneeList = data.SELECT_MATCH_CONSIGNEE_ORDERS;
        that.selectOrderTimeList = data.SELECT_MATCH_ORDER_TIME;
        that.selectMatchTypeList = data.SELECT_MATCH_TYPES;
        that.initHtml();
      });
    },

    // 初始化其它数据
    initOtherData(){
      let params = {};
      params.oragnizeType = 2;
      let that = this;
      // 销售部门
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
      this.query.queryMatchTimeType = "1";
      this.query.queryMatchOrderType = "1";
      this.query.queryMatchOrderConsigneeType = "1";
      this.query.queryMatchType = "1";
      this.query.queryTimes=[];
      var bnow = new Date();
      bnow.setDate(bnow.getDate() -7);  
      this.query.queryTimes.push(this.common.formatTime(bnow,"yyyy-MM-dd HH:mm")+":00");
      this.query.queryTimes.push(this.common.formatTime(new Date(),"yyyy-MM-dd HH:mm:ss"));
    },
    // 第一优先
  selectSupplierOne(){
    let that = this;
    let arrs = that.$refs.ordersMatchManager.getSelectItem();
    if(that.common.isBlank(arrs) || arrs.length == 0){
        that.$message({"type":"success", message: "请至少选择一条信息"});   
        return;
    }
    // 批量分配
    let checkMap = {};
    let orderIds = [];
    let arrList = [];
    for(let i in arrs){
      let dMap = {};
      let d = arrs[i];
      dMap.supplierTenantId = d.costCompanyOne;
      dMap.orderIds = d.orderId;
      dMap.outSourceType = 2;  // 来源
      arrList.push(dMap);
    }
    let out = {};
    out.outstr = JSON.stringify(arrList);
    that.saveOrderTransit(out,function(data){
      that.$message({"type":"success", message: "批量分配供应商成功，共操作"+data.orderSize+"单。"});   
      that.$refs.ordersMatchManager.load();
    });

  },
  // 最低价格
  selectSupplierLowPrice(){
    let that = this;
    let arrs = that.$refs.ordersMatchManager.getSelectItem();
    if(that.common.isBlank(arrs) || arrs.length == 0){
        that.$message({"type":"success", message: "请至少选择一条信息"});   
        return;
    }
    // 批量分配
    let arrList = [];
    for(let i in arrs){
      let dMap = {};
      let d = this.sortSupplierFee(arrs[i]);
      if(d == null){
         return;
      }
      dMap.supplierTenantId = d.supplierTenantId;
      dMap.orderIds = d.orderId;
      dMap.outSourceType = 2;  // 来源
      arrList.push(dMap);
    }
    let out = {};
    out.outstr = JSON.stringify(arrList);
    that.saveOrderTransit(out,function(data){
      that.$message({"type":"success", message: "批量分配供应商成功，共操作"+data.orderSize+"单。"});   
      that.$refs.ordersMatchManager.load();
    });

  },
   // 承运关系一键合单
   selectCombinedCarrier(){
      let that = this;
      let arrs = that.$refs.ordersMatchManager.getSelectItem();
      if(that.common.isBlank(arrs) || arrs.length == 0){
          that.$message({"type":"success", message: "请至少选择一条信息"});   
          return;
      }
      let orderIds = [];
      let checkMap = {};
      for(let i in arrs){
          let d = arrs[i];
          orderIds.push(d.orderId);
          if(that.common.isBlank(d.costCompanyCarrierOneName)){
             that.$message({"type":"success", message: "非承运关系无法选择"});   
             return;
          }
          checkMap[d.costCompanyCarrierOneName + d.combineNumber ] = d.combineNumber;
      }
      if(that.common.getMapLength(checkMap) > 1){
        that.$message({"type":"success", message: "请选择相同承运关系 和 发货人收货人信息单进行合并"});   
        return;
      }
      that.outgoing = that.common.copyObj(that.outgoingTem)
      that.outgoing.orderIds = orderIds.join(",");
      that.outgoing.combinedSts = 2; // 默认合单
      that.outgoing.supplierTenantId = arrs[0].costCompanyCarrierOne;
      let msg = "确认一键合单派发,供应商：" + arrs[0].costCompanyCarrierOneName+"，共"+orderIds.length+"单";
      that.$confirm(msg, '确认', 
      {confirmButtonText: '确认',cancelButtonText: '关闭',type: 'warning'}
      ).then(() => {
            // 合并开始
        that.selectCombined();
     }).catch(() => {
          that.outgoing = that.common.copyObj(that.outgoingTem)
     });
  },
     // 展开一键派发
     selectCombinedNotView(){
      let that = this;
      let arrs = that.$refs.ordersMatchManager.getSelectItem();
      if(that.common.isBlank(arrs) || arrs.length == 0){
          that.$message({"type":"success", message: "请至少选择一条信息"});   
          return;
      }
      let orderIds = [];
      for(let i in arrs){
          let d = arrs[i];
          orderIds.push(d.orderId);
      }
      that.outgoing = that.common.copyObj(that.outgoingTem)
      that.outgoing.orderIds = orderIds.join(",");
      that.showSelectCombinedNotView = true;
      that.outgoing.combinedSts = 1; // 非合单
    },
    // 展开合单
    selectCombinedView(){
      let that = this;
      let arrs = that.$refs.ordersMatchManager.getSelectItem();
      if(that.common.isBlank(arrs) || arrs.length == 0){
          that.$message({"type":"success", message: "请至少选择一条信息"});   
          return;
      }
      let orderIds = [];
      let checkMap = {};
      for(let i in arrs){
          let d = arrs[i];
          orderIds.push(d.orderId);
          checkMap[d.sourceCityAddr + d.sourceAddress + d.destCityAddr + d.destAddress ] = d.consignorName;
      }
      if(that.common.getMapLength(checkMap) > 1){
         that.$message({"type":"success", message: "请选择相同发货人收货人信息进行合并"});   
         return;
      }
      that.outgoing = that.common.copyObj(that.outgoingTem)
      that.outgoing.orderIds = orderIds.join(",");
      that.showSelectCombinedView = true;
      that.outgoing.combinedSts = 2; // 默认合单
    },
    // 展开智能合单
    selectCombinedAiView(){
      let that = this;
      let arrs = that.$refs.ordersMatchManager.getSelectItem();
      if(that.common.isBlank(arrs) || arrs.length == 0){
          that.$message({"type":"success", message: "请至少选择一条信息"});   
          return;
      }
      let orderIds = [];
      let checkMap = {};
      for(let i in arrs){
          let d = arrs[i];
          orderIds.push(d.orderId);
          checkMap[d.sourceCityAddr + d.sourceAddress + d.destCityAddr + d.destAddress ] = d.consignorName;
      }
      if(that.common.getMapLength(checkMap) > 1){
         that.$message({"type":"success", message: "请选择相同发货人收货人信息进行合并"});   
         return;
      }
      that.outgoing = this.common.copyObj(this.outgoingTem)
      that.outgoing.combinedSts = 2; // 默认合单
      that.outgoing.orderIds = orderIds.join(",");
      that.queryCombinedList(that.outgoing,function(data){
        that.showSelectCombinedAiView = true;
        if(that.common.isBlank(data.suppliers) || data.suppliers <= 0){
           that.$message({"type":"success", message: "无法智能合并，未找到费用相关信息"});   
           return;
        }
        that.outgoing.suppliers = data.suppliers;
        that.outgoing.order.packageNumber = data.order.num;
        if(that.common.isNotBlank(data.order.weight)){
          that.outgoing.order.packageWeight = parseFloat(data.order.weight).toFixed(2);
        }else{
          that.outgoing.order.packageWeight = "0.00";
        }
        if(that.common.isNotBlank(data.order.volume)){
          that.outgoing.order.packageVolume = parseFloat(data.order.volume).toFixed(2);
        }else{
          that.outgoing.order.packageVolume = "0.00";
        }
        that.radioDesignate = "";
      });
    },

    // 合单请求开始
    selectCombined(){
      let that = this;
      if(that.common.isBlank( that.outgoing.supplierTenantId)){
        that.$message({"type":"success", message: "请选择供应商"});   
        return;
      }
      that.outgoing.outSourceType = 2;
      that.common.postUrl("api/ordTransitOutgoingBO.ajax?cmd=saveOrderTransit", that.outgoing,function(data){
        that.$message({"type":"success", message: "分配供应商成功，生成批次号："+data.batchNumAlias+"，共"+data.orderSize+"单。"});   
        that.showSelectCombinedView = false;
        that.showSelectCombinedNotView = false;
        that.showSelectCombinedAiView = false;
        that.outgoing = that.common.copyObj(that.outgoingTem);
        that.$refs.ordersMatchManager.load();
      },null,null,true);
    },
    // 选择 Radio
    selectRadio(data){
      this.outgoing.supplierTenantId = data.supplierTenantId;
    },
    // 智能合并查询价格
    queryCombinedList(out,callback){
      let that = this;
      that.common.postUrl("api/ordOrderMatchBO.ajax?cmd=queryCombinedList", out,function(data){
        callback(data);
      },null,null,true);
    },

     // 批量请求请求后台 分配供应商
    saveOrderTransit(out,callback){
      let that = this;
      that.common.postUrl("api/ordTransitOutgoingBO.ajax?cmd=saveOrderTransits", out,function(data){
        callback(data);
      },null,null,true);
    },
    // 查询是否需要系统对接-需要提示-相关信息
    queryProject(callback){
      let params = {};
      let that = this;
      params.supplierTenantId = this.outgoing.supplierTenantId;
      that.common.postUrl("api/kdBusinessParamBO.ajax?cmd=checkSupplierProject", params,function(data){
          if(that.common.isNotBlank(callback)){
            callback(data);
          }else{
            if(data.projectFlag){
               that.$message({"type":"success", message: "系统对接供应商，请注意无需中转费用和单号"});  
            }
          }
      });
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
      this.$refs.ordersMatchManager.downloadExcelFile();
    },
    // 列表双击
    dblclickItem(order){
      console.log(order);
    },
    // 费用排序 最低 
    sortSupplierFee(dMap){
      let that = this;
      let retMap = {};
      let sups = [];
      for(let k in dMap){
        if(k.indexOf("costCompany") > -1){
            let m = {};
            m.orderId = dMap.orderId;
            m.supplierTenantId = dMap[k];
            m.fee = dMap[k.replace("costCompany","costFee")];
            if(that.common.isNotBlank(m.fee)){
              sups.push(m);
            }
        }
      }  
      if(sups.length < 1){
        that.$message({"type":"success", message: "无法排序价格，无法处理价格优先"});   
        return null;
      }
      if(sups.length == 1){
        return sups[0];
      }
      // 冒泡 排序
      for(let j=0;j < sups.length-1;j++){
        //两两比较，如果前一个比后一个大，则交换位置。
          for(let i = 0;i < sups.length-1-j; i++){
                if(sups[i].fee > sups[i+1].fee){
                    var temp = sups[i];
                    sups[i] = sups[i+1];
                    sups[i+1] = temp;
                }
            } 
      }
      return sups[0];
    },

    // 清除
    clear(){
      this.query = {
        queryTimes:[],
        matchType:1,// 智能匹配
      };
      this.$refs.sourceCityAddr.cleanData();
      this.$refs.destCityAddr.cleanData();
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
      this.$refs.ordersMatchManager.clean();
      console.log("切换到::::::"+tab.name);
      debugger
      if(this.common.isNotBlank(tab.head) ){
        this.head = tab.head;
        this.ordersMatchTable = tab.ordersTable;
      }else{
       this.head = this.common.copyObj(this.headTem);
       this.ordersMatchTable = this.ordersTableTem;
      } 
      this.clear();
      this.doQuery();
    }
  },
  components: {
    tableCommon,
    innerTab,
    mycity    
  }
}