import {headImportFee} from './json.js'
import tableCommon from "@/components/table/tableCommon.vue"

export default {
  name: 'outgoingImportFeeManager',
  props:['openTab'],
  beforeRouteEnter(to,from,next){        
    next(that => {
        //调用刷新方法
        that.doQuery();
    });
  },
  data() {
    return {
      head:headImportFee,
      queryTimes :[],
      selectOrderList:[],
      selectSupplierTypeList :[],  //供应商类型
      selectTransitOrderFeeTimeList :[],//中转导入费用 时间
      selectOrderTimeList :[],// 开单时间
      regionList :[],// 区域列表
      supplierTenantList:[],// 供应商
      regionAllList:[],// 所有区域列表
      selectTransitPaymentTypeList :[], // 中转结算类型
      customerTenantList:[],
      query:{
        queryImportTransitFeeTimeType:"1",
        queryTimeType:"1",
        queryOrderType:"1",
        queryTimes:[],
        queryFeeTimes:[]
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
      // that.query.transitFlag = this.transitFlag;  所有包括二次中转
      that.query.queryImportFeeFlag =1; // 查询导入费用标识
      let params = that.query;
      if(that.common.isBlank(params.queryFeeTimes)){
        that.$message({"type":"success", message: "请选择查询时间范围"});   
        return;
      }
      if(that.common.isBlank(params.queryFeeTimes[0])){
         that.$message({"type":"success", message: "请选择查询开始时间"});   
         return;
      }else{
        params.beginFeeTime = params.queryFeeTimes[0];
      }
      if(that.common.isBlank(params.queryFeeTimes[1])){
        that.$message({"type":"success", message: "请选择查询结束时间"});   
        return;
      }else{
        params.endFeeTime = params.queryFeeTimes[1];
      }
      if(params.queryTimes.length > 0 && that.common.isNotBlank(params.queryTimes[0])){
         params.beginTime = params.queryTimes[0];
      }
      if(params.queryTimes.length > 0 && that.common.isNotBlank(params.queryTimes[1])){
         params.endTime = params.queryTimes[1];
      }
      let url = "api/ordTransitOutgoingBO.ajax?cmd=doQuery";
      this.$refs.outgoingImportFeeManager.load(url, params, function (data) {
        //  console.log(data);
      })
    },

    // 初始化静态数据
    initSysStaticData(){
      let that = this;
      let url = "api/sysStaticDataBO.ajax?cmd=getSysStaticDataSimpleByCodeTypes";
      let codeTypes = [];
      codeTypes.push("SUPPLIER_TYPE");
      codeTypes.push("SELECT_TRANSIT_ORDER_FEE_IMPORT_TIME");
      codeTypes.push("SELECT_ORDER_TIME");
      codeTypes.push("TRANSIT_PAYMENT_TYPE");
      codeTypes.push("SELECT_ORDERS");
      that.common.postUrl(url,{"codeTypes":codeTypes.join(",")},function(data){
        that.selectSupplierTypeList = data.SUPPLIER_TYPE;
        that.selectSupplierTypeList.unshift({codeName:"所有",codeValue:"-1"});
        that.selectTransitOrderFeeTimeList = data.SELECT_TRANSIT_ORDER_FEE_IMPORT_TIME;
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
      this.query.queryImportTransitFeeTimeType = "1";
      this.query.queryOrderType = "1";
      this.query.queryTimeType = "1";
      this.query.queryFeeTimes=[];
      this.query.queryTimes=[];
      var bnow = new Date();
      bnow.setDate(bnow.getDate() -30);  
      this.query.queryFeeTimes.push(this.common.formatTime(bnow,"yyyy-MM-dd HH:mm")+":00");
      this.query.queryFeeTimes.push(this.common.formatTime(new Date(),"yyyy-MM-dd HH:mm:ss"));
      this.query.queryTimes.push("");
      this.query.queryTimes.push("");
    },
    // 批量导出
    exportOrders(){
      let that = this;
      if(that.common.isBlank(that.query.queryFeeTimes)){
        that.$message({"type":"success", message: "请选择导出时间范围"});   
        return;
      }
      if(that.common.isBlank(that.query.queryFeeTimes[0])){
         that.$message({"type":"success", message: "请选择导出开始时间"});   
         return;
      }else{
        that.query.beginFeeTime = that.query.queryFeeTimes[0];
      }
      if(that.common.isBlank(that.query.queryFeeTimes[1])){
        that.$message({"type":"success", message: "请选择导出结束时间"});   
        return;
      }else{
        that.query.endFeeTime = that.query.queryFeeTimes[1];
      }
      if(params.queryTimes.length > 0 && that.common.isNotBlank(params.queryTimes[0])){
         params.beginTime = params.queryTimes[0];
      }
      if(params.queryTimes.length > 0 && that.common.isNotBlank(params.queryTimes[1])){
         params.endTime = params.queryTimes[1];
      }
      this.$refs.outgoingImportFeeManager.downloadExcelFile();
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
        urlName: "批量导入成本",
        urlId: new Date().getTime(),
        urlPath: "/common/importTemplate/importTemplate.vue",
        urlPathName: "/importTransitOrderFee",
        query:{
          importList : [
            {bizName:"批量导入成本",excelFile:"/static/excel/outgoingFee.xlsx",bizCode:"IMP_TRACK_FEE_100016",remarks:"批量导入成本"},
          ]
        },
    }
    this.$emit('openTab', item);
  },
    // 清除
    clear(){
      this.query = {
        queryFeeTimes:[],
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