<template>
    <div id="toMain" class="toMainPage">
       <!-- <div class="infoList">
            <div class="dateTabClient clearfix">
                <div class="item active">今日</div>
                <div class="item">昨日</div>
                <div class="item">本周</div>
                <div class="item">本月</div>
            </div>
            <div class="matter matterClient clearfix">
                <div class="item">
                    <img src="@/static/image/$tenantId$/home_ico1.png" alt="">
                    <div class="item-info">
                        <p class="info-title">开单数量</p>
                        <p class="info-count">123</p>
                    </div>
                </div>
                <div class="item">
                    <img src="@/static/image/$tenantId$/u1892.png" alt="">
                    <div class="item-info">
                        <p class="info-title">取件延时</p>
                        <p class="info-count">22</p>
                    </div>
                </div>
                <div class="item">
                    <img src="@/static/image/$tenantId$/u189.png" alt="">
                    <div class="item-info">
                        <p class="info-title">在途</p>
                        <p class="info-count">41</p>
                    </div>
                </div>
                <div class="item">
                    <img src="@/static/image/$tenantId$/u13289.png" alt="">
                    <div class="item-info">
                        <p class="info-title">派送延时</p>
                        <p class="info-count">12</p>
                    </div>
                </div>
                <div class="item">
                    <img src="@/static/image/$tenantId$/u18933.png" alt="">
                    <div class="item-info">
                        <p class="info-title">签收数量</p>
                        <p class="info-count">55</p>
                    </div>
                </div>
                <div class="item">
                    <img src="@/static/image/$tenantId$/u183239.png" alt="">
                    <div class="item-info">
                        <p class="info-title">异常订单</p>
                        <p class="info-count">12</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="clearfix">
            <div class="leftPage" ref="leftPage">
                <h3 class="common-title">
                    <span class="title-name">数据报表</span>
                    <el-date-picker class="fr" v-model="statisticsDateStart" @change="doQuerySysStaticData" value-format="yyyy-MM-dd" type="daterange" placeholder="选择日期"></el-date-picker>
                </h3>
                <div class="chartList clearfix">
                    <div id="turnover" ref="turnoverBox" class="item" style="margin-top:0;">
                        <div class="title">营业额</div>
                        <div id="turnoverChart" :style="turnoverStyle"></div>
                    </div>
                    <div id="turnoverCity" ref="turnoverCityBox" class="item" style="margin-top:0;">
                        <div class="title">营业额地区占比</div>
                        <div id="turnoverCityChart" :style="turnoverCityStyle"></div>
                    </div>
                    <div class="item" ref="RankingBox">
                        <div class="title">客户运费排行榜</div>
                        <table class="chartTable" width="90%" border="0" cellspacing="0" cellpadding="0">
                            <thead>
                                <tr>
                                    <th>店铺名</th>
                                    <th>运费</th>
                                    <th>订单量</th>
                                    <th>占比</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Km</td>
                                    <td>1433</td>
                                    <td>223</td>
                                    <td>22%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div id="orderType" ref="orderTypeBox" class="item">
                        <div class="title">订单类型占比</div>
                        <div id="orderTypeChart" :style="orderTypeStyle"></div>
                    </div>
                </div>
            </div>
            <div class="rightPage" ref="rightPage">
                <h3 class="common-title" ref="RightTitle">
                    <span class="title-name">店仓运费排行版</span>
                </h3>
                <div class="table_height" ref="tableHeight" v-myscrolled="{loadMore}">
                    <table class="tableCommon" width="100%" border="0" cellspacing="0" cellpadding="0">
                        <thead>
                            <tr>
                                <th width="240">供应商名称</th>
                                <th width="130">运费总额</th>
                                <th width="130">单量</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>韵达快递深圳</td>
                                <td>1433</td>
                                <td>223</td>
                            </tr>
                            <tr>
                                <td>韵达快递深圳</td>
                                <td>1433</td>
                                <td>223</td>
                            </tr>
                            <tr>
                                <td>韵达快递深圳</td>
                                <td>1433</td>
                                <td>223</td>
                            </tr>
                            <tr>
                                <td>韵达快递深圳</td>
                                <td>1433</td>
                                <td>223</td>
                            </tr>
                            <tr>
                                <td>韵达快递深圳</td>
                                <td>1433</td>
                                <td>223</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>-->
    </div>
</template>

<script>
    import toMain from './toMain.js?v=client'
    export default toMain
</script>

<style lang="scss" src="./toMain.scss"></style>