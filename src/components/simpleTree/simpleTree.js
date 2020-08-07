/*
    treedata    树控件数据对象
    label       节点展示名称对应的字段
*/
export default {
    name: 'simpleTree',
    props:["treedata","label"],
    data() {
        return {
            
        }
    },
    mounted(){
        
    },
    methods:{
        //打开下个节点
        openTab(item){
            this.$set(item,"isShow",item.isShow?false:true);
        },
        //点击checkbox的逻辑处理
        checkItem(item){
            if(item.disabled) return;
            this.$set(item,"isChecked",item.isChecked?false:true);
            if(item.isChecked){
                this.selectItem(item);
            }
            if(this.common.isNotBlank(item.children)){
                this.selectEach(item.children,item.simulateId,item.isChecked);
            }
        },
        // 点击节点(往父组件冒泡)
        selectItem(item){
            this.$emit("selectItem",item);//往上递归触发方法
            this.treedata.forEach(el => {
                if(item.simulateId.indexOf(el.simulateId)==0){  //选中当前对象的所有子对象
                    this.$set(el,"isChecked",true);
                }
            })
        },
        /*
            点击节点的递归处理
            data        遍历的数据
            simulateId  当前点击对象的simulateId
            checked     当前点击对象是否被选中
        */
        selectEach(data,simulateId,checked){
            data.forEach(el => {
                if(el.simulateId.indexOf(simulateId)==0){   //选中父组件
                    this.$set(el,"isChecked",checked);
                }
                if(this.common.isNotBlank(el.children)){
                    this.selectEach(el.children,simulateId,checked);
                }
            });
        },
        hoverItem(item){
            this.$emit("hoverItem",item);
        },
        //获取选中的节点ID
        getCheckedKeys(){
            this.checkedList = [];
            this.getKeyEach(this.treedata);
            return this.checkedList
        },
        //递归获取选中的节点ID
        getKeyEach(data){
            data.forEach(el => {
                if(el.isChecked){
                    this.checkedList.push(el.urlId);
                }
                if(this.common.isNotBlank(el.children)){
                    this.getKeyEach(el.children);
                }
            });
        },
        //回显选中的节点
        setCheckedKeys(ids){
            this.setKeyEach(this.treedata,ids);
        },
        //递归回显选中的节点
        setKeyEach(data,ids){
            data.forEach(el => {
                if(ids.indexOf(el.urlId)>-1){
                    this.$set(el,"isChecked",true);                    
                }
                if(this.common.isNotBlank(el.children)){
                    this.setKeyEach(el.children,ids);
                }
            });
        },
        /*
            递归新增simulateId字段,记录所有父级id
            格式为:'1-2-3-4-5',5是当前id,4是父id,4是祖父id,如此类推
            data            遍历对象
            urlId           节点的id字段,默认是urlId
            childrenName    子节点的字段名称,默认children
            simulateId      父级的simulateId
        */
        setSimulateId(data,urlId="urlId",childrenName="children",simulateId){
            data.forEach(el => {
                if(this.common.isNotBlank(simulateId)){
                    el.simulateId =  simulateId + '-' + el[urlId];
                }else{
                    el.simulateId = el[urlId].toString();
                }
                //有子节点时进行递归
                if(this.common.isNotBlank(el[childrenName])&&el[childrenName].length>0){
                    this.setSimulateId(el[childrenName],urlId,childrenName,el.simulateId);
                }
            });
        },
    },
    watch:{
        treedata:{
            handler(n,o){
                if(this.common.isBlank(o)||o.length==0){ //第一次赋值时递归赋值simulateId字段
                    this.setSimulateId(n);
                }
            }
        }
    }
}