<template>
    <div id="sysCarrierInfo">
        <div class="search-list clearfix">
            <div class="search-form clearfix">
                <div class="item">
                    <label class="label">创建时间</label>
                    <div class="input-text">
                        <dataPicker :model="obj.createDate" @callback="data=>{obj.createDate=data}" startPlaceholder="开始" endPlaceholder="结束"></dataPicker>
                    </div>
                </div>
                <div class="item">
                    <label class="label">承运逻辑</label>
                    <div class="input-text">
                        <el-select v-model="obj.carrierId" placeholder="请选择">
                            <el-option v-for="item in carrierIdList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
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
                    <label class="label">店仓名称</label>
                    <div class="input-text">
                        <el-select  v-model="obj.storeFullName" filterable   @change="selectStore" placeholder="请选择店仓名称">
                            <el-option v-for="item in storeIdList" :key="item.id" :label="item.storeFullName" :value="item.id"></el-option>
                        </el-select>
                    </div>
                </div>
            </div>
            <div class="search-btn clearfix">
                <div class="btn">
                    <el-button type="primary" @click="doQuerySysCarrierInfo()" plain size="mini" icon="el-icon-search">搜索</el-button>
                </div>
                <div class="btn">
                    <el-button type="danger" @click="clear()" plain size="mini" icon="el-icon-close">清空</el-button>
                </div>
            </div>
        </div>
        <div class="table-content">
            <div class="table-title">
                <h3>
                    <span>承运关系列表</span>
                    <el-tooltip effect="light" content="承运关系列表" placement="right">
                        <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
                    </el-tooltip>
                </h3>
                <div class="table-title-btn">
                    <el-button type="primary" v-entity="104" @click="addSysCarrierInfo()" plain size="mini">新增</el-button>
                    <el-button type="primary" v-entity="105" @click="upSysCarrierInfo()" plain size="mini">修改</el-button>
                    <el-button type="primary" v-entity="106" @click="deleteSysCarrierInfo()" plain size="mini">删除</el-button>
                    <el-button type="primary" v-entity="452" @click="importOrder()" plain size="mini">导入</el-button>
                    <el-button type="primary" v-entity="107" @click="downloadExcelFile()"  plain size="mini">导出</el-button>
                </div>
            </div>
            <tableCommon tableName="sysCarrierInfoTable" ref="table" :head="head" :showNum="true"></tableCommon>
        </div>
    </div>
</template>


<script>
    import sysCarrierInfo from './sysCarrierInfo.js'
    export default sysCarrierInfo
</script>
<style scoped>

</style>