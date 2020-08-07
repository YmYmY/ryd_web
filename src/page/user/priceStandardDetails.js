import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"
import mycity from '@/components/mycity/mycity.vue'
export default {
    name: 'priceStandardDetails',
    data() {
        return {
            obj:{
                tenantId:this.$route.query.tenantId,
                boxType:"-1",
                takeEffectDate:null,
                userName:"",
                createDate:null,
                cityType:"-1",
                tenantPrice:"",
            },
            sysTenant:{},
            attributionType:this.$route.query.attributionType,
            startCityName:null,
            endCityName:null,
            sysPrice:[],
            tenantPriceList:[],
            sysPriceStandard:{},
            showBox:false,
            dialogFormVisible:false,
            boxTypeList:[],
            cityTypeList:[],
            orderTypeList:[],
            brandList:[],
            billingTypeList:[],
            calculationTypeList:[],
        }
    },
    mounted(){
        this.doQuerySysPriceStandard();
        this.doQuerySysStaticData();
        this.getHead();
    },
    components: {
        tableCommon,
        mycity
    },
    methods: {
        getHead:function(){
            let that = this;
            if(that.attributionType==2){
                that.head =[
                    {"name":"计费方向","code":"cityTypeName","width":"100","type" : "text"},
                    {"name":"出发地","code":"startCityName","width":"100"},
                    {"name":"目的地","code":"endCityName","width":"100","type" : "text"},
                    {"name":"客户品牌","code":"brandName","width":"100","type" : "text"},
                    {"name":"订单类型","code":"orderTypeName","width":"100","type" : "text"},
                    {"name":"价格名称","code":"priceName","width":"100","type" : "text"},
                    {"name":"按大小箱计费","code":"boxTypeName","width":"100","type" : "text"},
                    {"name":"重货泡比","code":"priceWeightCost","width":"100","type" : "text"},
                    {"name":"其他费","code":"otherCost","width":"100","type" : "text"},
                    {"name":"保险费率(%)","code":"insuranceCost","width":"100","type" : "text"},
                    {"name":"最低保费","code":"lowestCost","width":"100","type" : "text"},
                    {"name":"时效(天)","code":"agingNum","width":"100","type" : "text"},
                    {"name":"按体积（方）","code":"volumeCost","width":"100","type" : "text"},
                    {"name":"按重量（公斤）","code":"weightCost","width":"100","type" : "text"},
                    {"name":"按数量（件）","code":"numCost","width":"100","type" : "text"},
                    {"name":"大箱（件）","code":"maxBox","width":"100","type" : "text"},
                    {"name":"中箱（件）","code":"inBox","width":"100","type" : "text"},
                    {"name":"小箱（件）","code":"minBox","width":"100","type" : "text"},
                    {"name":"提货费计算方式","code":"pickupTypeName","width":"100","type" : "text"},
                    {"name":"提货费单价","code":"pickupCost","width":"100","type" : "text"},
                    {"name":"提货费最低收费","code":"pickupLowestCost","width":"100","type" : "text"},
                    {"name":"送货费计算方式","code":"deliveryTypeName","width":"100","type" : "text"},
                    {"name":"送货费单价","code":"deliveryCost","width":"100","type" : "text"},
                    {"name":"送货费最低收费","code":"deliveryLowestCost","width":"100","type" : "text"},
                    {"name":"包装费计算方式","code":"publicTypeName","width":"100","type" : "text"},
                    {"name":"包装费单价","code":"publicCost","width":"100","type" : "text"},
                    {"name":"包装费最低收费","code":"publicLowestCost","width":"100","type" : "text"},
                    {"name":"装卸费","code":"handingCost","width":"100","type" : "text"},
                    {"name":"最低收费","code":"receiveCost","width":"100","type" : "text"},
                    {"name":"线路折扣（%）","code":"lineDiscount","width":"100"},
                    {"name":"生效时间","code":"takeEffectDate","width":"150"},
                    {"name":"创建时间","code":"createDate","width":"150"},
                    {"name":"创建人","code":"userName","width":"150"},
                ]
            }else {
                that.head =[
                    {"name":"计费方向","code":"cityTypeName","width":"100","type" : "text"},
                    {"name":"出发地","code":"startCityName","width":"100"},
                    {"name":"目的地","code":"endCityName","width":"100","type" : "text"},
                    {"name":"计费方式","code":"billingTypeName","width":"100","type" : "text"},
                    {"name":"按大小箱计费","code":"boxTypeName","width":"100","type" : "text"},
                    {"name":"重货泡比","code":"priceWeightCost","width":"100","type" : "text"},
                    {"name":"其他费","code":"otherCost","width":"100","type" : "text"},
                    {"name":"保险费率(%)","code":"insuranceCost","width":"100","type" : "text"},
                    {"name":"最低保费","code":"lowestCost","width":"100","type" : "text"},
                    {"name":"时效(天)","code":"agingNum","width":"100","type" : "text"},
                    {"name":"按体积（方）","code":"volumeCost","width":"100","type" : "text"},
                    {"name":"按重量（公斤）","code":"weightCost","width":"100","type" : "text"},
                    {"name":"按数量（件）","code":"numCost","width":"100","type" : "text"},
                    {"name":"大箱（件）","code":"maxBox","width":"100","type" : "text"},
                    {"name":"中箱（件）","code":"inBox","width":"100","type" : "text"},
                    {"name":"小箱（件）","code":"minBox","width":"100","type" : "text"},
                    {"name":"提货费计算方式","code":"pickupTypeName","width":"100","type" : "text"},
                    {"name":"提货费单价","code":"pickupCost","width":"100","type" : "text"},
                    {"name":"提货费最低收费","code":"pickupLowestCost","width":"100","type" : "text"},
                    {"name":"送货费计算方式","code":"deliveryTypeName","width":"100","type" : "text"},
                    {"name":"送货费单价","code":"deliveryCost","width":"100","type" : "text"},
                    {"name":"送货费最低收费","code":"deliveryLowestCost","width":"100","type" : "text"},
                    {"name":"包装费计算方式","code":"publicTypeName","width":"100","type" : "text"},
                    {"name":"包装费单价","code":"publicCost","width":"100","type" : "text"},
                    {"name":"包装费最低收费","code":"publicLowestCost","width":"100","type" : "text"},
                    {"name":"装卸费","code":"handingCost","width":"100","type" : "text"},
                    {"name":"最低收费","code":"receiveCost","width":"100","type" : "text"},
                    {"name":"线路折扣（%）","code":"lineDiscount","width":"100"},
                    {"name":"生效时间","code":"takeEffectDate","width":"150"},
                    {"name":"创建时间","code":"createDate","width":"150"},
                    {"name":"创建人","code":"userName","width":"150"},
                ]
            }
        },
        forceUpdate:function(){
            this.$forceUpdate();
        },
        doSave:function(){
            let that = this;
            if(that.attributionType==3){
                if(that.common.isBlank(that.sysPrice.billingType)){
                    that.$message.error('请选择计费方式！');
                    return;
                }
            }
            if(that.attributionType==2){
                if(that.common.isBlank(that.sysPrice.orderType) || that.sysPrice.orderType.length==0){
                    that.$message.error('请选择订单类型！');
                    return;
                }
            }
            if(that.common.isBlank(that.sysPrice.takeEffectDate)){
                that.$message.error('请选择生效时间！');
                return;
            }
            if(that.common.isBlank(that.sysPrice.boxType) || that.sysPrice.boxType=="-1"){
                that.$message.error('请选择按大小箱计费！');
                return;
            }
            that.sysPrice.tenantId  = that.$route.query.tenantId;
            that.sysPrice.sysPriceType  = 2;
            that.sysPriceStandardList=[];
            that.sysPriceStandardList.push(that.sysPriceStandard);
            that.sysPrice.ladderTable = JSON.stringify(that.sysPriceStandardList);
            that.sysPrice.brandList = JSON.stringify(that.sysPrice.brandId);
            that.sysPrice.orderList = JSON.stringify(that.sysPrice.orderType);
            that.$confirm(that.rms, '确认此运价？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysPriceBO.ajax?cmd=doSysPrice";
                that.common.postUrl(url,that.sysPrice,function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "操作成功"
                        });
                        that.doQuerySysPriceStandard();
                        that.dialogFormVisible=false;
                    }
                });
            });
        },
        selectBoxType:function(){
            let that = this;
            if(that.sysPrice.boxType == "1"){
                that.showBox=false;
            }else {
                that.showBox=true;
            }
            this.forceUpdate();
        },
        updateStandard:function(){
            let that = this;
            that.selectData = that.$refs.table.getSelectItem();
            if(that.selectData.length == 0){
                that.$message.error('请选择需要修改的数据！');
                return;
            }
            if(that.selectData.length != 1){
                that.$message.error('只能选择一条数据！');
                return;
            }
            that.priceId=that.selectData[0].priceId;
            that.standardId=that.selectData[0].id;
            that.common.postUrl("api/sysPriceBO.ajax?cmd=getSysPriceStandardDetails",{"priceId":that.priceId,"standardId":that.standardId},function (data) {
                that.sysPrice.cityType = data.sysPrice.cityType+"";
                that.sysPrice.boxType = data.sysPrice.boxType+"";
                if(that.sysPrice.boxType == "1"){
                    that.showBox=false;
                }else {
                    that.showBox=true;
                }
                that.sysPrice.brandId = [];
                that.sysPrice.orderType = [];
                that.brandList.forEach(item => {
                    data.brandIds.forEach(value => {
                        if(item.brandId == value){
                            that.sysPrice.brandId.push(item);
                        }
                    })
                });
                that.orderTypeList.forEach(item => {
                    data.orderTypes.forEach(value => {
                        if(item.codeValue == value){
                            that.sysPrice.orderType.push(item);
                        }
                    })
                });
                that.sysPrice.id = that.priceId;
                that.sysPrice.tenantPrice = data.sysPrice.tenantPrice;
                that.sysPrice.billingType = data.sysPrice.billingType+"";
                that.sysPrice.startCityId = data.sysPrice.startCityId;
                that.sysPrice.weightCost = (data.sysPrice.weightCost/100).toFixed(2);
                that.sysPrice.deliveryCost = (data.sysPrice.deliveryCost/100).toFixed(2);
                that.sysPrice.pickupCost = (data.sysPrice.pickupCost/100).toFixed(2);
                that.sysPrice.receiveCost = (data.sysPrice.receiveCost/100).toFixed(2);
                that.sysPrice.insuranceCost = (data.sysPrice.insuranceCost/1000).toFixed(2);
                that.sysPrice.lowestCost = (data.sysPrice.lowestCost/100).toFixed(2);
                that.sysPrice.otherCost = (data.sysPrice.otherCost/100).toFixed(2);
                that.sysPrice.takeEffectDate=data.sysPrice.takeEffectDate;
                that.startCityName = data.startCityName;
                that.endCityName = data.endCityName;
                that.sysPriceStandard.agingNum = data.sysPriceStandard.agingNum;
                that.sysPriceStandard.otherCost=(data.sysPriceStandard.otherCost/100).toFixed(2);
                that.sysPriceStandard.volumeCost=(data.sysPriceStandard.volumeCost/100).toFixed(2);
                that.sysPriceStandard.weightCost=(data.sysPriceStandard.weightCost/100).toFixed(2);
                that.sysPriceStandard.numCost=(data.sysPriceStandard.numCost/100).toFixed(2);
                that.sysPriceStandard.pickupCost=(data.sysPriceStandard.pickupCost/100).toFixed(2);
                that.sysPriceStandard.deliveryCost=(data.sysPriceStandard.deliveryCost/100).toFixed(2);
                that.sysPriceStandard.receiveCost=(data.sysPriceStandard.receiveCost/100).toFixed(2);
                that.sysPriceStandard.maxBox=(data.sysPriceStandard.maxBox/100).toFixed(2);
                that.sysPriceStandard.inBox=(data.sysPriceStandard.inBox/100).toFixed(2);
                that.sysPriceStandard.minBox=(data.sysPriceStandard.minBox/100).toFixed(2);
                that.sysPriceStandard.handingCost=(data.sysPriceStandard.handingCost/100).toFixed(2);
                that.sysPriceStandard.publicCost=(data.sysPriceStandard.publicCost/100).toFixed(2);
                that.sysPriceStandard.lineDiscount=(data.sysPriceStandard.lineDiscount/1000).toFixed(2);
                that.sysPriceStandard.deliveryLowestCost=(data.sysPriceStandard.deliveryLowestCost/100).toFixed(2);
                that.sysPriceStandard.pickupLowestCost=(data.sysPriceStandard.pickupLowestCost/100).toFixed(2);
                that.sysPriceStandard.publicLowestCost=(data.sysPriceStandard.publicLowestCost/100).toFixed(2);
                that.sysPriceStandard.endCityId = data.sysPriceStandard.endCityId;
                that.sysPriceStandard.takeEffectDate=data.sysPriceStandard.takeEffectDate;
                if(that.common.isNotBlank(data.sysPriceStandard.deliveryType) && data.sysPriceStandard.deliveryType>0){
                    that.sysPriceStandard.deliveryType = data.sysPriceStandard.deliveryType+"";
                }else {
                    that.sysPriceStandard.deliveryType = "";
                }
                if(that.common.isNotBlank(data.sysPriceStandard.pickupType) && data.sysPriceStandard.pickupType>0){
                    that.sysPriceStandard.pickupType = data.sysPriceStandard.pickupType+"";
                }else {
                    that.sysPriceStandard.pickupType = "";
                }
                if(that.common.isNotBlank(data.sysPriceStandard.publicType) && data.sysPriceStandard.publicType>0){
                    that.sysPriceStandard.publicType = data.sysPriceStandard.publicType+"";
                }else {
                    that.sysPriceStandard.publicType = "";
                }
                that.dialogFormVisible=true;
            })
        },
        deleteStandard:function(){
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
            that.$confirm(that.rms, '是否删除所选数据？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysPriceBO.ajax?cmd=deleteStandard";
                that.common.postUrl(url,{"ids":that.ids},function (data) {
                    if(data != 'success'){
                        that.$message.error('删除失败！');
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "删除成功"
                        });
                        that.doQuerySysPriceStandard();
                    }
                });
            });
        },
        //静态数据查询
        doQuerySysStaticData:function () {
            let that = this;
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"WHETHER_PLATFORM","hasAll":true},function (data) {
                that.boxTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"CITY_TYPE","hasAll":true},function (data) {
                that.cityTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"ORDER_TYPE"},function (data) {
                that.orderTypeList = data.items;
            })
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantDefDetails",{"tenantId":that.obj.tenantId},function (data) {
                that.sysTenant = data;
            })
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysBrand",{"tenantId":that.obj.tenantId},function (data) {
                that.brandList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"BILLING_STANDARD"},function (data) {
                that.billingTypeList = data.items;
            })
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantPrice",{"tenantId":that.obj.tenantId,"priceType":2},function (data) {
                that.tenantPriceList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"CALCULATION_TYPE"},function (data) {
                that.calculationTypeList = data.items;
            })

        },
        downloadExcelFile: function () {
            this.$refs.table.downloadExcelFile();
        },
        //清空查询条件
        clear: function () {
            let that = this;
            that.$refs.startCity.cleanData();
            that.$refs.endCity.cleanData();
            that.obj={
                tenantId:this.$route.query.tenantId,
                boxType:"-1",
                takeEffectDate:null,
                userName:"",
                createDate:null,
                cityType:"-1",
            }
        },
        doQuerySysPriceStandard: function () {
            let that = this;
            that.startCity = that.$refs.startCity.getData()
            if (!that.common.isBlank(that.startCity.ProvinceId)) {
                that.obj.startCityId = that.startCity.ProvinceId;
            }
            if (!that.common.isBlank(that.startCity.CityId)) {
                that.obj.startCityId = that.startCity.CityId;
            }
            if (!that.common.isBlank(that.startCity.DistrictId)) {
                that.obj.startCityId = that.startCity.DistrictId;
            }
            that.endCity = that.$refs.endCity.getData()
            if (!that.common.isBlank(that.endCity.ProvinceId)) {
                that.obj.endCityId = that.endCity.ProvinceId;
            }
            if (!that.common.isBlank(that.endCity.CityId)) {
                that.obj.endCityId = that.endCity.CityId;
            }
            if (!that.common.isBlank(that.endCity.DistrictId)) {
                that.obj.endCityId = that.endCity.DistrictId;
            }
            let url = "api/sysPriceBO.ajax?cmd=doQuerySysPriceStandard";
            this.$refs.table.load(url, that.obj);
        },
    }
}