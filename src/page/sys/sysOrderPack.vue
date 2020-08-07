<template>
    <div id="sysOrderPack" class="sysOrderPackPage">
        <div class="common-info">
            <div class="table_height">
                <table class="tableCommon" width="100%" border="0" cellspacing="0" cellpadding="0">
                    <thead>
                    <tr>
                        <th width="30">序号</th>
                        <th width="100"><em>*</em>最小体积-立方（大于）</th>
                        <th width="100">最大体积-立方（小于等于） </th>
                        <th width="100">算费归类 </th>
                        <th width="100">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,$index) in packingList" :key="$index">
                        <td width="100">{{$index+1}}</td>
                        <td width="100"><el-input v-model="item.minVolume" maxlength="10" v-mydoubleval @blur="saveOrUpdate(item,$index)" ></el-input></td>
                        <td width="100"><el-input v-model="item.maxVolume" maxlength="10" v-mydoubleval @blur="saveOrUpdate(item,$index)"></el-input></td>
                        <td width="100">{{item.codeName}}</td>
                        <td width="100"><a class="link"  @click="saveOrUpdate(item,$index)">保存</a></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="page-bot-btn">
                <el-button type="info" @click="closeTab()">关闭</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import sysOrderPack from './sysOrderPack.js'
    export default sysOrderPack
</script>
<style lang="scss">
.sysOrderPackPage{
    .tableCommon .el-input__inner{
        border:none!important;
    }
    .bot-btn{
        text-align: center;
    }
}
</style>

