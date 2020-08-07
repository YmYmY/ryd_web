export default {
    name: 'fcItem',
    beforeRouteEnter(to,from,next){        
        next(that => {
            //调用刷新方法
            that.doQuery();
        });
    },
    data() {
        return {
            balDireList:[], // 类型
            items:[], //项目列表
            itemsTem:[],
            data:{
                balDire:"",
                levleOne:"",
                itemName:"",
                itemCode:"",
                remarks:""
            },
            query:{
                state:"1",
            },
            currentItem:{},
        }
    },
    mounted() {
        this.initSysStaticData();
    },
    methods: {
      // 初始化静态数据
      initSysStaticData(){
         let that = this;
         let url = "api/sysStaticDataBO.ajax?cmd=getSysStaticDataSimpleByCodeTypes";
         let codeTypes = [];
         codeTypes.push("BAL_DIRE");
         that.common.postUrl(url,{"codeTypes":codeTypes.join(",")},function(data){
            that.balDireList = data.BAL_DIRE;
        });
      },
      //展开子节点
      openChildTree(item){
        let that = this;
        let items = that.items;
        if(that.common.isBlank(items) || items.length <= 0){
            return;
        }
        item.havingOpenChild = true; // 已经打开下级节点 （默认关闭）
        for(let i in items){
            if(items[i].parentItem == item.itemCode){
                items[i].havingShowRow = true; // 是否展示当前行
            }
            if(items[i]["itemCode"+item.itemLevel] == item.itemCode && items[i].itemCode != item.itemCode){
               if(items[i].havingChild){
                  items[i].havingOpenChild = false;
               }
            }  
        }
        that.forceUpdate();
      },
      //关闭子节点 （一层）
      closeChildTree(item){
        let that = this;
        let items = that.items;
        if(that.common.isBlank(items) || items.length <= 0){
            return;
        }
        item.havingOpenChild = false; // 已经打开下级节点 （默认关闭）
        for(let i in items){
               if(items[i]["itemCode"+item.itemLevel] == item.itemCode && items[i].itemCode != item.itemCode){
                   items[i].havingShowRow = false; // 是否展示当前行
                   if(item.havingOpenChild){
                      items[i].havingOpenChild = false;
                   }
               }
                
        }
        that.forceUpdate();
      },
       //全部展开
       openTree(){
        let that = this;
        let items = that.items;
        if(that.common.isBlank(items) || items.length <= 0){
            return;
        }
        for(let i in items){
            items[i].havingOpenChild = true; // 已经打开下级节点 （默认关闭）
            items[i].havingShowRow = true; // 是否展示当前行
        }
        that.forceUpdate();
      },
      //全部关闭
      closeTree(){
        let that = this;
        let items = that.items;
        if(that.common.isBlank(items) || items.length <= 0){
            return;
        }
        for(let i in items){
            items[i].havingOpenChild = false; // 已经打开下级节点 （默认关闭）
            if(items[i].itemLevel == 1){
              continue;
            }           
            items[i].havingShowRow = false; // 是否展示当前行
        }
        that.forceUpdate();
      },
      // 清除数据
      clear(){
        this.data = {
            parentItem : this.currentItem.itemCode,
            parentItemName : this.currentItem.itemName,
            balDire:this.currentItem.balDire+"",
            levleOne:"",
            itemName:"",
            remarks:""
        }
      },
      // 点击 科目
      clickItem(item){
         if(item.state == 0){
           return;
         }
         this.currentItem = item;
         this.data.parentItem = item.itemCode;
         this.data.parentItemName = item.itemName;
         this.data.balDire = item.balDire+""; // 默认上级科目方向
         this.data.levelOne = "";
         this.data.itemCode = "";
         this.data.itemName = "";
         this.data.remarks = "";
         this.forceUpdate();
      },
      // 选择科目
      selectLevel(level){
          this.data.itemCode = "";
          this.data.levelOne = level+"";
          if(level == 2){
              if(this.common.isBlank(this.data.parentItem)){
                this.$message({"type":"success", message: "请先点击需要在哪个科目新增下级"});   
                this.data.levelOne = "";
                return;
              }
              this.queryAutoItemCode(this.data.parentItem);
          }
      },
       // 生成科目代码
      queryAutoItemCode(parentItem){
            let that = this;
            if(that.common.isBlank(parentItem)){
                return;
            }
            let query = {};
            query.parentItem = parentItem;
            let url = "api/fcBaseBO.ajax?cmd=queryAutoItemCode";
            that.common.postUrl(url,query,function (data) {
                that.$message({"type":"success", message: "自动生成科目代码成功"});   
                that.data.itemCode = data;
                that.forceUpdate();
            });
      },
      // 保存数据
      doSave(){
        let that = this;
        if(that.common.isBlank(that.data.levelOne)){
            that.$message({"type":"success", message: "请选择是增加一级科目 或者下级科目"});   
            return;
        }
        if((that.common.isBlank(that.currentItem) || that.common.isBlank(that.currentItem.itemCode)) && that.data.levelOne == 2){
            that.$message({"type":"success", message: "请重新点击科目，自动刷新"});   
            return;
        }
        if(that.common.isBlank(that.data.parentItem) && that.data.levelOne == 2){
            that.$message({"type":"success", message: "请重新点击需要处理科目"});   
            return;
        }
        if(that.common.isBlank(that.data.itemCode)){
            that.$message({"type":"success", message: "科目编码未生成"});   
            return;
        }
        if(that.common.isBlank(that.data.itemName)){
            that.$message({"type":"success", message: "请输入科目名称"});   
            return;
        }
        if(that.common.isBlank(that.data.balDire)){
            that.$message({"type":"success", message: "请选择借贷方向"});   
            return;
        }
        if(that.data.levelOne == 1){
            that.data.itemLevel = 1;
            that.data.parentItem = "";
        }else{
            that.data.itemLevel = parseInt(that.currentItem.itemLevel) + 1;
            for(let i = 1;i <= that.data.itemLevel-1;i++){
                that.data["itemCode"+i]  = that.currentItem["itemCode"+i];
            }
        }
        if(that.data.itemLevel > 4){
            that.$message({"type":"success", message: "最多增加到科目4"});   
            return;
        }
        that.data["itemCode"+that.data.itemLevel] = that.data.itemCode;
        let url = "api/fcBaseBO.ajax?cmd=saveOrUpdateItem";
        that.common.postUrl(url,that.data,function (data) {
            that.$message({"type":"success", message: "保存科目【"+that.data.itemName+"】成功"});  
            that.dataTem = that.common.copyObj(that.data); 
            that.clear();
            that.doQuery("add",that.dataTem);
        });
      },
      // 查询数据
      doQuery(flag,itemObj){
        let that = this;
        let url = "api/fcBaseBO.ajax?cmd=queryItems";
        this.query.state = "1";
        if("all" == flag){
            this.query.state = "";
        }
        // 旧对象值
        that.itemsTem = that.common.copyObj(that.items);
        that.common.postUrl(url,this.query,function (data) {
           if(that.common.isBlank(data.items)){
               return;
           }
           let items = data.items;
           if("all" == flag){
              that.items = that.treeData(items,null,null);
              that.openTree(); // 打开所有
           }else{
              // 新增 或者删除 (查询) 还原
              that.items = that.treeData(items,that.itemsTem,itemObj);
           }
           that.forceUpdate();
        });
      },

    // 删除
    deleteItem(obj){
        let that = this;
        let data = {};
        data.id = obj.id;
        that.$confirm("确认删除【"+obj.itemName+"】？", '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            let url = "api/fcBaseBO.ajax?cmd=deleteItem";
            that.common.postUrl(url,data,function (data) {
                that.$message({"type":"success", message: "删除成功"});   
                that.doQuery("delete");
            });
        });
   },
   // 导出
   exportItem(){
      let queryUrl = "api/fcBaseBO.ajax?cmd=queryItems";
      let params = {"state":1};
      let excelLables = "科目一,科目二,科目三,科目四,科目代码,借贷方向,备注";
      let excelKeys = "itemCode1Name,itemCode2Name,itemCode3Name,itemCode4Name,itemCode,balDireName,remarks";
      this.common.downloadExcelFile(queryUrl,params,excelLables,excelKeys,"exportItemTable",true)
      this.$message({"type":"success", message: "导出执行中。。。。。。"});   
    },
    // 默认值 select BUG  @change="forceUpdate()"
    forceUpdate(){
         this.$forceUpdate();
    },
    // 处理初始化树
    treeData(items,itemsTem,dataObj){

        let that = this;
        if(that.common.isBlank(items) || items.length <= 0){
            return [];
        }
        // <!-- // 我是否存在下级 -->
        // <!-- // 是否已经展开 -->
        for(let i in items){
            let currentItemCode = items[i].itemCode;
            items[i].havingChild = false; // 存在子节点
            items[i].havingOpenChild = false; // 已经打开下级节点 （默认关闭）
            items[i].havingShowRow = false; // 是否展示当前行
            if(items[i].itemLevel == 1){
                // 默认展示  1级默认展示
                items[i].havingShowRow = true; 
            }
            for(let j in items){
                if(items[j].parentItem == currentItemCode){
                    items[i].havingChild = true;
                }
            }
             // 还原展示-旧数据
            if(that.common.isNotBlank(itemsTem)){
                for(let j in itemsTem){
                    if(itemsTem[j].havingShowRow && itemsTem[j].itemCode == items[i].itemCode){
                        items[i].havingShowRow = true; // 还原展示 行
                        if(items[i].havingChild && items[i].havingShowRow && itemsTem[j].havingOpenChild){
                            items[i].havingOpenChild = true; // 还原展示打开图标
                        }
                    }
                }
            }
        }

        
        // 还原展示 新增行
        if(that.common.isNotBlank(dataObj)){
            // 对于新增行 处理(同行)
            for(let i in items){
                if(dataObj.parentItem == items[i]["itemCode"+(dataObj.itemLevel-1)]){
                    if(dataObj.parentItem == items[i].parentItem){
                        items[i].havingShowRow = true; // 展示新增行 （和同级）
                    }
                }
                if(dataObj.parentItem == items[i].itemCode){
                    if(!items[i].havingOpenChild){
                        items[i].havingOpenChild = true; // 还原展示打开图标 (新增)
                    } 
                }
            }
         }
        return items;
    },
  }
}