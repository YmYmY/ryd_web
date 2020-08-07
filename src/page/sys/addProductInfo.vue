<template>
    <div id="addProductInfo" class="addProductInfoPage">
        <div class="common-info">
            <h3 class="common-title mb_20"><span class="title-name">产品维护</span></h3>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>产品名称</label>
                    <div class="input-text">
                        <el-select v-model="obj.productType" placeholder="请选择">
                            <el-option v-for="item in productTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">截止收件时间</label>
                    <div class="input-text">
                        <el-time-picker v-model="obj.cutoffDate" placeholder="选择时间" value-format="HH:mm:ss"></el-time-picker>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item w_auto">
                    <label class="label-term">产品介绍</label>
                    <div class="input-text">
                        <el-input maxlength="200" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入内容" v-model="obj.productIntroduction"></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term">推荐设置</label>
                    <div class="input-text">
                        <el-input placeholder="重量最小值（公斤）" v-model="obj.weightMin"   maxlength="11" v-mydoubleval></el-input>
                    </div>
                </li>
                <li class="item">
                    <div class="input-text">
                        <el-input placeholder="重量最大值（公斤）" v-model="obj.weightMax"   maxlength="11" v-mydoubleval></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"></label>
                    <div class="input-text">
                        <el-input placeholder="体积最小值（方）" v-model="obj.volumeMin"   maxlength="11" v-mydoubleval></el-input>
                    </div>
                </li>
                <li class="item">
                    <div class="input-text">
                        <el-input placeholder="体积最大值（方）" v-model="obj.volumeMax"   maxlength="11" v-mydoubleval></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item w_auto">
                    <label class="label-term">服务定价</label>
                    <div class="input-text">
                        <el-input maxlength="200" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入内容" v-model="obj.productPricing"></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item w_auto">
                    <label class="label-term">服务区域</label>
                    <div class="input-text">
                        <el-input maxlength="200" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入内容" v-model="obj.productRegion"></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item w_auto">
                    <label class="label-term">其他说明</label>
                    <div class="input-text">
                        <el-input maxlength="200" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入内容" v-model="obj.remark"></el-input>
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
    import addProductInfo from './addProductInfo.js'
    export default addProductInfo
</script>
<style lang="scss">
.addProductInfoPage{
    .treeBox{
        border:$border;
        border-bottom: none;
        border-radius: 3px;
        overflow: hidden;
    }
}
</style>