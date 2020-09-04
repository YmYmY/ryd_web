<template>
  <div id="billing" class="billing" @click="hideDialog">
    <!-- 开单表格start -->
    <div class="imageWrapper" ref="imageWrapper">
    <div class="main-info">
        <div class="table_top clearfix">
            <div class="item">
                <label class="label_term">运单号</label>
                <div class="input-text">
                    <el-input v-bind:disabled = "true" v-model="order.trackingNum"></el-input>
                    <img class="refresh-icon" v-show="!(order.orderId >0)" @click="initTrackingNum('update')" src="@/static/image/$tenantId$/refresh.png">
                </div>
            </div>
            <div class="item">
                <label class="label_term">实际托运时间</label>
                <div class="input-text">
                    <el-date-picker v-model="order.billingDate"  value-format="yyyy-MM-dd HH:mm:ss"  type="datetime" placeholder="选择日期"></el-date-picker>
                </div>
            </div>
            <div class="item">
                <label class="label_term">期待到货时间</label>
                <div class="input-text">
                    <el-date-picker v-model="order.extorder.waitArriveDate" value-format="yyyy-MM-dd HH:mm:ss"  type="datetime" placeholder="选择日期"></el-date-picker>
                </div>

            </div>
            <div class="item">
                <label class="label_term">所属区域</label>
                <div class="input-text">
                    <el-input v-bind:disabled = "true" v-model="order.regionName"></el-input>
                </div>
            </div>
        </div>
        <div class="inner_info">
            <div class="inner_table clearfix">
                <div class="item">
                    <label class="label_term"><em>*</em>下单客户</label>
                    <div class="input-text">
                        <el-select v-bind:disabled="order.orderId > 0"   v-model="order.customerTenantName" filterable  placeholder="请选择下单客户"
                         @change="selectCustomerTenant" @click.native="queryCustomerTenantList()">
                                <el-option v-for="item in customerTenantList" :key="item.tenantId" :label="item.tenantFullName" :value="item"></el-option>
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
                            <el-select v-model="order.orderType" filterable placeholder="请选择"   @change="messagePreOrderFee('orderType')">
                                  <el-option v-for="item in orderTypeList" :key="item.codeValue" 
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
                            <el-select v-model="order.consignorName" filterable placeholder="请选择发货店仓" @change="selectConsignor"  
                             @input.native ="queryInputConsignorList"  @click.native ="queryConsList(1)"  >
                                <el-option v-for="item in customerList" :key="item.id" :label="item.fullName" :value="item"></el-option>
                            </el-select>
                            <img class="icon" src="@/static/image/$tenantId$/u1873.png" @click="showlatelyLinkman()">
                        </div>
                    </div>
                    <div class="item">
                        <label class="label_term"><em>*</em>发货人</label>
                        <div class="input-text">
                            <el-input v-model="order.consignorLinkmanName" maxlength="20"></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <label class="label_term">发货手机</label>
                        <div class="input-text">
                            <el-input v-model="order.consignorBill" placeholder="发货电话、手机必填一" maxlength="12"></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <label class="label_term">发货电话</label>
                        <div class="input-text">
                            <el-input v-model="order.consignorTelephone" placeholder="发货电话、手机必填一" maxlength="12"></el-input>
                        </div>
                    </div>
                    <div class="item item100 area_site">
                        <label class="label_term"><em>*</em>发货地址</label>
                        <div class="input-text fl">
                            <mycity class="city fl" selectType="3" ref="sourceCityAddr"  @selectCallback="selectSourceCallback" placeholder="选择发货省市区"></mycity>
                            <div class="detail fl">
                                <el-input placeholder="输入详细地址" v-model="order.sourceAddress" maxlength="50"></el-input>
                            </div>
                        </div>
                    </div>
                    <div class="item item100">
                        <label class="label_term">前端交货方式</label>
                        <el-radio-group v-model="order.beginDeliveryType">
                            <el-radio class="fl" :label="1">上门提货</el-radio>
                            <!-- 
                                value：回显值字段 [08-11,15:00-18:00]
                                dayRange：往后可选的天数（不填默认一年）
                                callback：确定选择时间后回调参数
                                timeList：时间区间数据
                             -->
                            <dateRange v-show="order.beginDeliveryType == 1" class="fl" placeholder="请选择上门时间" :value="order.prePickupDateTem"  dayRange="30" @callback="prePickupDateCallback"></dateRange>
                          <!-- <el-date-picker v-show="order.beginDeliveryType == 1" style="width:200px" v-model="order.prePickupDateTem" type="datetimerange" range-separator="-" start-placeholder="开始"
                                     end-placeholder="结束" value-format="MM-dd HH:mm" format="MM-dd HH:mm"></el-date-picker> -->
                            <el-radio class="fl ml_10" :label="0">送货上门</el-radio>
                        </el-radio-group>
                    </div>
                </div>
                <div class="consignee_table">                 
                    <div class="item">
                        <label class="label_term"><em>*</em>收货客户</label>
                        <div class="input-text">                            
                            <el-select v-model="order.consigneeName" filterable
                             @change="selectConsignee" placeholder="请选择收货信息"  @click.native="queryConsList(2)"  @input.native ="queryInputConsigneeList" >
                                <el-option v-for="item in customerList" :key="item.id" :label="item.fullName" :value="item"></el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="item">
                        <label class="label_term"><em>*</em>收货人</label>
                        <div class="input-text">
                            <el-input v-model="order.consigneeLinkmanName" maxlength="30"></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <label class="label_term">收货手机</label>
                        <div class="input-text">
                            <el-input v-model="order.consigneeBill" placeholder="收货电话、手机必填一" maxlength="12"></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <label class="label_term">收货电话</label>
                        <div class="input-text">
                            <el-input v-model="order.consigneeTelephone" placeholder="收货电话、手机必填一" maxlength="12"></el-input>
                        </div>
                    </div>
                    <div class="item item100 area_site">
                        <label class="label_term"><em>*</em>收货地址</label>
                        <div class="input-text fl">
                            <mycity class="city fl" selectType="3" ref="destCityAddr"   @selectCallback="selectDestCallback" placeholder="选择收货省市区"></mycity>
                            <div class="detail fl">
                                <el-input placeholder="输入详细地址" v-model="order.destAddress" maxlength="50"></el-input>
                            </div>
                        </div>
                    </div>
                    <div class="item item100">
                        <label class="label_term">末端交货方式</label>
                        <el-radio-group class="fl" v-model="order.endDeliveryType">
                            <el-radio :label="0">客户自提</el-radio>
                            <el-radio :label="1">送货上门</el-radio>
                            <el-radio :label="2">送货上楼</el-radio>
                        </el-radio-group>
                        <el-checkbox v-show="order.payConsignorFlag || shopSettlementApiFlag" class="fl" v-model="order.payConsignorFlag" style="line-height:32px;margin:0 10px;" @click.native="selectPayConsignor()">三方结算</el-checkbox>
                        <el-select @input.native="queryInputPayConsignorList"  class="fl" v-show="order.payConsignorFlag || shopSettlementApiFlag" style="width:calc(100% - 461px);" v-model="order.payConsignorName" filterable
                            @change="selectPayConsignor" placeholder="请选择结算店铺"  >
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
            <ipttable tableName="billingIptTable" :headList="head"  ref="goodsRows" @changeValue="changeGoodsValue" @changeHeadData="changeHeadData" ></ipttable>
        </div>
    </div>
    <div class="goods_info clearfix">
        <div class="goods_info_title">
            <span style="letter-spacing: 2px;">费用信息</span>
        </div>
        <div class="goods_info_table iptTable">
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr class="list_header">
                    <td v-for="hd in headFee" :key="hd.code" v-show="hd.isShow">
                        <div v-show="!hd.isEdit">{{hd.name}}<i class="el-icon-edit" v-show="hd.edit" @click="headFeeEdit(hd)"></i></div>
                        <el-input v-model="hd.editmodel" v-show="hd.isEdit" @blur="feeEditEnd(hd)" @keyup.enter.native="feeEditEnd(hd)"></el-input>
                    </td> 
                </tr>
                <tr>
                    <td v-for="hd in headFee" :key="hd.code" v-show="hd.isShow">
                        <div>
                            <!-- // this.orderFee -->
                            <el-input v-model="orderFeeTem[hd.code]"  v-mydoubleval  
                            @blur="changeOrderFee(hd.code)" 
                            v-bind:disabled="hd.disabledFlag" maxlength="8"></el-input>
                        </div>
                    </td>
                </tr>
            </table>
            <ul class="ipt_table_ico">
                <li @click.stop="stopBub">
                    <div class="ico diy" @click="showTableSetting">
                        <img src="@/static/image/$tenantId$/diy.png" alt="" style="margin-top:6px;">
                        <p class="tip">自定义</p>
                    </div>
                    <div class="iptSetTableRow" v-show="isShowSetting">
                        <div class="setRowTop">
                            <h3>自定义字段</h3>
                            <em>注：可拖动字段以改变其展示的顺序！</em>
                        </div>
                        <div class="clearfix" style="position:relative;">
                            <!-- 不展示列 -->
                            <div class="fl flow_row">
                                <div class="selet_all">
                                    <el-checkbox v-model="leftSelectAll" @change="selectLeftAll">未选定</el-checkbox>
                                </div>
                                <div class="select_list">
                                    <ul>
                                        <li v-for="(hd,index) in headSetList" :key="index">
                                            <el-checkbox v-model="hd.isChecked" v-if="!hd.isShow" @change="diyItemChange(hd,1)">{{hd.name}}</el-checkbox>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="sure_select">
                                <span class="sel_ico" @click="selToRight"><i class="el-icon-arrow-right"></i></span>
                                <span class="sel_ico" @click="selToLeft"><i class="el-icon-arrow-left"></i></span>
                            </div>
                            <!-- 展示列 -->
                            <div class="fr flow_row">
                                <div class="selet_all">
                                    <el-checkbox v-model="rightSelectAll" @change="selectRightAll">已选定</el-checkbox>
                                </div>
                                <div class="select_list">
                                    <ul>
                                        <vuedraggable v-model="headSetList">
                                        <transition-group :name="'flip-list'" type="transition">
                                            <li v-for="hd in headSetList" :key="hd.code">
                                                <el-checkbox v-model="hd.isChecked" v-if="hd.isShow" :disabled="hd.requiredFiled" @change="diyItemChange(hd,2)">{{hd.name}}</el-checkbox>
                                            </li>
                                        </transition-group>
                                    </vuedraggable>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="botBtn bottom_set_btn">
                            <!-- <el-button size="mini">恢复默认</el-button> -->
                            <el-button size="mini" type="primary" @click="sureSetting">确定</el-button>
                            <el-button size="mini" type="warning" @click="cancelSetting">取消</el-button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div class="main-info table_goods_info_bottom">
        <div class="clearfix">
            <div class="item">
                <label class="label_term">收入合计</label>
                <div class="input-text">
                    <el-input class="red" v-model="order.fee.orderIncomeDouble" v-bind:disabled="true" maxlength="8"></el-input>
                </div>
            </div>
            <div class="item">
                <label class="label_term">计费产品</label>
                <div class="input-text">
                    <el-select v-model="order.fee.calculatePriceName" filterable placeholder="请选择" @change="selectCalculatePrice" @click.native="getSysTenantPrice()">
                      <el-option v-for="item in tenantPriceList" :key="item.priceId" :label="item.priceName" :value="item"></el-option>
                    </el-select>
                </div>
            </div>
            <div class="item">
                <label class="label_term">结算方式</label>
                <div class="input-text">
                    <el-select v-model="order.fee.paymentType" filterable placeholder="请选择" @change="selectPaymentType()">
                        <el-option v-for="item in paymentTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
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
                    <el-input v-model="order.fee.freightCollectDouble" @input="forceUpdate" @click="forceUpdate()" v-bind:disabled="freightCollectDoubleShow" maxlength="10"></el-input>
                </div>
            </div>
            <div class="item">
                <label class="label_term">月结</label>
                <div class="input-text">
                    <el-input v-model="order.fee.monthlyPaymentDouble" @input="forceUpdate" @click="forceUpdate()"  v-bind:disabled="monthlyPaymentDoubleShow" maxlength="10"></el-input>
                </div>
            </div>
            <div class="item">
                <label class="label_term">回单付</label>
                <div class="input-text">
                    <el-input v-model="order.fee.receiptPaymentDouble" @input="forceUpdate" @click="forceUpdate()" v-bind:disabled="receiptPaymentDoubleShow" maxlength="10"></el-input>
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
                        <el-input v-model="order.packageNumber" maxlength="5" v-mynumval @blur="selectPackageNumber()"></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label_term">打包重量</label>
                    <div class="input-text">
                        <el-input  v-model="order.packageWeight" maxlength="8" @blur="messagePreOrderFee('packageNumber')" v-mydoubleval></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label_term">打包体积</label>
                    <div class="input-text">
                        <el-input v-model="order.packageVolume" maxlength="8"  @blur="messagePreOrderFee('packageNumber')" v-mydouble4val></el-input>
                    </div>
                </div>
                <!-- <div class="item">
                    <label class="label_term">计费方式</label>
                    <div class="input-text">
                        <el-select v-model="order.calculateType"  placeholder="请选择">
                            <el-option v-for="item in calculateTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </div> -->
                <div class="item">
                    <label class="label_term">包装数据</label>
                    <div class="input-text" @click="getPackingList()">
                        <el-input type="text" v-model="order.packingInfo" placeholder="单击选择包装" readonly="readonly"></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label_term">供应商</label>
                    <div class="input-text">
                        <el-select v-model="order.outgoing.supplierTenantName"  @change="selectSupplierTenant" v-bind:disabled="orderViewOrModify" 
                            filterable placeholder="请选择供应商" @click.native="querySupplierTenantId()" >
                            <el-option v-for="item in supplierTenantList" :key="item.tenantId" :label="item.tenantFullName" :value="item"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <label class="label_term">中转单号</label>
                    <div class="input-text" >
                        <el-input  v-model="order.outgoing.outgoingTrackingNum" maxlength="30" v-bind:disabled="orderViewOrModify || order.outgoing.projectFlag"  ></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label_term">中转费用</label>
                    <div class="input-text">
                        <el-input  v-model="order.outgoing.outgoingFeeDouble"  maxlength="8" v-mydoubleval v-bind:disabled="orderViewOrModify || order.outgoing.projectFlag" ></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label_term">供应商类型</label>
                    <div class="input-text">
                        <el-input  v-model="order.outgoing.supplierTypeName" v-bind:disabled="true" ></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label_term">回单类型</label>
                    <div class="input-text">
                        <el-select v-model="order.extorder.receiptType" filterable placeholder="请选择">
                            <el-option v-for="item in receiptTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <label class="label_term">回单数量</label>
                    <div class="input-text">
                        <el-input  v-model="order.extorder.receiptCount" maxlength="5" v-mynumval></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label_term">回单号</label>
                    <div class="input-text">
                        <el-input  v-model="order.extorder.receiptNum" maxlength="30" ></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label_term">客户单号</label>
                    <div class="input-text">
                        <el-input  v-model="order.ordNum" maxlength="50">></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label_term">采购单号</label>
                    <div class="input-text">
                        <el-input  v-model="order.purchaseNum" maxlength="50">></el-input>
                    </div>
                </div>
            </div>
            <div class="mark_table clearfix">
                <div class="item">
                    <div class="label_btn fl">
                        <el-button class="fl" :class="{'active':remarkType==1}" size="mini" @click="selectRemark(1)">备注</el-button>
                        <el-button class="fl" :class="{'active':remarkType==2}" size="mini" @click="selectRemark(2)">内部备注</el-button>
                    </div>
                    <div class="input-text input-icon">
                        <el-input v-show="remarkType == 1"  placeholder="请输入备注（客户备注）" v-model="order.customerRemarks" maxlength="255" ></el-input>
                        <el-input v-show="remarkType == 2"   placeholder="请输入备注（内部备注-平台可见）" v-model="order.remarks" maxlength="255"></el-input>
                        <img class="icon" src="@/static/image/$tenantId$/u1873.png" @click="showLatelyRemark()">
                        <!-- 备注弹窗 -->
                        <remark ref="remark" @remarkCallBack="remarkCallBack" :remarkType="1"></remark>
                    </div>
                </div>
                <div class="printItem fl">
                    <el-checkbox class="fl" v-model="order.extorder.printType_1" @change="forceUpdate">打印信封</el-checkbox>
                    <el-checkbox class="fl" v-model="order.extorder.printType_2" @change="forceUpdate">打印标签</el-checkbox>
                    <div class="printIpt fl">
                        <el-input class="fl" v-model="order.extorder.beginPrintCount" maxlength="5" v-mynumval></el-input>
                        <span class="fl">到</span>                        
                        <el-input class="fl" v-model="order.extorder.endPrintCount" maxlength="5" v-mynumval></el-input>
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
                    <el-input v-model="order.extorder.salesmanBusinessName" maxlength="20"></el-input>
                </div>
            </div>
            <div class="item">
                <label class="label_term">仓管员</label>            
                <div class="input-text">
                    <el-input v-model="order.extorder.warehourseKeeperName" maxlength="20"></el-input>
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
    </div>
    <!-- 开单表格end -->
    <div class="bot_btn" >
        <el-button type="primary" v-show="!printHtmlFlag"  @click="saveOrderAndPrint()">保存并打印</el-button>
        <el-button type="primary" v-show="!printHtmlFlag" @click="saveOrUpdate(1)">保存运单</el-button>
        <el-button type="primary" @click="printOrder(1)">打印面单</el-button>
        <el-button type="warning" @click="clearOrder()" v-show="!orderViewOrModify">重新开单</el-button>
        <el-button type="warning" @click="saveOrderPicture()">保存图片</el-button>
    </div>
    
    <el-dialog
        :title="tableHisTitle"
        :visible.sync="latelyLinkmanBox"
        width="600px" @click="s()">
        <el-table
            :data="tableHisOrderData"
            style="width: 100%" @row-click="selectLatelyLinkman">
            <el-table-column
                prop="billingDate"
                label="开单日期"
                width="180">
            </el-table-column>
            <el-table-column
          prop="consigneeLinkmanName"
                label="姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="address"
                label="地址">
            </el-table-column>
        </el-table>
    </el-dialog>
     <printSet :isShowSet="showPrinterView" businessTypes="1,2,3" @showChange="showChange" @sureCallback="sureCallback"></printSet>
    

    <!-- 包装数据弹窗 开始 -->
    <el-dialog
        title="包装数据"
        :visible.sync="packListDialog"
        width="600px">        
        <table class="tableCommon packListTable" width="100%" border="0" cellspacing="0" cellpadding="0">
            <thead>
                <tr>
                    <th width="25%" v-show="packingListObj.itemType == 2" >包装箱名</th>
                    <th width="25%" v-show="packingListObj.itemType == 2" >可容纳体积</th>
                    <th width="25%">算费归类</th>
                    <th width="25%">使用数量</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,$index) in packingListObj.items" :key="$index">
                    <td v-show="packingListObj.itemType == 2">{{item.boxName}}</td>
                    <td v-show="packingListObj.itemType == 2">{{item.boxVolume}}</td>
                    <td>{{item.codeName}}</td>
                    <td>
                        <el-input placeholder="请输入数量" v-model="item.packNumber" @input="forceUpdate()"></el-input>
                    </td>
                </tr>
            </tbody>
        </table>
         <div class="page-bot-btn">
             <el-button type="primary"  @click="closePack('save')">确认</el-button>
             <el-button type="info" @click="closePack('cancel')">关闭</el-button>
             <el-button type="info" @click="closePack('clear')">清除包装</el-button>
        </div>
    </el-dialog>
     <!-- 包装数据弹窗 结束 -->
  </div>
</template>

<script>
import billing from './billing.js'
export default billing
</script>
<style lang="scss" src="./billing.scss"></style>