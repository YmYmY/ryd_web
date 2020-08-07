import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"

export default {
    name: 'updateProductInfo',
    data() {
        return {
            obj:{
                productType:null,
                productIntroduction:null,
                weightMin:null,
                weightMax:null,
                volumeMin:null,
                volumeMax:null,
                productPricing:null,
                productRegion:null,
                cutoffDate:"",
                remark:null,
                id:this.$route.query.id,
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
        downloadExcelFile:function(){
            this.$refs.table.downloadExcelFile();
        },
        doSave:function(){
            let that = this;
            if(that.common.isBlank(that.obj.productType)){
                that.$message.error('请填写产品名称！');
                return;
            }
            if(that.common.isNotBlank(that.obj.weightMin) && that.common.isNotBlank(that.obj.weightMax)){
                if(that.obj.weightMin > that.obj.weightMax){
                    that.$message.error('重量最小值（公斤）不能大于重量最大值（公斤）！');
                    return;
                }
            }
            if(that.common.isNotBlank(that.obj.volumeMin) && that.common.isNotBlank(that.obj.volumeMax)) {
                if (that.obj.volumeMin > that.obj.volumeMax) {
                    that.$message.error('体积最小值（方）不能大于体积最大值（方）！');
                    return;
                }
            }
            that.$confirm("", '是否修改产品？', {
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
                            message: "修改产品成功！"
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
        //静态数据查询
        doQuerySysStaticData:function () {
            let that = this;
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getProductInfoType",{"codeType":"PRODUCT_TYPE","id":that.obj.id},function (data) {
                that.productTypeList = data.items;
            })
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getProductInfo",{"id":that.obj.id},function (data) {
                that.obj = data;
                that.obj.productType = data.productType+"";
                if(!that.common.isBlank(data.weightMin)){
                    that.obj.weightMin=data.weightMin/1000;
                }
                if(!that.common.isBlank(data.weightMax)){
                    that.obj.weightMax=data.weightMax/1000;;
                }
                if(!that.common.isBlank(data.volumeMin)){
                    that.obj.volumeMin=data.volumeMin/1000;;
                }
                if(!that.common.isBlank(data.volumeMax)){
                    that.obj.volumeMax=data.volumeMax/1000;;
                }
            })
        },
    }
}