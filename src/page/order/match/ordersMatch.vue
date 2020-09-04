<template>
  <div id="ordersMatch" class="ordersMatchPage">
    <innerTab  :tabs="tabs" @selectCallback="selectCallback" ></innerTab>
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
          <label class="label">客户单号</label>
          <div class="input-text">
             <el-input v-model="query.ordNum"  placeholder="客户单号" type="text"></el-input>
          </div>
        </div>
         <div class="item have-label item2row" v-show="currentTab.queryCostType == undefined">
          <label class="label">            
            <el-select v-model="query.queryMatchType" @change="forceUpdate()">
              <el-option v-for="item in selectMatchTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </label>
          <div class="input-text">
            <el-select v-model="query.supplierTenantIdTemplate" filterable placeholder="输入默认对应下拉值">
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
     
        <div class="item  have-label item2row">
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
          <el-tooltip effect="light" content="一键合并派发，根据承运关系实现一键派发" placement="right">
            <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
           
          </el-tooltip>
        </h3>
        <div class="table-title-btn">
          <el-button type="primary" plain size="mini" v-show="currentTab.queryCostType == 1"  @click="selectSupplierOne('costCompanyOne')" v-entity="218">第一优选</el-button>
          <el-button type="primary" plain size="mini" v-show="currentTab.queryCostType == 2" @click="selectSupplierOne('costCompanyOne')" v-entity="220" >时效最快</el-button>
          <el-button type="primary" plain size="mini" v-show="currentTab.queryCostType == 1 || currentTab.queryCostType == 2"  @click="selectSupplierLowPrice()" v-entity="219" >价格最低</el-button>
          <el-button type="primary" plain size="mini" v-show="currentTab.queryCostType == 3"  @click="selectSupplierOne('costCompanyOne')" v-entity="221" >一键中转</el-button>
          <el-button type="primary" plain size="mini" v-show="currentTab.queryCombinedSts == 2"  @click="selectCombinedNotView()" v-entity="557">一键派单</el-button>
          <el-button type="primary" plain size="mini" v-show="currentTab.queryCombinedSts == 2"  @click="selectCombinedCarrier()" v-entity="415">一键合并派发</el-button>
          <el-button type="primary" plain size="mini" v-show="currentTab.queryCombinedSts == 2"  @click="selectCombinedView()" v-entity="223">合单中转</el-button>
          <el-button type="primary" plain size="mini" v-show="currentTab.queryCombinedSts == 2"  @click="selectCombinedAiView()" v-entity="222">智能合单</el-button>
          <el-button type="primary" plain size="mini" @click="exportOrders()" v-entity="217">导出</el-button>
          <!-- v-show="currentTab.queryCombinedSts == 2" -->
        </div>
      </div>
      <tableCommon ref="ordersMatchManager" :doSum="true" :head="head" @dblclickItem="dblclickItem" :tableName="ordersMatchTable"></tableCommon>
    </div>
     <!--- 供应商 合单 开始--->
    <el-dialog title="一键合单中转" :visible.sync="showSelectCombinedView" center width="500px">
      <div class="common-info" style="border:none;padding:0;">
         <ul class="content clearfix">
          <li class="item item100">
            <label class="label-term"><em>*</em>供应商</label>
            <div class="input-text">
              <el-select v-model="outgoing.supplierTenantId" filterable  placeholder="请选择" @change="queryProject()">
                <el-option v-for="item in supplierTenantList" :key="item.tenantId" :label="item.tenantFullName" :value="item.tenantId"></el-option>
              </el-select>
            </div>
          </li>
        </ul>
        <ul class="content clearfix">
          <li class="item item100">
            <label class="label-term">中转单号</label>
            <div class="input-text">
              <el-input v-model="outgoing.outgoingTracking" maxlength="30"></el-input>
            </div>
          </li>
        </ul>
        <ul class="content clearfix">
          <li class="item item100">
            <label class="label-term">中转费用</label>
            <div class="input-text">
              <el-input maxlength="8" v-model="outgoing.outgoingFeeDouble" v-mynumval></el-input>
            </div>
          </li>
        </ul>
        <ul class="content clearfix">
          <li class="item item100">
            <label class="label-term">备注</label>
            <div class="input-text">
                 <el-input v-model="outgoing.remarks" type="textarea" maxlength="256"  :autosize="{ minRows: 2, maxRows: 4}"></el-input>
            </div>
          </li>
        </ul>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button  @click="showSelectCombinedView=false">取 消</el-button>
        <el-button type="primary" @click="selectCombined()" >确 定</el-button>
      </div>
    </el-dialog>
     <!--- 供应商 合单 结束--->
    <!--- 供应商 派单 开始--->
    <el-dialog title="一键派单（非合单）" :visible.sync="showSelectCombinedNotView" center width="500px">
      <div class="common-info" style="border:none;padding:0;">
         <ul class="content clearfix">
          <li class="item item100">
            <label class="label-term"><em>*</em>供应商</label>
            <div class="input-text">
              <el-select v-model="outgoing.supplierTenantId" filterable  placeholder="请选择" @change="queryProject()">
                <el-option v-for="item in supplierTenantList" :key="item.tenantId" :label="item.tenantFullName" :value="item.tenantId"></el-option>
              </el-select>
            </div>
          </li>
        </ul>
       </div>
      <div slot="footer" class="dialog-footer">
        <el-button  @click="showSelectCombinedNotView=false">取 消</el-button>
        <el-button type="primary" @click="selectCombined()" >确 定</el-button>
      </div>
   
    </el-dialog>
     <!--- 供应商 派单 结束--->

    <!--- 供应商 智能新增 开始--->
    <el-dialog title="智能合单" :visible.sync="showSelectCombinedAiView" center width="500px">
      <div class="common-info" style="border:none;padding:0;">
        <table class="tableCommon" width="100%" border="0" cellspacing="0" cellpadding="0">
          <tbody>
            <tr>
              <td>打包件数</td>
              <td>打包重量（公斤）</td>
              <td>打包体积（方）</td>
            </tr>
            <tr>
              <td>{{outgoing.order.packageNumber}}</td>
              <td>{{outgoing.order.packageWeight}}</td>
              <td>{{outgoing.order.packageVolume}}</td>
            </tr>
          </tbody>
        </table>
        <table class="tableCommon" width="100%" border="0" cellspacing="0" cellpadding="0">
          <tbody>
            <tr>
              <td>优先类型</td>
              <td>供应商名</td>
              <td>预计费用</td>
              <td>选定</td>
            </tr>
            <tr v-for="(data,index) in outgoing.suppliers" :key="index">
              <!-- 优先类型 -->
              <td :key="index" :title="data.costTypeName">{{data.costTypeName}}</td>
              <!-- 供应商名 -->
              <td :key="index" :title="data.supplierTenantName">{{data.supplierTenantName}}</td>
              <!-- 预计费用 -->
              <td :key="index" :title="data.costTotalFeeDouble">{{data.sumCostDouble}}</td>
              <!-- 选定 -->
              <td><el-radio v-model="radioDesignate" :label="index" @click.native="selectRadio(data)">{{''}}</el-radio></td>
            </tr>
          </tbody>
        </table>
        <ul class="content clearfix">
          <li class="item item100">
            <label class="label-term">中转单号</label>
            <div class="input-text">
              <el-input v-model="outgoing.outgoingTrackingNum" maxlength="30"></el-input>
            </div>
          </li>
        </ul>
        <ul class="content clearfix">
          <li class="item item100">
            <label class="label-term">中转费用</label>
            <div class="input-text">
              <el-input maxlength="8" v-model="outgoing.outgoingFee" v-mynumval></el-input>
            </div>
          </li>
        </ul>
        <ul class="content clearfix">
          <li class="item item100">
            <label class="label-term">备注</label>
            <div class="input-text">
                 <el-input v-model="outgoing.remarks" type="textarea" maxlength="256"  :autosize="{ minRows: 2, maxRows: 4}"></el-input>
            </div>
          </li>
        </ul>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button  @click="showSelectCombinedAiView=false">取 消</el-button>
        <el-button type="primary" @click="selectCombined()">确 定</el-button>
      </div>
    </el-dialog>
     <!--- 供应商 智能新增 结束--->

  </div>
</template>

<script>
import ordersMatch from './ordersMatch.js'
export default ordersMatch
</script>

<style lang="scss">
.ordersMatchPage{
  .common-info{
    .tableCommon{
      margin-bottom: 20px;
      border:$border;
      border-bottom: none;
    }
  }
}
</style>