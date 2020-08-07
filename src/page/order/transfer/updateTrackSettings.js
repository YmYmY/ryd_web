import myFileModel from '@/components/myFileModel/myFileModel.vue'
import mycity from '@/components/mycity/mycity.vue'
export default {
    name: 'updateTrackSettings',
    data() {
        return {
            obj:{
                mainId:"",
                interfaceType :"",
                vehicleCode:"",
                licensePlateColor:"",
                remarks:"",
                getMonth:"",
                id:this.$route.query.id,
            },
            licensePlateColorList:[],
            tenantList:[],
            yearMonthsList:[],
            interfaceTypeList:[],
        }
    },
    mounted() {
        this.doQuerySysStaticData();
    },
    methods: {
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        //静态数据查询
        doQuerySysStaticData:function () {
            let that = this;
            that.yearMonthsList=this.common.getYearMonths();
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"INTERFACE_TYPE"},function (data) {
                that.interfaceTypeList = data.items;
            })
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantDefAll", {"attributionType":1},function(data){
                that.tenantList = data.items;
            });
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"LICENSE_PLATE_COLOR"},function (data) {
                that.licensePlateColorList = data.items;
            })
            that.common.postUrl("api/sysVehicleBO.ajax?cmd=getTrackSettings",{"id":that.obj.id},function (data) {
                that.obj = data;
                that.obj.mainId = data.mainId;
                that.obj.interfaceType = data.interfaceType + "";
                that.obj.licensePlateColor = data.licensePlateColor + "";
                that.obj.getMonth = data.getMonth.split(",");
            })
        },
        doSave:function () {
            let that = this;
            if(that.common.isBlank(that.obj.mainId)){
                that.$message.error('请选择消费主体！');
                return;
            }
            if(that.common.isBlank(that.obj.interfaceType)){
                that.$message.error('请选择接口名称！');
                return;
            }
            if(that.common.isBlank(that.obj.vehicleCode)){
                that.$message.error('请输入车牌号码！');
                return;
            }
            if(that.common.isBlank(that.obj.licensePlateColor)){
                that.$message.error('请选择车牌颜色！');
                return;
            }
            if(that.common.isBlank(that.obj.getMonth) || that.obj.getMonth.length==0){
                that.$message.error('请选择获取月份！');
                return;
            }
            that.$confirm(that.rms, '是否新增轨迹获取？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysVehicleBO.ajax?cmd=doSaveTrackSettings";
                that.common.postUrl(url,that.obj,function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "新增成功"
                        });
                        that.$emit('clostToOther',that.$route.meta.id);
                    }
                });
            });
        },
        cancel:function () {
            let that = this;
            that.$emit('clostToOther', that.$route.meta.id);
        },

    },
    components: {
        myFileModel,
        mycity
    }
}