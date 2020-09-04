  import innerTab from "@/components/innerTab/innerTab.vue"
  import {tabs} from './json.js'

  export default {
    name: 'transferAddDetail',
    props: ['parentTableData','headList'],
    data() {
      return {
        head:[],
        tableData :[],
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
        vehicleList:[],//车辆信息
        selectDepartDivideTypeTypeList:[],// 费用分摊
        selectVehicleAttributesList:[],// 车辆属性
        selectDepartBusiTypeList:[],// 派车类型
      
        orderTem :{},
        departTem :{},
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
              upstairFeeDouble:"", // 上楼费
              facelistFeeDouble:"", // 面单费
              floatingPriceDouble:"", // 到付上浮费
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
        depart :{
          batchNum:"",
          batchNumAlias:"",
          destRegionId:"",
          destRegionName:"",
          destTenantId:"",
          plateNumber:"",
          driverId:"",
          driverName:"",
          driverBill:"",
          vehicleId:"",
          orderNum:"",
          packageVolume:"",
          packageWeight:"",
          packageNumber:"",
          combinedSts:"-1",
          remarks:"",
          eginCarMileage:"",
          endCarMileage:"",
          beginOilMeter:"",
          endOilMeter:"",
          currentSelectType:"",
          vehicleAttributes:"",
          departBusiType:"",
        
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
             upstairFeeDouble:"", // 上楼费
             facelistFeeDouble:"", // 面单费
             floatingPriceDouble:"", // 到付上浮费
             otherFeeName:"其他费",
          },
          details:[
            {
               orderId: "",
               detaiId: "",
               divideFeeDouble:"",
               divideOrderFeeDouble:"",
               packageCount:"",
             
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
          "upstairFeeDouble", // 上楼费
          "facelistFeeDouble",// 面单费
          "floatingPriceDouble",// 到付上浮费
          "otherFeeDouble"
        ],
      }
    },
    mounted() {
      this.tableData = this.common.copyObj(this.parentTableData);
      if(this.common.isBlank(this.tableData)){
        this.tableData = [];
      }
      for(let i in this.tableData){
        let order = this.tableData[i];
        this.tableData[i].transferPackageVolume = 0;
        this.tableData[i].transferPackageWeight = 0;
        this.tableData[i].transferPackageVolume = this.divideGoods(order.packageNumber,order.checkNumber,order.packageVolume).toFixed(2);
        this.tableData[i].transferPackageWeight = this.divideGoods(order.packageNumber,order.checkNumber,order.packageWeight).toFixed(2);
      }
      this.orderTem = this.common.copyObj(this.order);
      this.departTem = this.common.copyObj(this.depart);
      let batchNum = this.$route.query.batchNum;
      let batchNumAlias = this.$route.query.batchNumAlias;
      let type = this.$route.query.type; // 0 物流 1 快递专线 2 直提直送
      let viewFlag = this.$route.query.view ;
      let view = true;
      if((viewFlag + "") == "false"){
        view = false;
      }
      if(this.common.isNotBlank(batchNum)){
        this.outView = view ;
        if(!view){
           this.outModify = true;
        }
        this.initSysStaticData(2);
        this.currentTab = this.tabs[type];
        this.currentTab.active = true;
        this.tabs = [];
        this.tabs.push(this.currentTab);
        if(this.currentTab.selectType == 3){
          this.initDepart(view ? 2 : 1,batchNum);
        }else{
          this.initOut(view ? 2 : 1,batchNum);
        }
        
      }else{
        this.initSysStaticData(1);
        this.currentTab = this.tabs[0];
        
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
        codeTypes.push("VEHICLE_ATTRIBUTES");
        codeTypes.push("DEPART_BUSI_TYPE");
    
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

          that.selectVehicleAttributesList = data.VEHICLE_ATTRIBUTES;
          that.selectDepartBusiTypeList = data.DEPART_BUSI_TYPE;
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
      params.tenantStatus = 1;
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
       // 查询车辆信息
     queryVehicle(){
        // 车辆 组织
        let params = {};
        let that = this;
        that.common.postUrl("api/sysVehicleBO.ajax?cmd=getSysVehicleInfoList", params,function(data){
          console.log(data);
          if(that.common.isNotBlank(data) && that.common.isNotBlank(data.items)){
            that.vehicleList = data.items;
            that.vehicleList.unshift({"vehicleId":"-1","vehicleCode":""});
          }
        });
      },
       // 2、修改/查看  1新增
      initHtml(type){
         if(type !=2 ){
            if(this.currentTab.selectType == 3){
              this.queryDepartBatchAlias();
              this.queryVehicle();
              this.depart = this.common.copyObj(this.departTem);
              this.sumOrder();
            }else{
              this.queryBatchAlias();
              this.order = this.common.copyObj(this.orderTem);
              this.order.transitType = "1";
              
              this.sumOrder();
              this.order.fee.paymentType = "3";
              this.order.combinedSts = "2";
              this.order.transitType = "1";
            }
           
         }
      },
      // 合计处理
      sumOrder(){
        let orders = this.tableData;
        let packageVolume = 0
        let packageWeight = 0
        let packageNumber = 0
        for(let i in orders){
          packageVolume = packageVolume + this.divideGoods(orders[i].packageNumber,orders[i].checkNumber,orders[i].packageVolume);
          packageWeight = packageWeight + this.divideGoods(orders[i].packageNumber,orders[i].checkNumber,orders[i].packageWeight);
          packageNumber = this.common.isBlank(orders[i].checkNumber) ? 0 : packageNumber + parseInt(orders[i].checkNumber);
        }
        this.order.packageVolume = packageVolume.toFixed(2);
        this.order.packageWeight = packageWeight.toFixed(2);
        this.order.packageNumber = packageNumber;
      },
      // 输入框操作
      selectInput(obj){
        //  obj.transferPackageVolume = this.divideGoods(obj.packageNumber,obj.checkNumber,obj.packageVolume);
        //  obj.transferPackageWeight = this.divideGoods(obj.packageNumber,obj.checkNumber,obj.packageWeight);
         this.sumOrder();
         this.forceUpdate();
         if(this.currentTab.selectType == 1){
           this.changeFee();
         }else{
           this.selectTotalFee();
         }
         this.forceUpdate();
      },

      // 修改/查看  1 修改 2 查看-中转
      initOut(type,batchNum){
        let that = this;
        // 修改再次进入
        let modifyFlag = false;
        if(that.common.isNotBlank(this.tableData) && this.tableData.length > 0){
           modifyFlag = true
        }
        let params = {};
        params.batchNum = batchNum
        that.common.postUrl("api/ordTransitOutgoingBO.ajax?cmd=queryTransitDetail", params,function(data){
            let items = data.details;

            for(let j in items){
              items[j].checkNumber = items[j].packageNumber;
            }
            if(!modifyFlag){
              // 非再次修改进入 
              that.tableData = items;
            }
            
            // that.order = data.depart;
            that.order = Object.assign({}, that.order, data.depart);
            that.order.fee = Object.assign({}, that.order.fee, data.fee);
            if(that.currentTab.selectType == 1){
              if(that.common.isNotBlank(data.fee.divideType) && data.fee.divideType != 6){
                 that.initHead(2);
              }else{
                 that.initHead(1);
              }
            }else if(that.currentTab.selectType == 2){
              if(that.common.isNotBlank(data.fee.divideType) &&  data.fee.divideType != 6){
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
              that.order.packageVolume = parseFloat(that.order.packageVolume).toFixed(4);
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
           that.forceUpdate();
           
           
        },null,null,true);
      },
      // 直提直送
      initDepart(type,batchNum){
        let that = this;
        // 修改再次进入
        let modifyFlag = false;
        if(that.common.isNotBlank(this.tableData) && this.tableData.length > 0){
           modifyFlag = true
        }
        let params = {};
        params.batchNum = batchNum
        that.common.postUrl("api/ordDepartInfoBO.ajax?cmd=queryDepartDetail", params,function(data){
            let items = data.details;
            for(let j in items){
              items[j].checkNumber = items[j].packageCount;
            }
            if(!modifyFlag){
               // 非再次修改进入 
               that.tableData = items;
            }

            that.depart = Object.assign({}, that.order, data.depart);
            that.depart.fee = Object.assign({}, that.order.fee, data.fee);
            if(that.common.isNotBlank(data.fee.divideType) && data.fee.divideType != 6){
               that.initHead(88);
            }else{
               that.initHead(87);
            }
 
            if(that.depart.fee.divideType > 0){
              that.depart.fee.divideType = that.depart.fee.divideType+"";
            }else{
              that.depart.fee.divideType = "";
            }
            if(that.depart.departBusiType > 0){
              that.depart.departBusiType = that.depart.departBusiType+"";
            }else{
              that.depart.departBusiType = "";
            }
            if(that.depart.vehicleAttributes > 0){
              that.depart.vehicleAttributes = that.depart.vehicleAttributes+"";
            }else{
              that.depart.fee.vehicleAttributes = "";
            }
            if(that.common.isNotBlank(that.depart.packageVolume)){
              that.depart.packageVolume = parseFloat(that.depart.packageVolume).toFixed(4);
            }
            if(that.common.isNotBlank(that.depart.packageWeight)){
              that.depart.packageWeight = parseFloat(that.depart.packageWeight).toFixed(2);
            }
            if(that.common.isBlank(data.fee.otherFeeName)){
                that.depart.fee.otherFeeName = "其它费";
            }
           that.forceUpdate();
           
        },null,null,true);
      },
      // 选择目的区域
      selectDestRegion(data){
        this.order.destTenantId = data.tenantId;
        this.order.destRegionId = data.regionId;
        this.order.destRegionName = data.regionName;
      },
      // 选择供应商
    async selectSupplierTenant(selectObj){
        let that = this;
        that.order.supplierInfo = selectObj.tenantPrincipal + " " + selectObj.tenantPhone
        that.order.supplierTenantId = selectObj.tenantId;//	 供应商Id
        that.order.supplierTenantName = selectObj.tenantFullName;//	 供应商Id
        that.order.sourceOrgId = "";
        that.order.destOrgId = "";
        that.selectSupplierTenantTab = {};
        that.queryProject(function(data){
           that.selectSupplierTenantTab = data;
            if(data.projectFlag){
               that.$message({"type":"success", message: "您所选择是系统对接供应商，请注意"});   
            }
        });
        // 预估费用信息
        that.preSupplierPriceUtils();
      },
      // 选择 车牌
      selectPlateNumber(data){
        console.log(data);
        let that = this;
        that.depart.plateNumber = data.vehicleCode;
        that.depart.vehicleId = data.vehicleId;
        that.depart.driverId = data.driverId;
        that.depart.driverName = data.driverName;
        that.depart.driverBill = data.driverPhone;
        if(that.common.isNotBlank(data.vehicleAttributes) && data.vehicleAttributes  >0){
          that.depart.vehicleAttributes = data.vehicleAttributes+"";
        }
        
      },
      // 输入车牌号信息
      queryInputPlateNumber(e){
        let that = this;
        that.depart.plateNumber =  e.target.value;
        that.depart.vehicleId = "";
        that.depart.driverId = "";
        that.depart.driverName = "";
        that.depart.driverBill = "";
        that.depart.vehicleAttribution = "";
      },
      // 选择始发网点
     async selectSourceOrg(selectObj){
        let that = this;
        let params = {};
        params.orgId = selectObj;
        that.sourceOrgObj = null;
        if(params.orgId <= 0){
           return;
        }
        let data  = await that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysOrgInfoId", params);
        that.sourceOrgObj = data;
        console.log(that.sourceOrgObj);
        that.preSupplierPriceUtils(that.sourceOrgObj,that.destOrgObj);
      },
      // 选择目的网点
     async selectDestOrg(selectObj){
        let that = this;
        let params = {};
        params.orgId = selectObj;
        that.destOrgObj = null;
        if(params.orgId <= 0){
           return;
        }
        let data  = await that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysOrgInfoId", params);
        that.destOrgObj = data;
        console.log(that.destOrgObj);
        that.preSupplierPriceUtils(that.sourceOrgObj,that.destOrgObj);
      },
      // 预估费用信息
     async  preSupplierPriceUtils(){
          let that = this;
         
          if(that.currentTab.selectType == 1){
             if(that.common.isNotBlank(that.order.batchNum) && that.order.batchNum > 0 && that.order.fee.totalFeeDouble <= 0){
              return;;
            }
            // 到客户 -> 计算每个单价格循环计算 TODO
            // 找到一条记录
            let orders = this.tableData;
            let o = orders[0];
            let params = {};
            params.supplierTenantId = that.order.supplierTenantId;
            params.supplierTenantName = that.order.supplierTenantName;
           
            if(that.common.isNotBlank(that.sourceOrgObj)){
              console.log("始发网点下单>>>>>>>>>>>>>>>>>>>>");
              params.sourceProvince =  that.sourceOrgObj.provinceId;
              params.sourceCity = that.sourceOrgObj.cityId;
              params.sourceCounty = that.sourceOrgObj.districtId;
            }else{
              params.sourceProvince = o.sourceProvince;
              params.sourceCity = o.sourceCity;
              params.sourceCounty = o.sourceCounty;
            }

            if(that.common.isNotBlank(that.destOrgObj)){
               console.log("目的网点下单>>>>>>>>>>>>>>>>>>>>");
               params.destProvince = that.destOrgObj.provinceId;
               params.destCity = that.destOrgObj.cityId;
               params.destCounty =  that.destOrgObj.districtId;
            }else{
               params.destProvince = o.destProvince;
               params.destCity = o.destCity;
               params.destCounty = o.destCounty;
            }
            params.packageNumber = that.order.packageNumber;
            params.packageVolume = that.order.packageVolume;
            params.packageWeight = that.order.packageWeight;
            let orderFee =  await that.preSupplierPrice(params)
            console.log(orderFee);
            if(that.common.isNotBlank(orderFee) && orderFee.sumCost > 0){
                that.order.fee.totalFeeDouble = orderFee.sumCost;
                that.order.fee.freightDouble  = orderFee.sumCost;
                that.changeFee();
                that.$message({"type":"success", message: "自动预估费用成功"});   
            }
            
        }else if(that.currentTab.selectType == 2){
            
           if(that.common.isNotBlank(that.order.batchNum) && that.order.batchNum > 0){
              return;;
           }
            // 循环计算
            let orders = that.tableData;
            console.log(orders);
            let params = {};
            params.supplierTenantId = that.order.supplierTenantId;
            params.supplierTenantName = that.order.supplierTenantName;
            if(that.order.combinedSts == 1){
                // 分单 
                for(let i in orders){
                  let o = orders[i];
                  params.sourceProvince = o.sourceProvince;
                  params.sourceCity = o.sourceCity;
                  params.sourceCounty = o.sourceCounty;
                  params.destProvince = o.destProvince;
                  params.destCity = o.destCity;
                  params.destCounty = o.destCounty;
                  params.packageNumber = o.checkNumber;
                  params.packageVolume = o.transferPackageVolume;
                  params.packageWeight = o.transferPackageWeight;
                  let orderFee =  await that.preSupplierPrice(params)
                  console.log(orderFee);
                  if(that.common.isNotBlank(orderFee) && orderFee.sumCost > 0){
                    that.tableData[i].divideFeeDouble = orderFee.sumCost;
                    console.log("自动预估费用成功::::::"+that.tableData[i].divideFeeDouble);
                    // that.$message({"type":"success", message: "自动预估费用成功"});   
                  }
                }
            }else{
              let o = orders[0];
              params.sourceProvince = o.sourceProvince;
              params.sourceCity = o.sourceCity;
              params.sourceCounty = o.sourceCounty;

              params.destProvince = o.destProvince;
              params.destCity = o.destCity;
              params.destCounty = o.destCounty;
              
              params.packageNumber = that.order.packageNumber;
              params.packageVolume = that.order.packageVolume;
              params.packageWeight = that.order.packageWeight;
              // let packageNumber = 0;
              // let packageVolume = 0;
              // let packageWeight = 0;
              // for(let i in orders){
              //   let order = orders[i];
              //   packageNumber = packageNumber + that.common.isNotBlank(order.checkNumber) ? parseInt(order.checkNumber) : 0;
              //   packageVolume = packageVolume + that.common.isNotBlank(order.transferPackageVolume) ? parseFloat(order.transferPackageVolume) : 0;
              //   packageWeight = packageWeight + that.common.isNotBlank(order.transferPackageWeight) ? parseFloat(order.transferPackageWeight) : 0;
              // }
              // params.packageNumber = packageNumber;
              // params.packageVolume = packageVolume;
              // params.packageWeight = packageWeight;
              let orderFee =  await that.preSupplierPrice(params)
              console.log(orderFee);
              if(that.common.isNotBlank(orderFee) && orderFee.sumCost > 0){
                that.order.fee.totalFeeDouble = orderFee.sumCost;
                that.order.fee.freightDouble  = orderFee.sumCost;
                that.changeFee();
                that.$message({"type":"success", message: "自动预估费用成功"});   
              }

            }
            that.forceUpdate()
        }
      },
      // 预估价格   
      async preSupplierPrice(feeObj){
          let that = this;
          let params = {};
          if(this.common.isBlank(feeObj.supplierTenantId)){
             return null;
          }
          params.supplierTenantId = feeObj.supplierTenantId;
          params.supplierTenantName = feeObj.supplierTenantName;
          params.sourceProvince = feeObj.sourceProvince;
          params.sourceCity = feeObj.sourceCity;
          params.sourceCounty = feeObj.sourceCounty;
          params.destProvince = feeObj.destProvince;
          params.destCity = feeObj.destCity;
          params.destCounty = feeObj.destCounty;
          params.packageNumber = feeObj.packageNumber;
          params.packageVolume = feeObj.packageVolume;
          params.packageWeight = feeObj.packageWeight;
          let data  = await that.common.postUrl("api/ordTransitOutgoingBO.ajax?cmd=preSupplierPriceUtils", params);
          return data;
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
          // if(totalFeeDouble < 0){
          //     // 不处理
          //     return;
          // }
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
              let divideValue = this.checkDivideSelect("checkNumber",orders);
              if(divideValue <= 0){
                 this.$message({"type":"success", message: "所有运单打包件数未填入，默认按照运单分配"});   
                 this.calFee(totalFeeDouble,orderSize);
                 return;
              }
              this.calFee(totalFeeDouble,divideValue,"checkNumber");
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
          let fee = this.order.fee;
          //  合计 费用
          let totalFeeDouble = fee.totalFeeDouble;
          let divideType = fee.divideType;
          let orders = this.tableData;
          let orderSize = orders.length;
          if(this.common.isBlank(totalFeeDouble) || totalFeeDouble < 0){
              // 不处理
              totalFeeDouble = 0;
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
              let divideValue = this.checkDivideSelect("checkNumber",orders);
              if(divideValue <= 0){
                 this.$message({"type":"success", message: "所有运单打包件数未填入，默认按照运单分配"});   
                 this.calFee(totalFeeDouble,orderSize);
                 return;
              }
              this.calFee(totalFeeDouble,divideValue,"checkNumber");
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
        // 快运快递 选择费用
      selectDepartTotalFee(){
          let fee = this.depart.fee;
          //  合计 费用
          let totalFeeDouble = fee.totalFeeDouble;
          let divideType = fee.divideType;
          let orders = this.tableData;
          let orderSize = orders.length;
          if(this.common.isBlank(totalFeeDouble) || totalFeeDouble < 0){
              // 不处理
              totalFeeDouble = 0;
              // return;
          }
          this.initHead(87);
          if(orderSize == 1){
             orders[0].divideFeeDouble = totalFeeDouble;
             this.initHead(87);
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
              let divideValue = this.checkDivideSelect("checkNumber",orders);
              if(divideValue <= 0){
                 this.$message({"type":"success", message: "所有运单打包件数未填入，默认按照运单分配"});   
                 this.calFee(totalFeeDouble,orderSize);
                 return;
              }
              this.calFee(totalFeeDouble,divideValue,"checkNumber");
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
              this.initHead(88);
      
             
            }
          }
          this.forceUpdate();
      },
      // 选择 配载方式
      selectCombinedSts(){
        this.preSupplierPriceUtils();
        let combinedSts = this.order.combinedSts;
        if(combinedSts == 1){
            this.initHead(3);
        }else{
          this.initHead(5);
        }
      },
      // 分摊费用 
      calFee(moneys,divideValue,filedName){
        // 计算公式：{[（配载件数/开单件数）*收入合计] / 批次总收入合计 }* 该批次配载大车费（或其他费总和）
        // 配载件数 = 开单件数
        // 最后 = 总数 - 前面之和
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
        }else if(this.currentTab.selectType == 2){
          this.selectTotalFee();; // 快递费用分配变动
        }else if(this.currentTab.selectType == 3){
          this.selectDepartTotalFee();; // 直提直送分配变动
        }
        this.forceUpdate();
        
      },
      // 初始化 自定义单号-中转
      queryBatchAlias(){
        let params = {};
        let that = this;
        that.common.postUrl("api/ordTransitOutgoingBO.ajax?cmd=queryBatchNumAlias", params,function(data){
          that.order.batchNumAlias = data;
        });
      },
      // 初始化 自定义单号-直提直送(派车)
      queryDepartBatchAlias(){
        let params = {};
        params.departTypeAlias = "3";
        let that = this;
        that.common.postUrl("api/ordDepartInfoBO.ajax?cmd=queryBatchNumAlias", params,function(data){
          that.depart.batchNumAlias = data;
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
          that.common.postUrl("api/ordTransitOutgoingBO.ajax?cmd=saveOrUpdate", params,function(data){
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
                  that.goback(1,that.outModify);
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
            if(this.order.combinedSts == 2){
              d.outgoingTrackingNum = this.order.outgoingTrackingNum;
            }else{
              d.outgoingTrackingNum = o.outgoingTrackingNum;
            }
            
            d.outgoingFeeDouble = o.divideFeeDouble;
            d.packageNumber = o.checkNumber; // 拆单中转件数
            d.checkNumber = o.checkNumber; // 拆单中转件数
            if(this.common.isBlank(d.packageNumber)){
               that.$message({"type":"success", message: "未输入相关配载件数信息"});   
               return false;
            }
            d.packageWeight = o.transferPackageWeight;
            d.packageVolume = o.transferPackageVolume;
           
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
       // 保存-直提直送-派送
      saveOrUpdateDepart(){
        let that = this;
        let depart = this.depart;
        if(that.checkDepartOrder()){
          let params = {};
          params.orderstr = JSON.stringify(depart);
          that.common.postUrl("api/ordDepartInfoBO.ajax?cmd=saveOrUpdate", params,function(data){
            if(that.common.isNotBlank(data)){
              if(that.outModify){
                that.$message({"type":"success", message: "修改成功"});   
                // 退出当前页面
                that.closeTab();
              }else{
                that.$message({"type":"success", message: "派车保存成功，批次号："+depart.batchNumAlias+"，共"+depart.details.length+"单。"});   
                // 是否继续处理
                that.$confirm('是否继续新增', {
                  confirmButtonText: '上一步',
                  cancelButtonText: '关闭',
                  type: 'warning'
                }).then(() => {
                  // 上一步
                  that.goback(1,that.outModify);
                }).catch(() => {
                  // 关闭
                  that.closeTab();
                });
              }
            }
          },null,null,true);
        }
       
      },
      // 校验是否保存-直提直送
      checkDepartOrder(){
        let that = this;
        let depart = that.depart;
        if(that.common.isBlank(depart.departBusiType) || depart.departBusiType <= 0){
          that.$message({"type":"success", message: "请选择派车类型"});   
          return false;
        }
        if(that.common.isBlank(depart.plateNumber)){
          that.$message({"type":"success", message: "请选择车辆信息"});   
          return false;
        }
        if(that.common.isBlank(depart.driverName)){
          that.$message({"type":"success", message: "请输入派车司机"});   
          return false;
        }
        if(that.common.isBlank(depart.driverBill)){
          that.$message({"type":"success", message: "请输入派车司机联系方式"});   
          return false;
        }
        if(that.common.isBlank(depart.vehicleAttributes) || depart.vehicleAttributes <= 0){
          that.$message({"type":"success", message: "请选择车辆属性"});   
          return false;
        }
        depart.fee.paymentType = 3; // 默认月结
        that.depart.details = [];
        let orders = this.tableData;
        if(orders.length <= 0){
          that.$message({"type":"success", message: "请选择单信息"});   
          return false;
        }
        let totalFeeDouble = 0;
        let packageNumber = 0;
        let packageWeight = 0;
        let packageVolume = 0;
        for(let i in orders){
            let o = orders[i];
            let d = {};
            d.orderId = o.orderId;
            d.divideOrderFeeDouble = o.divideFeeDouble;
            d.divideFeeDouble = o.divideFeeDouble;
            d.packageNumber = o.checkNumber; // 派车件数
            d.packageCount = o.checkNumber; // 派车件数
            d.checkNumber = o.checkNumber;// 派车件数
            if(that.common.isBlank(d.packageNumber)){
               that.$message({"type":"success", message: "未输入相关配载件数信息"});   
               return false;
            }
            d.packageWeight = o.packageWeight;
            d.packageVolume = o.packageVolume;
            that.depart.details.push(d);
            totalFeeDouble = totalFeeDouble + (that.common.isBlank(d.divideOrderFeeDouble) ? 0 :  parseFloat(d.divideOrderFeeDouble));
            packageNumber = packageNumber + parseInt(d.packageNumber)
            packageWeight = packageWeight + (that.common.isNotBlank(d.packageWeight) ? parseFloat(d.packageNumber) : 0);
            packageVolume = packageVolume + (that.common.isNotBlank(d.packageVolume) ? parseFloat(d.packageVolume) : 0);
        }
     

        let totalFeeLong = Math.round(totalFeeDouble * 100);
        let totalFeeLongOld = that.common.isBlank(that.depart.fee.totalFeeDouble) ? 0  :  Math.round(parseFloat(that.depart.fee.totalFeeDouble) * 100);
        if(totalFeeLong != totalFeeLongOld){
          that.$message({"type":"success", message: "总费用不等于每单分摊之和，无法保存，请修改后再保存"});   
          return false;
        }
        that.depart.orderNum = that.depart.details.length;
        that.depart.packageNumber = packageNumber;
        that.depart.packageWeight = packageWeight;
        that.depart.packageVolume = packageVolume;
        // that.depart.fee.totalFeeDouble = totalFeeDouble;
        that.depart.fee.freightDouble = that.depart.fee.totalFeeDouble;
        return true;
      },

      // 初始化-表头 （专线物流） 1 默认进来 （新增字段不可填）-> 或者选择非自定义分摊类型 或者切换回来
      // 初始化-表头 （快递快运） 3 默认   4 、费用自定义输入 5、合单选择
      // 初始化-表头 直提直送  87 默认  88  费用自定义输入
      initHead(type){
        // {"name":"已配载件数","code":"outNumber","type" : "text","isSum":"true","width":"120"},
        // {"name":"本次配载件数","code":"checkNumber","type" : "type","isSum":"true","width":"120","isEdit":true},
        this.head = this.common.copyObj(this.headList);
        let check = {"name":"本次配载件数","code":"checkNumber","type" : "type","isSum":"true","width":"120","isEdit":true};
        if(type == 1){
          let obj = {"name":"中转费用（分摊）","code":"divideFeeDouble","type" : "text","width":"120","isEdit":false}
          this.head.splice(3,0,obj);  //在第四个插入一个对象
          // this.head.splice(5,0,check);   
        }else if(type == 2){
          let obj = {"name":"中转费用（分摊）","code":"divideFeeDouble","type" : "text","width":"120","isEdit":true}
          this.head.splice(3,0,obj);  //在第四个插入一个对象
          // this.head.splice(5,0,check);   
        }else if(type == 3){
          let obj = {"name":"中转单号","code":"outgoingTrackingNum","type" : "text","width":"120","isEdit":true}
          this.head.splice(3,0,obj);   
          let obj2 = {"name":"中转费用(分摊)","code":"divideFeeDouble","type" : "text","width":"120","isEdit":false}
          this.head.splice(4,0,obj2); 
          let obj4 = {"name":"中转体积（方）","code":"transferPackageVolume","type" : "text","width":"120","isEdit":true}
          this.head.splice(5,0,obj4);
          let obj5 = {"name":"中转重量（公斤）","code":"transferPackageWeight","type" : "text","width":"120","isEdit":true}
          this.head.splice(6,0,obj5);

          this.head.splice(8,0,check);
        }else if(type == 4){
          let obj = {"name":"中转单号","code":"outgoingTrackingNum","type" : "text","width":"120","isEdit":true}
          this.head.splice(3,0,obj);   
          let obj2 = {"name":"中转费用(分摊)","code":"divideFeeDouble","type" : "text","width":"120","isEdit":true}
          this.head.splice(4,0,obj2); 
          let obj4 = {"name":"中转体积（方）","code":"transferPackageVolume","type" : "text","width":"120","isEdit":true}
          this.head.splice(6,0,obj4);
          let obj5 = {"name":"中转重量（公斤）","code":"transferPackageWeight","type" : "text","width":"120","isEdit":true}
          this.head.splice(7,0,obj5);
          this.head.splice(8,0,check);
        }else if(type == 5){
          // 合单进入
          let obj2 = {"name":"中转费用(分摊)","code":"divideFeeDouble","type" : "text","width":"120","isEdit":true}
          this.head.splice(5,0,obj2); 
        }else if(type == 87){
          let obj2 = {"name":"派车费用(分摊)","code":"divideFeeDouble","type" : "text","width":"120","isEdit":false}
          this.head.splice(4,0,obj2); 
        }else if(type == 88){
          let obj2 = {"name":"派车费用(分摊)","code":"divideFeeDouble","type" : "text","width":"120","isEdit":true}
          this.head.splice(4,0,obj2); 
        }
        this.forceUpdate();
      },

      // 选择 TAB
      selectCallback(data) {
        // 查看 或者 修改
        if(this.outView || this.outModify){
            return;
        }
        this.currentTab = data;
        this.tableData = [];
        this.tableData = this.common.copyObj(this.tableDataTem);
        this.$message({"type":"success", message: "切换到"+data.name+",之前填写数据清空。"});   
        this.initHtml(1);
        this.querySelectTenants(this.supplierTenantListTem);
        // 切换 TAB 行列数据处理 
        if(data.selectType == 1){
          this.changeFee();
        }else if(data.selectType == 2){
          this.order.combinedSts = "1" //默认分单
          this.selectTotalFee();
        }else if(data.selectType == 3){
          this.order.combinedSts = "-1" //默认-1
          this.selectDepartTotalFee();
        }
       
       
        this.forceUpdate();

      },
      editOtherFee(){
        this.showOtherFeeEdit = true;
      },
      sureEditOtherFee(){
        this.showOtherFeeEdit = false;
      },
      goback(flag){ //返回上一页
        if(flag == 2){
          this.$emit("goback",this.tableData,this.outModify)
        }else{
          this.$emit("goback",[],this.outModify)
        }
      },
      closeTab(){
        this.$emit('closeTab', this.$route.meta.id);
      },
   // 默认值 select BUG  @change="forceUpdate()"
    forceUpdate(){
     this.$forceUpdate();
    },
    // 分割 重量体积
    divideGoods(all,departNumber,value){
       let that = this;
       if(this.common.isBlank(departNumber) || isNaN(departNumber) || departNumber <= 0 ){
         that.$message({"type":"success", message: "本次配载件数输入非法"});   
         return value;
       }

       if(this.common.isBlank(value)){
          return 0;
       }
       return departNumber/all * parseFloat(value);
    },
    },
    components: {
      innerTab
    }
  }