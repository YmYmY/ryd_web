<template>
    <div id="sysPrint" class="sysPrintPage">
        <div class="common-info">
            <div class="table_height">
                <table class="tableCommon" width="100%" border="0" cellspacing="0" cellpadding="0">
                    <thead>
                    <tr>
                        <th width="100">应用模块</th>
                        <th width="100">模板名称</th>
                        <th width="100">系统默认模板</th>
                        <th width="100">自定义模板</th>
                        <th width="100">生效模板</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="o in dataItems">
                        <td>{{o.moduleName}}</td>
                        <td>{{o.bizName}}</td>
                        <td>
                            <span v-if="o.bizCode!=0&&o.configId!=0">
                                <a v-if="o.isExpress==0" class="bs" href="#"  @click="toViewPrint(o,o.configId)">模板预览</a>
                                <a v-if="o.isExpress==1" class="bs" href="#" @click="toViewExpressPrint(o.configId,o.bizCode)">定义模板</a>
                                <a v-if="o.effectConfigLevel==1" class="bs abc" href="#">当前生效</a>
                                <a v-if="o.effectConfigLevel!=1" class="bs" href="#" @click="toSetEffectPrintConfig($event,o,1)">设置生效</a>
                            </span>
                            <span v-if="o.bizCode==0||o.configId==0" style="color:#fc123b;">无</span>
                        </td>
                        <td>
                            <span v-if="o.bizCode!=0">
                                <span v-if="o.orgConfigId!=0">
                                    <a v-if="o.isExpress==0" class="bs" href="#" @click="toViewPrint(o,o.orgConfigId)">模板预览</a>
                                    <a v-if="o.isExpress==1" class="bs" href="#" @click="toViewExpressPrint(o.orgConfigId,o.bizCode)">定义模板</a>
                                    <a v-if="o.effectConfigLevel==3" class="bs abc" href="#">当前生效</a>
                                    <a v-if="o.effectConfigLevel!=3" class="bs" href="#" @click="toSetEffectPrintConfig($event,o,3)">设置生效</a>
                                </span>
                                <span v-if="o.isExpress==0">
                                    <a v-if="o.configId!=0||o.tenantConfigId!=0||o.orgConfigId!=0" class="bs" href="#" @click="toSetPrintConfig(o.orgConfigId,o.bizCode,2)">定义模板</a>
                                    <span v-if="o.configId==0&&o.tenantConfigId==0&&o.orgConfigId==0" style="color:#fc123b;">无</span>
                                </span>
                                <span v-if="o.isExpress==1">
                                    <span v-if="o.orgConfigId==0" style="color:#fc123b;">无 </span>
                                    <a v-if="o.configId!=0||o.tenantConfigId!=0||o.orgConfigId!=0" class="bs" href="#" @click="toExpressPrintConfig(o.orgConfigId,o.bizCode,2)">定义模板</a>
                                </span>
                            </span>
                            <span v-if="o.bizCode==0" style="color:#fc123b;">无</span>
                        </td>
                        <td>
                            <span v-if="o.effectConfigLevel==1">系统默认模板</span>
                            <span v-if="o.effectConfigLevel==3">自定义模板</span>
                            <span v-if="o.effectConfigLevel==0 || !o.effectConfigLevel" style="color:#fc123b;">未设置生效模板</span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import sysPrint from './sysPrint.js'
    export default sysPrint
</script>
<style lang="scss">
.sysPrintPage{
    .tableCommon .el-input__inner{
        border:none!important;
    }
    .bot-btn{
        text-align: center;
    }
}
</style>

