<template>
    <div id="trackSettings">
        <div class="search-list clearfix">
            <div class="search-form clearfix">
                <div class="item">
                    <label class="label">获取月份</label>
                    <div class="input-text">
                        <el-date-picker v-model="obj.getMonth" type="month"  value-format="yyyy-MM"></el-date-picker>
                    </div>
                </div>
                <div class="item">
                    <label class="label">消费主体</label>
                    <div class="input-text fl">
                        <el-select  v-model="obj.mainId" filterable   placeholder="请选择消费主体">
                            <el-option v-for="item in tenantList" :key="item.tenantId" :label="item.tenantFullName" :value="item.tenantId"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <label class="label">接口类型</label>
                    <div class="input-text">
                        <el-select v-model="obj.interfaceType" placeholder="请选择">
                            <el-option v-for="item in interfaceTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <label class="label">车牌号码:</label>
                    <div class="input-text">
                        <el-input v-model="obj.vehicleCode" placeholder="请输入"></el-input>
                    </div>
                </div>
            </div>
            <div class="search-btn clearfix">
                <div class="btn">
                    <el-button type="primary" @click="doQueryTrackSettings()" plain size="mini" icon="el-icon-search">搜索</el-button>
                </div>
                <div class="btn">
                    <el-button type="danger" @click="clear()" plain size="mini" icon="el-icon-close">清空</el-button>
                </div>
            </div>
        </div>
        <div class="table-content">
            <div class="table-title">
                <h3>
                    <span>车辆列表</span>
                    <el-tooltip effect="light" content="车辆列表" placement="right">
                        <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
                    </el-tooltip>
                </h3>
                <div class="table-title-btn">
                    <el-button type="primary" v-entity="432" @click="addTrackSettings()" plain size="mini">新增</el-button>
                    <el-button type="primary" v-entity="433" @click="updateTrackSettings()" plain size="mini">修改</el-button>
                    <el-button type="primary" v-entity="434" @click="daleteTrackSettings()" plain size="mini">删除</el-button>
                    <el-button type="primary" v-entity="435" @click="downloadExcelFile()" plain size="mini">导出</el-button>
                </div>
            </div>
            <tableCommon  tableName="trackSettingsTable" ref="table" :head="head" :showNum="true"></tableCommon>
        </div>
    </div>
</template>


<script>
    import trackSettings from './trackSettings.js'
    export default trackSettings
</script>
<style scoped>

</style>