import myFileModel from '@/components/myFileModel/myFileModel.vue'
import mycity from '@/components/mycity/mycity.vue'
import tableCommon from "@/components/table/tableCommon.vue"
export default {
    name: 'trackSettings',
    data() {
        return {
            //table组件数据
            head :[
                {"name":"消费主体","code":"mainName","width":"150","type" : "text"},
                {"name":"接口名称","code":"interfaceTypeName","width":"150","type" : "text"},
                {"name":"获取月份","code":"getMonth","width":"100","type" : "text"},
                {"name":"车牌号码","code":"vehicleCode","width":"100","type" : "text"},
                {"name":"车牌颜色","code":"licensePlateColorName","width":"80","type" : "text"},
                {"name":"备注","code":"remarks","width":"80","type" : "text"},
                {"name":"配置人","code":"userName","width":"80","type" : "text"},
                {"name":"配置时间","code":"createDate","width":"80","type" : "text"},
            ],
            obj:{
                getMonth:"",
                mainId:"",
                interfaceType:"-1",
                vehicleCode:"",
            },
            tenantList:[],
            interfaceTypeList:[],
        }
    },
    //进入页面
    beforeRouteEnter(to,from,next){
        next(that => {
            //调用刷新方法
            that.doQuerySysStaticData();
            that.doQueryTrackSettings();
        });
    },
    methods: {
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
        daleteTrackSettings:function () {
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
            that.$confirm(that.rms, '是否删除获取轨迹？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysVehicleBO.ajax?cmd=deleteTrackSettings";
                that.common.postUrl(url,{"ids":that.ids},function (data) {
                    if(data != 'success'){
                        that.$message.error('删除失败！');
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "删除成功"
                        });
                        that.doQueryTrackSettings();
                    }
                });
            });
        },
        //修改
        updateTrackSettings:function () {
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
                urlName: "修改获取轨迹",
                urlId: "13" + new Date().getTime(),
                urlPath: "/order/transfer/updateTrackSettings.vue",
                urlPathName: "/updateTrackSettings",
                query:{"id":selectData[0].id}
            }
            that.$emit('openTab', item);
        },
        //新增
        addTrackSettings:function () {
            let that = this;
            let item = {
                urlName: "新增获取轨迹",
                urlId: "13" + new Date().getTime(),
                urlPath: "/order/transfer/addTrackSettings.vue",
                urlPathName: "/addTrackSettings",
                query:{}
            }
            that.$emit('openTab', item);
        },
        downloadExcelFile:function(){
            this.$refs.table.downloadExcelFile();
        },
        doQueryTrackSettings:function () {
            let that = this;
            let url = "api/sysVehicleBO.ajax?cmd=doQueryTrackSettings";
            this.$refs.table.load(url,that.obj);
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        //静态数据查询
        doQuerySysStaticData:function () {
            let that = this;
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"INTERFACE_TYPE","hasAll":true},function (data) {
                that.interfaceTypeList = data.items;
            })
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantDefAll", {"attributionType":1},function(data){
                that.tenantList = data.items;
            });
        },

    },
    components: {
        myFileModel,
        mycity,
        tableCommon,
    }
}