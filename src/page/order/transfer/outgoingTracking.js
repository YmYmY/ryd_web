import {headTracking} from './json.js'
import tableCommon from "@/components/table/tableCommon.vue"

export default {
  name: 'outgoingTracking',
  props:['openTab'],
  beforeRouteEnter(to,from,next){        
    next(that => {
        //调用刷新方法
        that.doQuery();
    });
  },
  data() {
    return {
      head:headTracking,
      queryTransitTimes :[],
      queryTimes :[],
      selectTransitOrderTimeList :[],//中转 时间
      regionList :[],// 区域列表
      supplierTenantList:[],// 供应商
      selectTrackingStsList :[], //  跟踪类型
      oragnizeList:[],//客服部门
      query:{
        trackingStsList:"1,2",
        queryTimes:"",
        queryTransitTrackingTimes:"",
        queryTransitTimes:[]
      },
      selectTrackingStsTemList :[{codeName:'所有',codeValue:""},{codeName:'是',codeValue:"1,2"},{codeName:'否',codeValue:"3"}], // 需跟踪列表
      showTrackingDetailView:false, // 展示内容
      trackingMap:{trackingList:[]}, // 展示列表
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
      that.query.transitNumber = this.transitNumber;
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
      let url = "api/ordTransitOutgoingBO.ajax?cmd=doQueryTracking";
      this.$refs.outgoingTrackingManager.load(url, params, function (data) {
        //  console.log(data);
      })
    },

    // 初始化静态数据
    initSysStaticData(){
      let that = this;
      let url = "api/sysStaticDataBO.ajax?cmd=getSysStaticDataSimpleByCodeTypes";
      let codeTypes = [];
      codeTypes.push("SELECT_ORDER_TRANSIT_TRACKING_TIME");
      codeTypes.push("TRACKING_STS");
      that.common.postUrl(url,{"codeTypes":codeTypes.join(",")},function(data){
        that.selectTransitOrderTimeList = data.SELECT_ORDER_TRANSIT_TRACKING_TIME;
        that.selectTrackingStsList = data.TRACKING_STS;
        that.selectTrackingStsList.unshift({codeName:"所有",codeValue:"-1"});
        that.initHtml();
      });
    },

    // 初始化其它数据
    initOtherData(){
      let params = {};
      let that = this;
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
      // 客服部门
      params.oragnizeType = 4;
      that.common.postUrl("api/sysStaticDataBO.ajax?cmd=getSysOragnizeList",params,function(data){
        if(that.common.isNotBlank(data) && that.common.isNotBlank(data.items)){
            that.oragnizeList = data.items; 
            that.oragnizeList.unshift({oragnizeName:"所有",oragnizeId:"-1"});
        }
      });
    },
    initHtml(){
      this.query.beginTransitTrackingTime = "1";
      this.query.queryTransitTimes=[];
      this.query.queryTimes=[];
      this.query.trackingStsList ="1,2";
      var bnow = new Date();
      bnow.setDate(bnow.getDate() -15);  
      this.query.queryTransitTimes.push(this.common.formatTime(bnow,"yyyy-MM-dd")+" 00:00:00");
      this.query.queryTransitTimes.push(this.common.formatTime(new Date(),"yyyy-MM-dd")+" 23:59:59");
    },
    // 打开手工录入跟踪轨迹
    openTrackingAdd(){
      let that = this;
        let arrs = that.$refs.outgoingTrackingManager.getSelectItem();
        if(that.common.isBlank(arrs) || arrs.length == 0){
            that.$message({"type":"success", message: "请先选择操作单信息"});   
            return;
        }
        let outgoingIds = [];
        for(let i in arrs){
            let d = arrs[i];
            outgoingIds.push(d.outgoingId);
            if(that.common.isBlank(d.outgoingTrackingNum)){
              that.$message({"type":"success", message: "中转单号未存在不可操作跟踪"});   
              return;
            }
            if(d.trackingSts == 3 ){
               that.$message({"type":"success", message: "中转单号"+d.outgoingTrackingNum+"，已跟踪完成无需再操作"});   
               return;
            }
        }
        let item = {
          urlName: "批量跟踪",
          urlId: "add_transit_trackingAdd"+2,
          urlPath: "/order/transfer/trackingAdd.vue",
          urlPathName: "/trackingAdd",
          query:{outgoingIds:outgoingIds.join(",")},
       }
      this.$emit('openTab', item);
    },
  // 取消/跟踪完成
  updateTransitTrackingSts(trackingSts){
    let that = this;
    let trackingStsName  = trackingSts == 1 ? "取消跟踪" : "完成跟踪"
    let arrs = that.$refs.outgoingTrackingManager.getSelectItem();
    if(that.common.isBlank(arrs) || arrs.length == 0){
        that.$message({"type":"success", message: "请先选择操作"+trackingStsName+"信息"});   
        return;
    }
    let outgoingIds = [];
     for(let i in arrs){
        let d = arrs[i];
        outgoingIds.push(d.outgoingId);
        if(that.common.isBlank(d.outgoingTrackingNum)){
          that.$message({"type":"success", message: "中转单号未存在不可操作["+trackingStsName+"]"});   
          return;
        }
        if(d.trackingSts == trackingSts ){
           that.$message({"type":"success", message: "中转单号"+d.outgoingTrackingNum+"，已在"+d.trackingStsName+"，不可操作["+trackingStsName+"]"});   
           return;
        }
    }
    let params = {};
    params.outgoingIds = outgoingIds.join(",");
    params.trackingStsName = trackingStsName;
    params.trackingSts = trackingSts;
    let tsize = outgoingIds.length;
    that.$confirm('确认'+trackingStsName+tsize+"单中转信息?", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        that.common.postUrl("api/ordTransitOutgoingBO.ajax?cmd=updateTransitTrackingSts", params,function(data){
            that.$message({"type":"success", message: "操作成功"});   
            that.$refs.outgoingTrackingManager.load();
        });
    }).catch(() => {
            
    });

  },
  // 查看跟踪信息（当前 中转）
  showTrackingDetail(){
    let that = this;
    let arrs = that.$refs.outgoingTrackingManager.getSelectItem();
    if(that.common.isBlank(arrs) || arrs.length != 1){
        that.$message({"type":"success", message: "请先选择一条查看信息"});   
        return;
    }
    let o = arrs[0];
    let params = {};
    params.outgoingId = o.outgoingId;
    that.common.postUrl("api/ordTransitOutgoingBO.ajax?cmd=queryTransitTrackings", params,function(data){
      that.trackingMap.trackingList = data.items;
      that.trackingMap.outgoingTrackingNum = o.outgoingTrackingNum;
      that.trackingMap.trackingNum = o.trackingNum;
      that.showTrackingDetailView = true;
   });
  },

  // 跳转到 导入中转单号轨迹信息
  importTracking(){
    let item = {
        urlName: "批量导入跟踪信息",
        urlId: new Date().getTime(),
        urlPath: "/common/importTemplate/importTemplate.vue",
        urlPathName: "/importTrackingOrderTemplate",
        query:{
          importList : [
            {bizName:"物流轨迹模板导入",excelFile:"/static/excel/trackingInfo.xlsx",bizCode:"IMP_TRACKING_10007",remarks:"批量导入跟踪信息"},
          ]
        },
    }
    this.$emit('openTab', item);
    },
    // 跳转到 导入中转单号信息
    importoutgoingTrackingNum(){
    let item = {
        urlName: "批量导入中转单号信息",
        urlId: new Date().getTime(),
        urlPath: "/common/importTemplate/importTemplate.vue",
        urlPathName: "/importoutgoingTrackingNumTemplate",
        query:{
          importList : [
            {bizName:"中转单号模板导入",excelFile:"/static/excel/outgoingtrackingNum.xlsx",bizCode:"IMP_TRACK_NUM_10008",remarks:"批量导入中转单号信息"},
          ]
        },
    }
    this.$emit('openTab', item);
    },
    // 获取时时轨迹 （批量循环）-最多200单
    updateRoutes(){
      let that = this;
      let orders = that.$refs.outgoingTrackingManager.getSelectItem();
      if(that.common.isBlank(orders) || orders.length == 0){
          that.$message({"type":"success", message: "请选择数据"});   
          return false;
      }
      let maxNum = 100;
      if(orders.length > maxNum){
        that.$message({"type":"success", message: "每次批量更新数据不能超过"+maxNum+"条!"});   
        return false;
      }
      let orderMap = {};
      let arrs = [];
      for(let i in orders){
        var data = orders[i];
        let outgoingTrackingNum = data.outgoingTrackingNum;//物流单号;
        if(that.common.isNotBlank(outgoingTrackingNum) && that.common.isBlank(orderMap[outgoingTrackingNum])){
          let route = {};
          route.orderId = data.orderId;
          route.busiNum = data.busiNum; //对接业务单号-> 分单需要注意
          route.supplierTenantId = data.supplierTenantId;   //中转商
          route.outgoingTrackingNum = data.outgoingTrackingNum;//物流单号
          arrs.push(route);
          orderMap[outgoingTrackingNum] =  data.outgoingTrackingNum;//物流单号;
        }
        if(arrs.length == 0){
           that.$message({"type":"success", message: "请选择存在物流单号数据更新"});   
           return false;
        }
        let routes = {};
        routes.lists = JSON.stringify(arrs);
        let url = "api/kdBusinessParamBO.ajax?cmd=insertRoutesByMailnos";
        that.$confirm('确认更新'+arrs.length+"单已存在外发单号轨迹信息", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          that.common.postUrl(url, routes,function(data){
            that.$message({"type":"success", message: "成功更新："+data.successNum+",失败:"+data.errorNum});   
            // that.$refs.outgoingTrackingManager.load();
        },true);
      }).catch(() => {
              
      });
      }
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
      this.$refs.outgoingTrackingManager.downloadExcelFile();
    },
    // 列表双击
    dblclickItem(data){
       
    },

    // 清除
    clear(){
      this.query = {
        queryTransitTimes:[]
      };
      this.initHtml();
    },
    // 默认值 select BUG  @change="forceUpdate()"
    forceUpdate(){
       this.$forceUpdate();
    }

  },
  components: {
    tableCommon
  }
 }