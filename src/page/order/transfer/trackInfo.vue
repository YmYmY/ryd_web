<template>
    <div id="trackInfo" class="trackInfoPage">
        <div class="search-list clearfix">
            <div class="search-form clearfix">
                <div class="item">
                    <label class="label">行车时间</label>
                    <div class="input-text">
                        <dataPicker :model="obj.createDate" @callback="data=>{obj.createDate=data}" startPlaceholder="开始" endPlaceholder="结束"></dataPicker>
                    </div>
                </div>
                <div class="item">
                    <label class="label">查询方式</label>
                    <div class="input-text">
                        <el-select v-model="obj.positioningType" placeholder="请选择">
                            <el-option v-for="item in positioningTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <label class="label">客户名称</label>
                    <div class="input-text">
                        <el-select  v-model="obj.tenantFullName" filterable value-key="tenantFullName" @change="selectCustomerTenant"  placeholder="请选择客户名称">
                            <el-option v-for="item in customerTenantList" :key="item.tenantId" :label="item.tenantFullName" :value="item"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <label class="label">车牌号码</label>
                    <div class="input-text">
                        <el-select v-model="obj.vehicle" @change="selectVehicle" @input.native ="setVehicleCode" filterable value-key="vehicleCode"   placeholder="请选择车牌号码">
                            <el-option v-for="item in vehicleList" :key="item.vehicleCode" :label="item.vehicleCode" :value="item"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <label class="label">车牌颜色</label>
                    <div class="input-text">
                        <el-select v-model="obj.licensePlateColor" placeholder="请选择">
                            <el-option v-for="item in licensePlateColorList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="search-btn clearfix">
                    <div class="btn">
                        <el-button type="primary" @click="doQuery()" plain size="mini" icon="el-icon-search">搜索</el-button>
                    </div>
                    <div class="btn">
                        <el-button type="danger" @click="clear()" plain size="mini" icon="el-icon-close">清空</el-button>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <baidu-map class="bm-view"  :center="center" :zoom="zoom" @ready="mapHandler"></baidu-map>
        </div>
    </div>
</template>

<script>
    import trackInfo from './trackInfo.js'
    export default trackInfo
</script>
<style lang="scss">
    .trackInfoPage{
        .bm-view{
            height: 600px;
            width: 100%;
        }
    }
</style>
