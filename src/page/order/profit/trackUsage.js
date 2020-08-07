import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"

export default {
    name: 'sysRole',
    data() {
        return {
            //table组件数据
            head :[
                {"name":"消费主体","code":"mainName","width":"110","type" : "text"},
                {"name":"接口名称","code":"interfaceTypeName","width":"100","type" : "text"},
                {"name":"账单周期","code":"getMonth","width":"100","type" : "text"},
                {"name":"计费方式","code":"priceTypeName","width":"80","type" : "text"},
                {"name":"车牌号码","code":"vehicleCode","width":"80","type" : "text"},
                {"name":"车牌颜色","code":"licensePlateColorName","width":"80","type" : "text"},
                {"name":"调用总次数","code":"useNum","width":"80","type" : "text","isSum":"true"},
                {"name":"调用天数","code":"useDate","width":"80","type" : "text","isSum":"true"},
                {"name":"次单价","code":"unitPrice","width":"80","type" : "text"},
                {"name":"日单价","code":"dayUnitPrice","width":"80","type" : "text"},
                {"name":"月最高价","code":"monthUnitPrice","width":"80","type" : "text"},
                {"name":"消费金额(元)","code":"useAmountDouble","width":"80","type" : "text","isSum":"true"},
            ],
            obj:{
                getMonth:"",
                mainId:"",
                interfaceType:"-1",
                vehicleCode:"",
            },
            interfaceTypeList: [],
            tenantList :[],
        }
    },
    //进入页面
    beforeRouteEnter(to,from,next){
        next(that => {
            //调用刷新方法
            that.doQueryTrackUsage();
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
            that.yearMonthsList=this.common.getYearMonths();
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"INTERFACE_TYPE","hasAll":true},function (data) {
                that.interfaceTypeList = data.items;
            })
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantDefAll", {"attributionType":1},function(data){
                that.tenantList = data.items;
            });
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"LICENSE_PLATE_COLOR","hasAll":true},function (data) {
                that.licensePlateColorList = data.items;
            })
        },
        downloadExcelFile:function(){
            this.$refs.table.downloadExcelFile();
        },
        doQueryTrackUsage:function () {
            let that = this;
            let url = "api/sysVehicleBO.ajax?cmd=doQueryTrackUsage";
            this.$refs.table.load(url,that.obj);
        },
        //清空查询条件
        clear:function () {
            let that = this;
            that.obj ={
                getMonth:"",
                mainId:"",
                interfaceType:"-1",
                vehicleCode:"",
            }
        },
    }
}