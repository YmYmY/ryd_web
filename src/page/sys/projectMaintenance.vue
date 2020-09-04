<template>
    <div id="projectMaintenance" class="projectMaintenancePage">
        <div class="common-info">
            <h3 class="common-title mb_20"><span class="title-name">项目维护</span></h3>
            <ul class="content clearfix" v-show="!obj.projectId">
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
                    <label class="label-term"><em>*</em>项目名称</label>
                    <div class="input-text">
                        <el-input v-model="obj.projectName"   maxlength="50"></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>关联类型</label>
                    <div class="input-text">
                        <el-select v-model="obj.projectType" placeholder="请选择" @change="selectType">
                            <el-option v-for="item in projectTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix" v-show="showWarehouse">
                <li class="item">
                    <label class="label-term"><em>*</em>关联店仓</label>
                    <div class="input-text">
                        <el-select v-model="obj.warehouseIds" placeholder="请选择" multiple collapse-tags @change="forceUpdate">
                            <el-option v-for="item in warehouseList" :key="item.id" :label="item.storeFullName" :value="item.id"></el-option>
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
                        <span>项目维护列表</span>
                        <el-tooltip effect="light" content="项目维护列表" placement="right">
                            <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
                        </el-tooltip>
                    </h3>
                    <div class="table-title-btn">
                        <el-button type="primary" v-entity="367" @click="updateProject()" plain size="mini">修改</el-button>
                        <el-button type="primary" v-entity="368" @click="deleteProject()" plain size="mini">删除</el-button>
                    </div>
                </div>
                <tableCommon tableName="projectMaintenanceTable" ref="table" :head="head" :showNum="true"></tableCommon>
            </div>
        </div>
    </div>
</template>



<script>
    import projectMaintenance from './projectMaintenance.js'
    export default projectMaintenance
</script>
<style lang="scss">
.projectMaintenancePage{
    .treeBox{
        border:$border;
        border-bottom: none;
        border-radius: 3px;
        overflow: hidden;
    }
}
</style>