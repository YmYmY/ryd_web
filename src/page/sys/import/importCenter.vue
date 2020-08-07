<template>
  <div id="importCenter">
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
          <label class="label">业务编码</label>
          <div class="input-text">
             <el-input v-model="query.bizCode"  placeholder="业务编码" type="text"></el-input>
          </div>
        </div>
        <div class="item">
          <label class="label">业务名称</label>
          <div class="input-text">
             <el-input v-model="query.bizName"  placeholder="业务名称" type="text"></el-input>
          </div>
        </div>
         <div class="item">
          <label class="label">批次号</label>
          <div class="input-text">
             <el-input v-model="query.batchId"  placeholder="批次号"  @change="forceUpdate()" type="text"></el-input>
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
          <span>导入列表</span>
          <el-tooltip effect="light" content="双击查看导入明细" placement="right">
            <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
          </el-tooltip>
        </h3>
         <div class="table-title-btn" v-if="userType == 1">
           <el-button type="primary" plain size="mini" @click="toViewDetail()" v-entity="158">查看明细</el-button>
           <el-button type="primary" plain size="mini" @click="downloadResultExcel(3)" v-entity="403">导出上传失败明细</el-button>
           <el-button type="primary" plain size="mini" @click="downloadResultExcel(-1)" v-entity="404">导出上传明细</el-button>
           <el-button type="primary" plain size="mini" @click="downloadExcel()" v-entity="159">下载导入文件</el-button>
        </div>
         <div class="table-title-btn" v-if="userType == 2">
           <el-button type="primary" plain size="mini" @click="toViewDetail()" v-entity="141">查看明细</el-button>
           <el-button type="primary" plain size="mini" @click="downloadResultExcel(3)" v-entity="405">导出上传失败明细</el-button>
           <el-button type="primary" plain size="mini" @click="downloadResultExcel(-1)" v-entity="406">导出上传明细</el-button>
           <el-button type="primary" plain size="mini" @click="downloadExcel()" v-entity="142">下载导入文件</el-button>
        </div>
         <div class="table-title-btn" v-if="userType == 3">
           <el-button type="primary" plain size="mini" @click="toViewDetail()" v-entity="152">查看明细</el-button>
           <el-button type="primary" plain size="mini" @click="downloadResultExcel(3)" v-entity="407">导出上传失败明细</el-button>
           <el-button type="primary" plain size="mini" @click="downloadResultExcel(-1)" v-entity="408">导出上传明细</el-button>
           <el-button type="primary" plain size="mini" @click="downloadExcel()" v-entity="153">下载导入文件</el-button>
        </div>
      </div>
      <tableCommon ref="importCenterTable" :head="head" @dblclickItem="dblclickItem" tableName="importCenterTable"></tableCommon>
    </div>
  </div>
</template>

<script>
import importCenter from './importCenter.js'
export default importCenter
</script>
<style scoped>

</style>