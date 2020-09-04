import {headPush} from './json.js'
import tableCommon from "@/components/table/tableCommon.vue"
export default {
  name: 'orders',
  beforeRouteEnter(to,from,next){        
    next(that => {
        //调用刷新方法
        that.doQuery();
    });
  },
  data() {
    return {
      head:headPush,
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
      customerTenantList:[],// 下单客户
      orderSignExceptionList:[],//签收类型
      query:{
        queryTimeType:"1",
        queryOrderType:"1",
        callSts:"-1",
        queryTimes :[],
      },
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
    this.initHtml();
  },
  methods: {
    //分页查询
    doQuery() {
      let that = this;
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
      let url = "api/ordOrderInfoBO.ajax?cmd=doQueryPushOrders";
      that.$refs.ordersPushManager.load(url, params, function (data) {
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
      this.query.queryOrderConsignorType = "1";
      this.query.queryOrderConsigneeType = "1";
      this.query.callSts = "";
      this.query.queryTimes=[];
      var bnow = new Date();
      bnow.setDate(bnow.getDate() -7);  
      this.query.queryTimes.push(this.common.formatTime(bnow,"yyyy-MM-dd")+" 00:00:00");
      this.query.queryTimes.push(this.common.formatTime(new Date(),"yyyy-MM-dd")+" 23:59:59");
    },
    
    // 批量推送
    pushOrders(){
      let that = this;
      let arrs = that.$refs.ordersPushManager.getSelectItem();
      if(that.common.isBlank(arrs) || arrs.length == 0){
        that.$message({"type":"success", message: "请先选择一条运单信息"});   
        return;
      }
      let orderIds = [];
      let push = false;
      for(let i in arrs){
        let order = arrs[i];
         orderIds.push(order.orderId);
         if(order.pushStatus != 1){
           that.$message({"type":"success", message: "请选择待推送单信息"});  
           push = true; 
           return;
         }
         let orderIncomeDouble = that.common.isBlank(order.orderIncomeDouble) ? 0 : order.orderIncomeDouble;
         let billingWeight = that.common.isBlank(order.billingWeight) ? 0 : order.billingWeight;
         if(orderIncomeDouble <= 0 ||  billingWeight <= 0){
           that.$message({"type":"success", message: "请选择存在结算收入合计和计费重量信息"});  
           push = true; 
           return;
         }
      }
      if(push){
         return;
      }
      let params = {};
      params.orderIds = orderIds.join(",");
      that.$confirm("确认推送"+orderIds.length + "单结算信息，请注意？", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.common.postUrl("api/ordOrderInfoBO.ajax?cmd=pushOrders", params,function(data){
           that.$message({"type":"success", message: "推送保存成功"}); 
           that.$refs.ordersPushManager.load();
        },null,null,true);
      }).catch(() => {
             
      });
   
   },
    // 跳转到 导入界面
   importOrder(){
      let item = {
        urlName: "批量收入导入",
        urlId: new Date().getTime(),
        urlPath: "/common/importTemplate/importTemplate.vue",
        urlPathName: "/importOrderFeeTemplate",
        query:{
          importList : [
            {bizName:"收入导入",excelFile:"/static/excel/orderFee.xlsx",bizCode:"IMP_ORDER_FEE_100025",remarks:"收入批量导入"},
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
      this.$refs.ordersPushManager.downloadExcelFile();

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
  },
  components: {
    tableCommon,
  }
}