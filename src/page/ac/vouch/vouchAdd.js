
  export default {
    name: 'vouchAdd',
    props:['checkOrders','dialog'],
    data() {
      return {
        checkFlag :false, //核销进入 （不可修改金额）
        modifyFlag :false, //是否修改
        check:{
          vouchBatchSeq: "",
          vouchNo: "",
          vouchDate: "",
          regionName : this.common.getCookie("orgName"),
          recoderName: this.common.getCookie("userName"),
          recoderId: this.common.getCookie("userId"),
          expenseOrgName:"",
          expenseOrgId:"",
          recepitNo:"",
          manualNo:"",
          invoiceNo:"",
          checkNo:"",
          expenseUser:"",
          auditUser:"",
        },
        desItemList:[],
        desItemListTem:[],
        itemList:[],
        itemListTem:[],
        oragnizeList:[],
        vouchList:[
          {
            moneyInputFlag : false, //输入框控制
            numbers:"",
            desItemName:"",
            desItemId:"",
            itemName:"",
            itemCode:"",
            check1:"",
            check2:"",
            check3:"",
            check4:"",
            check5:"",
            check6:"",
            check7:"",
            check8:"",
            check9:"",
            check10:"",
            subject:"",
            showItemList:false,
            checkMoney:"",
            moneyInputFocus:false
          },

        ],
        vouchListTem:[],
      }
    },
    mounted() {
      let that = this;
      this.vouchListTem =  this.common.copyObj(this.vouchList);
      this.check.vouchDate = this.common.formatTime(new Date,"yyyy-MM-dd");
      this.initOtherData();
      if(this.dialog){
         this.check.sourceType = 1;
         this.queryAuthVouchNo();
         this.initRows();
         this.dialogView();
         // 核销新增（初始化项目）
         setTimeout(function(){
            that.initProject();
         },500);
      }else{
        // 修改或者 新增日记账过来
        this.initModifyOrSave();
      }
      
    },
  
    methods: { 
       // 核销新增（初始化项目）-默认
      initProject(){
        let checkType = this.checkOrders.checkType;
        // 默认配置
        // DEFAULT_CHECK_ITEM_CODE
        let that = this;
        let url = "api/sysStaticDataBO.ajax?cmd=getSysStaticDataSimpleByCodeTypes";
        let codeTypes = [];
        codeTypes.push("DEFAULT_CHECK_ITEM_CODE");
        that.common.postUrl(url,{"codeTypes":codeTypes.join(",")},function(data){
           let items = data.DEFAULT_CHECK_ITEM_CODE;
           let selectItemCode = "";
           for(let i in items){
                if(checkType == items[i].codeValue){
                   selectItemCode = items[i].codeName
                }
           }
           if(that.common.isNotBlank(selectItemCode) && that.itemListTem.length > 0){
               for(let j in that.itemListTem){
                  if(that.itemListTem[j].itemCode == selectItemCode){
                     that.vouchList[0].itemName = that.itemListTem[j].itemName;
                     that.vouchList[0].itemCode = that.itemListTem[j].itemCode;
                     that.filterDesItems(that.itemListTem[j].balDire,that.vouchList[0]);
                  }
               }
           }

        });
      },
      // 过滤相同类型的方向 收支方向
      filterDesItems(balDire,vouch){
          let that = this;
          that.desItemList = [];
          for(let i in that.desItemListTem){
              if(balDire == that.desItemListTem[i].desItemType){
                 that.desItemList.push(that.desItemListTem[i]);
              }
          }
          // 默认 去向数据
          for(let j in that.desItemList){
             if(that.desItemList[j].defFlag == 1){
                vouch.desItemId = that.desItemList[j].id;
                vouch.desItemName = that.desItemList[j].desItemName;
             }
          }
          that.forceUpdate();
      },
      initModifyOrSave(){
          let that = this;
          let vouch = this.$route.query;
          that.check.sourceType = vouch.sourceType;
          if(that.check.sourceType == 1){
             that.checkFlag = true;
          }
          if(that.common.isNotBlank(vouch.vouchBatchSeq)){
            this.modifyFlag = true;
          }else{
            //获取凭证号
            this.queryAuthVouchNo();
          }
          if(this.modifyFlag){
            let params = {};
            params.vouchBatchSeq = vouch.vouchBatchSeq;
            params.vouchNo = vouch.vouchNo;
            let url = "api/fcVouchBO.ajax?cmd=queryVouch";
            that.common.postUrl(url,params,function(data){
               // 初始化数据
               let arrs = data.items;
               that.check = that.common.copyObjValue(that.check,arrs[0]);
               for(let i in arrs){
                  that.common.copyObjValue( that.vouchList[i],arrs[i]);
                  // 处理金额
                  let money = "0";
                  if(arrs[i].inSum > 0){
                     money = arrs[i].inSum+"";
                  }
                  if(arrs[i].outSumm > 0){
                      money = arrs[i].outSumm+"";
                  }
                  that.vouchList[i].checkMoney = (parseFloat(money)/100).toFixed(2);
                  that.checkBlurMoney(that.vouchList[i],money);
                  // 回选数据
                  that.vouchList[i].itemName = arrs[i].itemCode1Name;
                  if(that.common.isNotBlank(arrs[i].itemCode2Name)){
                     that.vouchList[i].itemName =  that.vouchList[i].itemName  + "-"+ arrs[i].itemCode2Name
                  }
                  if(that.common.isNotBlank(data.items[i].itemCode3Name)){
                      that.vouchList[i].itemName =  that.vouchList[i].itemName  + "-"+ arrs[i].itemCode3Name
                  }
                  if(that.common.isNotBlank(data.items[i].itemCode4Name)){
                      that.vouchList[i].itemName =  that.vouchList[i].itemName  + "-"+ arrs[i].itemCode4Name
                  }
               }
               that.caclSumFee();
               that.forceUpdate();
            });
          }
          this.initRows();
      }, 
      //初始化行数
      initRows(){
          let size = 1;
          if(this.check.sourceType == 2){
             size = 4;
          }
          this.vouchList = [];
          for(let i = 1;i<=size;i++){
             this.vouchList.push(this.common.copyObj(this.vouchListTem[0]));
          }
          this.forceUpdate();
      },
      // 核销进入处理
      dialogView(){
        this.checkFlag = true;
        this.check.orderMap = this.checkOrders; // 核销主参数
        console.log(this.checkOrders);
        let check = this.vouchList[0];
        for(let i =1;i <=10;i++){
            check["check"+i] = "";
        }
        check.numbers = "";
        check.desItemName = "";
        check.itemName = "";
        check.showItemList = false;
        // 填充数据
        check.checkMoney = this.checkOrders.totalSum;
        this.checkBlurMoney(check,this.checkOrders.totalSum);
       
      },
      // 表格金额处理
      checkBlurMoney(vouch,checkMoney){
        checkMoney = checkMoney+"";
        if(isNaN(checkMoney)){
            return;
        }
        let length = checkMoney.length;
        for(let i =10;i>=1;i--){
          vouch["check"+i] = "";
       }
        for(let i =length;i>=1;i--){
           vouch["check"+i] = checkMoney.substring(length-i,length-i+1);
        }
        // 合计总金额
        this.caclSumFee();
        this.forceUpdate();
        // debugger
      },
      // 计算费用
      caclSumFee(){
         let totalMoney = 0;
         let vouchList = this.vouchList;
         for(let i in vouchList){
             let vouch = this.vouchList[i];
             let totalMoneyRows = "";
             for(let j=10;j>=1;j--){
               totalMoneyRows = totalMoneyRows + (this.common.isBlank(vouch["check"+j]) ? "0" : vouch["check"+j]);
             }
             totalMoney = totalMoney + parseInt(totalMoneyRows);

         }
         this.check.totalMoney = (parseFloat(totalMoney) / 100).toFixed(2);
      },
    // 初始化其它数据
    initOtherData(){
      let params = {};
      params.oragnizeType = "";
      let that = this;
      // 核销部门
      that.common.postUrl("api/sysStaticDataBO.ajax?cmd=getSysOragnizeList",params,function(data){
         if(that.common.isNotBlank(data) && that.common.isNotBlank(data.items)){
            that.oragnizeList = data.items; 
            for(let i in that.oragnizeList){
               that.oragnizeList[i].oragnizeId = that.oragnizeList[i].oragnizeId+"";
            }
         }
       });
       that.queryItems();
       that.queryDesItems();
      },
      // 获取自动凭证号
      queryAuthVouchNo(){
        let params = {};
        let that = this;
        params.sourceType = that.check.sourceType;
        // 获取区域部门
        let url = "api/fcVouchBO.ajax?cmd=queryAuthVouchNo";
        that.common.postUrl(url,params,function(data){
          if(that.common.isNotBlank(data)){
            that.check.vouchNo = data;
            that.forceUpdate();
          }
        });
      },
      // 获取科目列表
      queryItems(){
        let that = this;
        let url = "api/fcBaseBO.ajax?cmd=queryItems";
        let params = {};
        params.state = "1";
        that.common.postUrl(url,params,function (data) {
          if(that.common.isBlank(data.items) || data.items.length <= 0){
            that.$message({"type":"success", message: "未配置科目，请在财务基础管理配置"});  
            return;
          }
          // 处理item
          for(let i in data.items){
              data.items[i].itemName = data.items[i].itemCode1Name;
              if(that.common.isNotBlank(data.items[i].itemCode2Name)){
                data.items[i].itemName =  data.items[i].itemName  + "-"+ data.items[i].itemCode2Name
              }
              if(that.common.isNotBlank(data.items[i].itemCode3Name)){
                data.items[i].itemName =  data.items[i].itemName  + "-"+ data.items[i].itemCode3Name
              }
              if(that.common.isNotBlank(data.items[i].itemCode4Name)){
                data.items[i].itemName =  data.items[i].itemName  + "-"+ data.items[i].itemCode4Name
              }
          }
          that.itemListTem =  data.items;
          that.itemList =  data.items;
        });
      },
      // 过滤器 
      filterItem(vouch){
        let that = this;
        let  itemName = vouch.itemName;
        that.itemList = [];
        for(let i in this.itemListTem){
          if(this.itemListTem[i].itemCode.indexOf(itemName) > -1 || this.itemListTem[i].itemName.indexOf(itemName) > -1){
               that.itemList.push(this.itemListTem[i]);
          }
        }
        this.forceUpdate();
      },
      // 获取去向
      queryDesItems(){
        let that = this;
        let url = "api/fcBaseBO.ajax?cmd=queryCheckDes";
        that.common.postUrl(url,{"state":1},function (data) {
           if(that.common.isBlank(data.items) || data.items.length <= 0){
               that.$message({"type":"success", message: "未配置去向，请在财务基础管理配置"});  
               return;
           }
           that.desItemListTem = data.items;
           that.desItemList = data.items;
        });
      },
      // 选择去向 回选
      selectDesItem(vouch){
         for(let i in this.desItemList){
           if(this.desItemList[i].desItemName == vouch.desItemName ){
               vouch.desItemId = this.desItemList[i].id;
           }
          }
         this.forceUpdate();
      },
      // 选择科目
      selectItem(item,vouch){
        vouch.itemCode = item.itemCode;
        vouch.itemName = item.itemName;
        this.$message({"type":"success", message: "选择科目["+vouch.itemName+"]成功"});  
        vouch.showItemList = false;
        this.filterDesItems(item.balDire,vouch);
        this.forceUpdate();
      },
      // 过滤科目
      keyupItem(vouch){
        this.filterItem(vouch);
        vouch.showItemList = true;
      },
      // 点击
      clickItem(vouch){
        vouch.showItemList = true;
        this.forceUpdate();
      },
      // 焦点离开关闭
      blurItem(vouch){
        let that = this;
        setTimeout(function(){
          vouch.showItemList = false;
          that.forceUpdate();
        },200);
      },
      // 选择核销部门
      selectOrg(item){
        this.check.expenseOrgName = item.oragnizeName;
        this.check.expenseOrgId = item.oragnizeId;
        this.forceUpdate();
      },
      // @keyup="KeyupItem()"  @blur="blurItem()"
      // 保存记账信息
      saveOrUpdate(){
        let that = this;
        let check = this.check;
        let vouchList = this.vouchList;
        if(check.sourceType == 1 &&  check.vouchSeq > 0){
           that.$message({"type":"success", message: "核销记账支持修改，请操作反核销操作"});  
        }
        if(that.common.isBlank(check.vouchDate)){
          that.$message({"type":"success", message: "请选择入账日期"});  
          return;
        }
        let vouchs = [];
        for(let i in vouchList){
           let vouch = vouchList[i];
           vouch.vouchSumMoney = "";
           for(let j=10;j>=1;j--){
               vouch.vouchSumMoney = vouch.vouchSumMoney + (that.common.isBlank(vouch["check"+j]) ? "0" : vouch["check"+j]);
           }
           if(i == 0 && that.common.isBlank(vouch.itemCode)){
             that.$message({"type":"success", message: "请选择会计科目"});  
             return;
           }
           if(i == 0 && that.common.isBlank(vouch.desItemId)){
              that.$message({"type":"success", message: "请选择去向"});  
              return;
           }
           if(i == 0 && (that.common.isBlank(vouch.vouchSumMoney) || vouch.vouchSumMoney <=0)){
              that.$message({"type":"success", message: "请输入金额"});  
              return;
           }
           if(i == 0 && that.common.isBlank(vouch.numbers)){
              // that.$message({"type":"success", message: "请输入单据数量"});  
              // return;
              vouch.numbers = 0;
           }
           if(i > 0 && that.common.isBlank(vouch.itemCode)){
               continue;
           }
           let n = parseInt(i) + 1;
           if(i > 0 && that.common.isBlank(vouch.desItemId)){
             that.$message({"type":"success", message: "第"+n+"行请选择去向"});  
             return;
           }
          //  debugger
           if(i > 0 && (that.common.isBlank(vouch.vouchSumMoney) || vouch.vouchSumMoney <=0)){
              that.$message({"type":"success", message: "第"+n+"行请输入金额"});  
              return;
           }
           if(i > 0 && that.common.isBlank(vouch.numbers)){
            //  that.$message({"type":"success", message: "第"+n+"行请输入单据数量"});  
            //  return;
            vouch.numbers = 0;
           }
           vouchs.push(vouch);
        }
        // if(that.common.isBlank(check.expenseOrgId)){
        //   that.$message({"type":"success", message: "请选择报销部门"});  
        //   return;
        // }
        check.vouchs = vouchs;
        let params = {};
        params.stringParams = JSON.stringify(check)
        // 获取区域部门
        let url = "api/fcVouchBO.ajax?cmd=saveOrUpdate";
        that.common.postUrl(url,params,function(data){
            if(that.common.isBlank( check.vouchBatchSeq)){
                check.vouchBatchSeq = -1;
            }
            let msg
            if(check.sourceType == 1){
                msg = check.vouchBatchSeq <= 0 ? "核销成功" : "修改核销记账成功";
            }else{
                msg = check.vouchBatchSeq <= 0 ? "记账成功" : "修改记账成功";
            }
            that.$message({"type":"success", message: msg});
            that.clear();
            if(check.sourceType == 1 &&  check.vouchBatchSeq <= 0){
               // 核销新增
               that.closeCurrentTab(null,that);
               return;
            }
            if(check.sourceType == 2 && check.vouchBatchSeq <= 0){
                 // 是否继续新增
                 that.$confirm(msg, '提示', {confirmButtonText: '继续新增日记账',cancelButtonText: '关闭',type: 'warning'
                  }).then(() => {
                     that.queryAuthVouchNo();
                  }).catch(() => {
                      //关闭
                      that.$emit('closeTab', that.$route.meta.id); 
                  });
            }else{
                that.$emit('closeTab', that.$route.meta.id); 
            }
          },null,null,true);


      },
      //清除数据
      clear(flag){
         this.check = {
           sourceType:this.check.sourceType,
           vouchDate: "",
           regionName : this.common.getCookie("orgName"),
           recoderName: this.common.getCookie("userName"),
           recoderId: this.common.getCookie("userId"),
           desItemName :"",
        }
        this.check.vouchDate = this.common.formatTime(new Date,"yyyy-MM-dd");
        if(flag == 1){
           // 继续登记
           this.queryAuthVouchNo();
        }
        this.initRows();
        this.forceUpdate();
      },
      // 关闭窗口 如果核销需要 （关闭取消并回调）
      closeCurrentTab(obj,that){
        if(that == undefined){
           that = this;
        }
        that.$emit("closeCallback",obj);
        that.clear();
        this.$forceUpdate();
      },
        // 关闭窗口-打开TAB
      closeTab(){
        this.$emit('closeTab', this.$route.meta.id); 
      },
      // 默认值 select BUG  @change="forceUpdate()"
     forceUpdate(){
       this.$forceUpdate();
     },
     // 展示输入框
     showInputView(vouch,obj,index){
       let that = this;
        if(this.checkFlag){
          return;
        }
        for(let i in this.vouchList){
          this.vouchList[i].moneyInputFlag = false;
          this.vouchList[i].moneyInputFocus = false;
        }
        if(this.common.isNotBlank(obj)){
           vouch.moneyInputFlag = true;
          //  vouch.moneyInputFocus = true;
          this.$nextTick(() => {
            that.$refs["input_"+index][0].$refs.input.focus();
          });
        }else{
          vouch.moneyInputFocus = false;
          vouch.moneyInputFlag = false;
          if(isNaN(vouch.checkMoney)){
            that.$message({"type":"success", message: "输入金额非法，请重新输入"});  
            return;
          }
          let checkMoneyLong = 0;
          if(this.common.isNotBlank(vouch.checkMoney)){
              checkMoneyLong = parseInt(parseFloat(vouch.checkMoney) * 100);
          } 
          this.checkBlurMoney(vouch,checkMoneyLong+"");
         
        }
        // console.log(vouch.moneyInputFocus);
        this.$forceUpdate();
     },
  },

    components: {

    }
  }