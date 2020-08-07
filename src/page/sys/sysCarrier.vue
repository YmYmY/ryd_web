<template>
    <div id="sysCarrier" class="sysCarrierPage">
        <div class="table_height">
            <table class="tableCommon" width="100%" border="0" cellspacing="0" cellpadding="0">
                <thead class="fixed-thead">
                <tr>
                    <th width="30">序号</th>
                    <th width="100">承运逻辑</th>
                    <th width="100">状态 </th>
                    <th width="100">优先级 </th>
                    <th width="150">说明 </th>
                </tr>
                </thead>
                <tbody class="fixed-tbody">
                <tr v-for="item in carrierTypeList" :key="item.codeValue">
                    <td width="30">{{item.codeValue}}</td>
                    <td width="100">{{item.codeName}}</td>
                    <td width="100">
                        <el-select v-model="item.carrierStatus" placeholder="请选择" :disabled="item.codeValue==1" @change="changeCrrierStatus(item)">
                            <el-option v-for="list in userStatusList" :key="list.codeValue" :label="list.codeName" :value="list.codeValue" ></el-option>
                        </el-select>
                    </td>
                    <td width="100">
                        <el-select v-model="item.carrierGrade" placeholder="请选择" @change="selGrade(item.carrierGrade,item.codeValue)" :disabled="item.carrierStatus==2">
                            <el-option v-for="list in carrierGradeList" :key="list.codeValue" :label="list.codeName" :value="list.codeValue" :disabled="list.disabled"></el-option>
                        </el-select>
                    </td>
                    <td width="150">{{item.codeTypeAlias}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="bot-btn">
            <el-button type="primary" @click="doSave()">保存</el-button>
            <el-button type="info" @click="cancel()">取消</el-button>
        </div>
    </div>
</template>

<script>
    import sysCarrier from './sysCarrier.js'
    export default sysCarrier
</script>
<style lang="scss">
.sysCarrierPage{
    .tableCommon .el-input__inner{
        border:none!important;
    }
    .bot-btn{
        text-align: center;
    }
}
</style>

