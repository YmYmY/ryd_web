<template>
    <div id="paymentReview">
        <div class="search-list clearfix">
            <div class="search-form clearfix">
                <div class="item">
                    <label class="label">申请时间</label>
                    <div class="input-text">
                        <dataPicker :model="obj.payApplicationTime" @callback="data=>{obj.payApplicationTime=data}"></dataPicker>
                    </div>
                </div>
                <div class="item">
                    <label class="label">审核状态</label>
                    <div class="input-text">
                        <el-select v-model="obj.auditStatus" placeholder="请选择">
                            <el-option v-for="item in auditStatusList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
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
                    <label class="label">审批日期</label>
                    <div class="input-text">
                        <dataPicker :model="obj.auditTime" @callback="data=>{obj.auditTime=data}"></dataPicker>
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
                    <span>付款审批列表</span>
                    <el-tooltip effect="light" content="双击查看详情" placement="right">
                        <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
                    </el-tooltip>
                </h3>
                <div class="table-title-btn">
                    <el-button type="primary" v-entity="598" @click="batchApproval()" plain size="mini">批量审批</el-button>
                    <el-button type="primary" v-entity="599" @click="showApproval()" plain size="mini">审批</el-button>
                    <el-button type="primary" v-entity="600" @click="downloadExcelFile()" plain size="mini">导出</el-button>
                </div>
            </div>
            <tableCommon tableName="paymentReviewTable" @dblclickItem="dblclickItem" ref="table" :head="head" :showNum="true"></tableCommon>
        </div>

        <el-dialog title="审核" :visible.sync="dialogFormVisible" center width="350px">
            <div class="common-info" style="border:none;padding:0;">
                <ul class="content clearfix">
                    <li class="item w_auto">
                        <label class="label-term">申请总额</label>
                        <div class="input-text">
                            <el-input  maxlength="20" v-bind:disabled=true v-model="applicationAmount"></el-input>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item w_auto">
                        <label class="label-term"><em>*</em>审核状态</label>
                        <div class="input-text">
                            <el-select v-model="auditStatus" placeholder="请选择">
                                <el-option v-for="item in auditStatusList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                            </el-select>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix" v-show="auditStatus==2">
                    <li class="item w_auto">
                        <label class="label-term"><em>*</em>审核总额</label>
                        <div class="input-text">
                            <el-input  v-mydoubleval placeholder="请输入审核总额" maxlength="20" v-model="auditAmount"></el-input>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item w_auto">
                        <label class="label-term">审核备注</label>
                        <div class="input-text">
                            <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入内容" maxlength="150" v-model="auditNotes"></el-input>
                        </div>
                    </li>
                </ul>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="audit()">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="成本明细" :visible.sync="makeUpShow" width="900px">
            <makeTransitShow v-if="makeUpShow" :outgoingId="outgoingId" :orderId="orderId" :flowId="flowId" @closeCallback="closeCallback" @doQueryFcIncomeExpenses="doQueryPaymentInfo"></makeTransitShow>
        </el-dialog>
    </div>
</template>


<script>
    import paymentReview from './paymentReview.js'
    export default paymentReview
</script>
<style scoped>

</style>