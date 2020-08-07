import tableCommon from "@/components/table/tableCommon.vue"

export default {
  name: 'importCenterDetail',
  props:['openTab'],
  data() {
    return {
      head:[
        {"name":"导入数据","code":"rowData","type" : "text","width":"500"},
        {"name":"行数","code":"rowSeq","type" : "text","width":"120"},
        {"name":"状态","code":"stateName","type" : "text","width":"120"},
        {"name":"备注","code":"remark","type" : "text","width":"200"},
        {"name":"操作时间","code":"updateDate","type" : "text","width":"120"},
        {"name":"操作信息","code":"msg","type" : "text","width":"500"}
       ],
      batchIdTem : "",
      impotStatusList :[],
      query:{

      }

    }
  },
  mounted() {
    this.initSysStaticData();
    this.batchIdTem = this.$route.query.batchId;
    this.doQuery();
  },
  methods: {
    //分页查询
    doQuery() {
      let that = this;
      this.query.batchId = this.batchIdTem;
      let url = "api/sysImportBO.ajax?cmd=exportImportResult";
      that.$refs.importCenterDetailTable.load(url, that.query, function (data) {
      })
    },
    
    // 初始化静态数据
    initSysStaticData(){
      let that = this;
      let url = "api/sysStaticDataBO.ajax?cmd=getSysStaticDataSimpleByCodeTypes";
      let codeTypes = [];
      codeTypes.push("IMPORT_STATUS_DETAIL");
      that.common.postUrl(url,{"codeTypes":codeTypes.join(",")},function(data){
        that.impotStatusList = data.IMPORT_STATUS_DETAIL;
        that.impotStatusList.unshift({codeName:"所有",codeValue:"-1"});
      });
    },
    // 导出数据
    download(){
      this.$refs.importCenterDetailTable.downloadExcelFile();
    },
    clear(){
      this.query.state = "";
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