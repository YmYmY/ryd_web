  import dbTable from "@/components/dbTable/dbTable.vue"
  import {headAddTransfer,headRightAddTransfer} from './json.js'
  import vouchAdd from "../vouch/vouchAdd.vue"

  export default {
    name: 'checkTransferAdd',
    beforeRouteEnter(to,from,next){        
      next(that => {
          //调用刷新方法
          that.doQuery();
      });
    },
    data() {
      return {
        inputvalue:"",
        //table组件数据
        head :headAddTransfer,
        headRightAdd: headRightAddTransfer,
        tableRightData:[],  //右边表格数据数组
        addVouchShow:false,//展示新增日记账
        selectTransitOrderTimeList :[],//中转 时间
        regionList :[],// 区域列表
        supplierTenantList:[],// 供应商
        transitFlagList:[],
        checkStsList:[],
        query:{
          queryCheckTransitTimeType:"1",
          checkSts:"",
          queryTransitTimes:[],
        },
        checkOrders :{},
      }
    },
    mounted() {
      this.initSysStaticData();
      this.initOtherData();
      this.initHtml();
      // this.doQuery();
    },
  
    methods: {
      // 查询
      doQuery() {
        let that = this;
        let params = that.query;
        that.query.checkType =5;
        that.query.checkBatchFlag = true;
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
        params.count = 100;
        params.page = 1;
        params.rows = 100;
        let url = "api/acCashProveBO.ajax?cmd=doQueryTransferCheck";
        this.$refs.table.load(url, params, function (data) {
          //  console.log(data);
        })
      },
       // 初始化静态数据
    initSysStaticData(){
      let that = this;
      let url = "api/sysStaticDataBO.ajax?cmd=getSysStaticDataSimpleByCodeTypes";
      let codeTypes = [];
      codeTypes.push("CHECK_STS");
      codeTypes.push("SELECT_ORDER_CHECK_TRANSIT_TIME");
      codeTypes.push("TRANSIT_FLAG");
      that.common.postUrl(url,{"codeTypes":codeTypes.join(",")},function(data){
         that.checkStsList = data.CHECK_STS;
         that.transitFlagList = data.TRANSIT_FLAG;
         that.selectTransitOrderTimeList = data.SELECT_ORDER_CHECK_TRANSIT_TIME;
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
        this.query.queryCheckTransitTimeType = "1";
        var bnow = new Date();
        bnow.setDate(bnow.getDate() -30);  
        this.query.queryTransitTimes=[];
        this.query.queryTransitTimes.push(this.common.formatTime(bnow,"yyyy-MM-dd HH:mm")+":00");
        this.query.queryTransitTimes.push(this.common.formatTime(new Date(),"yyyy-MM-dd HH:mm")+":00");
        console.log(this.query);
        this.forceUpdate();
      },
      //下一步
      doNext(orders){
        this.tableRightData = orders;
        if(this.common.isBlank(orders) || orders.length == 0){
           this.$message({"type":"success", message: "请选择需要核销信息"});   
           return;
        }
        let orderChecks = [];
        let totalSum = 0;
        for(let i in orders){
           let o = orders[i];
           if(o.checkSts == 3){
             this.$message({"type":"success", message: "运单号["+o.trackingNum+"]子单号["+o.transitTrackingNum+"]已核销"});   
             return;
           }
           if(this.common.isBlank(o.checkMoney) || isNaN(o.checkMoney)){
              this.$message({"type":"success", message: "运单号["+o.trackingNum+"]子单号["+o.transitTrackingNum+"]填入核销金额非法"});   
              return;
           }
           if(o.checkMoney < 0){
            this.$message({"type":"success", message: "运单号["+o.trackingNum+"]子单号["+o.transitTrackingNum+"]填入核销金额非法"});   
            return;
          }
          if(o.checkMoney == 0){
            this.$message({"type":"success", message: "运单号["+o.trackingNum+"]子单号["+o.transitTrackingNum+"]暂无核销金额，无需操作"});   
            return;
          }
           if(parseFloat(o.checkMoney)  * 100 
               + parseFloat(o.checkAmountDouble) * 100  >  parseFloat(o.amountDouble)  * 100){
                this.$message({"type":"success", message: "核销总金额 不能大于 本次核销加已核销金额,当前核销金额非法"});   
                return;
           }
           let oMap = {};
           oMap.checkMoney = parseFloat(o.checkMoney)  * 100;
           oMap.outgoingId = o.outgoingId;
           oMap.transitTrackingNum = o.transitTrackingNum;
           oMap.batchNumAlias = o.batchNumAlias;
           totalSum = totalSum + parseFloat(o.checkMoney)  * 100;
           orderChecks.push(oMap);
        }
        this.checkOrders.orderChecks = orderChecks;
        this.checkOrders.checkType = 5; // 默认中转费核销
        this.checkOrders.sourceType = 1;
        this.checkOrders.totalSum = totalSum+"";
        this.addVouchShow = true;
        this.forceUpdate();
      },
     // 默认值 select BUG  @change="forceUpdate()"
      forceUpdate(){
       this.$forceUpdate();
      },
    // 清除
     clear(){
      this.query = {
        queryCheckTransitTimeType:"1",
        queryTransitTimes:[],
      };
      this.initHtml();
     },
     closeTab(){
       this.$emit('closeTab', this.$route.meta.id);

     },
     //弹窗关闭回调
     closeCallback(data){
        console.log(data);
        this.addVouchShow = false;
        this.tableRightData = [];
        this.$refs.table.setRightData([]);
        this.doQuery();
        this.forceUpdate();
     }
    },

    components: {
      dbTable,
      vouchAdd
    }
  }