export default {
    name: 'sysOrderPack',
    data() {
        return {
            packingList:[
                {  
                    flowId:"",
                    minVolume:"0",
                    maxVolume:"",
                    codeValue:"1",
                    codeName:"小箱",
                    codeType:"ORD_PACK_TYPE",
                    codeTypeAlias:"大小箱规格设置",
                },
                {  
                    flowId:"",
                    minVolume:"",
                    maxVolume:"",
                    codeValue:"2",
                    codeName:"中箱",
                    codeType:"ORD_PACK_TYPE",
                    codeTypeAlias:"大小箱规格设置"
                },
                {   
                    flowId:"",
                    minVolume:"",
                    maxVolume:"99999",
                    codeValue:"3",
                    codeName:"大箱",
                    codeType:"ORD_PACK_TYPE",
                    codeTypeAlias:"大小箱规格设置"
                }
            ],
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
                if(that.common.isNotBlank(items)){
                    // 填充数据
                    for(let i in items){
                         for(let j in that.packingList){
                           let p = that.packingList[j];
                           if(p.codeValue == items[i].codeValue){
                                let codeDesc = items[i].codeDesc;
                                that.packingList[j].flowId = items[i].flowId;
                                if(that.common.isNotBlank(codeDesc)){
                                    let descs = codeDesc.split("-");
                                    if(descs.length > 1){
                                        that.packingList[j].minVolume = descs[0];
                                        that.packingList[j].maxVolume = descs[1];
                                    }
                                }
                           }
                         }
                        
                    }
                }
            });
        },
        saveOrUpdate:function (params,index) {
            let that = this;
            let url = "api/sysStaticDataBO.ajax?cmd=saveOrUpdate";
            if(that.common.isBlank(params.minVolume) || that.common.isBlank(params.maxVolume)){
                return;
            }
            params.codeDesc = params.minVolume + "-" + params.maxVolume;
            that.common.postUrl(url,params,function (data) {
                that.doQuery();
                setTimeout(function(){
                    that.setNextVoulme(index);
                    that.forceUpdate();
                },100);
                that.$message({ type: 'success',message: params.codeName+"，自动保存成功"});
               
            });
        },
        // 设置下面数据
        setNextVoulme : function(index){
          let that = this;
          if(index < 2){
              if(that.packingList[index].maxVolume != that.packingList[index+1].minVolume){
                 for(let i = index+1;i < that.packingList.length;i++ ){
                    that.packingList[i].maxVolume = "";
                    that.packingList[i].minVolume = "";
                 }
                 that.packingList[index+1].minVolume = that.packingList[index].maxVolume;
                 if(that.common.isBlank(that.packingList[that.packingList.length-1].maxVolume)){
                    that.packingList[that.packingList.length-1].maxVolume = "9999";
                 }   
                 debugger    
              }
          }
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