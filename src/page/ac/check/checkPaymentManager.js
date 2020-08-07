import {head} from './json.js'
import tableCommon from "@/components/table/tableCommon.vue"

export default {
  name: 'checkPaymentManager',
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
      checkList:[],
      showLogView:false,
      queryTimes :[],
      customerTenantList:[],
      selectOrderCheckTimeList :[],
      regionList :[],// 区域列表
      orderProductTypeList :[],
      orderTypeList :[],
      checkStsList :[],
      orderSourceTypeList :[],
      selectOrderCheckList :[],
      orderOutStateList:[],
      query:{
        queryOrderCheckTimeType:"1",
        queryOrderCheckType:"1",
        queryTimes:[],
        regionId:"",
        orderType:"",
        productType:"",
        sourceType:"",
      },
      currentCheckTypeMap : {},
      // 订单页面用同个页面处理核销问题 分类
      checkTypeMap : {
           "/cashPayment":{"checkType":1,"checkTypeName":"现付","checkPaymentManagerTable":"checkPaymentManagerTableCashPayment"},
           "/freightPayment":{"checkType":2,"checkTypeName":"到付","checkPaymentManagerTable":"checkPaymentManagerTableFreightPayment"},
           "/monthPayment":{"checkType":3,"checkTypeName":"月结","checkPaymentManagerTable":"checkPaymentManagerTableMonthPayment"},
           "/receiptPayment":{"checkType":4,"checkTypeName":"回单付","checkPaymentManagerTable":"checkPaymentManagerTableReceiptPayment"}
      }
    }
  },
  mounted() {
    this.initSysStaticData();
    this.initOtherData();
    this.checkSourceMethod();
    this.initHtml();
    // this.doQuery();
    
  },
  methods: {
    // 校验类型 （通过页面-> 订单费用核销）
    checkSourceMethod(){
      let meta = this.$route.meta;
      if(this.common.isBlank(meta)){
        this.$message({"type":"success", message: "无法获取数据请重新打开页面"});   
        return;
      }
      let currentRoutePath = meta.path;
      this.currentCheckTypeMap = this.checkTypeMap[currentRoutePath];
      if(this.common.isBlank(this.currentCheckTypeMap)){
        this.$message({"type":"success", message: "无法获取订单费用数据请重新打开页面"});   
        return;
      }
      // console.log(this.currentCheckTypeMap);
   
    },
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
      let url = "api/acCashProveBO.ajax?cmd=doQueryPaymentCheck";
      this.$refs.checkPaymentManager.load(url, params, function (data) {

      })
    },

    // 初始化静态数据
    initSysStaticData(){
      let that = this;
      let url = "api/sysStaticDataBO.ajax?cmd=getSysStaticDataSimpleByCodeTypes";
      let codeTypes = [];
      codeTypes.push("SELECT_CHECK_ORDER_TIME");
      codeTypes.push("SELECT_CHECK_ORDERS");
      codeTypes.push("ORDER_PRODUCT_TYPE");
      codeTypes.push("ORDER_TYPE");
      codeTypes.push("CHECK_STS");
      codeTypes.push("SELECT_ORDERS");
      codeTypes.push("ORDER_SOURCE_TYPE");
      codeTypes.push("ORDER_OUT_STATE");
      that.common.postUrl(url,{"codeTypes":codeTypes.join(",")},function(data){
        that.selectOrderCheckTimeList = data.SELECT_CHECK_ORDER_TIME;
        that.orderProductTypeList = data.ORDER_PRODUCT_TYPE;
        that.orderTypeList = data.ORDER_TYPE;
        that.checkStsList = data.CHECK_STS;
        that.orderSourceTypeList = data.ORDER_SOURCE_TYPE;
        that.orderOutStateList = data.ORDER_OUT_STATE;
        that.selectOrderCheckList =  data.SELECT_CHECK_ORDERS;
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
      this.query.queryOrderCheckTimeType = "1";
      this.query.queryTimes=[];
      this.query.checkType = this.currentCheckTypeMap.checkType; // 默认进来类型 TODO
      var bnow = new Date();
      bnow.setDate(bnow.getDate() -30);  
      this.query.queryTimes.push(this.common.formatTime(bnow,"yyyy-MM-dd HH:mm")+":00");
      this.query.queryTimes.push(this.common.formatTime(new Date(),"yyyy-MM-dd HH:mm:ss"));
    },
    // 新增核销
    checkView(){
        let params = {};
        params.checkType = this.currentCheckTypeMap.checkType;
        params.checkTypeName = this.currentCheckTypeMap.checkTypeName;
        let item = {
          urlName: "新增"+params.checkTypeName+"核销",
          urlId: "check_"+params.checkType,
          urlPath: "/ac/check/checkPaymentAdd.vue",
          urlPathName: "/check_order_path_"+params.checkType,
          query:params,
       }
      this.$emit('openTab', item);
    },
   
    // 反核销 批量反核销 （部分核销反核销最新核销数据）
    // cancelCheckOrders(){
    //   let that = this;
    //   let arrs = that.$refs.checkPaymentManager.getSelectItem();
    //   if(that.common.isBlank(arrs) || arrs.length == 0){
    //       that.$message({"type":"success", message: "请先选择反核销信息"});   
    //       return;
    //   }
    //   let params = {};
    //   let checkedIds = [];
    //   for(let i in arrs){
    //       let d = arrs[i];
    //       if(d.checkSts == 1){
    //          that.$message({"type":"success", message: "运单号["+d.trackingNum+"]未核销不支持反核销操作，请移除"});   
    //          return;
    //       }
    //       checkedIds.push(d.checkedId);
    //   }
    //   params.checkedIds = checkedIds.join(",");
    // //  if(arrs.length > 50){
    // //     that.$message({"type":"success", message: "每次最多支持50条数据"});   
    // //     return;
    // //  }

    // let url = "api/acCashProveBO.ajax?cmd=revokeCheck";
    // that.$confirm('确认反核销'+checkedIds.length+"单信息?", '提示', {
    //      confirmButtonText: '确定',
    //      cancelButtonText: '取消',
    //      type: 'warning'
    //   }).then(() => {
    //       that.common.postUrl(url, params,function(data){
    //          that.$message({"type":"success", message: checkedIds.length+"单数据反核销成功"});   
    //          that.$refs.checkPaymentManagerManager.load();
    //       },null,null,true);

    //   }).catch(() => {
             
    //   });
     
    // },
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
      this.$refs.checkPaymentManager.downloadExcelFile();
    },
    // 查看日志
    doQueryCheckLog(){
      let that = this;
      let arrs = that.$refs.checkPaymentManager.getSelectItem();
      if(that.common.isBlank(arrs) || arrs.length == 0){
          that.$message({"type":"success", message: "请先选择信息"});   
          return;
      }
      if(arrs.length > 1){
        that.$message({"type":"success", message: "只能选择一条信息"});   
        return;
      }
      this.dblclickItem(arrs[0]);
    },
    // 查看日志
    dblclickItem(arr){
      let that = this;
      let params = {};
      params.objId = arr.orderId;
      params.objType = 1;
      params.checkType = this.currentCheckTypeMap.checkType;
      let url = "api/acCashProveBO.ajax?cmd=doQueryCheckLog";
      that.checkList = [];
      that.showLogView = true;
      that.common.postUrl(url, params,function(data){
        that.checkList = data.items;
        if(that.common.isBlank(that.checkList) || that.checkList.length == 0){
           that.showLogView = false;
           that.$message({"type":"success", message: "未有核销日志信息"});   
        }
      },null,null,true);
    },
    
    // 清除
    clear(){
      this.query = {
        queryOrderCheckTimeType:"1",
        queryOrderCheckType:"1",
        queryTimes:[],
        regionId:"",
        orderType:"",
        productType:"",
        sourceType:""
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