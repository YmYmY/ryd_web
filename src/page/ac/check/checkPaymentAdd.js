  import dbTable from "@/components/dbTable/dbTable.vue"
  import {headAdd,headRightAdd} from './json.js'
  import vouchAdd from "../vouch/vouchAdd.vue"

  export default {
    name: 'checkPaymentAdd',
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
        head :headAdd,
        headRightAdd: headRightAdd,
        tableRightData:[],  //右边表格数据数组
        addVouchShow:false,//展示新增日记账
        queryTimes :[],
        regionList:[],
        customerTenantList:[],
        selectOrderCheckTimeList :[],
        orderTypeList :[],
        currentCheckTypeMap : {},
        query:{
          queryOrderCheckTimeType:"1",
          queryOrderCheckType:"1",
          queryTimes:[],
          orderType:"",
        },
        checkOrders :{},
      }
    },
    mounted() {
      this.initSysStaticData();
      this.initOtherData();
      this.currentCheckTypeMap = this.$route.query;
      this.initHtml();
      // this.doQuery();
    },
  
    methods: {
      // 查询
      doQuery() {
        let that = this;
        let params = that.query;
        that.query.checkType = this.currentCheckTypeMap.checkType;
        that.query.checkBatchFlag = true;
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
        params.count = 100;
        params.page = 1;
        params.rows = 100;
        let url = "api/acCashProveBO.ajax?cmd=doQueryPaymentCheck";
        this.$refs.table.load(url, params, function (data) {
          //  console.log(data);
        })
      },
      // 初始化静态数据
      initSysStaticData(){
        let that = this;
        let url = "api/sysStaticDataBO.ajax?cmd=getSysStaticDataSimpleByCodeTypes";
        let codeTypes = [];
        codeTypes.push("SELECT_CHECK_ORDER_TIME");
        codeTypes.push("SELECT_CHECK_ORDERS");
        codeTypes.push("ORDER_TYPE");
        that.common.postUrl(url,{"codeTypes":codeTypes.join(",")},function(data){
          that.selectOrderCheckTimeList = data.SELECT_CHECK_ORDER_TIME;
          that.orderTypeList = data.ORDER_TYPE;
          that.selectOrderCheckList =  data.SELECT_CHECK_ORDERS;
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
         // 下单客户
         params = {};
         params.pTenantId = this.common.getCookie("tenantId");
         that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantDefPName", params,function(data){
           if(that.common.isNotBlank(data) && that.common.isNotBlank(data.items)){
             that.customerTenantList = data.items;
             that.customerTenantList.unshift({tenantFullName:"所有",tenantId:"-1"});
           }
         });
      },
      initHtml(){
        this.query.queryTimeType = "1";
        this.query.queryTansitAddType = "1";
        this.query.queryTimes=[];
        var bnow = new Date();
        bnow.setDate(bnow.getDate() -30);  
        this.query.queryTimes.push(this.common.formatTime(bnow,"yyyy-MM-dd HH:mm"));
        this.query.queryTimes.push(this.common.formatTime(new Date(),"yyyy-MM-dd HH:mm"));
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
             this.$message({"type":"success", message: "运单号["+o.trackingNum+"]已核销"});   
             return;
           }

           if(this.common.isBlank(o.checkMoney) || isNaN(o.checkMoney)){
              this.$message({"type":"success", message: "运单号["+o.trackingNum+"]填入核销金额非法"});   
              return;
           }
           if(o.checkMoney < 0){
             this.$message({"type":"success", message: "运单号["+o.trackingNum+"]填入核销金额非法"});   
             return;
           }
           if(o.checkMoney == 0){
            this.$message({"type":"success", message: "运单号["+o.trackingNum+"]暂无核销金额，无需操作"});   
            return;
          }
           if(parseFloat(o.checkMoney)  * 100 
               + parseFloat(o.checkAmountDouble) * 100  >  parseFloat(o.amountDouble)  * 100){
                this.$message({"type":"success", message: "核销总金额 不能大于 本次核销加已核销金额,当前核销金额非法"});   
                return;
           }
           let oMap = {};
           oMap.checkMoney = Math.round(parseFloat(o.checkMoney)  * 100);
           oMap.orderId = o.orderId;
           oMap.trackingNum = o.trackingNum;
           totalSum = totalSum + Math.round(parseFloat(o.checkMoney)  * 100);
           orderChecks.push(oMap);
        }
        this.checkOrders.orderChecks = orderChecks;
        this.checkOrders.checkType = this.currentCheckTypeMap.checkType;
        this.checkOrders.sourceType = 1
        this.checkOrders.totalSum = totalSum+"";
        this.addVouchShow = true;
        console.log(this.checkOrders);
        this.forceUpdate();
      },
     // 默认值 select BUG  @change="forceUpdate()"
      forceUpdate(){
       this.$forceUpdate();
      },
    // 清除
     clear(){
      this.query = {
        queryOrderCheckTimeType:"1",
        queryOrderCheckType:"1",
        queryTimes:[],
        orderType:"",
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