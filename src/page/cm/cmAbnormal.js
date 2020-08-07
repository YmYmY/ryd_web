import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"
import mycity from '@/components/mycity/mycity.vue'
export default {
    name: 'cmAbnormal',
    data() {
        return {
            //table组件数据
            head :[
                {"name":"登记时间","code":"registerDate","width":"150","type" : "text"},
                {"name":"开单时间","code":"billingDate","width":"100","type" : "text"},
                {"name":"异常编号","code":"id","width":"100","type" : "text"},
                {"name":"运单号","code":"trackingNum","width":"100","type" : "text"},
                {"name":"客户单号","code":"ordNum","width":"100","type" : "text"},
                {"name":"反馈类型","code":"feedbackTypeName","width":"100","type" : "text"},
                {"name":"反馈人","code":"feedbackPeople","width":"80","type" : "text"},
                {"name":"归属区域","code":"regionName","width":"80","type" : "text"},
                {"name":"订单状态","code":"orderOutStateName","width":"120","type" : "text"},
                {"name":"处理状态","code":"dealTypeName","width":"120","type" : "text"},
                {"name":"费用类型","code":"feeTypeName","width":"120","type" : "text"},
                {"name":"登记区域","code":"registerName","width":"120","type" : "text"},
                {"name":"登记人","code":"registerPeople","width":"150","type" : "text"},
                {"name":"异常金额","code":"registerFee","width":"100","type" : "text"},
                {"name":"异常类型","code":"abnormalTypeName","width":"100","type" : "text"},
                {"name":"平台理赔对象","code":"claimName","width":"100","type" : "text"},
                {"name":"平台费用类型","code":"feeTypeName","width":"100","type" : "text"},
                {"name":"平台处理金额","code":"dealFee","width":"100","type" : "text"},
                {"name":"客户理赔对象","code":"clientClaimName","width":"100","type" : "text"},
                {"name":"客户费用类型","code":"clientFeeTypeName","width":"100","type" : "text"},
                {"name":"客户处理金额","code":"clientDealFee","width":"100","type" : "text"},
                {"name":"供应商理赔对象","code":"supplierClaimName","width":"100","type" : "text"},
                {"name":"供应商费用类型","code":"supplierFeeTypeName","width":"100","type" : "text"},
                {"name":"供应商处理金额","code":"supplierDealFee","width":"100","type" : "text"},
                {"name":"异常件数","code":"abnormalNum","width":"80","type" : "text"},
                {"name":"责任方","code":"responName","width":"80","type" : "text"},
                {"name":"异常描述","code":"abnormalNote","width":"120","type" : "text"},
                {"name":"处理时间","code":"dealDate","width":"120","type" : "text"},
                {"name":"处理人","code":"dealPeople","width":"120","type" : "text"},
                {"name":"处理描述","code":"dealNote","width":"120","type" : "text"},
                {"name":"发货店仓","code":"consignorName","width":"150","type" : "text"},
                {"name":"发货人","code":"consignorLinkmanName","width":"100","type" : "text"},
                {"name":"发货手机","code":"consignorBill","width":"100","type" : "text"},
                {"name":"发货电话","code":"consignorTelephone","width":"100","type" : "text"},
                {"name":"收货客户","code":"consigneeName","width":"100","type" : "text"},
                {"name":"收货人","code":"consigneeLinkmanName","width":"100","type" : "text"},
                {"name":"收货手机","code":"consigneeBill","width":"100","type" : "text"},
                {"name":"收货电话","code":"consigneeTelephone","width":"100","type" : "text"},
            ],
            obj:{
                registerDate:"",
                registerId:"-1",
                otherName:"",
                abnormalType:"-1",
                billingDate:[],
                dealType:"-1",
                trackingNum:"",
                feedbackPeople:"",
                xuanType:"2",
                customerTenantId:"-1",
                ordNum:"",
            },
            //选择框数据
            options: [{
                value: '2',
                label: '发货店仓'
            }, {
                value: '3',
                label: '收货店仓'
            },{
                value: '4',
                label: '发货人'
            },{
                value: '5',
                label: '收货人'
            },],
            regionList :[],// 区域列表
            abnormalTypeList:[],
            dealTypeList:[],
            customerTenantList:[],// 下单客户
        }
    },
    //进入页面
    beforeRouteEnter(to,from,next){
        next(that => {
            //调用刷新方法
            that.doQueryCmAbnormal();
            that.doQuerySysStaticData();
        });
    },
    components: {
        tableCommon,
        mycity
    },
    mounted(){        
        this.initHtml();
    },
    methods: {
        initHtml:function(){
            var bnow = new Date();
            bnow.setDate(bnow.getDate() -30);
            this.obj.billingDate.push(this.common.formatTime(bnow,"yyyy-MM-dd HH:mm")+":00");
            this.obj.billingDate.push(this.common.formatTime(new Date(),"yyyy-MM-dd HH:mm:ss"));
        },
        downloadExcelFile:function(){
            this.$refs.table.downloadExcelFile();
        },
        //清空查询条件
        clear:function () {
            let that = this;
            that.obj ={
                registerDate:"",
                registerId:"-1",
                otherName:"",
                abnormalType:"-1",
                billingDate:[],
                dealType:"-1",
                trackingNum:"",
                feedbackPeople:"",
                xuanType:"2",
                customerTenantId:"-1",
                ordNum:"",
            }
        },
        doQueryCmAbnormal:function () {
            let that = this;
            if(that.common.isBlank(that.obj.billingDate)){
                that.$message.error('请选择查询下单时间范围！');
                return;
            }
            let url = "api/cmAbnormalBO.ajax?cmd=doQueryCmAbnormal";
            this.$refs.table.load(url,that.obj);
        },
        //静态数据查询
        doQuerySysStaticData:function () {
            let that = this;
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantDefPName", {"pTenantId":that.common.getCookie("tenantId")},function(data){
                if(that.common.isNotBlank(data) && that.common.isNotBlank(data.items)){
                    that.customerTenantList = data.items;
                    that.customerTenantList.unshift({tenantFullName:"所有",tenantId:"-1"});
                }
            });
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"ABNORMAL_TYPE","hasAll":true},function (data) {
                that.abnormalTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"DEAL_TYPE","hasAll":true},function (data) {
                that.dealTypeList = data.items;
            })
            // 区域部门
            that.common.postUrl("api/sysRegionBO.ajax?cmd=getSysRegionTenantList",{},function(data){
                if(that.common.isNotBlank(data) && that.common.isNotBlank(data.items)){
                    that.regionList = data.items;
                    that.regionList.unshift({regionName:"所有",regionId:"-1"});
                }
            });
        },
        //新增
        addCmAbnormal:function () {
            let that = this;
            let item = {
                urlName: "异常登记",
                urlId: "64" + new Date().getTime(),
                urlPath: "/cm/addCmAbnormal.vue",
                urlPathName: "/addCmAbnormal",
                query:{}
            }
            that.$emit('openTab', item);
        },
        //修改
        updateCmAbnormal:function () {
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
            if(selectData[0].dealType == 3){
                that.$message.error('无法修改已处理完成数据！');
                return;
            }
            that.regionId = that.common.getCookie("orgId");
            that.registerId = selectData[0].registerId;
            if(that.registerId != that.regionId){
                that.$message.error('异常编号' + selectData[0].id + "登记区域与当前登陆区域不相同无法取消");
                return;
            }
            let item = {
                urlName: "异常修改",
                urlId: "64" + new Date().getTime(),
                urlPath: "/cm/updateCmAbnormal.vue",
                urlPathName: "/updateCmAbnormal",
                query:{"id":selectData[0].id,"orderId":selectData[0].orderId}
            }
            that.$emit('openTab', item);
        },
        //异常处理
        dealCmAbnormal:function () {
            let that = this;
            let selectData = that.$refs.table.getSelectItem();
            if(selectData.length == 0){
                that.$message.error('请选择需要处理的数据！');
                return;
            }
            if(selectData.length != 1){
                that.$message.error('只能选择一条数据！');
                return;
            }
            if(selectData[0].dealType == 3){
                that.$message.error('无法修改已处理完成数据！');
                return;
            }
            let item = {
                urlName: "异常处理",
                urlId: "64" + new Date().getTime(),
                urlPath: "/cm/dealCmAbnormal.vue",
                urlPathName: "/dealCmAbnormal",
                query:{"id":selectData[0].id,"orderId":selectData[0].orderId}
            }
            that.$emit('openTab', item);
        },
        //查看详情
        viewCmAbnormal:function () {
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
                urlName: "查看详情",
                urlId: "64" + new Date().getTime(),
                urlPath: "/cm/viewCmAbnormal.vue",
                urlPathName: "/viewCmAbnormal",
                query:{"id":selectData[0].id,"orderId":selectData[0].orderId}
            }
            that.$emit('openTab', item);
        },
        //删除
        deleteCmAbnormal:function () {
            let that = this;
            that.selectData = that.$refs.table.getSelectItem();
            if(that.selectData.length == 0){
                that.$message.error('请选择需要取消的数据！');
                return;
            }
            if(that.selectData.length != 1){
                that.$message.error('只能选择一条数据！');
                return;
            }
            let regionId = that.common.getCookie("orgId");
            if(that.selectData[0].registerId != regionId){
                that.$message.error('异常编号' + that.selectData[0].id + "登记区域与当前登陆区域不相同无法取消");
                return;
            }
            if(that.selectData[0].dealType == 3){
                that.$message.error('异常编号' + that.selectData[0].id + "已处理完成无法取消");
                return;
            }
            that.ids=that.selectData[0].id;
            that.$confirm("是否取消！", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.common.postUrl("api/cmAbnormalBO.ajax?cmd=deleteCmAbnormal",{"ids": that.ids},function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.doQueryCmAbnormal();
                        that.$message({
                            type: 'success',
                            message: "取消成功！"
                        });
                    }
                });
            });
        },
    },
}