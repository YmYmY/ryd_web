<template>
    <div id="updateAutoDistribution" class="updateAutoDistributionPage">
        <div class="common-info">
            <h3 class="common-title mb_20"><span class="title-name">修改派发</span></h3>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term"><em>*</em>客户名称</label>
                    <div class="input-text">
                        <el-select  v-model="obj.tenantFullName" filterable   @change="selectCustomerTenant" placeholder="请选择客户名称">
                            <el-option v-for="item in customerTenantList" :key="item.tenantId" :label="item.tenantFullName" :value="item.tenantId"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term">项目名称</label>
                    <div class="input-text">
                        <el-select  v-model="obj.projectName" filterable   @change="selectProjectName" placeholder="请选择项目名称">
                            <el-option v-for="item in projectList" :key="item.projectId" :label="item.projectName" :value="item.projectId"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term"><em>*</em>供应商名称</label>
                    <div class="input-text">
                        <el-select  v-model="obj.supplierFullName" filterable   @change="selectSupplierTenant" placeholder="请选择供应商">
                            <el-option v-for="item in supplierTenantList" :key="item.tenantId" :label="item.supplierFullName" :value="item.tenantId"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <div class="bot-btn">
                <el-button type="primary" @click="doSave()">保存</el-button>
                <el-button type="info" @click="cancel()">取消</el-button>
            </div>
            <h3 class="common-title mb_20"><span class="title-name">自动派发</span></h3>
            <div class="table-content">
                <div class="table-title">
                    <h3>
                        <span>自动派发列表</span>
                        <el-tooltip effect="light" content="自动派发列表" placement="right">
                            <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
                        </el-tooltip>
                    </h3>
                    <div class="table-title-btn">
                        <el-button type="primary" v-entity="367" @click="updateAutoDistribution()" plain size="mini">修改</el-button>
                        <el-button type="primary" v-entity="368" @click="deleteAutoDistribution()" plain size="mini">删除</el-button>
                    </div>
                </div>
                <tableCommon tableName="Table" ref="table" :head="head" :showNum="true"></tableCommon>
            </div>
        </div>
    </div>
</template>



<script>
    import updateAutoDistribution from './updateAutoDistribution.js'
    export default updateAutoDistribution
</script>
<style lang="scss">
.updateAutoDistributionPage{
    .treeBox{
        border:$border;
        border-bottom: none;
        border-radius: 3px;
        overflow: hidden;
    }
}
</style>