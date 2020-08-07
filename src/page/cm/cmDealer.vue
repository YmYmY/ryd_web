<template>
    <div id="cmDealer">
        <div class="search-list clearfix">
            <div class="search-form clearfix">
                <div class="item">
                    <label class="label">加盟时间</label>
                    <div class="input-text">
                        <dataPicker :model="obj.startCreateDate" @callback="data=>{obj.startCreateDate=data}" startPlaceholder="开始" endPlaceholder="结束"></dataPicker>
                    </div>
                </div>
                <div class="item">
                    <label class="label">经销商类型</label>
                    <div class="input-text">
                        <el-select v-model="obj.dealerType" placeholder="请选择">
                            <el-option v-for="item in dealerTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <label class="label">经销商全称:</label>
                    <div class="input-text">
                        <el-input v-model="obj.dealerFullName" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label">联系手机:</label>
                    <div class="input-text">
                        <el-input v-model="obj.dealerPhone" placeholder="请输入"></el-input>
                    </div>
                </div>
            </div>
            <div class="search-btn clearfix">
                <div class="btn">
                    <el-button type="primary" @click="doQuerycmDealer()" plain size="mini" icon="el-icon-search">搜索</el-button>
                </div>
                <div class="btn">
                    <el-button type="danger" @click="clear()" plain size="mini" icon="el-icon-close">清空</el-button>
                </div>
            </div>
        </div>
        <div class="table-content">
            <div class="table-title">
                <h3>
                    <span>经销商管理列表</span>
                    <el-tooltip effect="light" content="经销商管理列表" placement="right">
                        <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
                    </el-tooltip>
                </h3>
                <div class="table-title-btn">
                    <el-button type="primary" v-entity="136" @click="addCmDealer()" plain size="mini">新增</el-button>
                    <el-button type="primary" v-entity="137" @click="updateCmDealer()" plain size="mini">修改</el-button>
                    <el-button type="primary" v-entity="138" @click="importOrder()" plain size="mini">经销商导入</el-button>
                    <el-button type="primary" v-entity="139" @click="deleteCmDealer()" plain size="mini">删除</el-button>
                    <el-button type="primary" v-entity="140" @click="downloadExcelFile()" plain size="mini">导出</el-button>
                </div>
            </div>
            <tableCommon tableName="cmDealerTable" ref="table" :head="head" :showNum="true" @dblclickItem="dblclickItem"></tableCommon>
        </div>

    </div>
</template>


<script>
    import cmDealer from './cmDealer.js'
    export default cmDealer
</script>
<style scoped>

</style>