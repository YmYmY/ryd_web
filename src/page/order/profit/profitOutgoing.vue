<template>
  <div id="listImport">
    <div class="search-list clearfix">
      <div class="search-form clearfix">
      <div class="item item2row have-label">
          <label class="label">            
            <el-select v-model="query.queryTransitTimeType" @change="forceUpdate()">
               <el-option v-for="item in selectTransitOrderTimeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </label>
          <div class="input-text">
            <dataPicker :model="query.queryTransitTimes" @callback="data=>{query.queryTransitTimes=data}"></dataPicker>
          </div>
        </div>
        <div class="item">
          <label class="label">发货区域</label>
          <div class="input-text">
            <el-select v-model="query.regionId" filterable placeholder="发货区域"  @change="forceUpdate()">
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
          <label class="label">供应商</label>
          <div class="input-text">
            <el-select v-model="query.supplierTenantId" filterable placeholder="供应商">
              <el-option v-for="item in supplierTenantList" :key="item.tenantId" :label="item.tenantFullName" :value="item.tenantId"></el-option>
            </el-select>
          </div>
        </div>
         <div class="item">
          <label class="label">中转单号</label>
          <div class="input-text">
             <el-input v-model="query.outgoingTrackingNum"   placeholder="完整中转单号" type="text"></el-input>
          </div>
        </div>
         <div class="item">
          <label class="label">批次号</label>
          <div class="input-text">
             <el-input v-model="query.batchNumAlias" placeholder="批次号"   type="text"></el-input>
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
          <span>中转毛利表</span>
          <el-tooltip effect="light" content="按中转单号统计，收入按件数分配到每个中转单" placement="right">
            <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
          </el-tooltip>
        </h3>
        <div class="table-title-btn">
       
          <el-button type="primary" plain size="mini" @click="exportOrders()" v-entity="396">导出</el-button>

        </div>
      </div>
      <tableCommon ref="profitOutgoingManager" :head="head" :doSum="true" @dblclickItem="dblclickItem" tableName="profitOutgoingTable"></tableCommon>
    </div>
  </div>
</template>

<script>
import profitOutgoing from './profitOutgoing.js'
export default profitOutgoing
</script>
<style scoped>

</style>