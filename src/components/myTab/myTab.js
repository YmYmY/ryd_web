export default {
    name: 'myTab',
    data(){
        return{
            tabs:[],
            tabW:0, //菜单栏总宽度
            showArrow:false,   //是否展示左右点击滚动按钮
        }
    },
    mounted(){
        
    },
    methods:{
        openTab(item){
            //urlType为1时是不可打开的菜单
            if(this.common.isBlank(item.urlPathName)&&item.urlType==1) return;
            if(this.common.isBlank(item.formerPath)){
                item.formerPath = item.urlPathName;
            }
            if(item.urlPathName.indexOf(item.urlId)==-1){
                item.urlPathName = item.urlPathName+"_"+item.urlId;
            }
            //添加路由
            this.$router.addRoutes([{
                path: item.urlPathName,
                name: item.urlName,
                params:item.params,
                component: () => import(`@/page${item.urlPath}`),
                meta:{
                    keep:true,
                    id:item.urlId,
                    path:item.formerPath,
                    parentPath:this.$route.path,
                    parentId:this.$route.meta.id
                }
            }])
            this.$router.push({path:item.urlPathName,query: item.query});
            //路由渲染是异步，需要异步处理不然属性会加载到路由上面
            this.$nextTick(() => {
                this.$route.meta.keep = true;
            })
            /* 路由异常错误处理，尝试解析一个异步组件时发生错误，重新渲染目标页面 */
            let _this = this;
            this.$router.onError((error) => {
                console.log(error);
                const pattern = /Loading chunk (\d)+ failed/g;
                const isChunkLoadFailed = error.message.match(pattern);
                const targetPath = router.history.pending.fullPath;
                console.log(targetPath);
                console.log("捕获到js丢失");
                _this.$confirm('发现系统更新，是否刷新页面，以便下一步操作', '提示', {
                    confirmButtonText: '刷新页面',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let time = new Date().getTime();
                    let href = "/index.html?v="+time;
                    window.location.href = href;
                }).catch(() => {
                    _this.tabs.forEach((obj,index) => {
                        if (obj.urlId == item.urlId) {
                            this.$set(obj,"active",true);
                            isHaveItem = true;
                            itemIndex = index;
                        }
                    })
                });
                if (isChunkLoadFailed) {
                    _this.$router.replace(targetPath);
                }
            });            

            //tab栏逻辑
            this.$set(item,"active",true);
            let isHaveItem = false;
            let itemIndex = '';
            this.tabs.forEach((obj,index) => {
                this.$set(obj,"active",false);
                if (obj.urlId == item.urlId) {
                    this.$set(obj,"active",true);
                    isHaveItem = true;
                    itemIndex = index;
                }
            })
            if (!isHaveItem) this.tabs.push(item);
            this.$emit("isShowMenuPage",true);  //展示菜单页面
            this.saveTab(item); //保存页面信息
            this.calcTab(itemIndex);//计算tab栏是否溢出
        },
        changeTab(index){
            if(index==-1){  //tab栏空时处理
                this.tabs = [];
                this.$router.push('/');
                this.$forceUpdate();
                this.$emit("isShowMenuPage",false); //隐藏菜单页面
                return
            }
            let item = this.tabs[index];
            this.tabs.forEach(obj => {
                this.$set(obj,"active",false);
            });
            this.$set(item,"active",true);
            this.$router.push({path:item.urlPathName,query: item.query});
            this.saveTab(item);
        },
        close(id,toParentId){
            let toIndex = null;
            this.$route.meta.keep = false;
            for(let index in this.tabs){
                let el = this.tabs[index];
                if(this.common.isNotBlank(toParentId)&&toParentId==el.urlId){
                    toIndex = index;
                }
                if(el.urlId == id){
                    if(this.common.isNotBlank(toIndex)){
                        this.changeTab(toIndex)
                    }else if(index==0&&this.tabs.length>1){
                        this.changeTab(1)
                    }else{
                        this.changeTab(index-1)
                    }
                    this.tabs.splice(index,1)
                    break;
                }
            }
            this.calcTab();
        },
        calcTab(itemIndex){
            let _this = this;
            // 延时执行让dom渲染出来
            let timer = setTimeout(() => {                
                _this.$refs.scrollTab.style.left = 0;    //先重置位置
                let tabsW = _this.$refs.myTab.offsetWidth;   //tab栏总长度
                _this.tabW = 0;
                let currentPos = 0;   //当前tab的位置
                _this.tabs.forEach((item,index) => {
                    if(_this.common.isNotBlank(itemIndex)&&itemIndex==index){
                        currentPos = _this.tabW -15;
                    }
                    _this.tabW += _this.$refs['tab'+index][0].offsetWidth+15;
                });
                //宽度溢出的时候
                if(tabsW<this.tabW){
                    _this.$refs.scrollTab.style.left = (tabsW-_this.tabW)+'px';
                    _this.showArrow = true;
                }else{
                    _this.showArrow = false;
                }
                //当存在已经打开的tab时，跳转其位置
                if(currentPos+(tabsW-_this.tabW)<0&&_this.common.isNotBlank(itemIndex)){
                    _this.$refs.scrollTab.style.left = -currentPos+'px';
                }
                clearTimeout(timer);
            }, 300);
        },
        //tab溢出时往左移动
        moveLeft(){
            let scrollTab = this.$refs.scrollTab;  //整个tab栏对象
            let left = Number(scrollTab.style.left.replace(/px/,''));   //获取left的数值
            if(left<-100){
                scrollTab.style.left = (left+100)+'px';
            }else{
                scrollTab.style.left = 0
            }
        },
        //tab溢出时往右移动
        moveRight(){
            let tabsW = this.$refs.myTab.offsetWidth;   //tab栏总长度
            let scrollTab = this.$refs.scrollTab;
            let left = Number(scrollTab.style.left.replace(/px/,''));
            if(tabsW-left<this.tabW-100){
                scrollTab.style.left = (left-100)+'px';
            }else{
                scrollTab.style.left = tabsW - this.tabW;
            }
        },
        //保存最后打开的页面信息
        saveTab(item){
          localStorage.setItem("pageInfo",JSON.stringify(item));  
        }
    }
}