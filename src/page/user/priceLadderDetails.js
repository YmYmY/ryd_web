import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"
import mycity from '@/components/mycity/mycity.vue'
export default {
    name: 'priceLadderDetails',
    data() {
        return {
            //table组件数据
            attributionType:this.$route.query.attributionType,
            obj:{
                tenantPrice:"",
                tenantId:this.$route.query.tenantId,
                cityType:"-1",
                distinguishType:"-1",
                takeEffectDate:null,
                userName:"",
                orderType:"",
                createDate:null,
            },
            sysTenant:{},
            startCityName:null,
            endCityName:null,
            sysPrice:[],
            brandList:[],
            sysPriceLadder:{},
            cityTypeList:[],
            orderTypeList:[],
            distinguishTypeList:[],
            billingTypeList:[],
            tenantPriceList:[],
            dialogFormVisible:false,
        }
    },
    mounted(){
        this.doQuerySysPriceLadder();
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
            if(that.attributionType == 2){
                that.head =[
                    {"name":"计费方向","code":"cityTypeName","width":"100","type" : "text"},
                    {"name":"出发地","code":"startCityName","width":"100"},
                    {"name":"目的地","code":"endCityName","width":"100","type" : "text"},
                    {"name":"客户品牌","code":"brandName","width":"100","type" : "text"},
                    {"name":"订单类型","code":"orderTypeName","width":"100","type" : "text"},
                    {"name":"价格名称","code":"priceName","width":"100","type" : "text"},
                    {"name":"重货泡比","code":"weightCost","width":"100","type" : "text"},
                    {"name":"面单费","code":"facelistCost","width":"100","type" : "text"},
                    {"name":"包装费","code":"publicCost","width":"100","type" : "text"},
                    {"name":"上楼费","code":"upstairsCost","width":"100","type" : "text"},
                    {"name":"其他费","code":"otherCost","width":"100","type" : "text"},
                    {"name":"装卸费","code":"handingCost","width":"100","type" : "text"},
                    {"name":"保险费率(%)","code":"insuranceCost","width":"100","type" : "text"},
                    {"name":"最低保费","code":"lowestCost","width":"100","type" : "text"},
                    {"name":"时效(天)","code":"agingNum","width":"100","type" : "text"},
                    {"name":"首重","code":"startWeight","width":"100"},
                    {"name":"首重价（元）","code":"startCost","width":"100"},
                    {"name":"续重范围1（公斤）","code":"weightOne","width":"150"},
                    {"name":"续价1（元/公斤）","code":"weightOneCost","width":"150"},
                    {"name":"续重范围2（公斤） ","code":"weightTwo","width":"150"},
                    {"name":"续价2（元/公斤）","code":"weightTwoCost","width":"150"},
                    {"name":"续重范围3（公斤） ","code":"weightThree","width":"150"},
                    {"name":"续价3（元/公斤）","code":"weightThreeCost","width":"150"},
                    {"name":"续重范围4（公斤） ","code":"weightFour","width":"150"},
                    {"name":"续价4（元/公斤）","code":"weightFourCost","width":"150"},
                    {"name":"续重范围5（公斤） ","code":"weightFives","width":"150"},
                    {"name":"续价5（元/公斤）","code":"weightFivesCost","width":"150"},
                    {"name":"最低收费","code":"receiveCost","width":"150"},
                    {"name":"线路折扣","code":"lineDiscount","width":"100","type" : "text"},
                    {"name":"生效时间","code":"takeEffectDate","width":"150"},
                    {"name":"创建时间","code":"createDate","width":"150"},
                    {"name":"创建人","code":"userName","width":"150"},
                ]
            }else {
                that.head =[
                    {"name":"计费方向","code":"cityTypeName","width":"100","type" : "text"},
                    {"name":"出发地","code":"startCityName","width":"100"},
                    {"name":"目的地","code":"endCityName","width":"100","type" : "text"},
                    {"name":"价格名称","code":"priceName","width":"100","type" : "text"},
                    {"name":"计费方式","code":"billingTypeName","width":"100","type" : "text"},
                    {"name":"重货泡比","code":"weightCost","width":"100","type" : "text"},
                    {"name":"面单费","code":"facelistCost","width":"100","type" : "text"},
                    {"name":"包装费","code":"publicCost","width":"100","type" : "text"},
                    {"name":"上楼费","code":"upstairsCost","width":"100","type" : "text"},
                    {"name":"其他费","code":"otherCost","width":"100","type" : "text"},
                    {"name":"保险费率(%)","code":"insuranceCost","width":"100","type" : "text"},
                    {"name":"最低保费","code":"lowestCost","width":"100","type" : "text"},
                    {"name":"时效(天)","code":"agingNum","width":"100","type" : "text"},
                    {"name":"首重","code":"startWeight","width":"100"},
                    {"name":"首重价（元）","code":"startCost","width":"100"},
                    {"name":"续重范围1（公斤）","code":"weightOne","width":"150"},
                    {"name":"续价1（元/公斤）","code":"weightOneCost","width":"150"},
                    {"name":"续重范围2（公斤） ","code":"weightTwo","width":"150"},
                    {"name":"续价2（元/公斤）","code":"weightTwoCost","width":"150"},
                    {"name":"续重范围3（公斤） ","code":"weightThree","width":"150"},
                    {"name":"续价3（元/公斤）","code":"weightThreeCost","width":"150"},
                    {"name":"续重范围4（公斤） ","code":"weightFour","width":"150"},
                    {"name":"续价4（元/公斤）","code":"weightFourCost","width":"150"},
                    {"name":"续重范围5（公斤） ","code":"weightFives","width":"150"},
                    {"name":"续价5（元/公斤）","code":"weightFivesCost","width":"150"},
                    {"name":"最低收费","code":"receiveCost","width":"150"},
                    {"name":"线路折扣","code":"lineDiscount","width":"100","type" : "text"},
                    {"name":"生效时间","code":"takeEffectDate","width":"150"},
                    {"name":"创建时间","code":"createDate","width":"150"},
                    {"name":"创建人","code":"userName","width":"150"},
                ]
            }
        },
        forceUpdate:function(){
            this.$forceUpdate();
        },
        updateLadder:function(){
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
            that.ladderId=that.selectData[0].id;
            that.common.postUrl("api/sysPriceBO.ajax?cmd=getSysPriceLadderDetails",{"priceId":that.priceId,"ladderId":that.ladderId},function (data) {
                that.sysPrice.cityType = data.sysPrice.cityType+"";
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
                that.sysPrice.facelistCost = (data.sysPrice.facelistCost/100).toFixed(2);
                that.sysPrice.publicCost = (data.sysPrice.publicCost/100).toFixed(2);
                that.sysPrice.otherCost = (data.sysPrice.otherCost/100).toFixed(2);
                that.sysPrice.insuranceCost = (data.sysPrice.insuranceCost/1000).toFixed(2);
                that.sysPrice.lowestCost = (data.sysPrice.lowestCost/100).toFixed(2);
                that.sysPrice.upstairsCost=(data.sysPrice.upstairsCost/100).toFixed(2);
                that.sysPrice.handingCost=(data.sysPrice.handingCost/100).toFixed(2);
                that.sysPrice.takeEffectDate=data.sysPrice.takeEffectDate;
                that.startCityName = data.startCityName;
                that.endCityName = data.endCityName;
                that.sysPriceLadder.agingNum = data.sysPriceLadder.agingNum;
                that.sysPriceLadder.startWeight=(data.sysPriceLadder.startWeight/100).toFixed(2);
                that.sysPriceLadder.startCost=(data.sysPriceLadder.startCost/100).toFixed(2);
                that.sysPriceLadder.weightOne=(data.sysPriceLadder.weightOne/100).toFixed(2);
                that.sysPriceLadder.weightOneCost=(data.sysPriceLadder.weightOneCost/100).toFixed(2);
                that.sysPriceLadder.weightTwo=(data.sysPriceLadder.weightTwo/100).toFixed(2);
                that.sysPriceLadder.weightTwoCost=(data.sysPriceLadder.weightTwoCost/100).toFixed(2);
                that.sysPriceLadder.weightThree=(data.sysPriceLadder.weightThree/100).toFixed(2);
                that.sysPriceLadder.weightThreeCost=(data.sysPriceLadder.weightThreeCost/100).toFixed(2);
                that.sysPriceLadder.weightFour=(data.sysPriceLadder.weightFour/100).toFixed(2);
                that.sysPriceLadder.weightFourCost=(data.sysPriceLadder.weightFourCost/100).toFixed(2);
                that.sysPriceLadder.weightFives=(data.sysPriceLadder.weightFives/100).toFixed(2);
                that.sysPriceLadder.weightFivesCost=(data.sysPriceLadder.weightFivesCost/100).toFixed(2);
                that.sysPriceLadder.receiveCost=(data.sysPriceLadder.receiveCost/100).toFixed(2);
                that.sysPriceLadder.lineDiscount=(data.sysPriceLadder.lineDiscount/1000).toFixed(2);
                that.sysPriceLadder.takeEffectDate=data.sysPriceLadder.takeEffectDate;
                that.sysPriceLadder.endCityId = data.sysPriceLadder.endCityId;
                that.dialogFormVisible=true;
            })
        },
        doSave:function(){
            let that = this;
            if(that.common.isBlank(that.sysPrice.takeEffectDate)){
                that.$message.error('请选择生效时间！');
                return;
            }
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
            that.sysPrice.brandList = JSON.stringify(that.sysPrice.brandId);
            that.sysPrice.orderList = JSON.stringify(that.sysPrice.orderType);
            that.sysPrice.tenantId  = that.$route.query.tenantId;
            that.sysPrice.sysPriceType  = 1;
            if(that.common.isBlank(that.sysPriceLadder.startWeight)){
                that.$message.error("请填写首重！");
                return;
            }
            if(that.common.isBlank(that.sysPriceLadder.startCost)){
                that.$message.error("请填写首重价！");
                return;
            }
            if(that.common.isBlank(that.sysPriceLadder.weightOne)){
                that.$message.error("请填写续重范围1（公斤）！");
                return;
            }
            if(that.common.isBlank(that.sysPriceLadder.weightOneCost)){
                that.$message.error("请填写续价1（元/公斤）！");
                return;
            }
            that. sysPriceLadderList=[];
            that.sysPriceLadderList.push(that.sysPriceLadder);
            that.sysPrice.ladderTable = JSON.stringify(that.sysPriceLadderList);
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
                        that.doQuerySysPriceLadder();
                        that.dialogFormVisible=false;
                    }
                });
            });
        },
        deleteLadder:function(){
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
                let url ="api/sysPriceBO.ajax?cmd=deleteLadder";
                that.common.postUrl(url,{"ids":that.ids},function (data) {
                    if(data != 'success'){
                        that.$message.error('删除失败！');
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "删除成功"
                        });
                        that.doQuerySysPriceLadder();
                    }
                });
            });
        },
        //静态数据查询
        doQuerySysStaticData:function () {
            let that = this;
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"DISTINGUISH_TYPE","hasAll":true},function (data) {
                that.distinguishTypeList = data.items;
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
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantPrice",{"tenantId":that.obj.tenantId,"priceType":1},function (data) {
                that.tenantPriceList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"BILLING_LADDER"},function (data) {
                that.billingTypeList = data.items;
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
                cityType:"-1",
                distinguishType:"-1",
                takeEffectDate:null,
                userName:"",
                createDate:null,
                orderType:"",
            }
        },
        doQuerySysPriceLadder: function () {
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
            let url = "api/sysPriceBO.ajax?cmd=doQuerySysPriceLadder";
            this.$refs.table.load(url, that.obj);
        },
    }
}