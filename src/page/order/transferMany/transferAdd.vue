<template>
  <div id="transferAdd">
    <div v-show="showTablePage">
      <div class="search-list clearfix">
        <div class="search-form clearfix">
         
           <div class="item have-label item2row">
          <label class="label">            
            <el-select v-model="query.queryTimeType" @change="forceUpdate()">
               <el-option v-for="item in selectOrderTimeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
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
          <label class="label">品牌</label>
          <div class="input-text">
             <el-input v-model="query.brandName"  placeholder="品牌" type="text"></el-input>
          </div>
        </div>
         <div class="item">
            <label class="label">运单号</label>
            <div class="input-text">
              <el-input v-model="query.trackingNum" v-mynumval placeholder="完整运单号"></el-input>
            </div>
          </div>
           <div class="item">
            <label class="label">客户单号</label>
            <div class="input-text">
              <el-input v-model="query.ordNum"  placeholder="客户单号"></el-input>
            </div>
          </div>
           <div class="item">
            <label class="label">上一供应商</label>
            <div class="input-text">
              <el-select v-model="query.supplierTenantId" filterable placeholder="上一供应商">
                <el-option v-for="item in supplierTenantList" :key="item.tenantId" :label="item.tenantFullName" :value="item.tenantId"></el-option>
              </el-select>
            </div>
        </div>
        <div class="item">
          <label class="label">上次中转单号</label>
          <div class="input-text">
            <el-input v-model="query.outgoingTrackingNum"  placeholder="上次中转单号"></el-input>
          </div>
        </div>
        
        <!-- <div class="item">
          <label class="label">目的区域</label>
          <div class="input-text">
            <el-select v-model="query.destRegionId" filterable placeholder="请选择">
              <el-option v-for="item in regionAllList" :key="item.regionId" :label="item.regionName" :value="item.regionId"></el-option>
            </el-select>
          </div>
        </div> -->
        <div class="item have-label item2row">
          <label class="label">            
            <el-select v-model="query.queryTansitAddType" @change="forceUpdate()">
              <el-option v-for="item in selectOrderList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </label>
          <div class="input-text">
            <el-input v-model="query.queryTansitAddAlias"  placeholder="输入默认对应下拉值" type="text"></el-input>
          </div>
        </div>
        </div>
        <div class="search-btn clearfix">
          <div class="btn">
            <el-button type="primary" plain size="mini" icon="el-icon-search" @click="doQuery()">搜索</el-button>
          </div>
          <div class="btn">
            <el-button type="danger" plain size="mini" icon="el-icon-close" @click="clear()">清空</el-button>
          </div>
        </div>
      </div>
      <div class="table-content">
       <div class="table-title">
          <h3>
            <span>配载列表</span>
          </h3>
          <div class="table-title-btn">
            <el-button type="primary" plain size="mini" @click="showOrderView()">已选中{{selectOrders.length <= 0 ? '' : selectOrders.length}}单</el-button>
            <el-button type="primary" plain size="mini" @click="doNext()" v-show="!outModify" >二次中转</el-button>
            <el-button type="primary" plain size="mini" @click="doNext()" v-show="outModify" >二次修改</el-button>
            <el-button type="primary" plain size="mini" @click="exportOrders()">导出</el-button>
          </div>
      </div>
        <tableCommon ref="table" :head="head" @selectAll='selectAll'  @dblclickItem="dblclickItem"  @clickItem="clickItem"  tableName="transferAddTable"></tableCommon>
      </div>
    </div>
    <transferAddDetail  :parentTableData="tableRightData" :headList="headAddList" v-if="!showTablePage" @goback="goback" @closeTab="closeTab"></transferAddDetail>
  
    <!-- 已选单开始 -->
    <el-dialog title="已选中单" :visible.sync="selectOrdersView" center width="1000px">
      <div class="mb_20 clearfix">
        <div class="fr">
          <el-button type="primary" plain size="mini" @click="removeOrders(1)">全部移除</el-button>
          <el-button type="primary" plain size="mini" @click="removeOrders(2)">移除</el-button>
          <el-button type="primary" plain size="mini" @click="selectOrdersView=false" >关闭</el-button>
        </div>
      </div>
      <div class="table_height" style="overflow:auto;max-height:300px;">
        <table class="tableCommon" width="100%" border="0" cellspacing="0" cellpadding="0">
          <thead>
            <tr>
              <th width="100"></th>
              <th :width="hd.width?hd.width:100" v-for="(hd,$index) in head" :key="$index">{{hd.name}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data,index) in selectOrders" :key="index" @click="selectRow(data)">
              <td width="100">
                <el-checkbox class="checkbox_row" v-model="data.checkOrder"></el-checkbox>
              </td>
              <td v-for="(hd,$index) in head" :key="$index">
                <input type="text"  v-model="data[hd.code]" v-if="hd.type=='input'">
                <span v-else>{{data[hd.code]}}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </el-dialog>
    <!-- 已选单结束 -->
  </div>
</template>

<script>
import transferAdd from './transferAdd.js'
export default transferAdd
</script>