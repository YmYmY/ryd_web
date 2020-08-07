import common from '@/utils/common.js'
import {printEclpOrders} from "./print/jd/print.js"
import {printBskyOrders} from "./print/bsky/print.js"
import {printYdkyOrders} from "./print/ydky/print.js"
import {printYdkdOrders76130,printYdkdOrders100180,printYdkdOrders101203} from "./print/ydkd/print.js"
import {printZtkyOrders} from "./print/ztky/print.js"
import {printYmddOrders} from "./print/ymdd/print.js"
import {printJituOrders} from "./print/jitu/print.js"
import {
  Message,
  MessageBox,
} from 'element-ui'

const printMethods = {  // 打印方法集合
  printEclpOrders:printEclpOrders, // 京东沧海系统
  printBskyOrders:printBskyOrders, // 百世快运系统
  printYdkyOrders:printYdkyOrders, // 韵达快运系统
  printYdkdOrders100180:printYdkdOrders100180, // 韵达中转系统 100 * 180
  printYdkdOrders101203:printYdkdOrders101203, // 韵达中转系统 101 * 203
  printYdkdOrders76130:printYdkdOrders76130, // 韵达中转系统 76 * 130
  printZtkyOrders:printZtkyOrders,// 中通快运
  printYmddOrders:printYmddOrders,// 壹米滴答
  printJituOrders:printJituOrders,//极兔 
}
  // 批量打印
 const doPrintBtach = async function(currentPrinter,orders){
    if(common.isBlank(currentPrinter) || common.isBlank(currentPrinter.printerName)){
      Message({"type":"success", message: "请先选择打印打印机"});   
      return;
    }
    if(common.isBlank(orders) || orders.length == 0){
      Message({"type":"success", message: "请先选择打印信息"});   
       return;
    }
    // 校验能否打印
    let arrsTem = [];// 同一个供应商
    let orderMap = [];// 同一个供应商
    let busiNums = [];
    for(let i in orders){
        let order = orders[i];
        if(common.isBlank(order.printDataFlag) || order.pritnDataFlag == 0){
          Message({"type":"success", message: "请选择已准备好数据进行打印"});   
           return;
        }
        let kMap = {};
        kMap.supplierTenantId = order.supplierTenantId;
        kMap.businessId = order.businessId;
        kMap.orderId = order.orderId;
        kMap.orderNo = order.orderNo;
        kMap.outgoingTrackingNum = order.outgoingTrackingNum;
        busiNums.push(kMap);
        if(common.isBlank(orderMap[order.supplierTenantId] )){
           arrsTem.push(order.supplierTenantId);
        }
        orderMap[order.supplierTenantId] = order.supplierTenantId;
    }

    if(arrsTem.length > 1){
       Message({"type":"success", message: "请选择相同供应商打印"});   
       return;
    }
    let params = {};
    params.busiNums = JSON.stringify(busiNums);
    let printMap = await queryPrintOrderDatas(params);
    if(common.isBlank(printMap) || printMap.length == 0){
      Message({"type":"success", message: "无法查找到打印信息"});   
      return false;
    }
    let orderPrints = printMap.items;
    if(common.isBlank(orderPrints) || orderPrints.length == 0){
       Message({"type":"success", message: "无法查找到打印信息"});   
       return false;
    }
    let pageSize = printMap.pageSize;
    let orderSize = printMap.orderSize;
    let msg = "确认打印["+orderSize+"]外发单，共["+pageSize+"]张";
    MessageBox.confirm(msg,'打印提示', {
      confirmButtonText: '立即打印',
      cancelButtonText: '关闭',
      type: 'warning'
    }).then(() => {
      // 开始打印
      let successPrintOrder = [];
      for(let i in orderPrints ){
          let o = orderPrints[i];
          let printJsMethod = o.printJsMethod;
          printMethods[printJsMethod](o.prints,currentPrinter.printerName,false,function(){
             successPrintOrder.push(o);
          });
      }
      updateOrdersPrintStatus(successPrintOrder)
    }).catch(() => {
           
    });
  }
  // 获取打印信息
   const queryPrintOrderDatas = async function(params){
      let orders = await common.postUrl("api/kdBusinessParamBO.ajax?cmd=queryPrintOrders", params,null,null,null,false);
      return orders;
  }
  
  // 批量更新状态
  const updateOrdersPrintStatus = function(orders){
    let arrs = [];
    // debugger
    for(let i in orders){
      arrs.push(orders[i].paramId);
    }
    let params = {};
    params.ids = arrs.join(",");
    let url = "api/kdBusinessParamBO.ajax?cmd=updateOrdersPrintStatus";
    common.postUrl(url, params,function(data){
      if(common.isNotBlank(data)){
          Message({"type":"success", message: "更新"+orders.length+"单,打印状态成功,请手动刷新结果"});   
      }
    });
}
//对象抛出
const commonPrint = {
   doPrintBtach,// 批量打印
}
export default commonPrint