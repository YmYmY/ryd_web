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
        <!-- <div class="item">
          <label class="label">目的区域</label>
          <div class="input-text">
            <el-select v-model="query.destRegionId" filterable placeholder="请选择">
              <el-option v-for="item in regionAllList" :key="item.regionId" :label="item.regionName" :value="item.regionId"></el-option>
            </el-select>
          </div>
        </div> -->
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
              <el-option v-for="item in selectOrderList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
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

        
     
        <!-- <div class="item">
          <label class="label">客户优先</label>
          <div class="input-text">
            <el-select v-model="query.supplierTenantIdByCustomer" filterable placeholder="选择客户优先供应商">
              <el-option v-for="item in supplierTenantList" :key="item.tenantId" :label="item.tenantFullName" :value="item.tenantId"></el-option>
            </el-select>
          </div>
        </div>
          <div class="item">
          <label class="label">时效优先</label>
          <div class="input-text">
            <el-select v-model="query.supplierTenantIdByTime" filterable placeholder="选择时效优先供应商">
              <el-option v-for="item in supplierTenantList" :key="item.tenantId" :label="item.tenantFullName" :value="item.tenantId"></el-option>
            </el-select>
          </div>
        </div>
          <div class="item">
          <label class="label">成本优先</label>
          <div class="input-text">
            <el-select v-model="query.supplierTenantIdByCost" filterable placeholder="选择成本优先供应商">
              <el-option v-for="item in supplierTenantList" :key="item.tenantId" :label="item.tenantFullName" :value="item.tenantId"></el-option>
            </el-select>
          </div>
        </div> -->
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
            <el-button type="primary" plain size="mini" @click="doNext()">中转</el-button>
            <el-button type="primary" plain size="mini" @click="doDispatch()">一键中转</el-button>
            <el-button type="primary" plain size="mini" @click="exportOrders()">导出</el-button>
          </div>
          <!-- <dbTable tableName="transferAddTable" ref="table" :head="head"  :rightHead="headAddRight" onlyId="orderId" @doNext="doNext"  showDispatchBtn="true" @doDispatch="doDispatch"></dbTable> -->
        </div>
        <tableCommon ref="table" :head="head" @selectAll='selectAll'  @dblclickItem="dblclickItem"  @clickItem="clickItem"  tableName="transferAddTable"></tableCommon>
      </div>
    </div>
    <transferAddDetail :parentTableData="tableRightData" :headList="headAddList" v-if="!showTablePage" @goback="goback" @closeTab="closeTab"></transferAddDetail>
   <!--- 供应商  开始--->
   <el-dialog :title="supplierTenantTitle" :visible.sync="showSelectSupplierView" center width="500px">
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
        <!-- <ul class="content clearfix">
          <li class="item item100">
            <label class="label-term">备注</label>
            <div class="input-text">
                 <el-input v-model="outgoing.remarks" type="textarea" maxlength="256"  :autosize="{ minRows: 2, maxRows: 4}"></el-input>
            </div>
          </li>
        </ul> -->
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button  @click="showSelectSupplierView=false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate()" >确 定</el-button>
      </div>
    </el-dialog>
     <!--- 供应商   结束--->
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