<template>
    <div id="sysProductLogistics">
        <div class="search-list clearfix">
            <div class="search-form clearfix">
                <div class="item">
                    <label class="label">出发地</label>
                    <div class="input-text fl">
                        <mycity  ref="startCity"  selectType="3"  class="city" placeholder="选择地址"></mycity>
                    </div>
                </div>
                <div class="item">
                    <label class="label">目的地</label>
                    <div class="input-text fl">
                        <mycity  ref="endCity"  selectType="3"  class="city" placeholder="选择地址"></mycity>
                    </div>
                </div>
            </div>
            <div class="search-btn clearfix">
                <div class="btn">
                    <el-button type="primary" @click="doQuerySysProductLogistics()" plain size="mini" icon="el-icon-search">搜索</el-button>
                </div>
                <div class="btn">
                    <el-button type="danger" @click="clear()" plain size="mini" icon="el-icon-close">清空</el-button>
                </div>
            </div>
        </div>
        <div class="table-content">
            <div class="table-title">
                <h3>
                    <span>物流价格管理列表</span>
                    <el-tooltip effect="light" content="物流价格管理列表" placement="right">
                        <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
                    </el-tooltip>
                </h3>
                <div class="table-title-btn">
                    <el-button type="primary" v-entity="299" @click="addSysProductLogistics()" plain size="mini">新增</el-button>
                    <el-button type="primary" v-entity="300" @click="updateSysProductLogistics()" plain size="mini">修改</el-button>
                    <el-button type="primary" v-entity="301" @click="deleteSysProductLogistics()" plain size="mini">删除</el-button>
                    <el-button type="primary" v-entity="302" @click="importOrder()" plain size="mini">运价导入</el-button>
                    <el-button type="primary" v-entity="303" @click="downloadExcelFile()" plain size="mini">导出</el-button>
                </div>
            </div>
            <tableCommon tableName="sysProductLogisticsTable" ref="table" :head="head" :showNum="true"></tableCommon>
        </div>
    </div>
</template>


<script>
    import sysProductLogistics from './sysProductLogistics.js'
    export default sysProductLogistics
</script>
<style scoped>

</style>