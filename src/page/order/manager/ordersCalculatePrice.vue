<template>
  <div id="ordersCalculatePriceList" class="orderPage">
     <innerTab  :tabs="tabs" @selectCallback="selectCallback" ></innerTab>
    <div class="search-list clearfix">
      <div class="search-form clearfix">
       <div class="item item2row have-label">
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
          <label class="label">所属区域</label>
          <div class="input-text">
            <el-select v-model="query.regionId" filterable placeholder="所属区域">
              <el-option v-for="item in regionList" :key="item.regionId" :label="item.regionName" :value="item.regionId"></el-option>
            </el-select>
          </div>
        </div>
        <div class="item">
          <label class="label">结算方式</label>
          <div class="input-text">
            <el-select v-model="query.paymentType" placeholder="结算方式">
              <el-option v-for="item in paymentTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </div>
        </div>
        <div class="item item2row have-label">
          <label class="label">            
            <el-select v-model="query.queryOrderType" @change="forceUpdate()">
              <el-option v-for="item in selectOrderList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </label>
          <div class="input-text">
            <el-input v-model="query.queryAlias"  placeholder="请输入下拉对应值" type="text"></el-input>
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
         <div class="item have-label">
          <label class="label">            
            <el-select v-model="query.queryPackageNumber" @change="forceUpdate()">
               <el-option v-for="item in selectPackageNumberList" :key="item.codeValue" :label="item.codeDesc" :value="item.codeValue"></el-option>
            </el-select>
          </label>
          <div class="input-text">
             <el-input v-model="query.queryPackageNumberValue"   placeholder="打包件数" type="text"></el-input>
          </div>
        </div>
         <div class="item have-label">
          <label class="label">            
            <el-select v-model="query.queryPackageVolume" @change="forceUpdate()">
               <el-option v-for="item in selectPackageVolumeList" :key="item.codeValue" :label="item.codeDesc" :value="item.codeValue"></el-option>
            </el-select>
          </label>
          <div class="input-text">
             <el-input v-model="query.queryPackageVolumeValue"  placeholder="打包体积" type="text"></el-input>
          </div>
        </div>
         <div class="item have-label">
          <label class="label">            
            <el-select v-model="query.queryPackageWeight" @change="forceUpdate()">
               <el-option v-for="item in selectPackageWeightList" :key="item.codeValue" :label="item.codeDesc" :value="item.codeValue"></el-option>
            </el-select>
          </label>
          <div class="input-text">
             <el-input v-model="query.queryPackageWeightValue"     placeholder="打包重量" type="text"></el-input>
          </div>
        </div>
         <div class="item" v-if="currentTab.selectType == 2">
          <label class="label">计费产品</label>
          <div class="input-text">
              <el-input v-model="query.calculatePriceName"  placeholder="计费产品" type="text"></el-input>
          </div>
        </div>
        <div class="item"  v-show="currentTab.orderState != '2' && currentTab.orderState != '88'">
          <label class="label">供应商</label>
          <div class="input-text">
            <el-select v-model="query.supplierTenantId" filterable placeholder="供应商">
              <el-option v-for="item in supplierTenantList" :key="item.tenantId" :label="item.tenantFullName" :value="item.tenantId"></el-option>
            </el-select>
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
          <span>订单列表</span>
          <el-tooltip effect="light" content="双击查看详情" placement="right">
            <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
          </el-tooltip>
        </h3>
        <div class="table-title-btn" v-if="currentTab.selectType == 1">
          <el-button type="primary" plain size="mini" @click="saveOrUpdatePriceView(1)"  v-entity="580">价格匹配</el-button>
          <el-button type="primary" plain size="mini" @click="exportOrders()"  v-entity="582">导出</el-button>
        </div>
         <div class="table-title-btn" v-if="currentTab.selectType == 2">
          <el-button type="primary" plain size="mini" @click="saveOrUpdatePriceView()"  v-entity="581">修改产品价格</el-button>
          <el-button type="primary" plain size="mini" @click="exportOrders()"  v-entity="582">导出</el-button>
        </div>
      </div>
      <tableCommon ref="ordersCalculatePriceManager" :head="head" @dblclickItem="dblclickItem" tableName="ordersCalculatePriceTable"></tableCommon>
    </div>
      <!--- 价格产品 修改新增 开始--->
    <el-dialog :title="priceTitle" :visible.sync="showSaveOrUpdatePriceView" center width="350px">
      <div class="common-info" style="border:none;">
        <ul class="content clearfix">
          <li class="item item100">
            <label class="label-term"><em>*</em>价格产品</label>
            <div class="input-text">
              <el-select v-model="order.calculatePriceName" filterable  placeholder="请选择" @change="selectCalculatePrice">
                <el-option v-for="item in tenantPriceList" :key="item.priceId" :label="item.priceName" :value="item"></el-option>
              </el-select>
            </div>
          </li>
        </ul>
        <ul class="content clearfix">
          <li class="item item100">
            <label class="label-term">备注</label>
            <div class="input-text">
              <el-input v-model="order.remarks"  maxlength="255" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
            </div>
          </li>
        </ul>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showSaveOrUpdatePriceView = false;order={'calculatePriceName':''}">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdatePrice()">确 定</el-button>
      </div>
    </el-dialog>
     <!--- 价格产品 修改新增  结束--->
  </div>
  
</template>

<script>
import ordersCalculatePrice from './ordersCalculatePrice.js'
export default ordersCalculatePrice
</script>
<style lang="scss">
.orderPage{
  .el-dialog {
    .el-dialog__body{
      padding:0;
      .common-info{
        padding:20px 20px 10px;
      }
    }
  }
}
</style>