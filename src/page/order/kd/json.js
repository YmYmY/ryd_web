// 通用AB
let head = [ 
    {"name":"客户单号","code":"upstreaNum","type" : "text","width":"150"},
    {"name":"供应商","code":"supplierTenantName","type" : "text","width":"150"},
    {"name":"快递单号","code":"outgoingTrackingNum","type" : "text","width":"150"},
    {"name":"寄件人","code":"consignor","width":"300"},
    {"name":"寄件地址","code":"sourceAddr","width":"300"},
    {"name":"收件人","code":"consignee","width":"300"},
    {"name":"收件地址","code":"destAddr","width":"300"},  
    {"name":"派送站点","code":"dispatchSiteName","width":"200"},    
    {"name":"物流状态","code":"kdStatusName","type" : "text","width":"120"},
    {"name":"商家业务单号","code":"busiNum","type" : "text","width":"150"},
    {"name":"运单号/批次号","code":"orderNo","type" : "text","width":"150"},
    {"name":"业务类型","code":"businessTypeName","type" : "text","width":"120"},
    {"name":"对接状态","code":"statusName","type" : "text","width":"120"},
    {"name":"打印数据","code":"printDataFlagName","type" : "text","width":"120"},
    {"name":"打印状态","code":"printStatusName","type" : "text","width":"100"},
    {"name":"所属区域","code":"regionName","type" : "text","width":"150"},
    {"name":"创建时间","code":"createDate","type" : "text","width":"150"},
    {"name":"下次执行时间","code":"nextExeDate","type" : "text","width":"150"},
    {"name":"操作时间","code":"opDate","type" : "text","width":"150"},
    {"name":"备注","code":"remark","width":"580"}
];
// 通用AB
let headQuery = [ 
    {"name":"供应商","code":"supplierTenantName","type" : "text","width":"150"},
    {"name":"快递单号","code":"outgoingTrackingNum","type" : "text","width":"150"},
    {"name":"物流状态","code":"kdStatusName","type" : "text","width":"120"},
    {"name":"运单号/批次号","code":"orderNo","type" : "text","width":"150"},
    {"name":"商家业务单号","code":"busiNum","type" : "text","width":"150"},
    {"name":"业务类型","code":"businessTypeName","type" : "text","width":"120"},
    {"name":"对接状态","code":"statusName","type" : "text","width":"120"},
    {"name":"所属区域","code":"regionName","type" : "text","width":"150"},
    {"name":"创建时间","code":"createDate","type" : "text","width":"150"},
    {"name":"操作时间","code":"opDate","type" : "text","width":"150"},
    {"name":"下次执行时间","code":"nextExeDate","type" : "text","width":"150"},
    {"name":"备注","code":"remark","width":"580"}
];
let tabs = [
    {name: "下单管理", active: true,selectType: 1,businessTypes:"1,2",queryType:1,tableName:"kdManagePageManagerTable",head:head},
    {name: "查询管理", selectType: 2,businessTypes:"3,4,5,6,7,66,88,91,92",queryType:2,tableName:"kdManagePageManagerQueryTable",head:headQuery }
];
export{
    head,
    tabs
}