import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"

export default {
    name: 'productInfo',
    data() {
        return {
            //table组件数据
            head :[
                {"name":"产品名称","code":"productTypeName","width":"110","type" : "text"},
                {"name":"产品说明","code":"productIntroduction","width":"100","type" : "text"},
                {"name":"服务定价","code":"productPricing","width":"100","type" : "text"},
            ],
            obj:{
                productType:"-1",
            },
            productTypeList:[],
        }
    },
    //进入页面
    beforeRouteEnter(to,from,next){
        next(that => {
            //调用刷新方法
            that.doQueyProductInfo();
            that.doQuerySysStaticData();
        });
    },
    components: {
        tableCommon
    },
    methods: {
        //静态数据查询
        doQuerySysStaticData:function () {
            let that = this;
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"PRODUCT_TYPE","hasAll":true},function (data) {
                that.productTypeList = data.items;
            })
        },
        downloadExcelFile:function(){
            this.$refs.table.downloadExcelFile();
        },
        doQueyProductInfo:function () {
            let that = this;
            let url = "api/sysTenantDefBO.ajax?cmd=doQueyProductInfo";
            this.$refs.table.load(url,that.obj);
        },
        //清空查询条件
        clear:function () {
            let that = this;
            that.obj = {
                productType:"-1",
            }
        },
        addProductInfo:function () {
            let that = this;
            let item = {
                urlName: "新增产品",
                urlId: "10" + new Date().getTime(),
                urlPath: "/sys/addProductInfo.vue",
                urlPathName: "/addProductInfo",
                query: {}
            }
            that.$emit('openTab', item);
        },
        updateProductInfo:function(){
            let that = this;
            let selectData = that.$refs.table.getSelectItem();
            if(selectData.length == 0){
                that.$message.error('请选择需要修改的数据！');
                return;
            }
            if(selectData.length != 1){
                that.$message.error('只能选择一条数据！');
                return;
            }
            let item = {
                urlName: "修改产品",
                urlId: "10" + new Date().getTime(),
                urlPath: "/sys/updateProductInfo.vue",
                urlPathName: "/updateProductInfo",
                query:{"id":selectData[0].id}
            }
            that.$emit('openTab', item);
        },
        deleteProductInfo:function () {
            let that = this;
            that.selectData = that.$refs.table.getSelectItem();
            if(that.selectData.length == 0){
                that.$message.error('请选择需要删除的数据！');
                return;
            }
            that.ids="";
            that.selectData.forEach((el,index)=>{
                if(index == that.selectData.length-1){
                    that.ids+=el.id ;
                }else {
                    that.ids+=el.id + ",";
                }
            })
            that.$confirm(that.rms, '是否删除产品？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysTenantDefBO.ajax?cmd=deleteProductInfo";
                that.common.postUrl(url,{"ids":that.ids},function (data) {
                    if(data != 'success'){
                        that.$message.error('删除失败！');
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "删除成功"
                        });
                        that.doQueyProductInfo();
                    }
                });
            });
        },
    }
}