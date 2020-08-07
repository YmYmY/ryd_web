import myFileModel from '@/components/myFileModel/myFileModel.vue'
export default {
    name: 'importContentTemplete',
    data() {
        return {
            //   {bizName:"订单复杂导入",excelFile:"@/static/excel/orderInfo.xlsx",bizCode:"IMP_ORDER_10001",remarks:"订单批量导入"},
            importList: [], // 传入 基础参数           
            params: {

            }, //导入集合
            currentExcelObject: "", // 当前模板 集合
            showSelectBusiness : false,
            showProgress:false,
            percent:1, //默认1
            resultMsg:""
        }
    },
    mounted() {
        this.importList = this.$route.query.importList;
        if (this.common.isBlank(this.importList)) {
            this.importList = [];
        }
        if (this.importList.length == 0) {
            that.$message({
                "type": "success",
                message: "未传入导入模板类型"
            });
            return;
        } else if (this.importList.length == 1) {
            this.params.bizCode = this.importList[0].bizCode;
            this.currentExcelObject = this.importList[0];
        } else {
            this.importList.unshift({
                bizName: "请选择导入类型",
                excelFile: "",
                bizCode: "",
                remarks: "请选择导入类型"
            });
            this.params.bizCode = this.importList[0].bizCode;
            this.showSelectBusiness = true;
        }
    },
    methods: {
        // 上传 图片成功回调
        successCallback(data){
            console.log("上传成功:::::"+data);
            this.$message({"type": "success", message: "上传文件成功，请点击导入！"});
            this.batchId = "";
            this.percent = 1, //默认1
            this.resultMsg = "";
        },
        //导入
        // importExcel() {
        //     let that = this;
        //     let flowId = this.$refs.importValue.getId();
        //     if (that.common.isBlank(flowId)) {
        //         that.$message({
        //             "type": "success",
        //             message: "请先选择导入表格数据"
        //         });
        //         return;
        //     }
        //     if (that.common.isBlank(this.params.bizCode)) {
        //         that.$message({
        //             "type": "success",
        //             message: "请先选择导入模板类型"
        //         });
        //         return;
        //     }
        //     that.params.flowId = flowId;
        //     that.params.bizName = this.currentExcelObject.bizName;
        //     that.params.remarks = this.currentExcelObject.remarks;
        //     let url = "api/sysImportBO.ajax?cmd=saveImportResult";
        //     that.common.postUrl(url, that.params, function (data) {
        //         if (that.common.isNotBlank(data)) {
        //             // 导入成功 （异步）
        //             if (data.deal) {
        //                 // 立即导入成功 小于 配置条数
        //                 let status = data.importStatus;
        //                 let message = "";
        //                 if (status == "success") {
        //                     message = "批量导入成功。总共导入" + data.successNum + "。";
        //                 } else if (status == "part") {
        //                     message = "批量导入部分成功。成功" + data.successNum +
        //                         "条，失败" + data.failNum + "条。失败原因：" + data.errorMsg + "。";;
        //                 } else {
        //                     message = "批量导入失败。总数量" + data.rows + "，失败原因：" + data.errorMsg + "。";;
        //                 }
        //                 that.$message({
        //                     "type": "success",
        //                     "message": message
        //                 });
        //                 that.$confirm(message, '导入处理完成是否继续导入', {
        //                     confirmButtonText: '关闭',
        //                     cancelButtonText: '确定',
        //                     type: 'warning'
        //                 }).then(() => {
        //                     that.$emit('closeTab', that.$route.meta.id);
        //                 }).catch(() => {
        //                     // 取消关闭
        //                     that.$refs.importValue.clean();
        //                     that.params.flowId = "";
                            
        //                 });
        //             } else {
        //                 let message = "当前需要导入数量" + data.rows + "条不在立即执行" + data.maxRows + "条范围内，后台执行。当前导入批次：" + data.batchId + "，前往导入中心查看状态?"
        //                 // 跳转页面 （是否跳转 控件）
        //                 that.$confirm(message, '提示', {
        //                     confirmButtonText: '取消',
        //                     cancelButtonText: '确定',
        //                     type: 'warning'
        //                 }).then(() => {
        //                     that.$emit('closeTab', that.$route.meta.id);
        //                 }).catch(() => {
        //                     // 取消关闭
        //                     that.$emit('openTab', data.batchId);
        //                     that.toImportCenter();
        //                 });
        //             }
        //         }
        //     },null,null,true);
        // },
    importExcel() {
            let that = this;
            let flowId = this.$refs.importValue.getId();
            if (that.common.isBlank(flowId)) {
                that.$message({
                    "type": "success",
                    message: "请先选择导入表格数据"
                });
                return;
            }
            if (that.common.isBlank(this.params.bizCode)) {
                that.$message({
                    "type": "success",
                    message: "请先选择导入模板类型"
                });
                return;
            }
            that.params.flowId = flowId;
            that.params.bizName = this.currentExcelObject.bizName;
            that.params.remarks = this.currentExcelObject.remarks;
            let url = "api/sysImportBO.ajax?cmd=saveImportResult";
            that.common.postUrl(url, that.params, function (data) {
                if (that.common.isNotBlank(data)) {
                    that.batchId = data.batchId;
                    if(data.deal){
                        // 立即导入
                        let msg = "批次（"+data.batchId+"）共处理"+data.rowNum+"。成功："+data.successNum+"，失败"+data.failNum+"。具体导入中心查看或双击";
                        that.resultMsg = msg;
                        that.$message({"type": "success", message: "已处理成功，如需查询，请到导入中心查看"});
                        that.params.flowId = "";
                        that.$refs.importValue.clean();
                        return;
                    }
                    // 异步导入
                    that.$message({"type": "success", message: "导入中，请勿关闭页面"});
                     // 导入成功 -开始查询导入
                    that.showProgress = true;
                    let doubleDeal = false; // 判断是否已经 100% 1次
                    let  importInterval = setInterval(async function(){
                            let result = await that.queryImportResultCount(data.batchId);
                            console.log(result);
                            console.log("导入排在第"+result.rangking+"位。");
                            that.percent = result.percent;
                            if(result.deal && doubleDeal){
                                that.percent = 1;
                                let msg = "批次（"+data.batchId+"）共处理"+result.rowNum+"。成功："+result.successNum+"，失败"+result.failNum+"。具体导入中心查看或双击";
                                that.resultMsg = msg;
                                that.$message({"type": "success", message: msg});
                                console.log("导入成功："+msg);
                                that.showProgress = false;
                                doubleDeal = false;
                                that.$refs.importValue.clean();
                                that.params.flowId = "";
                                clearInterval(importInterval);
                            }else{
                                if(result.deal){
                                    doubleDeal = true;
                                }
                            }
                    }, 1000);
                }
            },null,null,true);
        },
        async queryImportResultCount(batchId){
            let params = {};
            params.batchId = batchId;
            params.time = new Date().getTime();
            let url = "api/sysImportBO.ajax?cmd=queryImportResultCount";
            let data = await this.common.postUrl(url, params);
            return data;
        },
        // 跳转到导入中心
        toImportCenter(batchId){
            let that = this;
            if(that.common.isBlank(batchId)){
                batchId = new Date().getTime();
            }
            let item = {
                urlName: "批量导入中心",
                urlId: "batchId"+batchId ,
                urlPath: "/sys/import/importCenter.vue",
                urlPathName: "/importCenter",
                query: {
                    batchId: batchId
                },
            }
            that.$emit('openTab', item);
        },
        // 选择模板
        downloadExcel() {
            if (this.common.isBlank(this.currentExcelObject.excelFile)) {
                this.$message({
                    "type": "success",
                    message: "未找到选择的模板，请重新选择模板类型"
                });
                return;
            }
            this.common.downloadFile(this.currentExcelObject.excelFile);
        },
        // 设置 模板
        selectBizCode() {
            let bizCode = this.params.bizCode;
            let importList = this.importList
            for (let i in importList) {
                if (importList[i].bizCode == bizCode) {
                    this.currentExcelObject = importList[i];
                    return;
                }
            }
            this.currentExcelObject = {};

        },
        // 导出明细
        downloadResultExcel(state){
            let that = this;
            let params = {};
            params.batchId = that.batchId;
            params.state = state
            params.page = 1;
            params.rows = 1;
            let url = "api/sysImportBO.ajax?cmd=exportImportResult";
            that.common.postUrl(url, params, function (data) {
                  if(that.common.isBlank(data) || data.items.length <= 0){
                     that.$message({"type":"success", message: "未找到有效数据，无法下载（请检查excel文件是否异常或者重新复制文件到新下载模板）"});   
                     return;
                  }
                  that.downloadResultDetailExcel(params,data.items[0]);
      
            });
          },
          // 导出明细
          downloadResultDetailExcel(params,obj){
            params.rows = 10;
            let that = this;
            let queryUrl = "api/sysImportBO.ajax?cmd=exportImportResultExcel";
            let excelLables = "";
            let rowData = obj.rowData;
            let rows = rowData.split(",");
            if(rowData.indexOf("序号") <= -1){
              excelLables = "序号,";
            }
            for(let i in rows){
               excelLables = excelLables + rows[i].split("@")[0]+",";
            }
            excelLables = excelLables + "导入状态,处理备注";
            let excelKeys = excelLables;
            let fileName = "导出明细_"+ new Date().getTime();
            that.common.downloadExcelFile(queryUrl,params,excelLables,excelKeys,fileName,"导出处理结果",false)
          },

        // 默认值 select BUG  @change="forceUpdate()"
        forceUpdate() {
            this.$forceUpdate();
        },
        closeTab(){
            this.$emit('closeTab', this.$route.meta.id);
        },
    },
    components: {
        myFileModel
    }
}