<template>
  <div id="vouchManager" class="financeTallyPage">
    <div class="search-list clearfix ">
      <div class="search-form clearfix">
        <div class="item item2row have-label">
          <label class="label">            
           <label class="label">操作日期</label>
          </label>
          <div class="input-text">
            <dataPicker :model="query.queryTimes" @callback="data=>{query.queryTimes=data}"></dataPicker>
          </div>
        </div>
        <div class="item" v-show="!revokeFlag">
          <label class="label">来源</label>
          <div class="input-text">
             <el-select v-model="query.sourceType" placeholder="来源">
               <el-option v-for="item in sourceTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </div>
        </div>
         <div class="item">
          <label class="label">记账方向</label>
          <div class="input-text">
             <el-select v-model="query.derection" placeholder="记账方向">
               <el-option v-for="item in derectionList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </div>
        </div>
        <div class="item">
          <label class="label">审核状态</label>
          <div class="input-text">
             <el-select v-model="query.auditSts" placeholder="审核状态">
               <el-option v-for="item in auditStsList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </div>
        </div>
         <div class="item item2row have-label">
          <label class="label">            
           <label class="label">入账日期</label>
          </label>
          <div class="input-text">
            <dataPicker :model="query.queryVouchTimes" @callback="data=>{query.queryVouchTimes=data}"></dataPicker>
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
          <label class="label">科目</label>
          <div class="input-text">
            <el-select v-model="query.itemCode" placeholder="科目">
               <el-option v-for="item in itemList" :key="item.itemCode" :label="item.itemNameAlias" :value="item.itemCode"></el-option>
            </el-select>
          </div>
        </div>
         <div class="item item2row have-label">
          <label class="label">            
            <el-select v-model="query.queryVouchType" @change="forceUpdate()">
              <el-option v-for="item in selectVouchList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </label>
          <div class="input-text">
            <el-input v-model="query.queryAlias"  placeholder="请输入下拉选择值" type="text"></el-input>
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
     <div class="calcSurplus" v-if="!revokeFlag">
      上期结余<el-input v-model="vouchSum.fee" v-bind:disabled="true"></el-input>
      <span class="symbol">+</span>
      本期发生<el-input  v-model="vouchSum.currentFee" v-bind:disabled="true"></el-input>
      <span class="symbol"  >=</span>
      本期结余<el-input  v-model="vouchSum.currentSyFee" v-bind:disabled="true"></el-input>
    </div>
    <div class="table-content">
      <div class="table-title">
        <h3>
          <span>凭证列表</span>
          <el-tooltip effect="light" content="" placement="right">
            <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
          </el-tooltip>
        </h3>
        <div class="table-title-btn" v-if="!revokeFlag">
          <el-button type="primary" plain size="mini" @click="addVouch()"  v-entity="344">新增</el-button>
          <el-button type="primary" plain size="mini" @click="modifyVouch()" v-entity="345" >修改</el-button>
          <el-button type="primary" plain size="mini" @click="deleteVouch()" v-entity="346">删除</el-button>
          <el-button type="primary" plain size="mini" @click="auditVouch()" v-entity="347" >审核</el-button>
          <el-button type="primary" plain size="mini" @click="queryVouchDetail()" v-entity="348">凭证明细</el-button>
          <el-button type="primary" plain size="mini" @click="exportOrders()" v-entity="349" >导出</el-button>
        </div>
        <div class="table-title-btn" v-if="revokeFlag">
           <el-button type="primary" plain size="mini" @click="revokeCheck()" v-entity="351" >反核销</el-button>
           <el-button type="primary" plain size="mini" @click="exportOrders()" v-entity="352" >导出</el-button>
        </div>
      </div>
      <tableCommon ref="vouchManager" :doSum="true" :head="head" @dblclickItem="dblclickItem" tableName="vouchManagerTable"></tableCommon>
    </div>
  </div>
</template>

<script>
import vouchManager from './vouchManager.js'
export default vouchManager
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