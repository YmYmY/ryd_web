import {headTracking,tabsAdd} from './json.js'
import tableCommon from "@/components/table/tableCommon.vue"
import innerTab from "@/components/innerTab/innerTab.vue"
import remark from '@/page/order/billing/billingRemark.vue'

export default {
  name: 'outgoingTrackingAdd',
  props:['openTab'],
  data() {
    return {
      head:headTracking,
      tabs:tabsAdd,
      currentTab:{},
      selectTrackingOrderStsList :[], // 跟踪运单类型
      selectTrackingOrderStsListTem :[], // 跟踪运单类型
      tracking:{
        trackingOrderSts :"0",
        trackingFlagView:true,
        trackingContent :"",
        trackingDate:"",
      },
    }
  },
  mounted() {
    this.initSysStaticData();
    this.initHtml();
    this.doQuery(); 
    this.currentTab = this.tabs[0];
  },
  methods: {
    //分页查询
    doQuery() {
      let that = this;
      let params = {};
      params.rows = 100;
      params.count = 100;
      params.page = 1;
      params.outgoingIds = that.$route.query.outgoingIds;
      let url = "api/ordTransitOutgoingBO.ajax?cmd=doQueryTracking";
      this.$refs.outgoingTrackingAddManager.load(url, params, function (data) {
         
      })
    },

    // 初始化静态数据
    initSysStaticData(){
      let that = this;
      let url = "api/sysStaticDataBO.ajax?cmd=getSysStaticDataByCodeTypes";
      let codeTypes = [];
      codeTypes.push("TRACKING_ORDER_STS");
      that.common.postUrl(url,{"codeTypes":codeTypes.join(",")},function(data){
         that.selectTrackingOrderStsList = data.TRACKING_ORDER_STS;
         that.selectTrackingOrderStsListTem = data.TRACKING_ORDER_STS;
         console.log(that.selectTrackingOrderStsList);
         that.initHtml();
      });
    },
    initHtml(){
      this.tracking.trackingContent = "";
      this.tracking.trackingOrderSts ="0";
      this.tracking.trackingDate = this.common.formatTime(new Date(),"yyyy-MM-dd HH:mm")+":00";
      this.tracking.trackingFlagView = true;
    },
    //  保存日志
    saveTransitTrackings(){
      let that = this;
      let tracking = that.tracking;
      tracking.outgoingIds = that.$route.query.outgoingIds;
      tracking.selectType = that.currentTab.selectType;
      tracking.batchTracking = tracking.selectType == 2;
      
      if(that.common.isBlank(tracking.trackingDate)){
         that.$message({"type":"success", message: "请选择跟踪时间"}); 
         return;  
      }
      if(that.common.isBlank(tracking.trackingOrderSts)){
        that.$message({"type":"success", message: "请选择运输状态"}); 
        return;  
      }
      if(that.common.isBlank(tracking.trackingContent)){
        that.$message({"type":"success", message: "请选择或者输入跟踪内容"}); 
        return;  
      }
      tracking.trackingFlag = tracking.trackingFlagView  ? 2 : 1;
      that.common.postUrl("api/ordTransitOutgoingBO.ajax?cmd=saveTransitTrackings", tracking,function(data){
        that.$message({"type":"success", message: "保存成功"});   
        // 是否继续处理
        that.$confirm('是否继续批量跟踪', {
          confirmButtonText: '确认',
          cancelButtonText: '关闭',
          type: 'warning'
        }).then(() => {
          that.initHtml();
        }).catch(() => {
          // 关闭
          that.closeTab();
        });
         
      },null,null,true);
    },
    // 列表双击
    dblclickItem(data){
       
    },
    // 展示常用备注
    showRemark(){
      this.$refs.remark.showLatelyRemark();
    },
    // 回选备注
    remarkCallBack(data){
        this.tracking.trackingContent = data.remarks;
        // this.$refs.remark.hideDialogs();
        
    },
    // 点击 回选TAB
    selectCallback(data){
      this.currentTab = data;
      this.clear();
      if(this.currentTab.selectType == 1){
         // 手工跟踪
         this.selectTrackingOrderStsList = this.selectTrackingOrderStsListTem;
      }else{
         // 自动跟踪
         this.selectTrackingOrderStsList = [];
         for(let i in this.selectTrackingOrderStsListTem){
            if(this.selectTrackingOrderStsListTem[i].codeValue != 2){
              this.selectTrackingOrderStsList.push(this.selectTrackingOrderStsListTem[i]);
            }
         }
         this.selectTrackingOrderSts(this.selectTrackingOrderStsList[0].codeValue);
      }
    },
    // 选择 运输状态
    selectTrackingOrderSts(trackingOrderSts){
      // 选择 状态
      if(this.currentTab.selectType == 2){
          for(let i in this.selectTrackingOrderStsListTem){
              if(this.selectTrackingOrderStsListTem[i].codeValue == trackingOrderSts){
                 this.tracking.trackingContent = this.selectTrackingOrderStsListTem[i].codeTypeAlias;
              }
          }
      }
    },
    // 清除
    clear(){
      this.initHtml();
    },
    // 默认值 select BUG  @change="forceUpdate()"
    forceUpdate(){
       this.$forceUpdate();
    },
    closeTab(){
      this.$emit('closeTab', this.$route.meta.id);
   },
  },
  components: {
    tableCommon,
    innerTab,
    remark
  }
 }