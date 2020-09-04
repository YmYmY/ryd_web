import {headOneTranfer} from './json.js'
import tableCommon from "@/components/table/tableCommon.vue"
import mycity from '@/components/mycity/mycity.vue'

export default {
  name: 'ordersTransferOne',
  props:['openTab'],
  beforeRouteEnter(to,from,next){        
    next(that => {
        //调用刷新方法
        that.doQuery();
    });
  },
  data() {
    return {
      head:headOneTranfer,
      paymentTypeList :[],
      orderTypeList :[],
      selectOrderTimeList :[],
      selectOrderList :[], 
      orderSourceTypeList :[], 
      oragnizeList :[],// 客服部门
      regionList :[],// 区域列表
      customerTenantList:[],// 下单客户
      supplierTenantList:[],
      selectCarrierTypeList:[],
      selectOrderConsigneeList:[],
      query:{
        queryMatchTimeType :"1",
        queryMatchOrderType :"1",
        queryMatchOrderConsigneeType:"1",
        queryMatchType :"1",
        queryTimes:[],
        matchType:2,// 一键配载
        carrierType:"",
        oneMatchOrder:true,//一键派发进入
      },
      modifySupplierOneViewFlag:false,
      save : {

      }, // 修改供应参数
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
  
      params.lodingSts = 1; // 待处理
      let url = "api/ordOrderMatchBO.ajax?cmd=doQuery";
      this.$refs.ordersTransferOneManager.load(url, params, function (data) {
        //  console.log(data);
      })
    },
    // 初始化静态数据
    initSysStaticData(){
      let that = this;
      let url = "api/sysStaticDataBO.ajax?cmd=getSysStaticDataSimpleByCodeTypes";
      let codeTypes = [];
      codeTypes.push("ORDER_TYPE");
      codeTypes.push("ORDER_PAYMENT_TYPE");
      codeTypes.push("ORDER_PAY_STS");
      codeTypes.push("ORDER_OUT_STATE");
      codeTypes.push("SELECT_MATCH_ORDER_TIME");
      codeTypes.push("SELECT_MATCH_ORDERS");
      codeTypes.push("ORDER_SOURCE_TYPE");
      codeTypes.push("ORD_CARRIER_TYPE");
      codeTypes.push("SELECT_MATCH_CONSIGNEE_ORDERS");
      // 
      that.common.postUrl(url,{"codeTypes":codeTypes.join(",")},function(data){
        that.paymentTypeList = data.ORDER_PAYMENT_TYPE;
        that.paymentTypeList.unshift({codeName:"所有",codeValue:"-1"});

        that.orderTypeList = data.ORDER_TYPE;
        that.orderTypeList.unshift({codeName:"所有",codeValue:"-1"});
        that.orderSourceTypeList = data.ORDER_SOURCE_TYPE;
        that.orderSourceTypeList.unshift({codeName:"所有",codeValue:"-1"});

        that.selectOrderList = data.SELECT_MATCH_ORDERS;
        that.selectOrderConsigneeList = data.SELECT_MATCH_CONSIGNEE_ORDERS;
        that.selectOrderTimeList = data.SELECT_MATCH_ORDER_TIME;
        that.selectCarrierTypeList = data.ORD_CARRIER_TYPE;
        that.initHtml();
      });
    },

    // 初始化其它数据
    initOtherData(){
      let params = {};
      params.oragnizeType = 2;
      let that = this;
      // 销售部门
      that.common.postUrl("api/sysStaticDataBO.ajax?cmd=getSysOragnizeList",params,function(data){
        if(that.common.isNotBlank(data) && that.common.isNotBlank(data.items)){
            that.oragnizeList = data.items; 
            that.oragnizeList.unshift({oragnizeName:"所有",oragnizeId:"-1"});
        }
      });
      // 区域部门
      that.common.postUrl("api/sysRegionBO.ajax?cmd=getSysRegionSubordinate",params,function(data){
        if(that.common.isNotBlank(data) && that.common.isNotBlank(data.items)){
          that.regionList = data.items;
          that.regionList.unshift({regionName:"所有",regionId:"-1"});
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
      this.query.queryMatchTimeType = "1";
      this.query.queryMatchOrderType = "1";
      this.query.queryMatchOrderConsigneeType = "1";
      
      this.query.queryMatchType = "1";
      this.query.queryTimes=[];
      var bnow = new Date();
      bnow.setDate(bnow.getDate() -300);  
      this.query.queryTimes.push(this.common.formatTime(bnow,"yyyy-MM-dd")+" 00:00:00");
      this.query.queryTimes.push(this.common.formatTime(new Date(),"yyyy-MM-dd")+" 23:59:59");
    },
    // 分配供应商
  selectSupplierOne(){
    let that = this;
    let arrs = that.$refs.ordersTransferOneManager.getSelectItem();
    if(that.common.isBlank(arrs) || arrs.length == 0){
        that.$message({"type":"success", message: "请至少选择一条信息"});   
        return;
    }
    // 批量分配
    let arrList = [];
    for(let i in arrs){
      let dMap = {};
      let d = arrs[i];
      dMap.supplierTenantId = d.costCompanyCarrierOne;
      dMap.orderIds = d.orderId;
      dMap.outSourceType = 2;  // 来源
      arrList.push(dMap);
    }
    let out = {};
    out.outstr = JSON.stringify(arrList);
    that.saveOrderTransit(out,function(data){
      that.$message({"type":"success", message: "批量分配供应商成功，共操作"+data.orderSize+"单。"});   
      that.$refs.ordersTransferOneManager.load();
    });

  },
  
    // 修改供应商 展示
    modifySupplierOneView(){
      let that = this;
      this.save = {};
      let arrs = that.$refs.ordersTransferOneManager.getSelectItem();
      if(that.common.isBlank(arrs) || arrs.length == 0){
          that.$message({"type":"success", message: "请至少选择一条信息"});   
          return;
      }
      let matchIds = [];
      let arrList = [];
      for(let i in arrs){
        let dMap = {};
        let d = arrs[i];
         matchIds.push(d.matchId);
         dMap.orderIds = d.orderId;
         dMap.outSourceType = 2;  // 来源
         arrList.push(dMap);
      }
      this.save.matchIds = matchIds.join(",");
      this.save.arrList = arrList;
      this.modifySupplierOneViewFlag = true;
    },
    
    // 修改供应商
    modifySupplierOneClick(flag){
       let param = {};
       param.supplierTenantId = this.save.supplierTenantId;
       param.matchIds = this.save.matchIds;

       let that = this;
       if(that.common.isBlank(param.supplierTenantId)){
         that.$message({"type":"success", message: "请选择修改供应信息"});  
         return;
       }
       that.modifySupplierOne(param,function(data){
         if("Y" != data){
            that.$message({"type":"success", message: "修改失败"});  
            return;
         }
          if(flag == 1){
              // 修改
              that.$message({"type":"success", message: "修改成功"});  
              that.modifySupplierOneViewFlag = false;
              that.$refs.ordersTransferOneManager.load();
          }else{
            // 修改并分配
            let arrList =  that.save.arrList;
            if(that.common.isBlank(arrList)){
              that.$message({"type":"success", message: "未找到分配信息"});  
              return;
            }
            for(let i in arrList ){
               arrList[i].supplierTenantId = param.supplierTenantId;
            }
            let out = {};
            out.outstr = JSON.stringify(arrList);
            that.$message({"type":"success", message: "修改成功，待分配"});
            that.saveOrderTransit(out,function(data){
               that.$message({"type":"success", message: "修改并批量分配供应商成功，共操作"+data.orderSize+"单。"});   
               that.$refs.ordersTransferOneManager.load();
               that.modifySupplierOneViewFlag = false;
            });
          }
       });
       
    },
    // 修改供应商 确认
    modifySupplierOne(out,callback){
      let that = this;
      that.common.postUrl("api/ordOrderMatchBO.ajax?cmd=modifySupplierOne", out,function(data){
        callback(data);
      },null,null,true);
    },

     // 批量请求请求后台 分配供应商
    saveOrderTransit(out,callback){
      let that = this;
      that.common.postUrl("api/ordTransitOutgoingBO.ajax?cmd=saveOrderTransits", out,function(data){
        callback(data);
      },null,null,true);
    },

    // 查询是否需要系统对接-需要提示-相关信息
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
      this.$refs.ordersTransferOneManager.downloadExcelFile();
    },
    // 列表双击
    dblclickItem(order){
      console.log(order);
    },
  
    // 清除
    clear(){
      this.query = {
        queryTimes:[],
        matchType:2,// 一键配载
        oneMatchOrder:true, //一键派发进入
      };
      this.$refs.sourceCityAddr.cleanData();
      this.$refs.destCityAddr.cleanData();
      this.initHtml();
    },
    // 默认值 select BUG  @change="forceUpdate()"
    forceUpdate(){
       this.$forceUpdate();
    },
  },
  components: {
    tableCommon,
    mycity
  }
}