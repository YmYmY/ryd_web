<template>
  <div id="listImport">
    <div class="search-list clearfix">
      <div class="search-form clearfix">
      <div class="item have-label item2row">
          <label class="label">            
            <el-select v-model="query.queryTransitTimeType" @change="forceUpdate()">
               <el-option v-for="item in selectTransitOrderTimeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </label>
          <div class="input-text">
            <dataPicker :model="query.queryTransitTimes" @callback="data=>{query.queryTransitTimes=data}"></dataPicker>
          </div>
        </div>
        <div class="item have-label item2row">
          <label class="label">            
            <el-select v-model="query.queryTimeType" @change="forceUpdate()">
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
            <el-select v-model="query.customerTenantId" filterable placeholder="请选择">
              <el-option v-for="item in customerTenantList" :key="item.tenantId" :label="item.tenantFullName" :value="item.tenantId"></el-option>
            </el-select>
          </div>
        </div>
        <div class="item">
          <label class="label">品牌</label>
          <div class="input-text">
             <el-input v-model="query.brandName"  placeholder="品牌" type="text"></el-input>
          </div>
        </div>   
        <div class="item">
          <label class="label">发货区域</label>
          <div class="input-text">
            <el-select v-model="query.regionId" filterable placeholder="请选择"  @change="forceUpdate()">
              <el-option v-for="item in regionList" :key="item.regionId" :label="item.regionName" :value="item.regionId"></el-option>
            </el-select>
          </div>
        </div>
        <div class="item">
          <label class="label">目的区域</label>
          <div class="input-text">
            <el-select v-model="query.destRegionId" filterable placeholder="请选择">
              <el-option v-for="item in regionAllList" :key="item.regionId" :label="item.regionName" :value="item.regionId"></el-option>
            </el-select>
          </div>
        </div>
        <div class="item">
          <label class="label">供应商类型</label>
          <div class="input-text">
            <el-select v-model="query.supplierType" placeholder="请选择">
               <el-option v-for="item in selectSupplierTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </div>
        </div>
        <div class="item">
          <label class="label">供应商</label>
          <div class="input-text">
            <el-select v-model="query.supplierTenantId" filterable placeholder="请选择">
              <el-option v-for="item in supplierTenantList" :key="item.tenantId" :label="item.tenantFullName" :value="item.tenantId"></el-option>
            </el-select>
          </div>
        </div>
         <div class="item">
          <label class="label">结算方式</label>
          <div class="input-text">
            <el-select v-model="query.transitPaymentType"  placeholder="请选择">
               <el-option v-for="item in selectTransitPaymentTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </div>
        </div>
        
        <!-- <div class="item" >
          <label class="label">运单号</label>
          <div class="input-text">
             <el-input v-model="query.trackingNum" v-mynumval placeholder="完整运单单号" type="text"></el-input>
          </div>
        </div> -->
       <div class="item">
          <label class="label">            
            <el-select v-model="query.queryOrderType" @change="forceUpdate()">
              <el-option v-for="item in selectOrderList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </label>
          <div class="input-text">
            <el-input v-model="query.queryAlias"  placeholder="请输入" type="text"></el-input>
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
             <el-input v-model="query.batchNumAlias"    type="text"></el-input>
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
          <span>中转列表</span>
          <el-tooltip effect="light" content="双击查看配载详情" placement="right">
            <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
          </el-tooltip>
        </h3>
        <div class="table-title-btn">
          <el-button type="primary" plain size="mini" @click="addTransitOrderView()" v-entity="210">新增中转</el-button>
          <el-button type="primary" plain size="mini" @click="toTransitOrderView(2)" v-entity="211">查看配载</el-button>
          <el-button type="primary" plain size="mini" @click="toTransitOrderView(1)" v-entity="212">修改配载</el-button>
          <el-button type="primary" plain size="mini" @click="cancelTransitOrders()" v-entity="213">按单取消</el-button>
          <el-button type="primary" plain size="mini" @click="cancelTransitBatchNum()" v-entity="214" >按批次取消</el-button>
          <el-button type="primary" plain size="mini" @click="trackingOrderView()" v-entity="215">中转跟踪</el-button>
          <!-- <el-button type="primary" plain size="mini" @click="importTransitOrder()">导入外发信息</el-button> -->
          <el-button type="primary" plain size="mini" @click="importTransitOrderFee()" v-entity="271">导入中转费用</el-button>
          <el-button type="primary" plain size="mini" @click="exportOrders()" v-entity="216">导出</el-button>

        </div>
      </div>
      <tableCommon ref="outgoingManager" :doSum="true"  :head="head" @dblclickItem="dblclickItem" tableName="outgoingTable"></tableCommon>
    </div>
  </div>
</template>

<script>
import outgoing from './outgoing.js'
export default outgoing
</script>
<style scoped>

</style>