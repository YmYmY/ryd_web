<template>
    <div id="addSysProductVehicle" class="addSysProductVehiclePage">
        <div class="common-info">
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>归属地</label>
                    <div class="input-text fl">
                        <mycity  ref="city"  selectType="3"  class="city" placeholder="选择地址" @selectCallback="selectCallback"></mycity>
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
        <div class="table_height">
            <table class="tableCommon" width="100%" border="0" cellspacing="0" cellpadding="0">
                <thead>
                <tr>
                    <th width="100">车型</th>
                    <th width="100">载重（公斤）</th>
                    <th width="100">体积 (方)</th>
                    <th width="100"><em>*</em>起步价 (元)</th>
                    <th width="100"><em>*</em>包含公里数</th>
                    <th width="100"><em>*</em>超里程（元/公里）</th>
                    <th width="100">备注</th>
                    <th width="150">生效时间</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in vehicleCodeList" :key="item.codeValue">
                    <td width="100">{{item.codeName}}</td>
                    <td width="100"><el-input v-model="item.loadOnline" maxlength="10" v-mydoubleval></el-input></td>
                    <td width="100"><el-input v-model="item.volumeCost" maxlength="10" v-mydoubleval></el-input></td>
                    <td width="100"><el-input v-model="item.startFee" maxlength="10" v-mydoubleval></el-input></td>
                    <td width="100"><el-input v-model="item.includeKilometers" maxlength="10" v-mydoubleval></el-input></td>
                    <td width="100"><el-input v-model="item.overMileage" maxlength="10" v-mydoubleval></el-input></td>
                    <td width="100"><el-input v-model="item.vehicleNote" maxlength="120" ></el-input></td>
                    <td width="150"><el-date-picker v-model="item.takeEffectDate"  value-format="yyyy-MM-dd HH:mm:ss"  type="date" placeholder="选择日期"></el-date-picker></td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="page-bot-btn">
            <el-button type="primary" @click="doSave()">保存</el-button>
            <el-button type="info" @click="cancel()">取消</el-button>
        </div>
    </div>
</template>

<script>
    import addSysProductVehicle from './addSysProductVehicle.js'
    export default addSysProductVehicle
</script>
<style lang="scss">
.addSysProductVehiclePage{
    .tableCommon{
        .el-input__inner{            
            border:none;
        }
        .area{
            .el-input{
                width:40%;
                margin: 0 3px;
                .el-input__inner{
                    height: 30px;
                    line-height: 30px;
                    border-bottom: $border;
                }
            }
        }
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