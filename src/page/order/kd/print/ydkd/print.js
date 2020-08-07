import lodopUtil from "@/utils/lodop/lodop-business.js"
import {getLodop} from '@/utils/lodop/LodopFuncs.js'
import common from '@/utils/common.js'
// 打印信息 
 let orders = [];


/**
 * 
 * 韵达快递打印-N 张
 * datas  打印源数据结果列表
 * printMachine 打印机器
 * printViewFlag 是否打印预览标准
 * true 预览，false 直接打印
 * callback  返回函数
 * 
 * 76mm * 130 mm 模板
 */

const printYdkdOrders76130 = function(datas,printMachine,printViewFlag,callback){
   // 打印 多张电子面单
   for(let i in datas){
      let data = datas[i];
      let taskName = "ydkd_"+ data.mailno + "" + "_" + data.indexNo;
      printYdkdOrder76130(datas[i],printMachine,taskName,printViewFlag);
   }
   callback(datas);
}

/**
 * 
 * 韵达快递打印-N 张
 * datas  打印源数据结果列表
 * printMachine 打印机器
 * printViewFlag 是否打印预览标准
 * true 预览，false 直接打印
 * callback  返回函数
 * 
 * 100mm * 180 mm 模板
 */

const printYdkdOrders100180 = function(datas,printMachine,printViewFlag,callback){
   // 打印 多张电子面单
   for(let i in datas){
      let data = datas[i];
      let taskName = "ydkd_"+ data.mailno + "" + "_" + data.indexNo;
      printYdkdOrder100180(datas[i],printMachine,taskName,printViewFlag);
   }
   callback(datas);
}
/**
 * 
 * 韵达快递打印-N 张
 * datas  打印源数据结果列表
 * printMachine 打印机器
 * printViewFlag 是否打印预览标准
 * true 预览，false 直接打印
 * callback  返回函数
 * 
 * 101mm * 203 mm 模板
 */

const printYdkdOrders101203 = function(datas,printMachine,printViewFlag,callback){
   // 打印 多张电子面单
   for(let i in datas){
      let data = datas[i];
      let taskName = "ydkd_"+ data.mailno + "" + "_" + data.indexNo;;
      printYdkdOrder101203(datas[i],printMachine,taskName,printViewFlag);
   }
   callback(datas);
}

/**
 * 
 * 韵达快递打印-一张
 * data 打印源数据
 * printMachine 打印机器
 * taskName   打印任务名称
 * printViewFlag 是否打印预览标准
 * true 预览，false 直接打印
 * 
 * 76mm * 130 mm 模板
 */
const printYdkdOrder76130 = function(data,printMachine,taskName,printViewFlag){
   let resourcesPath = "/static/kd/print/ydkd/resources/"; // 资源位置 TODO
   // debugger
   /**初始化打印对象 **/
   let LODOP = getLodop();
   // debugger
   LODOP.PRINT_INIT(taskName);
   LODOP.PRINT_INITA(0,0,"76mm","130mm",taskName);  
   LODOP.SET_PRINT_PAGESIZE(1,"76mm","130mm","");  

  //绘制 区域
   LODOP.ADD_PRINT_LINE("0mm","0mm","0mm","76mm",0,1);
   LODOP.ADD_PRINT_LINE("130mm","0mm","130mm","76mm",0,1);
   LODOP.ADD_PRINT_LINE("0mm","0mm","130mm","0mm",0,1);
   LODOP.ADD_PRINT_LINE("130mm","76mm","0mm","76mm",0,1);
   

	// 区域 1
    LODOP.ADD_PRINT_LINE("16mm","0mm","16mm","76mm",0,1);
	 LODOP.SET_PRINT_STYLE("Bold",1);
	 LODOP.SET_PRINT_STYLE("FontSize",12);
	 LODOP.SET_PRINT_STYLE("Alignment",1); 
	 LODOP.ADD_PRINT_TEXT("2mm","66mm","20mm","16mm","标准\n快递");
	 
	 LODOP.SET_PRINT_STYLE("Bold",1);
	 LODOP.SET_PRINT_STYLE("FontSize",10);
	 LODOP.SET_PRINT_STYLE("Alignment",1); 
	 LODOP.ADD_PRINT_TEXT("10mm","2mm","50mm","8mm",common.formatData(data.printDate));
	 
	// 区域 2
	 LODOP.ADD_PRINT_LINE("26mm","0mm","26mm","76mm",0,1);
	 
	 LODOP.SET_PRINT_STYLE("Bold",1);
	 LODOP.SET_PRINT_STYLE("FontSize",20);
	 LODOP.SET_PRINT_STYLE("Alignment",2); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
	 LODOP.ADD_PRINT_TEXT("17mm","1mm","20mm","10mm",common.formatData(data.position));
	 
	 LODOP.SET_PRINT_STYLE("Bold",1);
	 LODOP.SET_PRINT_STYLE("FontSize",20);
	 LODOP.SET_PRINT_STYLE("Alignment",2); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
	 LODOP.ADD_PRINT_TEXT("17mm","20mm","50mm","10mm",common.formatData(data.position_no));
	 
	// 区域 3
	 LODOP.ADD_PRINT_LINE("42mm","0mm","42mm","58mm",0,1);
	 LODOP.SET_PRINT_STYLE("Bold",1);
	 LODOP.SET_PRINT_STYLE("FontSize",12);
	 LODOP.ADD_PRINT_BARCODE("28mm", "2mm","55mm", "14mm", "128B",common.formatData(data.mailno))
	 
	 LODOP.SET_PRINT_STYLE("Bold",0);
	 LODOP.SET_PRINT_STYLE("FontSize",8);
	 LODOP.ADD_PRINT_BARCODE("30mm", "61mm","14mm", "50mm", "128B",common.formatData(data.mailno))
	 LODOP.SET_PRINT_STYLEA(0,"Angle",-90);//设置旋转角度
	 
	// 区域 4
	 LODOP.ADD_PRINT_LINE("49mm","0mm","49mm","58mm",0,1);
	 LODOP.SET_PRINT_STYLE("Bold",1);
	 LODOP.SET_PRINT_STYLE("FontSize",12);
	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
	 LODOP.ADD_PRINT_TEXT("43mm","3mm","50mm","7mm",common.formatData(data.tp_status));
	 
	// 区域 5
	 LODOP.ADD_PRINT_LINE("56mm","0mm","56mm","58mm",0,1);
	 LODOP.SET_PRINT_STYLE("Bold",1);
	 LODOP.SET_PRINT_STYLE("FontSize",12);
	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
	 if(common.formatData(data.package_wdjc).indexOf("集包地") >-1){
		 LODOP.ADD_PRINT_TEXT("50mm","2mm","60mm","7mm",common.formatData(data.package_wdjc));
	 }else{
		 LODOP.ADD_PRINT_TEXT("50mm","2mm","60mm","7mm","集包地："+common.formatData(data.package_wdjc));
	 }
	 
	  
	// 区域 6
	 LODOP.ADD_PRINT_LINE("72mm","0mm","72mm","56mm",0,1); 
 	 LODOP.ADD_PRINT_IMAGE("63mm", "1mm","8mm", "8mm","<img src='"+resourcesPath+"image-receiver.png'/>");
	 LODOP.SET_PRINT_STYLEA(0,"Stretch",1);//(可变形)扩展缩放模式
	 
	 LODOP.SET_PRINT_STYLE("Bold",1);
	 LODOP.SET_PRINT_STYLE("FontSize",8);
	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
	 LODOP.ADD_PRINT_TEXT("58mm","10mm","60mm","8mm",common.formatData(data.receiver_name) + " " +  common.formatData(data.receiver_mobile) + " " + common.formatData(data.receiver_phone));
	   
	 LODOP.SET_PRINT_STYLE("Bold",1);
	 LODOP.SET_PRINT_STYLE("FontSize",8);
	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
	 LODOP.ADD_PRINT_TEXT("64mm","10mm","50mm","8mm",common.formatData(data.receiver_address).replace(/,/g,""));
	 
	// 区域 7
	 LODOP.ADD_PRINT_LINE("83mm","0mm","83mm","76mm",0,1);
	 LODOP.ADD_PRINT_IMAGE("74mm", "1mm","8mm", "8mm","<img src='"+resourcesPath+"image-send.png'/>");
	 LODOP.SET_PRINT_STYLEA(0,"Stretch",1);//(可变形)扩展缩放模式
	 
	 LODOP.SET_PRINT_STYLE("Bold",1);
	 LODOP.SET_PRINT_STYLE("FontSize",8);
	 LODOP.SET_PRINT_STYLE("Alignment",0); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
	 LODOP.ADD_PRINT_TEXT("74mm","10mm","60mm","6mm",common.formatData(data.sender_name) + " " +  common.formatData(data.sender_mobile) + " " + common.formatData(data.sender_phone));
	  
	 LODOP.SET_PRINT_STYLE("Bold",1);
	 LODOP.SET_PRINT_STYLE("FontSize",8);
	 LODOP.SET_PRINT_STYLE("Alignment",0); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
	 LODOP.ADD_PRINT_TEXT("78mm","10mm","60mm","6mm",common.formatData(data.sender_address).replace(/,/g,""));
	  
	 // 区域 8
	 LODOP.SET_PRINT_STYLE("Bold",1);
	 LODOP.SET_PRINT_STYLE("FontSize",10);
	 LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
	 LODOP.ADD_PRINT_TEXT("87mm","3mm","76mm","30mm",common.formatData(data.cus_area1));
	 
	 
	 // 自定义 打印条码 打印客户单号
	 LODOP.SET_PRINT_STYLE("Bold",1);
	 LODOP.SET_PRINT_STYLE("FontSize",10);
	 LODOP.ADD_PRINT_BARCODE("110mm", "5mm","60mm", "15mm", "128B",common.formatData(data.partner_orderid))
   
  //开始打印
   lodopUtil.doPrint(LODOP,printViewFlag,printMachine);
}

/**
 * 
 * 韵达快递打印-一张
 * data 打印源数据
 * printMachine 打印机器
 * taskName   打印任务名称
 * printViewFlag 是否打印预览标准
 * true 预览，false 直接打印
 * 
 * 100mm * 180 mm 模板
 */
const printYdkdOrder100180 = function(data,printMachine,taskName,printViewFlag){
      let resourcesPath = "/static/kd/print/ydkd/resources/"; // 资源位置 TODO
      // debugger
      /**初始化打印对象 **/
      let LODOP = getLodop();
      // debugger
      LODOP.PRINT_INIT(taskName);
      LODOP.PRINT_INITA(0,0,"100mm","180mm",taskName);  
      LODOP.SET_PRINT_PAGESIZE(1,"100mm","180mm","");  
            //绘制 区域
      LODOP.ADD_PRINT_LINE("0mm","0mm","0mm","100mm",0,1);
      LODOP.ADD_PRINT_LINE("179mm","0mm","179mm","100mm",0,1);
      LODOP.ADD_PRINT_LINE("0mm","0mm","180mm","0mm",0,1);
      LODOP.ADD_PRINT_LINE("180mm","100mm","0mm","100mm",0,1);
      
      //绘制 区域 1
      LODOP.ADD_PRINT_LINE("10mm","0mm","10mm","100mm",0,1);
      LODOP.SET_PRINT_STYLE("Bold",1);
      LODOP.SET_PRINT_STYLE("FontSize",10);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("3mm","80mm","20mm","10mm","标准快递");
      
      
      
   //绘制 区域  2
      LODOP.ADD_PRINT_LINE("24mm","0mm","24mm","100mm",0,1);
      LODOP.SET_PRINT_STYLE("Bold",1);
      LODOP.SET_PRINT_STYLE("FontSize",30);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("12mm","10mm","100mm","10mm",common.formatData(data.position)+ "  " + common.formatData(data.position_no));
      
    //绘制 区域  3
      LODOP.ADD_PRINT_LINE("34mm","0mm","34mm","100mm",0,1);
      LODOP.SET_PRINT_STYLE("Bold",1);
      LODOP.SET_PRINT_STYLE("FontSize",16);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      if(common.formatData(data.package_wdjc).indexOf("集包地") > -1){
         LODOP.ADD_PRINT_TEXT("26mm","10mm","100mm","10mm",common.formatData(data.package_wdjc));
      }else{
         LODOP.ADD_PRINT_TEXT("26mm","10mm","100mm","10mm","集包地："+common.formatData(data.package_wdjc));
      }
   
     //绘制 区域  4
      LODOP.ADD_PRINT_LINE("52mm","0mm","52mm","100mm",0,1);
   
      LODOP.SET_PRINT_STYLE("Bold",1);
      LODOP.SET_PRINT_STYLE("FontSize",12);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("38mm","4mm","10mm","10mm","收\n件");
      
      LODOP.SET_PRINT_STYLE("Bold",1);
      LODOP.SET_PRINT_STYLE("FontSize",11);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("37mm","11mm","90mm","10mm",common.formatData(data.receiver_name) + " " + common.formatData(data.receiver_mobile) + " " + common.formatData(data.receiver_phone));
      
      LODOP.SET_PRINT_STYLE("Bold",1);
      LODOP.SET_PRINT_STYLE("FontSize",11);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("43mm","11mm","95mm","20mm",common.formatData(data.receiver_address).replace(/,/g,""));
   
      //绘制 区域  5
      LODOP.ADD_PRINT_LINE("65mm","0mm","65mm","100mm",0,1);
      LODOP.ADD_PRINT_LINE("65mm","10mm","34mm","10mm",0,1);
      LODOP.SET_PRINT_STYLE("Bold",1);
      LODOP.SET_PRINT_STYLE("FontSize",12);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("53mm","4mm","10mm","10mm","寄\n件");
      
      LODOP.SET_PRINT_STYLE("Bold",1);
      LODOP.SET_PRINT_STYLE("FontSize",8);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("54mm","11mm","90mm","10mm",common.formatData(data.sender_name) + " " + common.formatData(data.sender_mobile) + " " + common.formatData(data.sender_phone));
      
      LODOP.SET_PRINT_STYLE("Bold",1);
      LODOP.SET_PRINT_STYLE("FontSize",8);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("60mm","11mm","95mm","20mm",common.formatData(data.sender_address).replace(/,/g,""));
      
         //绘制 区域  6
      LODOP.ADD_PRINT_LINE("92mm","0mm","92mm","100mm",0,1);
      LODOP.ADD_PRINT_BARCODE("70mm", "10mm","90mm", "15mm", "128B",common.formatData(data.mailno))
      
         //绘制 区域  7
      LODOP.ADD_PRINT_LINE("109mm","0mm","109mm","100mm",0,1);
      LODOP.SET_PRINT_STYLE("Bold",1);
      LODOP.SET_PRINT_STYLE("FontSize",10);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("94mm","4mm","20mm","10mm","签收人:");
      
      LODOP.SET_PRINT_STYLE("Bold",1);
      LODOP.SET_PRINT_STYLE("FontSize",10);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("102mm","4mm","20mm","10mm","时  间：");
      
         //绘制 区域  8
      LODOP.ADD_PRINT_LINE("124mm","0mm","124mm","100mm",0,1);
      LODOP.ADD_PRINT_LINE("109mm","33mm","124mm","33mm",0,1);
      LODOP.ADD_PRINT_BARCODE("111mm", "38mm","55mm", "12mm", "128B",common.formatData(data.mailno))
      
      //绘制 区域  9
      LODOP.ADD_PRINT_LINE("136mm","0mm","136mm","100mm",0,1);
      LODOP.SET_PRINT_STYLE("Bold",1);
      LODOP.SET_PRINT_STYLE("FontSize",8);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("128mm","4mm","10mm","10mm","收\n件");
      
      LODOP.SET_PRINT_STYLE("Bold",1);
      LODOP.SET_PRINT_STYLE("FontSize",8);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("126mm","11mm","90mm","10mm",common.formatData(data.receiver_name) + " " + common.formatData(data.receiver_mobile) + " " + common.formatData(data.receiver_phone));
      
      LODOP.SET_PRINT_STYLE("Bold",1);
      LODOP.SET_PRINT_STYLE("FontSize",8);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("132mm","11mm","90mm","10mm",common.formatData(data.receiver_address).replace(/,/g,""));
      
      //绘制 区域  10
      LODOP.ADD_PRINT_LINE("147mm","0mm","147mm","100mm",0,1);

      LODOP.SET_PRINT_STYLE("Bold",1);
      LODOP.SET_PRINT_STYLE("FontSize",8);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("138mm","4mm","10mm","10mm","寄\n件");
      
      LODOP.SET_PRINT_STYLE("Bold",1);
      LODOP.SET_PRINT_STYLE("FontSize",8);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("138mm","11mm","90mm","10mm",common.formatData(data.sender_name) + " " + common.formatData(data.sender_mobile) + " " + common.formatData(data.sender_phone));
      
      LODOP.SET_PRINT_STYLE("Bold",1);
      LODOP.SET_PRINT_STYLE("FontSize",8);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("143mm","11mm","90mm","10mm",common.formatData(data.sender_address).replace(/,/g,""));

      
      //绘制 区域  11
      LODOP.ADD_PRINT_LINE("147mm","10mm","124mm","10mm",0,1);
      
      LODOP.SET_PRINT_STYLE("Bold",1);
      LODOP.SET_PRINT_STYLE("FontSize",11);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("150mm","4mm","90mm","20mm",common.formatData(data.cus_area1));
      
      // 自定义 打印条码 打印客户单号
	  LODOP.SET_PRINT_STYLE("Bold",1);
	  LODOP.SET_PRINT_STYLE("FontSize",10);
	  LODOP.ADD_PRINT_BARCODE("160mm", "5mm","65mm", "15mm", "128B",common.formatData(data.partner_orderid));
      
      LODOP.SET_PRINT_STYLE("Bold",1);
      LODOP.SET_PRINT_STYLE("FontSize",10);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("170mm","80mm","20mm","10mm","已验视C")
            //开始打印
      lodopUtil.doPrint(LODOP,printViewFlag,printMachine);
}
/**
 * 
 * 韵达快递打印-一张
 * data 打印源数据
 * printMachine 打印机器
 * taskName   打印任务名称
 * printViewFlag 是否打印预览标准
 * true 预览，false 直接打印
 * 
 * 101mm * 203 mm 模板
 */
const printYdkdOrder101203 = function(data,printMachine,taskName,printViewFlag){
   let resourcesPath = "/static/kd/print/ydkd/resources/"; // 资源位置 TODO
   // debugger
   /**初始化打印对象 **/
   let LODOP = getLodop();
   // debugger
   LODOP.PRINT_INIT(taskName);
   LODOP.PRINT_INITA(0,0,"101mm","203mm",taskName);  
   LODOP.SET_PRINT_PAGESIZE(1,"101mm","203mm","");  

   //绘制 区域
   LODOP.ADD_PRINT_LINE("0mm","0mm","0mm","101mm",0,1);
   LODOP.ADD_PRINT_LINE("202mm","0mm","202mm","101mm",0,1);
   LODOP.ADD_PRINT_LINE("0mm","0mm","203mm","0mm",0,1);
   LODOP.ADD_PRINT_LINE("203mm","101mm","0mm","101mm",0,1);


   // 区域 1
   //	 LODOP.ADD_PRINT_LINE("18mm","0mm","18mm","101mm",0,1);

   LODOP.SET_PRINT_STYLE("Bold",1);
   LODOP.SET_PRINT_STYLE("FontSize",8);
   LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
   LODOP.ADD_PRINT_TEXT("1mm","1mm","100mm","6mm","寄件网点："+common.formatData(data.sender_branch_jc));

   LODOP.SET_PRINT_STYLE("Bold",1);
   LODOP.SET_PRINT_STYLE("FontSize",8);
   LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
   LODOP.ADD_PRINT_TEXT("4mm","1mm","100mm","6mm","寄件人："+common.formatData(data.sender_name));

   LODOP.SET_PRINT_STYLE("Bold",1);
   LODOP.SET_PRINT_STYLE("FontSize",8);
   LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
   LODOP.ADD_PRINT_TEXT("8mm","1mm","100mm","6mm","寄件人电话："+ common.formatData(data.sender_mobile) + " " + common.formatData(data.sender_phone));

   LODOP.SET_PRINT_STYLE("Bold",1);
   LODOP.SET_PRINT_STYLE("FontSize",8);
   LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
   LODOP.ADD_PRINT_TEXT("12mm","1mm","100mm","6mm","寄件人公司："+common.formatData(data.sender_company));

   LODOP.SET_PRINT_STYLE("Bold",1);
   LODOP.SET_PRINT_STYLE("FontSize",8);
   LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
   LODOP.ADD_PRINT_TEXT("16mm","1mm","100mm","6mm","寄件人地址："+ common.formatData(data.sender_address).replace(/,/g,""));


   // 区域 2
   //	 LODOP.ADD_PRINT_LINE("36mm","0mm","36mm","101mm",0,1);

   LODOP.SET_PRINT_STYLE("Bold",1);
   LODOP.SET_PRINT_STYLE("FontSize",10);
   LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
   LODOP.ADD_PRINT_TEXT("19mm","1mm","20mm","6mm","送达\n地址：");

   LODOP.SET_PRINT_STYLE("Bold",1);
   LODOP.SET_PRINT_STYLE("FontSize",10);
   LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
   LODOP.ADD_PRINT_TEXT("19mm","15mm","80mm","6mm","收件人："+common.formatData(data.receiver_name));

   LODOP.SET_PRINT_STYLE("Bold",1);
   LODOP.SET_PRINT_STYLE("FontSize",10);
   LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
   LODOP.ADD_PRINT_TEXT("23mm","15mm","80mm","6mm","收件人电话："+ common.formatData(data.receiver_mobile) + " " + common.formatData(data.receiver_phone));

   LODOP.SET_PRINT_STYLE("Bold",1);
   LODOP.SET_PRINT_STYLE("FontSize",10);
   LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
   LODOP.ADD_PRINT_TEXT("27mm","15mm","86mm","6mm","收件人地址："+ common.formatData(data.receiver_address).replace(/,/g,""));

   // 区域 3
   LODOP.ADD_PRINT_LINE("43mm","0mm","43mm","101mm",0,1);

   LODOP.SET_PRINT_STYLE("Bold",1);
   LODOP.SET_PRINT_STYLE("FontSize",15);
   LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
   if(common.formatData(data.package_wdjc).indexOf("集包地") > -1){
      LODOP.ADD_PRINT_TEXT("37mm","3mm","97mm","7mm",common.formatData(data.package_wdjc));
   }else{
      LODOP.ADD_PRINT_TEXT("37mm","3mm","97mm","7mm","集包地："+common.formatData(data.package_wdjc));
   }      

   // 区域 4
   LODOP.ADD_PRINT_LINE("68mm","0mm","68mm","101mm",0,1); 


//   LODOP.SET_PRINT_STYLE("Bold",1);
//   LODOP.SET_PRINT_STYLE("FontSize",30);
//   LODOP.SET_PRINT_STYLE("Alignment",2); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
//   LODOP.ADD_PRINT_TEXT("45mm","10mm","80mm","12mm",common.formatData(data.position));
//
//   LODOP.SET_PRINT_STYLE("Bold",1);
//   LODOP.SET_PRINT_STYLE("FontSize",30);
//   LODOP.SET_PRINT_STYLE("Alignment",2); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
//   LODOP.ADD_PRINT_TEXT("55mm","10mm","80mm","12mm",common.formatData(data.position_no));
     
     LODOP.ADD_PRINT_BARCODE("45mm", "3mm","25mm", "25mm", "QRCode",formatData(data.qrcode))
	 LODOP.SET_PRINT_STYLE("Bold",1);
	 LODOP.SET_PRINT_STYLE("FontSize",25);
	 LODOP.SET_PRINT_STYLE("Alignment",2); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
	 LODOP.ADD_PRINT_TEXT("45mm","38mm","30mm","12mm",common.formatData(data.position));
	 
	 LODOP.SET_PRINT_STYLE("Bold",1);
	 LODOP.SET_PRINT_STYLE("FontSize",25);
	 LODOP.SET_PRINT_STYLE("Alignment",2); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
	 LODOP.ADD_PRINT_TEXT("55mm","28mm","80mm","12mm",common.formatData(data.position_no));


   // 区域 5
   LODOP.ADD_PRINT_LINE("92mm","0mm","92mm","101mm",0,1); 
   LODOP.SET_PRINT_STYLE("Bold",1);
   LODOP.SET_PRINT_STYLE("FontSize",15);
   LODOP.ADD_PRINT_BARCODE("69mm", "10mm","90mm", "19mm", "128B",common.formatData(data.mailno))


   // 区域 6
   LODOP.ADD_PRINT_LINE("100mm","0mm","100mm","101mm",0,1); 
   LODOP.SET_PRINT_STYLE("Bold",1);
   LODOP.SET_PRINT_STYLE("FontSize",8);
   LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
   LODOP.ADD_PRINT_TEXT("95mm","2mm","30mm","10mm","签收人/代签收人：");

   LODOP.SET_PRINT_STYLE("Bold",1);
   LODOP.SET_PRINT_STYLE("FontSize",8);
   LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
   LODOP.ADD_PRINT_TEXT("95mm","60mm","20mm","10mm","签收时间：");

   // 区域 7
   LODOP.ADD_PRINT_LINE("153mm","0mm","153mm","101mm",0,1); 

   LODOP.SET_PRINT_STYLE("Bold",1);
   LODOP.SET_PRINT_STYLE("FontSize",16);
   LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
   LODOP.ADD_PRINT_TEXT("102mm","3mm","100mm","30mm",common.formatData(data.cus_area1));
   
   
	 // 自定义 打印条码 打印客户单号
   LODOP.SET_PRINT_STYLE("Bold",1);
   LODOP.SET_PRINT_STYLE("FontSize",10);
   LODOP.ADD_PRINT_BARCODE("128mm", "5mm","65mm", "15mm", "128B",formatData(data.partner_orderid))


   LODOP.SET_PRINT_STYLE("Bold",1);
   LODOP.SET_PRINT_STYLE("FontSize",20);
   LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
   LODOP.ADD_PRINT_TEXT("140mm","70mm","40mm","10mm","已验视");


   LODOP.SET_PRINT_STYLE("Bold",1);
   LODOP.SET_PRINT_STYLE("FontSize",20);
   LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
   LODOP.ADD_PRINT_TEXT("140mm","70mm","40mm","10mm","已安检");


   // 区域 8
   LODOP.ADD_PRINT_LINE("166mm","0mm","166mm","101mm",0,1); 

   LODOP.SET_PRINT_STYLE("Bold",1);
   LODOP.SET_PRINT_STYLE("FontSize",10);
   LODOP.ADD_PRINT_BARCODE("155mm", "5mm","65mm", "10mm", "128B",common.formatData(data.mailno))


   // 区域 9
   LODOP.ADD_PRINT_LINE("166mm","63mm","202mm","63mm",0,1); 

   LODOP.SET_PRINT_STYLE("Bold",1);
   LODOP.SET_PRINT_STYLE("FontSize",13);
   LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
   LODOP.ADD_PRINT_TEXT("168mm","64mm","37mm","35mm",common.formatData(data.cus_area2));

   LODOP.SET_PRINT_STYLE("Bold",1);
   LODOP.SET_PRINT_STYLE("FontSize",8);
   LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
   LODOP.ADD_PRINT_TEXT("167mm","1mm","64mm","6mm","寄件人："+common.formatData(data.sender_name));

   LODOP.SET_PRINT_STYLE("Bold",1);
   LODOP.SET_PRINT_STYLE("FontSize",8);
   LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
   LODOP.ADD_PRINT_TEXT("172mm","1mm","64mm","6mm","寄件人电话："+ common.formatData(data.sender_mobile) + " " + common.formatData(data.sender_phone));

   LODOP.SET_PRINT_STYLE("Bold",1);
   LODOP.SET_PRINT_STYLE("FontSize",8);
   LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
   LODOP.ADD_PRINT_TEXT("177mm","1mm","64mm","10mm","寄件人地址："+ common.formatData(data.sender_address).replace(/,/g,""));



   LODOP.SET_PRINT_STYLE("Bold",1);
   LODOP.SET_PRINT_STYLE("FontSize",8);
   LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
   LODOP.ADD_PRINT_TEXT("183mm","1mm","64mm","10mm","收件人："+common.formatData(data.receiver_name));

   LODOP.SET_PRINT_STYLE("Bold",1);
   LODOP.SET_PRINT_STYLE("FontSize",7);
   LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
   LODOP.ADD_PRINT_TEXT("187mm","1mm","64mm","10mm","收件人电话："+ common.formatData(data.receiver_mobile) + " " + common.formatData(data.receiver_phone));

   LODOP.SET_PRINT_STYLE("Bold",1);
   LODOP.SET_PRINT_STYLE("FontSize",8);
   LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
   LODOP.ADD_PRINT_TEXT("191mm","1mm","64mm","10mm","收件人地址："+ common.formatData(data.receiver_address).replace(/,/g,""));

   //开始打印
  lodopUtil.doPrint(LODOP,printViewFlag,printMachine);
}

export {
   printYdkdOrders100180, //打印方法 100 * 180 打印
   printYdkdOrders101203, //打印方法 101 * 203 打印
   printYdkdOrders76130, //打印方法  76 * 130 打印
}