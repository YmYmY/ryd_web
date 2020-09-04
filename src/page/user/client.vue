<template>
    <div id="client">
        <div class="search-list clearfix">
            <div class="search-form clearfix">
                <div class="item">
                    <label class="label">添加时间</label>
                    <div class="input-text">
                        <dataPicker :model="obj.createDate" @callback="data=>{obj.createDate=data}" startPlaceholder="开始" endPlaceholder="结束"></dataPicker>
                    </div>
                </div>
                <div class="item">
                    <label class="label">办公地区</label>
                    <div class="input-text fl">
                        <mycity  ref="city"  class="city fl" placeholder="选择地址"></mycity>
                    </div>
                </div>
                <div class="item">
                    <label class="label">状态</label>
                    <div class="input-text">
                        <el-select v-model="obj.tenantStatus" placeholder="请选择">
                            <el-option v-for="item in tenantStatusList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <label class="label">客户名称:</label>
                    <div class="input-text">
                        <el-select  v-model="obj.tenantId" filterable   placeholder="请选择客户名称">
                            <el-option v-for="item in customerTenantList" :key="item.tenantId" :label="item.tenantFullName" :value="item.tenantId"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <label class="label">销售部门</label>
                    <div class="input-text">
                        <el-select v-model="obj.salesId" placeholder="请选择">
                            <el-option v-for="item in salesList" :key="item.oragnizeId" :label="item.oragnizeName" :value="item.oragnizeId"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <label class="label">企业类型</label>
                    <div class="input-text">
                        <el-select v-model="obj.tenantType" placeholder="请选择">
                            <el-option v-for="item in tenantTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
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
                    <label class="label">
                        <el-select v-model="obj.oragnizeType">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </label>
                    <div class="input-text">
                        <el-input v-model="obj.userName" placeholder="请输入"></el-input>
                    </div>
                </div>
            </div>
            <div class="search-btn clearfix">
                <div class="btn">
                    <el-button type="primary" @click="doQuerySysTenantDefClient()" plain size="mini" icon="el-icon-search">搜索</el-button>
                </div>
                <div class="btn">
                    <el-button type="danger" @click="clear()" plain size="mini" icon="el-icon-close">清空</el-button>
                </div>
            </div>
        </div>
        <div class="table-content">
            <div class="table-title">
                <h3>
                    <span>客户管理列表</span>
                    <el-tooltip effect="light" content="双击查看详情" placement="right">
                        <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
                    </el-tooltip>
                </h3>
                <div class="table-title-btn">
                    <el-button type="primary" v-entity="85" @click="addClient()" plain size="mini">新增</el-button>
                    <el-button type="primary" v-entity="86" @click="updateClient()" plain size="mini">修改</el-button>
                    <el-button type="primary" v-entity="87" @click="setUpClient()" plain size="mini">客户配置</el-button>
                    <el-button type="primary" v-entity="88" @click="updateStatus()" plain size="mini">启用/禁用</el-button>
                    <el-button type="primary" v-entity="89" @click="downloadExcelFile()" plain size="mini">导出</el-button>
                </div>
            </div>
            <tableCommon @dblclickItem="dblclickItem" tableName="clientTable" ref="table" :head="head" :showNum="true"></tableCommon>
        </div>


        <el-dialog title="禁用客户" :visible.sync="dialogFormVisible" center width="350px">
            <div class="common-info" style="border:none;padding:0;">
                <ul class="content clearfix">
                    <li class="item w_auto">
                        <label class="label-term">禁用原因</label>
                        <div class="input-text">
                            <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入内容" maxlength="150" v-model="disableRemarks"></el-input>
                        </div>
                    </li>
                </ul>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="disable()">确 定</el-button>
            </div>
        </el-dialog>


    </div>
</template>


<script>
    import client from './client.js'
    export default client
</script>
<style scoped>

</style>