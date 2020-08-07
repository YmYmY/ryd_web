<template>
    <div id="sysOrder">
        <div class="common-info">
            <h3 class="common-title mb_20"><span class="title-name">收入合计</span></h3>
            <ul class="content clearfix">
                <li class="item" style="width:auto;">
                    <div class="input-text">
                        <el-checkbox-group v-model="obj.orderMode" >
                            <el-checkbox v-for="item in orderModelList" :key="item.codeValue" :label="item.codeValue">{{item.codeName}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </li>
            </ul>
            <h3 class="common-title mb_20"><span class="title-name">保险费</span></h3>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term">最大保价</label>
                    <div class="input-text">
                        <el-input v-model="obj.maxLowestCost"   maxlength="11" v-mydoubleval></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">保险费率%</label>
                    <div class="input-text">
                        <el-input v-model="obj.insuranceCost" maxlength="11" v-mydoubleval></el-input>
                    </div>
                </li>
                <li class="item" >
                    <label class="label-term">最低保费</label>
                    <div class="input-text">
                        <el-input v-model="obj.minLowestCost"   maxlength="11" v-mydoubleval></el-input>
                    </div>
                </li>
            </ul>
            <h3 class="common-title mb_20"><span class="title-name">代收货款</span></h3>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term">最大金额</label>
                    <div class="input-text">
                        <el-input v-model="obj.maxCost"   maxlength="11" v-mydoubleval></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">手续费%</label>
                    <div class="input-text">
                        <el-input v-model="obj.handlingFee" maxlength="11" v-mydoubleval></el-input>
                    </div>
                </li>
                <li class="item" >
                    <label class="label-term">最低收费</label>
                    <div class="input-text">
                        <el-input v-model="obj.mimCost"   maxlength="11" v-mydoubleval></el-input>
                    </div>
                </li>
            </ul>
            <h3 class="common-title mb_20"><span class="title-name">默认设置</span></h3>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term">订单类型</label>
                    <div class="input-text">
                        <el-select v-model="obj.orderType" placeholder="请选择">
                            <el-option v-for="item in orderTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term">前端交货方式</label>
                    <div class="input-text">
                        <el-select v-model="obj.deliveryType" placeholder="请选择" @change="selectType()">
                            <el-option v-for="item in beginDeliveryTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
                <li class="item" v-show="showType">
                    <label class="label-term">提货区间</label>
                    <div class="input-text">
                        <el-select v-model="obj.intervalType" placeholder="请选择">
                            <el-option v-for="item in deliveryTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term">末端送货方式</label>
                    <div class="input-text">
                        <el-select v-model="obj.giveDeliveryType" placeholder="请选择">
                            <el-option v-for="item in endDeliveryTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">结算方式</label>
                    <div class="input-text">
                        <el-select v-model="obj.payType" placeholder="请选择">
                            <el-option v-for="item in payTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term">其他费命名</label>
                    <div class="input-text">
                        <el-input v-model="obj.otherName"   maxlength="20"></el-input>
                    </div>
                </li>
            </ul>
            <div class="bot-btn">
                <el-button type="primary" @click="doSave()">保存</el-button>
                <el-button type="info" @click="cancel()">取消</el-button>
            </div>
        </div>
    </div>

</template>
<script>
    import sysOrder from './sysOrder.js'
    export default sysOrder
</script>