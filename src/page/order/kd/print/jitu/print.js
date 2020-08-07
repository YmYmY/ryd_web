import lodopUtil from "@/utils/lodop/lodop-business.js"
import {getLodop} from '@/utils/lodop/LodopFuncs.js'
import common from '@/utils/common.js'
// 打印信息 
 let orders = [];



/**
 * 
 * 极兔滴答打印-N 张
 * datas  打印源数据结果列表
 * printMachine 打印机器
 * printViewFlag 是否打印预览标准
 * true 预览，false 直接打印
 * callback  返回函数
 * 
 * 100mm * 180 mm 模板
 */

const printJituOrders = function(datas,printMachine,printViewFlag,callback){
   // 打印 多张电子面单
   for(let i in datas){
      let data = datas[i];
      console.log(data);
      let taskName = "JITU_"+ data.billCode + "_" + data.indexNo+"";
      console.log(taskName);
      printJituOrder100180(datas[i],printMachine,taskName,printViewFlag);
   }
   callback(datas);
}

/**
 * 
 * 极兔滴答打印-自己特殊处理 -1张
 * data 打印源数据
 * printMachine 打印机器
 * taskName   打印任务名称
 * printViewFlag 是否打印预览标准 true 预览，false 直接打印
 * topAndLeft
 * 100mm * 180 mm 菜鸟电子面单 （ 极兔滴答）
 */
var printJituOrder100180  = function(data,printMachine,taskName,printViewFlag,topAndLeft){
      let resourcesPath = "/static/kd/print/jitu/resources/"; // 资源位置 TODO     
      /**初始化打印对象 **/
      let LODOP = getLodop();
      LODOP.PRINT_INIT(taskName);
      LODOP.PRINT_INITA(0,0,"100mm","180mm",taskName);  
      LODOP.SET_PRINT_PAGESIZE(1,"100mm","180mm","");
    //绘制 区域
       
      LODOP.ADD_PRINT_LINE("16mm","0mm","16mm","100mm",0,1);
//   1、公司名称；供应商印上去
      LODOP.SET_PRINT_STYLE("Bold",1);
      LODOP.SET_PRINT_STYLE("FontSize",12);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("10mm","2mm","45mm","10mm",common.formatData(data.company));
      
//	  2、代收货款（有展示，无则不展示；右上角有两个标识一个是到付一个是货到付款，展示原则是：1、到付订单展示到付标识；2、货到付款的订单展示货到付款标识；3、既有到付又有货到付款的订单展示货到付款标识）
      LODOP.SET_PRINT_STYLE("Bold",1);
      LODOP.SET_PRINT_STYLE("FontSize",15);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      if(data.itemsValue > 0){
            LODOP.ADD_PRINT_TEXT("6mm","55mm","45mm","10mm","代 收 货 款");
      }
      LODOP.SET_PRINT_STYLE("Bold",0);
      LODOP.SET_PRINT_STYLE("FontSize",8);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("8mm","55mm","45mm","10mm",common.formatData(data.indexName));
      
//	  22	官方客服热线：400 820 1666
      LODOP.SET_PRINT_STYLE("Bold",0);
      LODOP.SET_PRINT_STYLE("FontSize",8);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("13mm","55mm","45mm","10mm",common.formatData(data.customerPhone));
      
      LODOP.ADD_PRINT_LINE("30mm","0mm","30mm","100mm",0,1);
//	  3、三段码
      LODOP.SET_PRINT_STYLE("Bold",1);
      LODOP.SET_PRINT_STYLE("FontSize",25);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("19mm","10mm","80mm","14mm",common.formatData(data.sortingCode));
      
//	  4、产品名称（目前只有标准快递）
      LODOP.SET_PRINT_STYLE("FontSize",12);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("18mm","88mm","25mm","14mm","标准\n快递");
      
      
      LODOP.ADD_PRINT_LINE("40mm","0mm","40mm","100mm",0,1);
//	  5	集（有集货展示，无则不展示）
      LODOP.SET_PRINT_STYLE("FontSize",24);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
//	  LODOP.ADD_PRINT_TEXT("32mm","3mm","25mm","10mm","集");
      
//	  6	集货地编码（有集货展示，无则不展示）
      LODOP.SET_PRINT_STYLE("FontSize",24);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
//	  LODOP.ADD_PRINT_TEXT("32mm","30mm","40mm","10mm","泸西");
      
//	 7	面单打印时间+打印序号（一次打印多少张，这个是第几张）
      LODOP.SET_PRINT_STYLE("FontSize",8);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("31mm","60mm","40mm","10mm","打印时间："+common.formatData(data.nowDate1));
      LODOP.ADD_PRINT_TEXT("36mm","70mm","40mm","10mm", common.formatData(data.nowDate2) +" " + common.formatData(data.index));

//	  8	收字+图标
      LODOP.ADD_PRINT_LINE("56mm","0mm","56mm","100mm",0,1);
      LODOP.ADD_PRINT_IMAGE("42mm", "2mm","12mm", "10mm","<img src='"+resourcesPath+"image-receiver.png'/>");
      LODOP.SET_PRINT_STYLEA(0,"Stretch",1);//(可变形)扩展缩放模式
//    9	收件人姓名+手机（或电话，两者都有优先取手机）+收件公司名称（无则不展示）+省市区详细地址（直辖市特殊处理下如上海上海青浦区只需展示上海青浦区） 
      
      var print9 = common.formatData(data.receiverName) +  " " + common.formatData(data.receiverMobile) + " "  + common.formatData(data.receiverPhone);
      LODOP.SET_PRINT_STYLE("FontSize",10.5);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("42mm","15mm","70mm","10mm", print9);
      
      LODOP.SET_PRINT_STYLE("FontSize",6);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("42mm","76mm","25mm","10mm", common.formatData(data.receiverCompany));
       
      LODOP.SET_PRINT_STYLE("FontSize",10.5);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("49mm","15mm","90mm","10mm",common.formatData(data.receiverAddress));
      
//	  10	寄字
      LODOP.ADD_PRINT_LINE("68mm","0mm","68mm","100mm",0,1);
      LODOP.ADD_PRINT_IMAGE("58mm", "2mm","10mm", "10mm","<img src='"+resourcesPath+"image-send.png'/>");
      LODOP.SET_PRINT_STYLEA(0,"Stretch",1);//(可变形)扩展缩放模式
//	  11	寄件人姓名+手机（或电话，两者都有优先取手机）+寄件公司名称（无则不展示）+省市区详细地址（直辖市特殊处理下如上海上海青浦区只需展示上海青浦区）
      var print11 = common.formatData(data.senderName) +  " " + common.formatData(data.senderMobile) + " "  + common.formatData(data.senderPhone);
      LODOP.SET_PRINT_STYLE("FontSize",8);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("58mm","15mm","70mm","10mm", print11);
      
      LODOP.SET_PRINT_STYLE("FontSize",8);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("58mm","76mm","25mm","10mm", common.formatData(data.senderCompany));
       
      LODOP.SET_PRINT_STYLE("FontSize",8);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("63mm","15mm","90mm","10mm",common.formatData(data.senderAddress));
      
      LODOP.ADD_PRINT_LINE("73mm","20mm","73mm","100mm",0,1);
      LODOP.ADD_PRINT_LINE("77mm","0mm","77mm","100mm",0,1);
      LODOP.ADD_PRINT_LINE("68mm","20mm","77mm","20mm",0,1);
      LODOP.ADD_PRINT_LINE("68mm","50mm","77mm","50mm",0,1);
      LODOP.ADD_PRINT_LINE("68mm","75mm","77mm","75mm",0,1);
//	  12	保字+图标
      if(data.offerFee > 0){
          LODOP.ADD_PRINT_IMAGE("68mm", "8mm","8mm", "8mm","<img src='"+resourcesPath+"image-premium.png'/>");
          LODOP.SET_PRINT_STYLEA(0,"Stretch",1);//(可变形)扩展缩放模式
      }
//	  13	代收货款字段+币种符号（无则默认本国币种符号）+金额（无代收货款不展示币种符号+金额）
      LODOP.SET_PRINT_STYLE("FontSize",8);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("70mm","30mm","30mm","10mm", "代收货款");
      if(data.itemsValue > 0){
            LODOP.ADD_PRINT_TEXT("74mm","30mm","30mm","10mm", "￥"+common.formatData(data.itemsValue));
      }

//	  14	到付运费字段+币种符号（无则默认本国币种符号）  （寄付不展示币种符号+金额）到付展示
      LODOP.ADD_PRINT_TEXT("70mm","55mm","30mm","10mm", "到付运费");
      
//	  15	计费重量+重量+单位
      LODOP.ADD_PRINT_TEXT("70mm","80mm","30mm","10mm", "计费重量");
      LODOP.ADD_PRINT_TEXT("74mm","80mm","30mm","10mm", common.formatData(data.weight)+"kg");
      
//	  16	运单编号 与 条码
      LODOP.ADD_PRINT_LINE("95mm","0mm","95mm","100mm",0,1);
      LODOP.SET_PRINT_STYLE("Bold",1);
      LODOP.SET_PRINT_STYLE("FontSize",12);
      LODOP.ADD_PRINT_BARCODE("80mm", "15mm","70mm", "15mm", "128A",common.formatData(data.billCode))
      
      LODOP.ADD_PRINT_LINE("110mm","0mm","110mm","100mm",0,1);
//	  17	签收人/时间 +条款内容	 
      LODOP.SET_PRINT_STYLE("FontSize",8);
      LODOP.SET_PRINT_STYLE("Bold",1);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("98mm","10mm","40mm","10mm", "签收人/时间");
      LODOP.SET_PRINT_STYLE("FontSize",7);
      LODOP.SET_PRINT_STYLE("Bold",0);
      LODOP.ADD_PRINT_TEXT("102mm","10mm","70mm","10mm", "签收条款内容：您的签名代表您已验收此包裹，并已确认商品信息无误，包装完好，没有划痕，破损等表面质量问题。")
    
//    18	微信公众号
      LODOP.ADD_PRINT_IMAGE("96mm", "82mm","15mm", "15mm","<img src='"+resourcesPath+"image-erw.png'/>");
      LODOP.SET_PRINT_STYLEA(0,"Stretch",1);//(可变形)扩展缩放模式

      LODOP.ADD_PRINT_LINE("126mm","0mm","126mm","100mm",0,1);
      // 下半联-二维码
      LODOP.SET_PRINT_STYLE("Bold",1);
      LODOP.SET_PRINT_STYLE("FontSize",10);
      LODOP.ADD_PRINT_BARCODE("112mm", "50mm","40mm", "12mm", "128A",common.formatData(data.billCode))
      
     // 下半联-收
      LODOP.ADD_PRINT_LINE("142mm","0mm","142mm","100mm",0,1);
    
      LODOP.ADD_PRINT_IMAGE("128mm", "2mm","12mm", "10mm","<img src='"+resourcesPath+"image-receiver.png'/>");
      LODOP.SET_PRINT_STYLEA(0,"Stretch",1);//(可变形)扩展缩放模式
    
      LODOP.SET_PRINT_STYLE("FontSize",10.5);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("128mm","15mm","70mm","10mm", print9);
      
      LODOP.SET_PRINT_STYLE("FontSize",6);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("128mm","76mm","25mm","10mm", common.formatData(data.receiverCompany));
       
      LODOP.SET_PRINT_STYLE("FontSize",10.5);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("136mm","15mm","90mm","10mm",common.formatData(data.receiverAddress));
      
      // 下半联-寄
      
      LODOP.ADD_PRINT_LINE("156mm","0mm","156mm","100mm",0,1);
      LODOP.ADD_PRINT_IMAGE("144mm", "2mm","10mm", "10mm","<img src='"+resourcesPath+"image-send.png'/>");
      LODOP.SET_PRINT_STYLEA(0,"Stretch",1);//(可变形)扩展缩放模式
//	  11	寄件人姓名+手机（或电话，两者都有优先取手机）+寄件公司名称（无则不展示）+省市区详细地址（直辖市特殊处理下如上海上海青浦区只需展示上海青浦区）
      var print11 = common.formatData(data.senderName) +  " " + common.formatData(data.senderMobile) + " "  + common.formatData(data.senderPhone);
      LODOP.SET_PRINT_STYLE("FontSize",8);
      LODOP.SET_PRINT_STYLE("Bold",1);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("144mm","15mm","70mm","10mm", print11);
      
      LODOP.SET_PRINT_STYLE("FontSize",8);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("144mm","76mm","25mm","10mm", common.formatData(data.senderCompany));
       
      LODOP.SET_PRINT_STYLE("FontSize",8);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("150mm","15mm","90mm","10mm",common.formatData(data.senderAddress));

      LODOP.SET_PRINT_STYLE("Bold",1);
      LODOP.SET_PRINT_STYLE("FontSize",8);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("168mm","5mm","10mm","10mm","备注");
      
//	  19	备注
      LODOP.SET_PRINT_STYLE("Bold",1);
      LODOP.SET_PRINT_STYLE("FontSize",8);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("160mm","15mm","95mm","20mm",common.formatData(data.remark));
      
//	  21	已检视标记
      LODOP.SET_PRINT_STYLE("Bold",1);
      LODOP.SET_PRINT_STYLE("FontSize",8);
      LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      LODOP.ADD_PRINT_TEXT("175mm","80mm","20mm","10mm","已检视");
//	  20	三段码中的第二段码水印（例显示A001-01）
      LODOP.ADD_PRINT_LINE("179mm","0mm","179mm","100mm",0,1);

      lodopUtil.doPrint(LODOP,printViewFlag,printMachine);
}

export {
	printJituOrders, //打印方法
}