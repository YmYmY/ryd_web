import lodopUtil from "@/utils/lodop/lodop-business.js"
import {getLodop} from '@/utils/lodop/LodopFuncs.js'
import common from '@/utils/common.js'
// 打印信息 
// let orderJdData = {"order":{"order_no":"DHC91906130074_11","serial_no":"DHC91906130074_11","wave_no":"","service_type":"1","product_type":"2","delivery_type":"2","receipt_flag":"1","weight":"62.0","volume":"1.1","value":"","piece_amount":"2","cargo_name":"服装","pay_type":"2","insured_fee":"","sale_platform":"","package_length":"","package_width":"","package_height":"","remark":"韵达快递对接","sender_name":"只爱军","sender_company":"福安","sender_phone":"13632374784","sender_tel":"020-99999999","sender_province":"天津","sender_city":"天津市","sender_county":"和平区","sender_street":"","sender_detail_address":"天津市和平区福安大街39号27号-28号","sender_postcode":"","receiver_name":"陈伟俊","receiver_company":"陈伟俊","receiver_phone":"13318668235","receiver_tel":"","receiver_province":"广东","receiver_city":"江门市","receiver_county":"台山市","receiver_street":"","receiver_detail_address":"广东江门市台山市台城街道台城街道办第八工业区89号","receiver_postcode":"","business_attr":"","platform_source":"","item_type":"","pay_fee":"188.99","cod_fee":"10000","pack_type":null},"waybillList":[{"waybill":{"destTabletrolleyCode":"283","senderAddress":"北京丰台区四环到五环之间北京丰台区下柳子村188号居库家居塔牌绍兴酒","weight":"2","senderCompany":"普天太力","agingName":"2","receiveCounty":"温岭市","remark":"22","receiveMobile":"13245678767","orderMark":"22220003000001010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","road":"0","origCrossCode":"0","senderTel":"7323456","guaranteeValue":"0","packageCode":"3424234","collectionMoney":"2.22","airTransport":"Y","customerCode":"010K185990","receiveCity":"台州市","receiveName":"小雨","senderMobile":"13245678767","orderId":"ECO127563368159817","siteName":"台州集配第一车队","goodsType":"1","truckSpot":"WL08","sendCity":"通州区","receiveTel":"7323456","packageCount":"2","destCrossCode":"283","destSortCenter":"台州集配中心","receiveProvince":"浙江","receiveCompany":"普天太力","origSortCenter":"北京通州分拣中心","deliveryId":"VA50518473504","packageNum":"1","senderName":"小雨","siteId":"682900","receiveAddress":"北京丰台区四环到五环之间北京丰台区下柳子村188号居库家居塔牌绍兴酒","origTabletrolleyCode":"HD08"}}]};
let orders = [];



/**
 * 
 * 京东ECLP沧海打印-N 张
 * datas  打印源数据结果列表
 * printMachine 打印机器
 * printViewFlag 是否打印预览标准
 * true 预览，false 直接打印
 * callback  返回函数
 * 
 * 100mm * 113 mm 模板
 */

const printEclpOrders = function(datas,printMachine,printViewFlag,callback){
   // 打印 多张电子面单
   for(let i in datas){
      let data = datas[i];
      let taskName = "JDCH_"+ data.packageCode + ""+ "_" + data.indexNo;
      printEclpOrder(datas[i],printMachine,taskName,printViewFlag);
   }
   callback(datas);
}
/**
 * 
 * 京东ECLP沧海打印-一张
 * data 打印源数据
 * printMachine 打印机器
 * taskName   打印任务名称
 * printViewFlag 是否打印预览标准
 * true 预览，false 直接打印
 * 
 * 100mm * 113 mm 模板
 */
const printEclpOrder = function(data,printMachine,taskName,printViewFlag){
        /**初始化打印对象 **/
         let LODOP = getLodop();
         LODOP.PRINT_INIT(taskName);
         LODOP.PRINT_INITA(0,0,"100mm","113mm",taskName);  
         LODOP.SET_PRINT_PAGESIZE(1,"100mm","113mm","");  
         //绘制 上半部 区域
         LODOP.ADD_PRINT_LINE("2mm","2mm","2mm","98mm",0,1);
         LODOP.ADD_PRINT_LINE("2mm","2mm","56mm","2mm",0,1);
         LODOP.ADD_PRINT_LINE("56mm","2mm","56mm","98mm",0,1);
         LODOP.ADD_PRINT_LINE("56mm","98mm","2mm","98mm",0,1);
         
         
         // 子条码 区域  (2 , 2 , 15 * 80) 
         // 重量      18,80,6 * 12
         LODOP.ADD_PRINT_LINE("22mm","2mm","22mm","98mm",0,1);
        //  LODOP.ADD_PRINT_BARCODE("3mm", "12mm","80mm", "14mm", "128A",formatData(data.packageCode))
        LODOP.ADD_PRINT_BARCODE("3mm", "12mm","80mm", "14mm", "128A",common.formatData(data.packageCode))
         
         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",10);
         LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
        //  LODOP.ADD_PRINT_TEXT("18mm","60mm","20mm","10mm",formatData(data.weight)+"KG");
         LODOP.ADD_PRINT_TEXT("18mm","60mm","20mm","10mm",common.formatData(data.weight)+"KG");
         // 始发地
         // 目的地
         LODOP.ADD_PRINT_LINE("34mm","2mm","34mm","98mm",0,1);
         LODOP.ADD_PRINT_LINE("34mm","50mm","22mm","50mm",0,1);
         
         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",7);
         LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
         LODOP.ADD_PRINT_TEXT("23mm","4mm","6mm","12mm","始\n发\n地");
         
         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",10);
         LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
        //  LODOP.ADD_PRINT_TEXT("23mm","10mm","38mm","6mm",formatData(data.origSortCenter));
         LODOP.ADD_PRINT_TEXT("23mm","10mm","38mm","6mm",common.formatData(data.origSortCenter));

         
         
         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",10);
         LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
        //  LODOP.ADD_PRINT_TEXT("29mm","10mm","38mm","6mm",formatData(data.origCrossCode)+"-"+formatData(data.origTabletrolleyCode));
         LODOP.ADD_PRINT_TEXT("29mm","10mm","38mm","6mm",common.formatData(data.origCrossCode)+"-"+common.formatData(data.origTabletrolleyCode));

         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",7);
         LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
         LODOP.ADD_PRINT_TEXT("23mm","52mm","6mm","12mm","目\n的\n地");
         LODOP.ADD_PRINT_LINE("34mm","57mm","22mm","57mm",0,1);
         LODOP.ADD_PRINT_LINE("40mm","2mm","40mm","98mm",0,1);
         
         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",10);
         LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
        //  LODOP.ADD_PRINT_TEXT("23mm","58mm","38mm","6mm",formatData(data.destSortCenter));
         LODOP.ADD_PRINT_TEXT("23mm","58mm","38mm","6mm",common.formatData(data.destSortCenter));
         
         
         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",10);
         LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
        //  LODOP.ADD_PRINT_TEXT("29mm","58mm","38mm","6mm",formatData(data.destCrossCode)+"-"+formatData(data.destTabletrolleyCode));
         LODOP.ADD_PRINT_TEXT("29mm","58mm","38mm","6mm",common.formatData(data.destCrossCode)+"-"+common.formatData(data.destTabletrolleyCode));

         LODOP.ADD_PRINT_LINE("40mm","50mm","34mm","50mm",0,1);
         LODOP.ADD_PRINT_LINE("40mm","60mm","34mm","60mm",0,1);
         
         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",10);
         LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
        //  LODOP.ADD_PRINT_TEXT("35mm","9mm","41mm","6mm",formatData(data.siteName));
         LODOP.ADD_PRINT_TEXT("35mm","9mm","41mm","6mm",common.formatData(data.siteName));

         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",10);
         LODOP.SET_PRINT_STYLE("Alignment",2); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
        //  LODOP.ADD_PRINT_TEXT("35mm","50mm","12mm","6mm",formatData(data.road));
         LODOP.ADD_PRINT_TEXT("35mm","50mm","12mm","6mm",common.formatData(data.road));

         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",10);
         LODOP.SET_PRINT_STYLE("Alignment",2); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
        //  LODOP.ADD_PRINT_TEXT("35mm","62mm","30mm","6mm",formatData(data.packageNum)+"/" + formatData(data.packageCount));
         LODOP.ADD_PRINT_TEXT("35mm","62mm","30mm","6mm",common.formatData(data.packageNum)+"/" + common.formatData(data.packageCount));

         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",8);
         LODOP.SET_PRINT_STYLE("Alignment",2); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
         LODOP.ADD_PRINT_TEXT("41mm","3mm","6mm","16mm","客\n户\n信\n息");
         
         LODOP.ADD_PRINT_LINE("56mm","60mm","40mm","60mm",0,1);
         LODOP.ADD_PRINT_LINE("48mm","60mm","48mm","98mm",0,1);
         LODOP.ADD_PRINT_LINE("56mm","70mm","40mm","70mm",0,1);
         
         LODOP.SET_PRINT_STYLE("Bold",0);
         LODOP.SET_PRINT_STYLE("FontSize",8);
         LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
        //  LODOP.ADD_PRINT_TEXT("42mm","12mm","50mm","6mm",formatData(data.receiveAddress));
         LODOP.ADD_PRINT_TEXT("42mm","12mm","50mm","6mm",common.formatData(data.receiveAddress));

         LODOP.SET_PRINT_STYLE("Bold",0);
         LODOP.SET_PRINT_STYLE("FontSize",8);
         LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
        //  LODOP.ADD_PRINT_TEXT("50mm","12mm","50mm","8mm",formatData(data.receiveName)+" " + formatData(data.receiveTel));
         LODOP.ADD_PRINT_TEXT("50mm","12mm","50mm","8mm",common.formatData(data.receiveName)+" " + common.formatData(data.receiveTel));

         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",8);
         LODOP.SET_PRINT_STYLE("Alignment",2); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
         LODOP.ADD_PRINT_TEXT("41mm","61mm","10mm","10mm","客户\n签字");
         
         
         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",8);
         LODOP.SET_PRINT_STYLE("Alignment",2); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
         LODOP.ADD_PRINT_TEXT("49mm","61mm","10mm","10mm","应收\n金额");
         
         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",8);
         LODOP.SET_PRINT_STYLE("Alignment",2); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
    //	 LODOP.ADD_PRINT_TEXT("51mm","70mm","20mm","10mm","￥110.00元");
         LODOP.ADD_PRINT_TEXT("51mm","70mm","20mm","10mm","");
         
         LODOP.ADD_PRINT_LINE("56mm","9mm","22mm","9mm",0,1);
        
         //打印时间
         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",10);
         LODOP.SET_PRINT_STYLE("Alignment",2); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
        //  LODOP.ADD_PRINT_TEXT("57mm","50mm","30mm","10mm",common.formatData("yyyy-MM-dd HH:mm:ss"));
        LODOP.ADD_PRINT_TEXT("57mm","50mm","30mm","10mm",common.formatData(data.printDate));
         
         //下半部分
         
         LODOP.ADD_PRINT_LINE("60mm","2mm","60mm","98mm",0,1);
         LODOP.ADD_PRINT_LINE("109mm","2mm","109mm","98mm",0,1);
         LODOP.ADD_PRINT_LINE("109mm","2mm","60mm","2mm",0,1);
         LODOP.ADD_PRINT_LINE("60mm","98mm","109mm","98mm",0,1);
        
         //运单号
         LODOP.ADD_PRINT_LINE("67mm","2mm","67mm","98mm",0,1);
         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",10);
         LODOP.SET_PRINT_STYLE("Alignment",2); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
         LODOP.ADD_PRINT_TEXT("62mm","35mm","15mm","10mm","运单号");
         
         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",10);
         LODOP.SET_PRINT_STYLE("Alignment",2); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
        //  LODOP.ADD_PRINT_TEXT("62mm","50mm","40mm","10mm",formatData(data.deliveryId));
         LODOP.ADD_PRINT_TEXT("62mm","50mm","40mm","10mm",common.formatData(data.deliveryId));
         
         LODOP.ADD_PRINT_LINE("83mm","2mm","83mm","98mm",0,1);
         LODOP.ADD_PRINT_LINE("83mm","60mm","67mm","60mm",0,1);
         
         //主条码
         LODOP.SET_PRINT_STYLE("Bold",0);
         LODOP.SET_PRINT_STYLE("FontSize",8);
         LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
        //  LODOP.ADD_PRINT_TEXT("68mm","2mm","58mm","8mm","收件信息 "+ formatData(data.receiveName)+" " + formatData(data.receiveTel));
        //  LODOP.ADD_PRINT_BARCODE("72mm", "10mm","50mm", "10mm", "128A",formatData(data.deliveryId))
         LODOP.ADD_PRINT_TEXT("68mm","2mm","58mm","8mm","收件信息 "+ common.formatData(data.receiveName)+" " + common.formatData(data.receiveTel));
         LODOP.ADD_PRINT_BARCODE("72mm", "10mm","50mm", "10mm", "128A",common.formatData(data.deliveryId))
         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",8);
         LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
         LODOP.ADD_PRINT_TEXT("68mm","64mm","40mm","16mm","备注：");
         
         
         LODOP.ADD_PRINT_LINE("90mm","2mm","90mm","98mm",0,1);
         
         LODOP.ADD_PRINT_LINE("90mm","26mm","83mm","26mm",0,1);
         LODOP.ADD_PRINT_LINE("90mm","60mm","83mm","60mm",0,1);
         LODOP.ADD_PRINT_LINE("90mm","82mm","83mm","82mm",0,1);
         
         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",8);
         LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
        //  LODOP.ADD_PRINT_TEXT("85mm","34mm","20mm","10mm",formatData(data.deliveryTypeName)); // 默认特惠送
         LODOP.ADD_PRINT_TEXT("85mm","34mm","20mm","10mm",common.formatData(data.deliveryTypeName)); // 默认特惠送

    
         LODOP.ADD_PRINT_LINE("103mm","2mm","103mm","98mm",0,1);
         LODOP.ADD_PRINT_LINE("103mm","60mm","90mm","60mm",0,1);
         
         //寄方信息
         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",6);
         LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
         LODOP.ADD_PRINT_TEXT("90mm","2mm","20mm","10mm","寄方信息：");
         
         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",6);
         LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
        //  LODOP.ADD_PRINT_TEXT("93mm","2mm","60mm","10mm"," " +formatData(data.senderAddress));
         LODOP.ADD_PRINT_TEXT("93mm","2mm","60mm","10mm"," " +common.formatData(data.senderAddress));

         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",6);
         LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
        //  LODOP.ADD_PRINT_TEXT("99mm","2mm","60mm","10mm"," " + formatData(data.senderName)+" " + formatData(data.senderTel));
         LODOP.ADD_PRINT_TEXT("99mm","2mm","60mm","10mm"," " + common.formatData(data.senderName)+" " + common.formatData(data.senderTel));

         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",7);
         LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
         LODOP.ADD_PRINT_TEXT("92mm","62mm","20mm","10mm","商家ID：");
         
         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",7);
         LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
         LODOP.ADD_PRINT_TEXT("92mm","72mm","30mm","10mm","");
         
         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",7);
         LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
         LODOP.ADD_PRINT_TEXT("96mm","62mm","20mm","10mm","商家订单号：");
         
         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",7);
         LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
        //  LODOP.ADD_PRINT_TEXT("96mm","78mm","22mm","10mm",data.orderId);
         LODOP.ADD_PRINT_TEXT("96mm","78mm","22mm","10mm",common.formatData(data.orderId));

         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",8);
         LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
         LODOP.ADD_PRINT_TEXT("105mm","60mm","20mm","10mm","始发城市：");
         
         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",8);
         LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
        //  LODOP.ADD_PRINT_TEXT("105mm","74mm","28mm","10mm",formatData(data.sendCity));
         LODOP.ADD_PRINT_TEXT("105mm","74mm","28mm","10mm",common.formatData(data.sendCity));

         LODOP.ADD_PRINT_LINE("109mm","60mm","103mm","60mm",0,1);
         //开始打印
        lodopUtil.doPrint(LODOP,printViewFlag,printMachine);
    }


/**
 * 
 * 京东ECLP沧海打印-自己特殊处理
 * data 打印源数据
 * printMachine 打印机器
 * taskName   打印任务名称
 * printViewFlag 是否打印预览标准 true 预览，false 直接打印
 * resourcesPath 资源路径
 * 
 * 100mm * 113 mm 模板
 */
// var jdEclpOrderPrint = function(data,printMachine,taskName,printViewFlag,resourcesPath){
//         /**初始化打印对象 **/
//          var LODOP = getLodop();
//          LODOP.PRINT_INIT(taskName);
//          LODOP.PRINT_INITA(top,left,width,height,taskName);  
//          LODOP.SET_PRINT_PAGESIZE(1,"100mm","113mm","");  
         
//          //绘制 上半部 区域
//          LODOP.ADD_PRINT_LINE("2mm","2mm","2mm","98mm",0,1);
//          LODOP.ADD_PRINT_LINE("2mm","2mm","56mm","2mm",0,1);
//          LODOP.ADD_PRINT_LINE("56mm","2mm","56mm","98mm",0,1);
//          LODOP.ADD_PRINT_LINE("56mm","98mm","2mm","98mm",0,1);
         
         
//          // 子条码 区域  (2 , 2 , 15 * 80) 
//          // 重量      18,80,6 * 12
//          LODOP.ADD_PRINT_LINE("22mm","2mm","22mm","98mm",0,1);
//          LODOP.ADD_PRINT_BARCODE("3mm", "12mm","80mm", "14mm", "128A",formatData(data.packageCode))
         
//          LODOP.SET_PRINT_STYLE("Bold",1);
//          LODOP.SET_PRINT_STYLE("FontSize",10);
//          LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
//          LODOP.ADD_PRINT_TEXT("18mm","60mm","20mm","10mm",formatData(data.weight)+"KG");
//          // 始发地
//          // 目的地
//          LODOP.ADD_PRINT_LINE("34mm","2mm","34mm","98mm",0,1);
//          LODOP.ADD_PRINT_LINE("34mm","50mm","22mm","50mm",0,1);
         
//          LODOP.SET_PRINT_STYLE("Bold",1);
//          LODOP.SET_PRINT_STYLE("FontSize",7);
//          LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
//          LODOP.ADD_PRINT_TEXT("23mm","4mm","6mm","12mm","始\n发\n地");
         
//          LODOP.SET_PRINT_STYLE("Bold",1);
//          LODOP.SET_PRINT_STYLE("FontSize",10);
//          LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
//          LODOP.ADD_PRINT_TEXT("23mm","10mm","38mm","6mm",formatData(data.origSortCenter));
         
         
         
//          LODOP.SET_PRINT_STYLE("Bold",1);
//          LODOP.SET_PRINT_STYLE("FontSize",10);
//          LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
//          LODOP.ADD_PRINT_TEXT("29mm","10mm","38mm","6mm",formatData(data.origCrossCode)+"-"+formatData(data.origTabletrolleyCode));
         
//          LODOP.SET_PRINT_STYLE("Bold",1);
//          LODOP.SET_PRINT_STYLE("FontSize",7);
//          LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
//          LODOP.ADD_PRINT_TEXT("23mm","52mm","6mm","12mm","目\n的\n地");
//          LODOP.ADD_PRINT_LINE("34mm","57mm","22mm","57mm",0,1);
//          LODOP.ADD_PRINT_LINE("40mm","2mm","40mm","98mm",0,1);
         
//          LODOP.SET_PRINT_STYLE("Bold",1);
//          LODOP.SET_PRINT_STYLE("FontSize",10);
//          LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
//          LODOP.ADD_PRINT_TEXT("23mm","58mm","38mm","6mm",formatData(data.destSortCenter));
         
         
         
//          LODOP.SET_PRINT_STYLE("Bold",1);
//          LODOP.SET_PRINT_STYLE("FontSize",10);
//          LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
//          LODOP.ADD_PRINT_TEXT("29mm","58mm","38mm","6mm",formatData(data.destCrossCode)+"-"+formatData(data.destTabletrolleyCode));
         
//          LODOP.ADD_PRINT_LINE("40mm","50mm","34mm","50mm",0,1);
//          LODOP.ADD_PRINT_LINE("40mm","60mm","34mm","60mm",0,1);
         
//          LODOP.SET_PRINT_STYLE("Bold",1);
//          LODOP.SET_PRINT_STYLE("FontSize",10);
//          LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
//          LODOP.ADD_PRINT_TEXT("35mm","9mm","41mm","6mm",formatData(data.siteName));
         
//          LODOP.SET_PRINT_STYLE("Bold",1);
//          LODOP.SET_PRINT_STYLE("FontSize",10);
//          LODOP.SET_PRINT_STYLE("Alignment",2); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
//          LODOP.ADD_PRINT_TEXT("35mm","50mm","12mm","6mm",formatData(data.road));
         
//          LODOP.SET_PRINT_STYLE("Bold",1);
//          LODOP.SET_PRINT_STYLE("FontSize",10);
//          LODOP.SET_PRINT_STYLE("Alignment",2); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
//          LODOP.ADD_PRINT_TEXT("35mm","62mm","30mm","6mm",formatData(data.packageNum)+"/" + formatData(data.packageCount));
     
//          LODOP.SET_PRINT_STYLE("Bold",1);
//          LODOP.SET_PRINT_STYLE("FontSize",8);
//          LODOP.SET_PRINT_STYLE("Alignment",2); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
//          LODOP.ADD_PRINT_TEXT("41mm","3mm","6mm","16mm","客\n户\n信\n息");
         
//          LODOP.ADD_PRINT_LINE("56mm","60mm","40mm","60mm",0,1);
//          LODOP.ADD_PRINT_LINE("48mm","60mm","48mm","98mm",0,1);
//          LODOP.ADD_PRINT_LINE("56mm","70mm","40mm","70mm",0,1);
         
//          LODOP.SET_PRINT_STYLE("Bold",0);
//          LODOP.SET_PRINT_STYLE("FontSize",8);
//          LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
//          LODOP.ADD_PRINT_TEXT("42mm","12mm","50mm","6mm",formatData(data.receiveAddress));
         
//          LODOP.SET_PRINT_STYLE("Bold",0);
//          LODOP.SET_PRINT_STYLE("FontSize",8);
//          LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
//          LODOP.ADD_PRINT_TEXT("50mm","12mm","50mm","8mm",formatData(data.receiveName)+" " + formatData(data.receiveTel));
         
//          LODOP.SET_PRINT_STYLE("Bold",1);
//          LODOP.SET_PRINT_STYLE("FontSize",8);
//          LODOP.SET_PRINT_STYLE("Alignment",2); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
//          LODOP.ADD_PRINT_TEXT("41mm","61mm","10mm","10mm","客户\n签字");
         
         
//          LODOP.SET_PRINT_STYLE("Bold",1);
//          LODOP.SET_PRINT_STYLE("FontSize",8);
//          LODOP.SET_PRINT_STYLE("Alignment",2); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
//          LODOP.ADD_PRINT_TEXT("49mm","61mm","10mm","10mm","应收\n金额");
         
//          LODOP.SET_PRINT_STYLE("Bold",1);
//          LODOP.SET_PRINT_STYLE("FontSize",8);
//          LODOP.SET_PRINT_STYLE("Alignment",2); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
//     //	 LODOP.ADD_PRINT_TEXT("51mm","70mm","20mm","10mm","￥110.00元");
//          LODOP.ADD_PRINT_TEXT("51mm","70mm","20mm","10mm","");
         
//          LODOP.ADD_PRINT_LINE("56mm","9mm","22mm","9mm",0,1);
         
         
//          //运单号
//          LODOP.SET_PRINT_STYLE("Bold",1);
//          LODOP.SET_PRINT_STYLE("FontSize",10);
//          LODOP.SET_PRINT_STYLE("Alignment",2); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
//          LODOP.ADD_PRINT_TEXT("57mm","50mm","30mm","10mm",formatNowDateyyyyMMdd());
         
//          //下半部分
         
//          LODOP.ADD_PRINT_LINE("60mm","2mm","60mm","98mm",0,1);
//          LODOP.ADD_PRINT_LINE("109mm","2mm","109mm","98mm",0,1);
//          LODOP.ADD_PRINT_LINE("109mm","2mm","60mm","2mm",0,1);
//          LODOP.ADD_PRINT_LINE("60mm","98mm","109mm","98mm",0,1);
        
//          //运单号
//          LODOP.ADD_PRINT_LINE("67mm","2mm","67mm","98mm",0,1);
//          LODOP.SET_PRINT_STYLE("Bold",1);
//          LODOP.SET_PRINT_STYLE("FontSize",10);
//          LODOP.SET_PRINT_STYLE("Alignment",2); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
//          LODOP.ADD_PRINT_TEXT("62mm","35mm","15mm","10mm","运单号");
         
//          LODOP.SET_PRINT_STYLE("Bold",1);
//          LODOP.SET_PRINT_STYLE("FontSize",10);
//          LODOP.SET_PRINT_STYLE("Alignment",2); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
//          LODOP.ADD_PRINT_TEXT("62mm","50mm","40mm","10mm",formatData(data.deliveryId));
         
//          LODOP.ADD_PRINT_LINE("83mm","2mm","83mm","98mm",0,1);
//          LODOP.ADD_PRINT_LINE("83mm","60mm","67mm","60mm",0,1);
         
//          //主条码
//          LODOP.SET_PRINT_STYLE("Bold",0);
//          LODOP.SET_PRINT_STYLE("FontSize",8);
//          LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
//          LODOP.ADD_PRINT_TEXT("68mm","2mm","58mm","8mm","收件信息 "+ formatData(data.receiveName)+" " + formatData(data.receiveTel));
//          LODOP.ADD_PRINT_BARCODE("72mm", "10mm","50mm", "10mm", "128A",formatData(data.deliveryId))
         
//          LODOP.SET_PRINT_STYLE("Bold",1);
//          LODOP.SET_PRINT_STYLE("FontSize",8);
//          LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
//          LODOP.ADD_PRINT_TEXT("68mm","64mm","40mm","16mm","备注：");
         
         
//          LODOP.ADD_PRINT_LINE("90mm","2mm","90mm","98mm",0,1);
         
//          LODOP.ADD_PRINT_LINE("90mm","26mm","83mm","26mm",0,1);
//          LODOP.ADD_PRINT_LINE("90mm","60mm","83mm","60mm",0,1);
//          LODOP.ADD_PRINT_LINE("90mm","82mm","83mm","82mm",0,1);
         
//          LODOP.SET_PRINT_STYLE("Bold",1);
//          LODOP.SET_PRINT_STYLE("FontSize",8);
//          LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
//          LODOP.ADD_PRINT_TEXT("85mm","34mm","20mm","10mm",formatData(data.deliveryTypeName)); // 默认特惠送
         
    
//          LODOP.ADD_PRINT_LINE("103mm","2mm","103mm","98mm",0,1);
//          LODOP.ADD_PRINT_LINE("103mm","60mm","90mm","60mm",0,1);
         
//          //寄方信息
//          LODOP.SET_PRINT_STYLE("Bold",1);
//          LODOP.SET_PRINT_STYLE("FontSize",6);
//          LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
//          LODOP.ADD_PRINT_TEXT("90mm","2mm","20mm","10mm","寄方信息：");
         
//          LODOP.SET_PRINT_STYLE("Bold",1);
//          LODOP.SET_PRINT_STYLE("FontSize",6);
//          LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
//          LODOP.ADD_PRINT_TEXT("93mm","2mm","60mm","10mm"," " +formatData(data.senderAddress));
         
//          LODOP.SET_PRINT_STYLE("Bold",1);
//          LODOP.SET_PRINT_STYLE("FontSize",6);
//          LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
//          LODOP.ADD_PRINT_TEXT("99mm","2mm","60mm","10mm"," " + formatData(data.senderName)+" " + formatData(data.senderTel));
         
//          LODOP.SET_PRINT_STYLE("Bold",1);
//          LODOP.SET_PRINT_STYLE("FontSize",7);
//          LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
//          LODOP.ADD_PRINT_TEXT("92mm","62mm","20mm","10mm","商家ID：");
         
//          LODOP.SET_PRINT_STYLE("Bold",1);
//          LODOP.SET_PRINT_STYLE("FontSize",7);
//          LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
//          LODOP.ADD_PRINT_TEXT("92mm","72mm","30mm","10mm","");
         
//          LODOP.SET_PRINT_STYLE("Bold",1);
//          LODOP.SET_PRINT_STYLE("FontSize",7);
//          LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
//          LODOP.ADD_PRINT_TEXT("96mm","62mm","20mm","10mm","商家订单号：");
         
//          LODOP.SET_PRINT_STYLE("Bold",1);
//          LODOP.SET_PRINT_STYLE("FontSize",7);
//          LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
//          LODOP.ADD_PRINT_TEXT("96mm","78mm","22mm","10mm",data.orderId);
         
//          LODOP.SET_PRINT_STYLE("Bold",1);
//          LODOP.SET_PRINT_STYLE("FontSize",8);
//          LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
//          LODOP.ADD_PRINT_TEXT("105mm","60mm","20mm","10mm","始发城市：");
         
//          LODOP.SET_PRINT_STYLE("Bold",1);
//          LODOP.SET_PRINT_STYLE("FontSize",8);
//          LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
//          LODOP.ADD_PRINT_TEXT("105mm","74mm","28mm","10mm",formatData(data.sendCity));
         
//          LODOP.ADD_PRINT_LINE("109mm","60mm","103mm","60mm",0,1);
//          //开始打印
        //  commonKdPrint(LODOP,printMachine,printViewFlag);
//     }






export {
	printEclpOrders, //打印方法
}