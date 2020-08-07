export default {
    name: 'sysOrderClientPack',
    data() {
        return {
            customerTenantId : this.common.getCookie("tenantId"), 
            pTenantId : this.common.getCookie("pTenantId"),  // 平台ID
            itemTem:{
                flowId:"",
                boxName:"",
                boxLength:"",
                boxWidth:"",
                boxHeight:"",
                boxWeight:"",
                boxVolume:"",
                codeValue:"",
                codeName:"",
                codeType:"ORD_PACK_TYPE",
                codeTypeAlias:"客户大小箱规格设置",
                codeDesc:"", // 箱子名称|长,宽,高|毛重|体积
            },
            packingList:[
                {
                    flowId:"",
                    boxName:"",
                    boxLength:"",
                    boxWidth:"",
                    boxHeight:"",
                    boxWeight:"",
                    boxVolume:"",
                    codeValue:"",
                    codeName:"",
                    codeType:"ORD_PACK_TYPE",
                    codeTypeAlias:"客户大小箱规格设置",
                    codeDesc:"", // 箱子名称|长,宽,高|毛重|体积
                },
                {
                    flowId:"",
                    boxName:"",
                    boxLength:"",
                    boxWidth:"",
                    boxHeight:"",
                    boxWeight:"",
                    boxVolume:"",
                    codeValue:"",
                    codeName:"",
                    codeType:"ORD_PACK_TYPE",
                    codeTypeAlias:"客户大小箱规格设置",
                    codeDesc:"", // 箱子名称|长,宽,高|毛重|体积
                },
            ],
            // 平台设置大小箱结果
            packingListTem:[],
             // 客户设置大小箱结果
            currentPackingListTem:[],
        }
    },
    mounted() {
        this.doQuery();
    },
    methods: {
        //静态数据查询
        doQuery : function () {
            let that = this;
            let url = "api/sysStaticDataBO.ajax?cmd=query";
            let params ={};
            params.codeType = "ORD_PACK_TYPE";
            that.common.postUrl(url,params,function (data) {
                let items = data.items
                that.currentPackingListTem= [];
                if(that.common.isNotBlank(items)){
                    for(let i in items){
                       if(items[i].tenantId == that.pTenantId || items[i].tenantId == -1){
                          that.packingListTem.push(items[i]);
                       }else{
                          that.currentPackingListTem.push(items[i]);
                       }
                    }
                    that.checkPackingList(that.currentPackingListTem);
                }
            });
        },
        // 设置数据
        checkPackingList:function(arrs){
          let that = this;
          if(that.common.isBlank(arrs) || arrs.length < 1){
              return;
          }
          that.packingList = [];
          for(let i in arrs){
              let arr = arrs[i];
              let data = {};
              data.flowId = arr.flowId;
              data.codeValue = arr.codeValue;
              data.codeName = arr.codeName;
              data.codeType = arr.codeType;
              data.codeTypeAlias = arr.codeTypeAlias;
              let codeDesc = arr.codeDesc;
              if(that.common.isBlank(codeDesc)){
                  continue;
              }
              let descs = codeDesc.split("\|");
              if(descs.length < 3){
                  continue;
              }
              data.boxName = descs[0];
              data.boxWeight = descs[2];
              if(descs.length > 3){
                data.boxVolume = descs[3];
              }
              let lwh =  descs[1];
              if(that.common.isNotBlank(lwh)){
                 let lwhs = descs[1].split(",")
                 if(lwhs.length == 3){
                    data.boxLength = lwhs[0];
                    data.boxWidth = lwhs[1];
                    data.boxHeight = lwhs[2];
                 }
              }
              that.packingList.push(data);
              
             
          }
          that.addItem();
        },
        saveOrUpdate:function (params,index) {
            let that = this;
            let url = "api/sysStaticDataBO.ajax?cmd=saveOrUpdate";
            if(that.common.isBlank(params.boxName)){
                that.$message({ type: 'success',message: "未输入包装箱名"});
                return;
            }
            if(that.common.isBlank(params.codeName)){
                that.$message({ type: 'success',message: "未匹配到算费归类，请输入包装箱尺寸"});
                return;
            }
           
            params.codeDesc = params.boxName+ "|" + params.boxLength+","+ 
                            params.boxWidth+","+ params.boxHeight+"|"+ params.boxWeight+"|"+ params.boxVolume;
            that.common.postUrl(url,params,function (data) {
                that.doQuery();
                that.$message({ type: 'success',message: "自动保存成功"});
            });
        },

        // 匹配箱类型
        matchPackType : function(params,index){
            let that = this;
            if(that.common.isBlank(params.boxLength) ||
                          that.common.isBlank(params.boxWidth) ||  that.common.isBlank(params.boxHeight) ){
                return;
            }
            let packingList =  this.packingListTem;
            let volumeCm = parseFloat(params.boxLength) *   parseFloat(params.boxWidth)  *  parseFloat(params.boxHeight);
            params.boxVolume = (volumeCm /1000000).toFixed(4);
            for(let i in packingList){
               let codeDesc = packingList[i].codeDesc;
               if(that.common.isBlank(params.boxName)){
                   continue;
               }
               let descs = codeDesc.split("-"); // 0-1 立方
               if(descs.length == 2){
                   let begin = parseFloat(descs[0]) * 1000000;
                   let end = parseFloat(descs[1]) * 1000000;
                   if(volumeCm >= begin  && volumeCm < end){
                       // 匹配成功
                       params.codeName = packingList[i].codeName;
                       params.codeValue = packingList[i].codeValue;
                       params.codeType = packingList[i].codeType;
                       params.codeTypeAlias ="客户大小箱规格设置";
                       break;
                   }
               }
            }
            that.forceUpdate();
        },
        // 新增行
        addItem(){
            let copyItem = this.common.copyObj(this.itemTem);
            this.packingList.push(copyItem);
        },

        // 删除列
        deleteItem(params,index){
            let that = this;
            if(that.common.isBlank(params.flowId) || params.flowId <= 0){
                debugger
                this.packingList.splice(index,1); 
                return;
            }
            let url = "api/sysStaticDataBO.ajax?cmd=delete";
            that.common.postUrl(url,params,function (data) {
                that.doQuery();
                that.$message({ type: 'success',message: "删除成功"});
            });
        },
        calVolume(params,index){
            let that = this;
            if(that.common.isBlank(params.boxLength) ||
                that.common.isBlank(params.boxWidth) ||  that.common.isBlank(params.boxHeight) ){
                params.boxVolume = "";
                params.codeValue = "";
                params.codeName= "";
                
           }else{
              that.matchPackType(params,index);

              that.saveOrUpdate(params,index);
           }
           that.forceUpdate();
        },
        
        closeTab:function () {
            let that = this;
            that.$emit('clostToOther', that.$route.meta.id);
        },
        forceUpdate(){
            this.$forceUpdate();
          },
    }
}