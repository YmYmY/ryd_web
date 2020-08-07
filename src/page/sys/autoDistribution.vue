<template>
    <div id="autoDistribution">
        <div class="search-list clearfix">
            <div class="search-form clearfix">
                <div class="item">
                    <label class="label">创建时间</label>
                    <div class="input-text">
                        <dataPicker :model="obj.createDate" @callback="data=>{obj.createDate=data}" startPlaceholder="开始" endPlaceholder="结束"></dataPicker>
                    </div>
                </div>
                <div class="item">
                    <label class="label">客户名称</label>
                    <div class="input-text">
                        <el-select  v-model="obj.tenantFullName" filterable   @change="selectCustomerTenant" placeholder="请选择客户名称">
                            <el-option v-for="item in customerTenantList" :key="item.tenantId" :label="item.tenantFullName" :value="item.tenantId"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <label class="label">项目名称</label>
                    <div class="input-text">
                        <el-select  v-model="obj.projectName" filterable   @change="selectProjectName" placeholder="请选择项目名称">
                            <el-option v-for="item in projectList" :key="item.projectId" :label="item.projectName" :value="item.projectId"></el-option>
                        </el-select>
                    </div>
                </div>
            </div>
            <div class="search-btn clearfix">
                <div class="btn">
                    <el-button type="primary" @click="doQueryAutoDistribution()" plain size="mini" icon="el-icon-search">搜索</el-button>
                </div>
                <div class="btn">
                    <el-button type="danger" @click="clear()" plain size="mini" icon="el-icon-close">清空</el-button>
                </div>
            </div>
        </div>
        <div class="table-content">
            <div class="table-title">
                <h3>
                    <span>自动派发</span>
                    <el-tooltip effect="light" content="自动派发列表" placement="right">
                        <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
                    </el-tooltip>
                </h3>
                <div class="table-title-btn">
                    <el-button type="primary" v-entity="366" @click="addAutoDistribution()" plain size="mini">新增派发</el-button>
                    <el-button type="primary" v-entity="367" @click="updateAutoDistribution()" plain size="mini">修改</el-button>
                    <el-button type="primary" v-entity="368" @click="deleteAutoDistribution()" plain size="mini">删除</el-button>
                    <el-button type="primary" v-entity="369" @click="projectMaintenance()" plain size="mini">项目维护</el-button>
                    <el-button type="primary" v-entity="370" @click="downloadExcelFile()" plain size="mini">导出</el-button>
                </div>
            </div>
            <tableCommon tableName="autoDistributionTable" ref="table" :head="head" :showNum="true"></tableCommon>
        </div>
    </div>
</template>


<script>
    import autoDistribution from './autoDistribution.js'
    export default autoDistribution
</script>