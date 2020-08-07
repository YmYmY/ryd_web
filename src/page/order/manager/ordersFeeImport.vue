<template>
  <div id="listImport">
    <div class="search-list clearfix">
      <div class="search-form clearfix">
      <div class="item item2row have-label">
          <label class="label">            
            <el-select v-model="query.queryImportFeeTimeType" @change="forceUpdate()">
               <el-option v-for="item in selectOrderTimeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </label>
          <div class="input-text">
            <dataPicker :model="query.queryTimes" @callback="data=>{query.queryTimes=data}"></dataPicker>
          </div>
        </div>
         <div class="item">
          <label class="label">下单客户</label>
          <div class="input-text">
            <el-select v-model="query.customerTenantId" filterable placeholder="下单客户">
              <el-option v-for="item in customerTenantList" :key="item.tenantId" :label="item.tenantFullName" :value="item.tenantId"></el-option>
            </el-select>
          </div>
        </div>
        <div class="item">
          <label class="label">所属区域</label>
          <div class="input-text">
            <el-select v-model="query.regionId" filterable placeholder="所属区域">
              <el-option v-for="item in regionList" :key="item.regionId" :label="item.regionName" :value="item.regionId"></el-option>
            </el-select>
          </div>
        </div>
        <div class="item">
          <label class="label">结算方式</label>
          <div class="input-text">
            <el-select v-model="query.paymentType" placeholder="结算方式">
              <el-option v-for="item in paymentTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </div>
        </div>
        <div class="item item2row have-label">
          <label class="label">            
            <el-select v-model="query.queryOrderType" @change="forceUpdate()">
              <el-option v-for="item in selectOrderList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </label>
          <div class="input-text">
            <el-input v-model="query.queryAlias"  placeholder="请输入下拉对应值" type="text"></el-input>
          </div>
        </div>
        <div class="item">
          <label class="label">订单类型</label>
          <div class="input-text">
            <el-select v-model="query.orderType" placeholder="订单类型">
              <el-option v-for="item in orderTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </div>
        </div>
         <div class="item">
          <label class="label">导入人</label>
          <div class="input-text">
              <el-input v-model="query.importFeeOpName"  placeholder="导入人" type="text"></el-input>
          </div>
        </div>
      </div>
      <div class="search-btn clearfix">
        <div class="btn">
          <el-button type="primary" plain size="mini" icon="el-icon-search" @click="doQuery()">搜索</el-button>
        </div>
        <div class="btn">
          <el-button type="danger" @click="clear()" plain size="mini" icon="el-icon-close">清空</el-button>
        </div>
      </div>
    </div>
    <div class="table-content">
      <div class="table-title">
        <h3>
          <span>订单列表</span>
          <el-tooltip effect="light" content="双击查看详情" placement="right">
            <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
          </el-tooltip>
        </h3>
        <div class="table-title-btn">
          <el-button type="primary" plain size="mini" @click="importOrder()"  v-entity="574">收入导入</el-button>
          <el-button type="primary" plain size="mini" @click="exportOrders()"  v-entity="575">导出</el-button>
        </div>
      </div>
      <tableCommon ref="ordersFeeImportManager" :head="head" @dblclickItem="dblclickItem" tableName="ordersFeeImportTable"></tableCommon>
    </div>
  </div>
</template>

<script>
import ordersFeeImport from './ordersFeeImport.js'
export default ordersFeeImport
</script>
<style scoped>

</style>