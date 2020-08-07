<template>
  <div id="listImport">
    <div class="search-list clearfix">
      <div class="search-form clearfix">
      <div class="item">
          <label class="label item2row have-label">            
            <el-select v-model="query.queryTimeType" @change="forceUpdate()">
               <el-option v-for="item in selectOrderTimeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </label>
          <div class="input-text">
            <dataPicker :model="query.queryTimes" @callback="data=>{query.queryTimes=data}"></dataPicker>
          </div>
        </div>
        <div class="item">
          <label class="label">所属区域</label>
          <div class="input-text">
            <el-select v-model="query.regionId" filterable placeholder="所属区域"  @change="forceUpdate()">
              <el-option v-for="item in regionList" :key="item.regionId" :label="item.regionName" :value="item.regionId"></el-option>
            </el-select>
          </div>
        </div>
         <div class="item">
          <label class="label">多次中转</label>
          <div class="input-text">
            <el-select v-model="query.transitFlag" filterable placeholder="多次中转"  @change="forceUpdate()">
              <el-option v-for="item in selectTransitFlagList" :key="item.codeValue" :label="item.codeDesc" :value="item.codeValue"></el-option>
            </el-select>
          </div>
        </div>
         <div class="item">
          <label class="label">客户类型</label>
          <div class="input-text">
            <el-select v-model="query.customerType" filterable placeholder="客户类型"  @change="forceUpdate()">
              <el-option v-for="item in selectCustomerList" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </div>
        </div>
       <div class="item">
          <label class="label">销售部门</label>
          <div class="input-text">
            <el-select v-model="query.oragnizeId" filterable placeholder="销售部门">
              <el-option v-for="item in oragnizeList" :key="item.oragnizeId" :label="item.oragnizeName" :value="item.oragnizeId"></el-option>
            </el-select>
          </div>
        </div>
         <div class="item">
          <label class="label">销售专员</label>
          <div class="input-text">
             <el-input v-model="query.salesmanBusinessName"  placeholder="销售专员" type="text"></el-input>
          </div>
        </div>
        <div class="item">
          <label class="label">运单号</label>
          <div class="input-text">
             <el-input v-model="query.trackingNum" placeholder="完整运单号"   type="text"></el-input>
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
        <div class="item have-label">
          <label class="label">            
            <el-select v-model="query.compareRateType" @change="forceUpdate()">
               <el-option v-for="item in selectCompareRateTypeList" :key="item.codeValue" :label="item.codeDesc" :value="item.codeValue"></el-option>
            </el-select>
          </label>
          <div class="input-text">
             <el-input v-model="query.rate"  maxlength="5" v-mydoubleval  placeholder="毛利率%" type="text"></el-input>
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
          <span>单票毛利</span>
          <el-tooltip effect="light" content="按单票统计" placement="right">
            <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
          </el-tooltip>
        </h3>
        <div class="table-title-btn">
       
          <el-button type="primary" plain size="mini" @click="exportOrders()" v-entity="398">导出</el-button>

        </div>
      </div>
      <tableCommon ref="profitSingleOrderManager" :doSum="true" :head="head" @dblclickItem="dblclickItem" tableName="profitSingleOrderTable"></tableCommon>
    </div>
  </div>
</template>

<script>
import profitSingleOrder from './profitSingleOrder.js'
export default profitSingleOrder
</script>
<style scoped>

</style>