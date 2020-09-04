<template>
  <div id="transferAddDetail" class="transferAddDetailPage">
    <innerTab :tabs="tabs" @selectCallback="selectCallback"></innerTab>
    <div class="common-info" v-show="currentTab.selectType == 1">
      <h3 class="common-title mb_20"><span class="title-name">配载信息</span></h3>
      <ul class="content clearfix">
        <li class="item">
          <label class="label-term"><em>*</em>批次号</label>
          <div class="input-text">
            <el-input v-model="order.batchNumAlias" v-bind:disabled="true"></el-input>
          </div>
        </li>
        <li class="item">
          <label class="label-term"><em>*</em>中转类型</label>
          <div class="input-text">
             <el-select v-model="order.transitType" placeholder="请选择" @change="transitTypeChange()">
               <el-option v-for="item in selectTransitTypeList"
                :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </div>
        </li>
        <li class="item" v-show="order.transitType == 2">
          <label class="label-term">目的区域</label>
          <div class="input-text">
            <el-select v-model="order.destRegionName" filterable placeholder="请选择" @change="selectDestRegion" >
              <el-option v-for="item in regionAllList" :key="item.regionId" :label="item.regionName" :value="item"></el-option>
            </el-select>
          </div>
        </li>
        
      </ul>
      <h3 class="common-title mb_20"><span class="title-name">供应商信息</span></h3>
      <ul class="content clearfix">
        <li class="item">
          <label class="label-term"><em>*</em>供应商</label>
          <div class="input-text">
            <el-select v-model="order.supplierTenantName" @change="selectSupplierTenant" filterable placeholder="请选择">
              <el-option v-for="item in supplierTenantList" :key="item.tenantId" :label="item.tenantFullName" :value="item"></el-option>
            </el-select>
          </div>
        </li>
        <li class="item">
          <label class="label-term"><em>*</em>中转件数</label>
          <div class="input-text">
            <el-input v-model="order.packageNumber" maxlength="5" v-mynumval @blur="preSupplierPriceUtils()"></el-input>
          </div>
        </li>
        <li class="item">
          <label class="label-term">中转重量</label>
          <div class="input-text">
            <el-input v-model="order.packageWeight" maxlength="8" v-mydoubleval @blur="preSupplierPriceUtils()" ></el-input>
            <span class="unit">公斤</span>
          </div>
        </li>
        <li class="item">
          <label class="label-term">中转体积</label>
          <div class="input-text">
            <el-input v-model="order.packageVolume" maxlength="8" v-mydoubleval @blur="preSupplierPriceUtils()"></el-input>
            <span class="unit">方</span>
          </div>
        </li>
        <li class="item">
          <label class="label-term">接货网点</label>
           <div class="input-text">
              <el-select v-model="order.sourceOrgId"  placeholder="请选择" @click.native="queryOrg()" @change="selectSourceOrg">
                 <el-option v-for="item in orgList" :key="item.orgId" :label="item.orgFullName" :value="item.orgId"></el-option>
              </el-select>
           </div>
        </li>
        <li class="item">
          <label class="label-term">本地交货方式</label>
          <div class="input-text">
              <el-select v-model="order.sourceDeliverWay" placeholder="请选择">
               <el-option v-for="item in selectTransitBeginDeliveryTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </div>
        </li>
        <li class="item">
          <label class="label-term">目的网点</label>
          <div class="input-text">
            <el-select v-model="order.destOrgId"  placeholder="请选择"   @click.native="queryOrg()" @change="selectDestOrg">
              <el-option v-for="item in orgList" :key="item.orgId" :label="item.orgFullName" :value="item.orgId"></el-option>
            </el-select>
          </div>
        </li>
         
        <li class="item">
          <label class="label-term">末端交货方式</label>
          <div class="input-text">
             <el-select v-model="order.destDeliverWay" placeholder="请选择">
               <el-option v-for="item in selectTransitEndDeliveryTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </div>
        </li>
      </ul>

       
      <h3 v-show="order.combinedSts == 2" class="common-title mb_20"><span class="title-name">中转费用</span></h3>

      <ul class="content clearfix">
        <li class="item">
          <label class="label-term">中转成本合计</label>
          <div class="input-text">
            <el-input v-model="order.fee.totalFeeDouble" v-bind:disabled="true" @change="forceUpdate()"></el-input>
          </div>
        </li>
        <li class="item">
          <label class="label-term">中转单号</label>
          <div class="input-text">
            <el-input v-model="order.outgoingTrackingNum" @blur="selectOutgoingTrackingNum()" maxlength="30"></el-input>
          </div>
        </li>
        <li class="item">
          <label class="label-term">结算方式</label>
          <div class="input-text">
             <el-select v-model="order.fee.paymentType" placeholder="请选择" @change="forceUpdate()">
               <el-option v-for="item in selectTransitPaymentTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </div>
        </li>
        <li class="item">
          <label class="label-term">运费分摊</label>
          <div class="input-text">
             <el-select v-model="order.fee.divideType" placeholder="请选择" @change="changeFee()">
               <el-option v-for="item in selectDepartDivideTypeTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </div>
        </li>
        <li class="item">
          <label class="label-term">中转运费</label>
          <div class="input-text">
            <el-input v-model="order.fee.freightDouble" @blur="changeFee()"  maxlength="8" v-mydoubleval></el-input>
          </div>
        </li>
        <li class="item">
          <label class="label-term">提货费</label>
          <div class="input-text">
            <el-input v-model="order.fee.pickingCostsDouble"  @blur="changeFee()"  maxlength="8" v-mydoubleval></el-input>
          </div>
        </li>
        <li class="item">
          <label class="label-term">装卸费</label>
          <div class="input-text">
            <el-input  v-model="order.fee.handingCostsDouble" maxlength="8"  @blur="changeFee()"  v-mydoubleval></el-input>
          </div>
        </li>
        <li class="item">
          <label class="label-term">打包费</label>
          <div class="input-text">
            <el-input v-model="order.fee.packingCostsDouble" maxlength="8"  @blur="changeFee()"  v-mydoubleval></el-input>
          </div>
        </li>
        <li class="item">
          <label class="label-term">送货费</label>
          <div class="input-text">
            <el-input v-model="order.fee.deliveryCostsDouble" maxlength="8"  @blur="changeFee()" v-mydoubleval></el-input>
          </div>
        </li>
         <li class="item">
          <label class="label-term">申明价值</label>
          <div class="input-text">
            <el-input v-model="order.fee.goodsPriceDouble" maxlength="8"   v-mydoubleval></el-input>
          </div>
        </li>
         <li class="item">
          <label class="label-term">保险费</label>
          <div class="input-text">
            <el-input v-model="order.fee.insureFeeDouble" maxlength="8" @blur="changeFee()"    v-mydoubleval></el-input>
          </div>
        </li>
        <li class="item">
          <label class="label-term">
            <span v-show="!showOtherFeeEdit">
              <span>{{order.fee.otherFeeName}}</span>
              <i class="el-icon-edit" @click="editOtherFee"></i>
            </span>
            <el-input v-model="order.fee.otherFeeName" maxlength="5" type="text" v-show="showOtherFeeEdit" @keyup.enter.native="sureEditOtherFee"></el-input>
          </label>
          <div class="input-text">
            <el-input v-model="order.fee.otherFeeDouble"  @blur="changeFee()"   maxlength="8" v-mydoubleval></el-input>
          </div>
        </li>
        <li class="item item100">
          <label class="label-term">备注</label>
          <div class="input-text">
            <el-input type="textarea" v-model="order.remarks" :autosize="{ minRows: 2, maxRows: 4}" maxlength="255"></el-input>
          </div>
        </li>
      </ul>
      <div class="delorder">
        <el-button type="danger" size="mini" @click="delTabOrders()" v-show="!outView" >移除订单</el-button>
      </div>
    </div>

     <div class="common-info" v-show="currentTab.selectType == 2">
      <h3 class="common-title mb_20"><span class="title-name">配载信息</span></h3>
      <ul class="content clearfix">
        <li class="item">
          <label class="label-term"><em>*</em>批次号</label>
          <div class="input-text">
            <el-input v-model="order.batchNumAlias" v-bind:disabled="true"></el-input>
          </div>
        </li>
        <li class="item">
          <label class="label-term"><em>*</em>中转类型</label>
          <div class="input-text">
             <el-select v-model="order.transitType" placeholder="请选择" @change="transitTypeChange()">
               <el-option v-for="item in selectTransitTypeList"
                :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </div>
        </li>
        <li class="item" v-show="order.transitType == 2">
          <label class="label-term">目的区域</label>
          <div class="input-text">
            <el-select v-model="order.destRegionName" filterable placeholder="请选择" @change="selectDestRegion" >
              <el-option v-for="item in regionAllList" :key="item.regionId" :label="item.regionName" :value="item"></el-option>
            </el-select>
          </div>
        </li>
        
      </ul>
      <h3 class="common-title mb_20"><span class="title-name">供应商信息</span></h3>
       <ul class="content clearfix">
        <li class="item">
          <label class="label-term"><em>*</em>供应商</label>
          <div class="input-text">
            <el-select v-model="order.supplierTenantName" @change="selectSupplierTenant" filterable placeholder="请选择">
              <el-option v-for="item in supplierTenantList" :key="item.tenantId" :label="item.tenantFullName" :value="item"></el-option>
            </el-select>
          </div>
        </li>
         <li class="item">
          <label class="label-term">联系信息</label>
          <div class="input-text">
            <el-input v-model="order.supplierInfo" maxlength="30" v-bind:disabled="true"></el-input>
          </div>
        </li>
        <li class="item">
          <label class="label-term">配载方式</label>
          <div class="input-text">
             <el-select v-model="order.combinedSts" placeholder="请选择" @change="selectCombinedSts()">
               <el-option v-for="item in selectCombinedStsList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </div>
        </li>
         <li class="item">
          <label class="label-term">结算方式</label>
          <div class="input-text">
             <el-select v-model="order.fee.paymentType" placeholder="请选择">
               <el-option v-for="item in selectTransitPaymentTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </div>
        </li>
        <li class="item item100" v-show="order.combinedSts == 1">
          <label class="label-term">备注</label>
          <div class="input-text">
            <el-input type="textarea" v-model="order.remarks" :autosize="{ minRows: 2, maxRows: 4}" maxlength="255"></el-input>
          </div>
        </li>
          <li class="item" v-show="order.combinedSts == 2">
          <label class="label-term"><em>*</em>中转件数</label>
          <div class="input-text">
            <el-input v-model="order.packageNumber" maxlength="5" v-mynumval @blur="preSupplierPriceUtils()"></el-input>
          </div>
        </li>
        <li class="item" v-show="order.combinedSts == 2">
          <label class="label-term">中转重量</label>
          <div class="input-text">
            <el-input v-model="order.packageWeight" maxlength="8" v-mydoubleval @blur="preSupplierPriceUtils()" ></el-input>
            <span class="unit">公斤</span>
          </div>
        </li>
        <li class="item" v-show="order.combinedSts == 2">
          <label class="label-term">中转体积</label>
          <div class="input-text">
            <el-input v-model="order.packageVolume" maxlength="8" v-mydoubleval @blur="preSupplierPriceUtils()"></el-input>
            <span class="unit">方</span>
          </div>
        </li>
      </ul>

      <h3 v-show="order.combinedSts == 2" class="common-title mb_20"><span class="title-name">中转费用</span></h3>
      <ul class="content clearfix"  v-show="order.combinedSts == 2"  >
        <li class="item">
          <label class="label-term">中转成本合计</label>
          <div class="input-text">
            <el-input v-model="order.fee.totalFeeDouble" v-bind:disabled="true" @change="forceUpdate()"></el-input>
          </div>
        </li>
        <li class="item">
          <label class="label-term">中转单号</label>
          <div class="input-text">
            <el-input v-model="order.outgoingTrackingNum" @blur="selectOutgoingTrackingNum()" maxlength="30"></el-input>
          </div>
        </li>
        <li class="item">
          <label class="label-term">结算方式</label>
          <div class="input-text">
             <el-select v-model="order.fee.paymentType" placeholder="请选择" @change="forceUpdate()">
               <el-option v-for="item in selectTransitPaymentTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </div>
        </li>
        <li class="item">
          <label class="label-term">运费分摊</label>
          <div class="input-text">
             <el-select v-model="order.fee.divideType" placeholder="请选择" @change="changeFee()">
               <el-option v-for="item in selectDepartDivideTypeTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </div>
        </li>
        <li class="item">
          <label class="label-term">中转运费</label>
          <div class="input-text">
            <el-input v-model="order.fee.freightDouble" @blur="changeFee()"  maxlength="8" v-mydoubleval></el-input>
          </div>
        </li>
        <li class="item">
          <label class="label-term">提货费</label>
          <div class="input-text">
            <el-input v-model="order.fee.pickingCostsDouble"  @blur="changeFee()"  maxlength="8" v-mydoubleval></el-input>
          </div>
        </li>
        <li class="item">
          <label class="label-term">装卸费</label>
          <div class="input-text">
            <el-input  v-model="order.fee.handingCostsDouble" maxlength="8"  @blur="changeFee()"  v-mydoubleval></el-input>
          </div>
        </li>
        <li class="item">
          <label class="label-term">打包费</label>
          <div class="input-text">
            <el-input v-model="order.fee.packingCostsDouble" maxlength="8"  @blur="changeFee()"  v-mydoubleval></el-input>
          </div>
        </li>
        <li class="item">
          <label class="label-term">送货费</label>
          <div class="input-text">
            <el-input v-model="order.fee.deliveryCostsDouble" maxlength="8"  @blur="changeFee()" v-mydoubleval></el-input>
          </div>
        </li>
         <li class="item">
          <label class="label-term">申明价值</label>
          <div class="input-text">
            <el-input v-model="order.fee.goodsPriceDouble" maxlength="8"   v-mydoubleval></el-input>
          </div>
        </li>
         <li class="item">
          <label class="label-term">保险费</label>
          <div class="input-text">
            <el-input v-model="order.fee.insureFeeDouble" maxlength="8" @blur="changeFee()"    v-mydoubleval></el-input>
          </div>
        </li>
        <li class="item">
          <label class="label-term">
            <span v-show="!showOtherFeeEdit">
              <span>{{order.fee.otherFeeName}}</span>
              <i class="el-icon-edit" @click="editOtherFee"></i>
            </span>
            <el-input v-model="order.fee.otherFeeName" maxlength="5" type="text" v-show="showOtherFeeEdit" @keyup.enter.native="sureEditOtherFee"></el-input>
          </label>
          <div class="input-text">
            <el-input v-model="order.fee.otherFeeDouble"  @blur="changeFee()"   maxlength="8" v-mydoubleval></el-input>
          </div>
        </li>
        <li class="item item100">
          <label class="label-term">备注</label>
          <div class="input-text">
            <el-input type="textarea" v-model="order.remarks" :autosize="{ minRows: 2, maxRows: 4}" maxlength="255"></el-input>
          </div>
        </li>
      </ul>
      <div class="delorder">
        <el-button type="danger" size="mini" @click="delTabOrders()" v-show="!outView" >移除订单</el-button>
      </div>
    </div>
     <div class="common-info" v-show="currentTab.selectType == 3">
      <h3 class="common-title mb_20"><span class="title-name">配载信息</span></h3>
      <ul class="content clearfix">
        <li class="item">
          <label class="label-term"><em>*</em>批次号</label>
          <div class="input-text">
            <el-input v-model="depart.batchNumAlias" v-bind:disabled="true"></el-input>
          </div>
        </li>
        <li class="item">
          <label class="label-term"><em>*</em>派车类型</label>
          <div class="input-text">
             <el-select v-model="depart.departBusiType" placeholder="请选择">
               <el-option v-for="item in selectDepartBusiTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </div>
        </li>
      </ul>
      <h3 class="common-title mb_20"><span class="title-name">车辆信息</span></h3>

       <ul class="content clearfix">
        <li class="item">
          <label class="label-term"><em>*</em>车牌号码</label>
          <div class="input-text">
            <el-select v-model="depart.plateNumber" @change="selectPlateNumber" @input.native ="queryInputPlateNumber"   filterable placeholder="请选择">
              <el-option v-for="item in vehicleList" :key="item.vehicleId" :label="item.vehicleCode" :value="item"></el-option>
            </el-select>
          </div>
        </li>
         <li class="item">
          <label class="label-term"><em>*</em>司机姓名</label>
          <div class="input-text">
            <el-input v-model="depart.driverName" maxlength="50"  placeholder="司机姓名" ></el-input>
          </div>
        </li>
         <li class="item">
          <label class="label-term"><em>*</em>司机手机</label>
          <div class="input-text">
            <el-input v-model="depart.driverBill" maxlength="50" placeholder="司机手机" ></el-input>
          </div>
        </li>
         <li class="item">
          <label class="label-term"><em>*</em>车辆属性</label>
          <div class="input-text">
             <el-select v-model="depart.vehicleAttributes" placeholder="请选择">
               <el-option v-for="item in selectVehicleAttributesList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </div>
        </li>
      </ul>

      <h3  class="common-title mb_20"><span class="title-name">车辆费用</span></h3>
      <ul class="content clearfix"> 
        <li class="item">
          <label class="label-term">总运费</label>
          <div class="input-text">
            <el-input v-model="depart.fee.totalFeeDouble" v-mydoubleval  @blur="selectDepartTotalFee()"></el-input>
          </div>
        </li>
         <li class="item">
          <label class="label-term">运费分摊</label>
          <div class="input-text">
             <el-select v-model="depart.fee.divideType" placeholder="请选择" @change="selectDepartTotalFee()">
               <el-option v-for="item in selectDepartDivideTypeTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
            </el-select>
          </div>
        </li>
         <li class="item">
           <label class="label-term"></label>
          <div class="input-text">
          </div>
         </li>
          <li class="item">
             <label class="label-term"></label>
              <div class="input-text">
             </div>
         </li>
        <li class="item">
          <label class="label-term">开始里程</label>
          <div class="input-text">
            <el-input v-model="depart.beginCarMileage" v-mydoubleval   placeholder="开始里程"   maxlength="10"></el-input>
          </div>
        </li>
        <li class="item">
          <label class="label-term">结束里程</label>
          <div class="input-text"> 
            <el-input v-model="depart.endCarMileage"  v-mydoubleval  placeholder="结束里程"  maxlength="10"></el-input>
          </div>
        </li>
         <li class="item">
          <label class="label-term">油表读数（始）</label>
          <div class="input-text">
            <el-input v-model="depart.beginOilMeter"  v-mydoubleval  placeholder="开始读数"  maxlength="10"></el-input>
          </div>
        </li>
         <li class="item">
          <label class="label-term">油表读数（止）</label>
          <div class="input-text">
            <el-input v-model="depart.endOilMeter" v-mydoubleval   placeholder="结束读数"   maxlength="10"></el-input>
          </div>
        </li>
        <li class="item item100">
          <label class="label-term">备注</label>
          <div class="input-text">
            <el-input type="textarea" v-model="depart.remarks" :autosize="{ minRows: 2, maxRows: 4}" maxlength="255"></el-input>
          </div>
        </li>
      </ul>
      <div class="delorder">
        <el-button type="danger" size="mini" @click="delTabOrders()" v-show="!outView" >移除订单</el-button>
      </div>
    </div>
    
    <div class="tableBox">
      <table class="tableCommon" width="100%" border="0" cellspacing="0" cellpadding="0">
          <thead>
              <tr>
                  <th width="60"></th>
                  <th :width="hd.width == undefined ? 60 : hd.width" v-for="hd in head" :key="hd.code">{{hd.name}}</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(data,index) in tableData" :key="index">
                  <td width="60"><el-checkbox v-model="data.select" @change="forceUpdate()"></el-checkbox></td>
                  <td :width="hd.width == undefined ? 60 : hd.width" v-for="hd in head" :key="hd.code">
                    <span v-if="!hd.isEdit">{{data[hd.code]}}</span>
                    <el-input v-if="hd.isEdit" v-model="data[hd.code]" @input="forceUpdate()" @change="selectInput(data,hd.code)" ></el-input>
                  </td>
              </tr>
          </tbody>
      </table>
    </div>
    <div class="page-bot-btn">
        <el-button type="info" @click="goback(2)" v-show="!outView" >上一步</el-button>
        <el-button type="primary" @click="saveOrUpdate(1)" v-if="currentTab.selectType == 1 ||  currentTab.selectType == 2"  v-show="!outView">保存</el-button>
        <el-button type="primary" @click="saveOrUpdateDepart()" v-if="currentTab.selectType == 3" v-show="!outView">保存</el-button>
        <el-button type="primary" @click="closeTab()">关闭</el-button>
        <!-- <el-button type="primary" @click="saveOrUpdate(2)" v-show="!outView && !outModify && currentTab.selectType != 2">保存并发车</el-button> -->
    </div>
  </div>
</template>

<script>
import transferAddDetail from './transferAddDetail.js'
export default transferAddDetail
</script>
<style lang="scss">
.transferAddDetailPage{
  .el-icon-edit{
    margin-left: 5px;
    cursor: pointer;
    color:$tip-color;
  }
  .common-info{
    padding-bottom: 0;
  }
  .delorder{
    text-align: right;
    padding:20px 0 12px;
  }
  .tableBox{
    max-height: 300px;
    overflow: auto;
  }
  .tableCommon{
    .el-input__inner{
      height: 24px;
      width: 80%;
      border-radius: 2px;
    }
  }
}
</style>