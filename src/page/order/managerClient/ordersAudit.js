import {headAudit} from './json.js'
import tableCommon from "@/components/table/tableCommon.vue"
import mycity from '@/components/mycity/mycity.vue'

export default {
  name: 'ordersAudit',
  beforeRouteEnter(to,from,next){        
    next(that => {
        //调用刷新方法
        that.doQuery();
    });
  },
  data() {
    return {
      head:headAudit,
      currentTab:{}, 
      paymentTypeList :[],
      selectOrderTimeList :[],
      selectOrderList :[],
      orderAuditStsList:[], // 审核状态
      orderTypeList:[],
      orderSourceTypeList:[],
      query:{
        queryAuditClientTimeType:"1",
        queryAuditClientOrderType:"1",
        queryTimes:[],
        auditSts:"1",
      },
      showCancelRemark : false, //取消运单
      cancelRemark : ""
    }
  },
  mounted() {
    this.initSysStaticData();
    this.initOtherData();
    this.initHtml();
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
      let source =  that.$refs.sourceCityAddr;
      if(that.common.isNotBlank(source)){
        params.sourceProvince = source.chooseProvinceId;
        params.sourceCity = source.chooseCityId;
        params.sourceCounty = source.chooseDistrictId;
      }
      let dest =  that.$refs.destCityAddr;
      if(that.common.isNotBlank(dest)){
        params.destProvince = dest.chooseProvinceId;
        params.destCity = dest.chooseCityId;
        params.destCounty = dest.chooseDistrictId;
      }
      let url = "api/ordOrderInfoBO.ajax?cmd=doQueryClient";
      this.$refs.ordersAuditManager.load(url, params, function (data) {
      })
    },
    // 初始化静态数据
    initSysStaticData(){
      let that = this;
      let url = "api/sysStaticDataBO.ajax?cmd=getSysStaticDataSimpleByCodeTypes";
      let codeTypes = [];
      codeTypes.push("ORDER_CLIENT_PAYMENT_TYPE");
      codeTypes.push("SELECT_AUDIT_CLIENT_ORDER_TIME");
      codeTypes.push("SELECT_AUDIT_CLIENT_ORDERS");
      codeTypes.push("ORDER_AUDIT_STS");
      codeTypes.push("ORDER_TYPE");
      codeTypes.push("ORDER_SOURCE_TYPE");
   
      that.common.postUrl(url,{"codeTypes":codeTypes.join(",")},function(data){
        that.paymentTypeList = data.ORDER_CLIENT_PAYMENT_TYPE;
        that.paymentTypeList.unshift({codeName:"所有",codeValue:"-1"});
        that.orderAuditStsList = data.ORDER_AUDIT_STS;
        that.orderAuditStsList.unshift({codeName:"所有",codeValue:"-1"});
        that.selectOrderTimeList = data.SELECT_AUDIT_CLIENT_ORDER_TIME;
        that.selectOrderList = data.SELECT_AUDIT_CLIENT_ORDERS;

        that.orderSourceTypeList = data.ORDER_SOURCE_TYPE;
        that.orderSourceTypeList.unshift({codeName:"所有",codeValue:"-1"});

        
        that.orderTypeList = data.ORDER_TYPE;
        that.orderTypeList.unshift({codeName:"所有",codeValue:"-1"});
        that.initHtml();
        
      });
    },

    // 初始化其它数据
    initOtherData(){
      let params = {};
      let that = this;
     
    },
    initHtml(){
      this.query.queryAuditClientTimeType = "1";
      this.query.queryAuditClientOrderType = "1";
      this.query.queryTimes=[];
      this.query.auditSts = "1";
      var bnow = new Date();
      bnow.setDate(bnow.getDate() -30);  
      this.query.queryTimes.push(this.common.formatTime(bnow,"yyyy-MM-dd HH:mm")+":00");
      this.query.queryTimes.push(this.common.formatTime(new Date(),"yyyy-MM-dd HH:mm:ss"));
    },
  
    
    // 审核运单
    auditOrder(){
      let that = this;
      let arrs = that.$refs.ordersAuditManager.getSelectItem();
      if(that.common.isBlank(arrs) || arrs.length == 0){
          that.$message({"type":"success", message: "请先选择审核运单信息"});   
          return;
      }
      let orderIds = [];
      for(let i in arrs){
          let d = arrs[i];
          if(d.auditSts == 2){
            that.$message({"type":"success", message: "运单:"+d.trackingNum+"，已审核不可再操作"});   
            return;
          }
          orderIds.push(d.orderId);
      }
      let tsize = orderIds.length;
      that.$confirm('确认审核'+tsize+"单运单信息?", '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
      }).then(() => {
          let params = {};
          params.orderIds = orderIds.join(",");
          that.common.postUrl("api/ordOrderInfoBO.ajax?cmd=auditOrdersClient", params,function(data){
             that.$message({"type":"success", message: "审核"+orderIds.length+"单成功"});   
             that.$refs.ordersAuditManager.load();
          });
      }).catch(() => {
             
      });
     
    },
    // 取消运单
    showCancelOrder(){
      let that = this;
      let arrs = that.$refs.ordersAuditManager.getSelectItem();
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
      let arrs = that.$refs.ordersAuditManager.getSelectItem();
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
        that.$refs.ordersAuditManager.load();
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
      this.$refs.ordersAuditManager.downloadExcelFile();
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
        queryTimes:[],
        auditSts : "1"
      };
      this.$refs.sourceCityAddr.cleanData();
      this.$refs.destCityAddr.cleanData();
      this.initHtml();
   
    },
    // 默认值 select BUG  @change="forceUpdate()"
    forceUpdate(){
       this.$forceUpdate();
    }
  },


  components: {
    tableCommon,
    mycity,
  }
}