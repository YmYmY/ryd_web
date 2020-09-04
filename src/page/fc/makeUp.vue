<template>
    <div id="makeUp">
            <div class="common-info" style="border:none;padding:0;">
                <ul class="content clearfix">
                    <li class="item">
                        <label class="label-term"><em>*</em>打包件数</label>
                        <div class="input-text">
                            <el-input v-model="objPrice.packageNumber"  maxlength="11" v-mynumval @input="forceUpdate"></el-input>
                        </div>
                    </li>
                    <li class="item">
                        <label class="label-term"><em>*</em>打包重量</label>
                        <div class="input-text">
                            <el-input v-model="objPrice.packageWeight"  maxlength="11" v-mydoubleval @input="forceUpdate"></el-input>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item">
                        <label class="label-term"><em>*</em>打包体积</label>
                        <div class="input-text">
                            <el-input v-model="objPrice.packageVolume"  maxlength="11"  v-mydouble4val @input="forceUpdate"></el-input>
                        </div>
                    </li>
                    <li class="item">
                        <label class="label-term"><em>*</em>运费</label>
                        <div class="input-text">
                            <el-input v-model="objPrice.freightDouble"   maxlength="11" @input="forceUpdate" v-mydoubleval></el-input>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item">
                        <label class="label-term">保价</label>
                        <div class="input-text">
                            <el-input placeholder="保价（元）" @blur="isMax" v-model="objPrice.goodsPriceDouble" @input="forceUpdate" maxlength="11" v-mydoubleval></el-input>
                        </div>
                    </li>
                    <li class="item">
                        <label class="label-term">保险费</label>
                        <div class="input-text">
                            <el-input placeholder="保险费" @input="forceUpdate"  v-model="objPrice.insureFeeDouble"   maxlength="11" v-mydoubleval></el-input>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item">
                        <label class="label-term">代收货款</label>
                        <div class="input-text">
                            <el-input placeholder="代收货款" @blur="isMax"  v-model="objPrice.collectingMoneyDouble" @input="forceUpdate" maxlength="11" v-mydoubleval></el-input>
                        </div>
                    </li>
                    <li class="item">
                        <label class="label-term">手续费</label>
                        <div class="input-text">
                            <el-input placeholder="手续费" @input="forceUpdate" v-model="objPrice.procedureFeeDouble"   maxlength="11" v-mydoubleval></el-input>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix" v-show="queryType=='B'">
                    <li class="item">
                        <label class="label-term">面单费</label>
                        <div class="input-text">
                            <el-input   v-model="objPrice.facelistFeeDouble"  @input="forceUpdate" maxlength="11" v-mydoubleval></el-input>
                        </div>
                    </li>
                    <li class="item">
                        <label class="label-term">包装费</label>
                        <div class="input-text">
                            <el-input   v-model="objPrice.packingCostsDouble" @input="forceUpdate"  maxlength="11" v-mydoubleval></el-input>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix" v-show="queryType=='B'">
                    <li class="item">
                        <label class="label-term">送货费</label>
                        <div class="input-text">
                            <el-input   v-model="objPrice.deliveryCostsDouble"  @input="forceUpdate" maxlength="11" v-mydoubleval></el-input>
                        </div>
                    </li>
                    <li class="item">
                        <label class="label-term">提货费</label>
                        <div class="input-text">
                            <el-input   v-model="objPrice.pickingCostsDouble"  @input="forceUpdate" maxlength="11" v-mydoubleval></el-input>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix" v-show="queryType=='B'">
                    <li class="item">
                        <label class="label-term">上楼费</label>
                        <div class="input-text">
                            <el-input   v-model="objPrice.upstairFeeDouble"  @input="forceUpdate" maxlength="11" v-mydoubleval></el-input>
                        </div>
                    </li>
                    <li class="item">
                        <label class="label-term">其他费</label>
                        <div class="input-text">
                            <el-input   v-model="objPrice.otherFeeDouble" @input="forceUpdate"  maxlength="11" v-mydoubleval></el-input>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item" v-show="queryType=='B'">
                        <label class="label-term">装卸费</label>
                        <div class="input-text">
                            <el-input   v-model="objPrice.handingCostsDouble"  @input="forceUpdate" maxlength="11" v-mydoubleval></el-input>
                        </div>
                    </li>
                    <li class="item">
                        <label class="label-term">到付上浮</label>
                        <div class="input-text">
                            <el-input   v-model="objPrice.floatingPriceDouble"  @input="forceUpdate" maxlength="11" v-mydoubleval></el-input>
                        </div>
                    </li>
                    <li class="item" v-show="queryType=='B'">
                        <label class="label-term">价格名称</label>
                        <div class="input-text">
                            <el-select v-model="objPrice.tenantPrice" placeholder="请选择" @change="selectType">
                                <el-option v-for="item in tenantPriceList" :key="item.priceName" :label="item.priceName" :value="item.priceId"></el-option>
                            </el-select>
                        </div>
                    </li>
                    <li class="item">
                        <label class="label-term">收人合计</label>
                        <div class="input-text">
                            <el-input v-model="objPrice.orderIncomeDouble" v-bind:disabled=true maxlength="11"  v-mydoubleval></el-input>
                            <a class="lint" href="javascript:;" @click="priceUtils()">自动计算</a>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item">
                        <label class="label-term">推送费用</label>
                        <div class="input-text">
                            <el-checkbox v-model="pushFee"></el-checkbox>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="page-bot-btn">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="doSavePrice()">确 定</el-button>
            </div>
    </div>
</template>
<script>
    import makeUp from './makeUp.js'
    export default makeUp
</script>
<style scoped>

</style>