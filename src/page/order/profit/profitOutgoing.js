import {head} from './json.js'
import tableCommon from "@/components/table/tableCommon.vue"

export default {
  name: 'profitOutgoing',
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
      selectTransitFlagList :[],  //多次中转类型
      selectCompareRateTypeList :[], // 毛利率
      selectTransitOrderTimeList :[],//中转 时间
      selectOrderTimeList :[],// 开单时间
      regionList :[],// 区域列表
      supplierTenantList:[],// 供应商
      query:{
        queryTimeType:"1",
        queryTransitTimes:[],
        compareRateType:"1"
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
      let url = "api/ordOrderProfitBO.ajax?cmd=doQueryTranferProfit";
      this.$refs.profitOutgoingManager.load(url, params, function (data) {
        //  console.log(data);
      })
    },

    // 初始化静态数据
    initSysStaticData(){
      let that = this;
      let url = "api/sysStaticDataBO.ajax?cmd=getSysStaticDataSimpleByCodeTypes";
      let codeTypes = [];
      codeTypes.push("SELECT_ORDER_TRANSIT_TIME");
      codeTypes.push("TRANSIT_FLAG");
      codeTypes.push("COMPARE_RATE_TYPE");
      
      that.common.postUrl(url,{"codeTypes":codeTypes.join(",")},function(data){
        that.selectTransitFlagList = data.TRANSIT_FLAG;
        that.selectTransitFlagList.unshift({codeName:"所有",codeDesc:"所有",codeValue:"-1"});

        that.selectTransitOrderTimeList = data.SELECT_ORDER_TRANSIT_TIME;
        that.selectCompareRateTypeList = data.COMPARE_RATE_TYPE;
 
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
      this.query.queryTransitTimeType = "1";
      this.query.compareRateType  = "1";
      this.query.queryTransitTimes=[];
      var bnow = new Date();
      bnow.setDate(bnow.getDate() -7);  
      this.query.queryTransitTimes.push(this.common.formatTime(bnow,"yyyy-MM-dd")+" 00:00:00");
      this.query.queryTransitTimes.push(this.common.formatTime(new Date(),"yyyy-MM-dd")+" 23:59:59");
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
      this.$refs.profitOutgoingManager.downloadExcelFile();
    },
   
    // 清除
    clear(){
      this.query = {
        queryTransitTimes:[],
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