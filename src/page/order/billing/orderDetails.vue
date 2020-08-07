<template>
    <div id="orderDetails" class="billing" @click="hideDialog">
        <img src="@/static/image/$tenantId$/wjs.png" class="orderState" v-show="order.fee.checkFeeFlag == 1" alt="未结算"> 
        <img src="@/static/image/$tenantId$/yjs.png" class="orderState" v-show="order.fee.checkFeeFlag == 3" alt="已结算"> 
        <img src="@/static/image/$tenantId$/bfjs.png" class="orderState" v-show="order.fee.checkFeeFlag == 2" alt="部分结算"> 
        <img src="@/static/image/$tenantId$/ysz.png" class="orderState transport" v-show="order.orderOutState == 5" alt="运输中"> 
        <el-button type="danger" class="floatBtn" @click.native="toException(order)">异常登记</el-button>
        <div class="main-info">
            <div class="table_top clearfix">
                <div class="item">
                    <label class="label_term">运单号</label>
                    <div class="input-text">
                        <el-input  v-bind:disabled="true" v-model="order.trackingNum"></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label_term">实际托运时间</label>
                    <div class="input-text">
                        <el-date-picker  v-bind:disabled="true" v-model="order.billingDate"  value-format="yyyy-MM-dd HH:mm:ss"  type="datetime" placeholder="选择日期"></el-date-picker>
                    </div>
                </div>
                <div class="item">
                    <label class="label_term">期待到货时间</label>
                    <div class="input-text">
                        <el-date-picker v-bind:disabled="true" v-model="order.extorder.waitArriveDate" value-format="yyyy-MM-dd HH:mm:ss"  type="datetime" placeholder="选择日期"></el-date-picker>
                    </div>

                </div>
                <div class="item">
                    <label class="label_term">所属区域</label>
                    <div class="input-text">
                        <el-input  v-bind:disabled="true" v-model="order.regionName"></el-input>
                    </div>
                </div>
            </div>
            <div class="inner_info">
                <div class="inner_table clearfix">
                    <div class="item">
                        <label class="label_term"><em>*</em>下单客户</label>
                        <div class="input-text">
                            <el-select  v-bind:disabled="true" v-model="order.customerTenantName" filterable  placeholder="请选择下单客户"
                                        @change="selectCustomerTenant" @click.native="queryCustomerTenantList()">
                                <el-option  v-bind:disabled="true" v-for="item in customerTenantList" :key="item.tenantId" :label="item.tenantFullName" :value="item"></el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="item">
                        <label class="label_term">联系人</label>
                        <div class="input-text">
                            <el-input v-model="order.customerTenantLinkman"  v-bind:disabled="true"></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <label class="label_term">联系电话</label>
                        <div class="input-text">
                            <el-input v-model="order.customerTenantMobile"  v-bind:disabled="true" ></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <label class="label_term"><em>*</em>订单类型</label>
                        <div class="input-text">
                            <el-select v-bind:disabled="true" v-model="order.orderType" filterable placeholder="请选择" >
                                <el-option  v-bind:disabled="true" v-for="item in orderTypeList" :key="item.codeValue"
                                           :label="item.codeName" :value="item.codeValue"></el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                <div class="inner_table2 clearfix">
                    <div class="consigner_table">
                        <div class="item">
                            <label class="label_term"><em>*</em>发件店仓</label>
                            <div class="input-text input-icon" >
                                <el-select  v-bind:disabled="true" v-model="order.consignorName" filterable placeholder="请选择发货店仓" @change="selectConsignor"  @blur="selectConsignorBlurName"
                                           @click.native="queryConsList(1)">
                                    <el-option v-bind:disabled="true" v-for="item in customerList" :key="item.id" :label="item.fullName" :value="item"></el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="item">
                            <label class="label_term"><em>*</em>发货人</label>
                            <div class="input-text">
                                <el-input v-bind:disabled="true" v-model="order.consignorLinkmanName" maxlength="20"></el-input>
                            </div>
                        </div>
                        <div class="item">
                            <label class="label_term">发货手机</label>
                            <div class="input-text">
                                <el-input v-bind:disabled="true" v-model="order.consignorBill" placeholder="发货电话、手机必填一" maxlength="12"></el-input>
                            </div>
                        </div>
                        <div class="item">
                            <label class="label_term">发货电话</label>
                            <div class="input-text">
                                <el-input v-bind:disabled="true" v-model="order.consignorTelephone" placeholder="发货电话、手机必填一" maxlength="12"></el-input>
                            </div>
                        </div>
                        <div class="item item100 area_site">
                            <label class="label_term"><em>*</em>发货地址</label>
                            <div class="input-text fl">
                                <mycity class="city fl"  v-bind:disabled="true" selectType="3" ref="sourceCityAddr" placeholder="选择发货省市区"></mycity>
                                <div class="detail fl">
                                    <el-input v-bind:disabled="true" placeholder="输入详细地址" v-model="order.sourceAddress" maxlength="50"></el-input>
                                </div>
                            </div>
                        </div>
                        <div class="item item100">
                            <label class="label_term">前端交货方式</label>
                            <el-radio-group v-model="order.beginDeliveryType"  v-bind:disabled="true">
                                <el-radio v-bind:disabled="true" :label="1">上门提货</el-radio>
                                <el-input v-bind:disabled="true" placeholder="" v-show="order.beginDeliveryType == 1"  style="width:180px"   v-model="order.prePickupDateTemStr" maxlength="50"></el-input>
                                <!-- <el-date-picker v-bind:disabled="true" v-show="order.beginDeliveryType == 1" style="width:200px" v-model="order.prePickupDateTem" type="datetimerange" range-separator="-" start-placeholder="开始"
                                                end-placeholder="结束" value-format="MM-dd HH" format="MM-dd HH"></el-date-picker> -->
                                <el-radio v-bind:disabled="true" :label="0">送货上门</el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                    <div class="consignee_table">
                        <div class="item">
                            <label class="label_term"><em>*</em>收货客户</label>
                            <div class="input-text">
                                <el-select  v-bind:disabled="true" v-model="order.consigneeName" filterable
                                           @change="selectConsignee" placeholder="请选择收件信息"  @click.native="queryConsList(2)" @blur="selectConsigneeBlurName" >
                                    <el-option v-for="item in customerList" :key="item.id" :label="item.fullName" :value="item"></el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="item">
                            <label class="label_term"><em>*</em>收货人</label>
                            <div class="input-text">
                                <el-input v-bind:disabled="true"  v-model="order.consigneeLinkmanName" maxlength="30"></el-input>
                            </div>
                        </div>
                        <div class="item">
                            <label class="label_term">收货手机</label>
                            <div class="input-text">
                                <el-input  v-bind:disabled="true" v-model="order.consigneeBill" placeholder="收货电话、手机必填一" maxlength="12"></el-input>
                            </div>
                        </div>
                        <div class="item">
                            <label class="label_term">收货电话</label>
                            <div class="input-text">
                                <el-input  v-bind:disabled="true" v-model="order.consigneeTelephone" placeholder="收货电话、手机必填一" maxlength="12"></el-input>
                            </div>
                        </div>
                        <div class="item item100 area_site">
                            <label class="label_term"><em>*</em>收货地址</label>
                            <div class="input-text fl">
                                <mycity class="city fl"  v-bind:disabled="true" selectType="3" ref="destCityAddr" placeholder="选择收货省市区"></mycity>
                                <div class="detail fl">
                                    <el-input placeholder="输入详细地址"  v-bind:disabled="true" v-model="order.destAddress" maxlength="50"></el-input>
                                </div>
                            </div>
                        </div>
                        <div class="item item100">
                            <label class="label_term">末端交货方式</label>
                            <el-radio-group class="fl" v-model="order.endDeliveryType"  v-bind:disabled="true">
                                <el-radio v-bind:disabled="true" :label="0">上门提货</el-radio>
                                <el-radio v-bind:disabled="true" :label="1">送货上门</el-radio>
                                <el-radio v-bind:disabled="true" :label="2">送货上楼</el-radio>
                            </el-radio-group>
                            <el-checkbox class="fl" v-model="order.payConsignorFlag" style="line-height:32px;margin:0 10px;" v-bind:disabled="true">三方结算</el-checkbox>
                           <el-select class="fl" v-show="order.payConsignorFlag" style="width:calc(100% - 461px);" v-model="order.payConsignorName" filterable
                            @change="selectPayConsignor" placeholder="请选择结算店铺"  v-bind:disabled="true">
                            <el-option v-for="item in customerList" :key="item.id" :label="item.fullName" :value="item"></el-option>
                        </el-select>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div class="goods_info clearfix">
            <div class="goods_info_title">
                <span>货品信息</span>
            </div>
            <div class="goods_info_table">
                <ipttable disabledTable="true" tableName="billingIptTable" :headList="head"  ref="goodsRows" @changeValue="changeGoodsValue" @changeHeadData="changeHeadData" ></ipttable>
            </div>
        </div>
        <div class="goods_info clearfix" v-entity="355">
            <div class="goods_info_title">
                <span style="letter-spacing: 2px;">费用信息</span>
            </div>
            <div class="goods_info_table iptTable">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr class="list_header">
                        <td v-for="hd in headFee" :key="hd.code">
                            <div v-show="!hd.isEdit">{{hd.name}}<i class="el-icon-edit" v-show="hd.edit" @click="headFeeEdit(hd)"></i></div>
                            <el-input v-model="hd.editmodel" v-show="hd.isEdit" @blur="feeEditEnd(hd)" @keyup.enter.native="feeEditEnd(hd)"></el-input>
                        </td>
                    </tr>
                    <tr>
                        <td v-for="hd in headFee" :key="hd.code">
                            <div>
                                <!-- // this.orderFee -->
                                <el-input v-model="orderFeeTem[hd.code]"  v-mydoubleval
                                          @change="changeOrderFee(hd.code)" @blur="changeOrderFee(hd.code)"
                                          @keyup="changeOrderFee(hd.code)"
                                          v-bind:disabled="true" maxlength="8"></el-input>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="main-info table_goods_info_bottom" v-entity="355">
            <div class="clearfix">
                <div class="item">
                    <label class="label_term">收入合计</label>
                    <div class="input-text">
                        <el-input v-model="order.fee.orderIncomeDouble" v-bind:disabled="true" maxlength="8"></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label_term">结算方式</label>
                    <div class="input-text">
                        <el-select v-model="order.fee.paymentType" filterable placeholder="请选择" @change="selectPaymentType()" v-bind:disabled="true">
                            <el-option v-bind:disabled="true" v-for="item in paymentTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <label class="label_term">现付</label>
                    <div class="input-text">
                        <el-input v-model="order.fee.cashPaymentDouble" @input="forceUpdate" @click="forceUpdate()"  v-bind:disabled="cashPaymentDoubleShow"  maxlength="10"></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label_term">到付</label>
                    <div class="input-text">
                        <el-input v-model="order.fee.freightCollectDouble" @input="forceUpdate" @click="forceUpdate()" v-bind:disabled="true" maxlength="10"></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label_term">月结</label>
                    <div class="input-text">
                        <el-input v-model="order.fee.monthlyPaymentDouble" @input="forceUpdate" @click="forceUpdate()"  v-bind:disabled="true" maxlength="10"></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label_term">回单付</label>
                    <div class="input-text">
                        <el-input v-bind:disabled="true" v-model="order.fee.receiptPaymentDouble" @input="forceUpdate" @click="forceUpdate()"  maxlength="10"></el-input>
                    </div>
                </div>
            </div>
        </div>
        <div class="main-info bot_info mt_20">
            <div class="inner_info">
                <div class="inner_table clearfix">
                    <div class="item">
                        <label class="label_term">打包件数</label>
                        <div class="input-text">
                            <el-input v-bind:disabled="true" v-model="order.packageNumber" maxlength="5" v-mynumval @blur="selectPackageNumber()"></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <label class="label_term">打包重量</label>
                        <div class="input-text">
                            <el-input v-bind:disabled="true" v-model="order.packageWeight" maxlength="8" v-mydoubleval></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <label class="label_term">打包体积</label>
                        <div class="input-text">
                            <el-input v-bind:disabled="true" v-model="order.packageVolume" maxlength="8" v-mydouble4val></el-input>
                        </div>
                    </div>
                  <div class="item">
                        <label class="label_term">包装数据</label>
                        <div class="input-text">
                            <el-input v-bind:disabled="true" v-model="order.packingInfo" ></el-input>
                        </div>
                    </div>
                    <!-- <div class="item">
                        <label class="label_term">计费方式</label>
                        <div class="input-text">
                            <el-select v-model="order.calculateType"  v-bind:disabled="true" placeholder="请选择">
                                <el-option v-for="item in calculateTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                            </el-select>
                        </div>
                    </div> -->
                    <div v-entity="356">
                        <div class="item">
                            <label class="label_term">供应商</label>
                            <div class="input-text">
                                <el-select v-model="order.outgoing.supplierTenantName" v-bind:disabled="true" @change="selectSupplierTenant"
                                        filterable placeholder="请选择供应商" @click.native="querySupplierTenantId()" >
                                    <el-option v-for="item in supplierTenantList" :key="item.tenantId" :label="item.tenantFullName" :value="item"></el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="item">
                            <label class="label_term">中转单号</label>
                            <div class="input-text" >
                                <el-input  v-model="order.outgoing.outgoingTrackingNum" v-bind:disabled="true" maxlength="30"  ></el-input>
                            </div>
                        </div>
                        <div class="item">
                            <label class="label_term">中转费用</label>
                            <div class="input-text">
                                <el-input  v-model="order.outgoing.outgoingFeeDouble"  v-bind:disabled="true" maxlength="8" ></el-input>
                            </div>
                        </div>
                        <div class="item">
                            <label class="label_term">供应商类型</label>
                            <div class="input-text">
                                <el-input  v-model="order.outgoing.supplierTypeName" v-bind:disabled="true" ></el-input>
                            </div>
                        </div>
                    </div>
                   
                    <div class="item">
                        <label class="label_term">回单类型</label>
                        <div class="input-text">
                            <el-select v-model="order.extorder.receiptType" v-bind:disabled="true" filterable placeholder="请选择">
                                <el-option v-for="item in receiptTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="item">
                        <label class="label_term">回单数量</label>
                        <div class="input-text">
                            <el-input  v-model="order.extorder.receiptCount" v-bind:disabled="true" maxlength="5" v-mynumval></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <label class="label_term">回单号</label>
                        <div class="input-text">
                            <el-input  v-model="order.extorder.receiptNum" maxlength="30" v-bind:disabled="true"></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <label class="label_term">客户单号</label>
                        <div class="input-text">
                            <el-input v-bind:disabled="true" v-model="order.ordNum" maxlength="50">></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <label class="label_term">采购单号</label>
                        <div class="input-text">
                            <el-input v-bind:disabled="true" v-model="order.purchaseNum" maxlength="50">></el-input>
                        </div>
                    </div>
                </div>
                <div class="mark_table clearfix">
                    <div class="item">
                        <div class="label_btn fl">
                            <el-button  class="fl" :class="{'active':remarkType==1}" size="mini" @click="selectRemark(1)">备注</el-button>
                            <el-button  class="fl" :class="{'active':remarkType==2}" size="mini" @click="selectRemark(2)">内部备注</el-button>
                        </div>
                        <div class="input-text input-icon">
                            <el-input v-bind:disabled="true" v-show="remarkType == 1"  placeholder="请输入备注（客户备注）" v-model="order.customerRemarks" maxlength="255" ></el-input>
                            <el-input v-bind:disabled="true" v-show="remarkType == 2"   placeholder="请输入备注（内部备注-平台可见）" v-model="order.remarks" maxlength="255"></el-input>
                            <!-- 备注弹窗 -->
                            <remark ref="remark" @remarkCallBack="remarkCallBack"></remark>
                        </div>
                    </div>
                    <div class="printItem fl">
                        <el-checkbox v-bind:disabled="true" class="fl" v-model="order.extorder.printType_1" @change="forceUpdate">打印信封</el-checkbox>
                        <el-checkbox v-bind:disabled="true" class="fl" v-model="order.extorder.printType_2" @change="forceUpdate">打印标签</el-checkbox>
                        <div class="printIpt fl">
                            <el-input v-bind:disabled="true" class="fl" v-model="order.extorder.beginPrintCount" maxlength="5" v-mynumval></el-input>
                            <span class="fl">到</span>
                            <el-input v-bind:disabled="true" class="fl" v-model="order.extorder.endPrintCount" maxlength="5" v-mynumval></el-input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="main-info staffInfo clearfix">
            <div class="fr">
                <div class="item">
                    <label class="label_term">销售专员</label>
                    <div class="input-text">
                        <el-input v-bind:disabled="true" v-model="order.extorder.salesmanBusinessName" maxlength="20"></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label_term">仓管员</label>
                    <div class="input-text">
                        <el-input v-bind:disabled="true" v-model="order.extorder.warehourseKeeperName" maxlength="20"></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label_term">开单员</label>
                    <div class="input-text">
                        <el-input  v-model="order.extorder.inputUserName" v-bind:disabled="true"></el-input>
                    </div>
                </div>
            </div>
        </div>
        <div class="bot_btn">
           <!-- <el-button type="primary" @click="saveOrderAndPrint()">保存并打印</el-button>
            <el-button type="primary" @click="saveOrUpdate(1)">保存运单</el-button>
            <el-button type="primary" @click="printOrder(1)">打印面单</el-button>
            <el-button type="warning" @click="clearOrder()" v-show="!orderViewOrModify">重新开单</el-button>
            <el-button type="warning" @click="saveOrderPicture()">保存图片</el-button>-->
        </div>
      
        <printSet :isShowSet="showPrinterView" businessTypes="1,2,3" @showChange="showChange" @sureCallback="sureCallback"></printSet>

    </div>
</template>

<script>
    import billing from './billing.js?detail'
    export default billing
</script>
<style lang="scss" src="./billing.scss"></style>