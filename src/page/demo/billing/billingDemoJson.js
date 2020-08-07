const head = [
    {code:"goodsName",type:"goodsName",name:"货品名",sum:"int",istatol:true},
    {code:"packingTypeName",type:"packTypeData",name:"包装",sum:"int",istatol:true},
    {code:"boxNum",type:"input",name:"集装箱号",sum:"int",istatol:true},
    {code:"goodsCount",type:"number",name:"件数",sum:"int",istatol:true},
    {code:"standard",type:"input",name:"品种规格",sum:"int",istatol:true},
    {code:"weightPrice",type:"weight",name:"重量（公斤）",istatol:true},
    {code:"volumePrice",type:"volume",name:"体积（方）",istatol:true},
    {code:"billingWeight",type:"fourDecimal",name:"计费重量(kg)",sum:"fix4",istatol:true},
    {code:"billingVolume",type:"fourDecimal",name:"计费体积(方)",sum:"fix4",istatol:true},
    {code:"batch",type:"input",name:"批号",sum:"int",istatol:true},
    {code:"ordNum",type:"input",name:"发货单号",sum:"int",istatol:true},
    {code:"scattPackageCount",type:"input",name:"零包数量",sum:"int",istatol:true},
    {code:"wholePackageCount",type:"input",name:"整包数量",sum:"int",istatol:true},
    {code:"numberPrice",type:"number",name:"件数单价",istatol:true},
    {code:"freight",type:"buttonFreight",name:"运费",istatol:true},
    {code:"deliveryCosts",type:"number",name:"送货费",istatol:false},
    {code:"collectingMoney",type:"number",name:"代收货款",istatol:false},
    {code:"procedureFee",type:"number",name:"代收手续费",istatol:false},
    {code:"goodsPrice",type:"number",name:"申明价值",istatol:false},
    {code:"offer",type:"number",name:"保险费",istatol:false},
    {code:"handingCosts",type:"number",name:"装卸费",istatol:false},
    {code:"packingCosts",type:"number",name:"包装费",istatol:false},
    {code:"pickingCosts",type:"number",name:"提货费",istatol:false},
    {code:"upstairsFee",type:"number",name:"上楼费",istatol:false},
    {code:"actualPickingCosts",type:"number",name:"实际提货费",istatol:false},
    {code:"truckFee",type:"number",name:"叉车费",istatol:false},
    {code:"clearanceFee",type:"number",name:"报关费",istatol:false},
    {code:"otherFee",type:"number",name:"其他",istatol:false},
    {code:"rate",type:"fourDecimal",name:"税率",sum:"int",istatol:false},
    {code:"tax",type:"number",name:"税金",istatol:false},
    {code:"warehousingFee",type:"number",name:"入仓费",istatol:false},
    {code:"serviceFee",type:"number",name:"服务费",istatol:false},
    {code:"stampFee",type:"number",name:"印花税",istatol:false},
    {code:"billingType",type:"select",name:"计费类型",sum:"int",istatol:false},
    {code:"outNo",type:"input",name:"出库单号",istatol:false},
]

const headFee = [ {
    code : "freight",
    type : "buttonFreight",
    name : "运费",
    istatol : true
}, {
    code : "deliveryCosts",
    type : "number",
    name : "送货费",
    istatol : false
}, {
    code : "pickingCosts",
    type : "number",
    name : "提货费",
    istatol : false
}, {
    code : "handingCosts",
    type : "number",
    name : "装卸费",
    istatol : false
}, {
    code : "transitCosts",
    type : "number",
    name : "中转费",
    istatol : false
}, {
    code : "collectingMoney",
    type : "number",
    name : "代收货款",
    istatol : false
}, {
    code : "procedureFee",
    type : "number",
    name : "代收手续费",
    istatol : false
}, {
    code : "goodsPrice",
    type : "number",
    name : "申明价值",
    istatol : false,
    readOnly : false
}, {
    code : "offer",
    type : "number",
    name : "保价费",
    istatol : false
}, {
    code : "otherFee",
    type : "number",
    name : "其他费用",
    istatol : false,
    isedit: true,
    isHide : true
}, {
    code : "withSecurityFee",
    type : "number",
    name : "配安费",
    istatol : false,
    isHide : true
}, {
    code : "upstairsFee",
    type : "number",
    name : "上楼费",
    istatol : false,
    isHide : true
}, {
    code : "truckFee",
    type : "number",
    name : "叉车费",
    istatol : false,
    isHide : true
}, {
    code : "clearanceFee",
    type : "number",
    name : "报关费",
    istatol : false,
    isHide : true
}, {
    code : "scanFee",
    type : "number",
    name : "扫描费",
    istatol : false,
    isHide : true
}, {
    code : "stampFee",
    type : "number",
    name : "印花税",
    istatol : false,
    isHide : true
}, 
{
    code : "brokerage",
    type : "number",
    name : "佣金",
    istatol : false,
    isHide : false
}, 
{
    code : "serviceFee",
    type : "number",
    name : "服务费",
    istatol : false,
    isHide : true
} ];

export {
    head,
    headFee
}