import lodopUtil from "@/utils/lodop/lodop-business.js"
import {getLodop} from '@/utils/lodop/LodopFuncs.js'
import common from '@/utils/common.js'
// 打印信息 
 let orders = [];



/**
 * 
 * 韵达快运打印-N 张
 * datas  打印源数据结果列表
 * printMachine 打印机器
 * printViewFlag 是否打印预览标准
 * true 预览，false 直接打印
 * callback  返回函数
 * 
 * 100mm * 180 mm 模板
 */

const printYdkyOrders = function(datas,printMachine,printViewFlag,callback){
   // 打印 多张电子面单
   for(let i in datas){
      let data = datas[i];
      let taskName = "YDKY"+ data.index_sub + ""  + "_" + data.indexNo;
      printYdkyOrder(datas[i],printMachine,taskName,printViewFlag);
   }
   callback(datas);
}
/**
 * 
 * 韵达快运打印-一张
 * data 打印源数据
 * printMachine 打印机器
 * taskName   打印任务名称
 * printViewFlag 是否打印预览标准
 * true 预览，false 直接打印
 * 
 * 100mm * 180 mm 模板
 */
const printYdkyOrder = function(data,printMachine,taskName,printViewFlag){
         let resourcesPath = "/static/kd/print/ydky/resources/"; // 资源位置 TODO
         // debugger
        /**初始化打印对象 **/
         let LODOP = getLodop();
         // debugger
         LODOP.PRINT_INIT(taskName);
         LODOP.PRINT_INITA(0,0,"100mm","180mm",taskName);  
         LODOP.SET_PRINT_PAGESIZE(1,"100mm","180mm","");  
         //    //绘制 区域
        // LODOP.ADD_PRINT_LINE("4mm","4mm","4mm","96mm",0,1);
         LODOP.ADD_PRINT_LINE("21mm","4mm","108mm","4mm",0,1);
         LODOP.ADD_PRINT_LINE("176mm","4mm","176mm","96mm",0,1);
         LODOP.ADD_PRINT_LINE("21mm","96mm","108mm","96mm",0,1);
         
         LODOP.ADD_PRINT_LINE("125mm","4mm","176mm","4mm",0,1);
         LODOP.ADD_PRINT_LINE("125mm","96mm","176mm","96mm",0,1);
         
         // 默认区域
      //	LODOP.ADD_PRINT_LINE("15mm","4mm","15mm","40mm",0,1);
      //	LODOP.ADD_PRINT_LINE("4mm","40mm","15mm","40mm",0,1);

         
         // 主单号打印 （ 位置从  21,4 开始）
         LODOP.ADD_PRINT_LINE("21mm","4mm","21mm","40mm",0,1);
      //	LODOP.ADD_PRINT_LINE("4mm","40mm","21mm","40mm",0,1);

         // 点 15,4 开始打印
         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",14);
         LODOP.SET_PRINT_STYLE("Alignment",2); //1--左靠齐 2--居中 3--右靠齐，缺省值是1。
         LODOP.ADD_PRINT_TEXT("16mm","4mm","36mm","6mm",common.formatData(data.mailno))
         
         
         // 条码打印（ 位置从  4,40 开始）
      //	LODOP.ADD_PRINT_LINE("4mm","40mm","4mm","96mm",0,1);
         LODOP.ADD_PRINT_LINE("21mm","40mm","21mm","96mm",0,1);
         // 条码打印（ 位置从  4,40 开始）
         LODOP.SET_PRINT_STYLE("Bold",0);
         LODOP.ADD_PRINT_BARCODE("5mm", "45mm","50mm", "15mm", "128B",common.formatData(data.mailno_sub))
         
      // 区域1
         LODOP.ADD_PRINT_LINE("34mm","4mm","34mm","23mm",0,1);
         LODOP.ADD_PRINT_LINE("21mm","23mm","34mm","23mm",0,1);
         
      // 区域1（韵时达）
         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",9);
         LODOP.SET_PRINT_STYLE("Alignment",2); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      //	 LODOP.ADD_PRINT_TEXT("26mm","4mm","19mm","13mm","韵时达")
      // if(data.order.product_type == 2){
         if(data.product_type == 2){
            // 图标
            LODOP.ADD_PRINT_IMAGE("23mm","8mm","8mm", "6mm","<img src='"+resourcesPath+"image-car.png'/>");
            LODOP.SET_PRINT_STYLEA(0,"Stretch",1);//(可变形)扩展缩放模式
            LODOP.ADD_PRINT_TEXT("30mm","4mm","19mm","13mm","韵时达")
         }
         
      // 区域2
         LODOP.ADD_PRINT_LINE("34mm","23mm","34mm","42mm",0,1);
         LODOP.ADD_PRINT_LINE("21mm","42mm","34mm","42mm",0,1);
         
      // 区域2（到付）
         // if(data.order.pay_type == 2){
         if(data.pay_type == 2){
            LODOP.SET_PRINT_STYLE("Bold",1);
            LODOP.SET_PRINT_STYLE("FontSize",9);
            LODOP.SET_PRINT_STYLE("Alignment",2); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
            // LODOP.ADD_PRINT_TEXT("24mm","24mm","19mm","13mm","￥"+common.formatData(data.order.pay_fee)+"\n到付")
            LODOP.ADD_PRINT_TEXT("24mm","24mm","19mm","13mm","￥"+common.formatData(data.pay_fee)+"\n到付");
         }
      // 区域3
         LODOP.ADD_PRINT_LINE("34mm","42mm","34mm","61mm",0,1);
         LODOP.ADD_PRINT_LINE("21mm","61mm","34mm","61mm",0,1);
         
      // 区域3（签回单）
      // if(data.order.receipt_flag == 1){
         if(data.receipt_flag == 1){
            LODOP.SET_PRINT_STYLE("Bold",1);
            LODOP.SET_PRINT_STYLE("FontSize",9);
            LODOP.SET_PRINT_STYLE("Alignment",2); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
            // 图标
            LODOP.ADD_PRINT_IMAGE("23mm","48mm","8mm", "6mm","<img src='"+resourcesPath+"image-receipt.png'/>");
            LODOP.SET_PRINT_STYLEA(0,"Stretch",1);//(可变形)扩展缩放模式
      //		 
            LODOP.ADD_PRINT_TEXT("30mm","42mm","19mm","13mm","签回单") // 图标
         }
         
         
      // 区域4
         LODOP.ADD_PRINT_LINE("34mm","61mm","34mm","80mm",0,1);
         LODOP.ADD_PRINT_LINE("21mm","80mm","34mm","80mm",0,1);
         
         // 区域4（代收货款）
         // if(data.order.cod_fee > 0){
         if(data.cod_fee > 0){
            LODOP.SET_PRINT_STYLE("Bold",1);
            LODOP.SET_PRINT_STYLE("FontSize",9);
            LODOP.SET_PRINT_STYLE("Alignment",2); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
            // LODOP.ADD_PRINT_TEXT("24mm","62mm","19mm","13mm","￥"+common.formatData(data.order.cod_fee)+"\n代收货款")
            LODOP.ADD_PRINT_TEXT("24mm","62mm","19mm","13mm","￥"+common.formatData(data.cod_fee)+"\n代收货款")
         }
         
         // 区域5
         LODOP.ADD_PRINT_LINE("34mm","80mm","34mm","96mm",0,1);
         LODOP.ADD_PRINT_LINE("21mm","96mm","34mm","96mm",0,1);	 
      // 区域5（上楼）
      
         if(data.delivery_type == 2){
            LODOP.SET_PRINT_STYLE("Bold",1);
            LODOP.SET_PRINT_STYLE("FontSize",9);
            LODOP.SET_PRINT_STYLE("Alignment",2); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
            LODOP.ADD_PRINT_IMAGE("23mm","84mm","8mm", "6mm","<img src='"+resourcesPath+"image-upstair.png'/>");
            LODOP.SET_PRINT_STYLEA(0,"Stretch",1);//(可变形)扩展缩放模式
            LODOP.ADD_PRINT_TEXT("30mm","78mm","19mm","13mm","上楼")  // 图标
         }
      
         
      // 条码2
         LODOP.ADD_PRINT_LINE("34mm","4mm","34mm","20mm",0,1);
         LODOP.ADD_PRINT_LINE("34mm","20mm","108mm","20mm",0,1);
         LODOP.ADD_PRINT_LINE("108mm","4mm","108mm","20mm",0,1);
         
         // 条码打印（ 位置从  4,40 开始）
         LODOP.ADD_PRINT_BARCODE("42mm", "6mm","12mm", "60mm", "128B",common.formatData(data.mailno_sub));
         LODOP.SET_PRINT_STYLEA(0,"Angle",-90);//设置旋转角度
         
      // 区域6-1 目的分拨
         LODOP.ADD_PRINT_LINE("47mm","20mm","47mm","76mm",0,1);
      //	 LODOP.ADD_PRINT_LINE("47mm","76mm","34mm","76mm",0,1);
         
         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",22);
         LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
         LODOP.ADD_PRINT_TEXT("37mm","20mm","66mm","13mm",data.receiver_center)
         
      // 区域6-2子单和总单数
         LODOP.ADD_PRINT_LINE("34mm","96mm","47mm","96mm",0,1);	 
         LODOP.ADD_PRINT_LINE("47mm","76mm","47mm","96mm",0,1);	
         
         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",9);
         LODOP.SET_PRINT_STYLE("Alignment",3); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      //	 LODOP.ADD_PRINT_TEXT("37mm","76mm","20mm","13mm","99/100\n5纸3木2拖");
         LODOP.ADD_PRINT_TEXT("37mm","76mm","20mm","13mm",common.formatData(data.index_sub));
      // 区域8 目的一级二级网点 子单和总单数
         LODOP.ADD_PRINT_LINE("34mm","96mm","47mm","96mm",0,1);	 
         LODOP.ADD_PRINT_LINE("60mm","20mm","60mm","96mm",0,1);	
      
         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize", data.receiver_site.length > 11  ? 13 : 17 );
         LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      //	 LODOP.ADD_PRINT_TEXT("50mm","20mm","76mm","13mm","台州路营业部-龙洞二部");
      //	 LODOP.ADD_PRINT_TEXT("50mm","20mm","76mm","13mm",data.receiver_super_site+"-"+data.receiver_site);
         LODOP.ADD_PRINT_TEXT("50mm","20mm","80mm","13mm",data.receiver_site);

         
         let routes =  data.route.split("-");
         let len =routes.length;
      // 区域 9-1
         LODOP.ADD_PRINT_LINE("73mm","20mm","73mm","32mm",0,1);	
         LODOP.ADD_PRINT_LINE("60mm","32mm","73mm","32mm",0,1);	 
         
         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",16);
         LODOP.SET_PRINT_STYLE("Alignment",2); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
         LODOP.ADD_PRINT_TEXT("60mm","20mm","12mm","13mm",len > 0 ? routes[0] : "")
         LODOP.SET_PRINT_STYLEA(0,"Angle",-0);//设置旋转角度
         
         
      // 区域 9-2
         LODOP.ADD_PRINT_LINE("73mm","32mm","73mm","44mm",0,1);	
         LODOP.ADD_PRINT_LINE("60mm","44mm","73mm","44mm",0,1);	 
         

         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",16);
         LODOP.SET_PRINT_STYLE("Alignment",2); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
         LODOP.ADD_PRINT_TEXT("60mm","32mm","12mm","13mm",len > 1 ? routes[1] : "")
         LODOP.SET_PRINT_STYLEA(0,"Angle",-0);//设置旋转角度
         
      // 区域 9-3
         LODOP.ADD_PRINT_LINE("73mm","44mm","73mm","56mm",0,1);	
         LODOP.ADD_PRINT_LINE("60mm","56mm","73mm","56mm",0,1);	 
         
         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",16);
         LODOP.SET_PRINT_STYLE("Alignment",2); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
         LODOP.ADD_PRINT_TEXT("60mm","44mm","12mm","13mm",len > 2 ? routes[2] : "")
         LODOP.SET_PRINT_STYLEA(0,"Angle",-0);//设置旋转角度
         
         // 区域 9-4
         LODOP.ADD_PRINT_LINE("73mm","56mm","73mm","68mm",0,1);	
         LODOP.ADD_PRINT_LINE("60mm","68mm","73mm","68mm",0,1);	 
         
         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",16);
         LODOP.SET_PRINT_STYLE("Alignment",2); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
         LODOP.ADD_PRINT_TEXT("60mm","56mm","12mm","13mm",len > 3 ? routes[3] : "")
         LODOP.SET_PRINT_STYLEA(0,"Angle",-0);//设置旋转角度
         // 区域 9-5
         LODOP.ADD_PRINT_LINE("73mm","68mm","73mm","80mm",0,1);	
         LODOP.ADD_PRINT_LINE("60mm","80mm","73mm","80mm",0,1);
         
         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",16);
         LODOP.SET_PRINT_STYLE("Alignment",2); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
         LODOP.ADD_PRINT_TEXT("60mm","68mm","12mm","13mm",len > 4 ? routes[4] : "")
         LODOP.SET_PRINT_STYLEA(0,"Angle",-0);//设置旋转角度
         
         // 区域 9-5
         LODOP.ADD_PRINT_LINE("73mm","68mm","73mm","96mm",0,1);	
         LODOP.ADD_PRINT_LINE("60mm","96mm","73mm","96mm",0,1);
         
         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",16);
         LODOP.SET_PRINT_STYLE("Alignment",2); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
         LODOP.ADD_PRINT_TEXT("60mm","82mm","12mm","13mm",len > 5 ? routes[5] : "")
         LODOP.SET_PRINT_STYLEA(0,"Angle",-0);//设置旋转角度
         
         // 区域 10
         LODOP.ADD_PRINT_LINE("73mm","96mm","86mm","96mm",0,1);	
         LODOP.ADD_PRINT_LINE("86mm","20mm","86mm","96mm",0,1);	
         
         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",20);
         LODOP.SET_PRINT_STYLE("Alignment",2); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
         LODOP.ADD_PRINT_IMAGE("76mm", "21mm","10mm", "9mm","<img src='"+resourcesPath+"image-receiver-small.png'/>");
         LODOP.SET_PRINT_STYLEA(0,"Stretch",1);//(可变形)扩展缩放模式
         

         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",7);
         LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
         // LODOP.ADD_PRINT_TEXT("76mm","32mm","70mm","7mm",common.formatData(data.order.receiver_name) +" "+common.formatData(data.order.receiver_phone)+"/"+common.formatData(data.order.receiver_tel));
         LODOP.ADD_PRINT_TEXT("76mm","32mm","70mm","7mm",common.formatData(data.receiver_name) +" "+common.formatData(data.receiver_phone)+"/"+common.formatData(data.receiver_tel));

         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",7);
         LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
         // LODOP.ADD_PRINT_TEXT("81mm","32mm","70mm","7mm",common.formatData(data.order.receiver_detail_address));
         LODOP.ADD_PRINT_TEXT("81mm","32mm","70mm","7mm",common.formatData(data.receiver_detail_address));
         
         
         
         // 区域 11-1
         LODOP.ADD_PRINT_LINE("97mm","20mm","97mm","30mm",0,1);	
         LODOP.ADD_PRINT_LINE("97mm","30mm","86mm","30mm",0,1);	
         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",7);
         LODOP.SET_PRINT_STYLE("Alignment",2); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
         LODOP.ADD_PRINT_TEXT("91mm","20mm","10mm","11mm","物品");
         
         
      // 区域 11-2
         LODOP.ADD_PRINT_LINE("97mm","20mm","97mm","58mm",0,1);	
         LODOP.ADD_PRINT_LINE("97mm","58mm","86mm","58mm",0,1);	
         
         LODOP.SET_PRINT_STYLE("Bold",0);
         LODOP.SET_PRINT_STYLE("FontSize",7);
         LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
         // LODOP.ADD_PRINT_TEXT("91mm","32mm","28mm","11mm",common.formatData(data.order.cargo_name));
         LODOP.ADD_PRINT_TEXT("91mm","32mm","28mm","11mm",common.formatData(data.cargo_name));
      // 区域 11-3
         LODOP.ADD_PRINT_LINE("97mm","58mm","97mm","68mm",0,1);	
         LODOP.ADD_PRINT_LINE("97mm","68mm","86mm","68mm",0,1);	
      
         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",7);
         LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
         LODOP.ADD_PRINT_TEXT("89mm","60mm","10mm","11mm","重量\n体积");
         
      //	// 区域 11-3
         LODOP.ADD_PRINT_LINE("97mm","68mm","97mm","96mm",0,1);
         LODOP.ADD_PRINT_LINE("97mm","96mm","86mm","96mm",0,1);	
         LODOP.SET_PRINT_STYLE("Bold",0);
         LODOP.SET_PRINT_STYLE("FontSize",7);
         LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
         // LODOP.ADD_PRINT_TEXT("91mm","72mm","28mm","11mm",parseFloat(data.order.weight).toFixed(2)+"KG/"+parseFloat(data.order.volume).toFixed(2)+"m³");
         LODOP.ADD_PRINT_TEXT("91mm","72mm","28mm","11mm",parseFloat(data.weight).toFixed(2)+"KG/"+parseFloat(data.volume).toFixed(2)+"m³");
         // 区域 12-1
         LODOP.ADD_PRINT_LINE("108mm","20mm","108mm","30mm",0,1);	
         LODOP.ADD_PRINT_LINE("108mm","30mm","97mm","30mm",0,1);	
         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",7);
         LODOP.SET_PRINT_STYLE("Alignment",2); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
         LODOP.ADD_PRINT_TEXT("101mm","20mm","10mm","11mm","打印")
         
         // 区域 12-2
         LODOP.ADD_PRINT_LINE("108mm","30mm","108mm","58mm",0,1);	
         LODOP.ADD_PRINT_LINE("108mm","58mm","97mm","58mm",0,1);
         LODOP.SET_PRINT_STYLE("Bold",0);
         LODOP.SET_PRINT_STYLE("FontSize",7);
         LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
         // LODOP.ADD_PRINT_TEXT("101mm","30mm","33mm","11mm",getformatNowDate());
         LODOP.ADD_PRINT_TEXT("101mm","30mm","33mm","11mm",common.formatData(data.printDate));

         
         
         // 区域 12-3
         LODOP.ADD_PRINT_LINE("108mm","58mm","108mm","96mm",0,1);
         LODOP.ADD_PRINT_LINE("108mm","96mm","97mm","96mm",0,1);
         LODOP.SET_PRINT_STYLE("Bold",0);
         LODOP.SET_PRINT_STYLE("FontSize",7);
         LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
         // LODOP.ADD_PRINT_TEXT("98mm","58mm","38mm","11mm","共收到"+common.formatData(data.order.piece_amount)+"件");
         LODOP.ADD_PRINT_TEXT("98mm","58mm","38mm","11mm","共收到"+common.formatData(data.piece_amount)+"件");
         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",7);
         LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
         LODOP.ADD_PRINT_IMAGE("100mm","68mm","6mm", "6mm","<img src='"+resourcesPath+"image-sign.png'/>");
         LODOP.SET_PRINT_STYLEA(0,"Stretch",1);//(可变形)扩展缩放模式
      // 分割线
         LODOP.ADD_PRINT_LINE("110mm","0mm","110mm","100mm",2,1);
         
         
          
      // 区域 13-1
         LODOP.ADD_PRINT_LINE("125mm","4mm","125mm","40mm",0,1);
   
         
         // 区域 13-2 // 条码打印 3
         LODOP.ADD_PRINT_LINE("125mm","40mm","125mm","96mm",0,1);
      //	 LODOP.ADD_PRINT_LINE("125mm","96mm","112mm","96mm",0,1);
         // 条码打印 3
         LODOP.SET_PRINT_STYLE("Bold",0);
         LODOP.ADD_PRINT_BARCODE("113mm", "45mm","52mm", "10mm", "128B",common.formatData(data.mailno))
         
         
      // 区域 14
         LODOP.ADD_PRINT_LINE("138mm","4mm","138mm","76mm",0,1);
         LODOP.ADD_PRINT_LINE("138mm","76mm","125mm","76mm",0,1);

         LODOP.ADD_PRINT_IMAGE("127mm", "5mm","10mm", "11mm","<img src='"+resourcesPath+"image-receiver.png'/>");
         LODOP.SET_PRINT_STYLEA(0,"Stretch",1);//(可变形)扩展缩放模式
         
         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",7);
         LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      //	 LODOP.ADD_PRINT_TEXT("128mm","16mm","60mm","7mm","戴先生  13632374784")
         // LODOP.ADD_PRINT_TEXT("128mm","16mm","60mm","7mm",common.formatData(data.order.receiver_name) +" "+common.formatData(data.order.receiver_phone)+"/"+common.formatData(data.order.receiver_tel))
         LODOP.ADD_PRINT_TEXT("128mm","16mm","60mm","7mm",common.formatData(data.receiver_name) +" "+common.formatData(data.receiver_phone)+"/"+common.formatData(data.receiver_tel))

         
         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",7);
         LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
         // LODOP.ADD_PRINT_TEXT("132mm","16mm","60mm","7mm",common.formatData(data.order.receiver_detail_address));
         LODOP.ADD_PRINT_TEXT("132mm","16mm","60mm","7mm",common.formatData(data.receiver_detail_address));

         // 区域 15
         LODOP.ADD_PRINT_LINE("152mm","4mm","152mm","76mm",0,1);
         LODOP.ADD_PRINT_LINE("152mm","76mm","138mm","76mm",0,1); 
         
         LODOP.ADD_PRINT_IMAGE("140mm", "5mm","10mm", "11mm","<img src='"+resourcesPath+"image-send.png'/>");
         LODOP.SET_PRINT_STYLEA(0,"Stretch",1);//(可变形)扩展缩放模式
         
         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",7);
         LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      //	 LODOP.ADD_PRINT_TEXT("142mm","16mm","60mm","7mm","广东省广州市科学信息大厦802市");
         // LODOP.ADD_PRINT_TEXT("142mm","16mm","60mm","7mm",common.formatData(data.order.sender_detail_address));
         LODOP.ADD_PRINT_TEXT("142mm","16mm","60mm","7mm",common.formatData(data.sender_detail_address));

         
         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",7);
         LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
      //	 LODOP.ADD_PRINT_TEXT("146mm","16mm","60mm","7mm","科学营业厅五部");
         LODOP.ADD_PRINT_TEXT("146mm","16mm","60mm","7mm",common.formatData(data.sender_site));
         
         
         // 区域 16 二维码打印
         LODOP.ADD_PRINT_LINE("152mm","76mm","152mm","96mm",0,1);
         LODOP.ADD_PRINT_LINE("152mm","96mm","125mm","96mm",0,1); 
         LODOP.ADD_PRINT_IMAGE("128mm", "78mm","18mm", "18mm","<img src='"+resourcesPath+"image-ercode.png'/>");
         LODOP.SET_PRINT_STYLEA(0,"Stretch",1);//(可变形)扩展缩放模式
         
         // 区域 17
         LODOP.ADD_PRINT_LINE("152mm","4mm","176mm","4mm",0,1);
         LODOP.ADD_PRINT_LINE("176mm","4mm","176mm","96mm",0,1); 
         LODOP.ADD_PRINT_LINE("176mm","96mm","152mm","96mm",0,1);
      // 区域 17 -1
         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",7);
         LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
         LODOP.ADD_PRINT_TEXT("170mm","86mm","15mm","10mm","已验视C")
         
         // 区域 17 -2
         LODOP.SET_PRINT_STYLE("Bold",1);
         LODOP.SET_PRINT_STYLE("FontSize",7);
         LODOP.SET_PRINT_STYLE("Alignment",1); //1--左靠齐 2--居中 3--右靠齐，缺省值是1
         LODOP.ADD_PRINT_TEXT("156mm","6mm","15mm","10mm","自定义区")
         //开始打印
        lodopUtil.doPrint(LODOP,printViewFlag,printMachine);
    }
    
export {
	printYdkyOrders, //打印方法
}