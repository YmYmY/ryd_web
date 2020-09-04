import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"
import mycity from '@/components/mycity/mycity.vue'
export default {
    name: 'supplierPrice',
    data() {
        return {
            //table组件数据
            head :[
                {"name":"所属区域","code":"regionName","width":"150","type" : "text"},
                {"name":"供应商全称","code":"tenantFullName","width":"100","type" : "text"},
                {"name":"供应商简称","code":"tenantName","width":"80","type" : "text"},
                {"name":"是否维护运价","code":"freightTypeName","width":"80","type" : "text"},
                {"name":"运价类型","code":"priceName","width":"80","type" : "text"},
                {"name":"结算方式","code":"payTypeName","width":"80","type" : "text"},
                {"name":"账期","code":"periodTypeName","width":"80","type" : "text"},
                {"name":"备注","code":"remark","width":"80","type" : "text"}
            ],
            obj:{
                regionId:null,
                freightType:null,
                tenantName:null,
                payType:"-1",
            },
            payTypeList:[],
            supplierTenantList:[],
            regionList:[],
            freightTypeList:[],
        }
    },
    //进入页面
    beforeRouteEnter(to,from,next){
        next(that => {
            //调用刷新方法
            that.doQuerySysTenantDefSupplier();
            that.doQuerySysStaticData();
        });
    },
    components: {
        tableCommon,
        mycity
    },
    methods: {
        // 跳转到 导入界面
        importOrder(){
            let item = {
                urlName: "运价导入",
                urlId: new Date().getTime(),
                urlPath: "/common/importTemplate/importTemplate.vue",
                urlPathName: "/importOrderTemplate",
                query:{
                    importList : [
                        {bizName:"阶梯价导入",excelFile:"/static/excel/supplierPriceLadder.xlsx",bizCode:"IMP_PRICE_10021",remarks:"阶梯价导入"},
                        {bizName:"标准价导入",excelFile:"/static/excel/supplierPriceStandard.xlsx",bizCode:"IMP_PRICE_10022",remarks:"标准价导入"},
                    ]
                },
            }
            this.$emit('openTab', item);
        },
        downloadExcelFile:function(){
            this.$refs.table.downloadExcelFile();
        },
        //清空查询条件
        clear:function () {
            let that = this;
            that.obj ={
                regionId:null,
                freightType:null,
                tenantName:null,
                payType:"-1",
            }
        },
        doQuerySysTenantDefSupplier:function () {
            let that = this;
            let url = "api/sysTenantDefBO.ajax?cmd=doQuerySysTenantDefSupplier";
            this.$refs.table.load(url,that.obj);
        },
        //静态数据查询
        doQuerySysStaticData:function () {
            let that = this;
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"WHETHER_PLATFORM","hasAll":true},function (data) {
                that.freightTypeList = data.items;
            })
            that.common.postUrl("api/sysRegionBO.ajax?cmd=getPSysRegionList",{},function (data) {
                that.regionList = data.items;
            })
            let tenantId=that.common.getCookie("tenantId");
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantDefCityName", {"pTenantId":tenantId},function(data){
                that.supplierTenantList = data.items;
            });
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"PAY_TYPE","hasAll":true},function (data) {
                that.payTypeList = data.items;
            })
        },
        //新增
        addClientPrice:function () {
            let that = this;
            let selectData = that.$refs.table.getSelectItem();
            if(selectData.length == 0){
                that.$message.error('请选择需要新增的数据！');
                return;
            }
            if(selectData.length != 1){
                that.$message.error('只能选择一条数据！');
                return;
            }
            let item = {
                urlName: "新增供应商运价",
                urlId: "13" + new Date().getTime(),
                urlPath: "/user/price.vue",
                urlPathName: "/price",
                query:{"tenantId":selectData[0].tenantId,"attributionType":3}
            }
            that.$emit('openTab', item);
        },
        //修改
        updateClientPrice:function () {
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
                urlName: "修改供应商运价",
                urlId: "13" + new Date().getTime(),
                urlPath: "/user/price.vue",
                urlPathName: "/price",
                query:{"tenantId":selectData[0].tenantId,"type":1}
            }
            that.$emit('openTab', item);
        },
        freightSetting:function(){
            let that = this;
            let selectData = that.$refs.table.getSelectItem();
            if(selectData.length == 0){
                that.$message.error('请选择需要新增的数据！');
                return;
            }
            if(selectData.length != 1){
                that.$message.error('只能选择一条数据！');
                return;
            }
            let item = {
                urlName: "运费设置",
                urlId: "13" + new Date().getTime(),
                urlPath: "/user/supplierFreightSetting.vue",
                urlPathName: "/supplierFreightSetting",
                query:{"tenantId":selectData[0].tenantId,"attributionType":3}
            }
            that.$emit('openTab', item);
        },
        clientDetails:function () {
            let that = this;
            let selectData = that.$refs.table.getSelectItem();
            if(selectData.length == 0){
                that.$message.error('请选择需要查看的数据！');
                return;
            }
            if(selectData.length != 1){
                that.$message.error('只能选择一条数据！');
                return;
            }
            let item = {
                urlName: "供应商运价详情",
                urlId: "13" + new Date().getTime(),
                urlPath: "/user/priceDetails.vue",
                urlPathName: "/priceDetails",
                query:{"tenantId":selectData[0].tenantId,"attributionType":3}
            }
            that.$emit('openTab', item);
        },
    },
}