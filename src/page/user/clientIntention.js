import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"
import mycity from '@/components/mycity/mycity.vue'

export default {
    name: 'clientIntention',
    data() {
        return {
            //table组件数据
            head :[
                {"name":"预约拜访时间","code":"intentionDate","width":"110","type" : "text"},
                {"name":"添加时间","code":"createDate","width":"100","type" : "text"},
                {"name":"所在地区","code":"address","width":"100","type" : "text"},
                {"name":"客户状态","code":"clientStateName","width":"100","type" : "text"},
                {"name":"客户全称","code":"clientName","width":"100","type" : "text"},
                {"name":"拥有品牌","code":"clientBrand","width":"100","type" : "text"},
                {"name":"主营业务","code":"clientBusiness","width":"100","type" : "text"},
                {"name":"门店数量","code":"storeNum","width":"100","type" : "text"},
                {"name":"运营规模","code":"operationTypeName","width":"100","type" : "text"},
                {"name":"销售部门","code":"salesName","width":"100","type" : "text"},
                {"name":"销售专员","code":"salesPersonName","width":"100","type" : "text"},
            ],
            obj:{
                createDate:"",
                clientState:"-1",
                clientName:"",
                intentionDate:"",
                salesPersonName:"",
                salesId:-1,
            },
            from:{
                intentionDate:"",
                reservationType:"",
                otherName:"",
                cause:"",
                reservationName:"",
                remarks:"",
                plan:"",
                causeThing:"",
            },
            clientStateList:[],
            reservationTypeList:[],
            salesList:[],
            reservation:false,
            maintain:false,
        }
    },
    //进入页面
    beforeRouteEnter(to,from,next){
        next(that => {
            //调用刷新方法
            that.doQueryClientIntention();
            that.doQuerySysStaticData();
        });
    },
    components: {
        tableCommon,
        mycity
    },
    methods: {
        doSaveMaintain:function(){
            let that = this;
            if(that.common.isBlank(that.from.intentionDate)){
                that.$message.error('请选择拜访时间！');
                return;
            }
            if(that.common.isBlank(that.from.reservationType)){
                that.$message.error('请选择拜访方式！');
                return;
            }
            that.$confirm(that.rms, '是否维护拜访？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysTenantDefBO.ajax?cmd=doSaveMaintain";
                that.common.postUrl(url,that.from,function (data) {
                    if(data != 'success'){
                        that.$message.error('维护失败！');
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "维护成功"
                        });
                        that.maintain=false;
                        that.doQueryClientIntention();
                    }
                });
            });
        },
        doSaveReservation:function(){
            let that = this;
            if(that.common.isBlank(that.from.intentionDate)){
                that.$message.error('请选择预约时间！');
                return;
            }
            if(that.common.isBlank(that.from.reservationType)){
                that.$message.error('请选择拜访方式！');
                return;
            }
            that.$confirm(that.rms, '是否预约拜访？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysTenantDefBO.ajax?cmd=doSaveReservation";
                that.common.postUrl(url,that.from,function (data) {
                    if(data != 'success'){
                        that.$message.error('预约失败！');
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "预约成功"
                        });
                        that.reservation=false;
                        that.doQueryClientIntention();
                    }
                });
            });
        },
        openReservation:function(){
            let that = this;
            that.selectData = that.$refs.table.getSelectItem();
            if(that.selectData.length == 0){
                that.$message.error('请选择需要预约拜访的数据！');
                return;
            }
            if(that.selectData.length != 1){
                that.$message.error('只能选择一条数据！');
                return;
            }
            that.from={};
            that.from.id = that.selectData[0].id;
            that.reservation=true;
        },
        openMaintain:function(){
            let that = this;
            that.selectData = that.$refs.table.getSelectItem();
            if(that.selectData.length == 0){
                that.$message.error('请选择需要维护拜访的数据！');
                return;
            }
            if(that.selectData.length != 1){
                that.$message.error('只能选择一条数据！');
                return;
            }
            that.from={};
            that.from.clientId = that.selectData[0].id;
            that.maintain=true;
        },
        downloadExcelFile:function(){
            this.$refs.table.downloadExcelFile();
        },
        //查询角色列表
        doQueryClientIntention:function () {
            let that = this;
            that.cityOffice =that.$refs.city.getData()
            that.obj.provinceId = that.cityOffice.ProvinceId;
            that.obj.cityId = that.cityOffice.CityId;
            that.obj.districtId = that.cityOffice.DistrictId;
            that.obj.streetId = that.cityOffice.StreetId;
            let url = "api/sysTenantDefBO.ajax?cmd=doQueryClientIntention";
            this.$refs.table.load(url,that.obj);
        },
        //清空查询条件
        clear:function () {
            let that = this;
            that.$refs.city.cleanData();
            that.obj = {
                createDate:"",
                clientState:"-1",
                clientName:"",
                intentionDate:"",
                salesPersonName:"",
                salesId:-1,
            }
        },
        //静态数据查询
        doQuerySysStaticData:function () {
            let that = this;
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"CLIENT_STATE","hasAll":true},function (data) {
                that.clientStateList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"RESERVATION_TYPE"},function (data) {
                that.reservationTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=getSysOragnizeList",{"oragnizeType":"2","hasAll":true},function (data) {
                that.salesList = data.items;
            })
        },
        addClientIntention:function () {
            let that = this;
            let item = {
                urlName: "新增意向客户",
                urlId: "10" + new Date().getTime(),
                urlPath: "/user/addClientIntention.vue",
                urlPathName: "/addClientIntention",
                query: {}
            }
            that.$emit('openTab', item);
        },
        updateClientIntention:function () {
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
            let item = {
                urlName: "修改意向客户",
                urlId: "11" + new Date().getTime(),
                urlPath: "/user/updateClientIntention.vue",
                urlPathName: "/updateClientIntention",
                query:{id:that.selectData[0].id}
            }
            that.$emit('openTab', item);
        },
        deleteClientIntention:function () {
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
            that.$confirm(that.rms, '是否删除意向客户？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysTenantDefBO.ajax?cmd=deleteClientIntention";
                that.common.postUrl(url,{"ids":that.ids},function (data) {
                    if(data != 'success'){
                        that.$message.error('删除失败！');
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "删除成功"
                        });
                        that.doQueryClientIntention();
                    }
                });
            });
        },
    }
}