import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"
export default {
    name: 'makeUp',
    props:["orderId","queryType"],
    data() {
        return {
            insuranceCost:"",
            handlingFee:"",
            tenantPriceList:[],
            objPrice:{
                tenantPrice:"",
                packageNumber:"",
                packageWeight:"",
                packageVolume:"",
                freightDouble:"",
                orderIncomeDouble:"",
                goodsPriceDouble:"",
                collectingMoneyDouble:"",
                handingCostsDouble:"",
                maxLowestCost:"",
                maxCost:"",
            },
            pushFee:false,
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
            that.objPrice.orderIncomeDouble = 0;
            if(that.common.isNotBlank(that.objPrice.freightDouble)){
                that.objPrice.orderIncomeDouble += Number(that.objPrice.freightDouble);
            }
            if(that.common.isNotBlank(that.objPrice.insureFeeDouble)){
                that.objPrice.orderIncomeDouble += Number(that.objPrice.insureFeeDouble);
            }
            if(that.common.isNotBlank(that.objPrice.procedureFeeDouble)){
                that.objPrice.orderIncomeDouble += Number(that.objPrice.procedureFeeDouble);
            }
            if(that.common.isNotBlank(that.objPrice.deliveryCostsDouble)){
                that.objPrice.orderIncomeDouble += Number(that.objPrice.deliveryCostsDouble);
            }
            if(that.common.isNotBlank(that.objPrice.pickingCostsDouble)){
                that.objPrice.orderIncomeDouble += Number(that.objPrice.pickingCostsDouble);
            }
            if(that.common.isNotBlank(that.objPrice.packingCostsDouble)){
                that.objPrice.orderIncomeDouble += Number(that.objPrice.packingCostsDouble);
            }
            if(that.common.isNotBlank(that.objPrice.otherFeeDouble)){
                that.objPrice.orderIncomeDouble += Number(that.objPrice.otherFeeDouble);
            }
            if(that.common.isNotBlank(that.objPrice.upstairFeeDouble)){
                that.objPrice.orderIncomeDouble += Number(that.objPrice.upstairFeeDouble);
            }
            if(that.common.isNotBlank(that.objPrice.facelistFeeDouble)){
                that.objPrice.orderIncomeDouble += Number(that.objPrice.facelistFeeDouble);
            }
            if(that.common.isNotBlank(that.objPrice.handingCostsDouble)){
                that.objPrice.orderIncomeDouble += Number(that.objPrice.handingCostsDouble);
            }
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
            that.url = "api/fcIncomeBO.ajax?cmd=priceUtils";
            that.common.postUrl( that.url, that.objPrice,function(data){
                if(that.common.isNotBlank(data)){
                    that.objPrice.calculateFeeParams = JSON.stringify(data);
                    that.objPrice.freightDouble = data.freightDouble;
                    that.objPrice.orderIncomeDouble = data.sumCost;
                    that.objPrice.insureFeeDouble = data.insurance;
                    that.objPrice.procedureFeeDouble = data.collectingMoneyHandlingFee;
                    that.objPrice.deliveryCostsDouble = data.deliveryCost;
                    that.objPrice.pickingCostsDouble = data.pickupCost;
                    that.objPrice.packingCostsDouble = data.publicCost;
                    that.objPrice.otherFeeDouble = data.otherCost;
                    that.objPrice.upstairFeeDouble = data.upstairsCost;
                    that.objPrice.facelistFeeDouble = data.facelistCost;
                    that.objPrice.handingCostsDouble = data.handingCost;
                    that.$forceUpdate();
                }
            });
        },
        async doSavePrice(){
            let that = this;
            if(that.common.isBlank(that.objPrice.packageNumber)){
                that.$message.error('请输入打包件数！');
                return;
            }
            if(that.common.isBlank(that.objPrice.packageWeight)){
                that.$message.error('请输入打包重量！');
                return;
            }
            if(that.common.isBlank(that.objPrice.packageVolume)){
                that.$message.error('请输入打包体积！');
                return;
            }
            if(that.common.isBlank(that.objPrice.freightDouble)){
                that.$message.error('请输入运费或点击费用计算！');
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
            if(that.common.isBlank(that.objPrice.freightDouble)){
                that.objPrice.freightDouble = data.freightDouble;
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
            if(that.common.isNotBlank(that.objPrice.upstairFeeDouble) && Number(that.objPrice.upstairFeeDouble) > 0){
                that.prompt += "+上楼费:" + that.objPrice.upstairFeeDouble+"元";
            }
            if(that.common.isNotBlank(that.objPrice.facelistFeeDouble) && Number(that.objPrice.facelistFeeDouble) > 0){
                that.prompt += "+面单费:" + that.objPrice.facelistFeeDouble+"元";
            }
            if(that.common.isNotBlank(that.objPrice.packingCostsDouble) && Number(that.objPrice.packingCostsDouble) > 0){
                that.prompt += "+包装费:" + that.objPrice.packingCostsDouble+"元";
            }
            if(that.common.isNotBlank(that.objPrice.handingCostsDouble) && Number(that.objPrice.handingCostsDouble) > 0){
                that.prompt += "+装卸费:" + that.objPrice.handingCostsDouble+"元";
            }
            that.objPrice.orderId = that.orderId;
            that.prompt += "=收入合计:" + that.objPrice.orderIncomeDouble + "元";
            that.prompt += "确认补录该信息？"
            if(that.pushFee){
                if(that.objPrice.payFlag !=1){
                    that.$message.error('费用已推送！');
                    return;
                }
                that.objPrice.pushFee=1;
            }else {
                that.objPrice.pushFee=2;
            }
            that.$confirm("", that.prompt, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/fcIncomeBO.ajax?cmd=makeUp";
                that.common.postUrl(url,that.objPrice,function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "补录成功！"
                        });
                        that.cancel();
                        that.doQueryFcIncomeExpenses();
                    }
                });
            });
        },
        queryOrderInfoDetail:function(){
            let that = this;
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysSetup",{},function (data) {
                if(!that.common.isBlank(data)){
                    that.maxLowestCost = (data.maxLowestCost /100).toFixed(2);
                    that.insuranceCost = (data.insuranceCost /1000).toFixed(2);
                    that.maxCost = (data.maxCost /100).toFixed(2);
                    that.handlingFee = (data.handlingFee /1000).toFixed(2);
                }
            })
            that.common.postUrl("api/ordOrderInfoBO.ajax?cmd=queryOrderInfoDetail",{"orderId":this.orderId},function (data) {
                that.order =data.order;
                that.orderFee =data.orderFee;
                that.objPrice = [];
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
                that.objPrice.tenantId = that.order.customerTenantId;
                that.objPrice.packageNumber = that.order.packageNumber;
                that.objPrice.packageWeight = that.order.packageWeight;
                that.objPrice.packageVolume = that.order.packageVolume;
                that.objPrice.freightDouble = that.orderFee.freightDouble;
                that.objPrice.goodsPriceDouble = that.orderFee.goodsPriceDouble;
                that.objPrice.collectingMoneyDouble = that.orderFee.collectingMoneyDouble;
                that.objPrice.orderIncomeDouble = that.orderFee.orderIncomeDouble;
                that.objPrice.deliveryCostsDouble = that.orderFee.deliveryCostsDouble;
                that.objPrice.pickingCostsDouble = that.orderFee.pickingCostsDouble;
                that.objPrice.packingCostsDouble = that.orderFee.packingCostsDouble;
                that.objPrice.otherFeeDouble = that.orderFee.otherFeeDouble;
                that.objPrice.upstairFeeDouble = that.orderFee.upstairFeeDouble;
                that.objPrice.facelistFeeDouble = that.orderFee.facelistFeeDouble;
                that.objPrice.handingCostsDouble = that.orderFee.handingCostsDouble;
                that.objPrice.collectingMoneyDouble = that.orderFee.collectingMoneyDouble;
                that.objPrice.insureFeeDouble = that.orderFee.insureFeeDouble;
                that.objPrice.procedureFeeDouble = that.orderFee.procedureFeeDouble;
                that.objPrice.payFlag = that.orderFee.payFlag;
                that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantPrice",{"tenantId":that.order.customerTenantId},function (data) {
                    that.tenantPriceList = data.items;
                })
            })
        },
        cancel(){
            this.$emit("closeCallback");
        },
        doQueryFcIncomeExpenses(){
            this.$emit("doQueryFcIncomeExpenses");
        },
    },
}