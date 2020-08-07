<template>
  <div id="orders" class="orderPage">
    <innerTab  :tabs="tabs" @selectCallback="selectCallback" ></innerTab>
    <div class="search-list clearfix" v-show="currentTab.showOrderTab" >
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
       <div class="item" v-show="currentTab.orderState == '-2'">
          <label class="label">入库状态</label>
          <div class="input-text">
            <el-select v-model="query.callSts" placeholder="入库状态"  @change="forceUpdate()">
              <el-option v-for="item in orderCallStsList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </div>
        </div>
        <div class="item" v-show="currentTab.orderState == '-3'">
          <label class="label">付款状态</label>
          <div class="input-text">
            <el-select v-model="query.paySts" placeholder="付款状态"  @change="forceUpdate()">
              <el-option v-for="item in orderPayStsList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
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
       <div class="item"  v-show="currentTab.orderState != '2' && currentTab.orderState != '88'">
          <label class="label">中转单号</label>
          <div class="input-text">
             <el-input v-model="query.outgoingTrackingNum"  placeholder="完整中转单号" type="text"></el-input>
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
       <div class="item" v-show="currentTab.orderState =='-1' || currentTab.orderState =='-3' ">
          <label class="label">运单状态</label>
          <div class="input-text">
            <el-select v-model="query.orderOutState" placeholder="运单状态" @change="forceUpdate()">
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
          <label class="label">客服部门</label>
          <div class="input-text">
            <el-select v-model="query.oragnizeId" filterable placeholder="客服部门">
              <el-option v-for="item in oragnizeList" :key="item.oragnizeId" :label="item.oragnizeName" :value="item.oragnizeId"></el-option>
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
        <div class="item"  v-show="currentTab.orderState != '2' && currentTab.orderState != '88'">
          <label class="label">供应商</label>
          <div class="input-text">
            <el-select v-model="query.supplierTenantId" filterable placeholder="供应商">
              <el-option v-for="item in supplierTenantList" :key="item.tenantId" :label="item.tenantFullName" :value="item.tenantId"></el-option>
            </el-select>
          </div>
        </div>
         <div class="item"  v-show="currentTab.orderState == '-1' ">
          <label class="label">采购单号</label>
          <div class="input-text">
            <el-select v-model="query.purchaseNumFlag" filterable placeholder="采购单号重复选择">
              <el-option v-for="item in purchaseNumList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </div>
        </div>
         <div class="item  have-label item2row">
          <label class="label">            
            <el-select v-model="query.queryOrderConsignorType" @change="forceUpdate()">
              <el-option v-for="item in selectOrderConsignorList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </label>
          <div class="input-text">
            <el-input v-model="query.queryConsignorAlias"  placeholder="输入默认对应下拉值" type="text"></el-input>
          </div>
        </div>
       <div class="item have-label item2row">
          <label class="label">            
            <el-select v-model="query.queryOrderConsigneeType" @change="forceUpdate()">
              <el-option v-for="item in selectOrderConsigneeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </label>
          <div class="input-text">
            <el-input v-model="query.queryConsigneeAlias"  placeholder="输入默认对应下拉值" type="text"></el-input>
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
          <el-tooltip effect="light" content="双击查看详情" placement="right">
            <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
          </el-tooltip>
        </h3>
        <div class="table-title-btn">
          <el-button type="primary" plain size="mini" @click="dialogScheduleShowView()" v-show="currentTab.orderState =='-1' "  v-entity="565">轨迹查询</el-button>
          <el-button type="primary" plain size="mini" @click="addOrder()" v-show="currentTab.orderState =='-1' "  v-entity="192">运单录入</el-button>
          <el-button type="primary" plain size="mini" @click="modifyOrder()" v-show="currentTab.orderState =='-1'  || currentTab.orderState =='2'  || currentTab.orderState =='3'" v-entity="193" >运单修改</el-button>
          <el-button type="primary" plain size="mini" @click="printOrders()" v-show="currentTab.orderState =='-1' " v-entity="195">批量打印</el-button>
          <el-button type="primary" plain size="mini" @click="printOrder()" v-show="currentTab.orderState =='-1' " v-entity="196">打印面单</el-button>
          <el-button type="primary" plain size="mini" @click="showCancelOrder()" v-show="currentTab.orderState =='-1' || currentTab.orderState =='2' || currentTab.orderState =='3' || currentTab.orderState =='4' " v-entity="194" >取消运单</el-button>
          <el-button type="primary" plain size="mini" @click="printerViewHtml()" v-show="currentTab.orderState =='-1' " v-entity="197" >设置打印机</el-button>
          <el-button type="primary" v-show="currentTab.orderState == '2'" plain size="mini" @click="saveAddOrModifyTransferView(1)" v-entity="199">分配供应商</el-button>
          <!-- <el-button type="primary" v-show="currentTab.orderState == '3' || currentTab.orderState == '4'" plain size="mini" @click="saveAddOrModifyTransferView(2)">修改供应商</el-button> -->
          <el-button type="primary" v-show="currentTab.orderState == '4'" plain size="mini" @click="savePackageExceptionsView()" v-entity="202">揽件异常</el-button>
          <el-button type="primary" v-show="currentTab.orderState == '3' || currentTab.orderState == '4'"  plain size="mini" @click="cancelTransfer()" v-entity="200">取消供应商</el-button>
          <el-button type="primary" plain size="mini" @click="recoveryOrder()" v-show="currentTab.orderState =='88' " v-entity="206">恢复运单</el-button>
          <el-button type="primary" v-show="currentTab.orderState == '3'" plain size="mini" @click="acceptOrder()" v-entity="201">操作接单</el-button>
          <!-- <el-button type="primary" v-show="currentTab.orderState == '5' || currentTab.orderState == '6' || currentTab.orderState == '-2' || currentTab.orderState == '-3'"  plain size="mini" @click="addException()">异常登记</el-button> -->
          <el-button type="primary" v-show="currentTab.orderState == '5'" plain size="mini" @click="trackingOrderView()" v-entity="203">跟踪</el-button>
          <el-button type="primary" v-show="currentTab.orderState == '5'" plain size="mini" @click="batchSignOrderView()" v-entity="205">批量签收</el-button>
          <el-button type="primary" v-show="currentTab.orderState == '5'" plain size="mini" @click="signOrderView()" v-entity="204">签收录入</el-button>
            <el-button type="primary" v-show="currentTab.orderState == '-3'" plain size="mini" @click="showMakeUp()" v-entity="372">信息补录</el-button>
          <el-button type="primary" plain size="mini" @click="exportOrders()" v-entity="198" >导出</el-button>
        </div>
      </div>
      <tableCommon ref="ordersManager"  :head="head" @dblclickItem="dblclickItem" :tableName="ordersTable"></tableCommon>
    </div>
    <cmAbnormal   ref="ordersException"   @openTab="openTab"  v-show="!currentTab.showOrderTab"  ></cmAbnormal> 

    <printSet :isShowSet="showPrinterView" businessTypes="1" @showChange="showChange" @sureCallback="sureCallback"></printSet>
    
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
    <!--- 供应商 新增修改 开始--->
    <el-dialog :title="cancelTransferTitle" :visible.sync="showSaveAddOrModifyTransferView" center width="350px">
      <div class="common-info" style="border:none;">
        <ul class="content clearfix">
          <li class="item item100">
            <label class="label-term">供应商</label>
            <div class="input-text">
              <el-select v-model="outgoing.supplierTenantId" filterable  placeholder="请选择">
                <el-option v-for="item in supplierTenantList" :key="item.tenantId" :label="item.tenantFullName" :value="item.tenantId"></el-option>
              </el-select>
            </div>
          </li>
        </ul>
        <ul class="content clearfix">
          <li class="item item100">
            <label class="label-term">备注</label>
            <div class="input-text">
              <el-input v-model="outgoing.remark"  maxlength="255" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
            </div>
          </li>
        </ul>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showSaveAddOrModifyTransferView = false;outgoing={}">取 消</el-button>
        <el-button type="primary" @click="saveAddOrModifyTransfer()">确 定</el-button>
      </div>
    </el-dialog>
     <!--- 供应商 新增修改 结束--->

     <!--- 揽件异常登记 开始--->
    <el-dialog title="揽件异常登记" :visible.sync="showSavePackageExceptionsView" center width="450px">
      <div class="common-info" style="border:none;">
        <ul class="content clearfix">
          <li class="item item100">
            <!-- <label class="label-term">异常原因</label>
            <div class="input-text"> -->
                <el-radio-group v-model="exception.exceptionType" style="line-height:24px;"> 
                    <el-radio :label="1">客户原因</el-radio>
                    <el-radio :label="2">供应商原因</el-radio>
                    <el-radio :label="3" >平台运营问题</el-radio>
                </el-radio-group> 
            <!-- </div> -->
          </li>
        </ul>
        <ul class="content clearfix">
          <li class="item item100">
            <label class="label-term"><em>*</em>备注</label>
            <div class="input-text">
              <el-input v-model="exception.exceptionRemark" maxlength="255" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
            </div>
          </li>
        </ul>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showSavePackageExceptionsView = false;exception={}">取 消</el-button>
        <el-button type="primary" @click="savePackageExceptions()">确 定</el-button>
      </div>
    </el-dialog>
     <!--- 揽件异常登记 结束--->
   <!--- 签收录入 开始--->
    <el-dialog title="签收录入" :visible.sync="showSignOrderView" center width="550px">
      <div class="common-info" style="border:none;">
      <ul class="content clearfix">
          <li class="item item100">
            <label class="label-term">签收时间</label>
            <div class="input-text">
               <el-date-picker v-model="signOrder.signDate" value-format="yyyy-MM-dd HH:mm" type="datetime" placeholder="选择日期"></el-date-picker>
            </div>
          </li>
        </ul>
        <ul class="content clearfix">
          <li class="item item100">
            <label class="label-term">签收类型</label>
            <div class="input-text">
             <el-select v-model="signOrder.signExceptionType" placeholder="请选择">
                  <el-option v-for="item in orderSignExceptionList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
             </el-select>
            </div>
          </li>
        </ul>
        <ul class="content clearfix">
          <li class="item item100">
            <label class="label-term">签收人</label>
            <div class="input-text">
                 <el-input v-model="signOrder.signName"  maxlength="20" type="text"></el-input>
            </div>
          </li>
        </ul>

        <ul class="content clearfix">
          <li class="item item100">
            <label class="label-term">备注</label>
            <div class="input-text">
              <el-input v-model="signOrder.remarks" maxlength="255"  type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
            </div>
          </li>
        </ul>
         <ul class="content clearfix">
        <li class="item img-upload">
          <label class="label-term"><em>*</em>签收图片</label>
          <div class="input-text">
            <myFileModel v-for="(data,index) in imgList" :key="index" :ref="data.name" @successCallback="successCallback"></myFileModel>
          </div>
        </li>
      </ul>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showSignOrderView = false;signOrder={}">取 消</el-button>
        <el-button type="primary" @click="batchSignOrder(1)">确 定</el-button>
      </div>
    </el-dialog>
      <!--- 签收录入 结束--->
      <el-dialog title="信息补录" :visible.sync="makeUpShow" width="600px">
        <div class="common-info" style="border:none;">
          <makeUp v-if="makeUpShow" :orderId="orderId" :queryType="queryType" @closeCallback="closeCallback" @doQueryFcIncomeExpenses="doQuery"></makeUp>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import orders from './orders.js'
export default orders
</script>
<style lang="scss">
.orderPage{
  // .search-list6{
  //   .search-form{
  //     .item{
  //       width:16.666%;
  //       &.no-label{
  //         .label{
  //           display: none;
  //         }
  //         .input-text{
  //           width: 100%;
  //         }
  //       }
  //     }
  //     .item2row{
  //       width: 33.332%;
  //     }
  //   }
  // }
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