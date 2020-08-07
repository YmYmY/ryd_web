<template>
    <div id="toMain" class="toMainPage">
        <h3 class="common-title">
            <span class="title-name">待办事项</span>
            <dataPicker :model="matterDate" @callback="data=>{matterDate=data;doQuerySysStaticData()}" @changeBack="doQuerySysStaticData"></dataPicker>
        </h3>
        <div class="matter clearfix">
            <div class="item">
                <img src="@/static/image/$tenantId$/home_ico1.png" alt="">
                <div class="item-info">
                    <p class="info-title">订单分配</p>
                    <p class="info-count">{{matter.dispatchOrderNumber}}</p>
                </div>
            </div>
            <div class="item">
                <img src="@/static/image/$tenantId$/home_ico2.png" alt="">
                <div class="item-info">
                    <p class="info-title">异常处理</p>
                    <p class="info-count">{{matter.abnormalCount}}</p>
                </div>
            </div>
            <div class="item">
                <img src="@/static/image/$tenantId$/home_ico3.png" alt="">
                <div class="item-info">
                    <p class="info-title">提现申请</p>
                    <p class="info-count">{{matter.proposalCount}}</p>
                </div>
            </div>
            <div class="item">
                <img src="@/static/image/$tenantId$/home_ico4.png" alt="">
                <div class="item-info">
                    <p class="info-title">在线消息</p>
                    <p class="info-count" @click="toNews">{{matter.newsCount}}</p>
                </div>
            </div>
        </div>
        <h3 class="common-title">
            <span class="title-name">数据统计</span>
            <dataPicker :model="statisticsDate" @callback="data=>{statisticsDate=data;doQuerySysStaticData()}" @changeBack="doQuerySysStaticData"></dataPicker>
        </h3>
        <div class="data-statistics clearfix">
            <div class="item">
                <p class="number">{{statistics.orderNumber}}</p>
                <p class="name">当前开单</p>
            </div>
            <div class="item">
                <p class="number">{{statistics.signOrderNumber}}</p>
                <p class="name">当前签收</p>
            </div>
            <div class="item">
                <p class="number">{{statistics.doingOrderNumber}}</p>
                <p class="name">在途订单</p>
            </div>
            <div class="item">
                <p class="number">{{statistics.abnormalCount}}</p>
                <p class="name">新增异常</p>
            </div>
        </div>
        <div class="chartList clearfix">
            <!-- <div id="turnover" ref="turnoverBox" class="item">
                <div class="title">营业额</div>
                <div id="turnoverChart" :style="turnoverStyle"></div>
            </div> -->
            <div id="turnoverCity" ref="turnoverCityBox" class="item">
                <div class="content clearfix">
                    <div style="width:150px;float:left;">
                        <div class="title">营业额地区占比</div>
                        <el-scrollbar class="table_height" style="height:360px;border:none">
                            <table class="chartTable" width="90%" border="0" cellspacing="0" cellpadding="0">
                                <thead>
                                    <tr>
                                        <th>地区</th>
                                        <th>占比</th>
                                    </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(item,$index) in cityList" :key="$index">
                                        <td>{{item.name}}</td>
                                        <td>{{item.feePercent}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </el-scrollbar>
                    </div>
                    <div class="fr" id="turnoverCityChart" :style="turnoverCityStyle"></div>
                </div>
            </div>
            <!-- <div class="item" ref="RankingBox">
                <div class="title">客户运费排行榜</div>
                <div class="chartTable_height" v-myscrolled="{customerLoadMore}">
                    <table class="chartTable" width="100%" border="0" cellspacing="0" cellpadding="0">
                        <thead>
                            <tr>
                                <th width="50%">客户名</th>
                                <th width="20%">运费</th>
                                <th width="15%">订单量</th>
                                <th width="15%">占比</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,$index) in customerList" :key="$index">
                                <td>{{item.customerTenantName}}</td>
                                <td>{{item.orderIncomeDouble}}</td>
                                <td>{{item.orderNumber}}</td>
                                <td>{{item.feePercent}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div> -->
            <div id="orderType" ref="orderTypeBox" class="item">
                <div class="title" style="position:absolute;left:20px;top:20px;">订单类型占比</div>
                <div id="orderTypeChart" :style="orderTypeStyle"></div>
            </div>
        </div>
        <!-- <h3 class="common-title" ref="RightTitle">
            <span class="title-name">供应商排行榜</span>
        </h3> -->
        <!-- <div class="supplierTable_height" v-myscrolledLeft="{supplierLoadMore}">
            <table class="tableCommon" width="100%" border="0" cellspacing="0" cellpadding="0">
                <thead>
                    <tr>
                        <th width="120"></th>
                        <th width="200" v-for="(item,$index) in supplierList" :key="$index">{{$index+1}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td width="120">供应商名称</td>
                        <td width="200" v-for="(item,$index) in supplierList" :key="$index">{{item.supplierTenantName}}</td>
                    </tr>
                    <tr>
                        <td>运费总额</td>
                        <td v-for="(item,$index) in supplierList" :key="$index">{{item.outFeeDouble}}</td>
                    </tr>
                    <tr>
                        <td>单量</td>
                        <td v-for="(item,$index) in supplierList" :key="$index">{{item.orderNumber}}</td>
                    </tr>
                </tbody>
            </table>
        </div> -->
    </div>
</template>

<script>
    import toMain from './toMain.js?v=home'
    export default toMain
</script>

<style lang="scss" src="./toMain.scss"></style>