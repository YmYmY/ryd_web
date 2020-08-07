export default {
    name: 'sysBrand',
    data() {
        return {
            brandList:[
                {
                    brandName:"",
                    brandNote:"",
                }
            ],
        }
    },
    mounted() {
        this.doQuerySysStaticData();
    },
    methods: {
        addCustomize(){
            this.brandList.push({
                brandName:"",
                brandNote:"",
            })
        },
        delCustomize(index,item){
            let that = this;
            if(this.common.isNotBlank(item.id)){
                that.$message.error('此品牌已被使用无法删除');
                return;
            }
            this.brandList.splice(index,1);
        },
        //静态数据查询
        doQuerySysStaticData:function () {
            let that = this;
            let url = "api/sysTenantDefBO.ajax?cmd=getSysBrand";
            that.common.postUrl(url,that.obj,function (data) {
                if(data.items.length>0){
                    that.brandList = data.items;
                }
            });
        },
        doSave:function () {
            let that = this;
            that.obj=[];
            for(let el of that.brandList){
                if(that.common.isBlank(el.brandName)){
                    that.$message.error('请输入品牌名称');
                    return;
                }
            }
            that.obj.brandList = JSON.stringify(this.brandList);
            that.$confirm(that.rms, '是否操作？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url = "api/sysTenantDefBO.ajax?cmd=doSaveSysBrand";
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