import {headImport} from './json.js'
import tableCommon from "@/components/table/tableCommon.vue"
import innerTab from "@/components/innerTab/innerTab.vue"

export default {
  name: 'ordersImport',
  props:['openTab'],
  beforeRouteEnter(to,from,next){        
    next(that => {
        //调用刷新方法
        that.doQuery();
    });
  },
  data() {
    return {
      head:headImport,
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
      query:{
        queryTimeType:"1",
        queryOrderClientType:"2",
        queryTimes:[]
      }

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
      let url = "api/ordOrderInfoBO.ajax?cmd=doQueryClient";
      params.orderImport = 1; // 导入查询
      this.$refs.ordersImportManager.load(url, params, function (data) {
        //  console.log(data);
      })
    },

    // 初始化静态数据
    initSysStaticData(){
      let that = this;
      let url = "api/sysStaticDataBO.ajax?cmd=getSysStaticDataSimpleByCodeTypes";
      let codeTypes = [];
      codeTypes.push("ORDER_TYPE");
      codeTypes.push("ORDER_CLIENT_PAYMENT_TYPE");
      codeTypes.push("SELECT_ORDER_IMPORT_TIME");
      codeTypes.push("SELECT_CLIENT_ORDERS");
      codeTypes.push("ORDER_SOURCE_TYPE");
      that.common.postUrl(url,{"codeTypes":codeTypes.join(",")},function(data){
        that.paymentTypeList = data.ORDER_CLIENT_PAYMENT_TYPE;
        that.paymentTypeList.unshift({codeName:"所有",codeValue:"-1"});
        that.orderTypeList = data.ORDER_TYPE;
        that.orderTypeList.unshift({codeName:"所有",codeValue:"-1"});
        that.selectOrderList = data.SELECT_CLIENT_ORDERS;
        that.selectOrderTimeList = data.SELECT_ORDER_IMPORT_TIME;
        that.initHtml();
      });
    },

    // 初始化其它数据
    initOtherData(){
      let params = {};
      let that = this;
    },
    initHtml(){
      this.query.queryTimeType = "1";
      this.query.queryOrderClientType = "2";
      this.query.queryTimes=[];
      var bnow = new Date();
      bnow.setDate(bnow.getDate() -30);  
      this.query.queryTimes.push(this.common.formatTime(bnow,"yyyy-MM-dd")+" 00:00:00");
      this.query.queryTimes.push(this.common.formatTime(new Date(),"yyyy-MM-dd")+" 23:59:59");
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

    // 跳转到 导入界面
     importOrder(){
        let item = {
          urlName: "批量导入订单",
          urlId: new Date().getTime(),
          urlPath: "/common/importTemplate/importTemplate.vue",
          urlPathName: "/importOrderTemplate",
          query:{
            importList : [
              {bizName:"订单复杂模板导入",excelFile:"/static/excel/orderInfoClient.xlsx",bizCode:"IMP_ORDER_CLIENT_10010",remarks:"订单批量导入"},
              {bizName:"订单简单模板导入",excelFile:"/static/excel/orderSimpleInfoClient.xlsx",bizCode:"IMP_ORDER_CLIENT_10011",remarks:"订单批量导入"}
            ]
          },
      }
      this.$emit('openTab', item);
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
      this.$refs.ordersImportManager.downloadExcelFile();
    },
    // 列表双击
    dblclickItem(order){
      let that = this;
      let item = {
          urlName: "订单详情",
          urlId: "48" + order.orderId,
          urlPath: "/order/billingClient/order.vue",
          urlPathName: "/order",
          query:{order : {orderId: order.orderId, viewType: 1, view:1}},
      }
      that.$emit('openTab', item);
    },
    // 清除
    clear(){
      this.query = {
        queryTimes:[]
      };
      this.query.orderImport = 1;
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