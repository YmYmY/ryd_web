export default {
    name: 'sysCarrier',
    data() {
        return {
            carrierTypeList:[],
            userStatusList:[],
            carrierGradeList:[],
        }
    },
    mounted() {
        this.doQuerySysStaticData();
    },
    methods: {
        //静态数据查询
        async doQuerySysStaticData () {
            let that = this;
            let data = await that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"CARRIER_TYPE"});
            that.carrierTypeList = data.items;
            that.carrierTypeList.forEach(item => {
                if(item.codeValue==1){
                    item.carrierStatus = "1";
                }
            })
            let sysCarrier = await that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysCarrier",{});
            if(!that.common.isBlank(sysCarrier)){
                that.sysCarrier = sysCarrier.items;
                that.sysCarrier.forEach(el => {
                    that.carrierTypeList.forEach(item => {
                        if( el.carrierId == item.codeValue){
                            item.carrierStatus = el.carrierStatus+"";
                            if(item.carrierStatus == 2){
                                item.carrierGrade = '-1';
                            }else{
                                item.carrierGrade = el.carrierGrade+"";
                            }
                        }
                    })
                })
            }
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"USER_STATUS"},function (data) {
                that.userStatusList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"CARRIER_GRADE","hasAll":true},function (data) {
                that.carrierGradeList = data.items;
                that.selGrade();
            })
        },
         doSave:function () {
            let that = this;
            that.obj=[];
            for(let el of that.carrierTypeList){
                if(that.common.isBlank(el.carrierStatus)){
                    that.$message.error('请选择状态');
                    return;
                }
                if(el.carrierStatus == "1" && el.carrierGrade=="-1"){
                    that.$message.error('请选择优先级');
                    return;
                }
            }
            that.obj.objLength=that.carrierTypeList.length;
            that.obj.carrierTypeList=that.carrierTypeList;
            that.$confirm(that.rms, '是否操作？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url = "api/sysTenantDefBO.ajax?cmd=doSaveSysCarrier";
                that.common.postUrl(url,that.obj,function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "操作成功"
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
        selGrade(carrierGrade,codeValue){
            this.carrierTypeList.forEach(el => {    //遍历承运关系列表
                if(carrierGrade == el.carrierGrade && codeValue!=el.codeValue){
                    el.carrierGrade = '-1';
                }
            })
            this.update();
        },
        changeCrrierStatus(item){
            if(item.carrierStatus==2){  //禁用状态
                item.carrierGrade = '-1';
            }
            this.selGrade();
            this.update();
        },
        update(){
            this.$forceUpdate();
        }
    }
}