<template>
  <div id="orders" class="orderPage">
    <div class="search-list clearfix" >
      <div class="search-form clearfix">
      <div class="item item2row have-label">
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
          <label class="label">付款状态</label>
          <div class="input-text">
            <el-select v-model="query.paySts" placeholder="付款状态"  @change="forceUpdate()">
              <el-option v-for="item in orderPayStsList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
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
          <label class="label">品牌</label>
          <div class="input-text">
             <el-input v-model="query.brandName"  placeholder="品牌" type="text"></el-input>
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
       <div class="item">
          <label class="label">中转单号</label>
          <div class="input-text">
             <el-input v-model="query.outgoingTrackingNum"  placeholder="完整中转单号" type="text"></el-input>
          </div>
        </div>
       <div class="item">
          <label class="label">产品类型</label>
          <div class="input-text">
            <el-select v-model="query.productType" placeholder="产品类型">
              <el-option v-for="item in orderProductTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
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
          <label class="label">运单状态</label>
          <div class="input-text">
            <el-select v-model="query.orderOutState" placeholder="运单状态" @change="forceUpdate()">
              <el-option v-for="item in orderOutStateList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </div>
        </div>
         <div class="item">
          <label class="label">运单来源</label>
          <div class="input-text">
            <el-select v-model="query.sourceType" placeholder="运单来源">
              <el-option v-for="item in orderSourceTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
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
          <label class="label">供应商</label>
          <div class="input-text">
            <el-select v-model="query.supplierTenantId" filterable placeholder="供应商">
              <el-option v-for="item in supplierTenantList" :key="item.tenantId" :label="item.tenantFullName" :value="item.tenantId"></el-option>
            </el-select>
          </div>
        </div>
         <div class="item" >
          <label class="label">采购单号</label>
          <div class="input-text">
            <el-select v-model="query.purchaseNumFlag" filterable placeholder="采购单号重复选择">
              <el-option v-for="item in purchaseNumList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </div>
        </div>
         <div class="item  have-label item2row">
          <label class="label">            
            <el-select v-model="query.queryOrderConsignorType" @change="forceUpdate()">
              <el-option v-for="item in selectOrderConsignorList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </label>
          <div class="input-text">
            <el-input v-model="query.queryConsignorAlias"  placeholder="输入默认对应下拉值" type="text"></el-input>
          </div>
        </div>
       <div class="item have-label item2row">
          <label class="label">            
            <el-select v-model="query.queryOrderConsigneeType" @change="forceUpdate()">
              <el-option v-for="item in selectOrderConsigneeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </label>
          <div class="input-text">
            <el-input v-model="query.queryConsigneeAlias"  placeholder="输入默认对应下拉值" type="text"></el-input>
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
          <el-tooltip effect="light" content="" placement="right">
            <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
          </el-tooltip>
        </h3>
        <div class="table-title-btn">
          <el-button type="primary" plain size="mini" v-entity="607" @click="pushOrders()" >批量推送</el-button>
          <el-button type="primary" plain size="mini" v-entity="608"  @click="importOrder()">收入导入</el-button>
          <el-button type="primary" plain size="mini" v-entity="609" @click="exportOrders()">导出</el-button>
        </div>
      </div>
      <tableCommon ref="ordersPushManager" :doSum="true" :head="head" @dblclickItem="dblclickItem" tableName="ordersPushManager"></tableCommon>
    </div>
  </div>
</template>

<script>
import orders from './ordersPush.js'
export default orders
</script>
<style lang="scss">
</style>