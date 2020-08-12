import {
} from '@/static/json.js'
export default {
    name: 'supplierFreightSetting',
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
            tenantPrice:{
                priceType:"",
                priceName:"",
                orderType:[],
                weightStart:"",
                weightEnd:"",
                volumeStart:"",
                volumeEnd:"",
                piecesStart:"",
                piecesEnd:"",
                selectType:"1",
                priceStatus:"",
                isDefault:2,
                priceId:"",
            },
            discountTypeList:[],
            priceStatusList:[],
            orderTypeList:[],
            selectType:[],
            tenantPriceList:[],
            weightAdvancedList:[],
            collectAdvancedList:[],
            tenantId:this.$route.query.tenantId,
            sysPriceList:[],
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
        addTable:function(){
            let that = this;
            that.tenantPrice={
                priceType:"",
                priceName:"",
                orderType:[],
                weightStart:"",
                weightEnd:"",
                volumeStart:"",
                volumeEnd:"",
                piecesStart:"",
                piecesEnd:"",
                selectType:"1",
                priceStatus:"",
                isDefault:2,
                priceId:"",
            },
                that.tenantPriceList.push(that.tenantPrice);
        },
        delTable:function(index){
            this.tenantPriceList.splice(index,1);
        },
        //静态数据查询
        async doQuerySysStaticData() {
            let that = this;
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantPrice",{"tenantId":that.tenantId},function (data) {
                for(let i=0;i<data.items.length;i++){
                    data.items[i].priceType = data.items[i].priceType+"";
                    data.items[i].selectType = data.items[i].selectType+"";
                    data.items[i].priceStatus = data.items[i].priceStatus+"";
                    data.items[i].weightStart = (data.items[i].weightStart/100).toFixed(2);
                    data.items[i].weightEnd = (data.items[i].weightEnd/100).toFixed(2);
                    data.items[i].volumeStart = (data.items[i].volumeStart/100).toFixed(2);
                    data.items[i].volumeEnd = (data.items[i].volumeEnd/100).toFixed(2);
                    data.items[i].piecesStart = (data.items[i].piecesStart/100).toFixed(2);
                    data.items[i].piecesEnd = (data.items[i].piecesEnd/100).toFixed(2);
                    if(that.common.isNotBlank(data.items[i].orderType)){
                        data.items[i].orderType = data.items[i].orderType.split(",");
                    }
                    that.tenantPriceList.push(data.items[i]);
                }
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"DISCOUNT_TYPE"},function (data) {
                that.discountTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"ORDER_TYPE"},function (data) {
                that.orderTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"USER_STATUS"},function (data) {
                that.priceStatusList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"SELECT_TYPE"},function (data) {
                that.selectType = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"SYS_PRICE"},function (data) {
                that.sysPriceList = data.items;
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
            for(let i=0;i<that.tenantPriceList.length;i++){
                let item = that.tenantPriceList[i];
                if(that.common.isBlank(item.priceName)){
                    that.$message.error('请输入价格名称');
                    return;
                }
                if(that.common.isBlank(item.priceType)){
                    that.$message.error('请选择价格类型');
                    return;
                }
                if(that.common.isBlank(item.selectType)){
                    that.$message.error('请选择类型');
                    return;
                }
                if(item.selectType == '1'){
                    if(that.common.isBlank(item.weightStart)){
                        that.$message.error('最小值不能为空');
                        return;
                    }
                    if(that.common.isBlank(item.weightEnd) || Number(item.weightEnd) <=0){
                        that.$message.error('最大值不能为空并且必须大于0');
                        return;
                    }
                    if(Number(item.weightEnd) < Number(item.weightStart)){
                        that.$message.error('最大值不能小于最小值');
                        return;
                    }
                }else if(item.selectType == '2'){
                    if(that.common.isBlank(item.volumeStart)){
                        that.$message.error('最小值不能为空');
                        return;
                    }
                    if(that.common.isBlank(item.volumeEnd) || Number(item.volumeEnd) <=0){
                        that.$message.error('最大值不能为空并且必须大于0');
                        return;
                    }
                    if(Number(item.volumeEnd) < Number(item.volumeStart)){
                        that.$message.error('最大值不能小于最小值');
                        return;
                    }
                }else {
                    if(that.common.isBlank(item.piecesStart)){
                        that.$message.error('最小值不能为空');
                        return;
                    }
                    if(that.common.isBlank(item.piecesEnd)  || Number(item.piecesEnd) <=0){
                        that.$message.error('最大值不能为空并且必须大于0');
                        return;
                    }
                    if(Number(item.piecesEnd) < Number(item.piecesStart)){
                        that.$message.error('最大值不能小于最小值');
                        return;
                    }
                }
                if(that.common.isBlank(item.orderType) || item.orderType.length == 0){
                    that.$message.error('请选择订单类型');
                    return;
                }
                if(that.common.isBlank(item.priceStatus)){
                    that.$message.error('请选择状态');
                    return;
                }
                item.orderTypeList = item.orderType.toString();
                for(let j=0;j<that.tenantPriceList.length;j++){
                    if(j == i){
                        continue;
                    }
                    let itemJ = that.tenantPriceList[j];
                    if(itemJ.isDefault==1 && item.isDefault==1 && itemJ.priceType == item.priceType){
                        that.$message.error('默认产品价格类型必须不同！');
                        return;
                    }
                    let orderTypeJ = itemJ.orderType;
                    let orderTypeI = item.orderType;
                    let arr = [...orderTypeJ,...orderTypeI];
                    if(new Set(arr).size!==orderTypeJ.length+orderTypeI.length){
                        if(item.priceType == itemJ.priceType && item.selectType != itemJ.selectType){
                            that.$message.error('订单类型相同的产品选择类型也必须相同！');
                            return;
                        }
                    }
                }
            }
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
                that.obj.tenantPriceList = JSON.stringify(that.tenantPriceList);
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