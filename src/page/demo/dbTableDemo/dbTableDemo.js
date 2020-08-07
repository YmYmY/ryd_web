  import dbTable from "@/components/dbTable/dbTable.vue"
  import dbTableDemo2 from './dbTableDemo2.vue'
  
  export default {
    name: 'dbTableDemo',
    data() {
      return {
        inputvalue:"",
        //table组件数据
        head :[
            {"name":"添加时间","code":"createDate","width":"150","type" : "text"},
            {"name":"企业类型","code":"tenantTypeName","width":"100","type" : "text"},
            {"name":"客户全称","code":"tenantFullName","width":"100","type" : "text"},
            {"name":"客户简称","code":"tenantName","width":"80","type" : "text"},
            {"name":"办公区域","code":"cityName","width":"80","type" : "text"},
            {"name":"联系人","code":"tenantPrincipal","width":"80","type" : "text"},
            {"name":"联系手机","code":"tenantPhone","width":"80","type" : "text"},
            {"name":"状态","code":"tenantStatusName","width":"80","type" : "text"},
            {"name":"禁用时间","code":"disableDate","width":"80","type" : "text"},
            {"name":"禁用原因","code":"disableRemarks","width":"100","type" : "text"},
            {"name":"销售部门","code":"oragnizeName","width":"150","type" : "text"},
            {"name":"销售专员","code":"userName","width":"80","type" : "text"},
            {"name":"客服专员","code":"kfUserName","width":"80","type" : "text"},
            {"name":"财务专员","code":"cwUserName","width":"80","type" : "text"}
        ],
        tableRightData:[],  //右边表格数据数组
        showTablePage:true,//展示页控制
      }
    },
    mounted() {
      this.doQuery();
    },
    components: {
      dbTable,
      dbTableDemo2,
    },
    methods: {
      doQuery() {
        this.$refs.table.load('api/sysTenantDefBO.ajax?cmd=doQuerySysTenantDefClient', {}, function (data) {
          console.log(data);
        })
      },
      //下一步
      doNext(data){
        this.tableRightData = data;
        this.showTablePage = false;
      },
      // 返回本页
      goback(tabledata){
        this.showTablePage = true;
      }
    }
  }