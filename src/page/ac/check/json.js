// 通用AB
let head = [ 
    {"name":"所属区域","code":"regionName","type" : "text","width":"120"},
    {"name":"计费产品","code":"calculatePriceName","type" : "text","width":"120"},
    {"name":"运单号","code":"trackingNum","type" : "text","width":"120"},
    {"name":"客户单号","code":"ordNum","type" : "text","width":"150"},
    {"name":"下单客户","code":"customerTenantName","type" : "text","width":"200"},
    {"name":"下单时间","code":"createDate","type" : "text","width":"150"},
    {"name":"核销项目","code":"checkTypeName","type" : "text","width":"120"},
    {"name":"核销状态","code":"checkStsName","type" : "text","width":"120"},
    {"name":"核销时间","code":"checkDate","type" : "text","width":"120"},
    {"name":"开单金额","code":"amountDouble","type" : "text","width":"120","isSum":"true"},
   
    {"name":"已核销金额","code":"checkAmountDouble","type" : "text","width":"120","isSum":"true"},
    {"name":"未核销金额","code":"uncheckAmountDouble","type" : "text","width":"120","isSum":"true"},

    {"name":"运费","code":"freightDouble","type" : "text","width":"120","isSum":"true"},
    {"name":"送货费","code":"deliveryCostsDouble","type" : "text","width":"120","isSum":"true"},
    {"name":"提货费","code":"pickingCostsDouble","type" : "text","width":"120","isSum":"true"},
    {"name":"装卸费","code":"handingCostsDouble","type" : "text","width":"120","isSum":"true"},
    {"name":"包装费","code":"packingCostsDouble","type" : "text","width":"120","isSum":"true"},
    {"name":"上楼费","code":"upstairFeeDouble","type" : "text","width":"120","isSum":"true"},
    {"name":"面单费","code":"facelistFeeDouble","type" : "text","width":"120","isSum":"true"},
    {"name":"代收货款","code":"collectingMoneyDouble","type" : "text","width":"120","isSum":"true"},
    {"name":"代收手续费","code":"procedureFeeDouble","type" : "text","width":"120","isSum":"true"},
    {"name":"申明价值","code":"goodsPriceDouble","type" : "text","width":"120","isSum":"true"},
    {"name":"保险费","code":"insureFeeDouble","type" : "text","width":"120","isSum":"true"},
    {"name":"到付上浮费","code":"floatingPriceDouble","type" : "text","isSum":"true"},
    {"name":"其他费","code":"otherFeeDouble","type" : "text","width":"120","isSum":"true"},
    {"name":"其他费名称","code":"otherFeeName","type" : "text","width":"120","isSum":"true"},

    {"name":"实际托运时间","code":"billingDate","type" : "text","width":"150"},
    {"name":"发货店仓","code":"consignorName","type" : "text","width":"120"},
    {"name":"发货人","code":"consignorLinkmanName","type" : "text","width":"120"},
    {"name":"发货手机","code":"consignorBill","type" : "text","width":"120"},
    {"name":"发货电话","code":"consignorTelephone","type" : "text","width":"120"},
    {"name":"发货省市区","code":"sourceCityAddr","type" : "text","width":"120"},
    {"name":"发货详细地址","code":"sourceAddress","type" : "text","width":"200"},
    {"name":"收货店仓","code":"consigneeName","type" : "text","width":"120"},
    {"name":"收货人","code":"consigneeLinkmanName","type" : "text","width":"120"},
    {"name":"收货手机","code":"consigneeBill","type" : "text","width":"120"},
    {"name":"收货电话","code":"consigneeTelephone","type" : "text","width":"120"},
    {"name":"收货省市区","code":"destCityAddr","type" : "text","width":"120"},
    {"name":"收货详细地址","code":"destAddress","type" : "text","width":"200"},
    {"name":"货品名","code":"goodsName","type" : "text","width":"120"},
    {"name":"打包件数","code":"packageNumber","type" : "text","isSum":"true"},
    {"name":"打包体积（方）","code":"packageVolume","type" : "text","isSum":"true","width":"150"},
    {"name":"打包重量（公斤）","code":"packageWeight","type" : "text","isSum":"true","width":"150"},
    {"name":"结算方式","code":"paymentTypeName","type" : "text"},
    {"name":"期待上门时间","code":"prePickupDate","type" : "text","width":"200"},
    {"name":"前端交货方式","code":"beginDeliveryTypeName","type" : "text"},
    {"name":"末端交货方式","code":"endDeliveryTypeName","type" : "text"},
    {"name":"运单状态","code":"orderOutStateName","type" : "text","width":"120"},
    {"name":"运单类型","code":"orderTypeName","type" : "text","width":"120"},
    {"name":"运单来源","code":"sourceTypeName","type" : "text","width":"120"},
];
 
let headAdd = [ 
    {"name":"所属区域","code":"regionName","type" : "text","width":"120"},
    {"name":"运单号","code":"trackingNum","type" : "text","width":"120"},
    {"name":"客户单号","code":"ordNum","type" : "text","width":"150"},
    {"name":"下单客户","code":"customerTenantName","type" : "text","width":"200"},
    {"name":"下单时间","code":"createDate","type" : "text","width":"150"},
    {"name":"核销项目","code":"checkTypeName","type" : "text","width":"120"},
    {"name":"开单金额","code":"amountDouble","type" : "text","width":"120","isSum":"true"},
    {"name":"到付上浮费","code":"floatingPriceDouble","type" : "text","isSum":"true"},
    {"name":"已核销金额","code":"checkAmountDouble","type" : "text","width":"120","isSum":"true"},
    {"name":"未核销金额","code":"uncheckAmountDouble","type" : "text","width":"120","isSum":"true"},
    {"name":"实际托运时间","code":"billingDate","type" : "text","width":"150"},
    {"name":"发货店仓","code":"consignorName","type" : "text","width":"120"},
    {"name":"发货人","code":"consignorLinkmanName","type" : "text","width":"120"},
    {"name":"发货手机","code":"consignorBill","type" : "text","width":"120"},
    {"name":"发货电话","code":"consignorTelephone","type" : "text","width":"120"},
    {"name":"发货省市区","code":"sourceCityAddr","type" : "text","width":"120"},
    {"name":"发货详细地址","code":"sourceAddress","type" : "text","width":"200"},
    {"name":"收货店仓","code":"consigneeName","type" : "text","width":"120"},
    {"name":"收货人","code":"consigneeLinkmanName","type" : "text","width":"120"},
    {"name":"收货手机","code":"consigneeBill","type" : "text","width":"120"},
    {"name":"收货电话","code":"consigneeTelephone","type" : "text","width":"120"},
    {"name":"收货省市区","code":"destCityAddr","type" : "text","width":"120"},
    {"name":"收货详细地址","code":"destAddress","type" : "text","width":"200"},
    {"name":"货品名","code":"goodsName","type" : "text","width":"120"},
    {"name":"打包件数","code":"packageNumber","type" : "text","isSum":"true"},
    {"name":"打包体积（方）","code":"packageVolume","type" : "text","isSum":"true","width":"150"},
    {"name":"打包重量（公斤）","code":"packageWeight","type" : "text","isSum":"true","width":"150"},
    {"name":"结算方式","code":"paymentTypeName","type" : "text"},
    {"name":"期待上门时间","code":"prePickupDate","type" : "text","width":"200"},
    {"name":"前端交货方式","code":"beginDeliveryTypeName","type" : "text"},
    {"name":"末端交货方式","code":"endDeliveryTypeName","type" : "text"},
    {"name":"运单状态","code":"orderOutStateName","type" : "text","width":"120"},
    {"name":"运单类型","code":"orderTypeName","type" : "text","width":"120"},
    {"name":"运单来源","code":"sourceTypeName","type" : "text","width":"120"},
];
let headRightAdd = [ 
    {"name":"所属区域","code":"regionName","type" : "text","width":"120"},
    {"name":"运单号","code":"trackingNum","type" : "text","width":"120"},
    {"name":"客户单号","code":"ordNum","type" : "text","width":"150"},
    {"name":"下单客户","code":"customerTenantName","type" : "text","width":"200"},
    {"name":"下单时间","code":"createDate","type" : "text","width":"150"},
    {"name":"核销项目","code":"checkTypeName","type" : "text","width":"120"},
    {"name":"开单金额","code":"amountDouble","type" : "text","width":"120","isSum":"true"},
    {"name":"到付上浮费","code":"floatingPriceDouble","type" : "text","isSum":"true"},
    {"name":"已核销金额","code":"checkAmountDouble","type" : "text","width":"120","isSum":"true"},
    {"name":"未核销金额","code":"uncheckAmountDouble","type" : "text","width":"120","isSum":"true"},
    {"name":"本次核销","code":"checkMoney","type" : "input","width":"120","isSum":"true"},
    {"name":"实际托运时间","code":"billingDate","type" : "text","width":"150"},
    {"name":"发货店仓","code":"consignorName","type" : "text","width":"120"},
    {"name":"发货人","code":"consignorLinkmanName","type" : "text","width":"120"},
    {"name":"发货手机","code":"consignorBill","type" : "text","width":"120"},
    {"name":"发货电话","code":"consignorTelephone","type" : "text","width":"120"},
    {"name":"发货省市区","code":"sourceCityAddr","type" : "text","width":"120"},
    {"name":"发货详细地址","code":"sourceAddress","type" : "text","width":"200"},
    {"name":"收货店仓","code":"consigneeName","type" : "text","width":"120"},
    {"name":"收货人","code":"consigneeLinkmanName","type" : "text","width":"120"},
    {"name":"收货手机","code":"consigneeBill","type" : "text","width":"120"},
    {"name":"收货电话","code":"consigneeTelephone","type" : "text","width":"120"},
    {"name":"收货省市区","code":"destCityAddr","type" : "text","width":"120"},
    {"name":"收货详细地址","code":"destAddress","type" : "text","width":"200"},
    {"name":"货品名","code":"goodsName","type" : "text","width":"120"},
    {"name":"打包件数","code":"packageNumber","type" : "text","isSum":"true"},
    {"name":"打包体积（方）","code":"packageVolume","type" : "text","isSum":"true","width":"150"},
    {"name":"打包重量（公斤）","code":"packageWeight","type" : "text","isSum":"true","width":"150"},
    {"name":"结算方式","code":"paymentTypeName","type" : "text"},
    {"name":"期待上门时间","code":"prePickupDate","type" : "text","width":"200"},
    {"name":"前端交货方式","code":"beginDeliveryTypeName","type" : "text"},
    {"name":"末端交货方式","code":"endDeliveryTypeName","type" : "text"},
    {"name":"运单状态","code":"orderOutStateName","type" : "text","width":"120"},
    {"name":"运单类型","code":"orderTypeName","type" : "text","width":"120"},
    {"name":"运单来源","code":"sourceTypeName","type" : "text","width":"120"},
];

let headTransfer = [ 
    {"name":"所属区域","code":"sourceRegionName","type" : "text","width":"120"},
    {"name":"目的区域","code":"destRegionName","type" : "text","width":"120"},
    {"name":"配载类型","code":"transitFlagName","type" : "text","width":"120"},
    {"name":"运单号","code":"trackingNum","type" : "text","width":"120"},
    {"name":"子单号","code":"transitTrackingNum","type" : "text","width":"150"},
    {"name":"客户单号","code":"ordNum","type" : "text","width":"150"},
    {"name":"核销项目","code":"checkTypeName","type" : "text","width":"120"},
    {"name":"核销状态","code":"checkStsName","type" : "text","width":"120"},
    {"name":"核销时间","code":"checkDate","type" : "text","width":"120"},
    {"name":"中转金额","code":"amountDouble","type" : "text","width":"120","isSum":"true"},
    {"name":"已核销金额","code":"checkAmountDouble","type" : "text","width":"120","isSum":"true"},
    {"name":"未核销金额","code":"uncheckAmountDouble","type" : "text","width":"120","isSum":"true"},

    {"name":"运费","code":"freightDouble","type" : "text","width":"120","isSum":"true"},
    {"name":"送货费","code":"deliveryCostsDouble","type" : "text","width":"120","isSum":"true"},
    {"name":"提货费","code":"pickingCostsDouble","type" : "text","width":"120","isSum":"true"},
    {"name":"装卸费","code":"handingCostsDouble","type" : "text","width":"120","isSum":"true"},
    {"name":"打包费","code":"packingCostsDouble","type" : "text","width":"120","isSum":"true"},
    {"name":"上楼费","code":"upstairFeeDouble","type" : "text","width":"120","isSum":"true"},
    {"name":"面单费","code":"facelistFeeDouble","type" : "text","width":"120","isSum":"true"},
    {"name":"代收货款","code":"collectingMoneyDouble","type" : "text","width":"120","isSum":"true"},
    {"name":"代收手续费","code":"procedureFeeDouble","type" : "text","width":"120","isSum":"true"},
    {"name":"申明价值","code":"goodsPriceDouble","type" : "text","width":"120","isSum":"true"},
    {"name":"保险费","code":"insureFeeDouble","type" : "text","width":"120","isSum":"true"},
    {"name":"到付上浮费","code":"floatingPriceDouble","type" : "text","isSum":"true"},
    {"name":"其他费","code":"otherFeeDouble","type" : "text","width":"120","isSum":"true"},
    {"name":"其他费名称","code":"otherFeeName","type" : "text","width":"120","isSum":"true"},

    {"name":"批次号","code":"batchNumAlias","type" : "text","width":"150"},
    {"name":"中转单号","code":"outgoingTrackingNum","type" : "text","width":"150"},
    {"name":"中转类型","code":"transitTypeName","type" : "text","width":"120"},
    {"name":"中转时间","code":"outGoingDate","type" : "text","width":"150"},
    {"name":"中转创建时间","code":"transferCreateDate","type" : "text","width":"150"},
    {"name":"下单客户","code":"customerTenantName","type" : "text","width":"200"},
    {"name":"运单状态","code":"orderOutStateName","type" : "text","width":"120"},
    {"name":"运单类型","code":"orderTypeName","type" : "text","width":"120"},
    {"name":"下单时间","code":"createDate","type" : "text","width":"150"},
    {"name":"实际托运时间","code":"billingDate","type" : "text","width":"150"},
    {"name":"发货店仓","code":"consignorName","type" : "text","width":"120"},
    {"name":"发货人","code":"consignorLinkmanName","type" : "text","width":"120"},
    {"name":"发货手机","code":"consignorBill","type" : "text","width":"120"},
    {"name":"发货电话","code":"consignorTelephone","type" : "text","width":"120"},
    {"name":"发货省市区","code":"sourceCityAddr","type" : "text","width":"120"},
    {"name":"发货详细地址","code":"sourceAddress","type" : "text","width":"200"},
    {"name":"收货店仓","code":"consigneeName","type" : "text","width":"120"},
    {"name":"收货人","code":"consigneeLinkmanName","type" : "text","width":"120"},
    {"name":"收货手机","code":"consigneeBill","type" : "text","width":"120"},
    {"name":"收货电话","code":"consigneeTelephone","type" : "text","width":"120"},
    {"name":"收货省市区","code":"destCityAddr","type" : "text","width":"120"},
    {"name":"收货详细地址","code":"destAddress","type" : "text","width":"200"},
    {"name":"货品名","code":"goodsName","type" : "text","width":"120"},
    {"name":"中转件数","code":"transferPackageNumber","type" : "text","isSum":"true"},
    {"name":"中转体积（方）","code":"transferPackageVolume","type" : "text","isSum":"true","width":"150"},
    {"name":"中转重量（公斤）","code":"transferPackageWeight","type" : "text","isSum":"true","width":"150"},
    {"name":"打包件数","code":"packageNumber","type" : "text","isSum":"true"},
    {"name":"打包体积（方）","code":"packageVolume","type" : "text","isSum":"true","width":"150"},
    {"name":"打包重量（公斤）","code":"packageWeight","type" : "text","isSum":"true","width":"150"},
    {"name":"中转结算方式","code":"paymentTypeName","type" : "text"}
];
 
let headAddTransfer = [ 
    {"name":"所属区域","code":"sourceRegionName","type" : "text","width":"120"},
    {"name":"目的区域","code":"destRegionName","type" : "text","width":"120"},
    {"name":"配载类型","code":"transitFlagName","type" : "text","width":"120"},
    {"name":"运单号","code":"trackingNum","type" : "text","width":"120"},
    {"name":"子单号","code":"transitTrackingNum","type" : "text","width":"150"},
    {"name":"客户单号","code":"ordNum","type" : "text","width":"150"},
    {"name":"核销项目","code":"checkTypeName","type" : "text","width":"120"},
    {"name":"核销状态","code":"checkStsName","type" : "text","width":"120"},
    {"name":"核销时间","code":"checkDate","type" : "text","width":"120"},
    {"name":"中转金额","code":"amountDouble","type" : "text","width":"120","isSum":"true"},
    {"name":"到付上浮费","code":"floatingPriceDouble","type" : "text","isSum":"true","isSum":true},
    {"name":"已核销金额","code":"checkAmountDouble","type" : "text","width":"120","isSum":"true"},
    {"name":"未核销金额","code":"uncheckAmountDouble","type" : "text","width":"120","isSum":"true"},
    {"name":"批次号","code":"batchNumAlias","type" : "text","width":"150"},
    {"name":"中转单号","code":"outgoingTrackingNum","type" : "text","width":"150"},
    {"name":"中转类型","code":"transitTypeName","type" : "text","width":"120"},
    {"name":"中转时间","code":"outGoingDate","type" : "text","width":"150"},
    {"name":"中转创建时间","code":"transferCreateDate","type" : "text","width":"150"},
    {"name":"下单客户","code":"customerTenantName","type" : "text","width":"200"},
    {"name":"运单状态","code":"orderOutStateName","type" : "text","width":"120"},
    {"name":"运单类型","code":"orderTypeName","type" : "text","width":"120"},
    {"name":"下单时间","code":"createDate","type" : "text","width":"150"},
    {"name":"实际托运时间","code":"billingDate","type" : "text","width":"150"},
    {"name":"发货店仓","code":"consignorName","type" : "text","width":"120"},
    {"name":"发货人","code":"consignorLinkmanName","type" : "text","width":"120"},
    {"name":"发货手机","code":"consignorBill","type" : "text","width":"120"},
    {"name":"发货电话","code":"consignorTelephone","type" : "text","width":"120"},
    {"name":"发货省市区","code":"sourceCityAddr","type" : "text","width":"120"},
    {"name":"发货详细地址","code":"sourceAddress","type" : "text","width":"200"},
    {"name":"收货店仓","code":"consigneeName","type" : "text","width":"120"},
    {"name":"收货人","code":"consigneeLinkmanName","type" : "text","width":"120"},
    {"name":"收货手机","code":"consigneeBill","type" : "text","width":"120"},
    {"name":"收货电话","code":"consigneeTelephone","type" : "text","width":"120"},
    {"name":"收货省市区","code":"destCityAddr","type" : "text","width":"120"},
    {"name":"收货详细地址","code":"destAddress","type" : "text","width":"200"},
    {"name":"货品名","code":"goodsName","type" : "text","width":"120"},
    {"name":"中转件数","code":"transferPackageNumber","type" : "text","isSum":"true"},
    {"name":"中转体积（方）","code":"transferPackageVolume","type" : "text","isSum":"true","width":"150"},
    {"name":"中转重量（公斤）","code":"transferPackageWeight","type" : "text","isSum":"true","width":"150"},
    {"name":"中转结算方式","code":"paymentTypeName","type" : "text"}
];
let headRightAddTransfer = [ 
    {"name":"所属区域","code":"sourceRegionName","type" : "text","width":"120"},
    {"name":"目的区域","code":"destRegionName","type" : "text","width":"120"},
    {"name":"配载类型","code":"transitFlagName","type" : "text","width":"120"},
    {"name":"运单号","code":"trackingNum","type" : "text","width":"120"},
    {"name":"子单号","code":"transitTrackingNum","type" : "text","width":"150"},
    {"name":"客户单号","code":"ordNum","type" : "text","width":"150"},
    {"name":"核销项目","code":"checkTypeName","type" : "text","width":"120"},
    {"name":"核销状态","code":"checkStsName","type" : "text","width":"120"},
    {"name":"核销时间","code":"checkDate","type" : "text","width":"120"},
    {"name":"中转金额","code":"amountDouble","type" : "text","width":"120","isSum":"true"},
    {"name":"到付上浮费","code":"floatingPriceDouble","type" : "text","isSum":"true"},
    {"name":"已核销金额","code":"checkAmountDouble","type" : "text","width":"120","isSum":"true"},
    {"name":"未核销金额","code":"uncheckAmountDouble","type" : "text","width":"120","isSum":"true"},
    {"name":"本次核销金额","code":"checkMoney","type" : "input","width":"120","isSum":"true"},
    {"name":"批次号","code":"batchNumAlias","type" : "text","width":"150"},
    {"name":"中转单号","code":"outgoingTrackingNum","type" : "text","width":"150"},
    {"name":"中转类型","code":"transitTypeName","type" : "text","width":"120"},
    {"name":"中转时间","code":"outGoingDate","type" : "text","width":"150"},
    {"name":"中转创建时间","code":"transferCreateDate","type" : "text","width":"150"},
    {"name":"下单客户","code":"customerTenantName","type" : "text","width":"200"},
    {"name":"运单状态","code":"orderOutStateName","type" : "text","width":"120"},
    {"name":"运单类型","code":"orderTypeName","type" : "text","width":"120"},
    {"name":"下单时间","code":"createDate","type" : "text","width":"150"},
    {"name":"实际托运时间","code":"billingDate","type" : "text","width":"150"},
    {"name":"发货店仓","code":"consignorName","type" : "text","width":"120"},
    {"name":"发货人","code":"consignorLinkmanName","type" : "text","width":"120"},
    {"name":"发货手机","code":"consignorBill","type" : "text","width":"120"},
    {"name":"发货电话","code":"consignorTelephone","type" : "text","width":"120"},
    {"name":"发货省市区","code":"sourceCityAddr","type" : "text","width":"120"},
    {"name":"发货详细地址","code":"sourceAddress","type" : "text","width":"200"},
    {"name":"收货店仓","code":"consigneeName","type" : "text","width":"120"},
    {"name":"收货人","code":"consigneeLinkmanName","type" : "text","width":"120"},
    {"name":"收货手机","code":"consigneeBill","type" : "text","width":"120"},
    {"name":"收货电话","code":"consigneeTelephone","type" : "text","width":"120"},
    {"name":"收货省市区","code":"destCityAddr","type" : "text","width":"120"},
    {"name":"收货详细地址","code":"destAddress","type" : "text","width":"200"},
    {"name":"货品名","code":"goodsName","type" : "text","width":"120"},
    {"name":"中转件数","code":"transferPackageNumber","type" : "text","isSum":"true"},
    {"name":"中转体积（方）","code":"transferPackageVolume","type" : "text","isSum":"true","width":"150"},
    {"name":"中转重量（公斤）","code":"transferPackageWeight","type" : "text","isSum":"true","width":"150"},
    {"name":"中转结算方式","code":"paymentTypeName","type" : "text"}
];

export{
    head,
    headAdd,
    headRightAdd,
    headTransfer,
    headAddTransfer,
    headRightAddTransfer
}
