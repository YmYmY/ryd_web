<template>
  <div id="kdManagePageList" class="kdManagePageListPage" >
     <innerTab  :tabs="tabs" @selectCallback="selectCallback" ></innerTab>
    <div class="search-list clearfix">
      <div class="search-form clearfix">
        <div class="item have-label item2row">
          <label class="label">创建时间</label>
          <div class="input-text">
            <dataPicker :model="query.queryTimes" @callback="data=>{query.queryTimes=data}"></dataPicker>
          </div>
        </div>
         <div class="item have-label item2row">
          <label class="label">操作时间</label>
          <div class="input-text">
            <dataPicker :model="query.queryOperTimes" @callback="data=>{query.queryOperTimes=data}"></dataPicker>
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
          <label class="label">对接状态</label>
          <div class="input-text">
            <el-select v-model="query.status" placeholder="对接状态">
              <el-option v-for="item in kdBusinessStatusList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </div>
        </div>
         <div class="item" v-show="currentTab.selectType == '1'">
          <label class="label">对接类型</label>
          <div class="input-text">
            <el-select v-model="query.businessType" placeholder="对接类型">
              <el-option v-for="item in kdBusinessTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </div>
        </div>
         <div class="item" v-show="currentTab.selectType == '2'">
          <label class="label">对接类型</label>
          <div class="input-text">
            <el-select v-model="query.businessType" placeholder="对接类型">
              <el-option v-for="item in kdBusinessTypeQueryList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </div>
        </div>
       <div class="item">
          <label class="label">单号</label>
          <div class="input-text">
             <el-input v-model="query.orderNo"  placeholder="请输入单号(运单号/批次号)" type="text"></el-input>
          </div>
        </div>
        <div class="item" v-show="currentTab.selectType == '1'">
          <label class="label">商家业务单号</label>
          <div class="input-text">
             <el-input v-model="query.busiNum"  placeholder="对接系统唯一业务单号" type="text"></el-input>
          </div>
       </div>
      <div class="item">
          <label class="label">中转单号</label>
          <div class="input-text">
             <el-input v-model="query.outgoingTrackingNum"  placeholder="中转单号（真实物流单号）" type="text"></el-input>
          </div>
       </div>
        <div class="item">
          <label class="label">物流状态</label>
          <div class="input-text">
             <el-input v-model="query.kdStatusName"  placeholder="物流状态" type="text"></el-input>
          </div>
       </div>
        <div class="item" v-show="currentTab.selectType == 1">
          <label class="label">打印数据</label>
          <div class="input-text">
            <el-select v-model="query.printDataFlag" placeholder="打印数据">
              <el-option label="已准备" value="1">已准备</el-option>
              <el-option label="未准备" value="0">未准备</el-option>
            </el-select>
          </div>
        </div>
        <div class="item" v-show="currentTab.selectType == 1">
          <label class="label">打印状态</label>
          <div class="input-text">
            <el-select v-model="query.printStatus" placeholder="打印状态">
              <el-option label="未打印" value="1">未打印</el-option>
              <el-option label="已打印" value="2">已打印</el-option>
            </el-select>
          </div>
        </div>
        <div class="item" v-show="currentTab.selectType == '1'">
          <label class="label">检索文本</label>
          <div class="input-text">
             <el-input v-model="query.searchName"  placeholder="客户单号/地址/寄、收件信息" type="text"></el-input>
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
          <span>数据列表</span>
          <!-- <el-tooltip effect="light" content="双击查看详情" placement="right">
            <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
          </el-tooltip> -->
        </h3>
        <div class="table-title-btn">
          <el-button type="primary" plain size="mini" @click="updateRouteBatch()" >批量更新轨迹</el-button>
          <el-button type="primary" plain size="mini" @click="cancelOrder()" v-show="currentTab.selectType == 1" v-entity="232">取消对接</el-button>
          <!-- <el-button type="primary" plain size="mini" v-show="currentTab.selectType == 1" >打印</el-button> -->
          <el-button type="primary" plain size="mini" @click="updateRoutes()" v-entity="233">手动更新轨迹</el-button>
          <el-button type="primary" plain size="mini" @click="dialogScheduleShowView()" v-entity="234">查看轨迹</el-button>
          <el-button type="primary" plain size="mini" @click="printerViewHtml()" v-show="currentTab.selectType == 1" v-entity="235">设置打印机</el-button>
          <el-button type="primary" plain size="mini" @click="doPrintBtach()" v-show="currentTab.selectType == 1" v-entity="236">批量打印</el-button>
          <el-button type="primary" plain size="mini" @click="exportOrders()" v-entity="237">导出</el-button>
        </div>
      </div>
      <tableCommon ref="kdManagePageManager" :head="head"    @dblclickItem="dblclickItem" :tableName="kdManagePageManagerTable"></tableCommon>
    </div>
     <printSet :isShowSet="showPrinterView" businessTypes="4" @showChange="showChange" @sureCallback="sureCallback"></printSet>
     <trackScheduleDialog ref="trackScheduleDialog"></trackScheduleDialog>
    
  </div>
</template>

<script>
import kdManagePage from './kdManagePage.js'
export default kdManagePage
</script>
<style lang="scss">

</style>