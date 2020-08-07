<template>
    <div id="sysOnly">
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
                    <label class="label">发货店仓</label>
                    <div class="input-text">
                        <el-select  v-model="obj.storeName" filterable   @change="selectStore" placeholder="请选择发货店仓名称">
                            <el-option v-for="item in storeIdList" :key="item.id" :label="item.storeFullName" :value="item.id"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <label class="label">收货店仓</label>
                    <div class="input-text">
                        <el-select  v-model="obj.storeFullName" filterable   @change="receiveStore" placeholder="请选择收货店仓名称">
                            <el-option v-for="item in storeIdList" :key="item.id" :label="item.storeFullName" :value="item.id"></el-option>
                        </el-select>
                    </div>
                </div>
            </div>
            <div class="search-btn clearfix">
                <div class="btn">
                    <el-button type="primary" @click="doQuerySysOnly()" plain size="mini" icon="el-icon-search">搜索</el-button>
                </div>
                <div class="btn">
                    <el-button type="danger" @click="clear()" plain size="mini" icon="el-icon-close">清空</el-button>
                </div>
            </div>
        </div>
        <div class="table-content">
            <div class="table-title">
                <h3>
                    <span>一对一匹配列表</span>
                    <el-tooltip effect="light" content="一对一匹配列表" placement="right">
                        <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
                    </el-tooltip>
                </h3>
                <div class="table-title-btn">
                    <el-button type="primary" v-entity="321" @click="addSysOnly()" plain size="mini">新增</el-button>
                    <el-button type="primary" v-entity="322" @click="updateSysOnly()" plain size="mini">修改</el-button>
                    <el-button type="primary" v-entity="323" @click="deleteSysCarrierInfo()" plain size="mini">删除</el-button>
                    <el-button type="primary" v-entity="324" @click="importOrder()" plain size="mini">导入</el-button>
                    <el-button type="primary" v-entity="325" @click="downloadExcelFile()"  plain size="mini">导出</el-button>
                </div>
            </div>
            <tableCommon tableName="sysOnlyTable" ref="table" :head="head" :showNum="true"></tableCommon>
        </div>
    </div>
</template>


<script>
    import sysOnly from './sysOnly.js'
    export default sysOnly
</script>
<style scoped>

</style>