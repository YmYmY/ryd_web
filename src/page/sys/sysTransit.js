import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"

export default {
    name: 'sysTransit',
    data() {
        return {
            //table组件数据
            head :[
                {"name":"合并编号","code":"mergeCode","width":"110","type" : "text"},
                {"name":"合并类型","code":"mergeTypeName","width":"100","type" : "text"},
                {"name":"客户全称","code":"tenantFullName","width":"100","type" : "text"},
                {"name":"客户简称","code":"tenantName","width":"100","type" : "text"},
                {"name":"仓店全称","code":"warehouseFullName","width":"80","type" : "text"},
                {"name":"联系人","code":"warehousePeople","width":"80","type" : "text"},
                {"name":"联系手机","code":"warehousePhone","width":"80","type" : "text"},
                {"name":"省市区","code":"cityName","width":"80","type" : "text"},
                {"name":"详细地址","code":"warehouseAddress","width":"80","type" : "text"},
                {"name":"添加人","code":"userName","width":"80","type" : "text"},
                {"name":"创建时间","code":"createDate","width":"80","type" : "text"},
                {"name":"备注","code":"remark","width":"80","type" : "text"},
            ],
            obj:{
                createDate:"",
                tenantFullName:null,
                clientId:"",
                warehouseFullName:"",
                warehouseId:null,
                warehousePeople:"",
            },
            from:{
                mergeType:"1",
                createDate:"",
                tenantFullName:null,
                clientId:"",
                warehouseFullName:"",
                warehouseId:null,
                warehousePeople:"",
                remark:"",
                warehousePhone:""
            },
            sysTransitList:[],
            mergeTypeList:[],
            dialogFormVisible:false,
            customerTenantList:[],
            warehouseList:[],
            warehouseFromList:[],
        }
    },
    //进入页面
    beforeRouteEnter(to,from,next){
        next(that => {
            //调用刷新方法
            that.doQuerySysTransit();
            that.doQuerySysStaticData();
        });
    },
    components: {
        tableCommon
    },
    methods: {
        saveSysTransit:function(){
            let that = this;
            if(that.sysTransitList.length == 0){
                that.$message.error('请选择需要中转合并的店仓！');
                return;
            }
            let sysTransitList = JSON.stringify(that.sysTransitList);
            that.$confirm(that.rms, '是否确认操作？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysStowageBO.ajax?cmd=saveSysTransit";
                that.common.postUrl(url,{"sysTransitList":sysTransitList,"isType":that.isType},function (data) {
                    if(data != 'success'){
                        that.$message.error('操作失败！');
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "操作成功"
                        });
                        that.dialogFormVisible=false;
                        that.doQuerySysTransit();
                    }
                });
            });
        },
        addTable:function(){
            let that = this;
            if(that.common.isBlank(that.from.warehouseId)){
                that.$message.error('请先选择店仓！');
                return;
            }
            for(let el of that.sysTransitList){
                if(el.warehouseId==that.from.warehouseId){
                    that.$message.error('该店仓已存在！');
                    return;
                }
                if(el.clientId!=that.from.clientId){
                    that.$message.error('店仓归属客户不一致！');
                    return;
                }
                if(el.mergeType!=that.from.mergeType){
                    that.$message.error('合并类型不一致！');
                    return;
                }

            }
            let obj = this.common.copyObj(that.from);
            that.sysTransitList.push(obj);
        },
        delSysTransit:function(index){
            this.sysTransitList.splice(index,1);
        },
        //选择门店
        selectFromWarehouse(obj){
            let that = this;
            that.from.warehouseId=obj.id;
            that.from.warehouseFullName = obj.storeFullName;
            that.from.warehousePeople = obj.warehousePeople;
            that.from.warehousePhone = obj.warehousePhone;
            that.from.clientId = obj.tenantId;
            that.from.mergeCode = that.mergeCode;
            that.from.cityName = "";
            if(that.common.isNotBlank(obj.provinceName)){
                that.from.cityName+=obj.provinceName;
            }
            if(that.common.isNotBlank(obj.cityName)){
                that.from.cityName+=obj.cityName;
            }
            if(that.common.isNotBlank(obj.districtName)){
                that.from.cityName+=obj.districtName;
            }
            if(that.common.isNotBlank(obj.warehouseAddress)){
                that.from.cityName+=obj.warehouseAddress;
            }

        },
        //清空查询条件
        fromClear:function () {
            let that = this;
            that.from ={
                mergeType:"1",
                createDate:"",
                tenantFullName:null,
                clientId:"",
                warehouseFullName:"",
                warehouseId:null,
                warehousePeople:"",
                remark:"",
            }
        },
        // 选择下单客户
        selectFromTenant(tenantId){
            let that = this;
            that.from.clientId=tenantId;
            that.from.warehouseId="";
            that.from.warehouseFullName="";
            that.sysTransitList=[];
            if(!that.common.isBlank(that.from.clientId)){
                that.common.postUrl("api/cmWarehouseBO.ajax?cmd=doQueryStoreAll",{"tenantId":that.from.clientId},function (data) {
                    that.warehouseFromList = data.items;
                })
            }
        },
        downloadExcelFile:function(){
            this.$refs.table.downloadExcelFile();
        },
        //查询列表
        doQuerySysTransit:function () {
            let that = this;
            let url = "api/sysStowageBO.ajax?cmd=doQuerySysTransit";
            that.$refs.table.load(url,that.obj);
        },
        //清空查询条件
        clear:function () {
            let that = this;
            that.obj ={
                createDate:"",
                tenantFullName:null,
                clientId:"",
                warehouseFullName:"",
                warehouseId:null,
                warehousePeople:"",
                warehousePhone:""
            }
        },
        doQuerySysStaticData:function(){
            let that = this;
            let tenantId=that.common.getCookie("tenantId");
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantDefPName", {"pTenantId":tenantId},function(data){
                if(that.common.isNotBlank(data) && that.common.isNotBlank(data.items)){
                    that.customerTenantList = data.items;
                }
            });
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"MERGE_TYPE"},function (data) {
                that.mergeTypeList = data.items;
            })
        },
        // 选择下单客户
        selectCustomerTenant(tenantId){
            let that = this;
            that.obj.clientId=tenantId;
            that.obj.warehouseId="-1";
            that.obj.warehouseFullName="";
            if(!that.common.isBlank(that.obj.clientId)){
                that.common.postUrl("api/cmWarehouseBO.ajax?cmd=doQueryStoreAll",{"tenantId":that.obj.clientId},function (data) {
                    that.warehouseList = data.items;
                })
            }
        },
        //选择门店
        selectWarehouse(warehouseId){
            let that = this;
            that.obj.warehouseId=warehouseId;
        },
        //新增
        addSysTransit:function () {
            let that = this;
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=getMergeCode",{},function (data) {
                that.isType = 1;
                that.mergeCode=data;
                that.dialogFormVisible = true;
                that.sysTransitList=[];
                that.fromClear();
            })
        },
        //修改
        updateSysTransit:function () {
            let that = this;
            that.selectData = that.$refs.table.getSelectItem();
            if(that.selectData.length == 0){
                that.$message.error('请选择需要修改的数据！');
                return;
            }
            if(that.selectData.length != 1){
                that.$message.error('只能选中一条数据！');
                return;
            }
            that.common.postUrl("api/sysStowageBO.ajax?cmd=getSysTransitList",{"mergeCode":that.selectData[0].mergeCode},function (data) {
                that.sysTransitList=data.items;
                that.mergeCode=that.selectData[0].mergeCode;
                that.isType = 2;
                that.fromClear();
                that.dialogFormVisible = true;
            })
        },
        //删除
        deleteSysTransit:function () {
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
            that.$confirm(that.rms, '是否删除选中的数据？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysStowageBO.ajax?cmd=deleteSysTransit";
                that.common.postUrl(url,{"ids":that.ids},function (data) {
                    if(data != 'success'){
                        that.$message.error('删除失败！');
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "删除成功"
                        });
                        that.doQuerySysTransit();
                    }
                });
            });
        }
    }
}