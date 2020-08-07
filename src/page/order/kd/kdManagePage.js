import {head,tabs} from './json.js'
import tableCommon from "@/components/table/tableCommon.vue"
import printSet from "@/components/printSet/printSet.vue"
import trackScheduleDialog from "@/components/trackScheduleDialog/trackScheduleDialog.vue"

import innerTab from "@/components/innerTab/innerTab.vue"
import commonPrint from './commonPrint.js'
 export default {
  name: 'kdManagePage',
  beforeRouteEnter(to,from,next){        
    next(that => {
        //调用刷新方法
        // that.doQuery();
    });
  },
  data() {
    return {
      head:head,
      tabs:tabs,
      kdManagePageManagerTable:"kdManagePageManagerTable",// 默认tab名称
      supplierTenantList:[],//供应商列表
      kdBusinessStatusList:[],//对接状态
      kdBusinessTypeList:[], //对接类型
      kdBusinessTypeQueryList:[],
      kdBusinessStatusListTem:[],//对接状态
      kdBusinessTypeListTem:[], //对接类型
      query:{
        queryOperTimes:["",""],// 操作时间
        queryTimes:[],// 创建时间
      },
      currentPrinter:{},//当前打印机
      showPrinterView : false, //是否展开打印机设置
      currentTab:{},// 当前TAB
      dialogScheduleShow :false,// 跟踪日志查看
      orderShowData :{},// 跟踪信息
    }
  },
  mounted() {
    this.initSysStaticData();
    this.initOtherData();
    this.initHtml();
    this.initDevices();
    this.selectCallback(tabs[0]);
  },
  methods: {
    //分页查询
    doQuery() {
      let that = this;
      that.query.businessTypes = this.currentTab.businessTypes;
      that.query.queryType = this.currentTab.queryType;
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
      if(that.common.isNotBlank(that.query.queryOperTimes)){
        that.query.beginOperTime = that.query.queryOperTimes[0];
        that.query.endOperTime = that.query.queryOperTimes[1];
      }
      params.sourceType = that.querySourceType;

      let url = "api/kdBusinessParamBO.ajax?cmd=doQuery";
      this.$refs.kdManagePageManager.load(url, params, function (data) {
        //  console.log(data);
      })
    },
    // 初始化静态数据
    initSysStaticData(){
      let that = this;
      let url = "api/sysStaticDataBO.ajax?cmd=getSysStaticDataSimpleByCodeTypes";
      let codeTypes = [];
      codeTypes.push("KD_BUSINESS_STATUS");
      codeTypes.push("KD_BUSINESS_TYPE");
      that.common.postUrl(url,{"codeTypes":codeTypes.join(",")},function(data){
        that.kdBusinessStatusList = data.KD_BUSINESS_STATUS;
        that.kdBusinessStatusList.unshift({codeName:"所有",codeValue:"-1"});
        that.kdBusinessStatusListTem = data.KD_BUSINESS_STATUS;
        that.kdBusinessTypeListTem = data.KD_BUSINESS_TYPE;
        that.kdBusinessTypeList = [];
        // 创建
        that.kdBusinessTypeList.push(that.kdBusinessTypeListTem[0]);
        that.kdBusinessTypeList.push(that.kdBusinessTypeListTem[1]);
        
        // 查询
        that.kdBusinessTypeQueryList = [];
        for(let i in that.kdBusinessTypeListTem){
            if(i != 0 && i != 1){
              that.kdBusinessTypeQueryList.push(that.kdBusinessTypeListTem[i]);
            }
        }


        that.initHtml();
      });
    },
    // 初始化打印机
    initDevices(){
      let that  = this;
      that.common.initDevices("4",function(arrs){
        if(that.common.isNotBlank(arrs) && arrs.length > 0){
            that.currentPrinter = arrs[0];
            console.log(that.currentPrinter);
        }
      });
    },
    // 初始化其它数据
    initOtherData(){
      let params = {};
      let that = this;
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
      this.query.queryTimes=[];
      this.query.queryOperTimes = [];
      var bnow = new Date();
      bnow.setDate(bnow.getDate() -7);  
      this.query.queryTimes.push(this.common.formatTime(bnow,"yyyy-MM-dd HH:mm")+":00");
      this.query.queryTimes.push(this.common.formatTime(new Date(),"yyyy-MM-dd HH:mm:ss"));
    },
    // 取消对接
    cancelOrder(){
      let that = this;
      let orders = that.$refs.kdManagePageManager.getSelectItem();
      if(that.common.isBlank(orders) || orders.length == 0){
         that.$message({"type":"success", message: "请选择数据"});   
         return false;
      }
      if (orders.length > 1  ) {
        that.$message({"type":"success", message: "只能选择一条数据"});   
        return false;
      }
      let data = orders[0];
			if(data.businessType != 1 &&  data.businessType != 2){
        that.$message({"type":"success", message: "请选择业务类型为[创建][合并创建]的数据进行操作!"});   
				return false;
      }
     if(data.status != 3 &&data.status != 1 && data.status != 2 ){
        that.$message({"type":"success", message: "非对接状态[未对接][对接中][已对接]不可进行取消操作!"});  
				return false;
			}
      that.$confirm('确认取消供应商'+data.supplierTenantName+"商家单号["+data.busiNum+"]外发?", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
         let params = {};
         params.id = data.id;
         that.common.postUrl("api/kdBusinessParamBO.ajax?cmd=cancelOrder", params,function(data){
            that.$message({"type":"success", message: "取消成功"});   
            that.$refs.kdManagePageManager.load();
        },null,null,true);
      }).catch(() => {
             
      });
    },
    // 批量打印
  async doPrintBtach(){
      let that = this;
      if(that.common.isBlank(that.currentPrinter) || that.common.isBlank(that.currentPrinter.printerName)){
        that.$message({"type":"success", message: "请先选择打印打印机"});   
        that.printerViewHtml(); //设置打印机
        return;
      }
      let orders = that.$refs.kdManagePageManager.getSelectItem();
      if(that.common.isBlank(orders) || orders.length == 0){
         that.$message({"type":"success", message: "请先选择打印信息"});   
         return;
      }
      commonPrint.doPrintBtach(that.currentPrinter,orders);
    }, 
    // 查看跟踪日志
    dialogScheduleShowView(){
      let that = this;
      let data = {};
      let orders = that.$refs.kdManagePageManager.getSelectItem();
      if(that.common.isBlank(orders) || orders.length == 0){
         that.$message({"type":"success", message: "请选择数据"});   
         return false;
      }
      if (orders.length > 1  ) {
        that.$message({"type":"success", message: "只能选择一条数据"});   
        return false;
      }
      data = orders[0];
      let outgoingTrackingNum = orders[0].outgoingTrackingNum;
      if(that.common.isBlank(outgoingTrackingNum)){
        that.$message({"type":"success", message: "请选择存在中转单号数据"});   
        return false;
     }
     that.orderShowData.supplierTenantName = data.supplierTenantName;
     that.orderShowData.outgoingTrackingNum = data.outgoingTrackingNum;
     that.orderShowData.orderId = data.orderId;
     that.$refs.trackScheduleDialog.showDialog(that.orderShowData);
    },
    // 批量更新周期内未操作单
    updateRouteBatch(){
      let that = this;
      let params = that.query;
      let url = "api/kdBusinessParamBO.ajax?cmd=insertRoutesByDoing";
      that.$confirm('确认更新对接中周期轨迹信息', '提示', {
       confirmButtonText: '确定',
       cancelButtonText: '取消',
       type: 'warning'
     }).then(() => {
        that.common.postUrl(url, params,function(data){
           that.$message({"type":"success", message: "更新成功条数："+data.exeNum});   
           that.$refs.kdManagePageManager.load();
       },true);
     }).catch(() => {
            
     });
    },
    // 手动更新轨迹 （批量循环）
    updateRoutes(){
      let that = this;
      let orders = that.$refs.kdManagePageManager.getSelectItem();
      if(that.common.isBlank(orders) || orders.length == 0){
         that.$message({"type":"success", message: "请选择数据"});   
         return false;
      }
      let maxNum = 500;
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
       that.$confirm('确认更新'+arrs.length+"单轨迹信息", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
         that.common.postUrl(url, routes,function(data){
            that.$message({"type":"success", message: "成功更新："+data.successNum+",失败:"+data.errorNum});   
            that.$refs.kdManagePageManager.load();
        },true);
      }).catch(() => {
             
      });
			}
    },
    // 批量导出
    exportOrders(){
      let that = this;
      that.query.businessTypes = this.currentTab.businessTypes;
      that.query.queryType = this.currentTab.queryType;
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
      if(that.common.isNotBlank(that.query.queryOperTimes)){
        that.query.beginOperTime = that.query.queryOperTimes[0];
        that.query.endOperTime = that.query.queryOperTimes[1];
      }
      this.$refs.kdManagePageManager.downloadExcelFile();
    },
    // 列表双击
    dblclickItem(order){
      console.log(order);
    },
    //打印-设置确定回调
    sureCallback(data){
      if(this.common.isNotBlank(data)){
        this.currentPrinter = data[0];
        console.log("当前执行打印机："+this.currentPrinter);
      }
      
    },
    // 打印-回调外面状态 （隐藏）
    showChange(data){
      this.showPrinterView = data;
    },
    // 打印-设置打印机 （展示页面） // 设置打印机
    printerViewHtml(){
      this.showPrinterView = true;
    },
    // 清除
    clear(){
      this.query = {
        queryOperTimes:["",""],// 操作时间
        queryTimes:[],// 创建时间
      },
      this.initHtml();
    },
    // TAB 切换
    selectCallback(tab){
      this.currentTab = tab;
      this.head = tab.head;
      this.kdManagePageManagerTable = tab.tableName;
      console.log("切换到::::::"+tab.name);
      this.clear();
      this.doQuery();  
    },
    // 默认值 select BUG  @change="forceUpdate()"
    forceUpdate(){
       this.$forceUpdate();
    }
  },
  components: {
    tableCommon,
    printSet,
    innerTab,
    trackScheduleDialog
  }
}