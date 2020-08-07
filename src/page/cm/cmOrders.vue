<template>
  <div id="cmOrders" class="orderPage">
    <el-dialog title="查找订单" :visible.sync="dialogShow" center width="1000px">
      <!-- 筛选条件 -->
      <div class="search-list clearfix">
          <div class="search-form clearfix">
          <div class="item">
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
              <label class="label">所属区域</label>
              <div class="input-text">
                  <el-select v-model="query.regionId" filterable placeholder="请选择">
                  <el-option v-for="item in regionList" :key="item.regionId" :label="item.regionName" :value="item.regionId"></el-option>
                  </el-select>
              </div>
          </div>
      
          <div class="item">
              <label class="label">结算方式</label>
              <div class="input-text">
                  <el-select v-model="query.paymentType" placeholder="请选择">
                  <el-option v-for="item in paymentTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                  </el-select>
              </div>
          </div>
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
              <label class="label">产品类型</label>
              <div class="input-text">
                  <el-select v-model="query.productType" placeholder="请选择">
                  <el-option v-for="item in orderProductTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                  </el-select>
              </div>
          </div>
          <div class="item">
              <label class="label">运单来源</label>
              <div class="input-text">
                  <el-select v-model="query.sourceType" placeholder="请选择">
                  <el-option v-for="item in orderSourceTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                  </el-select>
              </div>
          </div>
          <div class="item">
              <label class="label">客服部门</label>
              <div class="input-text">
                  <el-select v-model="query.oragnizeId" filterable placeholder="请选择">
                  <el-option v-for="item in oragnizeList" :key="item.oragnizeId" :label="item.oragnizeName" :value="item.oragnizeId"></el-option>
                  </el-select>
              </div>
          </div>
          <div class="item">
              <label class="label">订单类型</label>
              <div class="input-text">
                  <el-select v-model="query.orderType" placeholder="请选择">
                  <el-option v-for="item in orderTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                  </el-select>
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
      <!-- 筛选条件 end -->
      <div class="table-content" style="margin-top:50px;">
          <tableCommon ref="ordersManager" tableName="cmOrders" :head="head" :singleSelect="true" :hideScale="true"></tableCommon>
      </div>
      <div class="page-bot-btn" style="padding-bottom:30px">
        <el-button type="primary" @click="dialogSure">确定</el-button>
        <el-button type="info" @click="hideDialog">取消</el-button>
      </div>
  </el-dialog>
  </div>
</template>

<script>
import cmOrders from './cmOrders.js'
export default cmOrders
</script>