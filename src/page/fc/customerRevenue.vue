<template>
    <div id="customerRevenue">
        <div class="search-list clearfix">
            <div class="search-form clearfix">
                <div class="item">
                    <label class="label">下单时间</label>
                    <div class="input-text">
                        <dataPicker :model="obj.queryTimes" @callback="data=>{obj.queryTimes=data}"></dataPicker>
                    </div>
                </div>
                <div class="item">
                    <label class="label">所属区域</label>
                    <div class="input-text">
                        <el-select v-model="obj.regionId" filterable placeholder="请选择">
                            <el-option v-for="item in regionList" :key="item.regionId" :label="item.regionName" :value="item.regionId"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <label class="label">付款状态</label>
                    <div class="input-text">
                        <el-select v-model="obj.paySts" placeholder="请选择">
                            <el-option v-for="item in orderPayStsList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <label class="label">付款时间</label>
                    <div class="input-text">
                        <dataPicker :model="obj.payDate" @callback="data=>{obj.payDate=data}"></dataPicker>
                    </div>
                </div>
                <div class="item">
                    <label class="label">结算方式</label>
                    <div class="input-text">
                        <el-select v-model="obj.paymentType" placeholder="请选择">
                            <el-option v-for="item in paymentTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <label class="label">运单状态</label>
                    <div class="input-text">
                        <el-select v-model="obj.orderOutState" placeholder="请选择">
                            <el-option v-for="item in orderOutStateList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <label class="label">推送状态</label>
                    <div class="input-text">
                        <el-select v-model="obj.payFlag" placeholder="请选择">
                            <el-option v-for="item in payFlagList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <label class="label">下单客户</label>
                    <div class="input-text">
                        <el-select v-model="obj.customerTenantId" filterable placeholder="请选择">
                            <el-option v-for="item in customerTenantList" :key="item.tenantId" :label="item.tenantFullName" :value="item.tenantId"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <label class="label">运单号</label>
                    <div class="input-text">
                        <el-input v-model="obj.trackingNum" v-mynumval placeholder="请输入完整单号" type="text"></el-input>
                    </div>
                </div>
            </div>
            <div class="search-btn clearfix">
                <div class="btn">
                    <el-button type="primary" @click="doQueryFcIncomeExpenses()" plain size="mini" icon="el-icon-search">搜索</el-button>
                </div>
                <div class="btn">
                    <el-button type="danger" @click="clear()" plain size="mini" icon="el-icon-close">清空</el-button>
                </div>
            </div>
        </div>
        <div class="table-content">
            <div class="table-title">
                <h3>
                    <span>收支管理列表</span>
                    <el-tooltip effect="light" content="双击查看详情" placement="right">
                        <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
                    </el-tooltip>
                </h3>
                <div class="table-title-btn">
                    <el-button type="primary" v-entity="388" @click="showMakeUp()" plain size="mini">信息补录</el-button>
                    <el-button type="primary" v-entity="389" @click="importOrder()" plain size="mini">批量导入</el-button>
                    <el-button type="primary" v-entity="390" @click="pushFee()" plain size="mini">推送费用</el-button>
                    <el-button type="primary" v-entity="391" @click="cancelOrder()" plain size="mini">取消运单</el-button>
                    <el-button type="primary" v-entity="392" @click="showRefund()" plain size="mini">退款</el-button>
                    <el-button type="primary" v-entity="393" @click="downloadExcelFile()" plain size="mini">导出</el-button>
                </div>
            </div>
            <tableCommon tableName="customerRevenueTable" @dblclickItem="dblclickItem" ref="table" :head="head" :showNum="true" :doSum="true"></tableCommon>
        </div>

        <el-dialog title="退款" :visible.sync="dialogFormVisible" center width="350px">
            <div class="common-info" style="border:none;padding:0;">
                <ul class="content clearfix">
                    <li class="item w_auto">
                        <label class="label-term"><em>*</em>退款金额</label>
                        <div class="input-text">
                            <el-input  v-mydoubleval placeholder="请输入退款金额" maxlength="20" v-model="refundAmount"></el-input>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item w_auto">
                        <label class="label-term"><em>*</em>退款原因</label>
                        <div class="input-text">
                            <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入内容" maxlength="150" v-model="refundDesc"></el-input>
                        </div>
                    </li>
                </ul>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="refund()">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="信息补录" :visible.sync="makeUpShow" width="600px">
            <makeUp v-if="makeUpShow" :orderId="orderId" :queryType="obj.queryType" @closeCallback="closeCallback" @doQueryFcIncomeExpenses="doQueryFcIncomeExpenses"></makeUp>
        </el-dialog>

    </div>
</template>


<script>
    import customerRevenue from './customerRevenue.js'
    export default customerRevenue
</script>
<style scoped>

</style>