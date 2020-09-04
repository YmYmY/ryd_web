  //import dbTable from "@/components/dbTable/dbTable.vue"
  import tableCommon from "@/components/table/tableCommon.vue"

  import transferAddDetail from './transferAddDetail.vue'
  import mycity from '@/components/mycity/mycity.vue'
  import {headAdd,headAddRight,headAddList} from './json.js'
  export default {
    name: 'transferAdd',
    data() {
      return {
        inputvalue:"",
        //table组件数据
        head :headAddRight,
        headAddRight :headAddRight,
        headAddList:headAddList,
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
        showSelectSupplierView:false, // 一键派单选择标识
        outgoing:{}, // 保存集合
        ordersList:[], // 订单列表
        supplierTenantTitle:"一键派单",
        selectOrders:[], //选中订单
        selectOrdersView:false, // 标志位-展示已选中
        outModify : false, // 修改标识
        supplierList : [
                        {codeValue:"supplierTenantIdByCarrier",codeName:"承运关系"},
                        {codeValue:"supplierTenantIdByCustomer",codeName:"客户优先"},
                        {codeValue:"supplierTenantIdByTime",codeName:"时效优先"},
                        {codeValue:"supplierTenantIdByCost",codeName:"成本优先"},
                      ],
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
        let source =  this.$refs.sourceCityAddr;
        if(that.common.isNotBlank(source)){
          params.sourceProvince = source.chooseProvinceId;
          params.sourceCity = source.chooseCityId;
          params.sourceCounty = source.chooseDistrictId;
        }

        let dest =  this.$refs.destCityAddr;
        if(that.common.isNotBlank(dest)){
          params.destProvince = dest.chooseProvinceId;
          params.destCity = dest.chooseCityId;
          params.destCounty = dest.chooseDistrictId;
        }
        params[that.query.selectSupplierTenant] = that.query.selectSupplierTenantValue;
        // params.count = 100;
        // params.page = 1;
        // params.rows = 100;
        let url = "api/ordTransitOutgoingBO.ajax?cmd=doQueryNeedTransferOne";
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
        that.common.postUrl("api/sysRegionBO.ajax?cmd=getSysRegionSubordinate",params,function(data){
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
      params.tenantStatus = 1;
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
        this.query.queryTansitAddType = "3";
        this.query.queryTimes=[];
        var bnow = new Date();
        bnow.setDate(bnow.getDate() -7);  
        this.query.queryTimes.push(this.common.formatTime(bnow,"yyyy-MM-dd")+" 00:00:00");
        this.query.queryTimes.push(this.common.formatTime(new Date(),"yyyy-MM-dd")+" 23:59:59");
        this.query.selectSupplierTenant = "supplierTenantIdByCarrier";
        
      },
      //下一步(中转)
      doNext(){
        this.tableRightData = this.selectOrders;
        if(this.common.isBlank(this.tableRightData) || this.tableRightData.length == 0){
          this.$message({"type":"success", message: "请选择需要中转信息"});   
          return;
        }
        for(let i in this.tableRightData){
              let o = this.tableRightData[i];
              if(!this.outModify){
                if(this.common.isBlank(o.checkNumber) || isNaN(o.checkNumber) || o.checkNumber <= 0){
                  this.$message({"type":"success", message: "请输入正确本次中转配载件数"});   
                  return;
                }
              }
             
        }
        this.showTablePage = false;
        this.forceUpdate();
      },
        // 查询系统项目
      queryProject(callback){
        let params = {};
        let that = this;
        params.supplierTenantId = this.outgoing.supplierTenantId;
        that.common.postUrl("api/kdBusinessParamBO.ajax?cmd=checkSupplierProject", params,function(data){
            if(that.common.isNotBlank(callback)){
              callback(data);
            }else{
              if(data.projectFlag){
                  that.$message({"type":"success", message: "系统对接供应商，请注意"});  
              }
            }
        });
      },
      // 点击一键派单
      doDispatch(){
        this.ordersList = this.selectOrders;
        if(this.common.isBlank(this.ordersList) || this.ordersList.length == 0){
          this.$message({"type":"success", message: "请选择需要中转信息"});   
          return;
        }
        this.supplierTenantTitle = "一键派单（共"+this.ordersList.length+"）单";
        this.showSelectSupplierView=true, // 一键派单选择标识
        this.outgoing = {}; // 保存集合
      },
      //一键派单确认
      saveOrUpdate(){
          let that = this;
          let arrs = this.ordersList;
          if(that.common.isBlank(arrs) || arrs.length == 0){
              that.$message({"type":"success", message: "请先选择运单信息"});   
              return;
          }
          let outgoing = this.outgoing;
          if(that.common.isBlank(outgoing.supplierTenantId)){
            that.$message({"type":"success", message: "请选择供应商信息"});   
            return;
          }
          let orderIds = [];
          for(let i in arrs){
              let d = arrs[i];
              orderIds.push(d.orderId);
          }
          outgoing.orderIds = orderIds.join(",");
          outgoing.outSourceType = 1;  // 来源
          that.common.postUrl("api/ordTransitOutgoingBO.ajax?cmd=saveOrderTransit", outgoing,function(data){
             that.$message({"type":"success", message: "一键分配供应商成功，生成批次号："+data.batchNumAlias+"，共"+data.orderSize+"单。"});   
             that.outgoing = {};
             that.showSelectSupplierView = false;
             that.selectOrders = [];
             that.doQuery();
          },null,null,true);
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
        let source =  this.$refs.sourceCityAddr;
        if(that.common.isNotBlank(source)){
          params.sourceProvince = source.chooseProvinceId;
          params.sourceCity = source.chooseCityId;
          params.sourceCounty = source.chooseDistrictId;
        }

        let dest =  this.$refs.destCityAddr;
        if(that.common.isNotBlank(dest)){
          params.destProvince = dest.chooseProvinceId;
          params.destCity = dest.chooseCityId;
          params.destCounty = dest.chooseDistrictId;
        }
        params[that.query.selectSupplierTenant] = that.query.selectSupplierTenantValue;
        this.$refs.table.downloadExcelFile();
    },
      // 返回本页
      goback(data,outModify){
        // console.log(data);
        // this.$refs.table.setRightData(data);
        this.selectOrders = data;
        this.doQuery();
        this.showTablePage = true;
        this.outModify = outModify ? true : false;
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
      this.$refs.sourceCityAddr.cleanData();
      this.$refs.destCityAddr.cleanData();
      this.initHtml();
     },
     closeTab(){
       this.$emit('closeTab', this.$route.meta.id);
     },
     // 单击 
     clickItem(data){
      // console.log(data);
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
      // dbTable,
      tableCommon,
      mycity,
      transferAddDetail
    }
  }