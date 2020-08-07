<template>
    <div id="sysBrand" class="sysBrandPage">
        <div class="common-info">
            <div class="table_height">
                <table class="tableCommon" width="100%" border="0" cellspacing="0" cellpadding="0">
                    <thead>
                    <tr>
                        <th width="30">序号</th>
                        <th width="100">品牌名称</th>
                        <th width="100">备注说明 </th>
                        <th width="100">操作 </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,$index) in brandList" :key="$index">
                        <td width="100">{{$index+1}}</td>
                        <td width="100"><el-input v-model="item.brandName" maxlength="50"></el-input></td>
                        <td width="100"><el-input v-model="item.brandNote" maxlength="50"></el-input></td>
                        <td width="100"><a class="link" v-show="$index==brandList.length-1" @click="addCustomize">添加</a><a class="link" @click="delCustomize($index,item)" v-show="brandList.length>1">删除</a></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="page-bot-btn">
                <el-button type="primary" @click="doSave()">保存</el-button>
                <el-button type="info" @click="cancel()">取消</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import sysBrand from './sysBrand.js'
    export default sysBrand
</script>
<style lang="scss">
.sysBrandPage{
    .tableCommon .el-input__inner{
        border:none!important;
    }
    .bot-btn{
        text-align: center;
    }
}
</style>

