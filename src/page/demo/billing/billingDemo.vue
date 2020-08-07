<template>
  <div id="billing" class="billing">
    <div class="main-info">
        <div class="table_top clearfix">
            <div class="item">
                <label class="label_term">运单号码</label>
                <div class="input-text">
                    <el-input mydoubleval></el-input>
                </div>
            </div>
            <div class="item">
                <label class="label_term">开单时间</label>
                <div class="input-text">
                    <el-date-picker v-model="consignerDdate" v-show="isVisitConsigner" type="datetime" placeholder="选择日期"></el-date-picker>
                </div>
            </div>
            <div class="item">
                <label class="label_term">预到时间</label>
                <div class="input-text">
                    <el-date-picker v-model="consignerDdate" v-show="isVisitConsigner" type="datetime" placeholder="选择日期"></el-date-picker>
                </div>
            </div>
            <div class="item">
                <label class="label_term">所属区域</label>
                <div class="input-text">
                    <el-input></el-input>
                </div>
            </div>
        </div>
        <div class="inner_info">
            <div class="inner_table clearfix">
                <div class="item">
                    <label class="label_term"><em>*</em>下单客户</label>
                    <div class="input-text">
                        <el-input></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label_term">联系人</label>
                    <div class="input-text">
                        <el-input></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label_term"><em>*</em>下单客户</label>
                    <div class="input-text">
                        <el-input></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label_term">订单类型</label>
                    <div class="input-text">
                        <el-input></el-input>
                    </div>
                </div>
            </div>
            <div class="inner_table2 clearfix">
                <div class="consigner_table">                    
                    <div class="item">
                        <label class="label_term"><em>*</em>发件店仓</label>
                        <div class="input-text input-icon">
                            <el-select v-model="selectValue" filterable placeholder="请选择">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                            <img class="icon" src="@/static/image/$tenantId$/u1873.png" @click="showlatelyLinkman()">
                        </div>
                    </div>
                    <div class="item">
                        <label class="label_term"><em>*</em>发货人</label>
                        <div class="input-text">
                            <el-input></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <label class="label_term"><em>*</em>发货手机</label>
                        <div class="input-text">
                            <el-input></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <label class="label_term"><em>*</em>发货电话</label>
                        <div class="input-text">
                            <el-input></el-input>
                        </div>
                    </div>
                    <div class="item item100 area_site">
                        <label class="label_term"><em>*</em>发货地址</label>
                        <div class="input-text fl">
                            <mycity class="city fl" placeholder="选择地址"></mycity>
                            <div class="detail fl">
                                <el-input placeholder="输入详细地址"></el-input>
                            </div>
                        </div>
                    </div>
                    <div class="item item100">
                        <label class="label_term">前端交货方式</label>
                        <el-radio-group v-model="radioValue">
                            <el-radio :label="1">上门提货</el-radio>
                            <el-date-picker v-model="consignerDdate" v-show="isVisitConsigner" type="datetime" placeholder="选择日期"></el-date-picker>
                            <el-radio :label="2">送货上门</el-radio>
                        </el-radio-group>
                    </div>
                </div>
                <div class="consignee_table">                 
                    <div class="item">
                        <label class="label_term"><em>*</em>收件客户</label>
                        <div class="input-text">                            
                            <el-select v-model="selectValue" filterable placeholder="请选择">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="item">
                        <label class="label_term"><em>*</em>收货人</label>
                        <div class="input-text">
                            <el-input></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <label class="label_term"><em>*</em>收货手机</label>
                        <div class="input-text">
                            <el-input></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <label class="label_term"><em>*</em>收货电话</label>
                        <div class="input-text">
                            <el-input></el-input>
                        </div>
                    </div>
                    <div class="item item100 area_site">
                        <label class="label_term"><em>*</em>收货地址</label>
                        <div class="input-text fl">
                            <mycity class="city fl" placeholder="选择地址"></mycity>
                            <div class="detail fl">
                                <el-input placeholder="输入详细地址"></el-input>
                            </div>
                        </div>
                    </div>
                    <div class="item item100">
                        <label class="label_term">末端交货方式</label>
                        <el-radio-group v-model="radioValue">
                            <el-radio :label="1">上门提货</el-radio>
                            <el-date-picker v-model="consignerDdate" v-show="isVisitConsigner" type="datetime" placeholder="选择日期"></el-date-picker>
                            <el-radio :label="2">送货上门</el-radio>
                        </el-radio-group>
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
            <ipttable :head="head"></ipttable>
        </div>
    </div>
    <div class="goods_info clearfix">
        <div class="goods_info_title">
            <span style="letter-spacing: 2px;">费用信息</span>
        </div>
        <div class="goods_info_table iptTable">
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr class="list_header">
                    <td v-for="hd in headFee" :key="hd.code"><em class="ismust">*</em>{{hd.name}}</td>
                </tr>
                <tr>
                    <td v-for="hd in headFee" :key="hd.code">
                        <div>
                            <el-input v-model="feeData[hd.code]"></el-input>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <div class="main-info table_goods_info_bottom">
        <div class="clearfix">
            <div class="item">
                <label class="label_term">运费合计</label>
                <div class="input-text">
                    <el-input></el-input>
                </div>
            </div>
            <div class="item">
                <label class="label_term">结算方式</label>
                <div class="input-text">
                    <el-select v-model="selectValue" filterable placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </div>
            </div>
            <div class="item">
                <label class="label_term">现付</label>
                <div class="input-text">
                    <el-input></el-input>
                </div>
            </div>
            <div class="item">
                <label class="label_term">到付</label>
                <div class="input-text">
                    <el-input></el-input>
                </div>
            </div>
            <div class="item">
                <label class="label_term">月结</label>
                <div class="input-text">
                    <el-input></el-input>
                </div>
            </div>
            <div class="item">
                <label class="label_term">回单付</label>
                <div class="input-text">
                    <el-input></el-input>
                </div>
            </div>
        </div>
    </div>
    <div class="main-info bot_info mt_20">
        <div class="inner_info">
            <div class="inner_table clearfix">
                <div class="item">
                    <label class="label_term">物流件数</label>
                    <div class="input-text">
                        <el-input></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label_term">物流重量</label>
                    <div class="input-text">
                        <el-input></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label_term">物流体积</label>
                    <div class="input-text">
                        <el-input></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label_term">计费方式</label>
                    <div class="input-text">
                        <el-select v-model="selectValue" filterable placeholder="请选择">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <label class="label_term">供应商</label>
                    <div class="input-text">
                        <el-select v-model="selectValue" filterable placeholder="请选择">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <label class="label_term">外发单号</label>
                    <div class="input-text">
                        <el-input></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label_term">外发费用</label>
                    <div class="input-text">
                        <el-input></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label_term">供应商类型</label>
                    <div class="input-text">
                        <el-input></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label_term">回单类型</label>
                    <div class="input-text">
                        <el-input></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label_term">回单数量</label>
                    <div class="input-text">
                        <el-input></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label_term">回单号</label>
                    <div class="input-text">
                        <el-input></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label_term">货号</label>
                    <div class="input-text">
                        <el-input></el-input>
                    </div>
                </div>
            </div>
            <div class="mark_table clearfix">
                <div class="item">
                    <div class="label_btn fl">
                        <el-button class="active fl" size="mini">备注</el-button>
                        <el-button class="fl" size="mini">内部备注</el-button>
                    </div>
                    <div class="input-text">
                        <el-input placeholder="请输入备注"></el-input>
                    </div>
                </div>
                <div class="printItem fl">
                    <el-checkbox class="fl">打印信封</el-checkbox>
                    <el-checkbox class="fl">打印标签</el-checkbox>
                    <div class="printIpt fl">
                        <el-input class="fl"></el-input>
                        <span class="fl">-</span>                        
                        <el-input class="fl"></el-input>
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
                    <el-input></el-input>
                </div>
            </div>
            <div class="item">
                <label class="label_term">仓管员</label>            
                <div class="input-text">
                    <el-input></el-input>
                </div>
            </div>
            <div class="item">
                <label class="label_term">开单员</label>            
                <div class="input-text">
                    <el-input></el-input>
                </div>
        </div>
        </div>
    </div>
    <div class="bot_btn">
        <el-button type="primary">保存并打印</el-button>
        <el-button type="primary">保存运单</el-button>
        <el-button type="warning">重新开单</el-button>
        <el-button type="warning">保存图片</el-button>
    </div>
    <el-dialog
    title="重量计算器"
    class="dialog"
    :visible.sync="dialogVisible"
    width="660px"
    :before-close="handleClose">
        <div class="tx_tc">
            <div class="tx_tc_one clearfix">
                <el-radio-group v-model="radioValue">
                    <el-radio :label="1">按单件统计</el-radio>
                    <el-radio :label="2">按总数统计</el-radio>
                </el-radio-group>
            </div>
            <div class="tx_tc_two">
                <!-- <ul class="ul_ki clearfix" style="margin: 20px 0 0 0">
                  <li style="margin-right: 0px;border: 0;background: transparent;">（</li>
                    <li style="padding-left:0;">毛重 <span class="red rd1"><input  class="form_term lsw1 " ng-blur="calculateWeight();" ng-model="weightParam.roughWeight" ng-keyup="calculateWeight();" my-double-val='keyup'  style="width:50px;display:inline-block;" type="text"></span></li>
                    <li style="margin-right: 0px;border: 0;background: transparent;">-</li>
                    <li>材重<span class="red rd1"><input  ng-model="weightParam.heavyWood" ng-blur="calculateWeight();" ng-keyup="calculateWeight()" my-double-val='keyup'  class="form_term lsw1 " style="width:50px;display:inline-block;" type="text"></span></li>
                    <li style="margin-right: 0px;border: 0;background: transparent;padding-left:0">）</li>
                    <li style="margin-right: 0px;"><span class="cheng">*</span>件数<span class="red rd1"><input ng-blur="calculateWeight();" ng-model="weightParam.count" ng-keyup="calculateWeight();" my-number-val='keyup'  class="form_term lsw1 " style="width:50px;display:inline-block;" type="text"></span></li>
                    <li style="margin-right: 0px;border: 0;background: transparent;">=</li>
                    <li style="margin-left:5px;"><span class="red" style="height: 26px;display: inline-block;line-height: 26px;padding: 0 10px 0 5px;">{{weightParam.totalWeight=='NaN'?0:weightParam.totalWeight}}</span></li>
                </ul> -->
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>

    <el-dialog
        title="最近联系人"
        :visible.sync="latelyLinkmanBox"
        width="600px">
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="date"
                label="日期"
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="address"
                label="地址">
            </el-table-column>
        </el-table>
    </el-dialog>
  </div>
</template>

<script>
import billing from './billingDemo.js'
export default billing
</script>
<style lang="scss" src="./billingDemo.scss"></style>
