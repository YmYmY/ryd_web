import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"
import mycity from '@/components/mycity/mycity.vue'
export default {
    name: 'sendVehicle',
    data() {
        return {
            //table组件数据
            head :[
                {"name":"派车批次","code":"sendBatch","width":"150","type" : "text"},
                {"name":"派车单号","code":"sendNumber","width":"120","type" : "text"},
                {"name":"项目客户","code":"sendClientName","width":"120","type" : "text"},
                {"name":"派车时间","code":"createDate","width":"150","type" : "text"},
                {"name":"派车区域","code":"sendRegionName","width":"120","type" : "text"},
                {"name":"业务类型","code":"businessTypeName","width":"120","type" : "text"},
                {"name":"派车状态","code":"sendStatusName","width":"120","type" : "text"},
                {"name":"靠台时间","code":"dependDate","width":"150","type" : "text"},
                {"name":"到达时间","code":"arriveDate","width":"150","type" : "text"},
                {"name":"车牌号","code":"vehicleCode","width":"120","type" : "text"},
                {"name":"司机姓名","code":"driverName","width":"120","type" : "text"},
                {"name":"司机手机","code":"driverPhone","width":"120","type" : "text"},
                {"name":"总任务数","code":"taskCount","width":"120","type" : "text"},
                {"name":"装车体积（方）","code":"packageVolumeDouble","width":"120","type" : "text"},
                {"name":"装车重量（公斤）","code":"packageWeightDouble","width":"120","type" : "text"},
                {"name":"派车费用","code":"sendCostDouble","width":"120","type" : "text"},
                {"name":"结算方式","code":"paymentTypeName","width":"120","type" : "text"},
                {"name":"运费分摊方式","code":"freightSharingTypeName","width":"120","type" : "text"},
                {"name":"派车人","code":"userName","width":"120","type" : "text"},
                {"name":"派车备注","code":"sendRemarks","width":"120","type" : "text"},
            ],
            obj:{
                sendRegion:"-1",
                sendDate:null,
                businessType:"-1",
                sendBatch:"",
            },
            regionList:[],
            businessTypeList:[],
        }
    },
    //进入页面
    beforeRouteEnter(to,from,next){
        next(that => {
            //调用刷新方法
            that.doQuerySendVehicle();
            that.doQuerySysStaticData();
        });
    },
    components: {
        tableCommon,
        mycity
    },
    methods: {
        downloadExcelFile:function(){
            this.$refs.table.downloadExcelFile();
        },
        //清空查询条件
        clear:function () {
            let that = this;
            that.obj ={
                sendRegion:"-1",
                sendDate:null,
                businessType:"-1",
                sendBatch:"",
            }
        },
        doQuerySendVehicle:function () {
            let that = this;
            let url = "api/sysVehicleBO.ajax?cmd=doQuerySendVehicle";
            this.$refs.table.load(url,that.obj);
        },
        //静态数据查询
        doQuerySysStaticData:function () {
            let that = this;
            // 区域部门
            that.common.postUrl("api/sysRegionBO.ajax?cmd=getSysRegionTenantList",{},function(data){
                if(that.common.isNotBlank(data) && that.common.isNotBlank(data.items)){
                    that.regionList = data.items;
                    that.regionList.unshift({regionName:"所有",regionId:"-1"});
                }
            });
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"BUSINESS_TYPE","hasAll":true},function (data) {
                that.businessTypeList = data.items;
            })
        },
        //新增项目派车
        addProjectSend:function () {
            let that = this;
            let item = {
                urlName: "新增项目派车",
                urlId: "13" + new Date().getTime(),
                urlPath: "/order/match/addSendVehicle.vue",
                urlPathName: "/addSendVehicle",
                query:{}
            }
            that.$emit('openTab', item);
        },
        //修改
        updateSend:function () {
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
                urlName: "修改项目派车",
                urlId: "13" + new Date().getTime(),
                urlPath: "/order/match/updateSendVehicle.vue",
                urlPathName: "/updateSendVehicle",
                query:{"sendBatch":selectData[0].sendBatch,"sendId":selectData[0].sendId}
            }
            that.$emit('openTab', item);
        },
        //取消
        deleteSend:function () {
            let that = this;
            that.selectData = that.$refs.table.getSelectItem();
            if(that.selectData.length == 0){
                that.$message.error('请选择需要取消的数据！');
                return;
            }
            that.sendIds="";
            that.selectData.forEach((el,index)=>{
                if(index == that.selectData.length-1){
                    that.sendIds+=el.sendId ;
                }else {
                    that.sendIds+=el.sendId + ",";
                }
            })
            that.$confirm("是否取消！", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.common.postUrl("api/sysVehicleBO.ajax?cmd=deleteCmWarehouse",{"sendIds": that.sendIds},function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.doQuerySendVehicle();
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