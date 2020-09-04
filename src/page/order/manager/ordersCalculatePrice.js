import {headCalculate,tabsCalculate} from './json.js'
import tableCommon from "@/components/table/tableCommon.vue"
import innerTab from "@/components/innerTab/innerTab.vue"

export default {
  name: 'ordersCalculatePrice',
  props:['openTab'],
  beforeRouteEnter(to,from,next){        
    next(that => {
        //调用刷新方法
        that.doQuery();
    });
  },
  data() {
    return {
      head:headCalculate,
      tabs:tabsCalculate,
      paymentTypeList :[],
      orderTypeList :[],
      orderProductTypeList :[],
      orderOutStateList :[],
      selectOrderTimeList :[],
      selectOrderList :[], 
      orderSourceTypeList :[], 
      oragnizeList :[],// 客服部门
      regionList :[],// 区域列表
      supplierTenantList:[],// 供应商
      customerTenantList:[],// 下单客户
      supplierTenantList:[],
      query:{
        queryTimeType:"1",
        queryOrderType:"1",
        queryTimes:[]
      },
      currentTab:{}, // 当前选择TAB
      tenantPriceList:[], //租户价格产品
      order:{
        calculatePriceName:"",
      },
      showSaveOrUpdatePriceView:false,// 展示价格选择
      priceTitle:"价格产品匹配",
      selectPackageNumberList:[], 
      selectPackageVolumeList:[], //租户价格产品
      selectPackageWeightList:[], //租户价格产品
   
    }
  },
  mounted() {
    this.initSysStaticData();
    this.initOtherData();
    this.initHtml();
    this.currentTab = this.tabs[0];
    this.doQuerySum(this.tabs[1]);
  },
  methods: {
    //分页查询
    doQuery(obj) {
      let that = this;
      if(that.common.isNotBlank(obj)){
         that.query.queryCalculatePriceFlag = obj.selectType;// 查询导入费用信息标志
      }else{
         that.query.queryCalculatePriceFlag = that.currentTab.selectType;// 查询导入费用信息标志
      }
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
      that.$refs.ordersCalculatePriceManager.load(url, params, function (data) {
          that.currentTab.num = data.totalNum+""; 
      })
    },

    // TABS  统计 
    doQuerySum(tab) {
      let that = this;
      that.query.queryCalculatePriceFlag = tab.selectType;// 查询导入费用信息标志
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
      let url = "api/ordOrderInfoBO.ajax?cmd=doQuery&queryCalculateSum=1";
      that.common.postUrl(url,params,function(data){
        tab.num = data.totalNum+"";
      });
    },

    // 初始化静态数据
    initSysStaticData(){
      let that = this;
      let url = "api/sysStaticDataBO.ajax?cmd=getSysStaticDataSimpleByCodeTypes";
      let codeTypes = [];
      codeTypes.push("ORDER_TYPE");
      codeTypes.push("ORDER_PAYMENT_TYPE");
      codeTypes.push("SELECT_ORDER_TIME");
      codeTypes.push("SELECT_ORDERS");
      codeTypes.push("ORDER_SOURCE_TYPE");
      codeTypes.push("SELECT_ORDERS_PACKAGE_NUMBER");
      codeTypes.push("SELECT_ORDERS_PACKAGE_VOLUME");
      codeTypes.push("SELECT_ORDERS_PACKAGE_WEIGNT");
      that.common.postUrl(url,{"codeTypes":codeTypes.join(",")},function(data){
        that.paymentTypeList = data.ORDER_PAYMENT_TYPE;
        that.paymentTypeList.unshift({codeName:"所有",codeValue:"-1"});
        that.orderTypeList = data.ORDER_TYPE;
        that.orderTypeList.unshift({codeName:"所有",codeValue:"-1"});
        that.selectOrderList = data.SELECT_ORDERS;
        that.selectOrderTimeList = data.SELECT_ORDER_TIME;
        that.selectPackageNumberList = data.SELECT_ORDERS_PACKAGE_NUMBER;
        that.selectPackageVolumeList = data.SELECT_ORDERS_PACKAGE_VOLUME;
        that.selectPackageWeightList = data.SELECT_ORDERS_PACKAGE_WEIGNT;
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
      this.query.queryTimes=[];
      this.query.queryPackageNumber = "1";
      this.query.queryPackageVolume = "1";
      this.query.queryPackageWeight = "1";
      let bnow = new Date();
      bnow.setDate(bnow.getDate() -30);  
      this.query.queryTimes.push(this.common.formatTime(bnow,"yyyy-MM-dd")+" 00:00:00");
      this.query.queryTimes.push(this.common.formatTime(new Date(),"yyyy-MM-dd")+" 23:59:59");
    },
    // 修改或者新增价格 展示
    saveOrUpdatePriceView(flag){
        let that = this;
        if(flag == 2){
          that.priceTitle = "修改价格产品";
        }
        let arrs = that.$refs.ordersCalculatePriceManager.getSelectItem();
        if(that.common.isBlank(arrs) || arrs.length == 0){
          that.$message({"type":"success", message: "请先选择需要处理运单信息"});   
          return;
        }
        let orderIds = [];
        let tenantMap = {};
        for(let i in arrs){
           let o = arrs[i];
           orderIds.push(o.orderId);
           tenantMap[o.customerTenantId] = o.customerTenantId;
        }
       
        let total = 0
        for(let k in tenantMap){
           total ++;
        }
        if(total > 1){
          that.$message({"type":"success", message: "请先选择相同下单客户进行操作"});   
          return;
        }
        that.order.orderIds = orderIds.join(",");
        that.order.customerTenantId = arrs[0].customerTenantId;
        that.getSysTenantPrice(arrs[0].customerTenantId);
        that.order.addOrModify = flag;
        that.showSaveOrUpdatePriceView = true;
    },
    // 修改或者新增价格
    saveOrUpdatePrice(){
      let that = this;
      let params = that.order;
      if(that.common.isBlank(that.order.calculatePriceId)){
        that.$message({"type":"success", message: "请先选择价格产品"});   
        return;
      }
      that.common.postUrl("api/ordOrderInfoBO.ajax?cmd=saveOrUpdatePrice", params,function(data){
         that.$message({"type":"success", message: "处理成功"});   
         that.$refs.ordersCalculatePriceManager.load();
         that.order = {'calculatePriceName':''};
         that.showSaveOrUpdatePriceView = false;
      });
    },
    // 获取客户价格
    getSysTenantPrice(tenantId){
      let that = this;
      that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantPrice",{"tenantId":tenantId,"priceType":""},function (data) {
        that.tenantPriceList = data.items;
        if(that.common.isBlank( that.tenantPriceList) || that.tenantPriceList.length == 0){
           that.$message({"type":"success", message: "未找到价格产品信息"});
        }
      });
    },
    // 选择价格产品
    selectCalculatePrice(obj){
       console.log(obj);
       this.order.calculatePriceName = obj.priceName;
       this.order.calculatePriceId = obj.priceId+"";
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
      this.$refs.ordersCalculatePriceManager.downloadExcelFile();
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
    // 切换TAB
    selectCallback(tab){
      let that = this;
      that.currentTab = tab;
      console.log("切换到::::::"+tab.name);
      that.$refs.ordersCalculatePriceManager.clean();
      that.doQuery();
    },
    // 清除
    clear(){
      this.query = {
        queryTimes:[]
      };
      this.initHtml();
    },
    // 默认值 select BUG  @change="forceUpdate()"
    forceUpdate(){
       this.$forceUpdate();
    }

  },


  components: {
    tableCommon,
    innerTab
  }
}