<template>
    <div id="sendVehicle">
        <div class="search-list clearfix">
            <div class="search-form clearfix">
                <div class="item">
                    <label class="label">派车时间</label>
                    <div class="input-text">
                        <dataPicker :model="obj.sendDate" @callback="data=>{obj.sendDate=data}"></dataPicker>
                    </div>
                </div>
                <div class="item">
                    <label class="label">派车区域:</label>
                    <div class="input-text">
                        <el-select v-model="obj.sendRegion" filterable placeholder="请选择" >
                            <el-option v-for="item in regionList" :key="item.regionId" :label="item.regionName" :value="item.regionId"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <label class="label">业务类型</label>
                    <div class="input-text">
                        <el-select v-model="obj.businessType" placeholder="请选择">
                            <el-option v-for="item in businessTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <label class="label">批次号:</label>
                    <div class="input-text">
                        <el-input v-model="obj.sendBatch" placeholder="请输入"></el-input>
                    </div>
                </div>
            </div>
            <div class="search-btn clearfix">
                <div class="btn">
                    <el-button type="primary" @click="doQuerySendVehicle()" plain size="mini" icon="el-icon-search">搜索</el-button>
                </div>
                <div class="btn">
                    <el-button type="danger" @click="clear()" plain size="mini" icon="el-icon-close">清空</el-button>
                </div>
            </div>
        </div>
        <div class="table-content">
            <div class="table-title">
                <h3>
                    <span>派车单列表</span>
                    <el-tooltip effect="light" content="派车单列表" placement="right">
                        <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
                    </el-tooltip>
                </h3>
                <div class="table-title-btn">
                 <!--   <el-button type="primary" v-entity="423" @click="addStore()" plain size="mini">新增派车</el-button>
                    <el-button type="primary" v-entity="424" @click="updateStore()" plain size="mini">无单派车</el-button>-->
                    <el-button type="primary" v-entity="425" @click="addProjectSend()" plain size="mini">项目派车</el-button>
                    <el-button type="primary" v-entity="426" @click="updateSend()" plain size="mini">修改</el-button>
                    <el-button type="primary" v-entity="427" @click="deleteSend()" plain size="mini">取消</el-button>
                    <el-button type="primary" v-entity="428" @click="downloadExcelFile()" plain size="mini">导出</el-button>
                </div>
            </div>
            <tableCommon tableName="sendVehicleTable" ref="table" :head="head" :showNum="true" ></tableCommon>
        </div>


    </div>
</template>


<script>
    import sendVehicle from './sendVehicle.js'
    export default sendVehicle
</script>
<style scoped>

</style>