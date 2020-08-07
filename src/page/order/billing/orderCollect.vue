<template>
    <div id="orderCollect" class="orderCollectPage">
        <div class="common-info">
            <h3 class="common-title mb_20"><span class="title-name">销售专员信息</span></h3>
            <ul class="content content-text clearfix">
                <li class="item">
                    <label class="label-term">揽件销售专员:</label>
                    <div class="input-text">
                        张三/13813901993
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">揽收时间:</label>
                    <div class="input-text">
                        2019-6-28 12：00
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">供应商:</label>
                    <div class="input-text">
                        韵达快递
                    </div>
                </li>
            </ul>
            <h3 class="common-title mb_20"><span class="title-name">揽收信息</span></h3>
            <table class="tableCommon" width="100%" border="0" cellspacing="0" cellpadding="0">
                <thead>
                <tr>
                    <th width="100">操作节点</th>
                    <th width="100">操作时间</th>
                    <th width="100">件数</th>
                    <th width="100">体积（方）</th>
                    <th width="300">重量（公斤）</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td width="100">干线配载</td>
                    <td width="100">123</td>
                    <td width="100">166</td>
                    <td width="100">广州区域</td>
                    <td width="100">东莞区域、厦门区域、杭州区域</td>
                </tr>
                </tbody>
            </table>
            <h3 class="common-title mb_20 mt_20"><span class="title-name">揽收凭证</span></h3>
            <div class="imgList clearfix">
                <div class="img-item fl" v-for="(list,index) in imgList" :key="index">
                    <myFileModel :ref="list.code"></myFileModel>
                </div>
            </div>
            <h3 class="common-title mb_20"><span class="title-name">揽收备注</span></h3>
            <ul class="content content-text clearfix">
                <li class="item item100">
                    <el-input type="textarea"></el-input>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import orderCollect from './orderCollect.js'
    export default orderCollect
</script>
<style lang="scss">
    .orderCollectPage{
        .imgList{
            .img-item{
                margin:0 20px 20px 0;
            }
        }
        .el-textarea__inner{
            width: 100%!important;
        }
    }
</style>