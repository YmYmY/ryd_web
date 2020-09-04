<template>
  <div id="checkTransferAdd">
    <div>
      <div class="search-list clearfix">
        <div class="search-form clearfix">
        <div class="item item2row have-label">
          <label class="label">            
            <el-select v-model="query.queryCheckTransitTimeType" @change="forceUpdate()">
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
          <label class="label">核销状态</label>
          <div class="input-text">
            <el-select v-model="query.checkSts" placeholder="核销状态">
               <el-option v-for="item in checkStsList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </div>
        </div>
       <div class="item">
          <label class="label">结算方式</label>
          <div class="input-text">
            <el-select v-model="query.departPaymentType" placeholder="结算方式">
               <el-option v-for="item in departPaymentTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </div>
        </div>
        
        <div class="item">
          <label class="label">配载类型</label>
          <div class="input-text">
            <el-select v-model="query.transitFlag" placeholder="配载类型">
               <el-option v-for="item in transitFlagList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
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
             <el-input v-model="query.batchNumAlias"  placeholder="批次号"  type="text"></el-input>
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
        <dbTable tableName="checkTransferAddTable" ref="table"  :rightHead="headRightAdd"    nextBtnText="立即核销" :head="head" onlyId="outgoingId" @doNext="doNext" :doSum="true"></dbTable>
      </div>
    </div>
     <el-dialog title="" :visible.sync="addVouchShow"  width="1100px">
        <vouchAdd v-if="addVouchShow"  dialog="true" @closeCallback="closeCallback" :checkOrders="checkOrders"></vouchAdd>
    </el-dialog>

  </div>
   
</template>

<script>
import checkTransferAdd from './checkTransferAdd.js'
export default checkTransferAdd
</script>