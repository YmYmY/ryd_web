import $echarts from 'echarts'
import 'echarts/map/js/china'
export default {
    name: 'addClient',
    data() {
        return {
            statisticsDate:[],
            matterDate:[],
            statisticsDateStart:"",
            statisticsDateEnd:"",
            matterDateStart:"",
            matterDateEnd:"",
            statistics:[],
            matter:[],
            cityList:[],
            turnoverStyle:{},
            turnoverCityStyle:{},
            orderTypeStyle:{},
            orderTypeCount:{},
            allList:[],
            directSales:[],
            joinList:[],
            dateList:[],
            supplierList:[],
            customerList:[],
            supplierPage:1,     //供应商排行榜列表分页页码
            supplierhasNext:true,  //供应商排行榜列表是否有下一页
            customerPage:1,     //客户运费排行榜列表分页页码
            customerhasNext:true,  //客户运费排行榜列表是否有下一页
        }
    },
    mounted() {
        this.initHtml();
        this.doQuerySysStaticData();
        let _this = this;
        this.$nextTick(()=>{            
            _this.initWidth();  //自适应初始化各图表大小
            _this.$nextTick(()=>{  
                _this.turnover();
                _this.turnoverCity();
                _this.orderTypeChart();
            })
        })
    },
    methods: {
        initHtml:function(){
            var bnow = new Date();
            bnow.setDate(bnow.getDate()-7);
            this.statisticsDate.push((this.common.formatTime(bnow,"yyyy-MM-dd")));
            this.statisticsDate.push((this.common.formatTime(new Date(),"yyyy-MM-dd")));
            this.matterDate.push((this.common.formatTime(bnow,"yyyy-MM-dd")));
            this.matterDate.push((this.common.formatTime(new Date(),"yyyy-MM-dd")));
        },
        //自适应初始化各图表大小
        initWidth(){
            if(!this.$refs.orderTypeBox) return;
            let turnoverW = this.$refs.orderTypeBox.offsetWidth - 40;
            this.turnoverStyle = {width:turnoverW+'px',height:'360px'};     //营业额图表大小
            this.turnoverCityStyle = {width:(turnoverW-200)+'px',height:'390px'}; //营业额地区占比图表大小
            this.orderTypeStyle = {width:turnoverW+'px',height:'390px'};    //订单类型占比图表大小
            let _this = this;
            // this.$nextTick(()=>{
            //     //客户运费排行榜高度同步订单类型占比高度
            //     _this.$refs.RankingBox.style.height = _this.$refs.orderTypeBox.offsetHeight+'px';
            // })
            this.$forceUpdate();
        },
        //静态数据查询
        doQuerySysStaticData: function () {
            let that = this;
            if(that.common.isBlank(that.matterDate)){
                that.$message.error('请选择代办事项时间！');
                return;
            }
            if(that.common.isBlank(that.statisticsDate)){
                that.$message.error('请选择数据统计时间！');
                return;
            }
            if(that.common.isBlank(that.matterDate[0])){
                that.$message.error('请选择代办事项开始时间！');
                return;
            }else{
                that.matterDateStart = that.matterDate[0];
            }
            if(that.common.isBlank(that.matterDate[1])){
                that.$message.error('请选择代办事项结束时间！');
                return;
            }else{
                that.matterDateEnd = that.matterDate[1];
            }
            if(that.common.isBlank(that.statisticsDate[0])){
                that.$message.error('请选择数据统计开始时间！');
                return;
            }else{
                that.statisticsDateStart = that.statisticsDate[0];
            }
            if(that.common.isBlank(that.statisticsDate[1])){
                that.$message.error('请选择数据统计结束时间！');
                return;
            }else{
                that.statisticsDateEnd = that.statisticsDate[1];
            }
            // that.initSupplierList(true);
            // that.initCustomerList(true);
            that.common.postUrl("api/cmAbnormalBO.ajax?cmd=doQueryMain", {"createDateStart":that.statisticsDateStart,"createDateEnd":that.statisticsDateEnd}, function (data) {
                that.statistics = data;
            })
            that.common.postUrl("api/cmAbnormalBO.ajax?cmd=queryIndexOrderTypeSum", {"createDateStart":that.statisticsDateStart,"createDateEnd":that.statisticsDateEnd}, function (data) {
                that.orderTypeCount = data.items;
                that.orderTypeChart();
            })
            that.common.postUrl("api/cmAbnormalBO.ajax?cmd=queryIndexTimeFeeSum", {"createDateStart":that.statisticsDateStart,"createDateEnd":that.statisticsDateEnd}, function (data) {
                that.allList = data.allList;
                that.joinList = data.joinList;
                that.directSales = data.directSales;
                that.dateList = data.dateList;
                that.turnover();
            })
            that.common.postUrl("api/cmAbnormalBO.ajax?cmd=queryIndexCityFeeSum", {"createDateStart":that.statisticsDateStart,"createDateEnd":that.statisticsDateEnd}, function (data) {
                that.cityList= data.items;
                that.turnoverCity();
            })
            that.common.postUrl("api/cmAbnormalBO.ajax?cmd=doQueryMatterMain", {"createDateStart":that.matterDateStart,"createDateEnd":that.matterDateEnd}, function (data) {
                that.matter = data;
            })
        },
        async initSupplierList(clear){
            if(!this.supplierhasNext && !clear) return;
            if(clear){
                this.supplierList = [];
                this.supplierPage = 1;
            }
            let data = await this.common.postUrl("api/cmAbnormalBO.ajax?cmd=queryIndexSupplierSum", {"createDateStart":this.statisticsDateStart,"createDateEnd":this.statisticsDateEnd,"page":this.supplierPage,"rows":10});
            this.supplierList = [...this.supplierList,...data.items];
            this.supplierHaveNex = data.hasNext;
        },
        async initCustomerList(clear){
            if(!this.customerhasNext && !clear) return;
            if(clear){
                this.customerList = [];
                this.customerPage = 1;
            }
            let data = await this.common.postUrl("api/cmAbnormalBO.ajax?cmd=queryIndexCustomerSum", {"createDateStart":this.statisticsDateStart,"createDateEnd":this.statisticsDateEnd,"page":this.customerPage,"rows":10});
            this.customerList = [...this.customerList,...data.items];
            this.customerhasNext = data.hasNext;
        },
        orderTypeChart:function(){
            if(document.getElementById('turnoverCityChart')==null) return;
            let orderTypeChart = $echarts.init(document.getElementById('orderTypeChart'))
            // 绘制图表
            orderTypeChart.setOption({
                // title: { text: '订单类型占比' },
                tooltip: { trigger: 'item'},
                legend: {
                    bottom: 10,
                    left: 'center',               
                    data: ['仓库始发', '任意调拨', '逆向回货', '工厂直发', '云仓电商']
                },
                series: [
                    {
                        name: '订单类型占比',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: this.orderTypeCount,
                        top:-80,
                        bottom:20,
                        left:-100,
                        right:-100,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            });
        },
        turnover:function () {
            return;
            let turnoverChart = $echarts.init(document.getElementById('turnoverChart'))
            // 绘制图表
            turnoverChart.setOption({
                // title: { text: '营业额' },
                tooltip: {'trigger':'axis'},
                legend: {
                    data: []
                },
                xAxis: {
                    data: this.dateList,
                },
                yAxis: { type: 'value'},
                series: [
                    {
                        name: '合计总额',
                        type: 'line',
                        stack: '总量',
                        data: this.allList
                    },
                    {
                        name: '直营',
                        type: 'line',
                        stack: '总量',
                        data: this.directSales
                    },
                    {
                        name: '加盟商',
                        type: 'line',
                        stack: '总量',
                        data: this.joinList
                    },
                ]
            });
        },
        turnoverCity:function () {
            if(document.getElementById('turnoverCityChart')==null) return;
            let turnoverCityChart = $echarts.init(document.getElementById('turnoverCityChart'))
            // 绘制图表
            turnoverCityChart.setOption({
                // title: { text: '营业额地区占比'},
                tooltip: {'trigger':'item'},
                //左侧小导航图标
                visualMap: {
                    show : false,
                    x: 'left',
                    y: 'center',
                    splitList: [
                        {start: 500, end:600},{start: 400, end: 500},
                        {start: 300, end: 400},{start: 200, end: 300},
                        {start: 100, end: 200},{start: 0, end: 100},
                    ],
                    color: ['#5475f5', '#9feaa5', '#85daef','#74e2ca', '#e6ac53', '#9fb5ea']
                },
                series: [{
                    name: '全国数据',
                    type: 'map',
                    mapType: 'china',
                    roam: true,
                    zoom:1.2,
                    label: {
                        normal: {
                            show: true  //省份名称
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    data:this.cityList  //数据
                }]
            });
        },
        // 供应商加载下一页
        supplierLoadMore(){
            this.supplierPage++;
            this.initSupplierList();
        },
        //客户运费加载下一页
        customerLoadMore(){
            this.customerPage++;
            this.initCustomerList();
        },
        toNews:function () {
            let item = {
                urlName: "消息列表",
                urlId: "11" + new Date().getTime(),
                urlPath: "/sys/newsInfo.vue",
                urlPathName: "/newsInfo",
                query: {}
            }
            this.$emit('openTab', item);
        },
    },
    components: {
    },
    directives: {
        myscrolled: {
            inserted(el, bindings) {
                let height = el.offsetHeight;
                let isLoad = false;
                el.onscroll = function (event) {
                    let tableH = el.querySelector("table").offsetHeight;
                    let top = el.scrollTop;
                    if(top+height>=tableH && !isLoad){
                        isLoad = true
                        const timer = setTimeout(() => {    //防止多次请求
                            isLoad = false;
                            for(let key in bindings.value){
                                if(typeof(bindings.value[key])){
                                    bindings.value[key]();
                                }
                            }
                            clearTimeout(timer);
                        },100)
                    }
                }
            }
        },
        myscrolledLeft: {
            inserted(el, bindings) {
                let width = el.offsetWidth;
                let isLoad = false;
                el.onscroll = function (event) {
                    let tableW = el.querySelector("table").offsetWidth;
                    let left = el.scrollLeft;
                    if(left+width>=tableW && !isLoad){
                        isLoad = true
                        const timer = setTimeout(() => {    //防止多次请求
                            isLoad = false;
                            for(let key in bindings.value){
                                if(typeof(bindings.value[key])){
                                    bindings.value[key]();
                                }
                            }
                            clearTimeout(timer);
                        },100)
                    }
                }
            }
        }
    },
}