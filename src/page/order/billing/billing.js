import ipttable from '@/components/iptTable/iptTable.vue'
import mycity from '@/components/mycity/mycity.vue'
import printSet from "@/components/printSet/printSet.vue"
import dateRange from "@/components/dateRange/dateRange.vue"
import {head,headFee} from './billingJson.js'
import remark from './billingRemark.vue'
import lodopUtil from "@/utils/lodop/lodop-business.js"
import vuedraggable from 'vuedraggable'
import html2canvas from 'html2canvas'

export default {
    name: 'billing',
    data(){
      return {
        head,
        headFee,
        orderTem : {},// tem 主要用于重新开单用到
        orderFeeTem : {
          "otherFeeName":"其它费"
        },
        packingListObj : {
          items:{},
          itemType:1,
        },// 包装类型列表
        packListDialog:false, //是否展示包装数据
        remarkType:1,//备注类型
        selectValue: '',
        limitNum : "10", // 最近收货10条
        tableHisTitle : "最近收货10条数据", // 最近收货10条
        //最新发货人
        tableHisOrderData: [], 
        goodsViewData : [], // 货品明细
        latelyLinkmanBox:false, // 历史发货信息

        cashPaymentDoubleShow:true,
        freightCollectDoubleShow:true,
        monthlyPaymentDoubleShow:true,
        receiptPaymentDoubleShow:true,
        paymentTypeList :[],
        orderTypeList :[],
        receiptTypeList :[],
        calculateTypeList :[],
        customerList :[], // 收货人/发货人信息 集合
        customerTenantList : [], // 下单客户集合
        supplierTenantList : [],
        tenantPriceList:[],// 计费产品
        order : {
          sourceType : "",
          productType : "",
          regionName : this.common.getCookie("orgName"),
          customerTenantId : "", //客户ID
          customerTenantName : "", //客户名称
          customerTenantLinkman : "", //客户联系人
          customerTenantMobile : "", //客户联系人电话
          regionid : "", //归属区域
          billingDate : "", //开单时间
          trackingNum : "",
          orderId : "",
          ordNum : "",
          purchaseNum:"",
          beginDeliveryType : 1,
          endDeliveryType : 0,
          orderTypeName : "",
          orderType : "",
          calculateType : "",
          consignorId : "",
          consignorName : "",
          consignorLinkmanName : "",
          consignorBill : "",
          consignorTelephone : "",
          payConsignorFlag : false,
          payConsignorId : "",
          payConsignorName : "",
          sourceProvince : "",
          sourceCity : "",
          sourceCounty : "",
          sourceStreet : "",
          sourceAddress : "",

          consigneeId : "",
          consigneeName : "",
          consigneeLinkmanName : "",
          consigneeBill : "",
          consigneeTelephone : "",
        
          destProvince : "",
          destCity : "",
          destCounty : "",
          destStreet : "",
          destAddress : "",
          packageNumber : "",//	打包件数
          packageWeight : "",//打包重量
          packageVolume : "",//	打包重量
          remarks : "",
          customerRemarks : "",
          packingInfo : "", // 大小箱数据
          fee : {
            paymentTypeName : "",
            paymentType : "", // 付款方式
            orderIncomeDouble : "", //合计收入
            freightDouble : "", //	运费
            deliveryCostsDouble : "", //	送货费
            pickingCostsDouble : "", //	提货费
            handingCostsDouble : "",//	装卸费
            packingCostsDouble : "",//	包装费
            upstairFeeDouble : "",//	上楼费
            facelistFeeDouble : "",//	面单费
            collectingMoneyDouble : "",//	代收货款
            procedureFeeDouble : "",//	代收手续费
            goodsPriceDouble : "",//	申明价值
            insureFeeDouble : "",//	保险费
            otherFeeDouble : "",//	其他费
            floatingPriceDouble:"",//提付上浮费
            otherFeeName : "",//	其他费名称
            cashPaymentDouble : "",//	现付
            freightCollectDouble : "",//	提付
            monthlyPaymentDouble : "",//	月结
            receiptPaymentDouble : "",//	回单付
            calculatePriceId:"", // 产品类型
            calculatePriceName:"",// 产品类型名称
          },
          prePickupDateTem : [],//提货区间  [05-18,11:00-15:00]
          extorder : {
            preBeginPickupDate : "", //期待提货开始时间
            preEndPickupDate : "", //期待提货结束时间
            waitArriveDate : "", //期待到货时间
            inputUserId : "",//开单员
            inputUserName : "", //开单员
            salesmanBusinessId : "", // 	销售专员
            salesmanBusinessName : "", //	销售专员
            warehourseKeeperId : "", //仓管员
            warehourseKeeperName : "",//仓管员
            beginPrintCount : "",
            endPrintCount : "",
            printType : "",
            receiptTypeName : "",
            receiptType : "",
            receiptCount : "",
            receiptNum : "",
            purchaseUserId:"",
            purchaseUserName:""
          },
          goodsDtl : [
            {
                goodsId : "",
                goodsName : "",
                packingType : "",// 包装
                packageNumber : "",//	打包件数
                packageWeight : "",//打包重量
                packageVolume : "",//	打包重量
                freightDouble : "", //	运费
                deliveryCostsDouble : "", //	送货费
                pickingCostsDouble : "", //	提货费
                handingCostsDouble : "",//	装卸费
                packingCostsDouble : "",//	包装费
                upstairFeeDouble : "",//	上楼费
                facelistFeeDouble : "",//	面单费
                collectingMoneyDouble : "",//	代收货款
                procedureFeeDouble : "",//	代收手续费
                goodsPriceDouble : "",//	申明价值
                insureFeeDouble : "",//	保险费
                otherFeeDouble : "",//	其他费
                otherFeeName : "",//	其他费名称
                floatingPriceDouble:"",//提付上浮费
                goodsName : "",//	货品名称
                goodsCount : "",//	内物件数
                goodsWeight : "",//	重量
                goodsBrand : "",//		品牌
                goodsHeight : "",//		高
                goodsWidth : "",//		宽
                goodsDepth : "",//	长
                goodsStandard : "" //规格	
          }
        ],
          outgoing : {
            supplierTenantId : "",//	 供应商名称
            batchNum : "",//批次ID
            batchNumAlias : "",//批次
            supplierTenantName : "",//	 供应商名称
            outgoingTrackingNum : "",//	 中转单号
            outGoingDate : "",//	中转时间
            outgoingFeeDouble : "",//	 中转总费用
            supplierTypeName : "",//	供应商类型
            remarks : ""//	供应商备注
          },
          packs :[

          ] // 包装数量列表
        },
        orderViewFlag : false, // 开单页面控制全局变量
        orderViewOrModify : false, // 修改/查看页面 （控制是否修改中转信息）
        orderViewOrModifyHtmlFlag : false, // 只能在 查看或者修改 （能变其它不变）-> 主要针对是 新增保存完以后不能修改中转信息
        defaultOrderMap :{}, //默认信息
        driveryTypeMap :{},// 提货区间
        showPrinterView : false, //是否展开打印机设置
        currentPrinterMap : {}, // 当前打印机参数   type 对应 类型
        busTypesMap : {"1":"面单打印","2":"标签","3":"信封"},
        printHtmlFlag : false, // 打印页面进来标志
        //费用自定义字段
        headSetList:[],
        leftSelectAll:false,   //自定义字段右边全选按钮
        rightSelectAll:false,   //自定义字段右边全选按钮
        isShowSetting:false,    //是否显示自定义字段弹窗
        //费用自定义字段 end
        shopSettlementApiFlag : false, // 是否展示选择三方方结算
      }
    },
    mounted(){
      this.initFeeData();
      this.initSysStaticData();
      this.initDevices(); //初始化打印
      this.orderTem = this.common.copyObj(this.order);
      let morder = this.$route.query.order;
      if(this.common.isNotBlank(morder)){
         this.initAddDefault(2);
         console.log("我来修改订单啦。。。。。。");
         this.initModifyOrder(morder);
      }else{
         console.log("我来新增开单啦。。。。。。");
         this.initAddOrder();
         this.initAddDefault(1);
      }
      
    },
    methods:{
      changeHeadData(data){
        this.head = this.common.copyObj(data);
      },
      initFeeData(){
        this.headFee.forEach(el => {
           el.isShow = true;
           this.$set(this.orderFeeTem,el.code,"");
        });
        this.initFeeTableSet();
      },
      // 初始化 运单号
      initTrackingNum(obj){
        let that = this;
        let url = "api/ordOrderInfoBO.ajax?cmd=queryTrackingNum";
        let param = {};
        that.common.postUrl(url,param,function(data){
          that.order.trackingNum = data;
          if("update" == obj){
            that.$message({"type":"success", message: "更新单号成功"});   
        }
        });
      },
      // 批量获取静态数据
      initSysStaticData(){
        let that = this;
        let url = "api/sysStaticDataBO.ajax?cmd=getSysStaticDataSimpleByCodeTypes";
        let codeTypes = [];
        codeTypes.push("RECEIPT_TYPE");
        codeTypes.push("ORDER_CALCULATE_TYPE");
        codeTypes.push("ORDER_PAYMENT_TYPE");
        codeTypes.push("ORDER_TYPE");
        codeTypes.push("DELIVERY_TYPE"); // 提货区间
        
        that.common.postUrl(url,{"codeTypes":codeTypes.join(",")},function(data){
          that.paymentTypeList = data.ORDER_PAYMENT_TYPE;
          that.orderTypeList = data.ORDER_TYPE;
          // console.log( that.orderTypeList);
          that.receiptTypeList = data.RECEIPT_TYPE;
          that.calculateTypeList = data.ORDER_CALCULATE_TYPE;
          let driveryTypeList = data.DELIVERY_TYPE;
          if(that.common.isNotBlank(driveryTypeList)){
            for(let i in driveryTypeList){
                that.driveryTypeMap[driveryTypeList[i].codeValue+""] = driveryTypeList[i].codeName;
            }
          }
        });
      },
     
      // 初始化基本新增开单信息
      initAddOrder(){ 
          this.order.billingDate = this.common.formatTime(new Date(),"yyyy-MM-dd HH:mm:00");
          this.initTrackingNum();
          this.order.extorder.inputUserId = this.common.getCookie("userId") //开单员
          this.order.extorder.inputUserName = this.common.getCookie("userName") //开单员
      },
      // 初始化默认参数  type =1 新增  2 修改 等
      initAddDefault(type){
        let url = "api/sysTenantDefBO.ajax?cmd=getSysSetup";
        let params = {};
        let that = this;
        this.common.postUrl(url, params,function(data){
          // console.log(data);
          if(that.common.isNotBlank(data)){
              // 最大保费
              that.defaultOrderMap.maxLowestCost = that.common.isBlank(data.maxLowestCost) ? 0 : data.maxLowestCost;
              // 最小保费(分)
              that.defaultOrderMap.minLowestCost = that.common.isBlank(data.minLowestCost) ? 0 : data.minLowestCost;
              //  保费费率(分)  0.4 %  千分之4 （存入 0.004 转为 4 ） （// insuranceCost // 已处理小数）
              that.defaultOrderMap.insuranceCost = that.common.isBlank(data.insuranceCost) ? 0 : parseFloat(data.insuranceCost) /1000 ;
              // 代收货款 最大金额（分）
              that.defaultOrderMap.maxCost = that.common.isBlank(data.maxCost) ? 0 : data.maxCost;
              // 代收货款 手续费-比例   千分之4 （存入 0.004 转为 4 ） （// insuranceCost // 已处理小数）
              that.defaultOrderMap.handlingFee = that.common.isBlank(data.handlingFee) ? 0 : parseFloat(data.handlingFee) /1000;
              //代收货款 最低手续费（分）
              that.defaultOrderMap.mimCost = that.common.isBlank(data.mimCost) ? 0 : data.mimCost;
              // 订单类型
              that.defaultOrderMap.orderType = that.common.isBlank(data.orderType) ? "" : data.orderType;
              // 前端交货方式
              that.defaultOrderMap.beginDeliveryType = that.common.isBlank(data.deliveryType) ? "" : data.deliveryType;
              // 后端送货方式
              that.defaultOrderMap.endDeliveryType = that.common.isBlank(data.giveDeliveryType) ? "" : data.giveDeliveryType;
              // 结算方式
              that.defaultOrderMap.paymentType = that.common.isBlank(data.payType) ? "" : data.payType;
              // 提货时间区间
              that.defaultOrderMap.intervalType = that.common.isBlank(data.intervalType) ? "" : data.intervalType;
              //其他费命名
              that.defaultOrderMap.otherName = that.common.isBlank(data.otherName) ? "" : data.intervotherNamealType;
              if(type == 1){
                  // 新增 默认初始化值 第一次
                  that.defaultFirstValue();
              }
           
          }
       });
        // 默认费用相加 基础公式
        this.initOrderCost();
      },
       // 新增 默认初始化值 第一次
      defaultFirstValue(){
        let that = this;
        if(that.common.isNotBlank(that.defaultOrderMap.orderType) && that.defaultOrderMap.orderType >0){
            that.order.orderType = that.defaultOrderMap.orderType+"";
        }
        if(that.common.isNotBlank(that.defaultOrderMap.beginDeliveryType) && that.defaultOrderMap.beginDeliveryType >=0){
          that.order.beginDeliveryType = that.defaultOrderMap.beginDeliveryType;
        }
        if(that.common.isNotBlank(that.defaultOrderMap.endDeliveryType) && that.defaultOrderMap.endDeliveryType >=0){
          that.order.endDeliveryType = that.defaultOrderMap.endDeliveryType;
        }

        if(that.common.isNotBlank(that.defaultOrderMap.paymentType) && that.defaultOrderMap.paymentType > 0){
            that.order.fee.paymentType = that.defaultOrderMap.paymentType+"";
            that.selectPaymentType();
        }
        if(that.common.isNotBlank(that.defaultOrderMap.intervalType)  && that.defaultOrderMap.intervalType > 0 && that.order.beginDeliveryType == 1 ){
            let intervalTime =  that.driveryTypeMap[that.defaultOrderMap.intervalType+""];
            let dayTime = that.common.formatTime(new Date(),"yyyy-MM-dd");
            that.order.prePickupDateTem.push(dayTime);
            that.order.prePickupDateTem.push(intervalTime);
        }
      },
      // 默认费用 计算 公式 列表 （相加 等于 收入）
      initOrderCost(){
          // 默认参数
          let url = "api/sysTenantDefBO.ajax?cmd=getSysOrderCost";
          let params = {};
          params.isType = true;
          let that = this;
          this.common.postUrl(url, params,function(data){
            if(that.common.isNotBlank(data) && data.items){
              
                //  计算费用 ORDER_MODEL 没有会找这个 静态数据
                that.defaultOrderMap.calculatefeeStatics = data.items;
            }
        });
      },
     // 初始化打印机
     initDevices(){
        let that  = this;
        that.common.initDevices("1,2,3",function(arrs){
          if(that.common.isNotBlank(arrs) && arrs.length > 0){
            that.currentPrinter = arrs[0];
            for(let i in arrs){
                that.currentPrinterMap[arrs[i].businessTypes+""] = arrs[i];
            }
            // console.log("默认打印机："+that.currentPrinterMap);
          }
        });
      },
      //修改订单
      async initModifyOrder(morder){
          this.printHtmlFlag = this.common.isNotBlank(morder.printHtmlFlag) ?  morder.printHtmlFlag : false;
          let orderId = morder.orderId;
          let trackingNum = morder.trackingNum;
          let ordNum = morder.ordNum;
          let outgoingTrackingNum = morder.outgoingTrackingNum;
          let viewType = morder.viewType; // 1 修改  2 查看 （或者打印）（默认查看）
          if(this.common.isBlank(viewType)){
              viewType = 2;
              this.orderViewFlag = true; // 全局不能修改
          }
          let orderDetail = await this.queryOrderDetail(orderId,trackingNum,ordNum,outgoingTrackingNum);
          // console.log(orderDetail);
          
          let orderMap = this.common.copyObj(orderDetail);
          if(this.common.isBlank(orderMap)){
              return;
          }
          // this.order = this.common.copyObj(this.orderTem);
          // 全局处理
          this.order = Object.assign({}, this.order, orderMap.order);//对象合并,key相同则后对象覆盖前对象
          // this.order = this.common.copyObj(orderMap.order);
          this.order.orderType = this.order.orderType+"";
          if(this.common.isNotBlank(this.order.calculateType)&& parseInt(this.order.calculateType) >0){
            this.order.calculateType = this.order.calculateType+"";
          }else{
            this.order.calculateType  = "";
          }
          // 结算店铺 
          if(this.common.isNotBlank(this.order.payConsignorId) && this.order.payConsignorId > 0){
            this.order.payConsignorFlag = true;
          }else{
            this.order.payConsignorFlag = false;
          }


          this.$refs.sourceCityAddr.initData(this.order.sourceProvince,this.order.sourceCity,this.order.sourceCounty);
          this.$refs.destCityAddr.initData(this.order.destProvince,this.order.destCity,this.order.destCounty);
          this.order.extorder =  this.common.copyObj(orderMap.orderExt);
          if(this.common.isNotBlank(this.order.extorder.receiptType) && parseInt(this.order.extorder.receiptType) > 0){
            this.order.extorder.receiptType = this.order.extorder.receiptType+"";
          }else{
            this.order.extorder.receiptType  = "";
          }
          // this.orderFeeTem =  this.common.copyObj(orderMap.orderFee);
          this.headFee.forEach(el => {
            this.$set(this.orderFeeTem,el.code,orderMap.orderFee[el.code]);
         });
          this.order.fee =  this.common.copyObj(orderMap.orderFee);
          this.order.fee.paymentType = this.order.fee.paymentType+"";
          // 处理 下单企业客户
          this.order.customerTenantName = this.order.customer.tenantFullName; //客户名称
          this.order.customerTenantLinkman = this.order.customer.tenantPrincipal; //客户联系人
          this.order.customerTenantMobile =  this.order.customer.tenantPhone; //客户联系人电话 
          // 组装 下拉企业
          // 组装 店仓信息 （发货/收货）
          //上门提货时间
          let extorder = this.order.extorder;
          this.order.prePickupDateTem = [];
          if(this.order.beginDeliveryType ==  1){
            if(this.common.isNotBlank(extorder.preBeginPickupDate) && this.common.isNotBlank(this.order.extorder.preEndPickupDate)){
               this.order.prePickupDateTem.push(this.common.formatTime(new Date(extorder.preBeginPickupDate),"yyyy-MM-dd"));
               this.order.prePickupDateTem.push(this.common.formatTime(new Date(extorder.preBeginPickupDate),"HH:00") + "-" + this.common.formatTime(new Date(extorder.preEndPickupDate),"HH:00"));
               this.order.prePickupDateTemStr = this.common.formatTime(new Date(extorder.preBeginPickupDate),"yyyy-MM-dd") + 
                                                     " " + this.common.formatTime(new Date(extorder.preBeginPickupDate),"HH:00") + "-" 
                                                             + this.common.formatTime(new Date(extorder.preEndPickupDate),"HH:00");
              }
          }         
          // 处理货品-明细
         let goods = this.common.copyObj(orderMap.goods);
         if(goods.length <= 1){
           goods.push(this.orderTem.goodsDtl[0]);
         }
         this.$refs.goodsRows.setData(goods);
         // 处理 中转信息 
         let out = orderMap.out;
         if(this.common.isNotBlank(out)){
            this.order.outgoing =  this.common.copyObj(out);
            let supplierMap = out.supplier;
            if(this.common.isNotBlank(supplierMap)){
              this.order.outgoing.supplierTenantId = supplierMap.tenantId;
              this.order.outgoing.supplierTenantName = supplierMap.tenantFullName;//	 供应商名称
              this.order.outgoing.outgoingTrackingNum = out.outgoingTrackingNum;//	 中转单号
              this.order.outgoing.outgoingFeeDouble = out.outgoingFeeDouble;//	 中转费用
              this.order.outgoing.supplierTypeName = supplierMap.tenantTypeName;//	 	供应商类型
            }
         }else{
           this.order.outgoing = this.orderTem.outgoing;
         }

         //开始初始化 打印
         this.order.extorder.printType_1 = false;
         this.order.extorder.printType_2 = false;
         if(this.order.extorder.printType == 1){
            this.order.extorder.printType_1 == true;
         }else if(this.order.extorder.printType == 2){
            this.order.extorder.printType_2 == true;
        }else  if(this.order.extorder.printType == 3){
            this.order.extorder.printType_1 = true;
            this.order.extorder.printType_2 = true;
        }  
        if(this.common.isBlank(this.order.extorder.waitArriveDate)){
          this.order.extorder.waitArriveDate = "";
       } 
        this.orderViewOrModify = true;
        this.orderViewOrModifyHtmlFlag = true;
        this.remarkType = 1;
        this.selectPaymentType("view");//开放支付方式

        // 设置 其它费用 名称 (费用信息)
        if(this.common.isBlank(this.orderFeeTem.otherFeeName)){
          this.orderFeeTem.otherFeeName = "其它费";
        }
        this.setOtherFeeName(this.orderFeeTem.otherFeeName);

        // TODO回选包装数据
        if(this.common.isNotBlank(orderMap.packs) && orderMap.packs.length > 0){
          this.order.packs = orderMap.packs;
        }

      },
      // 清空 或者设置 其它费用 名称
      setOtherFeeName(objName){
        this.headFee.forEach(el => {
          if(el.code == "otherFeeDouble"){
            if(this.common.isBlank(objName)){
              objName = "其它费";
            }
            el.editmodel = objName;
            el.name = objName;
          }
        });
      },
      // 获取详情信息
      async queryOrderDetail (orderId,trackingNum,ordNum,outgoingTrackingNum){
          if(this.common.isBlank(orderId)){
            orderId = "";
          }
          if(this.common.isBlank(trackingNum)){
            trackingNum = "";
          }
          if(this.common.isBlank(ordNum)){
            ordNum = "";
          }
          if(this.common.isBlank(outgoingTrackingNum)){
            outgoingTrackingNum = "";
          }
          let url = "api/ordOrderInfoBO.ajax?cmd=queryOrderInfoDetail";
          let params = {};
          params.orderId = orderId;
          params.trackingNum = trackingNum;
          params.ordNum = ordNum;
          params.outgoingTrackingNum = outgoingTrackingNum;
          params.orderView = "simple";
          let orderDetail =  await this.common.postUrl(url, params,null,null,"post",true);
          return orderDetail;
      },
      // 查询下单客户
      queryCustomerTenantList(){
        let url = "api/sysTenantDefBO.ajax?cmd=getSysTenantDefPName";
        let params = {};
        params.pTenantId = this.common.getCookie("tenantId");
        params.tenantStatus = 1;
        params.tenantFullName = ""; // 企业名称（客户名称）
        let that = this;
        this.common.postUrl(url, params,function(data){
          // console.log(data);
          if(that.common.isNotBlank(data) && that.common.isNotBlank(data.items)){
            that.customerTenantList = data.items;
          }
       });
      },
       // 获取客户价格
     getSysTenantPrice(){
       let that = this;
       let tenantId =  that.order.customerTenantId;
       if(that.common.isBlank(tenantId)){
          that.$message({"type":"success", message: "请先选择下单客户"});
          return;
       }
       that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantPrice",{"tenantId":tenantId,"priceType":""},function (data) {
          that.tenantPriceList = data.items;
          if(that.common.isBlank( that.tenantPriceList) || that.tenantPriceList.length == 0){
           that.$message({"type":"success", message: "未找到计费产品信息"});
          }
        });
      },
      // 选择下单客户
      selectCustomerTenant(selectObj){
          let order = this.order;
          order.customerTenantId = selectObj.tenantId; //客户ID
          order.customerTenantName = selectObj.tenantFullName; //客户名称
          order.customerTenantLinkman = selectObj.tenantPrincipal; //客户联系人
          order.customerTenantMobile =  selectObj.tenantPhone; //客户联系人电话
          if(this.common.isNotBlank(selectObj.payType)){
             order.fee.paymentType = selectObj.payType+""; //支付方式-结算方式
             this.selectPaymentType();
          }
          this.shopSettlementApi(selectObj.tenantId);
      },
          // 选择价格产品
      selectCalculatePrice(obj){
         this.order.fee.calculatePriceName = obj.priceName;
         this.order.fee.calculatePriceId = obj.priceId+"";
      },
       // 获取是否 选择下单客户需要三方结算流程 标志
      shopSettlementApi(tenantId){
          let url = "api/auditBO.ajax?cmd=shopSettlementApi";
          let params = {};
          params.tenantId = tenantId;
          let that = this;
          that.common.postUrl(url, params,function(data){
            if(that.common.isNotBlank(data) ){
              that.shopSettlementApiFlag = data.isJudge;
              if(that.shopSettlementApiFlag){
                 that.$message({"type":"success", message: "注意如勾选三方结算，需要选择结算店铺，需要三方店铺确认以后才允许中转等业务操作"});   
              }
            }
        });
      },
       // 查询 发货人信息/收货人信息 (点击查询 >>>> 数据)
      queryConsList(type,queryName){
         let that = this;
         that.customerList = [];
         //  1 查询发货人
         //  2 查询收货人
         //  3 三方店铺
         let queryType = ""; //默认查询所有
  
         let url = "api/cmWarehouseBO.ajax?cmd=getCustomer";
         let param = {};
         param.type = queryType;
         if(type == 1){
           // TODO
         }
         param.name = queryName; //检索名称
         param.tenantId = this.order.customerTenantId;
         param.rows = 20;
         param.page = 1;
         if(that.common.isBlank(this.order.customerTenantId)){
             that.$message({"type":"success", message: "请先选择下单客户"});   
             return;
         }
         that.common.postUrl(url,param,function(data){
            that.customerList = data.items;
         });
      },
      // 查询发货信息
      queryInputConsignorList(e){
        //  console.log("e.target.value>>"+e.target.value);
        //  console.log(this.order);
         this.order.consignorName = e.target.value;
         this.queryConsList(1,this.order.consignorName);
      },
      // 查询收货信息
      queryInputConsigneeList(e){
        // console.log("e.target.value>>"+e.target.value);
        this.order.consigneeName = e.target.value;
        // console.log(this.order);
        this.queryConsList(2,this.order.consigneeName);
     },
      // 查询三方结算店铺
     queryInputPayConsignorList(e){
        // console.log("e.target.value>>"+e.target.value);
        // this.order.payConsigneeName = e.target.value;
        // console.log(this.order);
        this.queryConsList(3,e.target.value);
     },
    
        // 选择 发货店仓
      selectConsignor(selectObj){
        let order = this.order;
        order.consignorId = selectObj.id; 
        order.consignorName = selectObj.fullName ; 
        order.consignorLinkmanName = selectObj.people; 
        order.consignorBill = selectObj.phone; ; 
        order.consignorTelephone = selectObj.telephone; 
        order.sourceAddress = selectObj.address; 
        this.$refs.sourceCityAddr.initData(selectObj.provinceId,selectObj.cityId,selectObj.districtId);
        this.messagePreOrderFee("sourceAddr");
      },
       // 历史收货人信息
      showlatelyLinkman(){
        let that = this;
        let url = "api/ordOrderInfoBO.ajax?cmd=queryHisOrderConsignee";
        let param = {};
        // param.consignorId = that.order.consignorId;
        param.consignorName = that.order.consignorName;
        param.limitNum = this.limitNum;
        this.tableHisTitle = "最近收货"+this.limitNum+"条";
        if(this.common.isBlank(param.consignorName)){
           this.$message({"type":"success", message: "请先选择或者输入发货人"});   
           return;
        }
        this.latelyLinkmanBox = true;
        that.common.postUrl(url,param,function(data){
           that.tableHisOrderData = data.items;
        });
      },
      // 选择 历史收货人
      selectLatelyLinkman(selectObj){
        let order = this.order;
        order.consigneeId = selectObj.consigneeId; 
        order.consigneeName = selectObj.consigneeName ; 
        order.consigneeLinkmanName = selectObj.consigneeLinkmanName; 
        order.consigneeBill = selectObj.consigneeBill; ; 
        order.consigneeTelephone = selectObj.consigneeTelephone; 
        order.destAddress = selectObj.destAddress; 
        this.$refs.destCityAddr.initData(selectObj.destProvince,selectObj.destCity,selectObj.destCounty);
        this.latelyLinkmanBox = false;
      },
      // 选择 收货店仓
      selectConsignee(selectObj){
        let order = this.order;
        order.consigneeId = selectObj.id; 
        order.consigneeName = selectObj.fullName ; 
        order.consigneeLinkmanName = selectObj.people; 
        order.consigneeBill = selectObj.phone; ; 
        order.consigneeTelephone = selectObj.telephone; 
        order.destAddress = selectObj.address; 
        this.$refs.destCityAddr.initData(selectObj.provinceId,selectObj.cityId,selectObj.districtId);
        this.messagePreOrderFee("destAddr");
      },
      // 选择 结算店铺
      selectPayConsignor(selectObj){
        let that = this;
        let order = this.order;
        if(order.payConsignorFlag && this.common.isNotBlank(selectObj)){
           order.payConsignorId = selectObj.id; 
           order.payConsignorName = selectObj.fullName; 
           that.$message({"type":"success", message: "注意：勾选三方结算，请选择结算店铺信息"});  
        }else{
          order.payConsignorName = ""; 
          order.payConsignorId = ""; 
        }
      },
      //查询供应商
      querySupplierTenantId(){
        let url = "api/sysTenantDefBO.ajax?cmd=getSysTenantDefCityName";
        let params = {};
        params.pTenantId = this.common.getCookie("tenantId");
        params.tenantStatus = 1;
        params.tenantFullName = ""; // 供应商名称
        // params.provinceId = this.order.sourceProvince;  
        // params.cityId = this.order.sourceCity;  
        // params.districtId = this.order.sourceCounty;  
        let that = this;
        this.common.postUrl(url, params,function(data){
          if(that.common.isNotBlank(data) && that.common.isNotBlank(data.items)){
            that.supplierTenantList = data.items;
            that.supplierTenantList.unshift({"tenantId":"","tenantFullName":"请选择供应商"});
          }
       });
      },
      // 选择 供应商
      selectSupplierTenant(selectObj){
        let that = this;
        let outgoing = that.order.outgoing;
        outgoing.supplierTenantId = selectObj.tenantId;//	 供应商Id
        outgoing.supplierTenantName = selectObj.tenantFullName;//	 供应商名称
        outgoing.outgoingTrackingNum = selectObj.outgoingTrackingNum;//	 中转单号
        outgoing.supplierTypeName = selectObj.tenantTypeName;//	 	供应商类型
        that.queryProject(function(data){
            // console.log(data);
            outgoing.projectFlag = data.projectFlag;
             if(outgoing.projectFlag){
                  that.$message({"type":"success", message: "系统对接供应商，不可填入中转费用和单号"});  
             }
             that.forceUpdate();
        });
      },
       // 查询是否需要系统对接-需要提示-相关信息
      queryProject(callback){
        let params = {};
        let that = this;
        let outgoing = this.order.outgoing;
        if(that.common.isBlank(outgoing.supplierTenantId)){
            return;
        }
        params.supplierTenantId = outgoing.supplierTenantId;
        that.common.postUrl("api/kdBusinessParamBO.ajax?cmd=checkSupplierProject", params,function(data){
           if(that.common.isNotBlank(callback)){
              callback(data);
           }
        });
      },
      // 输入物流件数
      selectPackageNumber(){
        if(this.common.isNotBlank(this.order.packageNumber)){
           this.order.extorder.beginPrintCount = 1;
           this.order.extorder.endPrintCount = this.order.packageNumber;
        }
        this.messagePreOrderFee("packageNumber");
       
      },
      // 变更货品信息 - 更新数据
      changeGoodsValue(goodsTem,code){
        console.log(goodsTem);
        console.log(code);
        let goods = this.getGoodsDetail();
        if(this.common.isBlank(goods) || goods.length == 0){
            return;
        }
        // console.log(goods);
        // console.log("111"+new Date().getTime());
        // this.goodsViewData = [];
        let packageNumber = 0;
        let packageVolume = 0;
        let packageWeight = 0;
        let freightDouble = 0;
        let goodsPriceDouble = 0;
        for(let i in goods){
            if(this.common.isNotBlank(goods[i].packageNumber)){
              packageNumber = packageNumber + parseInt(goods[i].packageNumber);
            }
            if(this.common.isNotBlank(goods[i].packageVolume)){
              packageVolume = packageVolume + parseFloat(goods[i].packageVolume);
            }
            if(this.common.isNotBlank(goods[i].packageWeight)){
              packageWeight = packageWeight + parseFloat(goods[i].packageWeight);
            }
            if(this.common.isNotBlank(goods[i].freightDouble)){
              freightDouble = freightDouble + parseFloat(goods[i].freightDouble);
            }
            if(this.common.isNotBlank(goods[i].goodsPriceDouble)){
              goodsPriceDouble = goodsPriceDouble + parseInt(goods[i].goodsPriceDouble);
            }
        }
        
        if(!isNaN(packageNumber)){
          this.order.packageNumber = packageNumber;
          this.selectPackageNumber();
        }
        if(!isNaN(packageVolume)){
          this.order.packageVolume = packageVolume.toFixed(2);;
        }
        if(!isNaN(packageWeight)){
          this.order.packageWeight = packageWeight.toFixed(2);;
        }
        if(!isNaN(goodsPriceDouble)){
           this.orderFeeTem.goodsPriceDouble = goodsPriceDouble.toFixed(2);;
        }
        // 计算费用 （调用算费接口）  



        // 体积 + 重量 + 件数 
        
        // 计算费用
       this.orderFeeTem.freightDouble = freightDouble.toFixed(2);
       this.changeOrderFee("freightDouble"); 
       this.$refs.goodsRows.setData(goods);
       this.messagePreOrderFee(code);

      },
      // 填写订单费用 (改变)
      changeOrderFee : function(code){
        console.log("code>>>>>>>>"+code);
        let orderFeeTem = this.orderFeeTem;
        let  items = this.defaultOrderMap.calculatefeeStatics;
        if(this.common.isBlank(items) || items.length <= 0){
             this.$message({"type":"success", message: "收入合计失败，未匹配合计规则，请在基础管理设置规则"});   
             return false;
        }
        
        let totalMoney = 0;  // 先转为 分 后 2位
        let baseNumber = 10000;
        for(let k in orderFeeTem){
          for(let i in items){
            let modelV = items[i].vModel.replace(/(^\s+)|(\s+$)/g,"");
            if(modelV == k){
              if(this.common.isNotBlank(orderFeeTem[k])){
                totalMoney = totalMoney + parseFloat(orderFeeTem[k]) * baseNumber;
               }
            }
          }
        }
        this.order.fee.orderIncomeDouble = (totalMoney / baseNumber).toFixed(2);
        if(code == "goodsPriceDouble"){
           // 回复第一行数据的货品价值 规则 1行填充 ，2行以上 处理数据 回复
           let goods = this.getGoodsDetail();
            if(goods.length == 1){
                goods[0].goodsPriceDouble = this.order.fee.goodsPriceDouble;
            }else if(goods.length > 1){
                if(this.common.isNotBlank(goods[1].goodsName)){
                   return;
                   // 不处理
                }
                goods[0].goodsPriceDouble = this.order.fee.goodsPriceDouble;
            }
            this.$refs.goodsRows.setData(goods);
        }
        if(this.common.isNotBlank(this.order.fee.paymentType)){
           this.selectPaymentType();
        }   

        this.messagePreOrderFee(code);   
      },
      // 保存订单
      //  saveType 1 直接保存 ，2 保存并打印
      async saveOrUpdate(saveType){
          if(this.checkOrder()){
            let url = "api/ordOrderInfoBO.ajax?cmd=saveOrUpdate";
            let params = {};
            params.orderstring = JSON.stringify(this.order);
            let returnOrder = await this.common.postUrl(url, params);
            if(this.common.isBlank(returnOrder) || this.common.isBlank(returnOrder.orderId) ){
                this.$message({"type":"success", message: "保存订单失败"});  
                return false;
            }
            let sucMessage = "保存成功";
            if(this.orderViewOrModifyHtmlFlag){
               sucMessage = "修改成功";
            }
            this.$message({"type":"success", message: sucMessage});  
            
            // 重新设置
            this.order.orderId = returnOrder.orderId;
            this.orderViewOrModify = true;

            //不在设置货物信息 （后台匹配处理） -保存并打印
            if(saveType == 2){
              // 1、保存并打印 (打印面单)
              this.printOrder(1);
           }else if(this.orderViewOrModifyHtmlFlag && saveType == 1){
            // 修改/打印新增进来 
            // 关闭页面 （修改关闭）
            this.$emit('closeTab', this.$route.meta.id);
           }else if(!this.orderViewOrModifyHtmlFlag && saveType == 1){
              // 保存新增 （需要提示是否继续录入下一单）
              this.$confirm("继续录单", '提示', {confirmButtonText: '下一单',cancelButtonText: '关闭录入',type: 'warning'
          
              }).then(() => {
                  // 继续录单
                  this.clearOrder();
              }).catch(() => {
                  //取消      
                   this.$emit('closeTab', this.$route.meta.id);
              });
           }
        }
          return true;
      },
      // 打印运单
      // printType  1 面单 2、（信封 + 面单） 3、(面单 + 标签 + 信封) 打印
      // 注意 3台打印机
      printOrder(printType){
         if(this.common.isBlank(this.order.orderId)){
            this.$message({"type":"success", message: "请先保存运单信息"}); 
            return;
         }
         // 开始打印 >>>>> 组装数据 （直接后台获取数据信息）>>>>>>(获取组装数据打印)
         // check print
          let that = this;
          let busTypes = [];
          busTypes.push("1");
          if(printType == 4){
              busTypes.push("2");
              busTypes.push("3");
          }else if(printType == 3){
            busTypes.push("3");
          }else if(printType == 2){
            busTypes.push("2");
          }    
          // 校验是否能打印
          for(let i in busTypes){
              let b = busTypes[i];
              if(this.common.isBlank(this.currentPrinterMap[b]) ){
                this.$message({"type":"success", message: "请先选择"+this.busTypesMap[b]+"需要打印机"}); 
                this.printerViewHtml();
               
            }
              let printerName = this.currentPrinterMap[b].printerName;
              if(this.common.isBlank(printerName) ){
                  this.$message({"type":"success", message: "请先选择"+this.busTypesMap[b]+"需要打印机"}); 
                  this.printerViewHtml();
                  return;
              }
              if(this.common.isBlank(printerName) || !lodopUtil.checkPrintDevice(printerName)){
              this.$message({"type":"success", message: "未找到"+ this.busTypesMap[b]+"，电脑打印机"+printerName+"，请重新选择"}); 
              this.printerViewHtml();
              }
          }
          // 执行打印 
          for(let i in busTypes){
            let b = busTypes[i];
            if(b == "1"){
              // 面单打印
              this.lodopPrint("api/ordOrderInfoBO.ajax?cmd=queryOrderInfoPrintDetail","1");
            }else if(b == "2"){
              // 标签
              this.lodopPrint("api/ordOrderInfoBO.ajax?cmd=queryOrderInfoPrintLableDetail","2");
            }else if(b == "3"){
              // 信封
              this.lodopPrint("api/ordOrderInfoBO.ajax?cmd=queryOrderInfoPrintEnvelopeDetail","3");
            }else{
              that.$message({"type":"success", message: "类型错误，无法打印"});   
            }
          }
      },
      // 分类打印  按照类型打印
      lodopPrint(url,businessTypes){
        let that = this;
        let orderMap = {};
        orderMap.orderId = this.order.orderId;
        orderMap.businessTypes = businessTypes; // 面单打印
        that.common.postUrl(url, orderMap,function(orderDetail){
           if(that.common.isBlank(orderDetail)){
              that.$message({"type":"success", message: "运单号："+o.trackingNum+","+that.busTypesMap[businessTypes]+",未找到到数据，打印失败"});   
           }
           // 打印面单
           lodopUtil.commonPrint(orderDetail,1,false,that.currentPrinterMap[businessTypes].printerName);   
        });
      },
      // printType  1 面单 2、（标签 + 面单） 3、（ 信封 + 面单） 4、(面单 + 标签 + 信封) 打印 
      // 注意 3台打印机 都要设置 才能打印>>>>>>> 面单可以支持默认打印机
      saveOrderAndPrint(){
            let printType = 1;
            if(this.order.extorder.printType_1 && this.order.extorder.printType_2){
                printType = 4;
            }else if(this.order.extorder.printType_1){
              printType = 3;
            }else if(this.order.extorder.printType_2){
              printType = 2;
            }   
            let msg = "确认保存并打印面单信息";
            if(printType == 2){
               msg = "确认保存并打印面单和标签信息";
            }else if(printType == 3){
              msg = "确认保存并打印面单/信封信息";
            }else if(printType == 4){
              msg = "确认保存并打印面单/标签/信封信息";
            }
            this.$confirm(msg, '提示', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'
            }).then(() => {
                //确定
                if(this.saveOrUpdate(printType)){
                   // 保存成功开始执行打印
                   this.printOrder(printType);
                }
               
            }).catch(() => {
                //取消       
            });

      },
      // 保存图片
      saveOrderPicture(){
        this.common.shade.show();
        html2canvas(this.$refs.imageWrapper,{
            backgroundColor: null     // 解决生成的图片有白边          
        }).then((canvas) => {
            let dataURL = canvas.toDataURL("image/png");
            let a = document.createElement('a');
            a.href = dataURL;
            a.download = '运单录入';
            a.click();
            this.common.shade.hide();
        })
      },

      // 重新开单
      clearOrder(){
        console.log("我重新开单咯");
        // 回复订单信息
        this.order = this.common.copyObj(this.orderTem);
        // 回复基础信息
        this.initAddOrder();
       
        this.remarkType = 1;
        // 初始化  打印标志
        this.order.extorder.printType_1 = false;
        this.order.extorder.printType_2 = false;

        this.$refs.sourceCityAddr.cleanData();
        this.$refs.destCityAddr.cleanData();

        this.$refs.goodsRows.initTableData();
        this.orderFeeTem = {};

        this.defaultFirstValue();
        this.setOtherFeeName("");
        this.orderViewOrModify = false;
      },
      // 校验保存数据
      checkOrder(){
        let o = this.order;
        let c = this.common;
        // console.log(o);
        if(c.isBlank(o.customerTenantId) || o.customerTenantId == "-1"){
          this.$message({"type":"success", message: "请选择下单客户"});   
          return false;
        }
        if(c.isBlank(o.orderType) || o.orderType == "-1"){
          this.$message({"type":"success", message: "请选择订单类型"});   
          return false;
        }
        if(c.isBlank(o.consignorName)){
          this.$message({"type":"success", message: "请选择发货店仓或输入"});   
          return false;
        }
        if(c.isBlank(o.consignorLinkmanName)){
          this.$message({"type":"success", message: "请选择发货人或输入"});   
          return false;
        }
        if(c.isBlank(o.consignorBill) && c.isBlank(o.consignorTelephone)){
          this.$message({"type":"success", message: "发货人电话手机必填其一"});   
          return false;
        }
        if(c.isNotBlank(o.consignorBill) && !c.validatemobile(o.consignorBill)){
          this.$message({"type":"success", message: "发货手机格式错误"});   
          return false;
        }
        if(c.isNotBlank(o.consignorTelephone) && !(c.validateTel(o.consignorTelephone) || c.validatemobile(o.consignorTelephone))){
          this.$message({"type":"success", message: "发货人电话格式错误"});   
          return false;
        }
        let source =  this.$refs.sourceCityAddr;
        o.sourceProvince = source.chooseProvinceId;
        o.sourceCity = source.chooseCityId;
        o.sourceCounty = source.chooseDistrictId;
        if(c.isBlank(o.sourceCity) || o.sourceCity == "-1"){
          this.$message({"type":"success", message: "请选择发货地址到市"});   
          return false;
        }
        if(c.isBlank(o.sourceAddress)){
          this.$message({"type":"success", message: "请输入发货详细地址"});   
          return false;
        }

        if(c.isBlank(o.consigneeName)){
          this.$message({"type":"success", message: "请选择收货客户或输入"});   
          return false;
        }
        if(c.isBlank(o.consigneeLinkmanName)){
          this.$message({"type":"success", message: "请选择收货人或输入"});   
          return false;
        }
        if(c.isBlank(o.consigneeBill) && c.isBlank(o.consigneeTelephone)){
          this.$message({"type":"success", message: "收货人电话手机必填其一"});   
          return false;
        }
        if(c.isNotBlank(o.consigneeBill) && !c.validatemobile(o.consigneeBill)){
          this.$message({"type":"success", message: "收货手机格式错误"});   
          return false;
        }
        if(c.isNotBlank(o.consigneeTelephone) && !(c.validateTel(o.consigneeTelephone) || c.validatemobile(o.consigneeTelephone))){
          this.$message({"type":"success", message: "收货人电话格式错误"});   
          return false;
        }
        let dest =  this.$refs.destCityAddr;
        o.destProvince = dest.chooseProvinceId;
        o.destCity = dest.chooseCityId;
        o.destCounty = dest.chooseDistrictId;
        if(c.isBlank(o.destCity) || o.destCity == "-1"){
          this.$message({"type":"success", message: "请选择收货地址到市"});   
          return false;
        }
        if(c.isBlank(o.destAddress)){
          this.$message({"type":"success", message: "请输入收货详细地址"});   
          return false;
        }
        if(o.payConsignorFlag){
          if(c.isBlank(o.payConsignorId) || o.payConsignorId <= 0 ){
            this.$message({"type":"success", message: "勾选三方结算，请选择选择店铺信息"});   
            return false;
          }
        }
        // 处理时间 提货区间
       if(c.isNotBlank(o.prePickupDateTem) && o.prePickupDateTem.length == 2 ){
           let times = o.prePickupDateTem[1].split("-");
           o.extorder.preBeginPickupDate =  o.prePickupDateTem[0] + " " + times[0] +":00";
           o.extorder.preEndPickupDate =  o.prePickupDateTem[0]   + " " +  times[1]  + ":00";
       }
       if(o.beginDeliveryType != 1 ){
          o.extorder.preBeginPickupDate = "";
          o.extorder.preEndPickupDate = "";
       }
       // 处理货物详情
       let goodsTem = this.getGoodsDetail();
       let goods = []; // 获取真正数据
       for(let i in goodsTem){
           let g = goodsTem[i];
           if(i == 0 || i == "0"){
               if(c.isBlank(g.goodsName)){
                   this.$message({"type":"success", message: "请输入货物名称"});   
                   return false;
               }
               if(c.isBlank(g.packingType)){
                 this.$message({"type":"success", message: "请输入货物包装"});   
                 return false;
               }
               if(c.isBlank(g.packageNumber)){
                  this.$message({"type":"success", message: "请输入货物打包件数"});   
                  return false;
               }
           }
           if(c.isNotBlank(g.goodsName)){
               g.index = parseInt(i+"") + 1;
               goods.push(g);
               if(c.isBlank(g.packingType)){
                 this.$message({"type":"success", message: "请输入货物包装"});   
                 return false;
               }
              if(c.isBlank(g.packageNumber)){
                 this.$message({"type":"success", message: "请输入货物打包件数"});   
                 return false;
              }
           }else{
                //this.$message({"type":"success", message: "未输入货物名称，不保存该货物明细"});   
           }
       }
       o.goodsDtl = goods;
       
       // 处理费用 
       let orderFeeTem = this.orderFeeTem;
      //  console.log(orderFeeTem);
       for(let k in orderFeeTem){
         o.fee[k] = orderFeeTem[k];
       }
       if(c.isBlank(o.fee.paymentType) || o.fee.paymentType == "-1"){
          this.$message({"type":"success", message: "请选择结算方式"});   
          return false;
       }
       // 计算费用
       // 收入 合计 = 现付 + 到付 + 月结 + 回单付
       let f = o.fee;
       if(c.isBlank(f.orderIncomeDouble)){
          f.orderIncomeDouble = 0;
       }
      let feeDouble = 0;
      if(c.isNotBlank(f.cashPaymentDouble)){
         
         feeDouble = feeDouble + parseFloat(f.cashPaymentDouble);
      }else{
        f.cashPaymentDouble = 0;
      }
      if(c.isNotBlank(f.freightCollectDouble)){
        feeDouble = feeDouble + parseFloat(f.freightCollectDouble);
      }else{
        f.freightCollectDouble = 0;
      }
      if(c.isNotBlank(f.monthlyPaymentDouble)){
        feeDouble = feeDouble + parseFloat(f.monthlyPaymentDouble);
      }else{
        f.monthlyPaymentDouble = 0;
      }
      if(c.isNotBlank(f.receiptPaymentDouble)){
        feeDouble = feeDouble + parseFloat(f.receiptPaymentDouble);
      }else{
        f.receiptPaymentDouble = 0;
      }

      if(feeDouble != f.orderIncomeDouble){
         this.$message({"type":"success", message: "收入合计 != 现付 + 到付 + 月结 + 回单付"});   
         return false;
      }
      // 其它
      if(c.isBlank(o.packageNumber)){
        this.$message({"type":"success", message: "请输入合计打包件数"});   
        return false;
      }
      // 转换打印类型
      if(this.order.extorder.printType_1 && this.order.extorder.printType_2){
         this.order.extorder.printType = 3
      }else if(this.order.extorder.printType_2){
        this.order.extorder.printType = 2
      }else if(this.order.extorder.printType_1){
        this.order.extorder.printType = 1
      }
      console.log(o);
      return true;
      },
      // 获取货物详情信息
      getGoodsDetail(){
        let goods = this.$refs.goodsRows.getData();
        let checkGoods = [];
        for(let k in goods){
           let gmap = {};
           let good = goods[k]
           for(let g in good){
              let value = good[g].value;
              gmap[g] = this.common.isNotBlank(value) ?  value : "";
           } 
           checkGoods.push(gmap);
        }
        // console.log(checkGoods);
        return checkGoods;
      },
      //选择 支付方式 view = "view" 表示 修改回选
      selectPaymentType(view){
        if(view != "view"){
          this.order.fee.cashPaymentDouble = 0;
          this.order.fee.freightCollectDouble = 0;
          this.order.fee.monthlyPaymentDouble = 0;
          this.order.fee.receiptPaymentDouble = 0;
        }
        if(this.order.fee.paymentType == 1 || this.order.fee.paymentType == "1"){
          this.cashPaymentDoubleShow = false;
          this.freightCollectDoubleShow = true;
          this.monthlyPaymentDoubleShow = true;
          this.receiptPaymentDoubleShow = true;
          this.order.fee.cashPaymentDouble = this.order.fee.orderIncomeDouble;
        }else if(this.order.fee.paymentType == 2 || this.order.fee.paymentType == "2"){
          this.cashPaymentDoubleShow = true;
          this.freightCollectDoubleShow = false;
          this.monthlyPaymentDoubleShow = true;
          this.receiptPaymentDoubleShow = true;
          this.order.fee.freightCollectDouble = this.order.fee.orderIncomeDouble;
        }else if(this.order.fee.paymentType == 3  || this.order.fee.paymentType == "3"){
          this.cashPaymentDoubleShow = true;
          this.freightCollectDoubleShow = true;
          this.monthlyPaymentDoubleShow = false;
          this.receiptPaymentDoubleShow = true;
          this.order.fee.monthlyPaymentDouble = this.order.fee.orderIncomeDouble;
        }else if(this.order.fee.paymentType == 4 || this.order.fee.paymentType == "4"){
          this.cashPaymentDoubleShow = true;
          this.freightCollectDoubleShow = true;
          this.monthlyPaymentDoubleShow = true;
          this.receiptPaymentDoubleShow = false;
          this.order.fee.receiptPaymentDouble = this.order.fee.orderIncomeDouble;
        }else{
          this.cashPaymentDoubleShow = false;
          this.freightCollectDoubleShow = false;
          this.monthlyPaymentDoubleShow = false;
          this.receiptPaymentDoubleShow = false;
        }
      },
      selectRemark(type){
         this.remarkType = type;
      },
      showLatelyRemark(){
        this.$refs.remark.showLatelyRemark();
      },
      //编辑其他费用
      headFeeEdit(hd){
        let otherFeeName = "其它费";
        if(this.common.isBlank(hd.editmodel) || hd.editmodel == "otherFeeName"){
          this.orderFeeTem.otherFeeName = otherFeeName;
          hd.editmodel = otherFeeName;
        }
        this.$set(hd,"isEdit",true);
      },
      feeEditEnd(hd){
        if(this.common.isBlank(hd.editmodel)){
           hd.name = "其它费";
           hd.editmodel = "其它费";
        }else{
          hd.name = hd.editmodel
        }
        this.orderFeeTem.otherFeeName = hd.editmodel;
        this.$set(hd,"isEdit",false);
      },
      //备注选择回调
      remarkCallBack(item){
        if(this.remarkType == 1){
          this.order.customerRemarks = item.remarks;
       }else{
         this.order.remarks = item.remarks;
        }
      },
      //弹窗展示隐藏处理
      hideDialog(){
        this.isShowSetting = false;
        this.$refs.goodsRows.hideDialogs();
        this.$refs.remark.hideDialogs();
      }, 

      //修改相关数据自动算费提示（新增不处理）-预估费用提示（小程序不处理）
      messagePreOrderFee(code){
         let that  = this;
         let order = this.order;
         if(that.common.isBlank(order) || order.orderId <= 0){
             return;
         }
         if(order.sourceType == 4){
             return;
         }
         let codeMessageMap = {
                                "orderType":"订单类型",
                                "sourceAddr":"发货地址",
                                "destAddr":"收货地址",
                                "packageNumber":"打包件数",
                                "packageWeight":"打包重量",
                                "packageVolume":"打包体积",
                                "goodsPriceDouble":"申明价值",
                                "collectingMoneyDouble":"代收货款",
                                "packingInfo":"包装数据",
                              };
         if(that.common.isBlank(codeMessageMap[code])){
            return;
         }
         that.$message({"type":"success", message: "修改运单,费用参数"+codeMessageMap[code]+"，改变系统将重新预估线路费用。"}); 
      },
      //打印-设置确定回调
      sureCallback(data){
        if(this.common.isNotBlank(data)){
          for(let i in data){
              if(this.common.isNotBlank(data[i].printerName)){
                this.currentPrinterMap[data[i].businessTypes+""] = data[i]
              }
          }
          // console.log("当前执行打印机："+this.currentPrinterMap);
        }
      },
      // 打印-回调外面状态 （隐藏）
      showChange(data){
        this.showPrinterView = data;
      },
      // 打印-设置打印机 （展示页面）
      printerViewHtml(){
        this.showPrinterView = true;
      },
      //强制双向绑定
      forceUpdate(){
        this.$forceUpdate();
      },
      // 始发地选择-查询费用列表
      selectSourceCallback(){
        //  this.messagePreOrderFee("sourceAddr");
      },
      // 目的地地选择-查询费用列表
      selectDestCallback(){
        // this.messagePreOrderFee("destAddr");
      },
      // 查询计算费用列表-如果只有一条默认那个计算方式
      queryFeeItems(){

      },
      //详情= 跳转到异常登记 
      toException(order){
        let that = this;
        let item = {
            urlName: "异常登记",
            urlId: "64" + new Date().getTime(),
            urlPath: "/cm/addCmAbnormal.vue",
            urlPathName: "/addCmAbnormal",
            query:{orderId:order.orderId}
        }
        that.$emit('openTab', item);
      },
       // 包装数据回选
      getPackingList(){
        let that = this;
        // 获取产品包装
        let url = "api/sysStaticDataBO.ajax?cmd=queryPackList";
        that.packingListObj = {
          items:[],
          itemType:1
        };
        let packs = this.order.packs; // 回选的包装
        that.common.postUrl(url,{tenantId:that.order.customerTenantId},function(data){
            // 判断类型
            // 判断使用哪种规格
            if(that.common.isBlank(packs) || packs.length <= 0){
               // 新增
               if(that.common.isNotBlank(data.items2) && data.items2.length > 0){
                  that.packingListObj.items = data.items2;
                  that.packingListObj.itemType = 2;
                  that.packListDialog = true;
               }else if(that.common.isNotBlank(data.items1) && data.items1.length > 0){
                  that.packingListObj.items = data.items1;
                  that.packingListObj.itemType = 1;
                  that.packListDialog = true;
              }else{
                  that.$message({"type":"success", message: "未找到箱子基础数据，请在基础大小箱里维护"});   
                  return;
              }   
            }else{
               // 修改
               let p = packs[0];
               that.packingListObj.items = data["items"+p.itemType];
               if(that.common.isBlank(that.packingListObj.items) || that.packingListObj.items <= 0){
                  that.$message({"type":"success", message: "未找到箱子修改基础数据，请在基础大小箱里维护"});   
                  return;
               }
               that.packingListObj.itemType = p.itemType;
              // 回选数量 TODO 不回选 
              that.packListDialog = true;
            }

        });
      },
      // 关闭 或者 保存
      closePack(flag){
          let that = this;
          let packs = [];
          if(flag == "save"){
            let items = that.packingListObj.items;
            for(let i in items){
                if(parseInt(items[i].packNumber) > 0){
                  items[i].itemType = that.packingListObj.itemType;
                  packs.push(items[i]);
                }
            }
            if(packs.length > 0){
               that.order.packs = packs;
               let objMap = {};
               for(let i in packs){
                  let v = objMap[packs[i].codeName];
                  if(that.common.isNotBlank(v)){
                     objMap[packs[i].codeName] = parseInt(v) +  parseInt(packs[i].packNumber);
                  } else{
                     objMap[packs[i].codeName] =  parseInt(packs[i].packNumber);
                  }
               }
               let packingInfo = ""; // 大箱3件小箱5件中箱1件
               for(let k in objMap){
                   packingInfo = packingInfo +  (k + objMap[k] +"件")+";";
               }
               that.order.packingInfo = packingInfo;
            }
            this.messagePreOrderFee("packingInfo");
          }else if(flag == "clear"){
              that.order.packingInfo = "";
              that.order.packs = [];
          }
          that.packListDialog = false;

         
      },
      //上门时间日期控件选择返回
      prePickupDateCallback(date){
        this.order.prePickupDateTem = date;
        // console.log(date);
      },

      /****************************************** 自定义费用 设置开始 ************************************************ */
      //防止冒泡
      stopBub(){
          return false;
      },
      //自定义表格逻辑
      showTableSetting(){
          this.isShowSetting = true;            
          this.headSetList = this.common.copyObj(this.headFee);
      },
      selToLeft(){
          this.rightSelectAll = false;    //取消全选
          //遍历取消选中状态及显示状态
          this.headSetList.forEach(el => {
              if(el.isChecked&&el.isShow){
                  el.isShow = false;
                  el.isChecked = false;
              }
          })
          this.forceUpdate();
      },
      selToRight(){
          this.leftSelectAll = false;    //取消全选
          //遍历取消选中状态及隐藏状态
          this.headSetList.forEach(el => {
              if(el.isChecked&&!el.isShow){
                  el.isShow = true;
                  el.isChecked = false;
              }
          })
          this.forceUpdate();
      },
      selectRightAll(){   //选择右边全部
          this.headSetList.forEach(el => {
              if(el.isShow&&!el.requiredFiled){
                  el.isChecked = true;
              }
          })
      },
      selectLeftAll(){   //选择左边全部
          this.headSetList.forEach(el => {
              if(!el.isShow){
                  el.isChecked = true;
              }
          })
      },
      diyItemChange(hd,type){ 
          if(!hd.isChecked){
              if(type==1){
                  this.leftSelectAll = false;
              }else if(type==2){
                  this.rightSelectAll = false;
              }
          }
          this.forceUpdate();
      },
      async initFeeTableSet(){
          let url = "api/sysTableHeadConfigBO.ajax?cmd=getSysTableHeadConfigs";
          let data = await this.common.postUrl(url,{tableName: 'billingFeeTable'});
          let headCache = data[ 'billingFeeTable'];
          if(this.common.isBlank(headCache)) return;
          //展示隐藏，固定列处理
          let hideList = [];
          this.headFee.forEach((item) => {
              item.isShow = false;
              headCache.forEach(data => {
                  if(item.code == data.headCode){ //后台保存则展示
                      item.isShow = true;
                      if(data.fixedFlag==1){  //为1时侧固定
                          item.isFix = true;
                      }
                  }
              })
              //记录隐藏的列
              if(!item.isShow){
                  hideList.push(item);
              }
          })
          //表头重新排序
          let arr = []
          headCache.forEach(data => {  //后台有保存的先按照index放好位置
              this.headFee.forEach((item) => {
                  if(item.code == data.headCode){
                      arr[data.headIndex] = item;
                  }
              })
          })
          for(let a=0;a<arr.length;a++){  //插入隐藏的列
              if(this.common.isBlank(arr[a])){
                  arr[a] = hideList[0];
                  hideList.splice(0,1);
              }
          }
          //合并arr和未被插入的隐藏列
          this.headFee = arr.concat(hideList);
      },
      async saveTableRow(){
          let sysTableHeadConfigList = [];
          //组装要保存的table，目前保存需要显示的
          for(let i in this.headSetList){
              let hd = this.headSetList[i];
              if(hd.isShow){
                  let tableHeadConfig = {};
                  tableHeadConfig.headName = hd.name;
                  tableHeadConfig.headCode = hd.code;
                  tableHeadConfig.headIndex = i;
                  tableHeadConfig.fixedFlag = hd.isFix?1:2;
                  sysTableHeadConfigList.push(tableHeadConfig);
              }
          }
          let param = {};
          param.tableName = 'billingFeeTable';
          param.paramStr = JSON.stringify(sysTableHeadConfigList);
          let url = "api/sysTableHeadConfigBO.ajax?cmd=saveSysTableHeadConfigs";
          await this.common.postUrl(url,param);
          this.setTabelShow = false;
          this.$message({
              message: '保存成功！',
              type: 'success'
          });
          this.initFeeTableSet();
      },
      sureSetting(){
          this.cancelSetting();
            this.headSetList.forEach(el => {
                if(!el.isShow){
                    this.orderFeeTem[el.code] = '';
                    this.changeOrderFee(el.code);
                }
            })
          this.saveTableRow();
      },
      cancelSetting(){    //取消编辑
          this.isShowSetting = false;
          this.headSetList.forEach(el => {
              el.isChecked = false;
          })
      },
       /****************************************** 自定义费用 表格 设置结束 ************************************************ */
    },
    components:{
      ipttable,
      mycity,
      remark,
      printSet,
      vuedraggable,
      dateRange
  }
}