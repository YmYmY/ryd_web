<template>
  <div id="sysRole">
    <div class="search-list clearfix">
      <div class="search-form clearfix">
        <div class="item">
        <label class="label">创建时间</label>
        <div class="input-text">
                        <dataPicker :model="obj.createDate" @callback="data=>{obj.createDate=data}" startPlaceholder="开始" endPlaceholder="结束"></dataPicker>
        </div>
      </div>
        <div class="item">
          <label class="label">角色名称:</label>
          <div class="input-text">
            <el-input v-model="obj.roleName" placeholder="请输入"></el-input>
          </div>
        </div>
      </div>
      <div class="search-btn clearfix">
        <div class="btn">
          <el-button type="primary" @click="doQuerySysRole()" plain size="mini" icon="el-icon-search">搜索</el-button>
        </div>
        <div class="btn">
          <el-button type="danger" @click="clear()" plain size="mini" icon="el-icon-close">清空</el-button>
        </div>
      </div>
    </div>
    <div class="table-content">
      <div class="table-title">
        <h3>
          <span>角色管理列表</span>
          <el-tooltip effect="light" content="角色管理列表" placement="right">
            <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
          </el-tooltip>
        </h3>
        <div class="table-title-btn">
          <el-button type="primary" v-entity="66" @click="addSysRole()" plain size="mini">新增角色</el-button>
          <el-button type="primary" v-entity="67" @click="updateSysRole()" plain size="mini">修改角色</el-button>
          <el-button type="primary" v-entity="68" @click="deleteSysRole()" plain size="mini">删除角色</el-button>
          <el-button type="primary" v-entity="69" @click="downloadExcelFile()" plain size="mini">导出</el-button>
        </div>
      </div>
      <tableCommon tableName="sysRoleTable" ref="table" :head="head" :showNum="true"></tableCommon>
    </div>
  </div>
</template>


<script>
import sysRole from './sysRole.js'
export default sysRole
</script>
<style scoped>

</style>