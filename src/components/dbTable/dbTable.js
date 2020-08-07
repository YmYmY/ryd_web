
import vuedraggable from 'vuedraggable';

export default {
    name: 'dbTable',
    props: [
        "head",         //默认表头
        "rightHead",    //右边表头(不设置则使用默认表头)
        "showSetTable", //是否显示表格设置
        "showNum",      //是否显示页码
        "tableName",    //表名
        "onlyId",        //数据唯一ID,用于左右切换时识别数据
        "nextBtnText",      //下一步操作文本，默认文本为"下一步"
        "showDispatchBtn",  //是否展示一键派单
        "dispatchBtnText"      //一键派单操作文本，默认文本为"一键派单"
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
            count:50,
            totalNum:0,
            loadParam:{},//请求的数据对象
            //右边表格需要字段
            setRightTabelShow:false,
            headListRight:[],
            leftTableWRight:60,
            headTopRight: 0, //默认top
            tableDataRight:[],
            leftWidth:'48%',        //表格默认宽度
            rightWidth:'48%',       //表格默认宽度
            showRightTable:true,    //显示右边表格
            showLeftTable:true,     //显示左边表格
            justSort:false,//列排序
            isshowDispatchBtn:false, //是否展示一键派单按钮
        }
    },
    components: {
        vuedraggable
    },
    async mounted() {
        this.initShow();
        await this.initHead();
        this.calcWidth();
        this.calcWidth('right');
        this.$nextTick(() => {
            this.stretch(); //初始化表格拖动
            // this.initScroll();  //初始化滚动事件
        })        
    },
    methods: {
        initScroll(){
            let _this = this;
            let el_left = this.$refs.table_height_left.querySelector(".el-scrollbar__wrap");
            el_left.onscroll = function(){
                _this.changeTop(el_left.scrollTop);
            }
            let el_right = this.$refs.table_height_right.querySelector(".el-scrollbar__wrap");
            el_right.onscroll = function(){
                _this.changeTop(el_right.scrollTop,"right");
            }
        },
        initHead() {
            this.head.forEach((item) => {
                this.$set(item, "isShow", true);
                this.$set(item, "isFix", false);
                if(this.common.isBlank(item.width)){
                    this.$set(item, "width", this.defaultW);
                }
            })
            this.headList = this.common.copyObj(this.head); //左边表头
            //右边表头
            if(this.common.isBlank(this.rightHead)){    //页面没配置
                this.headListRight = this.common.copyObj(this.head);
            }else{      //页面有配置
                this.rightHead.forEach((item) => {
                    this.$set(item, "isShow", true);
                    this.$set(item, "isFix", false);
                    if(this.common.isBlank(item.width)){
                        this.$set(item, "width", this.defaultW);
                    }
                })
                this.headListRight = this.common.copyObj(this.rightHead);
            }   
            this.initTwoTableSet();    //初始化table设置
        },
        async initTwoTableSet(){
            let url = "api/sysTableHeadConfigBO.ajax?cmd=getSysTableHeadConfigs";
            let tableLeft = await this.common.postUrl(url,{tableName:this.tableName});
            let tableRight = await this.common.postUrl(url,{tableName:this.tableName+"right"});
            let headList = this.initTableSet(tableLeft[this.tableName],this.headList);    //初始化左边table设置
            if(this.common.isNotBlank(headList)) this.headList = headList;
            let headListRight = this.initTableSet(tableRight[this.tableName+"right"],this.headListRight);    //初始化右边table设置
            if(this.common.isNotBlank(headListRight)) this.headListRight = headListRight;
            this.calcWidth();
        },
        initTableSet(table,head){
            if(this.common.isBlank(table)) return;
            //展示隐藏，固定列处理
            let hideList = [];
            head.forEach((item) => {
                item.isShow = false;
                table.forEach(data => {
                    if(item.code == data.headCode){ //后台保存则展示
                        item.isShow = true;
                        if(this.common.isNotBlank(data.width)){
                            item.width = data.width;
                        }
                        if(data.fixedFlag==1){  //为1时侧固定
                            item.isFix = true;
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
                head.forEach((item) => {
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
            head = arr.concat(hideList);
            return head
        },
        initShow() {
            //是否展示表格设置
            if (this.common.isNotBlank(this.showSetTable)) this.isShowSetTable = this.showSetTable;
            //是否展示序号
            if (this.common.isNotBlank(this.showNum)) this.isShowNum = this.showNum;
            //是否展示一键派单
            if (this.common.isNotBlank(this.showDispatchBtn)) this.isshowDispatchBtn = true;
        },
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
                this.$refs.table_height_left.scrollTop = 0; //重新查询需要重置滚动条位置
            }
            let data = await this.common.postUrl(this.loadUrl,this.loadParam,null,null,"post",true);
            if(clean){
                this.tableData = [];
            }
            this.tableData = [...this.tableData,...data.items];
            this.totalNum = data.totalNum;  //总条数
            this.hasNext = data.hasNext;    //是否有下一页
            this.filterLeftData();  //过滤表格已有数据
            if(this.common.isNotBlank(this.loadFn)) this.loadFn(data);
            this.initTableHeight(); //计算表格高度
            this.$nextTick(()=>{
                this.changeTop(this.$refs.table_height_left.scrollTop);
            })
        },
        //重新查询的时候过滤右边的数据
        filterLeftData(){
            this.tableDataRight.forEach(item => {
                this.tableData.forEach((el,index) => {
                    if(item[this.onlyId] == el[this.onlyId]){
                        this.tableData.splice(index,1);
                    }
                })
            })
        },
        //单击行方法
        selectRow(data, index) {
            this.$set(data, "isSelect", data.isSelect ? false : true);
            this.selectAll = true;
            for (let obj of this.tableData) {
                if (!obj.isSelect) {
                    this.selectAll = false;
                }
            }
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
        },
        //表格设置
        showSetting(type) {
            if(type=="right"){
                this.headCache = this.common.copyObj(this.headListRight);
                this.setRightTabelShow = true;
            }
            if(type=='left'){
                this.headCache = this.common.copyObj(this.headList);
                this.setTabelShow = true;
            }
        },
        //左边表格设置
        async saveTableRow(){
            let sysTableHeadConfigList = [];
            //组装要保存的table，目前保存需要显示的
            for(let i in this.headList){
                let hd = this.headList[i];
                if(hd.isShow){
                    let tableHeadConfig = {};
                    tableHeadConfig.headName = hd.name;
                    tableHeadConfig.headCode = hd.code;
                    tableHeadConfig.width = hd.width;
                    tableHeadConfig.headIndex = i;
                    tableHeadConfig.fixedFlag = hd.isFix?1:2;
                    sysTableHeadConfigList.push(tableHeadConfig);
                }
            }
            let param = {};
            param.tableName = this.tableName;
            param.paramStr = JSON.stringify(sysTableHeadConfigList);
            let url = "api/sysTableHeadConfigBO.ajax?cmd=saveSysTableHeadConfigs";
            await this.common.postUrl(url,param);
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
        //右边表格设置
        async saveRightTableRow(){
            let sysTableHeadConfigList = [];
            //组装要保存的table，目前保存需要显示的
            for(let i in this.headListRight){
                let hd = this.headListRight[i];
                if(hd.isShow){
                    let tableHeadConfig = {};
                    tableHeadConfig.headName = hd.name;
                    tableHeadConfig.headCode = hd.code;
                    tableHeadConfig.width = hd.width;
                    tableHeadConfig.headIndex = i;
                    tableHeadConfig.fixedFlag = hd.isFix?1:2;
                    sysTableHeadConfigList.push(tableHeadConfig);
                }
            }
            let param = {};
            param.tableName = this.tableName+"right";
            param.paramStr = JSON.stringify(sysTableHeadConfigList);
            let url = "api/sysTableHeadConfigBO.ajax?cmd=saveSysTableHeadConfigs";
            await this.common.postUrl(url,param);
            this.setRightTabelShow = false;
            this.$message({
                message: '保存成功！',
                type: 'success'
            });
        },
        cancelRightSet() {
            this.headListRight = this.common.copyObj(this.headCache);
            this.setRightTabelShow = false;
            this.calcWidth();
        },

        //固定列逻辑
        fixRow(hd, index,type) {
            let headList = 'headList'
            if(type=='right'){
                headList = 'headListRight';
            }
            let fixIndex = -1;
            for (let i in this[headList]) { //获取固定列的长度
                if (this[headList][i].isFix || i == index) {
                    fixIndex = parseInt(i);
                } else {
                    break;
                }
            }
            let obj = this[headList][index];
            if (hd.isFix) { //确实固定
                this[headList].splice(index, 1);
                if (fixIndex - index == 0) {
                    this[headList].splice(fixIndex, 0, obj);
                } else {
                    this[headList].splice(fixIndex + 1, 0, obj);
                }
            } else { //取消固定
                this[headList].splice(index, 1);
                this[headList].splice(fixIndex, 0, obj);
            }
            this.calcWidth(type);
        },
        calcWidth(type) {
            let headList = 'headList'
            if(type=='right'){
                headList = 'headListRight';
            }
            let fixTbW = 0;
            for (let i in this[headList]) {
                if (this[headList][i].isFix && this[headList][i].isShow) {
                    if (this[headList][i].width == undefined) {
                        fixTbW = fixTbW + this.defaultW + 1;
                    } else {
                        fixTbW = fixTbW + parseInt(this[headList][i].width) + 1;
                    }
                }
            }
            if(type=='right'){
                if (this.isShowNum) {
                    this.leftTableWRight = fixTbW + this.multi_w + this.num_w;
                } else {
                    this.leftTableWRight = fixTbW + this.multi_w;
                }
            }else{
                if (this.isShowNum) {
                    this.leftTableW = fixTbW + this.multi_w + this.num_w;
                } else {
                    this.leftTableW = fixTbW + this.multi_w;
                }
            }
        },
        changeTop(top,type) {
            if(type=='right'){
                this.headTopRight = top;
                this._fixBottomRight = top+this.$refs.table_height_left.offsetHeight-46;
            }else{
                let tableH = this.$refs.table_height_left.offsetHeight; //table容器高度
                let fixtableH = document.getElementById('js_my_fixtable').offsetHeight; //table高度
                this.headTop = top;
                this._fixBottom = top+tableH-46;
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
            }
        },

        //左右表格数据切换操作
        toRightTable(data,index,isAll){
            if(isAll=='all'){
                this.tableDataRight = [...this.tableData,...this.tableDataRight]
                this.tableData = [];
            }else{
                this.tableData.splice(index,1);
                this.tableDataRight.unshift(data);
            }
            this.changeTop(this.$refs.table_height_right.scrollTop,'right');
        },
        toLeftTable(data,index,isAll){
            if(isAll=='all'){
                this.tableData = [...this.tableDataRight,...this.tableData]
                this.tableDataRight = [];
            }else{
                this.tableDataRight.splice(index,1);
                this.tableData.unshift(data);
            }
        },

        //获取选中的数据
        getLeftData(){
            return this.tableDataRight;
        },
        goNext(){
            this.$emit("doNext",this.tableDataRight);
        },
        goDispatch(){
            this.$emit("doDispatch",this.tableDataRight);
        },
        setRightData(data){   //父组件改动右侧数据后重设表格数据方法
            this.tableDataRight = data;
        },        
        //计算表格高度
        initTableHeight(){
            let main_frame = document.querySelector(".main_frame").offsetHeight;     //路由内容高度
            let innerTabDom = document.getElementById("innerTab");         //内部tab栏高度
            let innerTab = 0;
            if(innerTabDom) innerTab = innerTabDom.offsetHeight;
            let searchList = document.querySelector(".search-list").offsetHeight;    //搜索内容高度
            let tableTitle = document.querySelector(".table-title").offsetHeight;    //表格名称高度
            let dbTable = document.getElementById('dbTable');   //组件dom对象
            let table = dbTable.querySelectorAll('.table_height');     //表格对象
            // let tableFooter = dbTable.querySelector('.table_page').offsetHeight; //组件脚部高度
            table.forEach(el => {
                el.style.height = (main_frame - innerTab - searchList - tableTitle - 40) + 'px';
            })
        },
        //缩放表格
        scaleTable(type){
            if(type==1){    //左边表格
                if(this.leftWidth == '48%'){
                    this.leftWidth = '100%';
                    this.rightWidth = '0';
                    this.showRightTable = false;
                }else if(this.leftWidth == '100%'){
                    this.leftWidth = '48%';
                    this.rightWidth = '48%';
                    let timeout = setTimeout(()=>{
                        this.showRightTable = true;
                        clearTimeout(timeout)
                    },500)
                }
            }else if(type==2){  //右边表格
                if(this.rightWidth == '48%'){
                    this.rightWidth = '100%';
                    this.leftWidth = '0';
                    this.showLeftTable = false;
                }else if(this.rightWidth == '100%'){
                    this.rightWidth = '48%';
                    this.leftWidth = '48%';
                    let timeout = setTimeout(()=>{
                        this.showLeftTable = true;
                        clearTimeout(timeout)
                    },500)
                }
            }

        },        
        // 列排序
        doSort(code,tableData){
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
            tableData.sort(compare(code));
            this.$forceUpdate();
        },
        //表单列宽自由拖动
        stretch(){
            let myTAbIds = [];
            myTAbIds[0] = this.$refs.js_my_table_left;
            myTAbIds[1] = this.$refs.js_my_table_right;
            let tTD; //用来存储当前更改宽度的Table Cell,避免快速移动鼠标的问题   
            let _this = this;
            for(let m=0;m<myTAbIds.length;m++){
                let myTAbId = myTAbIds[m];
                if(m == 0 && _this.headList == undefined){
                    return;
                }          
                if(m == 1 && _this.headListRight == undefined){
                    return;
                }
                if(m==0){
                    var unset = myTAbId.rows[0].cells.length - _this.headList.length;
                }else if(m==1){
                    var unset = myTAbId.rows[0].cells.length - _this.headListRight.length;
                }
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
                            if(m==0){
                                _this.headList[this.index-unset].width = tTD.width;
                            }else if(m==1){
                                _this.headListRight[this.index-unset].width = tTD.width;
                            }
                            if(tTD.getAttribute("data-mouse")=="true"){	                	
                                (function(tTD){
                                    let timer = setTimeout(function(){
                                        tTD.setAttribute("data-mouse","false");
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
            }
        }
    },
    directives: {
        myscrolled: {
            bind(el) {
                
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
        },
        myRightScrolled: {
            bind(el) {
                
            },
            inserted(el, bindings) {
                let fixtable = document.getElementById('js_my_fixtable_right');
                el.onscroll = function (event) {
                    let left = el.scrollLeft;
                    fixtable.style.left = left + 'px';
                    bindings.value.changeTop(el.scrollTop,'right');
                }
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
        },
        headListRightFix: function () {
            return this.headListRight.filter(function (item) {
                return item.isShow&&item.isFix;
            })
        },
        headListRightShow: function () {
            return this.headListRight.filter(function (item) {
                return item.isShow&&!item.isFix;
            })
        }
    }
}