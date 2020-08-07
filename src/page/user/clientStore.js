import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"
import mycity from '@/components/mycity/mycity.vue'
export default {
    name: 'clientStore',
    data() {
        return {
            //table组件数据
            head :[
                {"name":"所在区域","code":"cityName","width":"150","type" : "text"},
                {"name":"所属客户","code":"tenantFullName","width":"150","type" : "text"},
                {"name":"门店编号","code":"warehouseCode","width":"150","type" : "text"},
                {"name":"门店级别","code":"warehouseTypeName","width":"100","type" : "text"},
                {"name":"门店全称","code":"warehouseFullName","width":"100","type" : "text"},
                {"name":"门店简称","code":"warehouseName","width":"100","type" : "text"},
                {"name":"店铺下单额度","code":"orderAmount","width":"100","type" : "text"},
                {"name":"剩余额度","code":"unusedAmount","width":"100","type" : "text"},
                {"name":"已用额度","code":"usedAmount","width":"100","type" : "text"},
                {"name":"销售代表","code":"salesName","width":"100","type" : "text"},
                {"name":"店长姓名","code":"warehousePeople","width":"120","type" : "text"},
                {"name":"联系手机","code":"warehousePhone","width":"120","type" : "text"},
                {"name":"门店座机","code":"warehouseTelephone","width":"120","type" : "text"},
                {"name":"登录账号","code":"userLogin","width":"120","type" : "text"},
                {"name":"添加时间","code":"createDate","width":"120","type" : "text"},
                {"name":"门店地址","code":"warehouseAddress","width":"120","type" : "text"},
                {"name":"经营品牌","code":"brandName","width":"120","type" : "text"},
                {"name":"专属客服","code":"customerUserName","width":"120","type" : "text"},
            ],
            obj:{
                createDate:"",
                warehouseFullName:null,
                warehousePhone:null,
                userLogin:null,
                type:1,
                queryType:5,
            },
            showCustomer:false,
            customerUserId:"",
            userOragnize:[],
            customerTenantList:[],
            orderAmount:"",
            userName:null,
            userPhone:null,
            userLogin:null,
            userPassword:null,
            dialogFormVisible:false,
            selectType:3,
        }
    },
    //进入页面
    beforeRouteEnter(to,from,next){
        next(that => {
            //调用刷新方法
            that.doQueryStore();
            that.doQuerySysStaticData();
        });
    },
    components: {
        tableCommon,
        mycity
    },
    methods: {
        doSaveCustomer:function(){
            let that = this;
            if(that.common.isBlank(that.customerUserId)){
                that.$message.error('请选择专属客服！');
                return;
            }
            that.$confirm("确认设置！", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.common.postUrl("api/cmWarehouseBO.ajax?cmd=setCustomerUser",{"warehouseIds": that.warehouseIds,"customerUserId":that.customerUserId},function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.doQueryStore();
                        that.showCustomer=false;
                        that.$message({
                            type: 'success',
                            message: "设置成功！"
                        });
                    }
                });
            });
        },
        doSaveQuota:function(){
            let that = this;
            if(that.common.isBlank(that.orderAmount)){
                that.$message.error('请输入调整额度！');
                return;
            }
            that.$confirm("是否调整！", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.common.postUrl("api/cmWarehouseBO.ajax?cmd=doSaveQuota",{"warehouseIds": that.warehouseIds,"orderAmount":that.orderAmount},function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.doQueryStore();
                        that.dialogFormVisible=false;
                        that.$message({
                            type: 'success',
                            message: "调整成功成功！"
                        });
                    }
                });
            });
        },
        updateCustomer:function(){
            let that = this;
            that.selectData = that.$refs.table.getSelectItem();
            if(that.selectData.length == 0){
                that.$message.error('请选择需要调整的数据！');
                return;
            }
            that.warehouseIds="";
            that.selectData.forEach((el,index)=>{
                if(index == that.selectData.length-1){
                    that.warehouseIds+=el.warehouseId ;
                }else {
                    that.warehouseIds+=el.warehouseId + ",";
                }
            })
            that.showCustomer=true;
        },
        updateQuota:function(){
            let that = this;
            that.selectData = that.$refs.table.getSelectItem();
            if(that.selectData.length == 0){
                that.$message.error('请选择需要调整的数据！');
                return;
            }
            that.warehouseIds="";
            that.selectData.forEach((el,index)=>{
                if(index == that.selectData.length-1){
                    that.warehouseIds+=el.warehouseId ;
                }else {
                    that.warehouseIds+=el.warehouseId + ",";
                }
            })
            that.dialogFormVisible=true;
        },
        downloadExcelFile:function(){
            this.$refs.table.downloadExcelFile();
        },
        // 跳转到 导入界面
        importOrder(){
            let item = {
                urlName: "门店信息导入",
                urlId: new Date().getTime(),
                urlPath: "/common/importTemplate/importTemplate.vue",
                urlPathName: "/importOrderTemplate",
                query:{
                    importList : [
                        {bizName:"门店信息导入",excelFile:"/static/excel/clientStore.xlsx",bizCode:"IMP_STORE_10009",remarks:"门店信息导入"},
                    ]
                },
            }
            this.$emit('openTab', item);
        },
        //清空查询条件
        clear:function () {
            let that = this;
            that.$refs.city.cleanData();
            that.obj ={
                createDate:"",
                warehouseFullName:null,
                warehousePhone:null,
                userLogin:null,
                type:1,
                queryType:5,
            }
        },
        doQueryStore:function () {
            let that = this;
            that.cityOffice =that.$refs.city.getData()
            that.obj.provinceId = that.cityOffice.ProvinceId;
            that.obj.cityId = that.cityOffice.CityId;
            that.obj.districtId = that.cityOffice.DistrictId;
            that.obj.streetId = that.cityOffice.StreetId;
            let url = "api/cmWarehouseBO.ajax?cmd=doQueryCmWarehouse";
            this.$refs.table.load(url,that.obj);
        },
        //静态数据查询
        doQuerySysStaticData:function () {
            let that = this;
            that.common.postUrl("api/sysOragnizeBO.ajax?cmd=getUserDepartment",{"oragnizeType":4},function(data){
                if(that.common.isNotBlank(data) && that.common.isNotBlank(data.items)){
                    that.userOragnize = data.items;
                }
            });
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"USER_STATUS","hasAll":true},function (data) {
                that.tenantStatusList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"SUPPLIER_TYPE","hasAll":true},function (data) {
                that.tenantTypeList = data.items;
            })
            let tenantId=that.common.getCookie("tenantId");
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantDefPName", {"pTenantId":tenantId},function(data){
                that.customerTenantList = data.items;
            });
        },
        //新增
        addStore:function () {
            let that = this;
            let item = {
                urlName: "新增门店",
                urlId: "13" + new Date().getTime(),
                urlPath: "/cm/addStore.vue",
                urlPathName: "/addStore",
                query:{}
            }
            that.$emit('openTab', item);
        },
        //修改
        updateStore:function () {
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
                urlName: "修改门店",
                urlId: "13" + new Date().getTime(),
                urlPath: "/cm/updateStore.vue",
                urlPathName: "/updateStore",
                query:{"warehouseId":selectData[0].warehouseId,"tenantId":selectData[0].tenantId}
            }
            that.$emit('openTab', item);
        },
        //删除
        deleteStore:function () {
            let that = this;
            that.selectData = that.$refs.table.getSelectItem();
            if(that.selectData.length == 0){
                that.$message.error('请选择需要删除的数据！');
                return;
            }
            that.warehouseIds="";
            that.selectData.forEach((el,index)=>{
                if(index == that.selectData.length-1){
                    that.warehouseIds+=el.warehouseId ;
                }else {
                    that.warehouseIds+=el.warehouseId + ",";
                }
            })
            that.$confirm("是否删除！", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.common.postUrl("api/cmWarehouseBO.ajax?cmd=deleteCmWarehouse",{"warehouseIds": that.warehouseIds},function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.doQueryStore();
                        that.$message({
                            type: 'success',
                            message: "删除成功！"
                        });
                    }
                });
            });
        },
        addStoreSysUser:function () {
            let that = this;
            let selectData = that.$refs.table.getSelectItem();
            if(selectData.length == 0){
                that.$message.error('请选择需要添加店员的数据！');
                return;
            }
            if(selectData.length != 1){
                that.$message.error('只能选择一条数据！');
                return;
            }
            that.warehouseId = selectData[0].warehouseId;
            that.userName = null,
                that.userPhone =null,
                that.userLogin =null,
                that.userPassword= null,
                that.dialogFormVisible=true;
        },
        doSaveUser:function () {
            let that = this;
            if(that.common.isBlank(that.warehouseId)){
                that.$message.error('未获取到门店信息！');
                return;
            }
            if(that.common.isBlank(that.userName)){
                that.$message.error('请填写店员名称！');
                return;
            }
            if(that.common.isBlank(that.userPhone)){
                that.$message.error('请填写店员手机！');
                return;
            }
            if(that.common.isBlank(that.userLogin)){
                that.$message.error('请填写店员登录账号！');
                return;
            }
            if(that.common.isBlank(that.userPassword)){
                that.$message.error('请填写店员登录密码！');
                return;
            }
            if(!that.common.validatemobile(that.userLogin)){
                that.$message.error('登录账号只能是手机号！');
                return;
            }
            if(!that.common.validatemobile(that.userPhone)){
                that.$message.error('请输入正确的联系手机号！');
                return;
            }
            let obj = {
                userName:that.userName,
                userPhone:that.userPhone,
                userLogin:that.userLogin,
                userPassword:that.userPassword,
                storeId:that.warehouseId,
            }
            that.$confirm(that.rms, '是否新增店员？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/cmWarehouseBO.ajax?cmd=doSaveUser";
                that.common.postUrl(url,obj,function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "新增店员成功"
                        });
                        that.dialogFormVisible=false;
                        that.doQueryStore();
                    }
                });
            });
        },
        dblclickItem:function (data) {
            let that = this;
            let item = {
                urlName: "门店详情",
                urlId: "13" + new Date().getTime(),
                urlPath: "/cm/storeDetails.vue",
                urlPathName: "/storeDetails",
                query:{"warehouseId":data.warehouseId}
            }
            that.$emit('openTab', item);
        },
    },
}