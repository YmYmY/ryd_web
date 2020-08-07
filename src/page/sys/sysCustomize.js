export default {
    name: 'sysCustomize',
    data() {
        return {
            fieldType:"1",
            fieldName:"",
            selectType:"1",
            customizeList:[
                {
                    enumerateName:"",
                    enumerateNote:"",
                }
            ],
        }
    },
    mounted() {
        this.doQuerySysStaticData();
    },
    methods: {
        addCustomize(){
            this.customizeList.push({
                enumerateName:"",
                enumerateNote:"",
            })
        },
        delCustomize(index){
            this.customizeList.splice(index,1);
        },

        //静态数据查询
        doQuerySysStaticData:function () {
            let that = this;
            let url = "api/sysTenantDefBO.ajax?cmd=getSysCustomize";
            that.common.postUrl(url,that.obj,function (data) {
                if(!that.common.isBlank(data.fieldName)){
                    that.fieldName =data.fieldName;
                    that.fieldType = data.fieldType+"";
                    that.selectType = data.selectType+"";
                    that.customizeList = data.customizeList;
                }
            });
        },
        doSave:function () {
            let that = this;
            that.obj=[];
            if(that.common.isBlank(that.fieldName)){
                that.$message.error('请输入字段名');
                return;
            }
            for(let el of that.customizeList){
                if(that.common.isBlank(el.enumerateName)){
                    that.$message.error('请选择枚举值');
                    return;
                }
            }
            that.obj.fieldName = that.fieldName;
            that.obj.fieldType = that.fieldType;
            that.obj.selectType= that.selectType;
            that.obj.enumerateNote = that.enumerateNote;
            that.obj.customizeList = JSON.stringify(this.customizeList);
            that.$confirm(that.rms, '是否操作？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url = "api/sysTenantDefBO.ajax?cmd=doSaveSysCustomize";
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
    }
}