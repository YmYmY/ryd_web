<template>
  <div id="ordersTransferOne" class="ordersTransferOnePage">
    <div class="search-list clearfix">
      <div class="search-form clearfix">
      <div class="item have-label item2row">
          <label class="label">            
            <el-select v-model="query.queryMatchTimeType" @change="forceUpdate()">
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
          <label class="label">所属区域</label>
          <div class="input-text">
            <el-select v-model="query.regionId" filterable placeholder="所属区域">
              <el-option v-for="item in regionList" :key="item.regionId" :label="item.regionName" :value="item.regionId"></el-option>
            </el-select>
          </div>
        </div>
         <div class="item">
          <label class="label">供应商</label>
          <div class="input-text">
            <el-select v-model="query.costCompanyCustomerOne" filterable placeholder="供应商">
              <el-option v-for="item in supplierTenantList" :key="item.tenantId" :label="item.tenantFullName" :value="item.tenantId"></el-option>
            </el-select>
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
          <label class="label">运单号</label>
          <div class="input-text">
             <el-input v-model="query.trackingNum"  placeholder="完整运单号" type="text"></el-input>
          </div>
        </div>
        <div class="item">
          <label class="label">客户单号</label>
          <div class="input-text">
             <el-input v-model="query.ordNum"  placeholder="客户单号" type="text"></el-input>
          </div>
        </div>
        <div class="item have-label item2row">
          <label class="label">            
            <el-select v-model="query.queryMatchOrderType" @change="forceUpdate()">
              <el-option v-for="item in selectOrderList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </label>
          <div class="input-text">
            <el-input v-model="query.queryAlias"  placeholder="输入默认对应下拉值" type="text"></el-input>
          </div>
        </div>
        <div class="item have-label item2row">
          <label class="label">            
            <el-select v-model="query.queryMatchOrderConsigneeType" @change="forceUpdate()">
              <el-option v-for="item in selectOrderConsigneeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </label>
          <div class="input-text">
            <el-input v-model="query.queryConsigneeAlias"  placeholder="输入默认对应下拉值" type="text"></el-input>
          </div>
        </div>
        <div class="item">
          <label class="label">销售部门</label>
          <div class="input-text">
            <el-select v-model="query.oragnizeId" filterable placeholder="销售部门">
              <el-option v-for="item in oragnizeList" :key="item.oragnizeId" :label="item.oragnizeName" :value="item.oragnizeId"></el-option>
            </el-select>
          </div>
        </div>
        <div class="item">
          <label class="label">销售专员</label>
          <div class="input-text">
             <el-input v-model="query.salesmanBusinessName"  placeholder="销售专员" type="text"></el-input>
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
         <div class="item">
          <label class="label">承运逻辑</label>
          <div class="input-text">
            <el-select v-model="query.carrierType" placeholder="承运逻辑">
              <el-option v-for="item in selectCarrierTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
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
          <span>匹配列表</span>
          <!-- <el-tooltip effect="light" content="" placement="right">
            <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
          </el-tooltip> -->
        </h3>
        <div class="table-title-btn">
          <el-button type="primary" plain size="mini"   @click="selectSupplierOne('costCompanyOne')" v-entity="383">一键派单</el-button>
          <el-button type="primary" plain size="mini"  @click="modifySupplierOneView()" v-entity="384" >修改供应商</el-button>
          <el-button type="primary" plain size="mini" @click="exportOrders()" v-entity="385">导出</el-button>
          <!-- v-show="currentTab.queryCombinedSts == 2" -->
        </div>
      </div>
      <tableCommon ref="ordersTransferOneManager" :head="head" @dblclickItem="dblclickItem" tableName="ordersTransferOneTable"></tableCommon>
    </div>
     <!--- 修改供应商   开始--->
   <el-dialog title="修改供应商" :visible.sync="modifySupplierOneViewFlag" center width="400px">
      <div class="common-info" style="border:none;padding:0;">
        <ul class="content clearfix">
          <li class="item item100">
            <label class="label-term"><em>*</em>供应商</label>
            <div class="input-text">
                <el-select v-model="save.supplierTenantId" filterable placeholder="请选择">
                     <el-option v-for="item in supplierTenantList" :key="item.tenantId" :label="item.tenantFullName" :value="item.tenantId"></el-option>
               </el-select>
            </div>
          </li>
        </ul>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="modifySupplierOneViewFlag = false">取 消</el-button>
        <el-button type="primary" @click="modifySupplierOneClick(2)">修改并派发</el-button>
        <el-button type="danger" @click="modifySupplierOneClick(1)">确认修改</el-button>
      </div>
    </el-dialog>
     <!--- 修改 供应商   结束--->
  </div>
</template>

<script>
import ordersTransferOne from './ordersTransferOne.js'
export default ordersTransferOne
</script>

<style lang="scss">
.ordersTransferOnePage{
  .common-info{
    .tableCommon{
      margin-bottom: 20px;
      border:$border;
      border-bottom: none;
    }
  }
}
</style>