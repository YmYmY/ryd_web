import lodopUtil from "@/utils/lodop/lodop-business.js"
import {getLodop} from '@/utils/lodop/LodopFuncs.js'
import common from '@/utils/common.js'
// 打印信息 
 let orders = [];



/**
 * 
 * 壹米滴答打印-N 张
 * datas  打印源数据结果列表
 * printMachine 打印机器
 * printViewFlag 是否打印预览标准
 * true 预览，false 直接打印
 * callback  返回函数
 * 
 * 100mm * 180 mm 模板
 */

const printYmddOrders = function(datas,printMachine,printViewFlag,callback){
   debugger
   // 打印 多张电子面单
   for(let i in datas){
      let data = datas[i];
      let taskName = "YIMIDIDA_"+ data.subOrder + "_" + data.indexNo;
      printYmddOrder100180(datas[i],printMachine,taskName,printViewFlag);
      console.log(taskName);
   }
   callback(datas);
}

/**
 * 
 * 壹米滴答打印-自己特殊处理 -1张
 * data 打印源数据
 * printMachine 打印机器
 * taskName   打印任务名称
 * printViewFlag 是否打印预览标准 true 预览，false 直接打印
 * topAndLeft
 * 100mm * 180 mm 菜鸟电子面单 （ 壹米滴答）
 */
var printYmddOrder100180  = function(data,printMachine,taskName,printViewFlag,topAndLeft){
      let resourcesPath = "/static/kd/print/ymdd/resources/"; // 资源位置 TODO 无法识别
      // let resourcesPath = "/static/kd/print/ydky/resources/"; // 资源位置 TODO
     
      /**初始化打印对象 **/
      let LODOP = getLodop();
      LODOP.PRINT_INIT(taskName);
      LODOP.PRINT_INITA(0,0,"100mm","180mm",taskName);  
      LODOP.SET_PRINT_PAGESIZE(1,"100mm","180mm","");  
      //绘制 区域
         
      LODOP.ADD_PRINT_LINE("20mm","0mm","20mm","100mm",0,1);
      LODOP.ADD_PRINT_LINE("20mm","35mm","0mm","35mm",0,1);
      debugger
      LODOP.ADD_PRINT_IMAGE("0mm","0mm","35mm", "10mm","<img src='"+resourcesPath+"logo.jpg'/>");
      LODOP.SET_PRINT_STYLEA(0,"Stretch",1);//(可变形)扩展缩放模式

      LODOP.SET_PRINT_STYLE("Bold",1);
      LODOP.SET_PRINT_STYLE("FontSize",10);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("10mm","2mm","35mm","10mm","运单号：");
      LODOP.ADD_PRINT_TEXT("15mm","2mm","35mm","10mm",common.formatData(data.wayBillNo));


      LODOP.SET_PRINT_STYLE("Bold",1);
      LODOP.SET_PRINT_STYLE("FontSize",12);
      LODOP.ADD_PRINT_BARCODE("1mm", "35mm","70mm", "17mm", "128C",common.formatData(data.subOrder))

      //区域2  目的分拨中心  件数/数量  包装类型   电商类型   
      LODOP.ADD_PRINT_LINE("34mm","0mm","34mm","100mm",0,1);
      LODOP.ADD_PRINT_LINE("34mm","50mm","20mm","50mm",0,0);
      LODOP.ADD_PRINT_LINE("34mm","75mm","20mm","75mm",0,0);


      LODOP.SET_PRINT_STYLE("Bold",1);
      LODOP.SET_PRINT_STYLE("FontSize",14);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("25mm","2mm","45mm","10mm",common.formatData(data.deptSiteName));
      LODOP.ADD_PRINT_TEXT("22mm","56mm","15mm","5mm",common.formatData(data.index));
      LODOP.ADD_PRINT_TEXT("28mm","55mm","15mm","5mm",common.formatData(data.packingType));
      LODOP.ADD_PRINT_TEXT("25mm","78mm","30mm","10mm",common.formatData(data.serverType));


      //区域3   目的分拨 + 产品类型
      LODOP.ADD_PRINT_LINE("48mm","0mm","48mm","100mm",0,1);
      LODOP.ADD_PRINT_LINE("48mm","75mm","34mm","75mm",0,0);
     
      LODOP.SET_PRINT_STYLE("Bold",1);
      LODOP.SET_PRINT_STYLE("FontSize",12);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("40mm","2mm","70mm","10mm",common.formatData(data.allocationCentre));

      LODOP.SET_PRINT_STYLE("Bold",1);
      LODOP.SET_PRINT_STYLE("FontSize",14);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("40mm","78mm","30mm","10mm",common.formatData(data.productType));
      

      //区域4    地址 + 增值信息 
      LODOP.ADD_PRINT_LINE("63mm","0mm","63mm","100mm",0,1);
      LODOP.ADD_PRINT_LINE("48mm","75mm","63mm","75mm",0,1);
      LODOP.ADD_PRINT_LINE("55mm","75mm","55mm","100mm",0,1);
      
     
//    "routeName": "029V[西安派送部]-029W[西安转运分拨]-913K[富平营业部]",
//      029V-029W-913K
      LODOP.SET_PRINT_STYLE("Bold",1);
      LODOP.SET_PRINT_STYLE("FontSize",13);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("53mm","2mm","75mm","10mm",common.formatData(data.routeName1));
      
      LODOP.SET_PRINT_STYLE("Bold",1);
      LODOP.SET_PRINT_STYLE("FontSize",12);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("58mm","2mm","60mm","10mm",common.formatData(data.routeName2));
      
     
      LODOP.SET_PRINT_STYLE("Bold",1);
      LODOP.SET_PRINT_STYLE("FontSize",12);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("50mm","80mm","30mm","10mm",common.formatData(data.settlementTypeName));
   
    	// 代收货款
      LODOP.SET_PRINT_STYLE("Bold",1);
      LODOP.SET_PRINT_STYLE("FontSize",12);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("58mm","77mm","30mm","10mm",common.formatData(data.isCollectGoodsFeeFlag));

      
//    //区域 4   收件地址
      LODOP.ADD_PRINT_LINE("74mm","0mm","74mm","100mm",0,1);
 
      LODOP.SET_PRINT_STYLE("Bold",1);
      LODOP.SET_PRINT_STYLE("FontSize",10);
      LODOP.ADD_PRINT_IMAGE("64mm", "2mm","10mm", "10mm","<img src='"+resourcesPath+"image-receiver.png'/>");
      LODOP.SET_PRINT_STYLEA(0,"Stretch",1);//(可变形)扩展缩放模式
      LODOP.ADD_PRINT_TEXT("64mm","13mm","95mm","8mm",common.formatData(data.receiverName) + " " + common.formatData(data.receiverMobile) + " " + common.formatData(data.receiverPhone));
      LODOP.ADD_PRINT_TEXT("70mm","13mm","95mm","10mm",common.formatData(data.receiverAddress));
      
 
      //区域 5    货品信息一
      LODOP.ADD_PRINT_LINE("86mm","0mm","86mm","100mm",0,1);
      LODOP.ADD_PRINT_LINE("86mm","9mm","74mm","9mm",0,0);
      LODOP.ADD_PRINT_LINE("86mm","49mm","74mm","49mm",0,0);
      LODOP.ADD_PRINT_LINE("86mm","59mm","74mm","59mm",0,0);
//      LODOP.ADD_PRINT_LINE("86mm","74mm","74mm","74mm",0,0);
      LODOP.SET_PRINT_STYLE("Bold",1);
      LODOP.SET_PRINT_STYLE("FontSize",10);

      LODOP.ADD_PRINT_TEXT("76mm","3mm","10mm","10mm","物\n品")
      
      LODOP.ADD_PRINT_TEXT("78mm","15mm","30mm","10mm",common.formatData(data.goodsName))
      LODOP.ADD_PRINT_TEXT("76mm","50mm","10mm","10mm","重量\n体积")
      LODOP.ADD_PRINT_TEXT("76mm","63mm","20mm","10mm",common.formatData(data.goodsWeight)+"KG")
      LODOP.ADD_PRINT_TEXT("81mm","63mm","20mm","10mm",common.formatData(data.goodsVolume)+"m³")
      
      
      
      //区域6    货品信息二
      LODOP.ADD_PRINT_LINE("98mm","0mm","98mm","100mm",0,1);
      LODOP.ADD_PRINT_LINE("98mm","9mm","86mm","9mm",0,0);
      LODOP.ADD_PRINT_LINE("98mm","49mm","86mm","49mm",0,0);
      LODOP.ADD_PRINT_LINE("98mm","59mm","86mm","59mm",0,0);

      LODOP.SET_PRINT_STYLE("Bold",1);
      LODOP.SET_PRINT_STYLE("FontSize",10);
      LODOP.ADD_PRINT_TEXT("88mm","1mm","10mm","10mm","打印\n时间")
      LODOP.ADD_PRINT_TEXT("88mm","15mm","40mm","10mm",common.formatData(data.nowDate1))
      LODOP.ADD_PRINT_TEXT("93mm","15mm","40mm","10mm",common.formatData(data.nowDate2))
 
      LODOP.ADD_PRINT_TEXT("90mm","50mm","10mm","10mm","签收")
      
      
      LODOP.ADD_PRINT_IMAGE("108mm","2mm","30mm", "10mm","<img src='"+resourcesPath+"logo.jpg'/>");
      LODOP.SET_PRINT_STYLEA(0,"Stretch",1);//(可变形)扩展缩放模式
//      //区域7  条形码
      LODOP.SET_PRINT_STYLE("Bold",1);
      LODOP.SET_PRINT_STYLE("FontSize",10);
      LODOP.ADD_PRINT_BARCODE("108mm", "50mm","50mm", "10mm", "128C",common.formatData(data.wayBillNo))

//      //区域 8 收件信息
      LODOP.ADD_PRINT_LINE("132mm","0mm","132mm","70mm",0,1);
      LODOP.SET_PRINT_STYLE("Bold",1);
      LODOP.SET_PRINT_STYLE("FontSize",10);
      LODOP.ADD_PRINT_IMAGE("120mm", "2mm","10mm", "10mm","<img src='"+resourcesPath+"image-receiver.png'/>");
      LODOP.SET_PRINT_STYLEA(0,"Stretch",1);//(可变形)扩展缩放模式
      LODOP.ADD_PRINT_TEXT("120mm","13mm","90mm","10mm",common.formatData(data.receiverName) + " " + common.formatData(data.receiverMobile) + " " + common.formatData(data.receiverPhone));
      LODOP.ADD_PRINT_TEXT("126mm","13mm","90mm","10mm",common.formatData(data.receiverAddress));
      

//      //区域 10 寄件信息
      LODOP.ADD_PRINT_LINE("146mm","0mm","146mm","100mm",0,1);

      LODOP.SET_PRINT_STYLE("Bold",1);
      LODOP.SET_PRINT_STYLE("FontSize",10);
      LODOP.ADD_PRINT_IMAGE("134mm", "2mm","10mm", "10mm","<img src='"+resourcesPath+"image-send.png'/>");
      LODOP.SET_PRINT_STYLEA(0,"Stretch",1);//(可变形)扩展缩放模式
      LODOP.ADD_PRINT_TEXT("134mm","13mm","90mm","10mm",common.formatData(data.senderName) + " " + common.formatData(data.senderMobile) + " " + common.formatData(data.senderPhone));
      LODOP.ADD_PRINT_TEXT("140mm","13mm","90mm","10mm",common.formatData(data.senderAddress));


      //区域 11 备注信息
//      LODOP.ADD_PRINT_LINE("144mm","22mm","178mm","22mm",0,1);
      LODOP.SET_PRINT_STYLE("Bold",1);
      LODOP.SET_PRINT_STYLE("FontSize",12);
//      LODOP.ADD_PRINT_TEXT("158mm","5mm","12mm","10mm","备注");
      LODOP.SET_PRINT_STYLE("Bold",1);
      LODOP.SET_PRINT_STYLE("FontSize",10);
      LODOP.ADD_PRINT_TEXT("148mm","10mm","90mm","30mm",common.formatData(data.remark));
      
      LODOP.SET_PRINT_STYLE("Bold",1);
      LODOP.SET_PRINT_STYLE("FontSize",10);
      LODOP.ADD_PRINT_TEXT("170mm","80mm","20mm","10mm","已验视");
      LODOP.ADD_PRINT_LINE("178mm","0mm","178mm","100mm",0,1);
	 
      lodopUtil.doPrint(LODOP,printViewFlag,printMachine);
}

export {
	printYmddOrders, //打印方法
}