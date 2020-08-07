<template>
    <div id="orderStowage" class="orderStowage">
        <div class="table_height">
            <table class="tableCommon" width="100%" border="0" cellspacing="0" cellpadding="0">
                <thead class="fixed-thead">
                <tr>
                    <th width="100">配载类型</th>
                    <th width="100">批次号 </th>
                    <th width="100">配载件数 </th>
                    <th width="100">配载时间 </th>
                    <th width="100">配载信息 </th>
                    <th width="100">发车区域 </th>
                    <th width="100">目的区域 </th>
                    <th width="100">费用（分摊运费） </th>
                    <th width="100">配载人 </th>
                </tr>
                </thead>
                <tbody class="fixed-tbody">
                <tr v-for="item in orderStowage" :key="item.codeValue">
                    <td width="100">{{item.departTypeName}}</td>
                    <td width="100">{{item.batchNumAlias}}</td>
                    <td width="100">{{item.packageNumber}}</td>
                    <td width="100">{{item.allocateTime}}</td>
                    <td width="100" :title="item.departInfo">{{item.departInfo}}</td>
                    <td width="100">{{item.sourceRegionName}}</td>
                    <td width="100">{{item.destRegionNames}}</td>
                    <td width="100">{{item.divideOrderFeeDouble}}</td>
                    <td width="100">{{item.allocateOpName}}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import orderStowage from './orderStowage.js'
    export default orderStowage
</script>
<style lang="scss">
.orderStowage{
    .tableCommon .el-input__inner{
        border:none!important;
    }
    .bot-btn{
        text-align: center;
    }
}
</style>

