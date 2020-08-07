// 通用AB
let head = [ 
    {"name":"所属区域","code":"regionName","type" : "text","width":"120"},
    {"name":"产品类型","code":"productTypeName","type" : "text","width":"120"},
    {"name":"运单号","code":"trackingNum","type" : "text","width":"120"},
    {"name":"客户单号","code":"ordNum","type" : "text","width":"150"},
    {"name":"采购单号","code":"purchaseNum","type" : "text","width":"120"},
    {"name":"下单客户","code":"customerTenantName","type" : "text","width":"200"},
    {"name":"期待上门时间","code":"prePickupDate","type" : "text","width":"200"},
    {"name":"品牌","code":"brandName","type" : "text","width":"120"},
    {"name":"承运关系","code":"costCompanyCarrierOneName","type" : "text","width":"150"},
    {"name":"承运关系价格","code":"costFeeCarrierOneDouble","type" : "text","width":"150"},
    {"name":"客户优先","code":"costCompanyCustomerOneName","type" : "text","width":"150"},
    {"name":"客户优先价格","code":"costFeeCustomerOneDouble","type" : "text","width":"150"},
    {"name":"时效优先","code":"costCompanyTimeOneName","type" : "text","width":"150"},
    {"name":"时效优先价格","code":"costFeeTimeOneDouble","type" : "text","width":"150"},
    {"name":"成本优先","code":"costCompanyOutOneName","type" : "text","width":"150"},
    {"name":"成本优先价格","code":"costFeeOutOneDouble","type" : "text","width":"150"},
    {"name":"客户联系人","code":"customerTenantPrincipal","type" : "text","width":"120"},
    {"name":"客户联系手机","code":"customerTenantPhone","type" : "text","width":"120"},
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

let headCostType = [ 
    {"name":"所属区域","code":"regionName","type" : "text","width":"120"},
    {"name":"产品类型","code":"productTypeName","type" : "text","width":"120"},
    {"name":"运单号","code":"trackingNum","type" : "text","width":"120"},
    {"name":"客户单号","code":"ordNum","type" : "text","width":"150"},
    {"name":"采购单号","code":"purchaseNum","type" : "text","width":"120"},
    {"name":"下单客户","code":"customerTenantName","type" : "text","width":"150"},
    {"name":"期待上门时间","code":"prePickupDate","type" : "text","width":"200"},
    {"name":"品牌","code":"brandName","type" : "text","width":"120"},
    {"name":"推荐类型","code":"costTypeName","type" : "text","width":"100"},
    {"name":"优选一供应商","code":"costCompanyOneName","type" : "text","width":"150"},
    {"name":"优选一价格","code":"costFeeOneDouble","type" : "text","width":"100"},
    {"name":"优选一时效","code":"effectTimeOne","type" : "text","width":"100"},
    {"name":"优选二供应商","code":"costCompanyTwoName","type" : "text","width":"150"},
    {"name":"优选二价格","code":"costFeeTwoDouble","type" : "text","width":"100"},
    {"name":"优选二时效","code":"effectTimeTwo","type" : "text","width":"100"},
    {"name":"优选三供应商","code":"costCompanyThreeName","type" : "text","width":"150"},
    {"name":"优选三价格","code":"costFeeThreeDouble","type" : "text","width":"100"},
    {"name":"优选三时效","code":"effectTimeThree","type" : "text","width":"100"},
    {"name":"客户联系人","code":"customerTenantPrincipal","type" : "text","width":"120"},
    {"name":"客户联系手机","code":"customerTenantPhone","type" : "text","width":"120"},
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

// 切换 TAB 
let  tabs = [
    {code:"waitDoing",name:"待配载", desc:"未进行任何配载的所有运单", active:true},
    {code:"customerOne",queryCostType:1,name:"客户优先",head:headCostType,ordersTable:"customerOneTable",desc:"根据客户特定要求，指定供应商优先原则"},
    {code:"timeOne",queryCostType:2,name:"时效优先",head:headCostType,ordersTable:"timeOneTable",desc:"以时效作为最优先条件进行中转配载"},
    {code:"costOne",queryCostType:3,name:"成本优先",head:headCostType,ordersTable:"costOneTable",desc:"以计算成本最低为原则"},
    {code:"CombinedStsYes",name:"合并中转",queryCombinedSts:2,desc:"发货人/收货人以及地址一样的运单进行合单发货处理"}
];
export{
    head,
    tabs
}