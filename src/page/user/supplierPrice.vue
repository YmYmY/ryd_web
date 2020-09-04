<template>
    <div id="supplierPrice">
        <div class="search-list clearfix">
            <div class="search-form clearfix">
                <div class="item">
                    <label class="label">区域</label>
                    <div class="input-text">
                        <el-select v-model="obj.regionId" placeholder="请选择">
                            <el-option v-for="item in regionList" :key="item.regionId" :label="item.regionName" :value="item.regionId"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <label class="label">维护运价</label>
                    <div class="input-text">
                        <el-select v-model="obj.freightType" placeholder="请选择">
                            <el-option v-for="item in freightTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <label class="label">供应商名称</label>
                    <div class="input-text">
                        <el-select  v-model="obj.tenantId" filterable  placeholder="请选择供应商">
                            <el-option v-for="item in supplierTenantList" :key="item.tenantId" :label="item.supplierFullName" :value="item.tenantId"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <label class="label">结算方式</label>
                    <div class="input-text">
                        <el-select v-model="obj.payType" placeholder="请选择">
                            <el-option v-for="item in payTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </div>
            </div>
            <div class="search-btn clearfix">
                <div class="btn">
                    <el-button type="primary" @click="doQuerySysTenantDefSupplier()" plain size="mini" icon="el-icon-search">搜索</el-button>
                </div>
                <div class="btn">
                    <el-button type="danger" @click="clear()" plain size="mini" icon="el-icon-close">清空</el-button>
                </div>
            </div>
        </div>
        <div class="table-content">
            <div class="table-title">
                <h3>
                    <span>供应商价格管理列表</span>
                    <el-tooltip effect="light" content="供应商价格管理列表" placement="right">
                        <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
                    </el-tooltip>
                </h3>
                <div class="table-title-btn">
                    <el-button type="primary" v-entity="583" @click="freightSetting()" plain size="mini">运费设置</el-button>
                    <el-button type="primary" v-entity="99" @click="addClientPrice()" plain size="mini">新增</el-button>
                    <el-button type="primary" v-entity="101" @click="clientDetails()" plain size="mini">查看运价</el-button>
                    <el-button type="primary" v-entity="102" @click="importOrder()" plain size="mini">运价导入</el-button>
                    <el-button type="primary" v-entity="103" @click="downloadExcelFile()" plain size="mini">导出</el-button>
                </div>
            </div>
            <tableCommon tableName="clientPriceTable" ref="table" :head="head" :showNum="true"></tableCommon>
        </div>
    </div>
</template>


<script>
    import supplierPrice from './supplierPrice.js'
    export default supplierPrice
</script>
<style scoped>

</style>