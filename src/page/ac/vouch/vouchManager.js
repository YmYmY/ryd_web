import {head} from './json.js'
import tableCommon from "@/components/table/tableCommon.vue"

export default {
  name: 'vouchManager',
  props:['openTab','revokeFlag'],
  beforeRouteEnter(to,from,next){        
    next(that => {
        //调用刷新方法
        that.doQuery();
    });
  },
  data() {
    return {
      head,
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
      
      let url = "api/fcVouchBO.ajax?cmd=doQuery";
      this.$refs.vouchManager.load(url, params, function (data) {
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
      this.query.queryTimes.push(this.common.formatTime(bnow,"yyyy-MM-dd")+" 00:00:00");
      this.query.queryTimes.push(this.common.formatTime(new Date(),"yyyy-MM-dd")+" 23:59:59");
    },
    // 查询费用
    queryVouchSum(){
      let that = this;
      let params = this.query;
      that.vouchSum = {};
      let url = "api/fcVouchBO.ajax?cmd=queryVouchSum";
      that.common.postUrl(url, params,function(data){
        that.vouchSum = data;
     },null,null,true);
    },
    // 新增
    addVouch(){
        let params = {};
        params.sourceType = 2;
        let item = {
          urlName: "新增日记账",
          urlId: "vouchAdd",
          urlPath: "/ac/vouch/vouchAdd.vue",
          urlPathName: "/vouchAdd",
          query:params,
       }
       this.$emit('openTab', item);
    },
    // 新增
    modifyVouch(){
      let that = this;
      let arrs = that.$refs.vouchManager.getSelectItem();
      if(that.common.isBlank(arrs) || arrs.length == 0){
          that.$message({"type":"success", message: "请先选择修改凭证信息"});   
          return;
      }
      let vMap = {};
      for(let i in arrs){
        let d = arrs[i];
        if(d.auditSts == 2){
           that.$message({"type":"success", message: "凭证["+d.vouchNo+"]已审核不可修改"});   
           return;
        }
        vMap[d.vohchNo] = d.vouchNo;
      }
      let j = 0;
      for(let i in vMap ){
         j++;
      }
      if(j > 2){
         that.$message({"type":"success", message: "请选择相同凭证进行修改"});   
         return;
      }
      let arr  = arrs[0];
      let params = {};
      params.sourceType = arr.sourceType;
      params.vouchBatchSeq = arr.vouchBatchSeq;
      params.vouchNo = arr.vouchNo;
      let item = {
        urlName: "修改记账",
        urlId: "vouchModify"+new Date().getTime(),
        urlPath: "/ac/vouch/vouchAdd.vue",
        urlPathName: "/vouchModify"+new Date().getTime(),
        query:params,
     }
     this.$emit('openTab', item);
  },
   
    // 删除信息
    deleteVouch(){
      let that = this;
      let arrs = that.$refs.vouchManager.getSelectItem();
      if(that.common.isBlank(arrs) || arrs.length == 0){
          that.$message({"type":"success", message: "请先选择删除信息"});   
          return;
      }
      let vouchs = [];
      let vMap = {};
      for(let i in arrs){
        let d = arrs[i];
        if(d.auditSts == 2){
           that.$message({"type":"success", message: "凭证["+d.vouchNo+"]已审核，不可删除"});   
           return;
        }
        if(d.sourceType == 1){
          that.$message({"type":"success", message: "凭证["+d.vouchNo+"]是核销凭证，不可操作删除。请操作反核销操作"});   
          return;
        }
        let vouch = {};
        vouch.vouchBatchSeq = d.vouchBatchSeq;
        vouch.vouchNo = d.vouchNo;
        vouchs.push(vouch);
        vMap[d.vouchNo] = d.vouchNo;
      }
      let checkVouchNos = "";
      for(let i in vMap ){
        checkVouchNos = checkVouchNos + vMap[i] +  "；"; 
      }
      let params = {};
      params.vouchs = JSON.stringify(vouchs);

    let url = "api/fcVouchBO.ajax?cmd=deleteVouch";
    that.$confirm('确认删除'+checkVouchNos+"等凭证信息?", '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
      }).then(() => {
          that.common.postUrl(url, params,function(data){
             that.$message({"type":"success", message:"删除成功"});   
             that.$refs.vouchManager.load();
          },null,null,true);

      }).catch(() => {
             
      });
    },
    // 凭证审核
    auditVouch(){
      let that = this;
      let arrs = that.$refs.vouchManager.getSelectItem();
      if(that.common.isBlank(arrs) || arrs.length == 0){
          that.$message({"type":"success", message: "请先选择审核信息"});   
          return;
      }
      let vouchs = [];
      let vMap = {};
      for(let i in arrs){
        let d = arrs[i];
        if(d.auditSts == 2){
          that.$message({"type":"success", message: "凭证["+d.vouchNo+"]已审核，不可审核"});   
          return;
        }
        let vouch = {};
        vouch.vouchBatchSeq = d.vouchBatchSeq;
        vouch.vouchNo = d.vouchNo;
        vouchs.push(vouch);
        vMap[d.vouchNo] = d.vouchNo;
      }
      let checkVouchNos = "";
      for(let i in vMap ){
        checkVouchNos = checkVouchNos + vMap[i] +  "；"; 
      }
      let params = {};
      params.vouchs = JSON.stringify(vouchs);
    let url = "api/fcVouchBO.ajax?cmd=auditVouch";
    that.$confirm('确认审核'+checkVouchNos+"等凭证信息?", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          that.common.postUrl(url, params,function(data){
            that.$message({"type":"success", message:"审核成功"});   
            that.$refs.vouchManager.load();
          },null,null,true);

      }).catch(() => {
            
      });
    },
    // 反核销
    revokeCheck(){
      let that = this;
      let arrs = that.$refs.vouchManager.getSelectItem();
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
        vouchs.push(d.vouchSeq);
        vMap[d.vouchNo] = d.vouchNo;
      }
      let checkVouchNos = "";
      for(let i in vMap ){
        checkVouchNos = checkVouchNos + vMap[i] +  "；"; 
      }
      let params = {};
      params.ids = vouchs.join(",");
     let url = "api/fcVouchBO.ajax?cmd=revokeCheckBatch";
     that.$confirm('确认反核销'+checkVouchNos+"等凭证信息?", '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
      }).then(() => {
          that.common.postUrl(url, params,function(data){
            that.$message({"type":"success", message:"反核销成功"});   
            that.$refs.vouchManager.load();
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
      this.$refs.vouchManager.downloadExcelFile();
    },
    // 查看明细
    queryVouchDetail(){
      let that = this;
      let arrs = that.$refs.vouchManager.getSelectItem();
      if(that.common.isBlank(arrs) || arrs.length == 0){
          that.$message({"type":"success", message: "请先选择查看凭证信息"});   
          return;
      }
      let vMap = {};
      for(let i in arrs){
        let d = arrs[i];
        vMap[d.vohchNo] = d.vouchNo;
      }
      let j = 0;
      for(let k in vMap ){
         j++;
      }
      if(j > 2){
         that.$message({"type":"success", message: "请选择相同凭证进行查看"});   
         return;
      }
      // 跳转到详情
    
      let params = {};
      params.vouchNo = arrs[0].vouchNo;
      let item = {
        urlName: "日记账明细",
        urlId: "vouchDetailManager",
        urlPath: "/ac/vouch/vouchDetailManager.vue",
        urlPathName: "/vouchDetailManager",
        query:params,
     }
     this.$emit('openTab', item);

    },
    // 查看日志
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