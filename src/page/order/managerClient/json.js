// 通用AB
let head = [ 
    {"name":"运单号","code":"trackingNum","type" : "text","width":"120"},
    {"name":"客户单号","code":"ordNum","type" : "text","width":"150"},
    {"name":"采购单号","code":"purchaseNum","type" : "text","width":"120"},
    {"name":"手工单号","code":"manualNum","type" : "text","width":"120"},
    {"name":"采购员","code":"purchaseUserName","type" : "text"},
    {"name":"期待到货时间","code":"waitArriveDate","type" : "text","width":"150"},
    {"name":"期待上门时间","code":"prePickupDate","type" : "text","width":"200"},
    {"name":"自定义字段","code":"customizeFiledName","type" : "text","width":"120"},
    {"name":"自定义值","code":"customizeFiledValue","type" : "text","width":"120"},
    {"name":"客户归属","code":"customerTenantName","type" : "text","width":"200"},
    {"name":"品牌","code":"brandName","type" : "text","width":"120"},
    {"name":"运单状态","code":"orderOutStateName","type" : "text","width":"120"},
    {"name":"运单类型","code":"orderTypeName","type" : "text","width":"120"},
    {"name":"运单来源","code":"sourceTypeName","type" : "text","width":"120"},
    {"name":"下单时间","code":"createDate","type" : "text","width":"150"},
    {"name":"三方结算","code":"payConsignorFlagName","type" : "text","width":"120"},
    {"name":"结算店铺","code":"payConsignorName","type" : "text","width":"120"},
    {"name":"三方结算状态","code":"payConsignorStateName","type" : "text","width":"120"},
    {"name":"拒绝理由","code":"payConsignorRefundRemark","type" : "text","width":"120"},
    {"name":"发货店仓","code":"consignorName","type" : "text","width":"120"},
    {"name":"发货人","code":"consignorLinkmanName","type" : "text","width":"120"},
    {"name":"发货手机","code":"consignorBill","type" : "text","width":"120"},
    {"name":"发货电话","code":"consignorTelephone","type" : "text","width":"120"},
    {"name":"发货省","code":"sourceProvinceName","type" : "text","width":"100"},
    {"name":"发货市","code":"sourceCityName","type" : "text","width":"100"},
    {"name":"发货区","code":"sourceCountyName","type" : "text","width":"100"},
    {"name":"发货省市区","code":"sourceCityAddr","type" : "text","width":"120"},
    {"name":"发货详细地址","code":"sourceAddress","type" : "text","width":"200"},
    {"name":"收货客户","code":"consigneeName","type" : "text","width":"120"},
    {"name":"收货人","code":"consigneeLinkmanName","type" : "text","width":"120"},
    {"name":"收货手机","code":"consigneeBill","type" : "text","width":"120"},
    {"name":"收货电话","code":"consigneeTelephone","type" : "text","width":"120"},
    {"name":"收货省","code":"destProvinceName","type" : "text","width":"100"},
    {"name":"收货市","code":"destCityName","type" : "text","width":"100"},
    {"name":"收货区","code":"destCountyName","type" : "text","width":"100"},
    {"name":"收货省市区","code":"destCityAddr","type" : "text","width":"120"},
    {"name":"收货详细地址","code":"destAddress","type" : "text","width":"200"},
    {"name":"前端交货方式","code":"beginDeliveryTypeName","type" : "text"},
    {"name":"末端交货方式","code":"endDeliveryTypeName","type" : "text"},
    {"name":"需求运输类型","code":"transportTypeName","type" : "text"},
    {"name":"结算方式","code":"paymentTypeName","type" : "text"},
    {"name":"运费","code":"freightDouble","type" : "text","isSum":"true"},
    {"name":"保险费","code":"insureFeeDouble","type" : "text","isSum":"true"},
    {"name":"保价","code":"goodsPriceDouble","type" : "text","isSum":"true"},
    {"name":"代收货款","code":"collectingMoneyDouble","type" : "text","isSum":"true"},
    {"name":"代收手续费","code":"procedureFeeDouble","type" : "text","isSum":"true"},
    {"name":"合计运费","code":"orderIncomeDouble","type" : "text","isSum":"true"},
    {"name":"货品名","code":"goodsName","type" : "text","width":"120"},
    {"name":"包装数据","code":"packingInfo","type" : "text","width":"150"},
    {"name":"打包件数","code":"packageNumber","type" : "text","isSum":"true"},
    {"name":"打包体积（方）","code":"packageVolume","type" : "text","isSum":"true","width":"150"},
    {"name":"打包重量（公斤）","code":"packageWeight","type" : "text","isSum":"true","width":"150"},
    {"name":"调出数量","code":"callOutCount","type" : "text","isSum":"true"},
    {"name":"入库数量","code":"callInCount","type" : "text","isSum":"true"},
    {"name":"下单时间","code":"createDate","type" : "text","width":"150"},
    {"name":"审核时间","code":"auditDate","type" : "text","width":"150"},
    //{"name":"供应商名称","code":"supplierTenantName","type" : "text","width":"150"},
    {"name":"中转单号","code":"outgoingTrackingNum","type" : "text","width":"150"},
    {"name":"打印数据","code":"printDataFlagName","type" : "text","width":"120"},
    {"name":"打印状态","code":"printStatusName","type" : "text","width":"100"},
    {"name":"签收时间","code":"signDate","type" : "text","width":"150"},
    //{"name":"接单时间","code":"acceptDate","type" : "text","width":"150"},
    {"name":"揽收时间","code":"collectTime","type" : "text","width":"150"},
    {"name":"备注","code":"customerRemarks","width":"200","type" : "text"},
    {"name":"取消人","code":"cancelOpName","width":"150","type" : "text"},
    {"name":"取消时间","code":"cancelTime","width":"150","type" : "text"},
    {"name":"取消备注","code":"cancelRemark","width":"200","type" : "text"}
];
// 揽件异常 待揽件  TAB
let head4 = [ 
    {"name":"下单时间","code":"createDate","type" : "text","width":"150"},
    {"name":"审核时间","code":"auditDate","type" : "text","width":"150"},
    {"name":"期待到货时间","code":"waitArriveDate","type" : "text","width":"150"},
    {"name":"期待上门时间","code":"prePickupDate","type" : "text","width":"200"},
    {"name":"取件倒计时","code":"pickupOutDate","type" : "text","width":"200"},
    {"name":"产品类型","code":"productTypeName","type" : "text","width":"120"},
    {"name":"运单号","code":"trackingNum","type" : "text","width":"120"},
    {"name":"客户单号","code":"ordNum","type" : "text","width":"150"},
    {"name":"采购单号","code":"purchaseNum","type" : "text","width":"120"},
    {"name":"手工单号","code":"manualNum","type" : "text","width":"120"},
    {"name":"采购员","code":"purchaseUserName","type" : "text"},
    {"name":"自定义字段","code":"customizeFiledName","type" : "text","width":"120"},
    {"name":"自定义值","code":"customizeFiledValue","type" : "text","width":"120"},
    {"name":"客户归属","code":"customerTenantName","type" : "text","width":"200"},
    {"name":"品牌","code":"brandName","type" : "text","width":"120"},
    {"name":"运单状态","code":"orderOutStateName","type" : "text","width":"120"},
    {"name":"运单类型","code":"orderTypeName","type" : "text","width":"120"},
    {"name":"运单来源","code":"sourceTypeName","type" : "text","width":"120"},
    {"name":"三方结算","code":"payConsignorFlagName","type" : "text","width":"120"},
    {"name":"结算店铺","code":"payConsignorName","type" : "text","width":"120"},
    {"name":"三方结算状态","code":"payConsignorStateName","type" : "text","width":"120"},
    {"name":"拒绝理由","code":"payConsignorRefundRemark","type" : "text","width":"120"},
    {"name":"发货店仓","code":"consignorName","type" : "text","width":"120"},
    {"name":"发货人","code":"consignorLinkmanName","type" : "text","width":"120"},
    {"name":"发货手机","code":"consignorBill","type" : "text","width":"120"},
    {"name":"发货电话","code":"consignorTelephone","type" : "text","width":"120"},
    {"name":"发货省","code":"sourceProvinceName","type" : "text","width":"100"},
    {"name":"发货市","code":"sourceCityName","type" : "text","width":"100"},
    {"name":"发货区","code":"sourceCountyName","type" : "text","width":"100"},
    {"name":"发货省市区","code":"sourceCityAddr","type" : "text","width":"120"},
    {"name":"发货详细地址","code":"sourceAddress","type" : "text","width":"200"},
    {"name":"收货客户","code":"consigneeName","type" : "text","width":"120"},
    {"name":"收货人","code":"consigneeLinkmanName","type" : "text","width":"120"},
    {"name":"收货手机","code":"consigneeBill","type" : "text","width":"120"},
    {"name":"收货电话","code":"consigneeTelephone","type" : "text","width":"120"},
    {"name":"收货省","code":"destProvinceName","type" : "text","width":"100"},
    {"name":"收货市","code":"destCityName","type" : "text","width":"100"},
    {"name":"收货区","code":"destCountyName","type" : "text","width":"100"},
    {"name":"收货省市区","code":"destCityAddr","type" : "text","width":"120"},
    {"name":"收货详细地址","code":"destAddress","type" : "text","width":"200"},
    {"name":"前端交货方式","code":"beginDeliveryTypeName","type" : "text"},
    {"name":"末端交货方式","code":"endDeliveryTypeName","type" : "text"},
    {"name":"需求运输类型","code":"transportTypeName","type" : "text"},
    {"name":"结算方式","code":"paymentTypeName","type" : "text"},
    {"name":"货品名","code":"goodsName","type" : "text","width":"120"},
    {"name":"包装数据","code":"packingInfo","type" : "text","width":"150"},
    {"name":"打包件数","code":"packageNumber","type" : "text","isSum":"true"},
    {"name":"打包体积（方）","code":"packageVolume","type" : "text","isSum":"true","width":"150"},
    {"name":"打包重量（公斤）","code":"packageWeight","type" : "text","isSum":"true","width":"150"},
    {"name":"调出数量","code":"callOutCount","type" : "text","isSum":"true"},
    {"name":"入库数量","code":"callInCount","type" : "text","isSum":"true"},
    //{"name":"供应商类型","code":"supplierTenantTypeName","type" : "text"},
    //{"name":"供应商名称","code":"supplierTenantName","type" : "text","width":"150"},
    {"name":"中转单号","code":"outgoingTrackingNum","type" : "text","width":"150"},
    {"name":"备注","code":"customerRemarks","width":"200","type" : "text"}
];
// 取消TAB
let head88 = [ 
    {"name":"取消人","code":"cancelOpName","width":"150","type" : "text"},
    {"name":"取消时间","code":"cancelTime","width":"150","type" : "text"},
    {"name":"取消备注","code":"cancelRemark","width":"200","type" : "text"},
    {"name":"下单时间","code":"createDate","type" : "text","width":"150"},
    {"name":"审核时间","code":"auditDate","type" : "text","width":"150"},
    {"name":"运单号","code":"trackingNum","type" : "text","width":"120"},
    {"name":"客户单号","code":"ordNum","type" : "text","width":"150"},
    {"name":"采购单号","code":"purchaseNum","type" : "text","width":"120"},
    {"name":"手工单号","code":"manualNum","type" : "text","width":"120"},
    {"name":"采购员","code":"purchaseUserName","type" : "text"},
    {"name":"自定义字段","code":"customizeFiledName","type" : "text","width":"120"},
    {"name":"自定义值","code":"customizeFiledValue","type" : "text","width":"120"},
    {"name":"客户归属","code":"customerTenantName","type" : "text","width":"200"},
    {"name":"品牌","code":"brandName","type" : "text","width":"120"},
    {"name":"运单状态","code":"orderOutStateName","type" : "text","width":"120"},
    {"name":"运单类型","code":"orderTypeName","type" : "text","width":"120"},
    {"name":"运单来源","code":"sourceTypeName","type" : "text","width":"120"},
    {"name":"三方结算","code":"payConsignorFlagName","type" : "text","width":"120"},
    {"name":"三方结算状态","code":"payConsignorStateName","type" : "text","width":"120"},
    {"name":"结算店铺","code":"payConsignorName","type" : "text","width":"120"},
    {"name":"发货店仓","code":"consignorName","type" : "text","width":"120"},
    {"name":"发货人","code":"consignorLinkmanName","type" : "text","width":"120"},
    {"name":"发货手机","code":"consignorBill","type" : "text","width":"120"},
    {"name":"发货电话","code":"consignorTelephone","type" : "text","width":"120"},
    {"name":"发货省","code":"sourceProvinceName","type" : "text","width":"100"},
    {"name":"发货市","code":"sourceCityName","type" : "text","width":"100"},
    {"name":"发货区","code":"sourceCountyName","type" : "text","width":"100"},
    {"name":"发货省市区","code":"sourceCityAddr","type" : "text","width":"120"},
    {"name":"发货详细地址","code":"sourceAddress","type" : "text","width":"200"},
    {"name":"收货客户","code":"consigneeName","type" : "text","width":"120"},
    {"name":"收货人","code":"consigneeLinkmanName","type" : "text","width":"120"},
    {"name":"收货手机","code":"consigneeBill","type" : "text","width":"120"},
    {"name":"收货电话","code":"consigneeTelephone","type" : "text","width":"120"},
    {"name":"收货省","code":"destProvinceName","type" : "text","width":"100"},
    {"name":"收货市","code":"destCityName","type" : "text","width":"100"},
    {"name":"收货区","code":"destCountyName","type" : "text","width":"100"},
    {"name":"收货省市区","code":"destCityAddr","type" : "text","width":"120"},
    {"name":"收货详细地址","code":"destAddress","type" : "text","width":"200"},
    {"name":"前端交货方式","code":"beginDeliveryTypeName","type" : "text"},
    {"name":"末端交货方式","code":"endDeliveryTypeName","type" : "text"},
    {"name":"需求运输类型","code":"transportTypeName","type" : "text"},
    {"name":"结算方式","code":"paymentTypeName","type" : "text"},
    {"name":"货品名","code":"goodsName","type" : "text","width":"120"},
    {"name":"包装数据","code":"packingInfo","type" : "text","width":"150"},
    {"name":"打包件数","code":"packageNumber","type" : "text","isSum":"true"},
    {"name":"打包体积（方）","code":"packageVolume","type" : "text","isSum":"true","width":"150"},
    {"name":"打包重量（公斤）","code":"packageWeight","type" : "text","isSum":"true","width":"150"},
    {"name":"调出数量","code":"callOutCount","type" : "text","isSum":"true"},
    {"name":"入库数量","code":"callInCount","type" : "text","isSum":"true"},
    {"name":"调出数量","code":"callOutCount","type" : "text","isSum":"true"},
    {"name":"入库数量","code":"callInCount","type" : "text","isSum":"true"},
    {"name":"备注","code":"customerRemarks","width":"200","type" : "text"}  
];

// 未入库 TAB
let headNotCall = [ 
    {"name":"签收时间","code":"signDate","type" : "text","width":"150"},
    {"name":"下单时间","code":"createDate","type" : "text","width":"150"},
    {"name":"审核时间","code":"auditDate","type" : "text","width":"150"},
    {"name":"运单号","code":"trackingNum","type" : "text","width":"120"},
    {"name":"客户单号","code":"ordNum","type" : "text","width":"150"},
    {"name":"采购单号","code":"purchaseNum","type" : "text","width":"120"},
    {"name":"手工单号","code":"manualNum","type" : "text","width":"120"},
    {"name":"采购员","code":"purchaseUserName","type" : "text"},
    {"name":"自定义字段","code":"customizeFiledName","type" : "text","width":"120"},
    {"name":"自定义值","code":"customizeFiledValue","type" : "text","width":"120"},
    {"name":"客户归属","code":"customerTenantName","type" : "text","width":"200"},
    {"name":"品牌","code":"brandName","type" : "text","width":"120"},
    {"name":"运输类型","code":"transitTypeName","type" : "text","width":"120"},
    //{"name":"供应商名称","code":"supplierTenantName","type" : "text","width":"150"},
    {"name":"批次号","code":"batchNumAlias","type" : "text","width":"120"},
    {"name":"中转单号","code":"outgoingTrackingNum","type" : "text","width":"150"},
    {"name":"中转费用","code":"outgoingFeeDouble","type" : "text","isSum":"true"},
    {"name":"车牌号码","code":"plateNumber","type" : "text","width":"120"},
    {"name":"司机姓名","code":"driverName","type" : "text","width":"120"},
    {"name":"司机手机","code":"driverBill","type" : "text","width":"120"},
    {"name":"客户联系人","code":"customerTenantPrincipal","type" : "text","width":"120"},
    {"name":"客户联系手机","code":"customerTenantPhone","type" : "text","width":"120"},
    {"name":"运单状态","code":"orderOutStateName","type" : "text","width":"120"},
    {"name":"运单类型","code":"orderTypeName","type" : "text","width":"120"},
    {"name":"运单来源","code":"sourceTypeName","type" : "text","width":"120"},
    {"name":"下单时间","code":"createDate","type" : "text","width":"150"},
    {"name":"实际托运时间","code":"billingDate","type" : "text","width":"150"},
    {"name":"三方结算","code":"payConsignorFlagName","type" : "text","width":"120"},
    {"name":"三方结算状态","code":"payConsignorStateName","type" : "text","width":"120"},
    {"name":"结算店铺","code":"payConsignorName","type" : "text","width":"120"},
    {"name":"发货店仓","code":"consignorName","type" : "text","width":"120"},
    {"name":"发货人","code":"consignorLinkmanName","type" : "text","width":"120"},
    {"name":"发货手机","code":"consignorBill","type" : "text","width":"120"},
    {"name":"发货电话","code":"consignorTelephone","type" : "text","width":"120"},
    {"name":"发货省","code":"sourceProvinceName","type" : "text","width":"100"},
    {"name":"发货市","code":"sourceCityName","type" : "text","width":"100"},
    {"name":"发货区","code":"sourceCountyName","type" : "text","width":"100"},
    {"name":"发货省市区","code":"sourceCityAddr","type" : "text","width":"120"},
    {"name":"发货详细地址","code":"sourceAddress","type" : "text","width":"200"},
    {"name":"收货客户","code":"consigneeName","type" : "text","width":"120"},
    {"name":"收货人","code":"consigneeLinkmanName","type" : "text","width":"120"},
    {"name":"收货手机","code":"consigneeBill","type" : "text","width":"120"},
    {"name":"收货电话","code":"consigneeTelephone","type" : "text","width":"120"},
    {"name":"收货省","code":"destProvinceName","type" : "text","width":"100"},
    {"name":"收货市","code":"destCityName","type" : "text","width":"100"},
    {"name":"收货区","code":"destCountyName","type" : "text","width":"100"},
    {"name":"收货省市区","code":"destCityAddr","type" : "text","width":"120"},
    {"name":"收货详细地址","code":"destAddress","type" : "text","width":"200"},
    {"name":"前端交货方式","code":"beginDeliveryTypeName","type" : "text"},
    {"name":"末端交货方式","code":"endDeliveryTypeName","type" : "text"},
    {"name":"需求运输类型","code":"transportTypeName","type" : "text"},
    {"name":"结算方式","code":"paymentTypeName","type" : "text"},
    {"name":"支付方式","code":"payWayName","type" : "text"},
    {"name":"合计运费","code":"orderIncomeDouble","type" : "text","isSum":"true"},
    {"name":"货品名","code":"goodsName","type" : "text","width":"120"},
    {"name":"包装数据","code":"packingInfo","type" : "text","width":"150"},
    {"name":"打包件数","code":"packageNumber","type" : "text","isSum":"true"},
    {"name":"打包体积（方）","code":"packageVolume","type" : "text","isSum":"true","width":"150"},
    {"name":"打包重量（公斤）","code":"packageWeight","type" : "text","isSum":"true","width":"150"},
    {"name":"调出数量","code":"callOutCount","type" : "text","isSum":"true"},
    {"name":"入库数量","code":"callInCount","type" : "text","isSum":"true"},
    {"name":"备注","code":"customerRemarks","width":"200","type" : "text"}
];

// 导入 表格
let headImport = [ 
    {"name":"运单号","code":"trackingNum","type" : "text","width":"120"},
    {"name":"客户单号","code":"ordNum","type" : "text","width":"150"},
    {"name":"采购单号","code":"purchaseNum","type" : "text","width":"120"},
    {"name":"手工单号","code":"manualNum","type" : "text","width":"120"},
    {"name":"采购员","code":"purchaseUserName","type" : "text"},
    {"name":"自定义字段","code":"customizeFiledName","type" : "text","width":"120"},
    {"name":"自定义值","code":"customizeFiledValue","type" : "text","width":"120"},
    {"name":"客户归属","code":"customerTenantName","type" : "text","width":"200"},
    {"name":"品牌","code":"brandName","type" : "text","width":"120"},
    {"name":"运单状态","code":"orderOutStateName","type" : "text","width":"120"},
    {"name":"运单类型","code":"orderTypeName","type" : "text","width":"120"},
    {"name":"运单来源","code":"sourceTypeName","type" : "text","width":"120"},
    {"name":"导入时间","code":"createDate","type" : "text","width":"150"},
    {"name":"下单时间","code":"createDate","type" : "text","width":"150"},
    {"name":"审核时间","code":"auditDate","type" : "text","width":"150"},
    {"name":"三方结算","code":"payConsignorFlagName","type" : "text","width":"120"},
    {"name":"三方结算状态","code":"payConsignorStateName","type" : "text","width":"120"},
    {"name":"结算店铺","code":"payConsignorName","type" : "text","width":"120"},
    {"name":"发货店仓","code":"consignorName","type" : "text","width":"120"},
    {"name":"发货人","code":"consignorLinkmanName","type" : "text","width":"120"},
    {"name":"发货手机","code":"consignorBill","type" : "text","width":"120"},
    {"name":"发货电话","code":"consignorTelephone","type" : "text","width":"120"},
    {"name":"发货省","code":"sourceProvinceName","type" : "text","width":"100"},
    {"name":"发货市","code":"sourceCityName","type" : "text","width":"100"},
    {"name":"发货区","code":"sourceCountyName","type" : "text","width":"100"},
    {"name":"发货省市区","code":"sourceCityAddr","type" : "text","width":"120"},
    {"name":"发货详细地址","code":"sourceAddress","type" : "text","width":"200"},
    {"name":"收货客户","code":"consigneeName","type" : "text","width":"120"},
    {"name":"收货人","code":"consigneeLinkmanName","type" : "text","width":"120"},
    {"name":"收货手机","code":"consigneeBill","type" : "text","width":"120"},
    {"name":"收货电话","code":"consigneeTelephone","type" : "text","width":"120"},
    {"name":"收货省","code":"destProvinceName","type" : "text","width":"100"},
    {"name":"收货市","code":"destCityName","type" : "text","width":"100"},
    {"name":"收货区","code":"destCountyName","type" : "text","width":"100"},
    {"name":"收货省市区","code":"destCityAddr","type" : "text","width":"120"},
    {"name":"收货详细地址","code":"destAddress","type" : "text","width":"200"},
    {"name":"前端交货方式","code":"beginDeliveryTypeName","type" : "text"},
    {"name":"末端交货方式","code":"endDeliveryTypeName","type" : "text"},
    {"name":"需求运输类型","code":"transportTypeName","type" : "text"},
    {"name":"结算方式","code":"paymentTypeName","type" : "text"},
    {"name":"合计运费","code":"orderIncomeDouble","type" : "text","isSum":"true"},
    {"name":"货品名","code":"goodsName","type" : "text","width":"120"},
    {"name":"包装数据","code":"packingInfo","type" : "text","width":"150"},
    {"name":"打包件数","code":"packageNumber","type" : "text","isSum":"true"},
    {"name":"打包体积（方）","code":"packageVolume","type" : "text","isSum":"true","width":"150"},
    {"name":"打包重量（公斤）","code":"packageWeight","type" : "text","isSum":"true","width":"150"},
    {"name":"调出数量","code":"callOutCount","type" : "text","isSum":"true"},
    {"name":"入库数量","code":"callInCount","type" : "text","isSum":"true"},
    {"name":"备注","code":"customerRemarks","width":"200","type" : "text"}
];
// 系统导入-审核TAB
let headAudit = [ 
    {"name":"审核状态","code":"auditStsName","type" : "text","width":"120"},
    {"name":"运单号","code":"trackingNum","type" : "text","width":"120"},
    {"name":"客户单号","code":"ordNum","type" : "text","width":"150"},
    {"name":"采购单号","code":"purchaseNum","type" : "text","width":"120"},
    {"name":"手工单号","code":"manualNum","type" : "text","width":"120"},
    {"name":"采购员","code":"purchaseUserName","type" : "text"},
    {"name":"自定义字段","code":"customizeFiledName","type" : "text","width":"120"},
    {"name":"自定义值","code":"customizeFiledValue","type" : "text","width":"120"},
    {"name":"客户归属","code":"customerTenantName","type" : "text","width":"120"},
    {"name":"运单状态","code":"orderOutStateName","type" : "text","width":"120"},
    {"name":"运单类型","code":"orderTypeName","type" : "text","width":"120"},
    {"name":"运单来源","code":"sourceTypeName","type" : "text","width":"120"},
    {"name":"下单时间","code":"createDate","type" : "text","width":"150"},
    {"name":"实际托运时间","code":"billingDate","type" : "text","width":"150"},
    {"name":"三方结算","code":"payConsignorFlagName","type" : "text","width":"120"},
    {"name":"结算店铺","code":"payConsignorName","type" : "text","width":"120"},
    {"name":"三方结算状态","code":"payConsignorStateName","type" : "text","width":"120"},
    {"name":"拒绝理由","code":"payConsignorRefundRemark","type" : "text","width":"120"},
    {"name":"发货店仓","code":"consignorName","type" : "text","width":"120"},
    {"name":"发货人","code":"consignorLinkmanName","type" : "text","width":"120"},
    {"name":"发货手机","code":"consignorBill","type" : "text","width":"120"},
    {"name":"发货电话","code":"consignorTelephone","type" : "text","width":"120"},
    {"name":"发货省","code":"sourceProvinceName","type" : "text","width":"100"},
    {"name":"发货市","code":"sourceCityName","type" : "text","width":"100"},
    {"name":"发货区","code":"sourceCountyName","type" : "text","width":"100"},
    {"name":"发货省市区","code":"sourceCityAddr","type" : "text","width":"120"},
    {"name":"发货详细地址","code":"sourceAddress","type" : "text","width":"200"},
    {"name":"收货客户","code":"consigneeName","type" : "text","width":"120"},
    {"name":"收货人","code":"consigneeLinkmanName","type" : "text","width":"120"},
    {"name":"收货手机","code":"consigneeBill","type" : "text","width":"120"},
    {"name":"收货电话","code":"consigneeTelephone","type" : "text","width":"120"},
    {"name":"收货省","code":"destProvinceName","type" : "text","width":"100"},
    {"name":"收货市","code":"destCityName","type" : "text","width":"100"},
    {"name":"收货区","code":"destCountyName","type" : "text","width":"100"},
    {"name":"收货省市区","code":"destCityAddr","type" : "text","width":"120"},
    {"name":"收货详细地址","code":"destAddress","type" : "text","width":"200"},
    {"name":"前端交货方式","code":"beginDeliveryTypeName","type" : "text"},
    {"name":"末端交货方式","code":"endDeliveryTypeName","type" : "text"},
    {"name":"需求运输类型","code":"transportTypeName","type" : "text"},
    {"name":"结算方式","code":"paymentTypeName","type" : "text"},
    {"name":"货品名","code":"goodsName","type" : "text","width":"120"},
    {"name":"包装数据","code":"packingInfo","type" : "text","width":"150"},
    {"name":"打包件数","code":"packageNumber","type" : "text","isSum":"true"},
    {"name":"打包体积（方）","code":"packageVolume","type" : "text","isSum":"true","width":"150"},
    {"name":"打包重量（公斤）","code":"packageWeight","type" : "text","isSum":"true","width":"150"},
    {"name":"调出数量","code":"callOutCount","type" : "text","isSum":"true"},
    {"name":"入库数量","code":"callInCount","type" : "text","isSum":"true"},
    {"name":"备注","code":"customerRemarks","width":"200","type" : "text"},
 ];

// 切换 TAB 
let  tabs = [
    {code:"ordersNum",name:"全部运单",orderStates:"",queryOrderOutStateTab:"1",num:"*",item:"toOrdersNumTem",itemType:"function", active:true,showOrderTab:true},
    {code:"waitReceiveOrderNum",name:"待取件",orderStates:"2,3,4",queryOrderOutStateTab:"2",head:head4,num:"*",item:"toWaitDealOrderNum",itemType:"function",showOrderTab:true},
    {code:"transferOrderNum",name:"运输中",orderStates:"5",num:"*",queryOrderOutStateTab:"3",item:"toTransferOrderNum",itemType:"function",showOrderTab:true},
    {code:"signOrderNum",name:"已签收",orderStates:"6",queryOrderOutStateTab:"4",num:"*",item:"toSignOrderNum",itemType:"function",showOrderTab:true},
    {code:"notCallinOrderNum",name:"未入库",num:"*",orderStates:"",queryOrderOutStateTab:"5",head:headNotCall,ordersTable:"ordersNotCallTable",item:"toNotCallInNum",itemType:"function",showOrderTab:true},
    {code:"cancalOrderNum",name:"已取消",orderStates:"88",num:"*",queryOrderOutStateTab:"6",head:head88,ordersTable:"ordersCancelTable",item:"toCancalOrderNum",itemType:"function",showOrderTab:true},
    {code:"exceptionOrderNum",name:"异常件",queryOrderOutStateTab:"7",num:"*",showOrderTab:false},
    
];
export{
    head,
    tabs,
    headImport,
    headAudit
}
