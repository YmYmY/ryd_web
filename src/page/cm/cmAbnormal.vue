<template>
    <div id="cmAbnormal" class="cmAbnormalPage">
        <div class="search-list clearfix">
            <div class="search-form clearfix">
                <div class="item item2row">
                    <label class="label">登记时间</label>
                    <div class="input-text">
                        <dataPicker :model="obj.registerDate" @callback="data=>{obj.registerDate=data}" startPlaceholder="登记时间开始" endPlaceholder="登记时间结束"></dataPicker>
                        <!-- <el-date-picker v-model="obj.registerDate" :picker-options="pickerOptions" type="daterange" range-separator="-" start-placeholder="登记时间开始"
                                        value-format="yyyy-MM-dd"      end-placeholder="登记时间结束"></el-date-picker> -->
                    </div>
                </div>
                <div class="item item2row">
                    <label class="label">下单时间</label>
                    <div class="input-text">
                        <dataPicker :model="obj.billingDate" @callback="data=>{obj.billingDate=data}"></dataPicker>
                    </div>
                </div>
                <div class="item">
                    <label class="label">登记区域</label>
                    <div class="input-text">
                        <el-select v-model="obj.registerId" filterable placeholder="登记区域">
                            <el-option v-for="item in regionList" :key="item.regionId" :label="item.regionName" :value="item.regionId"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item have-label">
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
                        <el-select v-model="obj.abnormalType" placeholder="异常类型">
                            <el-option v-for="item in abnormalTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <label class="label">下单客户</label>
                    <div class="input-text">
                        <el-select v-model="obj.customerTenantId" filterable placeholder="下单客户">
                            <el-option v-for="item in customerTenantList" :key="item.tenantId" :label="item.tenantFullName" :value="item.tenantId"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <label class="label">处理状态</label>
                    <div class="input-text">
                        <el-select v-model="obj.dealType" placeholder="处理状态">
                            <el-option v-for="item in dealTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <label class="label">运单号:</label>
                    <div class="input-text">
                        <el-input v-model="obj.trackingNum" placeholder="运单号"></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label">客户单号:</label>
                    <div class="input-text">
                        <el-input v-model="obj.ordNum" placeholder="客户单号"></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label">反馈人:</label>
                    <div class="input-text">
                        <el-input v-model="obj.feedbackPeople" placeholder="反馈人"></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label">异常编号:</label>
                    <div class="input-text">
                        <el-input v-model="obj.id" placeholder="异常编号"></el-input>
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
                    <el-button type="primary" v-entity="251" @click="addCmAbnormal()" plain size="mini">异常登记</el-button>
                    <el-button type="primary" v-entity="252" @click="updateCmAbnormal()" plain size="mini">异常修改</el-button>
                    <el-button type="primary" v-entity="253" @click="dealCmAbnormal()" plain size="mini">异常处理</el-button>
                    <el-button type="primary" v-entity="254" @click="deleteCmAbnormal()" plain size="mini">取消异常</el-button>
                    <el-button type="primary" v-entity="255" @click="viewCmAbnormal()" plain size="mini">查看详情</el-button>
                    <el-button type="primary" v-entity="256" @click="downloadExcelFile()" plain size="mini">导出</el-button>
                </div>
            </div>
            <tableCommon tableName="cmAbnormalTable" ref="table" :head="head" :showNum="true"></tableCommon>
        </div>

    </div>
</template>


<script>
    import cmAbnormal from './cmAbnormal.js'
    export default cmAbnormal
</script>