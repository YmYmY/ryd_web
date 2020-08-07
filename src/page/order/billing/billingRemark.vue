<template>
    <div id="remark" class="billingRemarkPage">
        <div class="selectAlertBox" v-show="isShowLatelyRemark" @click.stop="stopBub">
            <div class="title">常用备注</div>
            <ul class="list">
                <li v-for="(item,index) in remarkList" :key="index" @click="selRemark(item)">
                    <div v-show="item.isEdit">
                        <el-input class="w_auto" v-model="item.remarks" @keyup.enter.native="saveRemark(item)"></el-input>
                        <div class="operateIcon fr">
                            <span @click="saveRemark(item)"><i class="el-icon-check"></i></span>
                            <span @click="delRemark(item)"><i class="el-icon-close"></i></span>
                        </div>
                    </div>
                    <div class="remarkText" v-show="!item.isEdit">{{item.remarks}}<i class="el-icon-edit" @click.stop="editRemark(item)"></i></div>
                </li>
            </ul>
            <div class="editBtn">
                <el-button size="mini" @click="addRemark()">添加</el-button>
                <el-button size="mini" type="warning" plain @click="hideDialogs()">取消</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'remark',
        props:["remarkType"],
        data() {
            return {                
                remarkList:[],
                isEdit:false,
                isShowLatelyRemark:false,//是否展示常用备注
            }
        },
        mounted() {
            // this.queryRemarks();
        },
        methods: {
            //查询备注
            async queryRemarks(){
                let params = {};
                params.remarkType = this.remarkType;
                let {items} = await this.common.postUrl('api/ordOrderInfoBO.ajax?cmd=queryRemarksList',params);
                items.forEach(el => {
                    el.remarkCache = el.remarks;
                })
                this.remarkList = items;
            },
            // 开始编辑
            async editRemark(item){
                this.remarkList.forEach(el => {
                    el.remarks = el.remarkCache;
                    el.isEdit = false;
                })
                item.isEdit = true;
                this.$forceUpdate();
            },
            // 保存
            async saveRemark(item){
                item.remarkType = this.remarkType;
                await this.common.postUrl('api/ordOrderInfoBO.ajax?cmd=saveOrUpdateRemark',item);
                this.queryRemarks();
                this.$message('修改成功');
            },
            // 新增
            async addRemark(item){
                await this.queryRemarks();
                this.remarkList.unshift({remarks:"",isEdit:true});
            },
            async delRemark(item){
                if(this.common.isBlank(item.remarkCache)){
                    this.remarkList.splice(this.remarkList.length-1,1);
                }else{
                    await this.$confirm('是否删除该备注？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    })
                    await this.common.postUrl('api/ordOrderInfoBO.ajax?cmd=deleteRemark',item);
                    this.queryRemarks();
                    this.$message('删除成功');
                }
            },
            hideDialogs(){
                this.isShowLatelyRemark = false;                
            },
            cancelEdit(){
                this.remarkList.forEach(el => {
                    el.remarks = el.remarkCache;
                })
                this.isEdit = false;
            },
            //选择备注
            selRemark(item){
                this.$emit("remarkCallBack",item);
            },
            //常用备注
            showLatelyRemark(){
                this.queryRemarks();
                const timer = setTimeout(() => {
                    this.isShowLatelyRemark = true;
                    this.$forceUpdate();
                    clearTimeout(timer);
                })
            },     
            stopBub(){
                // 防冒泡处理
                return false;
            },  
        },
    }
</script>

<style lang="scss">
.billingRemarkPage{
    .selectAlertBox .list li .el-input__inner{
        padding:0 12px!important;
    }
    .remarkText{
        line-height: 32px;
        .el-icon-edit{
            display: none;
            float: right;
            font-size: 12px;
            line-height: 32px;
            margin: 0 10px;
            color: $main-color;
        }
        &:hover .el-icon-edit{
            display: block;
        }
    }
}
</style>