<template>
    <div id="addPriceStandard" class="addPriceStandardPage">
        <div class="common-info">
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term">
                        <el-select v-model="obj.cityType"  style="width:96px;position:relative;left:-12px;">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </label>
                    <div class="input-text fl">
                        <mycity  ref="city"  selectType="3"  class="city" placeholder="选择地址" @selectCallback="selectCallback"></mycity>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>生效时间</label>
                    <div class="input-text">
                        <el-date-picker v-model="obj.takeEffectDate" value-format="yyyy-MM-dd HH:mm:ss"  type="date" placeholder="选择日期" ></el-date-picker>
                        <el-tooltip class="item" effect="dark" content="勾选后将值填写到列表中" placement="top-start">
                            <el-checkbox  v-model="obj.takeEffectDateCheck" @change="setToTable(obj.takeEffectDateCheck,'takeEffectDate',obj.takeEffectDate)"></el-checkbox>
                        </el-tooltip>
                    </div>
                </li>
                <li class="item"  v-show="attributionType==3">
                    <label class="label-term"><em>*</em>计费方式</label>
                    <div class="input-text">
                        <el-select v-model="obj.billingType" placeholder="请选择">
                            <el-option v-for="item in billingTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
                <li class="item" v-show="attributionType==2">
                    <label class="label-term">客户品牌</label>
                    <div class="input-text">
                        <el-select v-model="obj.brandId" value-key="brandId" placeholder="请选择" multiple>
                            <el-option v-for="(item,index) in brandList" :key="index" :label="item.brandName" :value="item"></el-option>
                        </el-select>
                    </div>
                </li>
                <li class="item" v-show="attributionType==2">
                    <label class="label-term"><em>*</em>订单类型</label>
                    <div class="input-text">
                        <el-select v-model="obj.orderType" value-key="codeValue" placeholder="请选择" multiple>
                            <el-option v-for="(item,index) in orderTypeList" :key="index" :label="item.codeName" :value="item"></el-option>
                        </el-select>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">重泡货比</label>
                    <div class="input-text">
                        <el-input v-model="obj.weightCost" maxlength="10" v-mydoubleval></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">送货费单价</label>
                    <div class="input-text">
                        <el-input v-model="obj.deliveryCost" @input="setToTable(obj.deliveryCostCheck,'deliveryCost',obj.deliveryCost)" maxlength="10" v-mydoubleval></el-input>
                        <el-tooltip class="item" effect="dark" content="勾选后将值填写到列表中" placement="top-start">
                            <el-checkbox  v-model="obj.deliveryCostCheck" @change="setToTable(obj.deliveryCostCheck,'deliveryCost',obj.deliveryCost)"></el-checkbox>
                        </el-tooltip>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">提货费单价</label>
                    <div class="input-text">
                        <el-input v-model="obj.pickupCost" @input="setToTable(obj.pickupCostCheck,'pickupCost',obj.pickupCost)" maxlength="10" v-mydoubleval ></el-input>
                        <el-tooltip class="item" effect="dark" content="勾选后将值填写到列表中" placement="top-start">
                            <el-checkbox  v-model="obj.pickupCostCheck" @change="setToTable(obj.pickupCostCheck,'pickupCost',obj.pickupCost)"></el-checkbox>
                        </el-tooltip>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">包装费单价</label>
                    <div class="input-text">
                        <el-input v-model="obj.publicCost" @input="setToTable(obj.publicCostCheck,'publicCost',obj.publicCost)" maxlength="10" v-mydoubleval></el-input>
                        <el-tooltip class="item" effect="dark" content="勾选后将值填写到列表中" placement="top-start">
                            <el-checkbox  v-model="obj.publicCostCheck" @change="setToTable(obj.publicCostCheck,'publicCost',obj.publicCost)"></el-checkbox>
                        </el-tooltip>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">装卸费</label>
                    <div class="input-text">
                        <el-input v-model="obj.handingCost" @input="setToTable(obj.handingCostCheck,'pickupCost',obj.handingCost)" maxlength="10" v-mydoubleval ></el-input>
                        <el-tooltip class="item" effect="dark" content="勾选后将值填写到列表中" placement="top-start">
                            <el-checkbox  v-model="obj.handingCostCheck" @change="setToTable(obj.handingCostCheck,'handingCost',obj.handingCost)"></el-checkbox>
                        </el-tooltip>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">运费最低收费</label>
                    <div class="input-text">
                        <el-input v-model="obj.receiveCost" @input="setToTable(obj.receiveCostCheck,'receiveCost',obj.receiveCost)" maxlength="10" v-mydoubleval></el-input>
                        <el-tooltip class="item" effect="dark" content="勾选后将值填写到列表中" placement="top-start">
                            <el-checkbox  v-model="obj.receiveCostCheck" @change="setToTable(obj.receiveCostCheck,'receiveCost',obj.receiveCost)"></el-checkbox>
                        </el-tooltip>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">其他费</label>
                    <div class="input-text">
                        <el-input v-model="obj.otherCost" @input="setToTable(obj.otherCostCheck,'otherCost',obj.otherCost)" maxlength="11" v-mydoubleval></el-input>
                        <el-tooltip class="item" effect="dark" content="勾选后将值填写到列表中" placement="top-start">
                            <el-checkbox  v-model="obj.otherCostCheck" @change="setToTable(obj.otherCostCheck,'otherCost',obj.otherCost)"></el-checkbox>
                        </el-tooltip>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">保险费率(%)</label>
                    <div class="input-text">
                        <el-input v-model="obj.insuranceCost" maxlength="10" v-mydoubleval ></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">最低保费</label>
                    <div class="input-text">
                        <el-input v-model="obj.lowestCost" maxlength="10" v-mydoubleval ></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>按大小箱计费</label>
                    <div class="input-text">
                        <el-select v-model="obj.boxType" placeholder="请选择" @change="selectBoxType">
                            <el-option v-for="item in boxTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
        </div>
        <ladderTable ref="ladderTable" :head="head" ></ladderTable>
        <div class="bot-btn">
            <el-button type="primary" @click="doSave()" >保存</el-button>
            <el-button type="info" @click="cancel()">取消</el-button>
        </div>
    </div>
</template>

<script>
    import addPriceStandard from './addPriceStandard.js'
    export default addPriceStandard
</script>
<style lang="scss">
.addPriceStandardPage{
    .tableCommon .el-input__inner{
        border:none!important;
    }
    .bot-btn{
        text-align: center;
    }
    .common-info{
        .el-checkbox{
            position: absolute;
            right: 10px;
            top:0;    
        }
    }
}
</style>
