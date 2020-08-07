<template>
    <div id="addFeedback" class="addFeedbackPage">
        <div class="common-info">
            <h3 class="common-title mb_20"><span class="title-name">建议内容</span></h3>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term">建议人</label>
                    <div class="input-text">
                        <span>{{obj.suggestName}}</span>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">联系电话</label>
                    <div class="input-text">
                        <span>{{obj.suggestPhone}}</span>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term">建议时间</label>
                    <div class="input-text">
                        <span>{{obj.suggestDate}}</span>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">关联单号</label>
                    <div class="input-text">
                        <span>{{obj.orderId}}</span>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item w_auto">
                    <label class="label-term">建议内容</label>
                    <div class="input-text">
                        <span>{{obj.suggestNote}}</span>
                    </div>
                </li>
            </ul>
            <h3 class="common-title mb_20"><span class="title-name">建议处理</span></h3>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>处理结果</label>
                    <div class="input-text">
                        <el-select v-model="suggestState" placeholder="请选择">
                            <el-option v-for="item in suggestStateList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item w_auto">
                    <label class="label-term">处理描述</label>
                    <div class="input-text">
                        <el-input maxlength="200" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入内容" v-model="handlerNote"></el-input>
                    </div>
                </li>
            </ul>
            <h3 class="common-title mb_20"><span class="title-name">处理记录</span></h3>
            <div class="table-content">
                <div class="table-title">
                    <h3>
                        <span>处理记录列表</span>
                        <el-tooltip effect="light" content="处理记录列表" placement="right">
                            <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
                        </el-tooltip>
                    </h3>
                    <div class="table-title-btn">
                    </div>
                </div>
                <tableCommon tableName="addFeedbackTable" ref="table" :head="head" :showNum="true"></tableCommon>
            </div>
            <div class="bot-btn">
                <el-button type="primary" @click="doSave()">保存</el-button>
                <el-button type="info" @click="cancel()">取消</el-button>
            </div>
        </div>
    </div>
</template>



<script>
    import addFeedback from './addFeedback.js'
    export default addFeedback
</script>
<style lang="scss">
.addFeedbackPage{
    .treeBox{
        border:$border;
        border-bottom: none;
        border-radius: 3px;
        overflow: hidden;
    }
}
</style>