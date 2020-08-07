<template>
    <div id="addTrackSettings">
        <div class="common-info">
            <h3 class="common-title mb_20"><span class="title-name">轨迹配置</span></h3>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term"><em>*</em>消费主体</label>
                    <div class="input-text">
                        <el-select v-model="obj.mainId" value-key="tenantId" placeholder="请选择" filterable>
                            <el-option v-for="(item,index) in tenantList" :key="index" :label="item.tenantFullName" :value="item.tenantId"></el-option>
                        </el-select>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>接口名称</label>
                    <div class="input-text">
                        <el-select v-model="obj.interfaceType" placeholder="请选择">
                            <el-option v-for="item in interfaceTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix" >
                <li class="item" >
                    <label class="label-term"><em>*</em>车牌号码</label>
                    <div class="input-text">
                        <el-input v-model="obj.vehicleCode"   maxlength="10"></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>车牌颜色</label>
                    <div class="input-text">
                        <el-select v-model="obj.licensePlateColor" placeholder="请选择">
                            <el-option v-for="item in licensePlateColorList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term"><em>*</em>获取月份</label>
                    <div class="input-text">
                        <el-select v-model="obj.getMonth" value-key="tenantId" placeholder="请选择" multiple collapse-tags>
                            <el-option v-for="(item,index) in yearMonthsList" :key="index" :label="item.codeValue" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
                <li class="item w_auto">
                    <label class="label-term">车辆描述</label>
                    <div class="input-text">
                        <el-input  maxlength="200" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入内容"  v-model="obj.remarks"></el-input>
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
    import addTrackSettings from './addTrackSettings.js'
    export default addTrackSettings
</script>