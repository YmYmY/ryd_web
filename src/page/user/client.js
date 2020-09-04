import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"
import mycity from '@/components/mycity/mycity.vue'
export default {
    name: 'client',
    data() {
        return {
            //table组件数据
            head :[
                {"name":"添加时间","code":"createDate","width":"150","type" : "text"},
                {"name":"企业类型","code":"tenantTypeName","width":"100","type" : "text"},
                {"name":"客户全称","code":"tenantFullName","width":"100","type" : "text"},
                {"name":"客户简称","code":"tenantName","width":"80","type" : "text"},
                {"name":"办公区域","code":"cityName","width":"80","type" : "text"},
                {"name":"联系人","code":"tenantPrincipal","width":"80","type" : "text"},
                {"name":"联系手机","code":"tenantPhone","width":"80","type" : "text"},
                {"name":"状态","code":"tenantStatusName","width":"80","type" : "text"},
                {"name":"禁用时间","code":"disableDate","width":"80","type" : "text"},
                {"name":"禁用原因","code":"disableRemarks","width":"100","type" : "text"},
                {"name":"结算方式","code":"paymentTypeName","width":"150","type" : "text"},
                {"name":"销售部门","code":"oragnizeName","width":"150","type" : "text"},
                {"name":"销售专员","code":"userName","width":"80","type" : "text"},
                {"name":"客服专员","code":"kfUserName","width":"80","type" : "text"},
                {"name":"财务专员","code":"cwUserName","width":"80","type" : "text"}
            ],
            selectType:3,
            obj:{
                createDate:"",
                tenantStatus:"-1",
                tenantName:null,
                tenantPrincipal:null,
                salesId:-1,
                tenantType:"-1",
                oragnizeType:"2",
                userName:null,
                paymentType:"-1",
            },
            paymentTypeList:[],
            customerTenantList:[],
            tenantStatusList:[],
            tenantTypeList: [],
            salesList:[],
            dialogFormVisible:false,
            disableRemarks:null,
            //选择框数据
            options: [{
                value: '2',
                label: '销售专员'
            }, {
                value: '4',
                label: '客服专员'
            }, {
                value: '3',
                label: '财务专员'
            }],
        }
    },
    //进入页面
    beforeRouteEnter(to,from,next){
        next(that => {
            //调用刷新方法
            that.doQuerySysTenantDefClient();
            that.doQuerySysStaticData();
        });
    },
    components: {
        tableCommon,
        mycity
    },
    methods: {
        dblclickItem:function(obj){
            let that = this;
            let item = {
                urlName: "客户详情",
                urlId: "48" + obj.tenantId,
                urlPath: "/user/clientDetails.vue",
                urlPathName: "/clientDetails",
                query:{tenantId: obj.tenantId},
            }
            that.$emit('openTab', item);
        },
        downloadExcelFile:function(){
            this.$refs.table.downloadExcelFile();
        },
        //清空查询条件
        clear:function () {
            let that = this;
            that.$refs.city.cleanData();
            that.obj ={
                createDate:"",
                tenantStatus:"-1",
                tenantName:null,
                tenantPrincipal:null,
                salesId:-1,
                tenantType:"-1",
                oragnizeType:"2",
                userName:null,
                paymentType:"-1",
            }
        },
        doQuerySysTenantDefClient:function () {
            let that = this;
            that.cityOffice =that.$refs.city.getData()
            that.obj.provinceId = that.cityOffice.ProvinceId;
            that.obj.cityId = that.cityOffice.CityId;
            that.obj.districtId = that.cityOffice.DistrictId;
            that.obj.streetId = that.cityOffice.StreetId;
            let url = "api/sysTenantDefBO.ajax?cmd=doQuerySysTenantDefClient";
            this.$refs.table.load(url,that.obj);
        },
        //静态数据查询
        doQuerySysStaticData:function () {
            let that = this;
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"USER_STATUS","hasAll":true},function (data) {
                that.tenantStatusList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"TENANT_TYPE_CLIENT","hasAll":true},function (data) {
                that.tenantTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"ORDER_PAYMENT_TYPE","hasAll":true},function (data) {
                that.paymentTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=getSysOragnizeList",{"oragnizeType":"2","hasAll":true},function (data) {
                that.salesList = data.items;
            })
            let tenantId=that.common.getCookie("tenantId");
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantDefPName", {"pTenantId":tenantId},function(data){
                that.customerTenantList = data.items;
            });
        },
        //新增
        addClient:function () {
            let that = this;
            let item = {
                urlName: "新增客户",
                urlId: "13" + new Date().getTime(),
                urlPath: "/user/addClient.vue",
                urlPathName: "/addClient",
                query:{}
            }
            that.$emit('openTab', item);
        },
        //修改
        updateClient:function () {
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
                urlName: "修改客户",
                urlId: "13" + new Date().getTime(),
                urlPath: "/user/updateClient.vue",
                urlPathName: "/updateClient",
                query:{"tenantId":selectData[0].tenantId}
            }
            that.$emit('openTab', item);
        },
        //客户配置
        setUpClient:function(){
            let that = this;
            let selectData = that.$refs.table.getSelectItem();
            if(selectData.length == 0){
                that.$message.error('请选择需要配置的数据！');
                return;
            }
            if(selectData.length != 1){
                that.$message.error('只能选择一条数据！');
                return;
            }
            let item = {
                urlName: "客户配置",
                urlId: "13" + new Date().getTime(),
                urlPath: "/user/clientSetUp.vue",
                urlPathName: "/clientSetUp",
                query:{"tenantId":selectData[0].tenantId}
            }
            that.$emit('openTab', item);
        },
        //启用/停用
        updateStatus:function () {
            let that = this;
            let selectData = that.$refs.table.getSelectItem();
            if(selectData.length == 0){
                that.$message.error('请选择需要操作的数据！');
                return;
            }
            if(selectData.length != 1){
                that.$message.error('只能选择一条数据！');
                return;
            }
            if(selectData[0].tenantStatus == 1){
                that.tenantStatus=2;
                that.tenantId=selectData[0].tenantId;
                that.rms = "确认禁用该客户"
                that.message="禁用成功！"
                that.dialogFormVisible=true;
                that.disableRemarks=null;
                return;
            }else {
                that.tenantStatus=1;
                that.tenantId=selectData[0].tenantId;
                that.rms = "确认启用该客户"
                that.message="启用成功！"
            }
            that.$confirm(that.rms, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.common.postUrl("api/sysTenantDefBO.ajax?cmd=updateSysTenantDefPlatform",{"tenantId": that.tenantId,"tenantStatus":that.tenantStatus},function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.doQuerySysTenantDefClient();
                        that.$message({
                            type: 'success',
                            message: that.message
                        });
                    }
                });
            });
        },
        //禁用
        disable:function(){
            let that = this;
            if(that.common.isBlank(that.disableRemarks)){
                that.$message.error('请输入禁用原因！');
                return;
            }
            that.$confirm(that.rms, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.common.postUrl("api/sysTenantDefBO.ajax?cmd=updateSysTenantDefPlatform",{"tenantId": that.tenantId,"tenantStatus":that.tenantStatus,"disableRemarks":that.disableRemarks},function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.dialogFormVisible=false;
                        that.doQuerySysTenantDefClient();
                        that.$message({
                            type: 'success',
                            message: that.message
                        });
                    }
                });
            });
        },
    },
}