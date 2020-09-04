<template>
  <div id="listAudit" class="orderAuditPage">
    <div class="search-list clearfix">
      <div class="search-form clearfix">
      <div class="item have-label item2row">
          <label class="label">            
            <el-select v-model="query.queryAuditTimeType" @change="forceUpdate()">
              <el-option v-for="item in selectOrderTimeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </label>
          <div class="input-text">
            <dataPicker :model="query.queryTimes" @callback="data=>{query.queryTimes=data}"></dataPicker>
          </div>
        </div>
        <div class="item">
          <label class="label">审核状态</label>
          <div class="input-text">
            <el-select v-model="query.auditSts" placeholder="审核状态">
              <el-option v-for="item in orderAuditStsList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </div>
        </div>
        <div class="item">
          <label class="label">三方确认状态</label>
          <div class="input-text">
            <el-select v-model="query.payConsignorState" placeholder="三方确认状态">
              <el-option v-for="item in payConsignorStateList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </div>
        </div>
        
        <div class="item">
          <label class="label">下单客户</label>
          <div class="input-text">
            <el-select v-model="query.customerTenantId" filterable  placeholder="下单客户">
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
        <div class="item have-label item2row">
          <label class="label">            
            <el-select v-model="query.queryAuditOrderType" @change="forceUpdate()">
              <el-option v-for="item in selectOrderList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </label>
          <div class="input-text">
            <el-input v-model="query.queryAlias"   placeholder="请输入下拉对应值" type="text"></el-input>
          </div>
        </div>
       <div class="item">
          <label class="label">运单号</label>
          <div class="input-text">
             <el-input v-model="query.trackingNum" v-mynumval placeholder="请输入完整单号" type="text"></el-input>
          </div>
        </div>
        <div class="item">
          <label class="label">客户单号</label>
          <div class="input-text">
             <el-input v-model="query.ordNum"  placeholder="客户单号" type="text"></el-input>
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
        <div class="table-title-btn">
          <el-button type="primary" v-entity="186" plain size="mini" @click="auditOrder()">审核运单</el-button>
          <el-button type="primary" v-entity="187" plain size="mini" @click="showCancelOrder()">取消运单</el-button>
          <el-button type="primary" v-entity="185" plain size="mini" @click="exportOrders()">导出</el-button>
          <el-button type="primary" v-entity="258" plain size="mini" @click="confirmOrder()">代客确认运单</el-button>
        </div>
      </div>
      <tableCommon ref="ordersAuditManager" :doSum="true" :head="head" @dblclickItem="dblclickItem" tableName="ordersAuditTable"></tableCommon>
    </div>
   
    <!--- 取消运单 备注开始--->
    <el-dialog title="取消运单提示" :visible.sync="showCancelRemark" center width="350px">
      <div class="common-info" style="border:none;">
        <ul class="content clearfix">
          <li class="item item100">
            <label class="label-term">原因</label>
            <div class="input-text">
              <el-input v-model="cancelRemark" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
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
import ordersAudit from './ordersAudit.js'
export default ordersAudit
</script>
<style lang="scss">
 .orderAuditPage{
  .el-dialog {
    .el-dialog__body{
      padding:0;
      .common-info{
        padding:20px 20px 10px;
        .label-term{
          width: 42px;
        }
        .input-text{
          width: calc(100% - 50px);
        }
      }
    }
  }
}
</style>