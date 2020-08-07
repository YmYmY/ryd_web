<template>
  <div id="importDetailCenter">
    <div class="search-list clearfix">
      <div class="search-form clearfix">
        <div class="item">
          <label class="label">导入状态</label>
          <div class="input-text">
            <el-select v-model="query.state" placeholder="导入状态">
              <el-option v-for="item in impotStatusList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </div>
        </div>
         <div class="item">
          <label class="label">批次号</label>
          <div class="input-text">
             <el-input v-model="batchIdTem" v-bind:disabled="true"  placeholder="批次号" type="text"></el-input>
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
          <span>导入详情列表</span>
          <el-tooltip effect="light" content="导入明细" placement="right">
            <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
          </el-tooltip>
        </h3>
         <div class="table-title-btn">
           <!-- <el-button type="primary" plain size="mini" @click="download()">导出明细</el-button> -->
        </div>
      </div>
      <tableCommon ref="importCenterDetailTable" :head="head" @dblclickItem="dblclickItem" tableName="importCenterDetailTable"></tableCommon>
    </div>
  </div>
</template>

<script>
import importCenterDetail from './importCenterDetail.js'
export default importCenterDetail
</script>
<style scoped>

</style>