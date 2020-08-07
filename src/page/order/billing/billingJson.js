const head = [
    {code:"goodsName",type:"goodsName",name:"货品名",istatol:false,requiredFiled:true,maxlength: "50"},
    {code:"packingType",type:"packTypeData",name:"包装",istatol:false,requiredFiled:true,maxlength: "50"},
    {code:"packageNumber",type:"int",name:"打包件数",istatol:true,requiredFiled:true,maxlength: "5"},
    {code:"packageWeight",type:"weight",name:"打包重量(kg)",istatol:true,maxlength: "8"},
    {code:"packageVolume",type:"volume",name:"打包体积",istatol:true,maxlength: "8"},
    {code:"goodsCount",type:"int",name:"内物件数",istatol:true,maxlength: "8"},
    {code:"freightDouble",type:"number",name:"运费",istatol:true,maxlength: "8"},
    // {code:"deliveryCostsDouble",type:"number",name:"送货费",istatol:true,maxlength: "8"},
    // {code:"collectingMoneyDouble",type:"number",name:"代收货款",istatol:true,maxlength: "8"},
    // {code:"procedureFeeDouble",type:"number",name:"代收手续费",istatol:true,maxlength: "8"},
    {code:"goodsPriceDouble",type:"number",name:"申明价值",istatol:true,maxlength: "8"},
    // {code:"insureFeeDouble",type:"number",name:"保险费",istatol:true,maxlength: "8"},
    // {code:"handingCostDouble",type:"number",name:"装卸费",istatol:true,maxlength: "8"},
    // {code:"packingCostsDouble",type:"number",name:"包装费",istatol:true,maxlength: "8"},
    // {code:"pickingCostsDouble",type:"number",name:"提货费",istatol:true,maxlength: "8"},
    // {code:"otherFeeDouble",type:"number",name:"其他费",istatol:true,maxlength: "8"},
    {code:"goodsBrand",type:"input",name:"品种",istatol:false,maxlength: "50"},
    {code:"goodsStandard",type:"input",name:"规格",istatol:false,maxlength: "50"},
];

const headFee = [ 
    {code:"freightDouble",type:"buttonFreight",name:"运费",istatol:true},
    {code:"deliveryCostsDouble",type:"number",name:"送货费",istatol:true},
    {code:"collectingMoneyDouble",type:"number",name:"代收货款",istatol:true},
    {code:"procedureFeeDouble",type:"number",name:"代收手续费",istatol:true},
    {code:"goodsPriceDouble",type:"number",name:"申明价值",istatol:true},
    {code:"insureFeeDouble",type:"number",name:"保险费",istatol:true},
    {code:"handingCostsDouble",type:"number",name:"装卸费",istatol:true},
    {code:"packingCostsDouble",type:"number",name:"包装费",istatol:true},
    {code:"pickingCostsDouble",type:"number",name:"提货费",istatol:true},
    {code:"upstairFeeDouble",type:"number",name:"上楼费",istatol:true},
    {code:"facelistFeeDouble",type:"number",name:"面单费",istatol:true},
    {code:"otherFeeDouble",type:"number",name:"其他费",istatol:true,editmodel:"otherFeeName",edit:true},
   ];

export {
    head,
    headFee
}