export default {
    name: 'ladderTable',
    props:['sysPriceType','disabledEdit','disabledType','head','paging'],
    data(){
        return{
            tableData:[],
            backSelectData:[],  //后台返回已选取的数据
            headTop:0, //表头高度
            heavy0:1,
            heavyOne:"",
            heavyTwo:"",
            heavyThree:"",
            heavyFour:"",
            heavyFives:"",
            heavyCheck0:false,
            heavyCheckOne:false,
            heavyCheckTwo:false,
            heavyCheckThree:false,
            heavyCheckFour:false,
            heavyCheckFives:false,
            agingNum:null,
            startWeight:null,
            startCost:null,
            weightOne:null,
            weightOneCost:null,
            weightTwo:null,
            weightTwoCost:null,
            weightThree:null,
            weightThreeCost:null,
            weightFour:null,
            weightFourCost:null,
            weightFives:null,
            weightFivesCost:null,
        }
    },
    mounted(){
        if(this.common.isBlank(this.paging)){
            this.getProvince();
        }
        this.$nextTick(() => {
            this.initScroll(); //初始化表格滚动
        })       
        
    },
    methods:{
        async getProvince(){
            let {
                items
            } = await this.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectProvince", "");
            this.tableData = [];
            items.forEach(el => {
                this.tableData.push(el)
            });
        },
        async getCity(data,index){
            if(this.disabledType == 1) return;
            let url = "";   //请求地址
            let idStr = ""   //父级ID
            if(this.common.isNotBlank(data.provType)){  //省级时处理
                idStr = "provId"
                url = "api/sysStaticDataBO.ajax?cmd=selectCity&provinceId=" + data.id
            }else if(this.common.isNotBlank(data.cityType)){    //市级时处理
                idStr = "cityId"
                url = "api/sysStaticDataBO.ajax?cmd=selectDistrict&cityId=" + data.id
            }else{
                return
            }
            if(data.isQuery){           //是否查询过下级
                if(data.childShow){     //下级是否展示状态
                    data.childShow = false;
                    this.tableData.forEach(el => {
                        if(el[idStr] == data.id){
                            el.isHide = true;
                            if(idStr=="provId"){    //如果点击省级需要隐藏区县一起隐藏
                                this.tableData.forEach(item => {
                                    if(item.cityId == el.id){
                                        item.isHide = true;
                                    }
                                })
                            }
                        }
                    })
                }else{
                    data.childShow = true;
                    this.tableData.forEach(el => {
                        if(el[idStr] == data.id){
                            el.isHide = false;
                        }
                    })
                }
                return;
            };
            let {items} = await this.common.postUrl(url, "");
            data.isQuery = true;    //该省是否查询过
            data.childShow = true;  //
            items.forEach(el => {
                el.isHide = false;
                el.idStr = idStr;
            })
            this.tableData.splice(index+1,0,items);
            this.tableData = this.tableData.flat();
            this.assingData();
            this.$emit("areaCallback",data);
        },
        changeHeavy(type){
            let key = 'heavyCheck'+type;
            if(this.common.isBlank(this['heavy'+type])){
                this[key] = false;
                return
            }
            if(this[key]){
                this.tableData.forEach(el => {
                    if(type=='0'){
                        el.startWeight = this['heavy'+type];
                    }else{
                        el['weight'+type] = this['heavy'+type];
                    }
                })
            }
        },
        heavyIpt(type){
            if(type == 0){
                this.heavyCheck0 = false;
            }else if(type == 1){
                this.heavyCheck1 = false
            }
        },
        checkVal(type){
            if(Number(this['heavy'+type])<Number(this['heavy'+(type-1)])){
                this['heavy'+type] = '';
                this.$message.error('数值不能小于'+this['heavy'+(type-1)]);
            }
        },
        //单元格赋值
        setRowValue(code,value){
            this.tableData.forEach(el => {
                this.$set(el,code,value)
            })
        },
        //选择行
        selectTd(data){
            if(data.isSelect){  //取消操作,对应删除总数据
                this.backSelectData.forEach((el,index) => {
                    if(el.endCityId == data.id || el.id == data.id){
                        this.backSelectData.splice(index,1);
                    }
                })
            }else{  //选择操作,怎加对应的数据到总数据
                this.backSelectData.push(data);
            }
            data.isSelect = data.isSelect?false:true;
            this.$forceUpdate();
        },
        getSelect(){
            let arr = [];
            this.tableData.forEach(el => {
                if(el.isSelect){
                    arr.push(el);
                }
            })
            // debugger
            // this.backSelectData.forEach((el,index) => {
            //     arr.forEach(item =>{
            //         if(el.id == item.endCityId){
            //             this.backSelectData[index] = item;
            //         }
            //     })
            // })
            return arr;
        },
        //数据回显
        setData(data){
            this.backSelectData = this.common.copyObj(data);
            this.assingData();
        },
        //合并后台返回的已选中对象
        assingData(){
            this.tableData.forEach(el => {
                this.backSelectData.forEach(item => {
                    if(el.id == item.endCityId){    //区域ID相同时合并对象
                        el.isSelect = true;
                        el = Object.assign(el,item);
                    }
                })
            })
            this.$forceUpdate();
        },
        initScroll(){
            let table = this.$refs.ladderTableScroll;
            this.thH = this.$refs.ladderThead.offsetHeight; //表头高度
            let _this = this;
            table.onscroll = function(){
                _this.headTop = table.scrollTop;
                // if(tableH - table.scrollTop<10){
                //     _this.loadMore();
                // }
            }
        },
        async load(url,param,fn){
            if(this.common.isNotBlank(param)) this.loadUrl = url;   //非空时使用传入的url
            if(this.common.isNotBlank(url)) this.loadParam = param; //非空时使用传入的param
            if(this.common.isNotBlank(fn)) this.loadFn = fn;        //非空时使用传入的fn
            this.page = 1;
            this.loadParam.page = this.page;
            this.loadParam.rows = this.rows;
            let data = await this.common.postUrl(this.loadUrl,this.loadParam,"","","",true);
            this.tableData = data.items;
            this.haveNext = data.haveNext;
            if(this.common.isNotBlank(this.loadFn)) this.loadFn(data);
        },
        loadMore(){
            if(this.paging && this.haveNext){
                
            }
        },
        //防止冒泡
        stopbub(){
            return false;
        },
        //更新视图
        updateDom(){
            this.$forceUpdate();
        }
    },
}