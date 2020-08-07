<template>
  <div id="orders" class="orderPage">
    <innerTab  :tabs="tabs" @selectCallback="selectCallback" ></innerTab>
   <div class="search-list clearfix" >
    <div class="search-form clearfix" v-show="currentTab.selectType == 1">
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
          <label class="label">发货区域</label>
          <div class="input-text">
            <el-select v-model="query.regionId" filterable placeholder="发货区域">
              <el-option v-for="item in regionList" :key="item.regionId" :label="item.regionName" :value="item.regionId"></el-option>
            </el-select>
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
            <label class="label">始发城市</label>
            <div class="input-text">
              <mycity class="city fl" selectType="3" ref="sourceCityAddr"  placeholder="始发城市"></mycity>
            </div>
          </div>
          <div class="item">
            <label class="label">目的城市</label>
            <div class="input-text">
              <mycity class="city fl" selectType="3" ref="destCityAddr"  placeholder="目的城市"></mycity>
            </div>
          </div>
          
          <div class="item">
            <label class="label">发货店仓</label>
            <div class="input-text">
              <el-input v-model="query.consignorName"  placeholder="发货店仓"></el-input>
            </div>
          </div>

          <div class="item">
            <label class="label">收货客户</label>
            <div class="input-text">
              <el-input v-model="query.consigneeName"  placeholder="收货客户"></el-input>
            </div>
          </div>
          <div class="item">
            <label class="label">客户单号</label>
            <div class="input-text">
              <el-input v-model="query.ordNum"  placeholder="客户单号"></el-input>
            </div>
          </div>
           <div class="item ">
          <label class="label">优先供应商</label>
          <div class="input-text">
            <el-select v-model="query.supplierTenantId" filterable placeholder="优先供应商">
              <el-option v-for="item in supplierTenantList" :key="item.tenantId" :label="item.tenantFullName" :value="item.tenantId"></el-option>
            </el-select>
          </div>
        </div>
         <div class="item have-label item2row">
          <label class="label">            
            <el-select v-model="query.queryTansitAddType" @change="forceUpdate()">
              <el-option v-for="item in selectTransferOrderList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </label>
          <div class="input-text">
            <el-input v-model="query.queryTansitAddAlias"  placeholder="输入默认对应下拉值" type="text"></el-input>
          </div>
        </div>
        <div class="item have-label item2row">
          <label class="label">            
            <el-select v-model="query.selectSupplierTenant" @change="forceUpdate()">
              <el-option v-for="item in supplierList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </label>
          <div class="input-text">
            <el-select v-model="query.selectSupplierTenantValue" filterable placeholder="默认对应下拉值">
              <el-option v-for="item in supplierTenantList" :key="item.tenantId" :label="item.tenantFullName" :value="item.tenantId"></el-option>
            </el-select>
          </div>
        </div>
         <div class="item">
          <label class="label">采购单号</label>
          <div class="input-text">
            <el-select v-model="query.purchaseNumFlag" filterable placeholder="采购单号重复选择">
              <el-option v-for="item in purchaseNumList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </div>
        </div>
     </div>
    <div class="search-form clearfix" v-show="currentTab.selectType == 2">
      <div class="item have-label item2row">
          <label class="label">            
            <el-select v-model="query.queryTransitTimeType" @change="forceUpdate()">
               <el-option v-for="item in selectTransitOrderTimeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </label>
          <div class="input-text">
            <dataPicker :model="query.queryTransitTimes" @callback="data=>{query.queryTransitTimes=data}"></dataPicker>
          </div>
        </div>
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
          <label class="label">发货区域</label>
          <div class="input-text">
            <el-select v-model="query.regionId" filterable placeholder="发货区域"  @change="forceUpdate()">
              <el-option v-for="item in regionList" :key="item.regionId" :label="item.regionName" :value="item.regionId"></el-option>
            </el-select>
          </div>
        </div>
        <div class="item">
          <label class="label">目的区域</label>
          <div class="input-text">
            <el-select v-model="query.destRegionId" filterable placeholder="目的区域">
              <el-option v-for="item in regionAllList" :key="item.regionId" :label="item.regionName" :value="item.regionId"></el-option>
            </el-select>
          </div>
        </div>
        <div class="item">
          <label class="label">供应商类型</label>
          <div class="input-text">
            <el-select v-model="query.supplierType" placeholder="供应商类型">
               <el-option v-for="item in selectSupplierTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
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
         <div class="item">
          <label class="label">结算方式</label>
          <div class="input-text">
            <el-select v-model="query.transitPaymentType"  placeholder="结算方式">
               <el-option v-for="item in selectTransitPaymentTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </div>
        </div>
        
        <!-- <div class="item" >
          <label class="label">运单号</label>
          <div class="input-text">
             <el-input v-model="query.trackingNum" v-mynumval placeholder="完整运单单号" type="text"></el-input>
          </div>
        </div> -->
     
         <div class="item">
          <label class="label">中转单号</label>
          <div class="input-text">
             <el-input v-model="query.outgoingTrackingNum"   placeholder="完整中转单号" type="text"></el-input>
          </div>
        </div>
         <div class="item">
          <label class="label">批次号</label>
          <div class="input-text">
             <el-input v-model="query.batchNumAlias" placeholder="批次号" t   type="text"></el-input>
          </div>
        </div>
        <div class="item have-label item2row">
          <label class="label">            
            <el-select v-model="query.queryOrderType" @change="forceUpdate()">
              <el-option v-for="item in selectOrderList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </label>
          <div class="input-text">
            <el-input v-model="query.queryAlias"  placeholder="输入默认对应下拉值" type="text"></el-input>
          </div>
        </div>
        <div class="item">
          <label class="label">采购单号</label>
          <div class="input-text">
            <el-select v-model="query.purchaseNumFlag" filterable placeholder="采购单号重复选择">
              <el-option v-for="item in purchaseNumList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
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
          <span>配载列表</span>
          <el-tooltip effect="light" content="双击查看详情" placement="right">
            <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
          </el-tooltip>
        </h3>
        <div class="table-title-btn" v-show="currentTab.selectType == 1">
          <el-button type="primary" plain size="mini" @click="modifyOrder()" v-entity="440" >运单修改</el-button>
          <el-button type="primary" plain size="mini" @click="printOrders()" v-entity="441">批量打印</el-button>
          <el-button type="primary" plain size="mini" @click="showCancelOrder()" v-entity="442" >取消运单</el-button>
          <el-button type="primary" plain size="mini" @click="exportOrders()" v-entity="443" >导出</el-button>
        </div>
        <div class="table-title-btn" v-show="currentTab.selectType == 2">
          <el-button type="primary" plain size="mini" @click="toTransitOrderView(2)" v-entity="558">查看配载</el-button>
          <el-button type="primary" plain size="mini" @click="toTransitOrderView(1)" v-entity="559">修改配载</el-button>
          <el-button type="primary" plain size="mini" @click="cancelTransitOrders()" v-entity="560">按单取消</el-button>
          <el-button type="primary" plain size="mini" @click="cancelTransitBatchNum()" v-entity="561" >按批次取消</el-button>
          <el-button type="primary" plain size="mini" @click="updateOrderThreeSystem()" v-entity="578" >重新派单</el-button>
          <el-button type="primary" plain size="mini" @click="trackingOrderView()" v-entity="562">中转跟踪</el-button>
          <el-button type="primary" plain size="mini" @click="exportOrders()" v-entity="563">导出</el-button>
        </div>
      </div>
      <tableCommon ref="ordersTransferManager"  :head="head" @dblclickItem="dblclickItem" :tableName="ordersTransferTable"></tableCommon>
    </div>
    <printSet :isShowSet="showPrinterView" businessTypes="1" @showChange="showChange" @sureCallback="sureCallback"></printSet>
    <!--- 取消运单 备注开始--->
    <el-dialog title="取消运单提示" :visible.sync="showCancelRemark" center width="350px">
      <div class="common-info" style="border:none;">
        <ul class="content clearfix">
          <li class="item item100">
            <label class="label-term">原因</label>
            <div class="input-text">
              <el-input v-model="cancelRemark" maxlength="255" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
            </div>
          </li>
        </ul>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showCancelRemark = false;cancelRemark=''">取 消</el-button>
        <el-button type="primary" @click="cancelOrder()">确 定</el-button>
      </div>
    </el-dialog>
    <!--- 取消运单 备注结束--->
  </div>
</template>

<script>
import orders from './ordersTransfer.js'
export default orders
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