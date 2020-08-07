<template>
    <div id="addSysProductLogistics" class="addSysProductLogisticsPage">
        <div class="common-info">
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>出发地</label>
                    <div class="input-text fl">
                        <mycity  ref="city"  selectType="3"  class="city" placeholder="选择地址" @selectCallback="selectCallback"></mycity>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">取件时效</label>
                    <div class="input-text">
                        <el-input v-model="obj.agingNum"    maxlength="10" v-mynumval ></el-input>
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
                    <label class="label-term">生效时间</label>
                    <div class="input-text">
                        <el-date-picker v-model="obj.takeEffectDate" value-format="yyyy-MM-dd HH:mm:ss"  type="date" placeholder="选择日期" ></el-date-picker>
                        <el-tooltip class="item" effect="dark" content="勾选后将值填写到列表中" placement="top-start">
                            <el-checkbox  v-model="obj.takeEffectDateCheck" @change="setToTable(obj.takeEffectDateCheck,'takeEffectDate',obj.takeEffectDate)"></el-checkbox>
                        </el-tooltip>

                    </div>
                </li>
            </ul>
        </div>
        <ladderTable ref="ladderTable" :head="head"   @areaCallback="areaCallback"></ladderTable>
        <div class="page-bot-btn">
            <el-button type="primary" @click="doSave()">保存</el-button>
            <el-button type="info" @click="cancel()">取消</el-button>
        </div>
    </div>
</template>

<script>
    import addSysProductLogistics from './addSysProductLogistics.js'
    export default addSysProductLogistics
</script>
<style lang="scss">
.addSysProductLogisticsPage{
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