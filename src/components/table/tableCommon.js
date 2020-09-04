
import vuedraggable from 'vuedraggable';

export default {
    name: 'tableCommon',
    props: [
        "head",             //表头数组
        "showSetTable",     //是否显示表格设置
        "showNum",          //是否显示序号
        "tableName",        //表名
        "singleSelect",     //是否单选
        "hideScale",        //隐藏放大表格按钮
        "doSum",            //是否做统计
        "showMoreData",     //是否展示更多的数据
    ],
    data() {
        return {
            tableData: [],
            selectAll: false, //是否全选
            isShowSetTable: true, //是否展示表格设置
            setTabelShow: false,
            isShowNum: false,
            headList: [],
            headCache: [],
            defaultW: 80, //单元格默认宽度
            multi_w: 40, //选择格默认宽度
            num_w: 40, //序号列默认宽度
            leftTableW: 60,
            headTop: 0, //默认top
            page:1,
            rows:50,
            totalNum:0,
            pageList:[],//页数
            loadParam:{},//请求的数据对象
            justSort:false,//列排序
            isshowFull:false,//是否展示放大图表按钮图片
            isScaleTable:false,//是否放大图表
        }
    },
    components: {
        vuedraggable
    },
    async mounted() {
        this.initShow();
        await this.initHead();
        this.$nextTick(() => {
            this.stretch(); //初始化表格拖动
        })        
    },
    methods: {
        initScroll(){
            this.$refs.tableHeight.scrollLeft = 0;  //火狐浏览器会保留滚动条位置，需要重置
            this.headTop = 0;
            let fixtable = document.getElementById('js_my_fixtable');
            if(this.common.isNotBlank(fixtable)){
                fixtable.style.left = 0;
            }
        },
        async initHead() {
            let entityIds = window.localStorage.getItem("entityIds").split(",");
            if(this.common.isNotBlank(this.head)){
                this.headList = this.common.copyObj(this.head);
            }
            this.headList.forEach((item) => {
                this.$set(item, "isShow", true);
                this.$set(item, "isFix", false);
                if(this.common.isBlank(item.width)){
                    this.$set(item, "width", this.defaultW);
                }  
                if(this.common.isBlank(item.entityId)){
                    this.$set(item, "isExport", true);
                }else{
                    this.$set(item, "isExport", false);
                    this.$set(item, "isDisabledExport", true);
                    //没有实体权限则禁用导出功能
                    for(let id of entityIds){
                        if(item.entityId == id){
                            this.$set(item, "isExport", true);
                            this.$set(item, "isDisabledExport", false);
                            break;
                        }
                    }
                }
            })
            this.headCache = this.common.copyObj(this.headList);
            await this.initTableSet();    //初始化table设置
            this.calcWidth();   //重新计算表格宽度
        },
        async initTableSet(){
            let url = "api/sysTableHeadConfigBO.ajax?cmd=getSysTableHeadConfigs";
            let res = await this.common.postUrl(url,{tableName:this.tableName});
            let table = res[this.tableName]
            if(this.common.isBlank(table)) return;
            //展示隐藏，固定列处理
            let hideList = [];
            this.headList.forEach((item) => {
                item.isShow = false;
                table.forEach(data => {
                    if(item.code == data.headCode){ //后台保存则展示
                        if(this.common.isNotBlank(data.width)){
                            item.width = data.width;
                        }
                        if(data.showFlag==1){  //为1时侧展示
                            item.isShow = true;
                        }
                        if(data.fixedFlag==1){  //为1时侧固定
                            item.isFix = true;
                        }
                        if(data.exportFlag==2){  //为2时侧关闭导出
                            item.isExport = false;
                        }
                    }
                })
                //记录隐藏的列
                if(!item.isShow){
                    hideList.push(item);
                }
            })
            //表头重新排序
            let arr = []
            table.forEach(data => {  //后台有保存的先按照index放好位置
                this.headList.forEach((item) => {
                    if(item.code == data.headCode){
                        arr[data.headIndex] = item;
                    }
                })
            })
            for(let a=0;a<arr.length;a++){  //插入隐藏的列
                if(this.common.isBlank(arr[a])){
                    arr[a] = hideList[0];
                    hideList.splice(0,1);
                }
            }
            arr = arr.filter(d=>d); //过滤数组中empty对象（后台保存展示而前端删除的时候会出现）
            //合并arr和未被插入的隐藏列
            this.headList = arr.concat(hideList);
        },
        initShow() {
            //是否展示表格设置
            if (this.common.isNotBlank(this.showSetTable)) this.isShowSetTable = this.showSetTable;
            //是否展示序号
            if (this.common.isNotBlank(this.showNum)) this.isShowNum = this.showNum;

        },
        //外部调用的查询方法
        async load(url,param,fn){
            if(this.common.isNotBlank(param)) this.loadUrl = url;   //非空时使用传入的url
            if(this.common.isNotBlank(url)) this.loadParam = param; //非空时使用传入的param
            if(this.common.isNotBlank(fn)) this.loadFn = fn;        //非空时使用传入的fn
            this.page = 1;
            this.doQuery();
            this.initScroll();
        },
        //实际查询方法
        async doQuery(){
            this.loadParam.page = this.page;
            this.loadParam.rows = this.rows;
            let data = await this.common.postUrl(this.loadUrl,this.loadParam,"","","",true);
            this.tableData = data.items;
            this.totalNum = data.totalNum;
            this.totalPage = Math.ceil(this.totalNum/this.loadParam.rows);
            this.pageList = [];
            for(let i=0;i<this.totalPage;i++){
                this.pageList[i] = i+1;
            }
            // this.pageList = new Array(this.totalPage);
            if(this.common.isNotBlank(this.loadFn)) this.loadFn(data);
            this.initTableHeight(); //计算表格高度
            if(this.doSum){
                this.calcFootSum();
            }
            this.$nextTick(()=>{
                this.changeTop(this.$refs.tableHeight.scrollTop);
            })
        },
        //汇总
        calcFootSum(){
            this.headList.forEach(hd => {
                let sum = 0;
                if(hd.isSum){
                    this.tableData.forEach(item => {
                        sum += Number(item[hd.code]);
                    })
                    if(!isNaN(sum)){
                        if(Math.floor(sum) !== sum){
                            sum = sum.toFixed(2);
                        }
                        hd.sum = sum;
                    }
                }
            })
            this.$forceUpdate();
        },
        //每页显示10/50/100条数据
        changeRows(num){
            this.rows = num;
            this.page = 1;
            this.doQuery();
        },
        prePage(){
            if(this.page>1){
                this.page--;
                this.doQuery();
            }else{
                this.$message("已经是第一页了")
            }
        },
        nextPage(){
            if(this.page<parseInt(this.totalNum/this.rows)+1){
                this.page++;
                this.doQuery();
            }else{
                this.$message("已经是最后一页了")
            }
        },
        changePage(page){
            this.page = page;
            this.doQuery();
        },
        // 列排序
        doSort(code){
            if(this.move) return;
            this.justSort = this.justSort?false:true;
            let that = this;
            let compare = function(property) {
                return function(a,b) {
                    if(that.common.isBlank(a[property])){
                        var value1 = '-1';
                    }else{
                        var value1 = a[property].toString();
                    }
                    if(that.common.isBlank(b[property])){
                        var value2 = '-1';
                    }else{
                        var value2 = b[property].toString();
                    }
                    value1 = forStr(value1);
                    value2 = forStr(value2);

                    if(that.justSort){  //正序
                        return value1 - value2
                    }else{  //倒序
                        return value2 - value1
                    }
                }
            }  
            const forStr = function(arr){
                let charCode = '';
                for(let i=0;i<arr.length;i++){
                    let code = arr[i].charCodeAt();
                    charCode += code;
                }
                return charCode;
            }
            this.tableData.sort(compare(code));
        },
        //单击行方法
        selectRow(data, index) {
            if(this.singleSelect){  //单选逻辑
                if(data.isSelect){
                    this.$set(data, "isSelect", false);
                }else{
                    for (let obj of this.tableData) {
                        this.$set(obj, "isSelect", false);
                    } 
                    this.$set(data, "isSelect", true);
                }
            }else{  //多选逻辑
                this.$set(data, "isSelect", data.isSelect ? false : true);
                this.selectAll = true;
                for (let obj of this.tableData) {
                    if (!obj.isSelect) {
                        this.selectAll = false;
                    }
                }                
            }
            this.$emit("clickItem",data); 
            // this.$forceUpdate();
        },
        dblclickItem(data){
            this.$emit("dblclickItem",data);
        },
        getSelectItem(){
            let array = [];
            this.tableData.forEach((item)=>{
                if (item.isSelect) {
                    array.push(item);
                }
            })
            return array;
        },
        //全选
        selectAllCheck() {
            if (this.selectAll) {
                this.tableData.forEach((item) => {
                    this.$set(item, "isSelect", true);
                })
            } else {
                this.tableData.forEach((item) => {
                    this.$set(item, "isSelect", false);
                })
            }
            //返回两个参数，selectAll是否全选，data整个表格数据
            this.$emit("selectAll",{selectAll:this.selectAll,data:this.tableData}); 
        },
        //表格设置
        showSetting() {
            this.headCache = this.common.copyObj(this.headList);
            this.setTabelShow = true;
        },
        //保存表格设置
        async saveTableRow(){
            let sysTableHeadConfigList = [];
            //组装要保存的table，目前保存需要显示的
            for(let i in this.headList){
                let hd = this.headList[i];
                let tableHeadConfig = {};
                tableHeadConfig.headName = hd.name;
                tableHeadConfig.headCode = hd.code;
                tableHeadConfig.width = hd.width;
                tableHeadConfig.headIndex = i;
                tableHeadConfig.fixedFlag = hd.isFix?1:2;
                tableHeadConfig.exportFlag = hd.isExport?1:2;
                tableHeadConfig.showFlag = hd.isShow?1:2;                    
                sysTableHeadConfigList.push(tableHeadConfig);
            }
            let param = {};
            param.tableName = this.tableName;
            param.paramStr = JSON.stringify(sysTableHeadConfigList);
            let url = "api/sysTableHeadConfigBO.ajax?cmd=saveSysTableHeadConfigs";
            await this.common.postUrl(url,param,"","","",true);
            this.setTabelShow = false;
            this.$message({
                message: '保存成功！',
                type: 'success'
            });
        },
        cancelSet() {
            this.headList = this.common.copyObj(this.headCache);
            this.setTabelShow = false;
            this.calcWidth();
        },
        //清空表格
        clean(){
            this.tableData = [];
            this.page = 1;
            this.rows = 50;
            this.totalNum = 0;
            this.pageList = [];
        },
        hideRow(hd) {
            this.calcWidth();
        },
        //固定列逻辑
        fixRow(hd, index) {
            let fixIndex = -1;
            for (let i in this.headList) { //获取固定列的长度
                if (this.headList[i].isFix || i == index) {
                    fixIndex = parseInt(i);
                } else {
                    break;
                }
            }
            let obj = this.headList[index];
            if (hd.isFix) { //确实固定
                this.headList.splice(index, 1);
                if (fixIndex - index == 0) {
                    this.headList.splice(fixIndex, 0, obj);
                } else {
                    this.headList.splice(fixIndex + 1, 0, obj);
                }
            } else { //取消固定
                this.headList.splice(index, 1);
                this.headList.splice(fixIndex, 0, obj);
            }
            this.calcWidth();
        },
        calcWidth() {
            let fixTbW = 0;
            for (let i in this.headList) {
                if (this.headList[i].isFix && this.headList[i].isShow) {
                    if (this.headList[i].width == undefined) {
                        fixTbW = fixTbW + this.defaultW + 1;
                    } else {
                        fixTbW = fixTbW + parseInt(this.headList[i].width) + 1;
                    }
                }
            }
            if (this.isShowNum) {
                this.leftTableW = fixTbW + this.multi_w + this.num_w;
            } else {
                this.leftTableW = fixTbW + this.multi_w;
            }
        },
        changeTop(top) {
            this.headTop = top;
            this._fixBottomRight = top+this.$refs.tableHeight.offsetHeight-48;
        },
        //导出功能
        downloadExcelFile(fileName){
            let queryUrl = this.loadUrl;
            let excelKeys=new Array();
            let excelLables=new Array();
            
            for(let el of this.headList){
                if(el.isExport){
                    excelKeys.push(el.code);
                    excelLables.push(el.name);
                }
            }
            if(fileName == null || fileName==undefined ){
                fileName ="";
            }
            this.common.downloadExcelFile(queryUrl,this.loadParam,excelLables,excelKeys,"",this.tableName);
        },
        //计算表格高度
        initTableHeight(){
            this.common.initTableHeight();
        },
        //表单列宽自由拖动
        stretch(){
            let myTAbId = this.$refs.js_my_table;
            let tTD; //用来存储当前更改宽度的Table Cell,避免快速移动鼠标的问题   
            if(this.headList == undefined){
                return;
            }
            let _this = this;
            // for(let m=0;m<myTAbId.length;m++){
                let unset = myTAbId.rows[0].cells.length - _this.headList.length;
                for (let j = 0; j < myTAbId.rows[0].cells.length; j++) {  
                    myTAbId.rows[0].cells[j].index = j;
                    if(unset - 1<j){
                        myTAbId.rows[0].cells[j].onmousedown = function (event) {   
                            //记录单元格    
                            tTD = this;   
                            if (event.offsetX > tTD.offsetWidth - 10) {   
                                tTD.mouseDown = true;   
                                tTD.oldX = event.clientX;   
                                tTD.oldWidth = tTD.offsetWidth;   
                            }   
                            //记录Table宽度   
                            //table = tTD; while (table.tagName != ‘TABLE') table = table.parentElement;   
                            //tTD.tableWidth = table.offsetWidth;   
                        };   
                        myTAbId.rows[0].cells[j].onmouseup = function (event) {   
                            //结束宽度调整   
                            if (tTD == undefined) tTD = this;   
                            tTD.mouseDown = false;   
                            tTD.style.cursor = 'default';   
                            _this.headList[this.index-unset].width = tTD.width;
                            if(tTD.getAttribute("data-mouse")=="true"){	                	
                                (function(tTD){
                                    let timer = setTimeout(function(){
                                        tTD.setAttribute("data-mouse","false");
                                        _this.move = false;
                                        clearTimeout(timer);	
                                    }, 500)
                                })(tTD);
                            }
                        };   
                        myTAbId.rows[0].cells[j].onmousemove = function (event,m) { 
                            //更改鼠标样式   
                            if (event.offsetX > this.offsetWidth - 10)   
                            this.style.cursor = 'col-resize';      
                            else   
                            this.style.cursor = 'default';   
                            //取出暂存的Table Cell   
                            if (tTD == undefined) tTD = this;   
                            //调整宽度   
                            if (tTD.mouseDown != null && tTD.mouseDown == true) {   
                                _this.move = true;
                                tTD.setAttribute("data-mouse","true");
                                
                                tTD.style.cursor = 'default';   
                                if (tTD.oldWidth + (event.clientX - tTD.oldX)>0)   
                                tTD.width = tTD.oldWidth + (event.clientX - tTD.oldX);   
                                //调整列宽   
                                tTD.style.cursor = 'col-resize';    
                                //调整该列中的每个Cell   
                                // myTAbId = tTD; while (myTAbId.tagName != 'TABLE') myTAbId = myTAbId.parentElement;   
                                let tableElement = this.parentElement.parentElement.parentElement;
                                for (let k = 0; k < tableElement.rows.length; k++) {   
                                    tableElement.rows[k].cells[tTD.cellIndex].width = tTD.width;   
                                }   
                            }   
                        };   
                    }  
                }
            // }
        },
        showFull(){
            this.isshowFull = true;
        },
        hideFull(){
            this.isshowFull = false;
        },
        scaleTable(){
            this.isScaleTable = this.isScaleTable?false:true;
        },
    },
    directives: {
        myscrolled: {
            bind(el) {
                console.log(el)
            },
            inserted(el, bindings) {
                let that = this;
                let fixtable = document.getElementById('js_my_fixtable');
                el.onscroll = function (event) {
                    let left = el.scrollLeft;
                    fixtable.style.left = left + 'px';
                    bindings.value.changeTop(el.scrollTop);
                }
            }
        }
    },
    watch:{
        head:{
            handler(n){
                this.initHead();
            }
        }
    },
    computed: {
        headListFix: function () {
            return this.headList.filter(function (item) {
                return item.isShow&&item.isFix;
            })
        },
        headListShow: function () {
            return this.headList.filter(function (item) {
                return item.isShow&&!item.isFix;
            })
        }
    }
}