<template>
  <div id="checkPaymentAdd">
    <div>
      <div class="search-list clearfix">
        <div class="search-form clearfix">
         <div class="item  item2row have-label">
          <label class="label">            
            <el-select v-model="query.queryOrderCheckTimeType" @change="forceUpdate()">
               <el-option v-for="item in selectOrderCheckTimeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
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
            <el-select v-model="query.regionId" filterable placeholder="所属区域"  @change="forceUpdate()">
              <el-option v-for="item in regionList" :key="item.regionId" :label="item.regionName" :value="item.regionId"></el-option>
            </el-select>
          </div>
        </div>
        <div class="item" >
          <label class="label">运单号</label>
          <div class="input-text">
             <el-input v-model="query.trackingNum" v-mynumval placeholder="完整运单单号" type="text"></el-input>
          </div>
        </div>
         <div class="item">
          <label class="label">客户单号</label>
          <div class="input-text">
             <el-input v-model="query.ordNum"   placeholder="客户单号" type="text"></el-input>
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
       
         <div class="item item2row have-label">
          <label class="label">            
            <el-select v-model="query.queryOrderCheckType" @change="forceUpdate()">
              <el-option v-for="item in selectOrderCheckList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </label>
          <div class="input-text">
            <el-input v-model="query.queryAlias"  placeholder="请输入下拉对应值" type="text"></el-input>
          </div>
        </div>
          
        </div>
        <div class="search-btn clearfix">
          <div class="btn">
            <el-button type="primary" plain size="mini" icon="el-icon-search" @click="doQuery()">搜索</el-button>
          </div>
          <div class="btn">
            <el-button type="danger" plain size="mini" icon="el-icon-close" @click="clear()">清空</el-button>
          </div>
        </div>
      </div>
      <div class="table-content">
        <div class="table-title">
        </div>
        <dbTable tableName="checkPaymentAddTable" ref="table"  :rightHead="headRightAdd"    nextBtnText="立即核销" :head="head" onlyId="orderId" @doNext="doNext"></dbTable>
      </div>
    </div>
     <el-dialog title="" :visible.sync="addVouchShow"  width="1100px">
        <vouchAdd v-if="addVouchShow"  dialog="true" @closeCallback="closeCallback" :checkOrders="checkOrders"></vouchAdd>
    </el-dialog>

  </div>
   
</template>

<script>
import checkPaymentAdd from './checkPaymentAdd.js'
export default checkPaymentAdd
</script>