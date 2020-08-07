// import {head,tabs} from './json.js'
import tableCommon from "@/components/table/tableCommon.vue"

export default {
  name: 'importCenter',
  props:['openTab'],
  data() {
    return {
      head:[
        {"name":"业务编码","code":"bizCode","type" : "text","width":"160"},
        {"name":"业务名称","code":"bizName","type" : "text","width":"120"},
        {"name":"批次号","code":"batchId","type" : "text","width":"120"},
        {"name":"状态","code":"stateName","type" : "text","width":"120"},
        {"name":"总数量","code":"rowNum","type" : "text","width":"120"},
        {"name":"成功数量","code":"successNum","type" : "text","width":"120"},
        {"name":"失败数量","code":"failNum","type" : "text","width":"120"},
        {"name":"备注","code":"remark","type" : "text","width":"200"},
        {"name":"创建时间","code":"createDate","type" : "text","width":"120"},
        {"name":"创建人","code":"createOpName","type" : "text","width":"120"},
        {"name":"更新时间","code":"updateDate","type" : "text","width":"120"}
       ],
      impotStatusList :[],
      query:{
      },
      userType:-1,

    }
  },
  mounted() {
    this.initSysStaticData();
    let batchId = this.$route.query.batchId;
    if(this.common.isNotBlank()){
      this.query.batchId = batchId;
    }
    this.doQuery();
    this.userType = this.common.getCookie("userType");//归属平台
  },
  methods: {
    //分页查询
    doQuery() {
      let that = this;
      let url = "api/sysImportBO.ajax?cmd=queryImportResult";
      that.$refs.importCenterTable.load(url, that.query, function (data) {
      })
    },
    
    // 初始化静态数据
    initSysStaticData(){
      let that = this;
      let url = "api/sysStaticDataBO.ajax?cmd=getSysStaticDataSimpleByCodeTypes";
      let codeTypes = [];
      codeTypes.push("IMPORT_STATUS");
      that.common.postUrl(url,{"codeTypes":codeTypes.join(",")},function(data){
        that.impotStatusList = data.IMPORT_STATUS;
        that.impotStatusList.unshift({codeName:"所有",codeValue:"-1"});
      });
    },

    toViewDetail(){
      let that = this;
      let arrs = that.$refs.importCenterTable.getSelectItem();
      if(that.common.isBlank(arrs) || arrs.length == 0){
         that.$message({"type":"success", message: "请先选择一条信息"});   
         return;
      }
      if(arrs.length > 1 ){
        that.$message({"type":"success", message: "只能选择一条"});   
        return;
      }
      this.toViewDetailPage(arrs[0]);
    },

    toViewDetailPage(obj){
      let item = {
        urlName: "批量导入详情",
        urlId: obj.batchId,
        urlPath: "/sys/import/importCenterDetail.vue",
        urlPathName: "/importCenterDetail",
        query:{batchId:obj.batchId},
      }
      this.$emit('openTab', item);
    },
    downloadResultExcel(state){
      let that = this;
      let arrs = that.$refs.importCenterTable.getSelectItem();
      if(that.common.isBlank(arrs) || arrs.length == 0){
         that.$message({"type":"success", message: "请先选择一条信息"});   
         return;
      }
      if(arrs.length > 1 ){
        that.$message({"type":"success", message: "只能选择一条下载"});   
        return;
      }
      let params = {};
      params.batchId = arrs[0].batchId;
      params.state = state
      params.page = 1;
      params.rows = 1;
      let url = "api/sysImportBO.ajax?cmd=exportImportResult";
      that.common.postUrl(url, params, function (data) {
            if(that.common.isBlank(data) || data.items.length <= 0){
               that.$message({"type":"success", message: "未找到有效数据，无法下载"});   
               return;
            }
            that.downloadResultDetailExcel(params,data.items[0]);

      });
    },
    downloadResultDetailExcel(params,obj){
      params.rows = 10;
      let that = this;
      let queryUrl = "api/sysImportBO.ajax?cmd=exportImportResultExcel";
      let excelLables = "";
      let rowData = obj.rowData;
      let rows = rowData.split(",");
      if(rowData.indexOf("序号") <= -1){
        excelLables = "序号,";
      }
      for(let i in rows){
         excelLables = excelLables + rows[i].split("@")[0]+",";
      }
      excelLables = excelLables + "导入状态,处理备注";
      let excelKeys = excelLables;
      that.common.downloadExcelFile(queryUrl,params,excelLables,excelKeys,"","导出处理结果",false)
    },
    downloadExcel(){
      let that = this;
      let arrs = that.$refs.importCenterTable.getSelectItem();
      if(that.common.isBlank(arrs) || arrs.length == 0){
         that.$message({"type":"success", message: "请先选择一条信息"});   
         return;
      }
      if(arrs.length > 1 ){
        that.$message({"type":"success", message: "只能选择一条下载"});   
        return;
      }
      let params = {};
      params.flowId = arrs[0].flowId;
      let url = "api/sysImportBO.ajax?cmd=getDownloadPath";
      that.common.postUrl(url, params, function (data) {
          // 下载文件
          that.common.downloadFile(data);
      })

    },

    // 列表双击
    dblclickItem(obj){
        this.toViewDetailPage(obj);
    },
    // 清除
    clear(){
      this.query = {};
    },
    // 默认值 select BUG  @change="forceUpdate()"
    forceUpdate(){
       this.$forceUpdate();
    },
  },
  components: {
    tableCommon
  }
}