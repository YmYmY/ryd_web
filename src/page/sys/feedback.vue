<template>
    <div id="feedback" class="feedbackPage">
        <div class="search-list clearfix">
            <div class="search-form clearfix">
                <div class="item">
                    <label class="label">反馈时间</label>
                    <div class="input-text">
                        <dataPicker :model="obj.suggestDate" @callback="data=>{obj.suggestDate=data}" startPlaceholder="开始" endPlaceholder="结束"></dataPicker>
                    </div>
                </div>
                <div class="item">
                    <label class="label">反馈类型</label>
                    <div class="input-text">
                        <el-select v-model="obj.suggestType" placeholder="请选择">
                            <el-option v-for="item in suggestTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <label class="label">联系手机:</label>
                    <div class="input-text">
                        <el-input v-model="obj.suggestPhone" placeholder="请输入"></el-input>
                    </div>
                </div>
            </div>
            <div class="search-btn clearfix">
                <div class="btn">
                    <el-button type="primary" @click="doQueyFeedback()" plain size="mini" icon="el-icon-search">搜索</el-button>
                </div>
                <div class="btn">
                    <el-button type="danger" @click="clear()" plain size="mini" icon="el-icon-close">清空</el-button>
                </div>
            </div>
        </div>
        <div class="table-content">
            <div class="table-title">
                <h3>
                    <span>意见反馈列表</span>
                    <el-tooltip effect="light" content="意见反馈列表" placement="right">
                        <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
                    </el-tooltip>
                </h3>
                <div class="table-title-btn">
                    <el-button type="primary" v-entity="181" @click="addFeedback()" plain size="mini">意见处理</el-button>
                    <el-button type="primary" v-entity="182" @click="deleteSuggest()" plain size="mini">删除</el-button>
                    <el-button type="primary" v-entity="183" @click="downloadExcelFile()" plain size="mini">导出</el-button>
                </div>
            </div>
            <tableCommon tableName="suggestInfoTable" ref="table" :head="head" :showNum="true"></tableCommon>
        </div>
    </div>
</template>


<script>
    import feedback from './feedback.js'
    export default feedback
</script>
<style lang="scss">
.feedbackPage{
    .el-dialog__body{
        padding:10px 20px 0;
        .areaList{
            margin-top:20px;
        }
        .el-checkbox{
            margin-bottom:15px;
        }
        .areaDefault{
            width: 100%;
            margin-bottom: 20px;
            .label-term{
                line-height: 40px;
                margin-right: 15px;
            }
        }
    }
    .el-dialog__footer{
        text-align: center;
    }
}
</style>