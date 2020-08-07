import scrollTable from "@/components/scrollTable/scrollTable.vue"

export default {
    name: 'submitInvoice',
    data() {
        return {            
            //table组件数据
            head :[
                {"name":"所在区域","code":"cityName","width":"150","type" : "text"},
                {"name":"所属客户","code":"tenantFullName","width":"150","type" : "text"},
                {"name":"门店编号","code":"warehouseCode","width":"150","type" : "text"},
                {"name":"门店级别","code":"warehouseTypeName","width":"100","type" : "text"},
                {"name":"门店全称","code":"warehouseFullName","width":"100","type" : "text"},
                {"name":"门店简称","code":"warehouseName","width":"100","type" : "text"},
                {"name":"店铺下单额度","code":"orderAmount","width":"100","type" : "text"},
                {"name":"剩余额度","code":"unusedAmount","width":"100","type" : "text"},
                {"name":"已用额度","code":"usedAmount","width":"100","type" : "text"},
                {"name":"销售代表","code":"salesName","width":"100","type" : "text"},
                {"name":"店长姓名","code":"warehousePeople","width":"120","type" : "text"},
                {"name":"联系手机","code":"warehousePhone","width":"120","type" : "text"},
                {"name":"门店座机","code":"warehouseTelephone","width":"120","type" : "text"},
                {"name":"登录账号","code":"userLogin","width":"120","type" : "text"},
                {"name":"添加时间","code":"createDate","width":"120","type" : "text"},
                {"name":"门店地址","code":"warehouseAddress","width":"120","type" : "text"},
                {"name":"经营品牌","code":"brandName","width":"120","type" : "text"},
            ],
        }
    },
    mounted() {
      this.doQuery();
    },
    components: {
        scrollTable,
    },
    methods: {
        async doQuery() {
            let url = "api/cmWarehouseBO.ajax?cmd=doQueryCmWarehouse";
            let data1 = await this.$refs.table1.load(url,{type:1,queryType:5});
            let data2 = await this.$refs.table2.load(url,{type:1,queryType:5});
            let data3 = await this.$refs.table3.load(url,{type:1,queryType:5});
            console.log(data1);
        },
},
}