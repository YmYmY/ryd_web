
export default {
    name: 'scrollTable',
    props: [
        "head",             //表头数组
        "height",           //表格高度
    ],
    data() {
        return {
            tableData: [],
            headList: [],
            headTop: 0, //默认top
            page:1,
            rows:10,
            loadParam:{},//请求的数据对象
            defaultW:80,
        }
    },
    mounted() {
        
    },
    methods: {        
        //外部调用查询
        load(url,param,fn){
            if(this.common.isNotBlank(param)) this.loadParam = param;//非空时使用传入的param
            if(this.common.isNotBlank(url)) this.loadUrl = url;   //非空时使用传入的url
            if(this.common.isNotBlank(fn)) this.loadFn = fn;        //非空时使用传入的fn
            this.doQuery(true);
        },
        //实际查询方法，clean:true时，清空表格重新查询
        async doQuery(clean){
            if(clean){
                this.loadParam.page = 1
                this.loadParam.count = this.count;
                this.$refs.table_height.scrollTop = 0; //重新查询需要重置滚动条位置
            }
            let data = await this.common.postUrl(this.loadUrl,this.loadParam,null,null,"post",true);
            if(clean){
                this.tableData = [];
            }
            this.tableData = [...this.tableData,...data.items];
            this.totalNum = data.totalNum;  //总条数
            this.hasNext = data.hasNext;    //是否有下一页
            if(this.common.isNotBlank(this.loadFn)) this.loadFn(data);
            this.$nextTick(()=>{
                this.changeTop(this.$refs.table_height.scrollTop);
            })
        },        
        changeTop(top) {
            let tableH = this.$refs.table_height.offsetHeight; //table容器高度
            let fixtableH = this.$refs.scrollTable.offsetHeight; //table高度
            this.headTop = top;
            this._fixBottom = top+tableH;
            if(fixtableH<=tableH+top){  //底部滚动
                let _this = this;
                const timer = setTimeout(() => {    //滚动触发底部触发时间间隔
                    _this.isSrolling = false;
                    clearTimeout(timer);
                }, 300);
                if(this.hasNext&&!this.isSrolling){    
                    this.isSrolling = true;                    
                    this.loadParam.page++;
                    this.doQuery();
                }
            }
        },
    },
    directives: {
        myscrolled: {
            bind(el) {
                
            },
            inserted(el, bindings) {
                el.onscroll = function (event) {
                    bindings.value.changeTop(el.scrollTop);
                }
            }
        },
    },
}