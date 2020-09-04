<template>
  <div id="checkPaymentManager">
    <div class="search-list clearfix">
      <div class="search-form clearfix">
        <div class="item item2row have-label">
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
        <div class="item">
          <label class="label">核销状态</label>
          <div class="input-text">
            <el-select v-model="query.checkSts" placeholder="核销状态">
               <el-option v-for="item in checkStsList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
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
          <label class="label">运单状态</label>
          <div class="input-text">
            <el-select v-model="query.orderOutState" placeholder="运单状态">
               <el-option v-for="item in orderOutStateList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </div>
        </div>
         <div class="item">
          <label class="label">订单来源</label>
          <div class="input-text">
            <el-select v-model="query.sourceType" placeholder="订单来源">
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
          <label class="label">产品类型</label>
          <div class="input-text">
            <el-select v-model="query.productType" placeholder="产品类型">
               <el-option v-for="item in orderProductTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
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
        <div class="table-title-btn" v-if="currentCheckTypeMap.checkType == 1">
          <el-button type="primary" plain size="mini" @click="checkView()" v-entity="332" >新增核销</el-button>
          <!-- <el-button type="primary" plain size="mini" @click="cancelCheckOrders()"  >反核销</el-button> -->
          <el-button type="primary" plain size="mini" @click="doQueryCheckLog()" v-entity="333" >核销记录</el-button>
          <el-button type="primary" plain size="mini" @click="exportOrders()" v-entity="334"  >导出</el-button>
        </div>
        <div class="table-title-btn" v-if="currentCheckTypeMap.checkType == 2">
          <el-button type="primary" plain size="mini" @click="checkView()" v-entity="335" >新增核销</el-button>
          <!-- <el-button type="primary" plain size="mini" @click="cancelCheckOrders()"  >反核销</el-button> -->
          <el-button type="primary" plain size="mini" @click="doQueryCheckLog()" v-entity="336" >核销记录</el-button>
          <el-button type="primary" plain size="mini" @click="exportOrders()" v-entity="337" >导出</el-button>
        </div>
         <div class="table-title-btn" v-if="currentCheckTypeMap.checkType == 3">
          <el-button type="primary" plain size="mini" @click="checkView()" v-entity="338" >新增核销</el-button>
          <!-- <el-button type="primary" plain size="mini" @click="cancelCheckOrders()"  >反核销</el-button> -->
          <el-button type="primary" plain size="mini" @click="doQueryCheckLog()"  v-entity="339">核销记录</el-button>
          <el-button type="primary" plain size="mini" @click="exportOrders()" v-entity="340" >导出</el-button>
        </div>
         <div class="table-title-btn" v-if="currentCheckTypeMap.checkType == 4">
          <el-button type="primary" plain size="mini" @click="checkView()" v-entity="341" >新增核销</el-button>
          <!-- <el-button type="primary" plain size="mini" @click="cancelCheckOrders()"  >反核销</el-button> -->
          <el-button type="primary" plain size="mini" @click="doQueryCheckLog()" v-entity="342" >核销记录</el-button>
          <el-button type="primary" plain size="mini" @click="exportOrders()" v-entity="343" >导出</el-button>
        </div>
        </div>
      </div>
      <tableCommon ref="checkPaymentManager" :head="head" :doSum="true" @dblclickItem="dblclickItem" :tableName="currentCheckTypeMap.checkPaymentManagerTable"></tableCommon>
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
import checkPaymentManager from './checkPaymentManager.js'
export default checkPaymentManager
</script>
<style scoped>

</style>