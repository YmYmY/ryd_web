import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"

export default {
    name: 'addProductInfo',
    data() {
        return {
            obj:{
                productType:"",
                productIntroduction:"",
                weightMin:"",
                weightMax:"",
                volumeMin:"",
                volumeMax:"",
                productPricing:"",
                productRegion:"",
                cutoffDate:"",
                remark:"",
            },
            productTypeList:[],
        }
    },
    mounted() {
        this.doQuerySysStaticData();
    },
    components: {
        tableCommon
    },
    methods: {
        //静态数据查询
        doQuerySysStaticData:function () {
            let that = this;
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getProductInfoType",{"codeType":"PRODUCT_TYPE"},function (data) {
                that.productTypeList = data.items;
            })
        },
        downloadExcelFile:function(){
            this.$refs.table.downloadExcelFile();
        },
        doSave:function(){
            let that = this;
            if(that.common.isBlank(that.obj.productType)){
                that.$message.error('请选择产品名称！');
                return;
            }
            if(that.common.isNotBlank(that.obj.weightMin) && that.common.isNotBlank(that.obj.weightMax)){
                if(that.obj.weightMin > that.obj.weightMax){
                    that.$message.error('重量最小值（公斤）不能大于重量最大值（公斤）！');
                    return;
                }
            }
            if(that.common.isNotBlank(that.obj.volumeMin) && that.common.isNotBlank(that.obj.volumeMax)){
                if(that.obj.volumeMin > that.obj.volumeMax){
                    that.$message.error('体积最小值（方）不能大于体积最大值（方）！');
                    return;
                }
            }
            that.$confirm("", '是否新增产品？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysTenantDefBO.ajax?cmd=doSaveProductInfo";
                that.common.postUrl(url,that.obj,function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "新增产品成功！"
                        });
                        that.$emit('clostToOther',that.$route.meta.id);
                    }
                });
            });
        },
        cancel:function () {
            let that = this;
            that.$emit('clostToOther', that.$route.meta.id);
        },
    }
}