  //import dbTable from "@/components/dbTable/dbTable.vue"
  import tableCommon from "@/components/table/tableCommon.vue"
  import transferAddDetail from './transferAddDetail.vue?'
  import {headAdd,headAddList} from './json.js'
  export default {
    name: 'transferAdd',
    data() {
      return {
        inputvalue:"",
        //table组件数据
        head :headAdd,
        headAddList :headAddList, // 下一步展示 table
        tableRightData:[],  //右边表格数据数组
        showTablePage:true,//展示页控制
        selectOrderTimeList :[],// 开单时间
        regionList :[],// 区域列表
        regionAllList:[],// 所有区域列表
        selectOrderList:[], //查询列表
        customerTenantList:[],
        query:{
          queryTimes:[]
        },
        supplierTenantList:[],
        selectOrders:[], //选中订单
        selectOrdersView:false, // 标志位-展示已选中
      }
    },
    mounted() {
      this.initSysStaticData();
      this.initOtherData();
      this.initHtml();
      let batchNum = this.$route.query.batchNum;
      if(this.common.isNotBlank(batchNum)){
           this.showTablePage = false;
      }else{
        this.doQuery();
      }

    },
  
    methods: {
      // 查询
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
        // params.count = 100;
        // params.page = 1;
        // params.rows = 100;
        let url = "api/ordTransitOutgoingBO.ajax?cmd=doQueryNeedTransferTwo";
        this.$refs.table.load(url, params, function (data) {
          //  console.log(data);
        })
      },
      // 初始化静态数据
      initSysStaticData(){
        let that = this;
        let url = "api/sysStaticDataBO.ajax?cmd=getSysStaticDataSimpleByCodeTypes";
        let codeTypes = [];
        codeTypes.push("SELECT_ORDER_TIME");
        codeTypes.push("SELECT_TRANSIT_ADD_ORDERS");
        that.common.postUrl(url,{"codeTypes":codeTypes.join(",")},function(data){
          that.selectOrderTimeList = [];
          that.selectOrderTimeList.push(data.SELECT_ORDER_TIME[0]);
          that.selectOrderTimeList.push(data.SELECT_ORDER_TIME[1]);
          that.selectOrderList = data.SELECT_TRANSIT_ADD_ORDERS;
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
        // 所有区域部门
        that.common.postUrl("api/sysRegionBO.ajax?cmd=getSysRegionAll",params,function(data){
          if(that.common.isNotBlank(data) && that.common.isNotBlank(data.items)){
            that.regionAllList = data.items;
            that.regionAllList.unshift({regionName:"所有",regionId:"-1"});
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
        this.query.queryTimeType = "1";
        this.query.queryTansitAddType = "1";
        this.query.queryTimes=[];
        var bnow = new Date();
        bnow.setDate(bnow.getDate() -7);  
        this.query.queryTimes.push(this.common.formatTime(bnow,"yyyy-MM-dd HH:mm"));
        this.query.queryTimes.push(this.common.formatTime(new Date(),"yyyy-MM-dd HH:mm"));
      },
      //下一步
      doNext(data){
        this.tableRightData = this.selectOrders;
        if(this.common.isBlank(this.tableRightData) || this.tableRightData.length == 0){
          this.$message({"type":"success", message: "请选择需要中转信息"});   
          return;
        }
        for(let i in this.tableRightData){
            this.tableRightData[i].outgoingTrackingNum = "";
        }
        this.showTablePage = false;
      },
      // 返回本页
      goback(data){
        // console.log(data);
        // this.$refs.table.setRightData(data);
        this.selectOrders = data;
        this.doQuery();
        this.showTablePage = true;
        this.forceUpdate();
      },
     // 默认值 select BUG  @change="forceUpdate()"
      forceUpdate(){
       this.$forceUpdate();
      },
    // 清除
     clear(){
      this.query = {
        queryTimes:[]
      };
      this.initHtml();
     },
     closeTab(){
       this.$emit('closeTab', this.$route.meta.id);
     },
       // 批量导出
    exportOrders(){
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
      this.$refs.table.downloadExcelFile();
    },
     // 单击 
     clickItem(data){
      console.log(data);
      if(data.isSelect){
        let orderFlag = false;
        for(let i in this.selectOrders){
           if(this.selectOrders[i].orderId == data.orderId){
             orderFlag = true;
             break
           }
        }
        if(!orderFlag){
           data.checkOrder = false;
           this.forceUpdate();
           this.selectOrders.push(data);
        }
        this.$message({"type":"success", message: "加入成功"});   
      }else{
        let orders = [];
        for(let i in this.selectOrders){
          if(this.selectOrders[i].orderId != data.orderId){
            orders.push(this.selectOrders[i]);
          }
       }
       this.selectOrders = orders;
       this.$message({"type":"success", message: "移除成功"});   
      }
     
     },
       // 双击
     dblclickItem(data){
        this.clickItem(data);
     },
    // 全部
    selectAll(obj){
      let flag = obj.selectAll;
      let orders = obj.data;
      let ordersdel = [];
      let ordersadd = [];
      for(let j in orders){
        let o  = orders[j];
        let oTem = null;
        for(let i in this.selectOrders){
          if(this.selectOrders[i].orderId == o.orderId){
            oTem = o;
            break;
          }
        }
        if(flag){
           if(oTem == null){
              ordersadd.push(o);
           }
        }else{
          if(oTem != null){
             ordersdel.push(oTem);
          }
        }
      }
      if(flag){
        for(let i in ordersadd){
          this.selectOrders.push(ordersadd[i]);
        }
        this.$message({"type":"success", message: "添加成功"});   
      }else{
        let ordersTem = [];
        for(let i in this.selectOrders){
          let o = this.selectOrders[i];
          let oflag = false;
          for(let j in ordersdel){
             if(ordersdel[j].orderId == o.orderId){
               oflag = true;
               break;
             }
          }
          if(!oflag){
             ordersTem.push(o);
          }
        }
        this.selectOrders = ordersTem;
        this.$message({"type":"success", message: "移除成功"});  
      }
  },
  // 选择勾选
  selectRow(data){
    data.checkOrder = data.checkOrder ? false : true;
    this.$forceUpdate();
  },
    // 展示列表
    showOrderView(){
      this.selectOrdersView = true;
    },
    // 移除订单
    removeOrders(flag){
      if(flag == 1){
        this.selectOrders = [];
        this.$message({"type":"success", message: "全部移除成功"});   
        return;
      }else{
          let orders = [];
          for(let i in this.selectOrders){
              if(!this.selectOrders[i].checkOrder){
                orders.push(this.selectOrders[i]);
              }
          }
          this.selectOrders = orders;
          this.$message({"type":"success", message: "移除成功"});   
          return;
      }
      this.$forceUpdate();
    },
    },

    components: {
      tableCommon,
      transferAddDetail
    }
  }