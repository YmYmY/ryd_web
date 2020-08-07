<template>
    <div id="orderModify" class="orderModifyPage">
        <div class="table_height">
            <table class="tableCommon" width="100%" border="0" cellspacing="0" cellpadding="0">
                <thead class="fixed-thead">
                <tr>
                    <th width="100">字段名</th>
                    <th width="100">修改前值</th>
                    <th width="100">修改后值</th>
                    <th width="100">修改人</th>
                    <th width="100">修改时间</th>
                </tr>
                </thead>
                <tbody class="fixed-tbody">
                <tr v-for="item in orderModify" :key="item.codeValue">
                    <td width="100" :title="item.fieldName">{{item.fieldName}}</td>
                    <td width="100" :title="item.oldValue">{{item.oldValue}}</td>
                    <td width="100" :title="item.newValue">{{item.newValue}}</td>
                    <td width="100">{{item.opName}}</td>
                    <td width="100">{{item.opDate}}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import orderModify from './orderModify.js'
    export default orderModify
</script>
<style lang="scss">
.orderModifyPage{
    .tableCommon .el-input__inner{
        border:none!important;
    }
    .bot-btn{
        text-align: center;
    }
}
</style>

