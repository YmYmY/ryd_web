export default {
    name: 'fcCheckDes',
    beforeRouteEnter(to,from,next){        
        next(that => {
            //调用刷新方法
            that.doQuery();
        });
    },
    data() {
        return {
            desItemTypeList:[], // 类型
            items:[], //项目列表
            data:{
                desItemType:"",
                desItemName:""
            }
        }
    },
    mounted() {
        this.initSysStaticData();
        this.doQuery();
    },
    methods: {
      // 初始化静态数据
      initSysStaticData(){
         let that = this;
         let url = "api/sysStaticDataBO.ajax?cmd=getSysStaticDataSimpleByCodeTypes";
         let codeTypes = [];
         codeTypes.push("DES_ITEM_TYPE");
         that.common.postUrl(url,{"codeTypes":codeTypes.join(",")},function(data){
            that.desItemTypeList = data.DES_ITEM_TYPE;
        });
      },
      // 清除数据
      clear(){
        this.data = {
            desItemTypeName:"",
            desItemType:"",
            desItemName:""
        }
      },
      
      // 保存数据
      doSave(){
        let that = this;
        if(that.common.isBlank(that.data.desItemType)){
            that.$message({"type":"success", message: "请选择类型"});   
            return;
        }
        if(that.common.isBlank(that.data.desItemName)){
            that.$message({"type":"success", message: "请输入核销去向"});   
            return;
        }
        let url = "api/fcBaseBO.ajax?cmd=saveOrUpdateCheckDes";
        that.common.postUrl(url,that.data,function (data) {
            that.$message({"type":"success", message: "保存成功"});   
            that.clear();
            that.doQuery();
        });
      },
      // 查询数据
      doQuery(){
        let that = this;
        let url = "api/fcBaseBO.ajax?cmd=queryCheckDes";
        that.common.postUrl(url,{"state":1},function (data) {
           if(that.common.isBlank(data.items)){
               return;
           }
           let items = data.items;
           for(let i in items){
               items[i].defFlagTrue = false;
               if(items[i].defFlag == 1){
                  items[i].defFlagTrue = true;
               }
           }
           that.items = items;
           that.forceUpdate();
        });
      },
    // 删除
    deleteCheckDes(obj){
        let that = this;
        let data = {};
        data.id = obj.id;
        that.$confirm("确认删除【"+obj.desItemName+"】？", '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            let url = "api/fcBaseBO.ajax?cmd=deleteCheckDes";
            that.common.postUrl(url,data,function (data) {
                that.$message({"type":"success", message: "删除成功"});   
                that.doQuery();
            });
        });
   },
  // 更新状态
   updateDefaultCheckDes(obj){
        let that = this;
        let data = {};
        data.id = obj.id;
        let url = "api/fcBaseBO.ajax?cmd=updateDefaultCheckDes";
        that.common.postUrl(url,data,function (data) {
            that.$message({"type":"success", message: "设置默认成功"});   
            that.doQuery();
        });
   },

    cancel:function () {
        let that = this;
        that.$emit('clostToOther', that.$route.meta.id);
    },
    // 默认值 select BUG  @change="forceUpdate()"
    forceUpdate(){
         this.$forceUpdate();
    }
  }
}