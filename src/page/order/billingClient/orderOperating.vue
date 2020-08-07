<template>
    <div id="orderOperating" class="orderOperatingPage">
        <div class="table_height">
            <table class="tableCommon" width="100%" border="0" cellspacing="0" cellpadding="0">
                <thead class="fixed-thead">
                <tr>
                    <th width="100">操作时间</th>
                    <th width="100">日志类型</th>
                    <th width="100">操作信息</th>
                    <th width="100">操作人</th>
                    <th width="100">操作端</th>
                </tr>
                </thead>
                <tbody class="fixed-tbody">
                <tr v-for="item in orderOperating" :key="item.codeValue">
                    <td width="100">{{item.createDate}}</td>
                    <td width="100">{{item.opTypeName}}</td>
                    <td width="100" :title="item.opContent">{{item.opContent}}</td>
                    <td width="100">{{item.opName}}</td>
                    <td width="100">{{item.logSourceName}}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import orderOperating from './orderOperating.js'
    export default orderOperating
</script>
<style lang="scss">
.orderOperatingPage{
    .tableCommon .el-input__inner{
        border:none!important;
    }
    .bot-btn{
        text-align: center;
    }
}
</style>

