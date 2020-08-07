export default {
    name: 'registerInvoice',
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
            restaurants : [                
                { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
                { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
                { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
                { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
                { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
                { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
                { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
            ],
            state:"",
        }
    },
    mounted() {
      
    },
    methods: {        
        querySearch(queryString, cb) {
            let restaurants = this.restaurants;
            let results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
            cb(results);
        },
        createStateFilter(queryString) {
            return (state) => {
                return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
    },
}