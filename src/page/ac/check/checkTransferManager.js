import {headTransfer} from './json.js'
import tableCommon from "@/components/table/tableCommon.vue"

export default {
  name: 'checkTransferManager',
  props:['openTab'],
  beforeRouteEnter(to,from,next){        
    next(that => {
        //调用刷新方法
        that.doQuery();
    });
  },
  data() {
    return {
      head:headTransfer,
      checkList:[],
      showLogView:false,
      checkStsList :[],
      selectTransitOrderTimeList :[],//中转 时间
      regionList :[],// 区域列表
      supplierTenantList:[],// 供应商
      departPaymentTypeList:[],
      transitFlagList:[],
      query:{
        queryCheckTransitTimeType:"1",
        queryTransitTimes:[]
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
      let url = "api/acCashProveBO.ajax?cmd=doQueryTransferCheck";
      this.$refs.checkTransferManager.load(url, params, function (data) {

      })
    },

    // 初始化静态数据
    initSysStaticData(){
      let that = this;
      let url = "api/sysStaticDataBO.ajax?cmd=getSysStaticDataSimpleByCodeTypes";
      let codeTypes = [];
      codeTypes.push("CHECK_STS");
      codeTypes.push("SELECT_ORDER_CHECK_TRANSIT_TIME");
      codeTypes.push("TRANSIT_FLAG");
      codeTypes.push("DEPART_PAYMENT_TYPE");
      
      that.common.postUrl(url,{"codeTypes":codeTypes.join(",")},function(data){
         that.checkStsList = data.CHECK_STS;
         that.checkStsList.unshift({codeName:"所有",codeValue:"-1"});
         that.transitFlagList = data.TRANSIT_FLAG;
         that.transitFlagList.unshift({codeName:"所有",codeValue:"-1"});
         that.departPaymentTypeList = data.DEPART_PAYMENT_TYPE;
         that.departPaymentTypeList.unshift({codeName:"所有",codeValue:"-1"});
         that.selectTransitOrderTimeList = data.SELECT_ORDER_CHECK_TRANSIT_TIME;
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
      this.query.queryCheckTransitTimeType = "1";
      this.query.queryTransitTimes=[];
      var bnow = new Date();
      bnow.setDate(bnow.getDate() -30);  
      this.query.queryTransitTimes.push(this.common.formatTime(bnow,"yyyy-MM-dd")+" 00:00:00");
      this.query.queryTransitTimes.push(this.common.formatTime(new Date(),"yyyy-MM-dd")+" 23:59:59");
     
    },
    // 新增核销
    checkView(){
        let params = {};
        params.checkType = 5;
        let item = {
          urlName: "新增中转费核销",
          urlId: "check_"+params.checkType,
          urlPath: "/ac/check/checkTransferAdd.vue",
          urlPathName: "/check_transfer_order_path_"+params.checkType,
          query:params,
       }
      this.$emit('openTab', item);
    },
   
    // 反核销 批量反核销 （部分核销反核销最新核销数据）
    // cancelCheckOrders(){
    //   let that = this;
    //   let arrs = that.$refs.checkTransferManager.getSelectItem();
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
    //          that.$refs.checkTransferManagerManager.load();
    //       },null,null,true);

    //   }).catch(() => {
             
    //   });
     
    // },
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
      this.$refs.checkTransferManager.downloadExcelFile();
    },
    // 查看日志
    doQueryCheckLog(){
      let that = this;
      let arrs = that.$refs.checkTransferManager.getSelectItem();
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
      params.objId = arr.outgoingId;
      params.objType = 2;
      params.checkType = 5;
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