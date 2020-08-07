// 通用AB
let head = [ 
    {"name":"所属区域","code":"sourceRegionName","type" : "text","width":"120"},
    {"name":"目的区域","code":"destRegionName","type" : "text","width":"120"},
    {"name":"运单号","code":"trackingNum","type" : "text","width":"120"},
    {"name":"子单号","code":"transitTrackingNum","type" : "text","width":"150"},
    {"name":"客户单号","code":"ordNum","type" : "text","width":"150"},
    {"name":"采购单号","code":"purchaseNum","type" : "text","width":"120"},
    {"name":"期待上门时间","code":"prePickupDate","type" : "text","width":"200"},
    {"name":"批次号","code":"batchNumAlias","type" : "text","width":"150"},
    {"name":"是否合单","code":"combinedStsName","type" : "text","width":"120"},
    {"name":"供应商类型","code":"supplierTenantTypeName","type" : "text"},
    {"name":"供应商名称","code":"supplierTenantName","type" : "text","width":"150"},
    {"name":"中转单号","code":"outgoingTrackingNum","type" : "text","width":"150"},
    {"name":"中转类型","code":"transitTypeName","type" : "text","width":"120"},
    {"name":"中转时间","code":"outGoingDate","type" : "text","width":"150"},
    {"name":"中转创建时间","code":"transferCreateDate","type" : "text","width":"150"},
    {"name":"对接状态","code":"transitStateName","type" : "text","width":"100"},
    {"name":"物流状态","code":"systemKdStatusName","type" : "text","width":"100"},
    {"name":"对接系统商家单号","code":"systemBusiNum","type" : "text","width":"150"},
    {"name":"三方系统对接备注","code":"systemRemark","type" : "text","width":"150"},
    {"name":"揽收业务人员","code":"takingUserName","type" : "text","width":"120"},
    {"name":"揽收业务电话","code":"takingUserPhone","type" : "text","width":"120"},
    {"name":"揽收件数","code":"takingPackageNumber","type" : "text","isSum":"true"},
    {"name":"揽收体积（方）","code":"takingPackageVolume","type" : "text","isSum":"true","width":"150"},
    {"name":"揽收重量（公斤）","code":"takingPackageWeight","type" : "text","isSum":"true","width":"150"},
    {"name":"揽收费用","code":"takingOutgoingFeeDouble","type" : "text","isSum":"true"},
    {"name":"客户类型","code":"customerTypeName","type" : "text","width":"120"},
    {"name":"下单客户","code":"customerTenantName","type" : "text","width":"200"},
    {"name":"品牌","code":"brandName","type" : "text","width":"120"},
    {"name":"运单状态","code":"orderOutStateName","type" : "text","width":"120"},
    {"name":"运单类型","code":"orderTypeName","type" : "text","width":"120"},
    {"name":"下单时间","code":"createDate","type" : "text","width":"150"},
    {"name":"实际托运时间","code":"billingDate","type" : "text","width":"150"},
    {"name":"审核时间","code":"auditDate","type" : "text","width":"150"},
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
    {"name":"中转费用","code":"outgoingFeeDouble","type" : "text","isSum":"true"},
    {"name":"中转结算方式","code":"paymentTypeName","type" : "text"},
    {"name":"配送员姓名","code":"deliveryUserName","type" : "text"},
    {"name":"配送员电话","code":"deliveryUserPhone","type" : "text"},
    {"name":"中转备注","code":"remarks","width":"200","type" : "text"}
];
let headImportFee = [ 
    {"name":"所属区域","code":"sourceRegionName","type" : "text","width":"120"},
    {"name":"目的区域","code":"destRegionName","type" : "text","width":"120"},
    // {"name":"计费产品","code":"calculatePriceName","type" : "text","width":"120"},
    {"name":"导入时间","code":"importFeeTime","type" : "text","width":"120"},
    {"name":"导入人","code":"importFeeOpName","type" : "text","width":"120"},
    {"name":"运单号","code":"trackingNum","type" : "text","width":"120"},
    {"name":"子单号","code":"transitTrackingNum","type" : "text","width":"150"},
    {"name":"期待上门时间","code":"prePickupDate","type" : "text","width":"200"},
    {"name":"客户单号","code":"ordNum","type" : "text","width":"150"},
    {"name":"采购单号","code":"purchaseNum","type" : "text","width":"120"},
    {"name":"批次号","code":"batchNumAlias","type" : "text","width":"150"},
    {"name":"是否合单","code":"combinedStsName","type" : "text","width":"120"},
    {"name":"供应商类型","code":"supplierTenantTypeName","type" : "text"},
    {"name":"供应商名称","code":"supplierTenantName","type" : "text","width":"150"},
    {"name":"中转单号","code":"outgoingTrackingNum","type" : "text","width":"150"},
    {"name":"中转类型","code":"transitTypeName","type" : "text","width":"120"},
    {"name":"中转时间","code":"outGoingDate","type" : "text","width":"150"},
    {"name":"中转创建时间","code":"transferCreateDate","type" : "text","width":"150"},
    {"name":"对接状态","code":"transitStateName","type" : "text","width":"100"},
    {"name":"客户类型","code":"customerTypeName","type" : "text","width":"120"},
    {"name":"下单客户","code":"customerTenantName","type" : "text","width":"200"},
    {"name":"品牌","code":"brandName","type" : "text","width":"120"},
    {"name":"运单状态","code":"orderOutStateName","type" : "text","width":"120"},
    {"name":"运单类型","code":"orderTypeName","type" : "text","width":"120"},
    {"name":"下单时间","code":"createDate","type" : "text","width":"150"},
    {"name":"实际托运时间","code":"billingDate","type" : "text","width":"150"},
    {"name":"审核时间","code":"auditDate","type" : "text","width":"150"},
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
    {"name":"中转费用","code":"outgoingFeeDouble","type" : "text","isSum":"true"},
    {"name":"中转结算方式","code":"paymentTypeName","type" : "text"},
    {"name":"配送员姓名","code":"deliveryUserName","type" : "text"},
    {"name":"配送员电话","code":"deliveryUserPhone","type" : "text"},
    {"name":"中转备注","code":"remarks","width":"200","type" : "text"}
];
let headAdd = [ 
    {"name":"所属区域","code":"regionName","type" : "text","width":"120"},
    {"name":"运单号","code":"trackingNum","type" : "text","width":"120"},
    {"name":"客户单号","code":"ordNum","type" : "text","width":"150"},
    {"name":"采购单号","code":"purchaseNum","type" : "text","width":"120"},
    {"name":"期待上门时间","code":"prePickupDate","type" : "text","width":"200"},
    {"name":"承运关系","code":"costCompanyCarrierOneName","type" : "text","width":"150"},
    {"name":"客户优先","code":"costCompanyCustomerOneName","type" : "text","width":"150"},
    {"name":"时效优先","code":"costCompanyTimeOneName","type" : "text","width":"150"},
    {"name":"成本优先","code":"costCompanyOutOneName","type" : "text","width":"150"},
    {"name":"客户类型","code":"customerTypeName","type" : "text","width":"120"},
    {"name":"下单客户","code":"customerTenantName","type" : "text","width":"200"},
    {"name":"品牌","code":"brandName","type" : "text","width":"120"},
    {"name":"运单类型","code":"orderTypeName","type" : "text","width":"120"},
    {"name":"下单时间","code":"createDate","type" : "text","width":"150"},
    {"name":"实际托运时间","code":"billingDate","type" : "text","width":"150"},
    {"name":"审核时间","code":"auditDate","type" : "text","width":"150"},
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
    {"name":"结算方式","code":"paymentTypeName","type" : "text"},
    {"name":"货品名","code":"goodsName","type" : "text","width":"120"},
    {"name":"打包件数","code":"packageNumber","type" : "text","isSum":"true"},
    {"name":"已配载件数","code":"outNumber","type" : "text","isSum":"true"},
    {"name":"未配载件数","code":"checkNumber","type" : "text","isSum":"true","width":"120"},
    {"name":"打包体积（方）","code":"packageVolume","type" : "text","isSum":"true","width":"150"},
    {"name":"打包重量（公斤）","code":"packageWeight","type" : "text","isSum":"true","width":"150"},
    {"name":"客户备注","code":"customerRemarks","width":"200","type" : "text"},
    {"name":"内部备注","code":"remarks","width":"200","type" : "text"}
];

let headAddRight = [ 
    {"name":"所属区域","code":"regionName","type" : "text","width":"120"},
    {"name":"运单号","code":"trackingNum","type" : "text","width":"120"},
    {"name":"打包件数","code":"packageNumber","type" : "text","isSum":"true"},
    {"name":"调出数量","code":"callOutCount","type" : "text","isSum":"true"},
    {"name":"已配载件数","code":"outNumber","type" : "text","isSum":"true"},
    {"name":"配载件数","code":"checkNumber","type" : "input","isSum":"true","width":"120"},
    {"name":"打包体积（方）","code":"packageVolume","type" : "text","isSum":"true","width":"150"},
    {"name":"打包重量（公斤）","code":"packageWeight","type" : "text","isSum":"true","width":"150"},
    {"name":"客户单号","code":"ordNum","type" : "text","width":"150"},
    {"name":"采购单号","code":"purchaseNum","type" : "text","width":"120"},
    {"name":"期待上门时间","code":"prePickupDate","type" : "text","width":"200"},
    {"name":"承运关系","code":"costCompanyCarrierOneName","type" : "text","width":"150"},
    {"name":"客户优先","code":"costCompanyCustomerOneName","type" : "text","width":"150"},
    {"name":"时效优先","code":"costCompanyTimeOneName","type" : "text","width":"150"},
    {"name":"成本优先","code":"costCompanyOutOneName","type" : "text","width":"150"},
    {"name":"客户类型","code":"customerTypeName","type" : "text","width":"120"},
    {"name":"下单客户","code":"customerTenantName","type" : "text","width":"200"},
    {"name":"品牌","code":"brandName","type" : "text","width":"120"},
    {"name":"运单类型","code":"orderTypeName","type" : "text","width":"120"},
    {"name":"下单时间","code":"createDate","type" : "text","width":"150"},
    {"name":"实际托运时间","code":"billingDate","type" : "text","width":"150"},
    {"name":"审核时间","code":"auditDate","type" : "text","width":"150"},
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
    {"name":"结算方式","code":"paymentTypeName","type" : "text"},
    {"name":"货品名","code":"goodsName","type" : "text","width":"120"},
    {"name":"客户备注","code":"customerRemarks","width":"200","type" : "text"},
    {"name":"内部备注","code":"remarks","width":"200","type" : "text"}
];

let headAddList = [ 
    {"name":"所属区域","code":"regionName","type" : "text","width":"120"},
    {"name":"运单号","code":"trackingNum","type" : "text","width":"120"},
    {"name":"客户单号","code":"ordNum","type" : "text","width":"150"},
    {"name":"采购单号","code":"purchaseNum","type" : "text","width":"120"},
    {"name":"期待上门时间","code":"prePickupDate","type" : "text","width":"200"},
    {"name":"打包件数","code":"packageNumber","type" : "text","isSum":"true"},
    {"name":"客户类型","code":"customerTypeName","type" : "text","width":"120"},
    {"name":"下单客户","code":"customerTenantName","type" : "text","width":"200"},
    {"name":"品牌","code":"brandName","type" : "text","width":"120"},
    {"name":"运单类型","code":"orderTypeName","type" : "text","width":"120"},
    {"name":"下单时间","code":"createDate","type" : "text","width":"150"},
    {"name":"实际托运时间","code":"billingDate","type" : "text","width":"150"},
    {"name":"审核时间","code":"auditDate","type" : "text","width":"150"},
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
    {"name":"结算方式","code":"paymentTypeName","type" : "text"},
    {"name":"货品名","code":"goodsName","type" : "text","width":"120"},
    {"name":"客户备注","code":"customerRemarks","width":"200","type" : "text"},
    {"name":"内部备注","code":"remarks","width":"200","type" : "text"}
];

let headTracking = [ 
    {"name":"中转时间","code":"outGoingDate","type" : "text","width":"150"},
    {"name":"中转创建时间","code":"transferCreateDate","type" : "text","width":"150"},
    {"name":"上次跟踪时间","code":"trackingDateLast","type" : "text","width":"150"},
    {"name":"所属区域","code":"sourceRegionName","type" : "text","width":"120"},
    {"name":"目的区域","code":"destRegionName","type" : "text","width":"120"},
    {"name":"跟踪状态","code":"trackingStsName","type" : "text","width":"120"},
    {"name":"在途信息","code":"trackingContent","type" : "text","width":"200"},
    {"name":"供应商类型","code":"supplierTenantTypeName","type" : "text"},
    {"name":"供应商名称","code":"supplierTenantName","type" : "text","width":"150"},
    {"name":"中转单号","code":"outgoingTrackingNum","type" : "text","width":"150"},
    {"name":"中转费用","code":"outgoingFeeDouble","type" : "text","isSum":"true"},
    {"name":"中转结算方式","code":"paymentTypeName","type" : "text"},
    {"name":"运单号","code":"trackingNum","type" : "text","width":"120"},
    {"name":"子单号","code":"transitTrackingNum","type" : "text","width":"150"},
    {"name":"客户单号","code":"ordNum","type" : "text","width":"150"},
    {"name":"采购单号","code":"purchaseNum","type" : "text","width":"120"},
    {"name":"期待上门时间","code":"prePickupDate","type" : "text","width":"200"},
    {"name":"批次号","code":"batchNumAlias","type" : "text","width":"150"},
    {"name":"中转类型","code":"transitTypeName","type" : "text","width":"120"},
    {"name":"下单客户","code":"customerTenantName","type" : "text","width":"200"},
    {"name":"品牌","code":"brandName","type" : "text","width":"120"},
    {"name":"运单状态","code":"orderOutStateName","type" : "text","width":"120"},
    {"name":"运单类型","code":"orderTypeName","type" : "text","width":"120"},
    {"name":"下单时间","code":"createDate","type" : "text","width":"150"},
    {"name":"实际托运时间","code":"billingDate","type" : "text","width":"150"},
    {"name":"审核时间","code":"auditDate","type" : "text","width":"150"},
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
    {"name":"配送员姓名","code":"deliveryUserName","type" : "text"},
    {"name":"配送员电话","code":"deliveryUserPhone","type" : "text"},
    {"name":"客服专员","code":"customBusinessName","type" : "text"},
    {"name":"中转备注","code":"remarks","width":"200","type" : "text"}
   
];
let headOneTranfer = [ 
    {"name":"所属区域","code":"regionName","type" : "text","width":"120"},
    {"name":"产品类型","code":"productTypeName","type" : "text","width":"120"},
    {"name":"运单号","code":"trackingNum","type" : "text","width":"120"},
    {"name":"客户单号","code":"ordNum","type" : "text","width":"150"},
    {"name":"采购单号","code":"purchaseNum","type" : "text","width":"120"},
    {"name":"期待上门时间","code":"prePickupDate","type" : "text","width":"200"},
    {"name":"下单客户","code":"customerTenantName","type" : "text","width":"200"},
    {"name":"品牌","code":"brandName","type" : "text","width":"120"},
    {"name":"客户联系人","code":"customerTenantPrincipal","type" : "text","width":"120"},
    {"name":"客户联系手机","code":"customerTenantPhone","type" : "text","width":"120"},
    {"name":"匹配逻辑","code":"carrierTypeName","type" : "text","width":"150"},
    {"name":"匹配供应商","code":"costCompanyCarrierOneName","type" : "text","width":"150"},
    {"name":"预计中转费用","code":"costFeeCarrierOneDouble","type" : "text","isSum":"true","width":"150"},
    {"name":"运单状态","code":"orderOutStateName","type" : "text","width":"120"},
    {"name":"运单类型","code":"orderTypeName","type" : "text","width":"120"},
    {"name":"运单来源","code":"sourceTypeName","type" : "text","width":"120"},
    {"name":"下单时间","code":"createDate","type" : "text","width":"150"},
    {"name":"实际托运时间","code":"billingDate","type" : "text","width":"150"},
    {"name":"审核时间","code":"auditDate","type" : "text","width":"150"},
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
    {"name":"前端交货方式","code":"beginDeliveryTypeName","type" : "text"},
    {"name":"末端交货方式","code":"endDeliveryTypeName","type" : "text"},
    {"name":"货品名","code":"goodsName","type" : "text","width":"120"},
    {"name":"打包件数","code":"packageNumber","type" : "text","isSum":"true"},
    {"name":"打包体积（方）","code":"packageVolume","type" : "text","isSum":"true","width":"150"},
    {"name":"打包重量（公斤）","code":"packageWeight","type" : "text","isSum":"true","width":"150"},
    {"name":"调出数量","code":"callOutCount","type" : "text","isSum":"true"},
    {"name":"结算方式","code":"paymentTypeName","type" : "text"},
    {"name":"客服专员","code":"customBusinessName","type" : "text"},
    {"name":"销售专员","code":"salesmanBusinessName","type" : "text"},
    {"name":"客户备注","code":"customerRemarks","width":"200","type" : "text"},
    {"name":"内部备注","code":"remarks","width":"200","type" : "text"}
];

// 匹配面板-待配载
let headAddWait = [ 
    {"name":"所属区域","code":"regionName","type" : "text","width":"120"},
    {"name":"运单号","code":"trackingNum","type" : "text","width":"120"},
    {"name":"客户单号","code":"ordNum","type" : "text","width":"150"},
    {"name":"采购单号","code":"purchaseNum","type" : "text","width":"120"},
    {"name":"期待上门时间","code":"prePickupDate","type" : "text","width":"200"},
    {"name":"客户类型","code":"customerTypeName","type" : "text","width":"120"},
    {"name":"下单客户","code":"customerTenantName","type" : "text","width":"200"},
    {"name":"品牌","code":"brandName","type" : "text","width":"120"},
    {"name":"运单类型","code":"orderTypeName","type" : "text","width":"120"},
    {"name":"下单时间","code":"createDate","type" : "text","width":"150"},
    {"name":"实际托运时间","code":"billingDate","type" : "text","width":"150"},
    {"name":"审核时间","code":"auditDate","type" : "text","width":"150"},
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
    {"name":"结算方式","code":"paymentTypeName","type" : "text"},
    {"name":"货品名","code":"goodsName","type" : "text","width":"120"},
    {"name":"打包件数","code":"packageNumber","type" : "text","isSum":"true"},
    {"name":"已配载件数","code":"outNumber","type" : "text","isSum":"true"},
    {"name":"未配载件数","code":"checkNumber","type" : "text","isSum":"true","width":"120"},
    {"name":"打包体积（方）","code":"packageVolume","type" : "text","isSum":"true","width":"150"},
    {"name":"打包重量（公斤）","code":"packageWeight","type" : "text","isSum":"true","width":"150"},
    {"name":"客户备注","code":"customerRemarks","width":"200","type" : "text"},
    {"name":"内部备注","code":"remarks","width":"200","type" : "text"}
];
let headAlreadyTransfer = [ 
    {"name":"所属区域","code":"sourceRegionName","type" : "text","width":"120"},
    {"name":"目的区域","code":"destRegionName","type" : "text","width":"120"},
    {"name":"运单号","code":"trackingNum","type" : "text","width":"120"},
    {"name":"子单号","code":"transitTrackingNum","type" : "text","width":"150"},
    {"name":"客户单号","code":"ordNum","type" : "text","width":"150"},
    {"name":"采购单号","code":"purchaseNum","type" : "text","width":"120"},
    {"name":"期待上门时间","code":"prePickupDate","type" : "text","width":"200"},
    {"name":"批次号","code":"batchNumAlias","type" : "text","width":"150"},
    {"name":"是否合单","code":"combinedStsName","type" : "text","width":"120"},
    {"name":"供应商名称","code":"supplierTenantName","type" : "text","width":"150"},
    {"name":"中转单号","code":"outgoingTrackingNum","type" : "text","width":"150"},
    {"name":"中转类型","code":"transitTypeName","type" : "text","width":"120"},
    {"name":"中转时间","code":"outGoingDate","type" : "text","width":"150"},
    {"name":"中转创建时间","code":"transferCreateDate","type" : "text","width":"150"},
    {"name":"对接状态","code":"transitStateName","type" : "text","width":"100"},
    {"name":"物流状态","code":"systemKdStatusName","type" : "text","width":"100"},
    {"name":"对接系统商家单号","code":"systemBusiNum","type" : "text","width":"150"},
    {"name":"三方系统对接备注","code":"systemRemark","type" : "text","width":"150"},
    {"name":"揽收业务人员","code":"takingUserName","type" : "text","width":"120"},
    {"name":"揽收业务电话","code":"takingUserPhone","type" : "text","width":"120"},
    {"name":"揽收件数","code":"takingPackageNumber","type" : "text","isSum":"true"},
    {"name":"揽收体积（方）","code":"takingPackageVolume","type" : "text","isSum":"true","width":"150"},
    {"name":"揽收重量（公斤）","code":"takingPackageWeight","type" : "text","isSum":"true","width":"150"},
    {"name":"揽收费用","code":"takingOutgoingFeeDouble","type" : "text","isSum":"true"},
    {"name":"客户类型","code":"customerTypeName","type" : "text","width":"120"},
    {"name":"下单客户","code":"customerTenantName","type" : "text","width":"200"},
    {"name":"品牌","code":"brandName","type" : "text","width":"120"},
    {"name":"运单状态","code":"orderOutStateName","type" : "text","width":"120"},
    {"name":"运单类型","code":"orderTypeName","type" : "text","width":"120"},
    {"name":"下单时间","code":"createDate","type" : "text","width":"150"},
    {"name":"实际托运时间","code":"billingDate","type" : "text","width":"150"},
    {"name":"审核时间","code":"auditDate","type" : "text","width":"150"},
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
    {"name":"供应商类型","code":"supplierTenantTypeName","type" : "text"},
    {"name":"中转费用","code":"outgoingFeeDouble","type" : "text","isSum":"true"},
    {"name":"中转结算方式","code":"paymentTypeName","type" : "text"},
    {"name":"配送员姓名","code":"deliveryUserName","type" : "text"},
    {"name":"配送员电话","code":"deliveryUserPhone","type" : "text"},
    {"name":"中转备注","code":"remarks","width":"200","type" : "text"}
   
];
let tabs = [
    {name: "专线物流", active: true,selectType: 1},
    {name: "快递快运", selectType: 2 }
];
let tabsAdd = [
    {name: "手动跟踪", active: true,selectType: 1},
    {name: "批量跟踪", selectType: 2 }
];
let tabsOrderTranfer = [
    {name: "待配载", active: true,selectType: 1,url:"api/ordTransitOutgoingBO.ajax?cmd=doQueryNeedTransferOne",ordersTransferTable:"ordersTransferTable_1",head:headAddWait,num:"*"},
    {name: "已配载", selectType: 2,url:"api/ordTransitOutgoingBO.ajax?cmd=doQuery",ordersTransferTable:"ordersTransferTable_2",head:headAlreadyTransfer,num:"*" }
];

export{
    head,
    headAdd,
    tabs,
    tabsAdd,
    headTracking,
    headAddRight,
    headAddList,
    headOneTranfer,
    tabsOrderTranfer,
    headAddWait,
    headImportFee
}
