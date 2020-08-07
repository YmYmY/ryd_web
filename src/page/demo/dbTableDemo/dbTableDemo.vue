<template>
  <div id="dbTableDemo">
    <div v-show="showTablePage">
      <div class="search-list clearfix">
        <div class="search-form clearfix">
          <div class="item">
            <label class="label">输入框</label>
            <div class="input-text">
              <el-input v-model="inputvalue" v-mynumval placeholder="请输入" type="password" autocomplete="new-password"></el-input>
            </div>
          </div>
        </div>
        <div class="search-btn clearfix">
          <div class="btn">
            <el-button type="primary" plain size="mini" icon="el-icon-search" @click="doQuery()">搜索</el-button>
          </div>
          <div class="btn">
            <el-button type="danger" plain size="mini" icon="el-icon-close">清空</el-button>
          </div>
        </div>
      </div>
      <div class="table-content">
        <div class="table-title">
          
        </div>
        <dbTable tableName="dbTableDemoTable" ref="table" :head="head" onlyId="tenantId" @doNext="doNext"></dbTable>
      </div>
    </div>
    <dbTableDemo2 :tableData="tableRightData" :head="head" v-if="!showTablePage" @goback="goback" onlyId="tenantId"></dbTableDemo2>
  </div>
</template>

<script>
import dbTableDemo from './dbTableDemo.js'
export default dbTableDemo
</script>