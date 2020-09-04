import {headOrder} from './json.js'
import tableCommon from "@/components/table/tableCommon.vue"

export default {
  name: 'profitSingleOrder',
  props:['openTab'],
  beforeRouteEnter(to,from,next){        
    next(that => {
        //调用刷新方法
        that.doQuery();
    });
  },
  data() {
    return {
      head:headOrder,
      selectCompareRateTypeList :[], // 毛利率
      selectOrderTimeList :[],// 开单时间
      selectCustomerList :[{"code":"1","name":"C端客户"},{"code":"2","name":"B端客户"}],// 客户类型
      regionList :[],// 区域列表
      // supplierTenantList:[],// 供应商
      customerTenantList:[],// 下单客户
      query:{
        queryTimeType:"1",
        queryTimes:[],
        compareRateType:"1",
        customerType:""
      },
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
      let url = "api/ordOrderProfitBO.ajax?cmd=doQuerySingleOrderProfit";
      this.$refs.profitSingleOrderManager.load(url, params, function (data) {
        //  console.log(data);
      })
    },

    // 初始化静态数据
    initSysStaticData(){
      let that = this;
      let url = "api/sysStaticDataBO.ajax?cmd=getSysStaticDataSimpleByCodeTypes";
      let codeTypes = [];
      codeTypes.push("SELECT_ORDER_TIME");
      codeTypes.push("TRANSIT_FLAG");
      codeTypes.push("COMPARE_RATE_TYPE");
      that.common.postUrl(url,{"codeTypes":codeTypes.join(",")},function(data){
        that.selectTransitFlagList = data.TRANSIT_FLAG;
        that.selectTransitFlagList.unshift({codeName:"所有",codeDesc:"所有",codeValue:"-1"});
        that.selectCompareRateTypeList = data.COMPARE_RATE_TYPE;
        that.selectOrderTimeList = data.SELECT_ORDER_TIME;
        that.initHtml();
      });
    },

    // 初始化其它数据
    initOtherData(){
      let params = {};
      let that = this;
      params.oragnizeType = 2;
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
    },
    initHtml(){
      this.query.queryTimeType = "1";
      this.query.compareRateType  = "1";
      this.query.queryTimes=[];
      var bnow = new Date();
      bnow.setDate(bnow.getDate() -7);  
      this.query.queryTimes.push(this.common.formatTime(bnow,"yyyy-MM-dd")+" 00:00:00");
      this.query.queryTimes.push(this.common.formatTime(new Date(),"yyyy-MM-dd")+" 23:59:59");
      this.query.customerType = "";
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
      this.$refs.profitSingleOrderManager.downloadExcelFile();
    },
   
    // 清除
    clear(){
      this.query = {
        queryTimes:[],
        compareRateType:"1"
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