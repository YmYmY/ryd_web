import myFileModel from '@/components/myFileModel/myFileModel.vue'
import mycity from '@/components/mycity/mycity.vue'
export default {
    name: 'dockingSystem',
    data() {
        return {
            tenantId:this.$route.query.tenantId,
            projectList:[],
            projectTypeList:[],
            obj:{
                payType:"-1",
                phoneTwo:null,
                phoneOne:null,
                projectTypeOne:null,
                projectTypeTwo:null,
            },
            configListOne:[],   //项目一
            configListTwo:[],   //项目二
            showConfigListOne:false,    //项目选择后
            showConfigListTwo:false,
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
        async doQuerySysStaticData () {
            let that = this;
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"PROJECT_TYPE"},function (data) {
                that.projectTypeList = data.items;
            })
            let {items} = await that.common.postUrl("api/kdBusinessParamBO.ajax?cmd=queryProjects",{})
            that.projectList = items;
            that.common.postUrl("api/kdBusinessParamBO.ajax?cmd=queryProjectRels",{"tenantId":that.tenantId},function ({items}) {
                items.forEach((item,index) => {
                    that.projectList.forEach(el => {
                        if(item.kdId == el.kdId){
                            if(index==0){   //第一个
                                that.obj.projectOne = item.kdId+"";
                                that.obj.projectTypeOne = (item.state == 1 ? "1" : "2");
                                that.getConfigsOne(item.kdId,item.configs)
                            }
                            if(index==1){   //第二个
                                that.obj.projectTwo = item.kdId+"";
                                that.obj.projectTypeTwo = (item.state == 1 ? "1" : "2");
                                that.getConfigsTwo(item.kdId,item.configs)
                            }
                        }
                    })
                });
            })
        },
        forceUpdate(){
            this.$forceUpdate();
        },
        //企业信息保存
        doSave:function () {
            let that = this;
            let projectList= [];
            that.projectList.forEach(el => {    //系统对接
                if(el.kdId == this.obj.projectOne){
                    el.configs = this.configListOne;
                    el.state = this.obj.projectTypeOne == 1 ? 1 : 0;
                    projectList.push(el);
                }
                if(el.kdId == this.obj.projectTwo){
                    el.configs = this.configListTwo;
                    el.state = this.obj.projectTypeTwo == 1 ? 1 : 0;
                    projectList.push(el);
                }
            })
            if(that.common.isNotBlank(that.obj.projectOne)){
                if(that.common.isBlank(that.obj.projectTypeOne)){
                    that.$message.error('请选择是否开启对接！');
                    return;
                }
            }
            if(that.common.isNotBlank(that.obj.projectTwo)){
                if(that.common.isBlank(that.obj.projectTypeTwo )){
                    that.$message.error('请选择是否开启对接！');
                    return;
                }
            }
            that.obj.tenantId = that.tenantId;
            that.obj.projectList = JSON.stringify(projectList);
            that.$confirm(that.rms, '是否对接项目？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysTenantDefBO.ajax?cmd=dockingSystem";
                that.common.postUrl(url,that.obj,function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "保存成功"
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
        getConfigsOne(data,configs){
            let that = this;
            that.common.postUrl("api/kdBusinessParamBO.ajax?cmd=queryProjectsDetails",{"kdId":data},function (data) {
                that.configListOne = data.items;
                if(that.common.isNotBlank(configs) && configs.length > 0){
                    configs.forEach(el => {
                        that.configListOne.forEach(e2 => {
                            if(el.fieldKey == e2.fieldKey){
                                e2.fieldValue = el.fieldValue;
                            }
                        });
                    });
                }
                that.showConfigListOne = true;
            });
        },
        getConfigsTwo(data,configs){
            let that = this;
            that.common.postUrl("api/kdBusinessParamBO.ajax?cmd=queryProjectsDetails",{"kdId":data},function (data) {
                that.configListTwo = data.items;
                if(that.common.isNotBlank(configs) && configs.length > 0){
                    configs.forEach(el => {
                        that.configListTwo.forEach(e2 => {
                            if(el.fieldKey == e2.fieldKey){
                                e2.fieldValue = el.fieldValue;
                            }
                        });
                    });
                }
                that.showConfigListTwo = true;
            });
        },
    },
    components: {
        myFileModel,
        mycity
    }
}