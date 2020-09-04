import drag from 'vue-draggable-resizable'
export default {
    name: 'definitionTemplate',
    data(){
        return{
            printConfig:{

            },
            defaultH:24,
            dragList:[
            ],
            dragRightList:[
                {
                    name:"上楼费",
                },
                {name:"运费"},
                {name:"手续费"},
                {name:"其他费"},
            ],
            dragRightTopDistance:38,    //工具栏列表离盒子顶部距离（top+表头高度）
            distance:0,
        }
    },
    mounted(){
        this.initDragList();
        this.$nextTick(() => {
            this.initDomInfo();
        })
    },
    methods:{
        //计算各盒子的宽度
        initDomInfo(){  
            this.dragBoxW = this.$refs.dragBox.offsetWidth;  //整个盒子的宽度
            this.dragBgW = this.$refs.dragBg.offsetWidth;    //运单盒子的宽度
            this.dragListW = this.$refs.dragList.offsetWidth;    //控件工具栏宽度
            this.distance = this.dragBoxW - this.dragBgW - this.dragListW;     //控件工具栏与运单盒子的距离
            console.log(this.distance);
        },
        initDragList(){
            this.dragList.forEach(item => {
                item.itemHeight = this.defaultH;
                item.itemWidth = 100;
            })
            this.dragRightList.forEach(item => {
                item.itemHeight = this.defaultH;
                item.itemWidth = 100;
            })
            this.initDragRightList();
            this.$forceUpdate();
        },
        // 初始化工具栏列表位置
        initDragRightList(){
            this.dragRightList.forEach((item,index) => {
                // item.topOffset = this.defaultH*index-0.01;
                // item.leftOffset = (item.leftOffset?item.leftOffset:0.01)-0.01;
                item.topOffset = this.defaultH*index;
                item.leftOffset = 0;
            })
        },
        onDragStartCallback(item,index){
            //点击时记录当前项的选项，currentItem用于修改，currentItemCache用于还原位置
            this.currentItem = item;
            this.currentItemCache = this.common.copyObj(item);
            this.currentIndex = index;
            console.log(this.currentItem);
        },
        
        onDragEndRightCallback(item,index){
            // debugger
            //结束移动判断位置，不在模板内则还原位置
            if(item.leftOffset+this.distance>0){
                //drag内部watch监听，所以需要改变值才能触发改变
                item.leftOffset = this.currentItemCache.leftOffset-0.01;
                item.topOffset = this.currentItemCache.topOffset-0.01;
            }else{
                // 复制对象给到模板数组
                let leftItem = this.common.copyObj(item);
                leftItem.leftOffset = this.dragBoxW - this.dragListW + item.leftOffset;
                leftItem.topOffset = item.topOffset + this.dragRightTopDistance;
                this.dragList.push(leftItem);
                //删除工具栏列表对应项
                this.dragRightList.splice(index,1);
                let dragRightList = this.common.copyObj(this.dragRightList);
                // 清空再重新赋值（控件问题，不清空会存在缓存导致index+1的项位置错乱）
                this.dragRightList = [];
                this.initDragRightList();
                let _this = this;
                const timer = setTimeout(()=>{
                    _this.dragRightList = _this.common.copyObj(dragRightList);
                    _this.initDragRightList();
                    clearTimeout(timer);
                },10)
            }
            this.$forceUpdate();
        },
        onDragEndLeftCallback(item,index){
            // debugger
            // 当移动距离超出印单盒子，侧放到右侧工具栏
            if(item.leftOffset>this.dragBgW){
                this.dragList.splice(index,1);
                this.dragRightList.push(item);
                this.initDragRightList();
                this.$forceUpdate();
            }
        },
        onDragCallback(x,y){
            this.currentItem.leftOffset = x;
            this.currentItem.topOffset = y;
        }
    },    
    components:{
        drag
    }
}