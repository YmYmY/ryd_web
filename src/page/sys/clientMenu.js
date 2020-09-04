export default {
    name: 'clientMenu',
    props:['subpage','clientGrade','tenantId'],
    data() {
        return {
            advancedList:[  //高级用户
                {
                    urlId:this.getTime()+1,
                    urlName:"",
                    tier:1,
                    pId:'-1',
                    children:[
                        {
                            urlId:this.getTime()+11,
                            urlName:"",
                            tier:2,
                            pId:this.getTime()+1,
                            children:[
                                
                            ]
                        }
                    ]
                }
            ],
            middleList:[],//中级
            lowList:[],//低级
            gridData: [],    //子菜单
            userlevel:'0',    //子页面默认展示初级用户
        }
    },
    mounted() {
        if(this.subpage){   //为子页面是，默认展示初级用户
            this.userlevel = '1';
        }
        this.initList();
        this.getSysMenuAll();
    },
    methods: {
        initList(){
            //初始化中级客户
            this.middleList = this.common.copyObj(this.advancedList);
            this.middleList[0].urlId = this.getTime()+2;
            this.middleList[0].children[0].pId = this.getTime()+2;
            this.middleList[0].children[0].urlId = this.getTime()+21;
            //初始化低级客户
            this.lowList = this.common.copyObj(this.advancedList);
            this.lowList[0].urlId = this.getTime()+3;
            this.lowList[0].children[0].pId = this.getTime()+3;
            this.lowList[0].children[0].urlId = this.getTime()+31;
        },
        getSysMenuAll:function () {
            let that = this;
            let url = "api/sysMenuBO.ajax?cmd=getSysMenuAll";
            that.common.postUrl(url,{"attributionType":2},function (data) {
                that.gridData =data.items;
            })
            //高级客户
            that.common.postUrl("api/sysMenuBO.ajax?cmd=doQueryClientMenu",{"clientGrade":1,tenantId:this.tenantId},function (data) {
                that.advancedList = data.items;
            })
            //中级客户
            that.common.postUrl("api/sysMenuBO.ajax?cmd=doQueryClientMenu",{"clientGrade":2,tenantId:this.tenantId},function (data) {
                that.middleList = data.items;
            })
            //初级客户
            that.common.postUrl("api/sysMenuBO.ajax?cmd=doQueryClientMenu",{"clientGrade":3,tenantId:this.tenantId},function (data) {
                that.lowList = data.items;
            })

        },
        doSave:function () {
            let that = this;
            let advancedList = this.common.copyObj(this.advancedList);
            let middleList = this.common.copyObj(this.middleList);
            let lowList = this.common.copyObj(this.lowList);
            let advanced = this.reconsitutionData(advancedList);
            let middle = this.reconsitutionData(middleList);
            let low = this.reconsitutionData(lowList);
            let obj = {
                menuOne:advanced.menuOne,
                menuTwo:advanced.menuTwo,
                menuThree:advanced.menuThree,
                menuFour:middle.menuOne,
                menuFives:middle.menuTwo,
                menuSix:middle.menuThree,
                menuSeven:low.menuOne,
                menuEight:low.menuTwo,
                menuNine:low.menuThree,
            };
            let menuOne = [];
            let menuTwo = [];
            let menuThree = [];
            menuOne =JSON.parse(obj.menuOne);
            if(menuOne.length == 0){
                that.$message.error('请输入高级客户一级菜单名称！');
                return;
            }
            for(let el of menuOne){
                if(that.common.isBlank(el.urlName)){
                    that.$message.error('请输入高级客户一级菜单名称！');
                    return;
                }
            }
            menuTwo =JSON.parse(obj.menuTwo);
            if(menuTwo.length == 0){
                that.$message.error('请输入高级客户二级菜单名称！');
                return;
            }
            for(let el of menuTwo){
                if(that.common.isBlank(el.urlName)){
                    that.$message.error('请输入高级客户二级菜单名称！');
                    return;
                }
            }
            menuThree =JSON.parse(obj.menuThree);
            if(menuThree.length == 0){
                that.$message.error('请选择高级客户三级菜单！');
                return;
            }
            menuOne =JSON.parse(obj.menuFour);
            if(menuOne.length == 0){
                that.$message.error('请输入中级客户一级菜单名称！');
                return;
            }
            for(let el of menuOne){
                if(that.common.isBlank(el.urlName)){
                    that.$message.error('请输入中级客户一级菜单名称！');
                    return;
                }
            }
            menuTwo =JSON.parse(obj.menuFives);
            if(menuTwo.length == 0){
                that.$message.error('请输入中级客户二级菜单名称！');
                return;
            }
            for(let el of menuTwo){
                if(that.common.isBlank(el.urlName)){
                    that.$message.error('请输入中级客户二级菜单名称！');
                    return;
                }
            }
            menuThree =JSON.parse(obj.menuSix);
            if(menuThree.length == 0){
                that.$message.error('请选择中级客户三级菜单！');
                return;
            }
            menuOne =JSON.parse(obj.menuSeven);
            if(menuOne.length == 0){
                that.$message.error('请输入初级客户一级菜单名称！');
                return;
            }
            for(let el of menuOne){
                if(that.common.isBlank(el.urlName)){
                    that.$message.error('请输入初级客户一级菜单名称！');
                    return;
                }
            }
            menuTwo =JSON.parse(obj.menuEight);
            if(menuTwo.length == 0){
                that.$message.error('请输入初级客户二级菜单名称！');
                return;
            }
            for(let el of menuTwo){
                if(that.common.isBlank(el.urlName)){
                    that.$message.error('请输入初级客户二级菜单名称！');
                    return;
                }
            }
            menuThree =JSON.parse(obj.menuNine);
            if(menuThree.length == 0){
                that.$message.error('请选择初级客户三级菜单！');
                return;
            }

            that.$confirm(that.rms, '是否确认操作？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysMenuBO.ajax?cmd=doSaveClientMenu";
                that.common.postUrl(url,obj,function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "操作成功"
                        });
                         that.$emit('clostToOther',that.$route.meta.id);
                    }
                });
            });
        },
        reconsitutionData(list){
            let menuOne = [];
            let menuTwo = [];
            let menuThree = [];
            list.forEach(el => {
                let children = this.common.copyObj(el.children);
                delete el.children;
                menuOne.push(el);
                children.forEach(item => {
                    let children = this.common.copyObj(item.children);
                    delete item.children;
                    menuTwo.push(item);
                    menuThree = menuThree.concat(children);
                });
            })            
            let obj ={};
            obj.menuOne = JSON.stringify(menuOne);
            obj.menuTwo = JSON.stringify(menuTwo);
            obj.menuThree = JSON.stringify(menuThree);
            return obj;
        },
        cancel:function () {
            let that = this;
            that.$emit('clostToOther', that.$route.meta.id);
        },
        addMenuOne(list){
            let obj = {
                urlId:this.getTime(),
                urlName:"",
                tier:1,
                pId:'-1',
                children:[
                    {
                        urlId:this.getTime()+1,
                        urlName:"",
                        tier:2,
                        pId:this.getTime(),
                        children:[
                            
                        ]
                    }
                ]
            }
            list.push(obj)
        },
        delMenuOne(item,list){
            list.forEach((el,index) => {
                if(el.urlId == item.urlId){
                    list.splice(index,1);
                }
            })
            // this.resetUrlId(list);
        },
        addMenuTwo(item){
            let obj = {
                urlId:this.getTime(),
                urlName:"",
                tier:2,
                pId:item.urlId,
                children:[
                    
                ]
            }
            item.children.push(obj);
        },
        delMenuTwo(item,item2,list){
            item.children.forEach((el,index) => {
                if(el.urlId == item2.urlId){
                    item.children.splice(index,1);
                }
            })
            // this.resetUrlId(list);
        },
        delMenuThree(item2,item3){
            item2.children.forEach((el,index) => {
                if(el.urlId == item3.urlId){
                    item2.children.splice(index,1);
                }
            })
        },
        openPopover(data){
            this.hideDialog();
            data.showPopover = true;
            this.$forceUpdate();
        },
        selectMenu(data,item,list){
            let menuTree = this.common.copyObj(item);
            this.isHaveMenuThree = false;
            this.haveMenuThree(list,menuTree.urlId);
            if(this.isHaveMenuThree){
                this.$message.error("改子菜单已存在")
                return;
            }
            // for(let el of data.children){
            //     if(el.urlId==menuTree.urlId){
            //         this.$message.error("改子菜单已存在")
            //         return;
            //     }
            // }
            menuTree.pId = data.urlId;            
            data.children.push(menuTree);
            this.$set(data,"showPopover",false);            
        },
        //深层遍历查询菜单是否已选择
        haveMenuThree(list,id){
            list.forEach((item,index) => {
                if(item.urlId==id){
                    this.isHaveMenuThree = true;
                }else if(this.common.isNotBlank(item.children)){
                    this.haveMenuThree(item.children,id);
                }
            })
        },
        hideDialog(){
            this.advancedList.forEach(el => {
                if(el.children.length>0){
                    el.children.forEach(item => {
                        item.showPopover = false;
                    })
                }
            })
            this.middleList.forEach(el => {
                if(el.children.length>0){
                    el.children.forEach(item => {
                        item.showPopover = false;
                    })
                }
            })
            this.lowList.forEach(el => {
                if(el.children.length>0){
                    el.children.forEach(item => {
                        item.showPopover = false;
                    })
                }
            })
            this.$forceUpdate();
        },
        getSubPageData(){   //子页面是提供给外部获取数据
            let obj = {}
            // 低级
            if(this.userlevel==3){
                let lowList = this.common.copyObj(this.lowList);
                obj = this.reconsitutionData(lowList);
                obj.level = 3;
            }
            // 中级
            if(this.userlevel==2){
                let middleList = this.common.copyObj(this.middleList);
                obj = this.reconsitutionData(middleList);
                obj.level = 2;
            }
            // 高级
            if(this.userlevel==1){
                let advancedList = this.common.copyObj(this.advancedList);
                obj = this.reconsitutionData(advancedList);
                obj.level = 1;
            }
            return obj;
        },
        stopBub(){
            return false;
        },
        //重设urlId
        resetUrlId(list){
            this.echoList(list)
        },
        echoList(list,pId){
            if(this.common.isBlank(pId)) pId = '';
            list.forEach((item,index) => {
                item.urlId = pId + '' + (index+1);
                if(item.children.length>0){
                    this.echoList(item.children,item.urlId);
                }
            })
        },
        //获取时间戳
        getTime(){
            return new Date().getTime();
        }
    },
    watch:{
        clientGrade(value){
            this.userlevel = value+'';
        }
    }
}