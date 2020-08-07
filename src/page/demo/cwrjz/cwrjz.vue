<template>
  <div id="list" class="financeTallyPage">
    <div class="search-list clearfix">
      <div class="search-form clearfix">
        <div class="item">
          <label class="label">输入框</label>
          <div class="input-text">
            <el-input v-model="inputvalue" v-mynumval placeholder="请输入" type="password" autocomplete="new-password"></el-input>
          </div>
        </div>
        <div class="item">
          <label class="label">选择框</label>
          <div class="input-text">
            <el-select v-model="selectValue" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
        </div>
        <div class="item">
          <label class="label">时间</label>
          <div class="input-text">
            <el-time-picker v-model="time" placeholder="选择时间"></el-time-picker>
          </div>
        </div>
        <div class="item">
          <label class="label">日期</label>
          <div class="input-text">
            <el-date-picker v-model="date" type="date" placeholder="选择日期"></el-date-picker>
          </div>
        </div>
        <div class="item">
          <label class="label">时间日期</label>
          <div class="input-text">
            <el-date-picker v-model="datetime" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </div>
        </div>
        <div class="item">
          <label class="label">日期范围</label>
          <div class="input-text">
            <el-date-picker v-model="daterange" type="daterange" range-separator="-" start-placeholder="开始"
              end-placeholder="结束" value-format="yyyy-MM-dd" @change="daterangeChange()"></el-date-picker>
          </div>
        </div>
        <div class="item">
          <label class="label">            
            <el-select v-model="selectValue" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </label>
          <div class="input-text">
            <el-select v-model="selectValue" placeholder="请选择" @change="changeSel">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item"></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="search-btn clearfix">
        <div class="btn">
          <el-button type="primary" plain size="mini" icon="el-icon-search" @click="getData();">搜索</el-button>
        </div>
        <div class="btn">
          <el-button type="danger" plain size="mini" icon="el-icon-close">清空</el-button>
        </div>
      </div>
    </div>
    <div class="calcSurplus">
      上期结余<el-input></el-input>
      <span class="symbol">+</span>
      本期发生<el-input></el-input>
      <span class="symbol">=</span>
      本期结余<el-input></el-input>
    </div>
    <div class="table-content">
      <div class="table-title">
        <h3>
          <span>订单列表</span>
          <el-tooltip effect="light" content="Right Center 提示文字" placement="right">
            <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
          </el-tooltip>
        </h3>
        <div class="table-title-btn">
          <el-button type="primary" plain size="mini" @click="dialogSchedule()">进度列表弹窗</el-button>
          <el-button type="primary" plain size="mini" @click="dialogTable()">列表弹窗</el-button>
          <el-button type="primary" plain size="mini" @click="downloadExcelFile()">导出</el-button>
          <el-button type="primary" plain size="mini" @click="opentab()">新开页面</el-button>
          <el-button type="primary" plain size="mini" @click="downFile()">下载文件</el-button>
          <el-button type="primary" plain size="mini" @click="closetab()">关闭当前页</el-button>
          <el-button type="primary" plain size="mini" @click="showDialog()">可以输入的弹窗</el-button>
        </div>
      </div>
      <tableCommon tableName="listTable" ref="table" :head="head"></tableCommon>
    </div>
  </div>
</template>

<script>
import list from './cwrjz.js'
export default list
</script>
<style lang="scss">
  .financeTallyPage{
    .calcSurplus{
      border:$border;
      padding: 20px;
      margin:10px 0;
      background: #fff;
      .symbol{
        margin:0 20px;
        font-weight: bold;
        font-size: 20px;
      }
      .el-input{
        width: 150px;
        margin-left: 5px;
      }
    }
  }
</style>