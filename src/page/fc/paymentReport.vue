<template>
    <div id="paymentReport">
        <div class="search-list clearfix">
            <div class="search-form clearfix">
                <div class="item">
                    <label class="label">付款日期</label>
                    <div class="input-text">
                        <dataPicker :model="obj.payTime" @callback="data=>{obj.payTime=data}"></dataPicker>
                    </div>
                </div>
                <div class="item">
                    <label class="label">供应商名称</label>
                    <div class="input-text">
                        <el-select  v-model="obj.supplierTenantId" filterable  placeholder="请选择供应商">
                            <el-option v-for="item in supplierTenantList" :key="item.tenantId" :label="item.supplierFullName" :value="item.tenantId"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <label class="label">申请人</label>
                    <div class="input-text">
                        <el-input v-model="obj.payApplicantName"  placeholder="请输入" ></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label">外发单号</label>
                    <div class="input-text">
                        <el-input v-model="obj.outgoingTrackingNum"  placeholder="请输入" ></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label">开户名</label>
                    <div class="input-text">
                        <el-input v-model="obj.bankPeople"  placeholder="请输入" ></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label">客户名称:</label>
                    <div class="input-text">
                        <el-select  v-model="obj.customerTenantId" filterable   placeholder="请选择客户名称">
                            <el-option v-for="item in customerTenantList" :key="item.tenantId" :label="item.tenantFullName" :value="item.tenantId"></el-option>
                        </el-select>
                    </div>
                </div>
            </div>
            <div class="search-btn clearfix">
                <div class="btn">
                    <el-button type="primary" @click="doQueryPaymentInfo()" plain size="mini" icon="el-icon-search">搜索</el-button>
                </div>
                <div class="btn">
                    <el-button type="danger" @click="clear()" plain size="mini" icon="el-icon-close">清空</el-button>
                </div>
            </div>
        </div>
        <div class="table-content">
            <div class="table-title">
                <h3>
                    <span>付款报表列表</span>
                    <el-tooltip effect="light" content="双击查看详情" placement="right">
                        <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
                    </el-tooltip>
                </h3>
                <div class="table-title-btn">
                    <el-button type="primary" v-entity="603" @click="downloadExcelFile()" plain size="mini">导出</el-button>
                </div>
            </div>
            <tableCommon tableName="paymentReportTable" @dblclickItem="dblclickItem" ref="table" :head="head" :showNum="true"></tableCommon>
        </div>
        <el-dialog title="成本明细" :visible.sync="makeUpShow" width="900px">
            <makeTransitShow v-if="makeUpShow" :outgoingId="outgoingId" :orderId="orderId" :flowId="flowId" @closeCallback="closeCallback" @doQueryFcIncomeExpenses="doQueryPaymentInfo"></makeTransitShow>
        </el-dialog>
    </div>
</template>


<script>
    import paymentReport from './paymentReport.js'
    export default paymentReport
</script>
<style scoped>

</style>