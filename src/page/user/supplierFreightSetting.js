import {
} from '@/static/json.js'
export default {
    name: 'freightSetting',
    data() {
        return {
            obj:{
                discountOne:null,
                rateOne:null,
                discountTwo:null,
                rateTwo:null,
                discountThree:null,
                rateThree:null,
                weightAdvanced:"",
                collectAdvanced:"",
                discountType:"",
            },
            discountTypeList:[],
            weightAdvancedList:[],
            collectAdvancedList:[],
            tenantId:this.$route.query.tenantId,
            stepPrice:false,
            standardPrice:false,
        }
    },
    mounted() {
        this.doQuerySysStaticData();
    },
    components: {

    },
    methods: {
        //静态数据查询
        async doQuerySysStaticData() {
            let that = this;
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"DISCOUNT_TYPE"},function (data) {
                that.discountTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"WEIGHT_ADVANCED"},function (data) {
                that.weightAdvancedList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"COLLECT_ADVANCED"},function (data) {
                that.collectAdvancedList = data.items;
            })
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantDefDetails",{"tenantId":that.tenantId},function (data) {
                if(that.common.isNotBlank(data.weightAdvanced)){
                    that.obj.weightAdvanced = data.weightAdvanced+"";
                }
                if(that.common.isNotBlank(data.collectAdvanced)){
                    that.obj.collectAdvanced = data.collectAdvanced+"";
                }
                if(that.common.isNotBlank(data.discountType)){
                    that.obj.discountType = data.discountType+"";
                }
                if(that.common.isNotBlank(data.advancedType)){
                    if(data.advancedType.indexOf("1") != -1){
                        that.stepPrice = true;
                    }
                    if(data.advancedType.indexOf("2") != -1){
                        that.standardPrice = true;
                    }
                }
                that.obj.discountOne = (data.discountOne /100).toFixed(2);
                that.obj.discountTwo = (data.discountTwo /100).toFixed(2);
                that.obj.discountThree = (data.discountThree /100).toFixed(2);
                that.obj.rateOne = (data.rateOne /1000).toFixed(2);
                that.obj.rateTwo = (data.rateTwo /1000).toFixed(2);
                that.obj.rateThree = (data.rateThree /1000).toFixed(2);
            })
        },
        doSave:function () {
            let that = this;
            if(that.common.isBlank(that.obj.weightAdvanced)){
                that.$message.error('请选择重量进阶！');
                return;
            }
            if(that.common.isBlank(that.obj.collectAdvanced)){
                that.$message.error('请选择到付上浮！');
                return;
            }
            if(that.common.isBlank(that.obj.discountType)){
                that.$message.error('请选择折扣方式！');
                return;
            }
            if(that.obj.discountTwo > 0 &&  (that.obj.discountOne==0 || that.common.isBlank(that.obj.discountOne))){
                that.$message.error('请输入一般折扣！');
                return;
            }
            if(that.obj.discountThree > 0 &&  (that.obj.discountTwo==0 || that.common.isBlank(that.obj.discountTwo))){
                that.$message.error('请输入次优折扣！');
                return;
            }
            if(that.obj.discountOne >= that.obj.discountTwo && that.obj.discountTwo!= 0){
                that.$message.error('次优折扣必须比一般折扣大！');
                return;
            }
            if(that.obj.discountTwo >= that.obj.discountThree && that.obj.discountThree!= 0){
                that.$message.error('最优折扣必须比次优折扣大！');
                return;
            }
            that.obj.advancedType= "";
            if(that.stepPrice){
                that.obj.advancedType = "1";
            }
            if(that.standardPrice && that.common.isNotBlank(that.obj.advancedType)){
                that.obj.advancedType += ",2";
            }else if(that.standardPrice){
                that.obj.advancedType = "2";
            }
            that.$confirm("", '确认该配置？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysTenantDefBO.ajax?cmd=freightSetting";
                that.obj.tenantId = that.tenantId;
                that.common.postUrl(url,that.obj,function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "配置成功！"
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