// 通用AB
let head = [ 
    {"name":"记账区域","code":"regionName","type" : "text","width":"120"},
    {"name":"凭证号","code":"vouchNo","type" : "text","width":"120"},
    {"name":"操作日期","code":"createDate","type" : "text","width":"150"},
    {"name":"来源","code":"sourceTypeName","type" : "text","width":"120"},
    {"name":"一级科目","code":"itemCode1Name","type" : "text","width":"120"},
    {"name":"二级科目","code":"itemCode2Name","type" : "text","width":"120"},
    {"name":"三级科目","code":"itemCode3Name","type" : "text","width":"120"},
    {"name":"四级科目","code":"itemCode4Name","type" : "text","width":"120"},
    {"name":"记账方向","code":"derectionName","type" : "text","width":"120"},
    {"name":"收入","code":"inSumDouble","type" : "text","width":"120"},
    {"name":"支出","code":"outSummDouble","type" : "text","width":"120"},
    {"name":"结余","code":"otherFeeDouble","type" : "text","width":"120"},
    {"name":"去向","code":"desItemName","type" : "text","width":"120"},
    {"name":"单据数","code":"numbers","type" : "text","width":"120"},
    {"name":"入账日期","code":"vouchDate","type" : "text","width":"150"},
    {"name":"审核状态","code":"auditStsName","type" : "text","width":"120"},
    {"name":"摘要","code":"subject","type" : "text","width":"120"},
    {"name":"收据号码","code":"recepitNo","type" : "text","width":"120"},
    {"name":"手工凭证","code":"manualNo","type" : "text","width":"120"},
    {"name":"发票号码","code":"invoiceNo","type" : "text","width":"120"},
    {"name":"支票号码","code":"checkNo","type" : "text","width":"120"},
    {"name":"报销部门","code":"expenseOrgName","type" : "text","width":"120"},
    {"name":"报销人","code":"expenseUser","type" : "text","width":"120"},
    {"name":"制单人","code":"recoderName","type" : "text","width":"120"},
    {"name":"审核人","code":"auditUser","type" : "text","width":"120"},
    {"name":"审核日期","code":"auditDate","type" : "text","width":"150"}
];

let headDetail = [ 
    {"name":"记账区域","code":"regionName","type" : "text","width":"120"},
    {"name":"单号","code":"orderNum","type" : "text","width":"120"},
    {"name":"凭证号","code":"vouchNo","type" : "text","width":"120"},
    {"name":"操作日期","code":"createDate","type" : "text","width":"150"},
    {"name":"来源","code":"sourceTypeName","type" : "text","width":"120"},
    {"name":"一级科目","code":"itemCode1Name","type" : "text","width":"120"},
    {"name":"二级科目","code":"itemCode2Name","type" : "text","width":"120"},
    {"name":"三级科目","code":"itemCode3Name","type" : "text","width":"120"},
    {"name":"四级科目","code":"itemCode4Name","type" : "text","width":"120"},
    {"name":"记账方向","code":"derectionName","type" : "text","width":"120"},
    {"name":"收入","code":"inSumDouble","type" : "text","width":"120"},
    {"name":"支出","code":"outSummDouble","type" : "text","width":"120"},
    {"name":"结余","code":"otherFeeDouble","type" : "text","width":"120"},
    {"name":"去向","code":"desItemName","type" : "text","width":"120"},
    {"name":"单据数","code":"numbers","type" : "text","width":"120"},
    {"name":"入账日期","code":"vouchDate","type" : "text","width":"150"},
    {"name":"审核状态","code":"auditStsName","type" : "text","width":"120"},
    {"name":"摘要","code":"subject","type" : "text","width":"120"},
    {"name":"收据号码","code":"recepitNo","type" : "text","width":"120"},
    {"name":"手工凭证","code":"manualNo","type" : "text","width":"120"},
    {"name":"发票号码","code":"invoiceNo","type" : "text","width":"120"},
    {"name":"支票号码","code":"checkNo","type" : "text","width":"120"},
    {"name":"报销部门","code":"expenseOrgName","type" : "text","width":"120"},
    {"name":"报销人","code":"expenseUser","type" : "text","width":"120"},
    {"name":"制单人","code":"recoderName","type" : "text","width":"120"},
    {"name":"审核人","code":"auditUser","type" : "text","width":"120"},
    {"name":"审核日期","code":"auditDate","type" : "text","width":"150"}
];
let tabs = [
    {name: "按单号", active: true,"router":"vouchDetailManager"},
    {name: "按凭证","router":"vouchManager"}
];
export{
    head,
    headDetail,
    tabs

}
