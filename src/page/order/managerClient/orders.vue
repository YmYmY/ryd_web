<template>
  <div id="orders" class="orderPage">
    <innerTab  :tabs="tabs" @selectCallback="selectCallback" ></innerTab>
    <div class="search-list clearfix"  v-show="currentTab.showOrderTab">
      <div class="search-form clearfix">
      <div class="item item2row have-label">
          <label class="label">            
            <el-select v-model="query.queryTimeClientType" @change="forceUpdate()">
              <el-option v-for="item in selectOrderTimeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </label>
          <div class="input-text">
            <dataPicker :model="query.queryTimes" @callback="data=>{query.queryTimes=data}"></dataPicker>
          </div>
        </div>
       <div class="item" v-show="currentTab.queryOrderOutStateTab == '5'">
          <label class="label">入库状态</label>
          <div class="input-text">
            <el-select v-model="query.callSts" placeholder="入库状态"  @change="forceUpdate()">
              <el-option v-for="item in orderCallStsList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </div>
        </div>
      
        <div class="item ">
          <label class="label">结算方式</label>
          <div class="input-text">
            <el-select v-model="query.paymentType" placeholder="结算方式">
              <el-option v-for="item in paymentTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </div>
        </div>
        <div class="item item2row have-label">
          <label class="label">            
            <el-select v-model="query.queryOrderClientType" @change="forceUpdate()">
              <el-option v-for="item in selectOrderList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </label>
          <div class="input-text">
            <el-input v-model="query.queryAlias"  placeholder="请输入下拉对应值" type="text"></el-input>
          </div>
        </div>

       <div class="item">
          <label class="label">产品类型</label>
          <div class="input-text">
            <el-select v-model="query.productType" placeholder="产品类型">
              <el-option v-for="item in orderProductTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </div>
        </div>
       <div class="item" v-show="currentTab.queryOrderOutStateTab == '1' || currentTab.queryOrderOutStateTab == '5'  || currentTab.queryOrderOutStateTab == '7'">
          <label class="label">运单状态</label>
          <div class="input-text">
            <el-select v-model="query.orderOutStates" placeholder="运单状态" @change="forceUpdate()">
              <el-option v-for="item in orderOutStateList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </div>
        </div>
         <div class="item">
          <label class="label">运单来源</label>
          <div class="input-text">
            <el-select v-model="query.sourceType" placeholder="运单来源">
              <el-option v-for="item in orderSourceTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
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
          <label class="label">品牌</label>
          <div class="input-text">
             <el-input v-model="query.brandName"  placeholder="品牌" type="text"></el-input>
          </div>
        </div>
        <!-- <div class="item"  v-show="currentTab.queryOrderOutStateTab != '6' && currentTab.queryOrderOutStateTab != '7'" >
          <label class="label">供应商</label>
          <div class="input-text">
            <el-select v-model="query.supplierTenantId" filterable placeholder="供应商">
              <el-option v-for="item in supplierTenantList" :key="item.tenantId" :label="item.tenantFullName" :value="item.tenantId"></el-option>
            </el-select>
          </div>
        </div> -->
        <div class="item"  v-show="currentTab.queryOrderOutStateTab != '6' && currentTab.queryOrderOutStateTab != '7'" >
          <label class="label">中转单号</label>
          <div class="input-text">
             <el-input v-model="query.outgoingTrackingNum"  placeholder="完整中转单号" type="text"></el-input>
          </div>
        </div>
       <div class="item" v-show="currentTab.queryOrderOutStateTab == '1' || currentTab.queryOrderOutStateTab == '2'">
          <label class="label">打印状态</label>
          <div class="input-text">
            <el-select v-model="query.printStatus" placeholder="打印状态">
              <el-option label="未打印" value="1">未打印</el-option>
              <el-option label="已打印" value="2">已打印</el-option>
            </el-select>
          </div>
      </div>
      <div class="item" v-show="currentTab.queryOrderOutStateTab == '1' || currentTab.queryOrderOutStateTab == '2'">
          <label class="label">打印数据</label>
          <div class="input-text">
            <el-select v-model="query.printDataFlag" placeholder="打印数据准备">
              <el-option label="未准备" value="1">未准备</el-option>
              <el-option label="已准备" value="2">已准备</el-option>
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
      <div class="search-btn clearfix">
        <div class="btn">
          <el-button type="primary" plain size="mini" icon="el-icon-search" @click="doQuery()">搜索</el-button>
        </div>
        <div class="btn">
          <el-button type="danger" @click="clear()" plain size="mini" icon="el-icon-close">清空</el-button>
        </div>
      </div>
    </div>
    <div class="table-content" v-show="currentTab.showOrderTab">
      <div class="table-title">
        <h3>
          <span>订单列表</span>
          <el-tooltip effect="light" content="双击查看轨迹" placement="right">
            <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
          </el-tooltip>
        </h3>
        <div class="table-title-btn">
          <el-button type="primary" plain size="mini" @click="orderView()" >运单详情</el-button>
          <el-button type="primary" plain size="mini" @click="dialogScheduleShowView()"  v-entity="566">轨迹查询</el-button>
          <el-button type="primary" plain size="mini" @click="addOrder()" v-entity="260" v-show="currentTab.queryOrderOutStateTab == '1' || currentTab.queryOrderOutStateTab == '2'" >运单录入</el-button>
          <el-button type="primary" plain size="mini" @click="modifyOrder()" v-entity="261" v-show="currentTab.queryOrderOutStateTab == '1' || currentTab.queryOrderOutStateTab == '2'" >运单修改</el-button>
          <el-button type="primary" plain size="mini" @click="doPrintBtach()" v-entity="444" v-show="currentTab.queryOrderOutStateTab == '1' || currentTab.queryOrderOutStateTab == '2'">打印快递单</el-button>
          <el-button type="primary" plain size="mini" @click="printOrders()" v-entity="262" v-show="currentTab.queryOrderOutStateTab == '1' || currentTab.queryOrderOutStateTab == '2'">批量打印</el-button>
          <el-button type="primary" plain size="mini" @click="printOrder()" v-entity="263" v-show="currentTab.queryOrderOutStateTab == '1' || currentTab.queryOrderOutStateTab == '2'">打印面单</el-button>
          <el-button type="primary" plain size="mini" @click="showCancelOrder()" v-entity="264"  v-show="currentTab.queryOrderOutStateTab == '1' || currentTab.queryOrderOutStateTab == '2'">取消运单</el-button>
          <el-button type="primary" plain size="mini" @click="printerViewHtml()" v-entity="265" v-show="currentTab.queryOrderOutStateTab == '1' || currentTab.queryOrderOutStateTab == '2'" >设置打印机</el-button>
          <!-- <el-button type="primary" plain size="mini" @click="" v-show="currentTab.queryOrderOutStateTab == '5'" >我要评价</el-button> -->
          <el-button type="primary" plain size="mini" @click="recoveryOrder()" v-entity="266" v-show="currentTab.queryOrderOutStateTab == '6'" >恢复运单</el-button>
       
          <el-button type="primary" plain size="mini" @click="exportOrders()" v-entity="267" >导出</el-button>
        </div>
      </div>
      <tableCommon  ref="ordersManager" :head="head" @dblclickItem="dblclickItem" :tableName="ordersTable"></tableCommon>
    </div>
   

    <printSet :isShowSet="showPrinterView" businessTypes="1,4" @showChange="showChange" @sureCallback="sureCallback"></printSet>
    
    <trackScheduleDialog ref="trackScheduleDialog"></trackScheduleDialog>
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
    
   <cmAbnormal  @openTab="openTab" ref="ordersException"  v-show="!currentTab.showOrderTab" ></cmAbnormal> 
  </div>
</template>

<script>
import orders from './orders.js'
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