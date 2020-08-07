<template>
  <div id="checkTransferManager">
    <div class="search-list clearfix">
      <div class="search-form clearfix">
         <div class="item">
          <label class="label item2row have-label">            
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
          <el-button type="danger" @click="clear()" plain size="mini" icon="el-icon-close">清空</el-button>
        </div>
      </div>
    </div>
    <div class="table-content">
      <div class="table-title">
        <h3>
          <span>核销列表</span>
          <el-tooltip effect="light" content="双击查看日志" placement="right">
            <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
          </el-tooltip>
        </h3>
         <div class="table-title-btn" >
          <el-button type="primary" plain size="mini" @click="checkView()" v-entity="341" >新增核销</el-button>
          <!-- <el-button type="primary" plain size="mini" @click="cancelCheckOrders()"  >反核销</el-button> -->
          <el-button type="primary" plain size="mini" @click="doQueryCheckLog()" v-entity="342" >核销记录</el-button>
          <el-button type="primary" plain size="mini" @click="exportOrders()" v-entity="343" >导出</el-button>
        </div>
        </div>
      </div>
      <tableCommon ref="checkTransferManager" :head="head" @dblclickItem="dblclickItem" tableName="checkTransferManagerTable"></tableCommon>
      <el-dialog title="核销日志" :visible.sync="showLogView" center width="800px">
          <table class="tableCommon" width="100%" border="0" cellspacing="0" cellpadding="0" style="table-layout: auto;">
            <thead>
              <tr>
                <th width="60">序号</th>
                <th width="100">操作</th>
                <th width="100">操作金额</th>
                <th width="100">核销余额</th>
                <th width="100">凭证号</th>
                <th width="100">收据号</th>
                <th width="100">操作区域</th>
                <th width="100">操作人</th>
                 <th width="120">操作时间</th>
              </tr>
            </thead>
            <tbody>
            <tr v-for="(data,index) in checkList" :key="index">
                <td>{{index + 1}}</td>
                <td>{{data.opTypeName}}</td>
                <td>{{data.opAmountDouble}}</td>
                <td>{{data.opUncheckAmountDouble}}</td>
                <td>{{data.vouchNo}}</td>
                <td>{{data.receiptNo}}</td>
                <td>{{data.regionName}}</td>
                <td>{{data.opUserName}}</td>
                <td>{{data.opDate}}</td>
              </tr>
            </tbody>
          </table>
        </el-dialog>
    </div>
     

</template>

<script>
import checkTransferManager from './checkTransferManager.js'
export default checkTransferManager
</script>
<style scoped>

</style>