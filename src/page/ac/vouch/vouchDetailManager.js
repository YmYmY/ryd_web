import {headDetail} from './json.js'
import tableCommon from "@/components/table/tableCommon.vue"

export default {
  name: 'vouchDetailManager',
  props:['openTab','revokeFlag'],
  beforeRouteEnter(to,from,next){        
    next(that => {
        that.initParam();
        //调用刷新方法
        that.doQuery();
    });
  },
  data() {
    return {
      head:headDetail,
      vouchSum:{},
      sourceTypeList:[],
      auditStsList :[],
      regionList :[],// 区域列表
      checkStsList :[],
      selectVouchList :[],
      derectionList :[],
      itemList:[],
      query:{
        queryVouchType:"1",
        regionId:"",
        derection:"",
        auditSts:"",
        sourceType:"",
        itemCode:"",
        queryTimes :[],
        queryVouchTimes:[],
      },
    }
  },
  mounted() {
    this.initSysStaticData();
    this.initOtherData();
    this.initHtml();
    if(this.revokeFlag){
      // 反核销进入页面
      this.query.sourceType = 1;
      this.doQuery();
    }
  },
  methods: {
    initParam(){
      let vParam = this.$route.query;
      if(this.common.isNotBlank(vParam)){
         this.query.queryAlias = vParam.vouchNo;
         this.forceUpdate();
      }
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
      if(that.common.isNotBlank(that.query.queryVouchTimes)){
        params.vouchBeginDate = that.query.queryVouchTimes[0];
        params.vouchEndDate = that.query.queryVouchTimes[1];
      }

      let url = "api/fcVouchBO.ajax?cmd=doQueryDetail";
      this.$refs.vouchDetailManager.load(url, params, function (data) {
          that.queryVouchSum();
      })
    },

    // 初始化静态数据
    initSysStaticData(){
      let that = this;
      let url = "api/sysStaticDataBO.ajax?cmd=getSysStaticDataSimpleByCodeTypes";
      let codeTypes = [];
      codeTypes.push("SELECT_CHECK_ORDER_TIME");
      codeTypes.push("SELECT_VOUCHS");
      codeTypes.push("VOUCH_DERECTION");
      codeTypes.push("VOUCH_SOURCE_TYPE");
      codeTypes.push("VOUCH_AUDIT_STS");
      that.common.postUrl(url,{"codeTypes":codeTypes.join(",")},function(data){
        that.derectionList = data.VOUCH_DERECTION;
        that.sourceTypeList = data.VOUCH_SOURCE_TYPE;
        that.auditStsList = data.VOUCH_AUDIT_STS;
        that.selectVouchList = data.SELECT_VOUCHS;
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
       // 科目信息
       params = {};
       params.state = 1;
       that.itemList = [];
       that.itemList.unshift({"itemNameAlias":"所有","itemCode":"-1"});
       that.common.postUrl("api/fcBaseBO.ajax?cmd=queryItems", params,function(data){
         if(that.common.isNotBlank(data) && that.common.isNotBlank(data.items)){
            let items = data.items;
            for(let i in items){
              that.itemList.push({"itemNameAlias":items[i].itemName+"（"+items[i].itemCode+"）","itemCode":items[i].itemCode});
            }
           
         }
       });
    
    },
    initHtml(){
      this.query.queryVouchType = "1";
      this.query.queryTimes=[];
      var bnow = new Date();
      bnow.setDate(bnow.getDate() -30);  
      this.query.queryTimes.push(this.common.formatTime(bnow,"yyyy-MM-dd HH:mm")+":00");
      this.query.queryTimes.push(this.common.formatTime(new Date(),"yyyy-MM-dd HH:mm:ss"));
    },
    // 查询费用
    queryVouchSum(){
      let that = this;
      let params = this.query;
      that.vouchSum = {};
      let url = "api/fcVouchBO.ajax?cmd=queryVouchDetailSum";
      that.common.postUrl(url, params,function(data){
        that.vouchSum = data;
     },null,null,true);
    },
     // 反核销
     revokeCheck(){
      let that = this;
      let arrs = that.$refs.vouchDetailManager.getSelectItem();
      if(that.common.isBlank(arrs) || arrs.length == 0){
          that.$message({"type":"success", message: "请先选择反核销信息"});   
          return;
      }
      let vouchs = [];
      let vMap = {};
      for(let i in arrs){
        let d = arrs[i];
        if(d.auditSts == 2){
           that.$message({"type":"success", message: "凭证["+d.vouchNo+"]已审核，不可反核销"});   
           return;
        }
        if(d.sourceType == 2){
          that.$message({"type":"success", message: "凭证["+d.vouchNo+"]是日记账信息，不可反核销"});   
          return;
       }
        vouchs.push(d.vouchdSeq);
        vMap[d.orderNum] = d.orderNum;
      }
      let checkOrderNums = "";
      for(let i in vMap ){
        checkOrderNums = checkOrderNums + vMap[i] +  "；"; 
      }
      let params = {};
     params.ids = vouchs.join(",");
     debugger
     let url = "api/fcVouchBO.ajax?cmd=revokeCheck";
     that.$confirm('确认反核销'+checkOrderNums+"等单号信息?", '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
      }).then(() => {
          that.common.postUrl(url, params,function(data){
            that.$message({"type":"success", message:"反核销成功"});   
            that.$refs.vouchDetailManager.load();
          },null,null,true);

      }).catch(() => {
            
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
      if(that.common.isNotBlank(that.query.queryVouchTimes)){
        that.query.vouchBeginDate = that.query.queryVouchTimes[0];
        that.query.vouchEndDate = that.query.queryVouchTimes[1];
      }
      this.$refs.vouchDetailManager.downloadExcelFile();
    },    // 查看日志
    dblclickItem(){

    },
    
    // 清除
    clear(){
      this.query = {
        queryVouchType:"1",
        regionId:"",
        derection:"",
        auditSts:"",
        sourceType:"",
        itemCode:"",
        queryTimes :[],
        queryVouchTimes:[],
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