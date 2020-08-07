  import innerTab from "@/components/innerTab/innerTab.vue"
  import {tabs} from './json.js'

  export default {
    name: 'transferAddDetail',
    props: ['parentTableData','headList'],
    data() {
      return {
        head:[],
        tableDataTem :[],
        tabs: tabs,
        outView : false, //查看
        outModify : false, //修改
        currentTab :{},
        showOtherFeeEdit: false,
        regionAllList:[],// 所有区域列表
        supplierTenantList:[],// 选择供应商
        supplierTenantListTem:[], //选择供应商 缓存
        selectCombinedStsList:[],// 合单
        selectTransitPaymentTypeList:[],// 结算方式
        selectTransitTypeList:[],// 中转类型
        selectTransitEndDeliveryTypeList:[],// 末端提货方式
        selectTransitBeginDeliveryTypeList:[],// 前端提货方式
        orgList:[],//  供应商网点信息
        selectDepartDivideTypeTypeList:[],// 费用分摊
        orderTem :{},
        selectSupplierTenantTab:{},// 选择供应商
        order :{
           batchNum:"",
           batchNumAlias:"",
           destRegionId:"",
           destRegionName:"",
           destTenantId:"",
           supplierTenantId:"",
           supplierTenantName:"",
           supplierInfo:"",
           sourceOrgId:"",
           sourceDeliverWay:"",
           destOrgId:"",
           destDeliverWay:"",
           transitType : "",
           outgoingTrackingNum:"",
           packageVolume:"",
           packageWeight:"",
           packageNumber:"",
           combinedSts:"",
           remarks:"",
           currentSelectType:"",
            fee:{
            batchNum:"",
            totalFeeDouble:"0.00",
            freightDouble:"",
            paymentType:"",
            divideType:"6",
            deliveryCostsDouble:"",
            pickingCostsDouble:"",
            handingCostsDouble:"",
            packingCostsDouble:"",
            goodsPriceDouble:"",
            cashPaymentDouble:"",
            freightCollectDouble:"",
            receiptPaymentDouble:"",
            monthlyPaymentDouble:"",
            oilPaymentDouble:"",
            procedureFeeDouble:"",
            insureFeeDouble:"",
            otherFeeDouble:"",
            otherFeeName:"其他费",
           },
           details:[
             {
                orderId: "",
                outgoingTrackingNum:"",
                outgoingFeeDouble:"",
                packageVolume:"",
                packageWeight:"",
                packageNumber:""
             }
          ],
        },
        feeTotalKeys:[
            "freightDouble",
            "pickingCostsDouble",
            "handingCostsDouble",
            "packingCostsDouble",
            "deliveryCostsDouble",
            "insureFeeDouble",
            "otherFeeDouble"
          ],
      }
    },
    mounted() {
      this.tableData = this.common.copyObj(this.parentTableData);
      if(this.common.isBlank(this.tableData)){
         this.tableData = [];
      }
      this.orderTem = this.common.copyObj(this.order);
      let batchNum = this.$route.query.batchNum;
      let batchNumAlias = this.$route.query.batchNumAlias;
      let type = this.$route.query.type; // 0 物流 1 快递专线
      let view = this.$route.query.view;
      // console.log(this.tabs);
      if(this.common.isNotBlank(batchNum)){
        this.outView = view;
        if(!view){
           this.outModify = true;
        }
        this.initSysStaticData(2);
        this.initOut(view ? 2 : 1,batchNum);
        this.currentTab = this.tabs[type];
        this.currentTab.active = true;
        this.tabs = [];
        this.tabs.push(this.currentTab);
      }else{

        this.initSysStaticData(1);
        this.currentTab = this.tabs[0];
        for(let i in this.tableData){
          this.tableData[i].transferPackageNumber = this.tableData[i].packageNumber;
          this.tableData[i].transferPackageVolume = 0;
          this.tableData[i].transferPackageWeight = 0;
          if(this.common.isNotBlank(this.tableData[i].packageVolume)){
            this.tableData[i].transferPackageVolume = parseFloat(this.tableData[i].packageVolume).toFixed(2);
          }
          if(this.common.isNotBlank(this.tableData[i].packageWeight)){
            this.tableData[i].transferPackageWeight = parseFloat(this.tableData[i].packageWeight).toFixed(2);
          }
        }
        this.tableDataTem = this.common.copyObj(this.tableData);
        this.initHead(2);
      }
     
      this.initOtherData(); 
    },
    methods: {
       // 初始化静态数据
    initSysStaticData(type){
        let that = this;
        let url = "api/sysStaticDataBO.ajax?cmd=getSysStaticDataSimpleByCodeTypes";
        let codeTypes = [];
        codeTypes.push("COMBINED_STS");
        codeTypes.push("TRANSIT_PAYMENT_TYPE");
        codeTypes.push("TRANSIT_TYPE");
        codeTypes.push("TRANSIT_BEGIN_DELIVERY_TYPE");
        codeTypes.push("TRANSIT_END_DELIVERY_TYPE");
        codeTypes.push("DEPART_DIVIDE_TYPE");
        that.common.postUrl(url,{"codeTypes":codeTypes.join(",")},function(data){
          that.selectCombinedStsList = data.COMBINED_STS;
          that.selectTransitPaymentTypeList = data.TRANSIT_PAYMENT_TYPE;
          // that.selectTransitPaymentTypeList.unshift({codeName:"所有",codeValue:"-1"});
          that.selectTransitTypeList = data.TRANSIT_TYPE;
          that.selectTransitBeginDeliveryTypeList = data.TRANSIT_BEGIN_DELIVERY_TYPE;
          that.selectTransitBeginDeliveryTypeList.unshift({codeName:"所有",codeValue:"-1"});
          that.selectTransitEndDeliveryTypeList = data.TRANSIT_END_DELIVERY_TYPE;
          that.selectTransitEndDeliveryTypeList.unshift({codeName:"所有",codeValue:"-1"});
          that.selectDepartDivideTypeTypeList = data.DEPART_DIVIDE_TYPE;
          // that.selectDepartDivideTypeTypeList.unshift({codeName:"所有",codeValue:"-1"});
          that.initHtml(type);
        });
      },
      // 初始化其它数据
      initOtherData(){
        let params = {};
        let that = this;
        // 所有区域部门
        that.common.postUrl("api/sysRegionBO.ajax?cmd=getSysRegionAll",params,function(data){
          if(that.common.isNotBlank(data) && that.common.isNotBlank(data.items)){
            that.regionAllList = data.items;
            that.regionAllList.unshift({regionName:"所有",regionId:"-1"});
          }
        });
      // 供应商
      params = {};
      params.pTenantId = this.common.getCookie("tenantId");
      that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantDefCityName", params,function(data){
        if(that.common.isNotBlank(data) && that.common.isNotBlank(data.items)){
          let items = data.items;
          that.supplierTenantListTem = that.common.copyObj(items);
          that.querySelectTenants(items);
        }
      });
      },
      // 过滤供应商数据
      querySelectTenants(items){
        let that = this;
        that.supplierTenantList = [];
        if(that.currentTab.selectType == 1){
            for(let i in items){
               if(items[i].tenantType == 3){
                that.supplierTenantList.push(items[i]);
               }
            }
        }else{
          for(let i in items){
            if(items[i].tenantType != 3){
              that.supplierTenantList.push(items[i]);
            }
         }
        }
      },

      // 查询供应商组织
      queryOrg(){
        // 供应商 组织
        let params = {};
        let that = this;
        if(that.common.isBlank(this.order.supplierTenantId)){
           that.$message({"type":"success", message: "请选择先选择供应商信息"});   
           return;
        }
        params.tenantId = this.order.supplierTenantId;
        that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysOrgInfoList", params,function(data){
          if(that.common.isNotBlank(data) && that.common.isNotBlank(data.items)){
            that.orgList = data.items;
            that.orgList.unshift({"orgId":"-1","orgFullName":"无"});
          }
        });
      },
       // 2、修改/查看  1新增
      initHtml(type){
         if(type !=2 ){
            this.queryBatchAlias();
            this.order.transitType = "1";
            let orders = this.tableData;
            let packageVolume = 0
            let packageWeight = 0
            let packageNumber = 0
            this.order = this.common.copyObj(this.orderTem);
            for(let i in orders){
              packageVolume = this.common.isBlank(orders[i].packageVolume) ? 0 : packageVolume + parseFloat(orders[i].packageVolume);
              packageWeight = this.common.isBlank(orders[i].packageWeight) ? 0 : packageWeight + parseFloat(orders[i].packageWeight);
              packageNumber = this.common.isBlank(orders[i].packageNumber) ? 0 : packageNumber + parseInt(orders[i].packageNumber);
            }
            this.order.packageVolume = packageVolume.toFixed(2);
            this.order.packageWeight = packageWeight.toFixed(2);
            this.order.packageNumber = packageNumber;
            this.order.fee.paymentType = "3";
            this.order.combinedSts = "2";
            this.order.transitType = "1";
         }
      },
      // 修改/查看  1 修改 2 查看
      initOut(type,batchNum){
        let params = {};
        let that = this;
        params.batchNum = batchNum
        that.common.postUrl("api/ordTransitOutgoingBO.ajax?cmd=queryTransitDetail", params,function(data){
            // console.log(data);
            that.tableData = data.details;
            that.order = Object.assign({}, that.order, data.depart);
            that.order.fee = Object.assign({}, that.order.fee, data.fee);
            if(that.currentTab.selectType == 1){
              if(that.common.isNotBlank(data.fee.paymentType) && data.fee.paymentType != 6){
                 that.initHead(2);
              }else{
                 that.initHead(1);
              }
            }else if(that.currentTab.selectType == 2){
              if(that.common.isNotBlank(data.fee.paymentType) &&  data.fee.paymentType != 6){
                 that.initHead(4);
              }else{
                 that.initHead(3);
             }
            }
            if(that.order.sourceDeliverWay > 0){
              that.order.sourceDeliverWay = that.order.sourceDeliverWay+"";
            }else{
              that.order.sourceDeliverWay = "";
            }
            if(that.order.destDeliverWay > 0){
              that.order.destDeliverWay = that.order.destDeliverWay+"";
            }else{
              that.order.destDeliverWay = "";
            }
            // 网点获取
            that.queryOrg();
            that.order.sourceOrgId = "-1";
            that.order.destOrgId = "-1";
            setTimeout(function(){
              if(data.depart.sourceOrgId > 0){
                that.order.sourceOrgId = data.depart.sourceOrgId;
              }
              if(data.depart.destOrgId > 0){
                that.order.destOrgId = data.depart.destOrgId;
              }
              that.forceUpdate();
            },200);
            
            that.order.combinedSts =  that.order.combinedSts+"";
            that.order.transitType =  that.order.transitType+"";
            that.order.fee.paymentType = that.order.fee.paymentType+"";
            if(that.common.isNotBlank(data.fee.divideType)){
              that.order.fee.divideType = that.order.fee.divideType+"";
            }
            if(that.order.fee.divideType > 0){
              that.order.fee.divideType = that.order.fee.divideType+"";
            }else{
              that.order.fee.divideType = "";
            }
            if(that.common.isNotBlank(that.order.packageVolume)){
              that.order.packageVolume = parseFloat(that.order.packageVolume).toFixed(2);
            }
            if(that.common.isNotBlank(that.order.packageWeight)){
              that.order.packageWeight = parseFloat(that.order.packageWeight).toFixed(2);
            }
            if(that.common.isBlank(data.fee.otherFeeName)){
               that.order.fee.otherFeeName = "其它费";
            }
            if(that.currentTab.selectType == 1){
              that.order.outgoingTrackingNum = items[0].outgoingTrackingNum;// 设置默认单号
            }
           
        },null,null,true);
      },
      // 选择目的区域
      selectDestRegion(data){
        this.order.destTenantId = data.tenantId;
        this.order.destRegionId = data.regionId;
        this.order.destRegionName = data.regionName;
      },
      // 选择供应商
      selectSupplierTenant(selectObj){
        let that = this;
        this.order.supplierInfo = selectObj.tenantPrincipal + " " + selectObj.tenantPhone
        this.order.supplierTenantId = selectObj.tenantId;//	 供应商Id
        this.order.supplierTenantName = selectObj.tenantFullName;//	 供应商Id
        this.order.sourceOrgId = "";
        this.order.destOrgId = "";
        this.selectSupplierTenantTab = {};
        this.queryProject(function(data){
           that.selectSupplierTenantTab = data;
            if(data.projectFlag){
               that.$message({"type":"success", message: "您所选择是系统对接供应商，请注意"});   
            }
        });

      },
      // 查询是否需要系统对接-需要提示-相关信息
      queryProject(callback){
        let params = {};
        let that = this;
        params.supplierTenantId = this.order.supplierTenantId;
        that.common.postUrl("api/kdBusinessParamBO.ajax?cmd=checkSupplierProject", params,function(data){
           if(that.common.isNotBlank(callback)){
              callback(data);
           }
        });
      },
      // 物流-改变费用
      changeFee (){
          let fee = this.order.fee;
          debugger
          //  合计 费用
          let totalFeeDouble = 0;
          this.order.fee.totalFeeDouble = 0;
          for(let i in this.feeTotalKeys){
             let m = this.common.isNotBlank(fee[this.feeTotalKeys[i]]) ? parseFloat(fee[this.feeTotalKeys[i]]) : 0;
             totalFeeDouble = totalFeeDouble + m;
          }
          this.order.fee.totalFeeDouble = totalFeeDouble.toFixed(2);
          let divideType = this.order.fee.divideType;
          let orders = this.tableData;
          let orderSize = orders.length;
          if(totalFeeDouble < 0){
              // 不处理
              // return;
          }
          this.initHead(1);
          if(orderSize == 1){
             orders[0].divideFeeDouble = totalFeeDouble;
             this.initHead(2);
          }else{
              //  分摊费用
            if(divideType == 1){
                // 按运单数平均分摊
                this.calFee(totalFeeDouble,orderSize);
            }else if(divideType == 2){
              // 运费占比分摊
              // 运费全部不存在 （按照平均单分配）
              let divideValue = this.checkDivideSelect("orderIncomeDouble",orders);
              if(divideValue <= 0){
                 this.$message({"type":"success", message: "所有运单运费未填入，默认按照运单分配"});   
                 this.calFee(totalFeeDouble,orderSize);
                 return;
              }
              this.calFee(totalFeeDouble,divideValue,"orderIncomeDouble");
    
            }else if(divideType == 3){
              // 按配载件数占比分摊
              let divideValue = this.checkDivideSelect("transferPackageNumber",orders);
              if(divideValue <= 0){
                 this.$message({"type":"success", message: "所有运单打包件数未填入，默认按照运单分配"});   
                 this.calFee(totalFeeDouble,orderSize);
                 return;
              }
              this.calFee(totalFeeDouble,divideValue,"transferPackageNumber");
            }else if(divideType == 4){
              // 按配载重量占比分摊
              let divideValue = this.checkDivideSelect("packageWeight",orders);
              if(divideValue <= 0){
                 this.$message({"type":"success", message: "所有运单打包重量未填入，默认按照运单分配"});   
                 this.calFee(totalFeeDouble,orderSize);
                 return;
              }
              this.calFee(totalFeeDouble,divideValue,"packageWeight");
            }else if(divideType == 5){
              // 按配载体积占比分摊
              let divideValue = this.checkDivideSelect("packageVolume",orders);
              if(divideValue <= 0){
                 this.$message({"type":"success", message: "所有运单打包体积未填入，默认按照运单分配"});   
                 this.calFee(totalFeeDouble,orderSize);
                 return;
              }
              this.calFee(totalFeeDouble,divideValue,"packageVolume");
            }else if(divideType == 6){
              // 自定义分摊
              // for(let i in orders){
              //     orders[i].divideFeeDouble = 0;
              // }
              this.initHead(2);
            }
          }
          this.forceUpdate();
      },
      // 快运快递 选择费用
      selectTotalFee(){
         debugger
        let fee = this.order.fee;
          //  合计 费用
          let totalFeeDouble = this.order.fee.totalFeeDouble;
          let divideType = this.order.fee.divideType;
          let orders = this.tableData;
          let orderSize = orders.length;
          if(this.common.isBlank(totalFeeDouble) || totalFeeDouble < 0){
              // 不处理
              totalFeeDouble = "";
              // return;
          }
          this.initHead(3);
          if(orderSize == 1){
            orders[0].divideFeeDouble = totalFeeDouble;
            this.initHead(4);
          }else{
              //  分摊费用
            if(divideType == 1){
                // 按运单数平均分摊
                this.calFee(totalFeeDouble,orderSize);
            }else if(divideType == 2){
              // 运费占比分摊
              // 运费全部不存在 （按照平均单分配）
              let divideValue = this.checkDivideSelect("orderIncomeDouble",orders);
              if(divideValue <= 0){
                 this.$message({"type":"success", message: "所有运单运费未填入，默认按照运单分配"});   
                 this.calFee(totalFeeDouble,orderSize);
                 return;
              }
              this.calFee(totalFeeDouble,divideValue,"orderIncomeDouble");
    
            }else if(divideType == 3){
              // 按配载件数占比分摊
              let divideValue = this.checkDivideSelect("transferPackageNumber",orders);
              if(divideValue <= 0){
                 this.$message({"type":"success", message: "所有运单打包件数未填入，默认按照运单分配"});   
                 this.calFee(totalFeeDouble,orderSize);
                 return;
              }
              this.calFee(totalFeeDouble,divideValue,"transferPackageNumber");
            }else if(divideType == 4){
              // 按配载重量占比分摊
              let divideValue = this.checkDivideSelect("packageWeight",orders);
              if(divideValue <= 0){
                 this.$message({"type":"success", message: "所有运单打包重量未填入，默认按照运单分配"});   
                 this.calFee(totalFeeDouble,orderSize);
                 return;
              }
              this.calFee(totalFeeDouble,divideValue,"packageWeight");
            }else if(divideType == 5){
              // 按配载体积占比分摊
              let divideValue = this.checkDivideSelect("packageVolume",orders);
              if(divideValue <= 0){
                 this.$message({"type":"success", message: "所有运单打包体积未填入，默认按照运单分配"});   
                 this.calFee(totalFeeDouble,orderSize);
                 return;
              }
              this.calFee(totalFeeDouble,divideValue,"packageVolume");
            }else if(divideType == 6){
              // 自定义分摊
              // for(let i in orders){
              //     orders[i].divideFeeDouble = 0;
              // }
              this.initHead(4);
            }
          }
          this.forceUpdate();
      },
      // 分摊费用 
      calFee(moneys,divideValue,filedName){
        // 计算公式：{[（配载件数/开单件数）*收入合计] / 批次总收入合计 }* 该批次配载大车费（或其他费总和）
        // 配载件数 = 开单件数
        // 最后 = 总数 - 前面之和
        debugger
        let feeSy = moneys;
        let j = 1;
        let orders = this.tableData;
        let orderSize = orders.length;
        for(let i in orders){
          let currentFee = "";
           if(this.common.isBlank(filedName)){
              // 按照单数 平均分
              currentFee = (moneys/divideValue).toFixed(2);
           }else{
            if(this.common.isNotBlank(orders[i][filedName])){
              currentFee = ((orders[i][filedName]/divideValue) * moneys) .toFixed(2);
            }else{
              currentFee = 0;
            }
           
           }
           if(j == orderSize){
              orders[i].divideFeeDouble = feeSy;
           }else{
              feeSy =  ((feeSy * 10000 - parseFloat(currentFee) * 10000) /10000).toFixed(2);
              orders[i].divideFeeDouble = currentFee;
           }
           j++;
        }
        this.forceUpdate();
      },
      // 校验是否全部数据不存在 （分摊原始数据）
      checkDivideSelect(filedName,orders){
          let divideValue = 0;
          for(let i in orders){
            if(this.common.isBlank(orders[i][filedName]) || orders[i][filedName] <= 0){
               divideValue = divideValue +  0;
            }else{
               divideValue = divideValue + parseFloat(orders[i][filedName]);
            }
          }
          return divideValue;
      },
      // 输入外发单号
      selectOutgoingTrackingNum(){
        let tableData = this.tableData;
        for(let i in tableData){
          tableData[i].outgoingTrackingNum = this.order.outgoingTrackingNum;
       }
       this.forceUpdate();
      },
      // 移除运单
      delTabOrders(){
        let that = this;
        let tableData = this.tableData;
        if(tableData.length == 1){
          this.$message({"type":"success", message: "最后一条无法移除"});   
          return;
        }
        let delOrders = [];
        for(let i in tableData){
           if(tableData[i].select){
              delOrders.push(tableData[i]);
           }
        }
        if(delOrders.length <= 0){
          that.$message({"type":"success", message: "未选择移除运单信息"});   
          return;
        }
        if(delOrders.length == tableData.length){
          that.$message({"type":"success", message: "不可全部移除"});   
          return;
        }
        let newTableData = [];
        for(let i in tableData){
           if(!tableData[i].select){
               newTableData.push(tableData[i]);
           }
        }
        this.tableData = newTableData;
        for(let i in tableData){
          tableData[i].select = false;
        }

        if(this.currentTab.selectType == 1){
          this.changeFee(); // 物流费用分配变动
        }else{
          this.selectTotalFee();; // 快递费用分配变动
        }
        this.forceUpdate();
        
      },
      // 初始化 自定义单号
      queryBatchAlias(){
        let params = {};
        let that = this;
        that.common.postUrl("api/ordTransitOutgoingBO.ajax?cmd=queryBatchNumAliasTwo", params,function(data){
          that.order.batchNumAlias = data;
        });
      },
      // 保存
      saveOrUpdate(){
        let that = this;
        let order = this.order;
        if(that.common.isNotBlank(that.selectSupplierTenantTab.morePackage) 
                 && that.selectSupplierTenantTab.morePackage == 2 && order.combinedSts == 2){
          that.$message({"type":"success", message: "选择供应商不支持合单的配载方式，请选择分单"});   
          return;
        }
        if(this.checkOrder()){
          let params = {};
          params.orderstr = JSON.stringify(order);
          that.common.postUrl("api/ordTransitOutgoingBO.ajax?cmd=saveOrUpdateTwo", params,function(data){
            if(that.common.isNotBlank(data)){
              if(that.outModify){
                that.$message({"type":"success", message: "修改成功"});   
                // 退出当前页面
                that.closeTab();
              }else{
                that.$message({"type":"success", message: "保存成功，批次号："+order.batchNumAlias+"，共"+order.details.length+"单。"});   
                // 是否继续处理
                that.$confirm('是否继续新增', {
                  confirmButtonText: '上一步',
                  cancelButtonText: '关闭',
                  type: 'warning'
                }).then(() => {
                  // 上一步
                  that.goback([]);
                }).catch(() => {
                  // 关闭
                  that.closeTab();
                });
              }
            }
          },null,null,true);
        }
       
      },
      // 校验是否保存
      checkOrder(){
        let that = this;
        let order = this.order;
        if(that.common.isBlank(order.supplierTenantId)){
          that.$message({"type":"success", message: "请选择外发供应商"});   
          return false;
        }
        if(that.common.isBlank(order.fee.paymentType)){
          that.$message({"type":"success", message: "请选择结算方式"});   
          return false;
        }
        this.order.details = [];
        let orders = this.tableData;
        if(orders.length <= 0){
          that.$message({"type":"success", message: "请选择外发单信息"});   
          return false;
        }
        let totalFeeDouble = 0;
        for(let i in orders){
            let o = orders[i];
            let d = {};
            d.orderId = o.orderId;
            d.outgoingTrackingNum = o.outgoingTrackingNum;
            d.outgoingFeeDouble = o.divideFeeDouble;
            d.packageVolume = o.transferPackageVolume;
            d.packageWeight = o.transferPackageWeight;
            d.packageNumber = o.transferPackageNumber;
            d.childOrderNo = o.transitTrackingNum; // 子单号
            d.transitId = o.outgoingId;
            this.order.details.push(d);
            totalFeeDouble = totalFeeDouble + (this.common.isBlank(d.outgoingFeeDouble) ? 0 :  parseFloat(d.outgoingFeeDouble));
        }
        if(this.currentTab.selectType == 2 && this.order.combinedSts == 1 ){
           this.order.fee.totalFeeDouble = totalFeeDouble;
           this.order.fee.freightDouble = totalFeeDouble;
        }
        let totalFeeLong = Math.round(totalFeeDouble * 100);
        let totalFeeLongOld = this.common.isBlank(this.order.fee.totalFeeDouble) ? 0  :  Math.round(parseFloat(this.order.fee.totalFeeDouble) * 100);
        if(totalFeeLong != totalFeeLongOld){
          that.$message({"type":"success", message: "中转成本不等于每单成本之和，无法保存，请修改后再保存"});   
          return false;
        }
        return true;
      },
      // 初始化-表头 （专线物流） 1 默认进来 （新增字段不可填）-> 或者选择非自定义分摊类型 或者切换回来
      // 初始化-表头 （快递快运） 3 默认   4 、费用自定义输入
      initHead(type){
        this.head = this.common.copyObj(this.headList);
        if(type == 1){
          let obj = {"name":"中转费用（分摊）","code":"divideFeeDouble","type" : "text","width":"120","isEdit":false}
          this.head.splice(3,0,obj);  //在第四个插入一个对象
        }else if(type == 2){
          let obj = {"name":"中转费用（分摊）","code":"divideFeeDouble","type" : "text","width":"120","isEdit":true}
          this.head.splice(3,0,obj);  //在第四个插入一个对象
        }else if(type == 3){
          let obj = {"name":"中转单号","code":"outgoingTrackingNum","type" : "text","width":"120","isEdit":true}
          this.head.splice(3,0,obj);   
          let obj2 = {"name":"中转费用(分摊)","code":"divideFeeDouble","type" : "text","width":"120","isEdit":false}
          this.head.splice(4,0,obj2); 
          let obj3 = {"name":"中转件数","code":"transferPackageNumber","type" : "text","width":"120","isEdit":false}
          this.head.splice(5,0,obj3);
          let obj4 = {"name":"中转体积（方）","code":"transferPackageVolume","type" : "text","width":"120","isEdit":true}
          this.head.splice(6,0,obj4);
          let obj5 = {"name":"中转重量（公斤）","code":"transferPackageWeight","type" : "text","width":"120","isEdit":true}
          this.head.splice(7,0,obj5);
        }else if(type == 4){
          let obj = {"name":"中转单号","code":"outgoingTrackingNum","type" : "text","width":"120","isEdit":true}
          this.head.splice(3,0,obj);   
          let obj2 = {"name":"中转费用(分摊)","code":"divideFeeDouble","type" : "text","width":"120","isEdit":true}
          this.head.splice(4,0,obj2); 
          let obj3 = {"name":"中转件数","code":"transferPackageNumber","type" : "text","width":"120","isEdit":false}
          this.head.splice(5,0,obj3);
          let obj4 = {"name":"中转体积（方）","code":"transferPackageVolume","type" : "text","width":"120","isEdit":true}
          this.head.splice(6,0,obj4);
          let obj5 = {"name":"中转重量（公斤）","code":"transferPackageWeight","type" : "text","width":"120","isEdit":true}
          this.head.splice(7,0,obj5);
        }

      },

      // 选择 TAB
      selectCallback(data) {
        this.currentTab = data;
        this.tableData = [];
        this.tableData = this.common.copyObj(this.tableDataTem);
        this.$message({"type":"success", message: "切换到"+data.name+",之前填写数据清空。"});   
        this.initHtml(1);
        this.querySelectTenants(this.supplierTenantListTem);
        // 切换 TAB 行列数据处理 
        if(data.selectType == 1){
          this.changeFee();
        }else{
          this.order.combinedSts = "1" //默认分单
          this.selectTotalFee();
        }
        this.forceUpdate();

      },
      editOtherFee(){
        this.showOtherFeeEdit = true;
      },
      sureEditOtherFee(){
        this.showOtherFeeEdit = false;
      },
      goback(data){ //返回上一页
        debugger
        if(this.common.isBlank(data)){
          this.$emit("goback",this.tableData)
        }else{
          this.$emit("goback",data)
        }
      },
      closeTab(){
        this.$emit('closeTab', this.$route.meta.id);
      },
   // 默认值 select BUG  @change="forceUpdate()"
    forceUpdate(){
     this.$forceUpdate();
    },
    },
    components: {
      innerTab
    }
  }