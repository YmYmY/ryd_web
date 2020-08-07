<template>
    <div id="vouchAdd" class="addLabourAccountPage" :class="dialog ? 'addLabourAccountDialog':''" >
        <div class="common-info">
            <div class="tableInfo">
                <div class="head">
                    <div class="title">财务日记账</div>
                    <div class="date"><em>*</em>入账日期: <el-date-picker v-model="check.vouchDate" type="date"  placeholder="选择日期"></el-date-picker></div>
                </div>
                <div class="headInfo">
                    <div>记账区域：<span>{{check.regionName}}</span></div>
                    <div class="clearfix">
                        <div class="fl" v-show="check.sourceType == 1">来源：<span>核销生成</span></div>
                        <div class="fl" v-show="check.sourceType != 1">来源：<span>手工录入</span></div>
                        <div class="fr">凭证号:<em>{{check.vouchNo}}</em></div>
                    </div>
                </div>
                <table class="feeTable" width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr class="thead">
                        <td width="20%" rowspan="2"><em>*</em>会计科目</td>
                        <td width="25%" rowspan="2">摘要</td>
                        <td width="15%" rowspan="2"><em>*</em>去向</td>
                        <td width="20%" colspan="10"><em>*</em>金额</td>
                        <td width="20%" rowspan="2">附单据数</td>
                    </tr>
                    <tr>
                        <td width="10%">千</td>
                        <td width="10%">百</td>
                        <td width="10%">十</td>
                        <td width="10%">万</td>
                        <td width="10%">千</td>
                        <td width="10%">百</td>
                        <td width="10%">十</td>
                        <td width="10%">元</td>
                        <td width="10%">角</td>
                        <td width="10%">分</td>
                    </tr>
                    <tr v-for="(vouch,index) in vouchList" :key="index">
                        <td width="20%" class="subject">
                            <el-input v-model="vouch.itemName" maxlength="10" @keyup.native="keyupItem(vouch)" 
                                   @blur="blurItem(vouch)" placeholder="输入代码或者会计科目名称并选择" @click.native="clickItem(vouch)" ></el-input>
                            <ul class="subjectList" v-show="vouch.showItemList && itemList.length >0" >
                                <li >
                                    <div class="code">科目代码</div> 
                                    <div class="name">会计科目</div> 
                                </li>
                                <li v-for="(data,index) in itemList" :key="index">
                                    <div class="code"  @click.stop="selectItem(data,vouch)">{{data.itemCode}}</div> 
                                    <div class="name"  @click.stop="selectItem(data,vouch)">{{data.itemName}}</div> 
                                </li>
                            </ul>
                        </td>
                        <td width="25%">
                            <el-input v-model="vouch.subject" maxlength="256"></el-input>
                        </td>
                        <td width="15%">
                            <el-select v-model="vouch.desItemName" placeholder="请选择" @change="selectDesItem(vouch)">
                               <el-option v-for="item in desItemList" :key="item.id" :label="item.desItemName" :value="item.desItemName" ></el-option>
                            </el-select>
                        </td>
                        <td  colspan="10" v-show="vouch.moneyInputFlag">
                              <el-input v-model="vouch.checkMoney"  maxlength="8" @blur="showInputView(vouch)" :ref="'input_'+index"    v-mydoubleval></el-input>
                        </td>
                        <td width="2%" v-show="!vouch.moneyInputFlag">
                            <el-input v-model="vouch.check10"  @click.native="showInputView(vouch,10,index)" maxlength="1" v-bind:disabled="checkFlag" v-mynumval></el-input>
                        </td>
                        <td width="2%" v-show="!vouch.moneyInputFlag">
                            <el-input v-model="vouch.check9" @click.native="showInputView(vouch,9,index)"  maxlength="1" v-bind:disabled="checkFlag" v-mynumval></el-input>
                        </td>
                        <td width="2%" v-show="!vouch.moneyInputFlag">
                            <el-input v-model="vouch.check8" @click.native="showInputView(vouch,8,index)"  maxlength="1" v-bind:disabled="checkFlag" v-mynumval></el-input>
                        </td>
                        <td width="2%" v-show="!vouch.moneyInputFlag">
                            <el-input v-model="vouch.check7" @click.native="showInputView(vouch,7,index)"  maxlength="1" v-bind:disabled="checkFlag" v-mynumval></el-input>
                        </td>
                        <td width="2%" v-show="!vouch.moneyInputFlag">
                            <el-input v-model="vouch.check6"  @click.native="showInputView(vouch,6,index)" maxlength="1" v-bind:disabled="checkFlag" v-mynumval></el-input>
                        </td>
                        <td width="2%" v-show="!vouch.moneyInputFlag">
                            <el-input v-model="vouch.check5" @click.native="showInputView(vouch,5,index)"  maxlength="1" v-bind:disabled="checkFlag" v-mynumval></el-input>
                        </td>
                        <td width="2%" v-show="!vouch.moneyInputFlag">
                            <el-input v-model="vouch.check4"  @click.native="showInputView(vouch,4,index)" maxlength="1" v-bind:disabled="checkFlag" v-mynumval></el-input>
                        </td>
                        <td width="2%"  v-show="!vouch.moneyInputFlag" >
                            <el-input v-model="vouch.check3" @click.native="showInputView(vouch,3,index)" maxlength="1" v-bind:disabled="checkFlag" v-mynumval></el-input>
                        </td>
                        <td width="2%" v-show="!vouch.moneyInputFlag">
                            <el-input v-model="vouch.check2" @click.native="showInputView(vouch,2,index)"  maxlength="1" v-bind:disabled="checkFlag" v-mynumval></el-input>
                        </td>
                        <td width="2%" v-show="!vouch.moneyInputFlag">
                            <el-input v-model="vouch.check1" @click.native="showInputView(vouch,1,index)"  maxlength="1" v-bind:disabled="checkFlag" v-mynumval></el-input>
                        </td>
                        <td width="20%">
                            <el-input v-model="vouch.numbers" maxlength="5" v-mynumval @blur.native="caclSumFee()"></el-input>
                        </td>
                    </tr>
                    <tr class="tfoot">
                        <td width="30%"><em>金额：{{check.totalMoney}}</em></td>
                        <td width="15%"></td>
                        <td width="15%"></td>
                        <td width="20%" colspan="10"></td>
                        <td width="20%"></td>
                    </tr>
                </table>
            </div>
            <ul class="content clearfix mt_20">
                <li class="item">
                    <label class="label-term">收据号码</label>
                    <div class="input-text">
                        <el-input v-model="check.recepitNo" maxlength="30"></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">手工凭证</label>
                    <div class="input-text">
                        <el-input v-model="check.manualNo" maxlength="30" ></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">发票号码</label>
                    <div class="input-text">
                        <el-input v-model="check.invoiceNo" maxlength="30"></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">支票号码</label>
                    <div class="input-text">
                        <el-input v-model="check.checkNo" maxlength="30" ></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em></em>报销部门</label>
                    <div class="input-text">
                         <!-- {{oragnizeList}} -->
                         <el-select v-model="check.expenseOrgName"  @change="selectOrg" placeholder="请选择"> 
                               <el-option v-for="item in oragnizeList" :key="item.oragnizeId" :label="item.oragnizeName" :value="item"></el-option>
                         </el-select>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">报销人</label>
                    <div class="input-text">
                        <el-input v-model="check.expenseUser" maxlength="30"></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">审核人</label>
                    <div class="input-text">
                        <el-input v-model="check.auditUser" v-bind:disabled="true" maxlength="30"></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">制单人</label>
                    <div class="input-text">
                        <el-input  v-model="check.recoderName" v-bind:disabled="true" maxlength="30"></el-input>
                    </div>
                </li>
            </ul>
            <div class="page-bot-btn">
                <el-button type="primary" @click="saveOrUpdate()">保存</el-button>
                <el-button type="info" v-if="checkFlag" @click="closeCurrentTab()">关闭</el-button>
                <el-button type="info" v-if="!checkFlag" @click="closeTab()">关闭</el-button>

                
            </div>
        </div>
    </div>
</template>

<script>
import vouchAdd from './vouchAdd.js'
export default vouchAdd

</script>

<style lang="scss" src="./vouchAdd.scss"></style>