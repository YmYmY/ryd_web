<template>
  <div id="listOutgoingTracking">
    <div class="search-list clearfix">
      <div class="search-form clearfix">
      <div class="item have-label item2row">
          <label class="label">            
            <el-select v-model="query.beginTransitTrackingTime" @change="forceUpdate()">
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
          <label class="label">客服部门</label>
          <div class="input-text">
            <el-select v-model="query.oragnizeId" filterable placeholder="客服部门">
              <el-option v-for="item in oragnizeList" :key="item.oragnizeId" :label="item.oragnizeName" :value="item.oragnizeId"></el-option>
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
        <div class="item have-label">
          <label class="label">需跟踪</label>
          <div class="input-text">
            <el-select v-model="query.trackingStsList" @change="forceUpdate()" placeholder="需跟踪">
               <el-option v-for="item in selectTrackingStsTemList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </div>
        </div>
        <div class="item">
          <label class="label">跟踪状态</label>
          <div class="input-text">
            <el-select v-model="query.trackingSts" placeholder="跟踪状态">
               <el-option v-for="item in selectTrackingStsList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </div>
        </div>
        <div class="item" >
          <label class="label">运单号</label>
          <div class="input-text">
             <el-input v-model="query.trackingNum" v-mynumval placeholder="完整运单单号" type="text"></el-input>
          </div>
        </div>
          <div class="item" >
          <label class="label">客户单号</label>
          <div class="input-text">
             <el-input v-model="query.ordNum" placeholder="客户单号" type="text"></el-input>
          </div>
        </div>
         <div class="item">
          <label class="label">中转单号</label>
          <div class="input-text">
             <el-input v-model="query.outgoingTrackingNum"   placeholder="完整中转单号" type="text"></el-input>
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
          <span>跟踪列表</span>
          <!-- <el-tooltip effect="light" content="双击查看配载详情" placement="right">
            <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
          </el-tooltip> -->
        </h3>
        <div class="table-title-btn">
          <el-button type="primary" plain size="mini" @click="updateRoutes()">获取实时轨迹</el-button>
          <el-button type="primary" plain size="mini" @click="openTrackingAdd()" v-entity="224">跟踪录入</el-button>
          <el-button type="primary" plain size="mini" @click="updateTransitTrackingSts(3)"  v-entity="225" >跟踪完成</el-button>
          <el-button type="primary" plain size="mini" @click="updateTransitTrackingSts(1)"  v-entity="226">取消跟踪完成</el-button>
          <el-button type="primary" plain size="mini" @click="showTrackingDetail()"  v-entity="227" >跟踪日志</el-button>
          <el-button type="primary" plain size="mini" @click="importoutgoingTrackingNum()"  v-entity="228">导入中转单号</el-button>
          <el-button type="primary" plain size="mini" @click="importTracking()"  v-entity="229">导入跟踪</el-button>
          <el-button type="primary" plain size="mini" @click="exportOrders()"  v-entity="230">导出</el-button>

        </div>
      </div>
      <tableCommon ref="outgoingTrackingManager" :doSum="true" :head="head" @dblclickItem="dblclickItem" tableName="outgoingTrackingTable"></tableCommon>
    </div>
    <el-dialog title="跟踪日志" :visible.sync="showTrackingDetailView" center width="500px">
      <div class="mb_20">
        <span style="margin-right:30px;">运单号：{{trackingMap.trackingNum}}</span>
        <span>中转单号：{{trackingMap.outgoingTrackingNum}}</span>
      </div>
      <table class="tableCommon" width="100%" border="0" cellspacing="0" cellpadding="0" style="table-layout: auto;">
        <thead>
          <tr>
            <th width="60">序号</th>
            <th width="100">跟踪时间</th>
            <th width="300">跟踪内容</th>
            <th width="100">跟踪人</th>
          </tr>
        </thead>
        <tbody>
         <tr v-for="(data,index) in trackingMap.trackingList" :key="index">
            <td>{{index + 1}}</td>
            <td>{{data.trackingDate}}</td>
            <td>{{data.trackingContent}}</td>
            <td>{{data.trackingOpName}}</td>
          </tr>
        </tbody>
      </table>
    </el-dialog>
  </div>
</template>

<script>
import outgoingTracking from './outgoingTracking.js'
export default outgoingTracking
</script>
<style scoped>

</style>