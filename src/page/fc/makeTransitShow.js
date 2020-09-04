import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"
export default {
    name: 'makeTransitShow',
    props:["outgoingId","orderId","flowId"],
    data() {
        return {
            tenantFullName:"",
            insuranceCost:"",
            handlingFee:"",
            tenantPriceList:[],
            objPrice:{
                tenantPrice:"",
                packageNumber:"",
                packageWeight:"",
                packageVolume:"",
                freightDouble:"",
                outgoingFee:"",
                goodsPriceDouble:"",
                collectingMoneyDouble:"",
                handingCostsDouble:"",
                maxLowestCost:"",
                maxCost:"",
                facelistFeeDouble:"",
                floatingPriceDouble:"",
            },
        }
    },
    mounted() {
        this.queryOrderInfoDetail();
    },
    components: {
        tableCommon
    },
    methods: {
        isMax:function(){
            let that = this;
            if(Number(that.maxLowestCost) < Number(that.objPrice.goodsPriceDouble)){
                that.$message.error('最大保价:' + that.maxLowestCost);
                that.objPrice.goodsPriceDouble= 0;
                return;
            }
            if(Number(that.maxCost) < Number(that.objPrice.collectingMoneyDouble)){
                that.$message.error('最大代收货款:' + that.maxLowestCost);
                that.objPrice.collectingMoneyDouble = 0;
                return;
            }
            that.$forceUpdate();
        },
        sumFee:function(){
            let that = this;
            that.objPrice.outgoingFeeDouble = 0;
            if(that.common.isNotBlank(that.objPrice.freightDouble)){
                that.objPrice.outgoingFeeDouble += Number(that.objPrice.freightDouble);
            }
            if(that.common.isNotBlank(that.objPrice.insureFeeDouble)){
                that.objPrice.outgoingFeeDouble += Number(that.objPrice.insureFeeDouble);
            }
            if(that.common.isNotBlank(that.objPrice.procedureFeeDouble)){
                that.objPrice.outgoingFeeDouble += Number(that.objPrice.procedureFeeDouble);
            }
            if(that.common.isNotBlank(that.objPrice.deliveryCostsDouble)){
                that.objPrice.outgoingFeeDouble += Number(that.objPrice.deliveryCostsDouble);
            }
            if(that.common.isNotBlank(that.objPrice.pickingCostsDouble)){
                that.objPrice.outgoingFeeDouble += Number(that.objPrice.pickingCostsDouble);
            }
            if(that.common.isNotBlank(that.objPrice.packingCostsDouble)){
                that.objPrice.outgoingFeeDouble += Number(that.objPrice.packingCostsDouble);
            }
            if(that.common.isNotBlank(that.objPrice.otherFeeDouble)){
                that.objPrice.outgoingFeeDouble += Number(that.objPrice.otherFeeDouble);
            }
            if(that.common.isNotBlank(that.objPrice.handingCostsDouble)){
                that.objPrice.outgoingFeeDouble += Number(that.objPrice.handingCostsDouble);
            }
            if(that.common.isNotBlank(that.objPrice.facelistFeeDouble)){
                that.objPrice.outgoingFeeDouble += Number(that.objPrice.facelistFeeDouble);
            }
            if(that.common.isNotBlank(that.objPrice.upstairFeeDouble)){
                that.objPrice.outgoingFeeDouble += Number(that.objPrice.upstairFeeDouble);
            }
            if(that.common.isNotBlank(that.objPrice.floatingPriceDouble)){
                that.objPrice.outgoingFeeDouble += Number(that.objPrice.floatingPriceDouble);
            }
            that.objPrice.outgoingFeeDouble = (that.objPrice.outgoingFeeDouble).toFixed(2);
            that.$forceUpdate();
        },
        //更新视图
        forceUpdate(){
            this.$forceUpdate();
        },
        priceUtils:function(){
            let that = this;
            that.objPrice.num = that.objPrice.packageNumber;
            that.objPrice.volume = that.objPrice.packageVolume;
            that.objPrice.weight = that.objPrice.packageWeight;
            that.objPrice.goodsPrice = that.objPrice.goodsPriceDouble;
            that.objPrice.collectingMoney = that.objPrice.collectingMoneyDouble;
            that.objPrice.priceId = that.objPrice.tenantPrice;
            that.objPrice.calculateFeeParams="";
            that.$refs.calcTip.innerHTML = "";
            that.url = "api/fcIncomeBO.ajax?cmd=priceUtils";
            that.common.postUrl( that.url, that.objPrice,function(data){
                if(that.common.isNotBlank(data)){
                  /*  that.objPrice.calculateFeeParams = JSON.stringify(data);
                    that.objPrice.freightDouble = data.freightDouble;
                    that.objPrice.outgoingFeeDouble = data.sumCost;
                    that.objPrice.insureFeeDouble = data.insurance;
                    that.objPrice.procedureFeeDouble = data.collectingMoneyHandlingFee;
                    that.objPrice.deliveryCostsDouble = data.deliveryCost;
                    that.objPrice.pickingCostsDouble = data.pickupCost;
                    that.objPrice.packingCostsDouble = data.publicCost;
                    that.objPrice.otherFeeDouble = data.otherCost;
                    that.objPrice.handingCostsDouble = data.handingCost;
                    that.objPrice.facelistFeeDouble = data.facelistCost;
                    that.objPrice.upstairFeeDouble = data.upstairsCost;
                    that.objPrice.floatingPriceDouble = data.floatingPrice;*/
                    if(that.common.isNotBlank(data.priceUtilName)){
                        that.$refs.calcTip.innerHTML = data.priceUtilName;
                    }
                    that.$forceUpdate();
                }
            });
        },
        async paymentRequest(){
            let that = this;
            if(that.common.isBlank(that.objPrice.packageNumber)){
                that.$message.error('请输入中转件数！');
                return;
            }
            if(that.common.isBlank(that.objPrice.packageWeight)){
                that.$message.error('请输入中转重量！');
                return;
            }
            if(that.common.isBlank(that.objPrice.packageVolume)){
                that.$message.error('请输入中转体积！');
                return;
            }
            if(that.common.isBlank(that.objPrice.freightDouble)){
                that.$message.error('请输入运费或点击费用计算！');
                return;
            }
            if(that.common.isBlank(that.objPrice.bankPeople)){
                that.$message.error('请输入开户名！');
                return;
            }
            if(that.common.isBlank(that.objPrice.bankName)){
                that.$message.error('请输入开户银行！');
                return;
            }
            if(that.common.isBlank(that.objPrice.bankCard)){
                that.$message.error('请输入银行卡号！');
                return;
            }
            if(Number(that.maxLowestCost) < Number(that.objPrice.goodsPriceDouble)){
                that.$message.error('最大保价:' + that.maxLowestCost);
                return;
            }
            if(Number(that.maxCost) < Number(that.objPrice.collectingMoneyDouble)){
                that.$message.error('最大代收货款:' + that.maxLowestCost);
                return;
            }
            that.sumFee();
            that.prompt = "运费:" + that.objPrice.freightDouble + "元";
            if(that.common.isNotBlank(that.objPrice.insureFeeDouble) && Number(that.objPrice.insureFeeDouble) > 0){
                that.prompt += "+保险费:" + that.objPrice.insureFeeDouble + "元";
            }
            if(that.common.isNotBlank(that.objPrice.procedureFeeDouble) && Number(that.objPrice.procedureFeeDouble) > 0){
                that.prompt += "+代收货款手续费:" + that.objPrice.procedureFeeDouble+"元";
            }
            if(that.common.isNotBlank(that.objPrice.deliveryCostsDouble) && Number(that.objPrice.deliveryCostsDouble) > 0){
                that.prompt += "+送货费:" + that.objPrice.deliveryCostsDouble+"元";
            }
            if(that.common.isNotBlank(that.objPrice.pickingCostsDouble) && Number(that.objPrice.pickingCostsDouble) > 0){
                that.prompt += "+提货费:" + that.objPrice.pickingCostsDouble+"元";
            }
            if(that.common.isNotBlank(that.objPrice.otherFeeDouble) && Number(that.objPrice.otherFeeDouble) > 0){
                that.prompt += "+其他费:" + that.objPrice.otherFeeDouble+"元";
            }
            if(that.common.isNotBlank(that.objPrice.packingCostsDouble) && Number(that.objPrice.packingCostsDouble) > 0){
                that.prompt += "+包装费:" + that.objPrice.packingCostsDouble+"元";
            }
            if(that.common.isNotBlank(that.objPrice.handingCostsDouble) && Number(that.objPrice.handingCostsDouble) > 0){
                that.prompt += "+装卸费:" + that.objPrice.handingCostsDouble+"元";
            }
            if(that.common.isNotBlank(that.objPrice.facelistFeeDouble) && Number(that.objPrice.facelistFeeDouble) > 0){
                that.prompt += "+面单费:" + that.objPrice.facelistFeeDouble+"元";
            }
            if(that.common.isNotBlank(that.objPrice.upstairFeeDouble) && Number(that.objPrice.upstairFeeDouble) > 0){
                that.prompt += "+上楼费:" + that.objPrice.upstairFeeDouble+"元";
            }
            if(that.common.isNotBlank(that.objPrice.floatingPriceDouble) && Number(that.objPrice.floatingPriceDouble) > 0){
                that.prompt += "+到付上浮:" + that.objPrice.floatingPriceDouble+"元";
            }
            if(that.common.isBlank(that.objPrice.outgoingFeeDouble) || that.objPrice.outgoingFeeDouble <= 0){
                that.$message.error('成本合计为零无法申请付款！');
                return;
            }
            that.objPrice.outgoingId = that.outgoingId;
            that.prompt += "=成本合计:" + that.objPrice.outgoingFeeDouble + "元";
            that.prompt += "确认付款申请？"
            that.$confirm("", that.prompt, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/fcIncomeBO.ajax?cmd=paymentRequest";
                that.common.postUrl(url,that.objPrice,function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "付款申请成功！"
                        });
                        that.cancel();
                        that.doQuery();
                    }
                });
            });
        },
        async queryOrderInfoDetail(){
            let that = this;
            that.objPrice = {};
            let fcPaymentInfo= await that.common.postUrl("api/fcIncomeBO.ajax?cmd=getFcPaymentInfo",{"flowId":this.flowId});
            that.objPrice.bankPeople = fcPaymentInfo.bankPeople;
            that.objPrice.bankName = fcPaymentInfo.bankName;
            that.objPrice.bankCard = fcPaymentInfo.bankCard;
            that.objPrice.bankAddress = fcPaymentInfo.bankAddress;
            that.$forceUpdate();

            let data= await that.common.postUrl("api/ordOrderInfoBO.ajax?cmd=queryOrderInfoDetail",{"orderId":this.orderId});
            that.order =data.order;
            that.orderFee =data.orderFee;
            that.objPrice.orderType = data.order.orderType;
            that.objPrice.warehouseId = data.order.consignorId;
            that.objPrice.receiveWarehouseId = data.order.consigneeId;
            that.objPrice.startProvinceId = that.order.sourceProvince;
            that.objPrice.startCityId = that.order.sourceCity;
            that.objPrice.startDistrictId = that.order.sourceCounty;
            that.objPrice.startCityName = that.order.sourceCityAddr;
            that.objPrice.startWarehouseAddress =that.order.sourceAddress;
            that.objPrice.endProvinceId = that.order.destProvince;
            that.objPrice.endCityId = that.order.destCity;
            that.objPrice.endDistrictId = that.order.destCounty;
            that.objPrice.endCityName = that.order.destCityAddr;
            that.objPrice.endWarehouseAddress =that.order.destAddress;
            that.objPrice.priceType = that.order.productType;
            that.objPrice.trackingNum = that.order.trackingNum;
            that.objPrice.paymentType = that.orderFee.paymentType;
            that.$forceUpdate();

            let ordTracking= await that.common.postUrl("api/ordTransitOutgoingBO.ajax?cmd=queryOutgoingFeeDetail",{"outgoingId":this.outgoingId});
            that.objPrice.tenantId = ordTracking.supplierTenantId;
            that.objPrice.packageNumber = ordTracking.packageNumber;
            that.objPrice.packageWeight = ordTracking.packageWeight;
            that.objPrice.packageVolume = ordTracking.packageVolume;
            that.objPrice.freightDouble = ordTracking.freightDouble;
            that.objPrice.goodsPriceDouble = ordTracking.goodsPriceDouble;
            that.objPrice.collectingMoneyDouble = ordTracking.collectingMoneyDouble;
            that.objPrice.outgoingFeeDouble = ordTracking.outgoingFeeDouble;
            that.objPrice.deliveryCostsDouble = ordTracking.deliveryCostsDouble;
            that.objPrice.pickingCostsDouble = ordTracking.pickingCostsDouble;
            that.objPrice.packingCostsDouble = ordTracking.packingCostsDouble;
            that.objPrice.otherFeeDouble = ordTracking.otherFeeDouble;
            that.objPrice.handingCostsDouble = ordTracking.handingCostsDouble;
            that.objPrice.collectingMoneyDouble = ordTracking.collectingMoneyDouble;
            that.objPrice.insureFeeDouble = ordTracking.insureFeeDouble;
            that.objPrice.procedureFeeDouble = ordTracking.procedureFeeDouble;
            that.objPrice.facelistFeeDouble = ordTracking.facelistFeeDouble;
            that.objPrice.upstairFeeDouble = ordTracking.upstairFeeDouble;
            that.objPrice.floatingPriceDouble = ordTracking.floatingPriceDouble;
            that.$forceUpdate();

            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantDefDetails",{"tenantId":ordTracking.supplierTenantId},function (data) {
                that.tenantFullName = data.tenantFullName;
                that.$forceUpdate();
            })

            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantPrice",{"tenantId":ordTracking.supplierTenantId},function (data) {
                that.tenantPriceList = data.items;
                that.tenantPriceList.unshift({priceName:"自动选择",tenantPrice:""});
            })

            if(that.common.isNotBlank(ordTracking.calculatePriceId)){
                that.objPrice.tenantPrice = ordTracking.calculatePriceId;
            }
            that.priceUtils();
        },
        cancel(){
            this.$emit("closeCallback");
        },
        doQueryFcIncomeExpenses(){
            this.$emit("doQuery");
        },
    },
}