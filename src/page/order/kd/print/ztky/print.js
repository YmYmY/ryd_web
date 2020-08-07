import lodopUtil from "@/utils/lodop/lodop-business.js"
import {getLodop} from '@/utils/lodop/LodopFuncs.js'
import common from '@/utils/common.js'
// 打印信息 
 let orders = [];



/**
 * 
 * 中通快运打印-N 张
 * datas  打印源数据结果列表
 * printMachine 打印机器
 * printViewFlag 是否打印预览标准
 * true 预览，false 直接打印
 * callback  返回函数
 * 
 * 100mm * 180 mm 模板
 */

const printZtkyOrders = function(datas,printMachine,printViewFlag,callback){
   // 打印 多张电子面单
   for(let i in datas){
      let data = datas[i];
      let taskName = "ZTKY_"+ data.ewbnoSub + "_" + data.indexNo;
      printZtkyOrder(datas[i],printMachine,taskName,printViewFlag);
      console.log(taskName);
   }
   callback(datas);
}
/**
 * 
 * 中通快运打印-一张
 * data 打印源数据
 * printMachine 打印机器
 * taskName   打印任务名称
 * printViewFlag 是否打印预览标准
 * true 预览，false 直接打印
 * 
 * 100mm * 180 mm 模板
 */
const printZtkyOrder = function(data,printMachine,taskName,printViewFlag){
         let resourcesPath = "/static/kd/print/ztky/resources/"; // 资源位置 TODO
         /**初始化打印对象 **/
         let LODOP = getLodop();
         LODOP.PRINT_INIT(taskName);
         LODOP.PRINT_INITA(0,0,"100mm","180mm",taskName);  
         LODOP.SET_PRINT_PAGESIZE(1,"100mm","180mm","");  
         //绘制 区域
            
         LODOP.ADD_PRINT_LINE("20mm","0mm","20mm","100mm",0,1);
         LODOP.ADD_PRINT_LINE("20mm","35mm","0mm","35mm",0,1);

         LODOP.ADD_PRINT_IMAGE("0mm","0mm","35mm", "10mm","<img src='"+resourcesPath+"logo.png'/>");
         LODOP.SET_PRINT_STYLEA(0,"Stretch",1);//(可变形)扩展缩放模式

         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",10);
         LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
         LODOP.ADD_PRINT_TEXT("10mm","2mm","35mm","10mm","运单号：");
         LODOP.ADD_PRINT_TEXT("15mm","2mm","35mm","10mm",common.formatData(data.ewbno));


         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",12);
         LODOP.ADD_PRINT_BARCODE("1mm", "35mm","70mm", "17mm", "128B",common.formatData(data.ewbnoSub))

         //区域2  目的分拨中心  件数/数量  包装类型   电商类型   
         LODOP.ADD_PRINT_LINE("34mm","0mm","34mm","100mm",0,1);
         LODOP.ADD_PRINT_LINE("34mm","50mm","20mm","50mm",0,0);
         LODOP.ADD_PRINT_LINE("34mm","75mm","20mm","75mm",0,0);


         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",14);
         LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
         LODOP.ADD_PRINT_TEXT("25mm","2mm","45mm","10mm",common.formatData(data.sendCenterName));
         LODOP.ADD_PRINT_TEXT("22mm","56mm","15mm","5mm",common.formatData(data.index));
         LODOP.ADD_PRINT_TEXT("28mm","55mm","15mm","5mm",common.formatData(data.packageType));
         LODOP.ADD_PRINT_TEXT("25mm","78mm","30mm","10mm","电商业务");


         //区域3   目的网点 + 送货方式
         LODOP.ADD_PRINT_LINE("48mm","0mm","48mm","100mm",0,1);
         LODOP.ADD_PRINT_LINE("48mm","75mm","34mm","75mm",0,0);
        
         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",12);
         LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
         LODOP.ADD_PRINT_TEXT("40mm","2mm","70mm","10mm",common.formatData(data.dispatchSiteName));


         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",12);
         LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
         LODOP.ADD_PRINT_TEXT("40mm","75mm","30mm","10mm",common.formatData(data.deliveryType));


         //区域 4   收件地址 + 产品类型
         LODOP.ADD_PRINT_LINE("62mm","0mm","62mm","100mm",0,1);
         LODOP.ADD_PRINT_LINE("62mm","75mm","48mm","75mm",0,0);

         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",10);
         LODOP.ADD_PRINT_IMAGE("50mm", "2mm","10mm", "10mm","<img src='"+resourcesPath+"image-receiver.png'/>");
         LODOP.SET_PRINT_STYLEA(0,"Stretch",1);//(可变形)扩展缩放模式
         LODOP.ADD_PRINT_TEXT("50mm","12mm","63mm","10mm",common.formatData(data.dispatchLinkMan) + " " + common.formatData(data.dispatchPhone));
         LODOP.ADD_PRINT_TEXT("56mm","12mm","63mm","10mm",common.formatData(data.dispatchAddress));
         LODOP.ADD_PRINT_TEXT("54mm","80mm","20mm","10mm","标准快运");


         //区域 5    货品信息一
         LODOP.ADD_PRINT_LINE("72mm","0mm","72mm","100mm",0,1);
         LODOP.ADD_PRINT_LINE("72mm","9mm","62mm","9mm",0,0);
         LODOP.ADD_PRINT_LINE("72mm","39mm","62mm","39mm",0,0);
         LODOP.ADD_PRINT_LINE("72mm","49mm","62mm","49mm",0,0);
         LODOP.ADD_PRINT_LINE("72mm","74mm","62mm","74mm",0,0);
         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",10);

         LODOP.ADD_PRINT_TEXT("63mm","1mm","10mm","10mm","物品\n名称")

         LODOP.ADD_PRINT_TEXT("66mm","13mm","20mm","10mm",common.formatData(data.itemName))
         LODOP.ADD_PRINT_TEXT("63mm","40mm","10mm","10mm","重量\n体积")
         LODOP.ADD_PRINT_TEXT("63mm","52mm","20mm","10mm",common.formatData(data.totalWeight))
         LODOP.ADD_PRINT_TEXT("68mm","52mm","20mm","10mm",common.formatData(data.totalVol))
         if(common.isNotBlank(data.insuredAmount) && parseFloat(data.insuredAmount) > 0){
            // 保价 
            LODOP.SET_PRINT_STYLE("Bold",1);
            LODOP.SET_PRINT_STYLE("FontSize",10);
            LODOP.ADD_PRINT_TEXT("63mm","80mm","20mm","10mm","保价")
            LODOP.ADD_PRINT_TEXT("68mm","80mm","20mm","10mm",common.formatData(data.insuredAmount))   
         }
        
         //区域6    货品信息二
         LODOP.ADD_PRINT_LINE("82mm","0mm","82mm","100mm",0,1);
         LODOP.ADD_PRINT_LINE("82mm","9mm","72mm","9mm",0,0);
         LODOP.ADD_PRINT_LINE("82mm","39mm","72mm","39mm",0,0);
         LODOP.ADD_PRINT_LINE("82mm","49mm","72mm","49mm",0,0);
         LODOP.ADD_PRINT_LINE("82mm","74mm","72mm","74mm",0,0);

         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",10);
         LODOP.ADD_PRINT_TEXT("73mm","1mm","10mm","10mm","打印\n时间")
         LODOP.ADD_PRINT_TEXT("73mm","10mm","30mm","10mm",common.formatData(data.printDate).split(" ")[0])
         LODOP.ADD_PRINT_TEXT("77mm","10mm","30mm","10mm",common.formatData(data.printDate).split(" ")[1])

         LODOP.ADD_PRINT_TEXT("76mm","40mm","10mm","10mm","签收")

         //区域7    保险 +代收货款信息
         LODOP.ADD_PRINT_LINE("96mm","0mm","96mm","100mm",0,1);
         LODOP.ADD_PRINT_LINE("82mm","75mm","96mm","75mm",0,1);
         LODOP.ADD_PRINT_LINE("89mm","75mm","89mm","100mm",0,1);

         LODOP.ADD_PRINT_IMAGE("84mm","3mm","55mm", "12mm","<img src='"+resourcesPath+"tpy.png'/>");
         LODOP.SET_PRINT_STYLEA(0,"Stretch",1);//(可变形)扩展缩放模式

         if(common.isNotBlank(data.freightCharge) && parseFloat(data.freightCharge) > 0){
            // 到付
            LODOP.SET_PRINT_STYLE("Bold",1);
            LODOP.SET_PRINT_STYLE("FontSize",8);
            LODOP.ADD_PRINT_TEXT("83mm","80mm","10mm","10mm","到付")
            LODOP.ADD_PRINT_TEXT("87mm","80mm","10mm","10mm",common.formatData(data.freightCharge))
         }
         if(common.isNotBlank(data.codCharge) && parseFloat(data.codCharge) > 0){
            // 代收货款
            LODOP.SET_PRINT_STYLE("Bold",1);
            LODOP.SET_PRINT_STYLE("FontSize",8);
            LODOP.ADD_PRINT_TEXT("90mm","80mm","10mm","10mm","COD")
            LODOP.ADD_PRINT_TEXT("93mm","80mm","10mm","10mm",common.formatData(data.codCharge))
         }

         //区域8  服务信息 + 打印二维码
         LODOP.ADD_PRINT_LINE("116mm","0mm","116mm","100mm",0,1);
         LODOP.ADD_PRINT_LINE("116mm","45mm","96mm","45mm",0,1);
         LODOP.ADD_PRINT_IMAGE("98mm","3mm","40mm", "10mm","<img src='"+resourcesPath+"logo.png'/>");
         LODOP.SET_PRINT_STYLEA(0,"Stretch",1);//(可变形)扩展缩放模式

         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",8);
         LODOP.ADD_PRINT_TEXT("110mm","1mm","50mm","10mm","服务热线4000-270-270")
         
         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",10);
         LODOP.ADD_PRINT_BARCODE("99mm", "50mm","50mm", "15mm", "128B",common.formatData(data.ewbno))


         //区域 9 收件信息
         LODOP.ADD_PRINT_LINE("130mm","0mm","130mm","100mm",0,1);
         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",10);
         LODOP.ADD_PRINT_IMAGE("118mm", "2mm","10mm", "10mm","<img src='"+resourcesPath+"image-receiver.png'/>");
         LODOP.SET_PRINT_STYLEA(0,"Stretch",1);//(可变形)扩展缩放模式
         LODOP.ADD_PRINT_TEXT("118mm","11mm","90mm","10mm",common.formatData(data.dispatchLinkMan) + " " + common.formatData(data.dispatchPhone));
         LODOP.ADD_PRINT_TEXT("124mm","11mm","90mm","10mm",common.formatData(data.dispatchAddress));

         //区域 10 寄件信息
         LODOP.ADD_PRINT_LINE("144mm","0mm","144mm","100mm",0,1);

         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",10);
         LODOP.ADD_PRINT_IMAGE("132mm", "2mm","10mm", "10mm","<img src='"+resourcesPath+"image-send.png'/>");
         LODOP.SET_PRINT_STYLEA(0,"Stretch",1);//(可变形)扩展缩放模式
         LODOP.ADD_PRINT_TEXT("132mm","11mm","90mm","10mm",common.formatData(data.sendLinkMan) + " " + common.formatData(data.sendPhone));
         LODOP.ADD_PRINT_TEXT("138mm","11mm","90mm","10mm",common.formatData(data.sendAddress));


         //区域 11 备注信息
         LODOP.ADD_PRINT_LINE("144mm","22mm","178mm","22mm",0,1);
         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",12);
         LODOP.ADD_PRINT_TEXT("158mm","5mm","12mm","10mm","备注");
         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",10);
         LODOP.ADD_PRINT_TEXT("150mm","24mm","90mm","30mm",common.formatData(data.orderRemark));

         LODOP.ADD_PRINT_LINE("178mm","0mm","178mm","100mm",0,1);


         //开始打印
        lodopUtil.doPrint(LODOP,printViewFlag,printMachine);


    }



export {
	printZtkyOrders, //打印方法
}