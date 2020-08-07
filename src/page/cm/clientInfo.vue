<template>
    <div id="clientInfo">
        <div class="search-list clearfix">
            <div class="search-form clearfix">
                <div class="item">
                    <label class="label">添加时间</label>
                    <div class="input-text">
                        <dataPicker :model="obj.createDate" @callback="data=>{obj.createDate=data}" startPlaceholder="开始" endPlaceholder="结束"></dataPicker>
                    </div>
                </div>
                <div class="item">
                    <label class="label">收货人:</label>
                    <div class="input-text">
                        <el-input v-model="obj.warehousePeople" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label">联系手机:</label>
                    <div class="input-text">
                        <el-input v-model="obj.warehousePhone" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label">创建人:</label>
                    <div class="input-text">
                        <el-input v-model="obj.userName" placeholder="请输入"></el-input>
                    </div>
                </div>
            </div>
            <div class="search-btn clearfix">
                <div class="btn">
                    <el-button type="primary" @click="doQueryClient()" plain size="mini" icon="el-icon-search">搜索</el-button>
                </div>
                <div class="btn">
                    <el-button type="danger" @click="clear()" plain size="mini" icon="el-icon-close">清空</el-button>
                </div>
            </div>
        </div>
        <div class="table-content">
            <div class="table-title">
                <h3>
                    <span>门店管理列表</span>
                    <el-tooltip effect="light" content="门店管理列表" placement="right">
                        <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
                    </el-tooltip>
                </h3>
                <div class="table-title-btn">
                    <el-button type="primary" v-entity="411" @click="addClient()" plain size="mini">新增</el-button>
                    <el-button type="primary" v-entity="412" @click="updateClient()" plain size="mini">修改</el-button>
                    <el-button type="primary" v-entity="413" @click="deleteClient()" plain size="mini">删除</el-button>
                    <el-button type="primary" v-entity="414" @click="downloadExcelFile()" plain size="mini">导出</el-button>
                </div>
            </div>
            <tableCommon tableName="clientInfoTable" ref="table" :head="head" :showNum="true" @dblclickItem="dblclickItem"></tableCommon>
        </div>



    </div>
</template>


<script>
    import clientInfo from './clientInfo.js'
    export default clientInfo
</script>
<style scoped>

</style>