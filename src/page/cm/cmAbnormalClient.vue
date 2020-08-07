<template>
    <div id="cmAbnormal">
        <div class="search-list clearfix">
            <div class="search-form clearfix">
                <div class="item">
                    <label class="label">登记时间</label>
                    <div class="input-text">
                        <dataPicker :model="obj.registerDate" @callback="data=>{obj.registerDate=data}" startPlaceholder="登记时间开始" endPlaceholder="登记时间结束"></dataPicker>
                    </div>
                </div>
                <div class="item">
                    <label class="label">
                        <el-select v-model="obj.xuanType">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </label>
                    <div class="input-text">
                        <el-input v-model="obj.otherName" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label">异常类型</label>
                    <div class="input-text">
                        <el-select v-model="obj.abnormalType" placeholder="请选择">
                            <el-option v-for="item in abnormalTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </div>
               <div class="item">
                    <label class="label">运单类型</label>
                    <div class="input-text">
                        <el-select v-model="obj.orderTyp" placeholder="请选择">
                            <el-option v-for="item in orderTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <label class="label">下单时间</label>
                    <div class="input-text">
                        <dataPicker :model="obj.billingDate" @callback="data=>{obj.billingDate=data}" startPlaceholder="开始" endPlaceholder="结束"></dataPicker>
                    </div>
                </div>
                <div class="item">
                    <label class="label">处理状态</label>
                    <div class="input-text">
                        <el-select v-model="obj.dealType" placeholder="请选择">
                            <el-option v-for="item in dealTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <label class="label">运单号:</label>
                    <div class="input-text">
                        <el-input v-model="obj.trackingNum" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label">反馈人:</label>
                    <div class="input-text">
                        <el-input v-model="obj.feedbackPeople" placeholder="请输入"></el-input>
                    </div>
                </div>
            </div>
            <div class="search-btn clearfix">
                <div class="btn">
                    <el-button type="primary" @click="doQueryCmAbnormal()" plain size="mini" icon="el-icon-search">搜索</el-button>
                </div>
                <div class="btn">
                    <el-button type="danger" @click="clear()" plain size="mini" icon="el-icon-close">清空</el-button>
                </div>
            </div>
        </div>
        <div class="table-content">
            <div class="table-title">
                <h3>
                    <span>异常信息列表</span>
                    <el-tooltip effect="light" content="异常信息列表" placement="right">
                        <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
                    </el-tooltip>
                </h3>
                <div class="table-title-btn"> 
                    <el-button type="primary"  @click="downloadExcelFile()" plain size="mini">导出</el-button>
                </div>
            </div>
            <tableCommon tableName="cmAbnormalTableClient" ref="table" :head="head" :showNum="true"></tableCommon>
        </div>

    </div>
</template>


<script>
    import cmAbnormal from './cmAbnormalClient.js'
    export default cmAbnormal
</script>
<style scoped>

</style>