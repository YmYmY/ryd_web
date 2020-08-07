<template>
    <div id="addSuggest" class="addSuggestPage">
        <div class="common-info">
            <h3 class="common-title mb_20"><span class="title-name">建议反馈</span></h3>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>反馈类型</label>
                    <div class="input-text">
                        <el-select v-model="obj.suggestType" placeholder="请选择"  @change="selectType()">
                            <el-option v-for="item in suggestTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix" v-show="isShow">
                <li class="item">
                    <label class="label-term"><em>*</em>关联订单号</label>
                    <div class="input-text">
                        <el-input v-model="obj.orderId" maxlength="30"></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item w_auto">
                    <label class="label-term">建议内容</label>
                    <div class="input-text">
                        <el-input maxlength="200" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入内容" v-model="obj.suggestNote"></el-input>
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
    import addSuggest from './addSuggest.js'
    export default addSuggest
</script>
<style lang="scss">
.addSuggestPage{
    .treeBox{
        border:$border;
        border-bottom: none;
        border-radius: 3px;
        overflow: hidden;
    }
}
</style>