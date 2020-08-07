<template>
    <div id="sysVehicle">
        <div class="search-list clearfix">
            <div class="search-form clearfix">
                <div class="item">
                    <label class="label">添加时间</label>
                    <div class="input-text">
                        <el-date-picker v-model="obj.createDate" type="date" placeholder="选择日期"></el-date-picker>
                    </div>
                </div>
                <div class="item">
                    <label class="label">注册区域</label>
                    <div class="input-text fl">
                        <mycity  ref="city"  class="city fl" placeholder="选择注册区域"></mycity>
                    </div>
                </div>
                <div class="item">
                    <label class="label">车辆属性</label>
                    <div class="input-text">
                        <el-select v-model="obj.vehicleAttributes" placeholder="请选择">
                            <el-option v-for="item in vehicleAttributesList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <label class="label">车牌号码:</label>
                    <div class="input-text">
                        <el-input v-model="obj.vehicleCode" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label">车主名称:</label>
                    <div class="input-text">
                        <el-input v-model="obj.carName" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label">司机名称:</label>
                    <div class="input-text">
                        <el-input v-model="obj.driverName" placeholder="请输入"></el-input>
                    </div>
                </div>
            </div>
            <div class="search-btn clearfix">
                <div class="btn">
                    <el-button type="primary" @click="doQuerySysVehicle()" plain size="mini" icon="el-icon-search">搜索</el-button>
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
                    <el-button type="primary" v-entity="418" @click="addSysVehicle()" plain size="mini">新增</el-button>
                    <el-button type="primary" v-entity="419" @click="updateSysVehicle()" plain size="mini">修改</el-button>
                    <el-button type="primary" v-entity="420" @click="deleteSysVehicle()" plain size="mini">删除</el-button>
                    <el-button type="primary" v-entity="421" @click="downloadExcelFile()" plain size="mini">导出</el-button>
                </div>
            </div>
            <tableCommon  tableName="sysVehicleTable" ref="table" :head="head" :showNum="true"></tableCommon>
        </div>
    </div>
</template>


<script>
    import sysVehicle from './sysVehicle.js'
    export default sysVehicle
</script>
<style scoped>

</style>