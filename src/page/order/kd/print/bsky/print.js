import lodopUtil from "@/utils/lodop/lodop-business.js"
import {getLodop} from '@/utils/lodop/LodopFuncs.js'
import common from '@/utils/common.js'
// 打印信息 
let orders = [];


/**
 * 
 * 百世快运打印-N 张
 * datas  打印源数据结果列表
 * printMachine 打印机器
 * printViewFlag 是否打印预览标准
 * true 预览，false 直接打印
 * callback  返回函数
 * 
 * 100mm * 180 mm 菜鸟电子面单
 */

const printBskyOrders = function(datas,printMachine,printViewFlag,callback){
   // 打印 多张电子面单
   for(let i in datas){
      let data = datas[i];
      let taskName = "BSKY_"+ data.packageCode + "_" + data.indexNo;
      printBskyOrder(datas[i],printMachine,taskName,printViewFlag);
   }
   callback(datas);
}

/**
 * 
 * 百世快运打印-自己特殊处理
 * data 打印源数据
 * printMachine 打印机器
 * taskName   打印任务名称
 * printViewFlag 是否打印预览标准 true 预览，false 直接打印
 * topAndLeft
 * 100mm * 180 mm 菜鸟电子面单
 */
const printBskyOrder = function(data,printMachine,taskName,printViewFlag){
//    debugger
   /**初始化打印对象 **/
    let LODOP = getLodop();
    LODOP.PRINT_INIT(taskName);
    LODOP.PRINT_INITA(0,0,"100mm","180mm",taskName);  
    LODOP.SET_PRINT_PAGESIZE(1,"100mm","180mm","");  
   
    let resourcesPath = "/static/kd/print/bsky/resources/"; // 资源位置 TODO
 	 //绘制 区域
	 LODOP.ADD_PRINT_LINE("0mm","0mm","0mm","100mm",0,1);
	 LODOP.ADD_PRINT_LINE("179mm","0mm","179mm","100mm",0,1);
	 LODOP.ADD_PRINT_LINE("0mm","0mm","179mm","0mm",0,1);
	 LODOP.ADD_PRINT_LINE("179mm","100mm","0mm","100mm",0,1);
    	 // 区域 1	 
	 LODOP.SET_PRINT_STYLE("Bold",1);
	 LODOP.SET_PRINT_STYLE("FontSize",14);
	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
	 LODOP.ADD_PRINT_TEXT("4mm","40mm","45mm","10mm",common.formatData(data.parentWaybillCode));

    LODOP.SET_PRINT_STYLE("Bold",1);
	 LODOP.SET_PRINT_STYLE("FontSize",14);
	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
	 LODOP.ADD_PRINT_TEXT("4mm","80mm","20mm","10mm","快运");
	 
	 LODOP.ADD_PRINT_LINE("15mm","0mm","15mm","100mm",0,1);
	 
	 LODOP.SET_PRINT_STYLE("FontSize",20);
	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
	 LODOP.ADD_PRINT_TEXT("16mm","4mm","46mm","10mm",common.formatData( data.dispParentName));
	 
	 LODOP.SET_PRINT_STYLE("FontSize",12);
	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
	 LODOP.ADD_PRINT_TEXT("18mm","50mm","10mm","10mm",common.formatData(data.index));
 
	 LODOP.SET_PRINT_STYLE("FontSize",12);
	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
	 LODOP.ADD_PRINT_TEXT("18mm","60mm","40mm","10mm",common.formatData( data.pack));
	 
	 
	 LODOP.ADD_PRINT_LINE("25mm","0mm","25mm","100mm",0,1);
	 
	 LODOP.SET_PRINT_STYLE("FontSize",14);
	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
	 LODOP.ADD_PRINT_TEXT("28mm","4mm","96mm","10mm",common.formatData( data.routingInfo));
	 
	 
	 LODOP.ADD_PRINT_LINE("35mm","0mm","35mm","100mm",0,1);
	 
	 
	 LODOP.SET_PRINT_STYLE("FontSize",12);
	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
	 LODOP.ADD_PRINT_TEXT("38mm","4mm","75mm","10mm",common.formatData( data.dispSiteName));
	 
	 LODOP.SET_PRINT_STYLE("Bold",0);
	 LODOP.SET_PRINT_STYLE("FontSize",10);
	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
	 LODOP.ADD_PRINT_TEXT("38mm","75mm","25mm","10mm",common.formatData( data.actualWeight) +"KG/" + common.formatData( data.cubic));
	 
	 LODOP.ADD_PRINT_LINE("45mm","0mm","45mm","100mm",0,1);
	 
	 LODOP.SET_PRINT_STYLE("Bold",1);
	 LODOP.SET_PRINT_STYLE("FontSize",12);
	 LODOP.ADD_PRINT_BARCODE("47mm", "10mm","90mm", "14mm", "128B",common.formatData(data.subCodePrintCode))
	 LODOP.SET_PRINT_STYLEA(0,"ShowBarText",0); 
	 LODOP.ADD_PRINT_TEXT("61mm","10mm","90mm","10mm",common.formatData(data.subCode));  
	 LODOP.ADD_PRINT_LINE("65mm","0mm","65mm","100mm",0,1);
	 LODOP.SET_PRINT_STYLE("Bold",1);
	 LODOP.SET_PRINT_STYLE("FontSize",18);
	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
	 LODOP.ADD_PRINT_TEXT("68mm","2mm","10mm","10mm","收");  
	 
	 LODOP.SET_PRINT_STYLE("Bold",1);
	 LODOP.SET_PRINT_STYLE("FontSize",12);
	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
	 LODOP.ADD_PRINT_TEXT("68mm","12mm","90mm","8mm",common.formatData( data.acceptPerson) + " " + common.formatData(data.acceptPhone));  

	 LODOP.SET_PRINT_STYLE("Bold",1);
	 LODOP.SET_PRINT_STYLE("FontSize",10);
	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
	 LODOP.ADD_PRINT_TEXT("75mm","12mm","88mm","8mm",common.formatData(data.acceptAddress));  
	 
	 
	 LODOP.ADD_PRINT_LINE("80mm","11mm","65mm","11mm",0,1);
	 LODOP.ADD_PRINT_LINE("80mm","0mm","80mm","100mm",0,1);

	 LODOP.SET_PRINT_STYLE("Bold",1);
	 LODOP.SET_PRINT_STYLE("FontSize",12);
	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
	 LODOP.ADD_PRINT_TEXT("84mm","1mm","13mm","12mm","服务");
	 
	 LODOP.SET_PRINT_STYLE("Bold",1);
	 LODOP.SET_PRINT_STYLE("FontSize",12);
	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
//	 送贷方式 347：自提 57：派送
	 LODOP.ADD_PRINT_TEXT("84mm","25mm","30mm","10mm",  common.formatData(data.serviceModeIdName));
	 
	 LODOP.SET_PRINT_STYLE("Bold",1);
	 LODOP.SET_PRINT_STYLE("FontSize",12);
	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
	 LODOP.ADD_PRINT_TEXT("84mm","73mm","30mm","10mm","收件签名：");
	 
	 
	 LODOP.ADD_PRINT_LINE("90mm","0mm","90mm","100mm",0,1);
	 LODOP.ADD_PRINT_LINE("90mm","11mm","80mm","11mm",0,1);
	 
	 
	 LODOP.SET_PRINT_STYLE("Bold",1);
	 LODOP.SET_PRINT_STYLE("FontSize",12);
	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
	 LODOP.ADD_PRINT_TEXT("95mm","1mm","13mm","12mm","增值");
	
	 LODOP.SET_PRINT_STYLE("Bold",1);
	 LODOP.SET_PRINT_STYLE("FontSize",12);
	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
	 LODOP.ADD_PRINT_TEXT("95mm","12mm","60mm","15mm",common.formatData(data.serviceName));
	 
	 
	 
	 LODOP.ADD_PRINT_LINE("105mm","70mm","80mm","70mm",0,1);
	 LODOP.ADD_PRINT_LINE("105mm","0mm","105mm","100mm",0,1);
	 LODOP.ADD_PRINT_LINE("105mm","11mm","90mm","11mm",0,1);
	 
	 LODOP.ADD_PRINT_LINE("110mm","0mm","110mm","100mm",1,0);
	 
	 LODOP.SET_PRINT_STYLE("Bold",1);
	 LODOP.SET_PRINT_STYLE("FontSize",10);
	 LODOP.ADD_PRINT_BARCODE("111mm", "35mm","60mm", "8mm", "128B",common.formatData(data.subCodePrintCode))
	 LODOP.SET_PRINT_STYLEA(0,"ShowBarText",0);  
	 LODOP.ADD_PRINT_LINE("120mm","0mm","120mm","100mm",0,1);
	 
	 LODOP.SET_PRINT_STYLE("Bold",1);
	 LODOP.SET_PRINT_STYLE("FontSize",14);
	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
	 LODOP.ADD_PRINT_TEXT("124.5mm","3mm","10mm","10mm","收");  
	 
	 LODOP.SET_PRINT_STYLE("Bold",1);
	 LODOP.SET_PRINT_STYLE("FontSize",8);
	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
	 LODOP.ADD_PRINT_TEXT("122.5mm","11.5mm","62mm","8mm",common.formatData( data.acceptPerson) + " " + common.formatData(data.acceptPhoneAndTel)); 

	 LODOP.SET_PRINT_STYLE("Bold",1);
	 LODOP.SET_PRINT_STYLE("FontSize",8);
	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
	 LODOP.ADD_PRINT_TEXT("128.5mm","11.5mm","62mm","8mm",common.formatData(data.acceptAddress));  
	 
	 
	 LODOP.SET_PRINT_STYLE("Bold",1);
	 LODOP.SET_PRINT_STYLE("FontSize",14);
	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
	 LODOP.ADD_PRINT_TEXT("136.5mm","3mm","10mm","10mm","寄");  
	 
	 LODOP.SET_PRINT_STYLE("Bold",1);
	 LODOP.SET_PRINT_STYLE("FontSize",8);
	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
	 LODOP.ADD_PRINT_TEXT("134.5mm","11.5mm","62mm","8mm",common.formatData( data.sendPerson)+" "+common.formatData(data.sendPhoneAndTel));  

	 LODOP.SET_PRINT_STYLE("Bold",1);
	 LODOP.SET_PRINT_STYLE("FontSize",8);
	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
	 
	
	 LODOP.ADD_PRINT_TEXT("140.5mm","11.5mm","62mm","8mm",common.formatData(data.sendAddress));  
	 
	 LODOP.SET_PRINT_STYLE("Bold",1);
	 LODOP.SET_PRINT_STYLE("FontSize",14);
	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
	 LODOP.ADD_PRINT_TEXT("148mm","1mm","13mm","10mm","货品");  
	 
	 LODOP.SET_PRINT_STYLE("Bold",1);
	 LODOP.SET_PRINT_STYLE("FontSize",10);
	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
	 LODOP.ADD_PRINT_TEXT("148mm","13mm","40mm","10mm",common.formatData(data.cargo));  
	 
	 LODOP.ADD_PRINT_IMAGE("125mm","72mm","25mm", "25mm","<img src='"+resourcesPath+"logo.jpg'/>");
	 LODOP.SET_PRINT_STYLEA(0,"Stretch",1);//(可变形)扩展缩放模式
	 
	 LODOP.SET_PRINT_STYLE("FontSize",7);
	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
	 LODOP.ADD_PRINT_TEXT("149mm","72mm","30mm", "10mm","拍照下单，智能高效")
	 
	 LODOP.ADD_PRINT_LINE("132.5mm","0mm","132.5mm","70mm",0,1);
	 LODOP.ADD_PRINT_LINE("145mm","0mm","145mm","70mm",0,1);
	 LODOP.ADD_PRINT_LINE("155mm","0mm","155mm","100mm",0,1);
	 LODOP.ADD_PRINT_LINE("155mm","70mm","120mm","70mm",0,1);
	 LODOP.ADD_PRINT_LINE("180mm","11mm","120mm","11mm",0,1);
	 
	 
	 LODOP.SET_PRINT_STYLE("Bold",0);
	 LODOP.SET_PRINT_STYLE("FontSize",12);
	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
	 LODOP.ADD_PRINT_TEXT("158mm","1mm","13mm","10mm","日期");  
	 
	 LODOP.SET_PRINT_STYLE("Bold",1);
	 LODOP.SET_PRINT_STYLE("FontSize",10);
	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
	 LODOP.ADD_PRINT_TEXT("159mm","15mm","40mm","10mm",common.formatData( data.gmtCommit).split(" ")[0]);  
	 
	 LODOP.SET_PRINT_STYLE("Bold",1);
	 LODOP.SET_PRINT_STYLE("FontSize",10);
	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
	 LODOP.ADD_PRINT_TEXT("156mm","45mm","70mm","20mm","全国客服:40088566561\n网   址：www.800best.com");  
	 
	 
	 
	 
	 LODOP.ADD_PRINT_LINE("165mm","0mm","165mm","100mm",0,1);
	 
	 
	 LODOP.SET_PRINT_STYLE("Bold",1);
	 LODOP.SET_PRINT_STYLE("FontSize",12);
	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
	 LODOP.ADD_PRINT_TEXT("168mm","1mm","13mm","10mm","备注");  
	 
	 LODOP.SET_PRINT_STYLE("Bold",1);
	 LODOP.SET_PRINT_STYLE("FontSize",10);
	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
	 LODOP.ADD_PRINT_TEXT("168mm","15mm","85mm","15mm",common.formatData( data.reMark));  
	 
	 LODOP.ADD_PRINT_LINE("179.5mm","0mm","179.5mm","100mm",0,1);
    //开始打印
   lodopUtil.doPrint(LODOP,printViewFlag,printMachine);
}

// /**
//  * 
//  * 百世快运打印-自己特殊处理
//  * data 打印源数据
//  * printMachine 打印机器
//  * taskName   打印任务名称
//  * printViewFlag 是否打印预览标准 true 预览，false 直接打印
//  * resourcesPath 资源路径
//  * topAndLeft
//  * 100mm * 180 mm 菜鸟电子面单
//  */
// var bsKyOrderPrint100180  = function(data,printMachine,taskName,printViewFlag,resourcesPath,topAndLeft){
// 	//处理打印地址 (始发)
// 	 var sendAddress = formatData(data.order.sendAddress);
// 	 if(sendAddress.indexOf(data.order.sendCity) < 0){
// 		 sendAddress = data.order.sendProvince + data.order.sendCity +  sendAddress
// 	 }
// 	//处理打印地址（目的）
// 	 var acceptAddress = formatData(data.order.acceptAddress);
// 	 if(acceptAddress.indexOf(data.order.acceptCity) < 0){
// 		 acceptAddress = data.order.acceptProvince + data.order.acceptCity +  acceptAddress
// 	 }
// 	 var sendPhone = formatData(data.order.sendPhone);
// 	 if(sendPhone == ""){
// 		 sendPhone = data.order.sendTelPhone;
// 	 }
	 
// 	 var acceptPhone = formatData(data.order.acceptPhone);
// 	 if(acceptPhone == ""){
// 		 acceptPhone = data.order.acceptTelPhone;
// 	 }
	 
// 	 //初始化
// 	 var LODOP = printInitPage(taskName,"100mm","180mm",topAndLeft);
// //	 LODOP.PRINT_INITA(Top,Left,Width,Height,strPrintName)
// 	 //绘制 区域
// 	 LODOP.ADD_PRINT_LINE("0mm","0mm","0mm","100mm",0,1);
// 	 LODOP.ADD_PRINT_LINE("179mm","0mm","179mm","100mm",0,1);
// 	 LODOP.ADD_PRINT_LINE("0mm","0mm","179mm","0mm",0,1);
// 	 LODOP.ADD_PRINT_LINE("179mm","100mm","0mm","100mm",0,1);
	 
	 
// 	 // 区域 1
// //	 LODOP.ADD_PRINT_LINE("18mm","0mm","18mm","101mm",0,1);
	 
// 	 LODOP.SET_PRINT_STYLE("Bold",1);
// 	 LODOP.SET_PRINT_STYLE("FontSize",14);
// 	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
// 	 LODOP.ADD_PRINT_TEXT("4mm","40mm","45mm","10mm",formatData(data.print.parentWaybillCode));
	 
// 	 LODOP.SET_PRINT_STYLE("Bold",1);
// 	 LODOP.SET_PRINT_STYLE("FontSize",14);
// 	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
// 	 LODOP.ADD_PRINT_TEXT("4mm","80mm","20mm","10mm","快运");
	 
// 	 LODOP.ADD_PRINT_LINE("15mm","0mm","15mm","100mm",0,1);
	 
// 	 LODOP.SET_PRINT_STYLE("FontSize",20);
// 	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
// 	 LODOP.ADD_PRINT_TEXT("16mm","4mm","46mm","10mm",formatData(data.print.dispParentName));
	 
// 	 LODOP.SET_PRINT_STYLE("FontSize",12);
// 	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
// 	 LODOP.ADD_PRINT_TEXT("18mm","50mm","10mm","10mm",formatData(data.index));
 
// 	 LODOP.SET_PRINT_STYLE("FontSize",12);
// 	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
// 	 LODOP.ADD_PRINT_TEXT("18mm","60mm","40mm","10mm",formatData(data.order.pack));
	 
	 
// 	 LODOP.ADD_PRINT_LINE("25mm","0mm","25mm","100mm",0,1);
	 
// 	 LODOP.SET_PRINT_STYLE("FontSize",14);
// 	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
// 	 LODOP.ADD_PRINT_TEXT("28mm","4mm","96mm","10mm",formatData(data.print.routingInfo));
	 
	 
// 	 LODOP.ADD_PRINT_LINE("35mm","0mm","35mm","100mm",0,1);
	 
	 
// 	 LODOP.SET_PRINT_STYLE("FontSize",12);
// 	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
// 	 LODOP.ADD_PRINT_TEXT("38mm","4mm","75mm","10mm",formatData(data.print.dispSiteName));
	 
// 	 LODOP.SET_PRINT_STYLE("Bold",0);
// 	 LODOP.SET_PRINT_STYLE("FontSize",10);
// 	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
// 	 LODOP.ADD_PRINT_TEXT("38mm","75mm","25mm","10mm",formatData(data.order.actualWeight) +"KG/" + formatData(data.order.cubic));
	 
// 	 LODOP.ADD_PRINT_LINE("45mm","0mm","45mm","100mm",0,1);
	 
// 	 LODOP.SET_PRINT_STYLE("Bold",1);
// 	 LODOP.SET_PRINT_STYLE("FontSize",12);
// 	 LODOP.ADD_PRINT_BARCODE("47mm", "10mm","90mm", "14mm", "128B",formatData(data.sub.subCodePrintCode))
// 	 LODOP.SET_PRINT_STYLEA(0,"ShowBarText",0); 
// 	 var  subCode = formatData(data.sub.subCode);
// 	 var subCodeTem = "";
// 	 for(var i = 0 ;  i<subCode.length;i++){
// 		 subCodeTem = subCodeTem + subCode.substring(i,i+1) + " ";
// 	 }
// 	 LODOP.ADD_PRINT_TEXT("61mm","10mm","90mm","10mm",subCodeTem);  
// 	 LODOP.ADD_PRINT_LINE("65mm","0mm","65mm","100mm",0,1);
// 	 LODOP.SET_PRINT_STYLE("Bold",1);
// 	 LODOP.SET_PRINT_STYLE("FontSize",18);
// 	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
// 	 LODOP.ADD_PRINT_TEXT("68mm","2mm","10mm","10mm","收");  
	 
// 	 LODOP.SET_PRINT_STYLE("Bold",1);
// 	 LODOP.SET_PRINT_STYLE("FontSize",12);
// 	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
// 	 LODOP.ADD_PRINT_TEXT("68mm","12mm","90mm","8mm",formatData(data.order.acceptPerson) + " " + acceptPhone);  

// 	 LODOP.SET_PRINT_STYLE("Bold",1);
// 	 LODOP.SET_PRINT_STYLE("FontSize",10);
// 	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
// 	 LODOP.ADD_PRINT_TEXT("75mm","12mm","88mm","8mm",acceptAddress);  
	 
	 
// 	 LODOP.ADD_PRINT_LINE("80mm","11mm","65mm","11mm",0,1);
// 	 LODOP.ADD_PRINT_LINE("80mm","0mm","80mm","100mm",0,1);

// 	 LODOP.SET_PRINT_STYLE("Bold",1);
// 	 LODOP.SET_PRINT_STYLE("FontSize",12);
// 	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
// 	 LODOP.ADD_PRINT_TEXT("84mm","1mm","13mm","12mm","服务");
	 
// 	 LODOP.SET_PRINT_STYLE("Bold",1);
// 	 LODOP.SET_PRINT_STYLE("FontSize",12);
// 	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
// //	 送贷方式 347：自提 57：派送
// 	 LODOP.ADD_PRINT_TEXT("84mm","25mm","30mm","10mm", data.order.serviceModeId == "57" ? "派送" : "自提" );
	 
// 	 LODOP.SET_PRINT_STYLE("Bold",1);
// 	 LODOP.SET_PRINT_STYLE("FontSize",12);
// 	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
// 	 LODOP.ADD_PRINT_TEXT("84mm","73mm","30mm","10mm","收件签名：");
	 
	 
// 	 LODOP.ADD_PRINT_LINE("90mm","0mm","90mm","100mm",0,1);
// 	 LODOP.ADD_PRINT_LINE("90mm","11mm","80mm","11mm",0,1);
	 
	 
// 	 LODOP.SET_PRINT_STYLE("Bold",1);
// 	 LODOP.SET_PRINT_STYLE("FontSize",12);
// 	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
// 	 LODOP.ADD_PRINT_TEXT("95mm","1mm","13mm","12mm","增值");
	 
	 
// 	 var serviceName = "";
// 	 serviceName = serviceName + (data.order.paymentTypeId == 31 ? "到付  " : ""); //	付款方式 30:发货人付款（现付） 31:收货人付款（到付）
// 	 serviceName = serviceName + (data.order.insuranceTypeID == 649 ? "易碎  " : ""); //保险类型 648:普通货险(默认) 649:易碎品险
// 	 serviceName = serviceName + (data.order.upstairsService ==1 || data.order.upstairsService ==2 ? "上楼  " : ""); //upstairsService	string	10	否	上楼服务（0:无,1:普通上楼,2大件上楼）
// 	 serviceName = serviceName + (data.order.entryService ==1 || data.order.entryService ==2  || data.order.entryService == 3 ? "进仓  " : ""); //entryService	string	10	否	进仓服务（0:无,1:空运进仓, 2:海运进仓, 3:保税进仓,）
// 	 serviceName = serviceName + (data.order.largeService ==1  ? "大件  " : ""); //	 largeService	string	10	否	特殊货物服务（0:无,1:大件服务）
// 	 serviceName = serviceName + (data.order.checkOrderId == 27  ? "回单  " : ""); //	  checkOrderId	string	10	否	签收回单 27:原单返回 0:无

	
// 	 LODOP.SET_PRINT_STYLE("Bold",1);
// 	 LODOP.SET_PRINT_STYLE("FontSize",12);
// 	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
// 	 LODOP.ADD_PRINT_TEXT("95mm","12mm","60mm","15mm",serviceName);
	 
	 
	 
// 	 LODOP.ADD_PRINT_LINE("105mm","70mm","80mm","70mm",0,1);
// 	 LODOP.ADD_PRINT_LINE("105mm","0mm","105mm","100mm",0,1);
// 	 LODOP.ADD_PRINT_LINE("105mm","11mm","90mm","11mm",0,1);
	 
// 	 LODOP.ADD_PRINT_LINE("110mm","0mm","110mm","100mm",1,0);
	 
// 	 LODOP.SET_PRINT_STYLE("Bold",1);
// 	 LODOP.SET_PRINT_STYLE("FontSize",10);
// 	 LODOP.ADD_PRINT_BARCODE("111mm", "35mm","60mm", "8mm", "128B",formatData(data.sub.subCodePrintCode))
// 	 LODOP.SET_PRINT_STYLEA(0,"ShowBarText",0);  
// 	 LODOP.ADD_PRINT_LINE("120mm","0mm","120mm","100mm",0,1);
	 
// 	 LODOP.SET_PRINT_STYLE("Bold",1);
// 	 LODOP.SET_PRINT_STYLE("FontSize",14);
// 	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
// 	 LODOP.ADD_PRINT_TEXT("124.5mm","3mm","10mm","10mm","收");  
	 
// 	 LODOP.SET_PRINT_STYLE("Bold",1);
// 	 LODOP.SET_PRINT_STYLE("FontSize",8);
// 	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
// 	 LODOP.ADD_PRINT_TEXT("122.5mm","11.5mm","62mm","8mm",formatData(data.order.acceptPerson) + " " + acceptPhone); 

// 	 LODOP.SET_PRINT_STYLE("Bold",1);
// 	 LODOP.SET_PRINT_STYLE("FontSize",8);
// 	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
// 	 LODOP.ADD_PRINT_TEXT("128.5mm","11.5mm","62mm","8mm",acceptAddress);  
	 
	 
// 	 LODOP.SET_PRINT_STYLE("Bold",1);
// 	 LODOP.SET_PRINT_STYLE("FontSize",14);
// 	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
// 	 LODOP.ADD_PRINT_TEXT("136.5mm","3mm","10mm","10mm","寄");  
	 
// 	 LODOP.SET_PRINT_STYLE("Bold",1);
// 	 LODOP.SET_PRINT_STYLE("FontSize",8);
// 	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
// 	 LODOP.ADD_PRINT_TEXT("134.5mm","11.5mm","62mm","8mm",formatData(data.order.sendPerson)+" "+sendPhone);  

// 	 LODOP.SET_PRINT_STYLE("Bold",1);
// 	 LODOP.SET_PRINT_STYLE("FontSize",8);
// 	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
	 
	
// 	 LODOP.ADD_PRINT_TEXT("140.5mm","11.5mm","62mm","8mm",sendAddress);  
	 
// 	 LODOP.SET_PRINT_STYLE("Bold",1);
// 	 LODOP.SET_PRINT_STYLE("FontSize",14);
// 	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
// 	 LODOP.ADD_PRINT_TEXT("148mm","1mm","13mm","10mm","货品");  
	 
// 	 LODOP.SET_PRINT_STYLE("Bold",1);
// 	 LODOP.SET_PRINT_STYLE("FontSize",10);
// 	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
// 	 LODOP.ADD_PRINT_TEXT("148mm","13mm","40mm","10mm",formatData(data.order.cargo));  
	 
// 	 LODOP.ADD_PRINT_IMAGE("125mm","72mm","25mm", "25mm","<img src='"+resourcesPath+"logo.jpg'/>");
// 	 LODOP.SET_PRINT_STYLEA(0,"Stretch",1);//(可变形)扩展缩放模式
	 
// 	 LODOP.SET_PRINT_STYLE("FontSize",7);
// 	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
// 	 LODOP.ADD_PRINT_TEXT("149mm","72mm","30mm", "10mm","拍照下单，智能高效")
	 
// 	 LODOP.ADD_PRINT_LINE("132.5mm","0mm","132.5mm","70mm",0,1);
// 	 LODOP.ADD_PRINT_LINE("145mm","0mm","145mm","70mm",0,1);
// 	 LODOP.ADD_PRINT_LINE("155mm","0mm","155mm","100mm",0,1);
// 	 LODOP.ADD_PRINT_LINE("155mm","70mm","120mm","70mm",0,1);
// 	 LODOP.ADD_PRINT_LINE("180mm","11mm","120mm","11mm",0,1);
	 
	 
// 	 LODOP.SET_PRINT_STYLE("Bold",0);
// 	 LODOP.SET_PRINT_STYLE("FontSize",12);
// 	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
// 	 LODOP.ADD_PRINT_TEXT("158mm","1mm","13mm","10mm","日期");  
	 
// 	 LODOP.SET_PRINT_STYLE("Bold",1);
// 	 LODOP.SET_PRINT_STYLE("FontSize",10);
// 	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
// 	 LODOP.ADD_PRINT_TEXT("159mm","15mm","40mm","10mm",formatData(data.order.gmtCommit).split(" ")[0]);  
	 
// 	 LODOP.SET_PRINT_STYLE("Bold",1);
// 	 LODOP.SET_PRINT_STYLE("FontSize",10);
// 	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
// 	 LODOP.ADD_PRINT_TEXT("156mm","45mm","70mm","20mm","全国客服:40088566561\n网   址：www.800best.com");  
	 
	 
	 
	 
// 	 LODOP.ADD_PRINT_LINE("165mm","0mm","165mm","100mm",0,1);
	 
	 
// 	 LODOP.SET_PRINT_STYLE("Bold",1);
// 	 LODOP.SET_PRINT_STYLE("FontSize",12);
// 	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
// 	 LODOP.ADD_PRINT_TEXT("168mm","1mm","13mm","10mm","备注");  
	 
// 	 LODOP.SET_PRINT_STYLE("Bold",1);
// 	 LODOP.SET_PRINT_STYLE("FontSize",10);
// 	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
// 	 LODOP.ADD_PRINT_TEXT("168mm","15mm","85mm","15mm",formatData(data.order.reMark));  
	 
	 
	 
// 	 LODOP.ADD_PRINT_LINE("179.5mm","0mm","179.5mm","100mm",0,1);
	 
// 	commonKdPrint(LODOP,printMachine,printViewFlag);
// }

export {
	printBskyOrders, //打印方法
}