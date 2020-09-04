<template>
    <div id="makeTransitShow" class="makeTransitShowPage">
        <div class="innerInfo clearfix">
            <div class="common-info fl">
                <ul class="content clearfix">
                    <li class="item">
                        <label class="label-term"><em>*</em>中转件数</label>
                        <div class="input-text">
                            <el-input v-model="objPrice.packageNumber" v-bind:disabled=true maxlength="11" v-mynumval @input="forceUpdate"></el-input>
                        </div>
                    </li>
                    <li class="item">
                        <label class="label-term"><em>*</em>中转重量</label>
                        <div class="input-text">
                            <el-input v-model="objPrice.packageWeight" v-bind:disabled=true maxlength="11" v-mydoubleval @input="forceUpdate"></el-input>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item">
                        <label class="label-term"><em>*</em>中转体积</label>
                        <div class="input-text">
                            <el-input v-model="objPrice.packageVolume" v-bind:disabled=true maxlength="11"  v-mydouble4val @input="forceUpdate"></el-input>
                        </div>
                    </li>
                    <li class="item">
                        <label class="label-term"><em>*</em>运费</label>
                        <div class="input-text">
                            <el-input v-model="objPrice.freightDouble" v-bind:disabled=true  maxlength="11" @input="forceUpdate" v-mydoubleval></el-input>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item">
                        <label class="label-term">保价</label>
                        <div class="input-text">
                            <el-input placeholder="保价（元）" @blur="isMax" v-bind:disabled=true v-model="objPrice.goodsPriceDouble" @input="forceUpdate" maxlength="11" v-mydoubleval></el-input>
                        </div>
                    </li>
                    <li class="item">
                        <label class="label-term">保险费</label>
                        <div class="input-text">
                            <el-input placeholder="保险费" @input="forceUpdate" v-bind:disabled=true v-model="objPrice.insureFeeDouble"   maxlength="11" v-mydoubleval></el-input>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item">
                        <label class="label-term">代收货款</label>
                        <div class="input-text">
                            <el-input placeholder="代收货款" @blur="isMax"  v-bind:disabled=true v-model="objPrice.collectingMoneyDouble" @input="forceUpdate" maxlength="11" v-mydoubleval></el-input>
                        </div>
                    </li>
                    <li class="item">
                        <label class="label-term">手续费</label>
                        <div class="input-text">
                            <el-input placeholder="手续费" @input="forceUpdate" v-bind:disabled=true v-model="objPrice.procedureFeeDouble"   maxlength="11" v-mydoubleval></el-input>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix" >
                    <li class="item">
                        <label class="label-term">其他费</label>
                        <div class="input-text">
                            <el-input   v-model="objPrice.otherFeeDouble" v-bind:disabled=true @input="forceUpdate"  maxlength="11" v-mydoubleval></el-input>
                        </div>
                    </li>
                    <li class="item">
                        <label class="label-term">包装费</label>
                        <div class="input-text">
                            <el-input   v-model="objPrice.packingCostsDouble" v-bind:disabled=true @input="forceUpdate"  maxlength="11" v-mydoubleval></el-input>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix" >
                    <li class="item">
                        <label class="label-term">送货费</label>
                        <div class="input-text">
                            <el-input   v-model="objPrice.deliveryCostsDouble" v-bind:disabled=true @input="forceUpdate" maxlength="11" v-mydoubleval></el-input>
                        </div>
                    </li>
                    <li class="item">
                        <label class="label-term">提货费</label>
                        <div class="input-text">
                            <el-input   v-model="objPrice.pickingCostsDouble" v-bind:disabled=true @input="forceUpdate" maxlength="11" v-mydoubleval></el-input>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item" >
                        <label class="label-term">装卸费</label>
                        <div class="input-text">
                            <el-input   v-model="objPrice.handingCostsDouble" v-bind:disabled=true @input="forceUpdate" maxlength="11" v-mydoubleval></el-input>
                        </div>
                    </li>
                    <li class="item">
                        <label class="label-term">面单费</label>
                        <div class="input-text">
                            <el-input   v-model="objPrice.facelistFeeDouble" v-bind:disabled=true @input="forceUpdate" maxlength="11" v-mydoubleval></el-input>
                        </div>
                    </li>
                </ul>
                 <ul class="content clearfix">
                     <li class="item">
                         <label class="label-term">上楼费</label>
                         <div class="input-text">
                             <el-input   v-model="objPrice.upstairFeeDouble" v-bind:disabled=true @input="forceUpdate" maxlength="11" v-mydoubleval></el-input>
                         </div>
                     </li>
                     <li class="item">
                         <label class="label-term">到付上浮</label>
                         <div class="input-text">
                             <el-input  v-model="objPrice.floatingPriceDouble" v-bind:disabled=true @input="forceUpdate" maxlength="11" v-mydoubleval></el-input>
                         </div>
                     </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item">
                        <label class="label-term">价格名称</label>
                        <div class="input-text">
                            <el-select v-model="objPrice.tenantPrice" v-bind:disabled=true placeholder="请选择" @change="forceUpdate">
                                <el-option v-for="item in tenantPriceList" :key="item.priceName" :label="item.priceName" :value="item.priceId"></el-option>
                            </el-select>
                        </div>
                    </li>
                    <li class="item">
                        <label class="label-term">成本合计</label>
                        <div class="input-text">
                            <el-input v-model="objPrice.outgoingFeeDouble"  @input="forceUpdate" v-bind:disabled=true maxlength="11"  v-mydoubleval></el-input>
                           <!-- <a class="lint" href="javascript:;" @click="priceUtils()">自动计算</a>-->
                        </div>
                    </li>
                </ul>
            </div>
            <div class="common-info fl">
                <ul class="content clearfix">
                    <li class="item" >
                        <label class="label-term">供应商名称</label>
                        <div class="input-text">
                            <el-input   v-model="tenantFullName"  v-bind:disabled=true @input="forceUpdate" maxlength="50"></el-input>
                        </div>
                    </li>
                </ul>
                <h3 class="common-title mb_20"><span class="title-name">账号信息</span></h3>
                <ul class="content clearfix">
                    <li class="item" >
                        <label class="label-term"><em>*</em>开户名</label>
                        <div class="input-text">
                            <el-input   v-model="objPrice.bankPeople" v-bind:disabled=true @input="forceUpdate" maxlength="50"></el-input>
                        </div>
                    </li>
                    <li class="item">
                        <label class="label-term"><em>*</em>开户银行</label>
                        <div class="input-text">
                            <el-input v-model="objPrice.bankName" v-bind:disabled=true @input="forceUpdate" maxlength="50"></el-input>
                        </div>
                    </li>
                    <li class="item">
                        <label class="label-term"><em>*</em>银行账号</label>
                        <div class="input-text">
                            <el-input v-model="objPrice.bankCard" v-bind:disabled=true @input="forceUpdate" maxlength="50" v-mynumval ></el-input>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="calcTip" ref="calcTip">
        </div>
    </div>
</template>
<script>
    import makeTransitShow from './makeTransitShow.js'
    export default makeTransitShow
</script>
<style lang="scss">
.makeTransitShowPage{
    .innerInfo{
        padding: 20px 20px 10px;
        .common-info{
            box-sizing: border-box;
        }
        .common-info:first-child{
            padding-top: 0!important;
            padding-bottom: 0!important;
            width: 66%;
            border:none;
            border-right: $border;
        }
        .common-info:last-child{
            border: none;
            width: 33%;
        }
    }
    .calcTip{
        padding: 0 30px;
        color:red;
    }
    .page-bot-btn{
        padding-bottom:20px;
    }
}
</style>