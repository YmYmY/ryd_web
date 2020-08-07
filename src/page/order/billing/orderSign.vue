<template>
    <div id="orderSign" class="orderSignPage">
        <div class="common-info">
            <h3 class="common-title mb_20"><span class="title-name">签收日志</span></h3>
            <ul class="content content-text clearfix">
                <li class="item">
                    <label class="label-term">签收备注:</label>
                    <div class="input-text">
                        {{orderSign.remarks}}
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">签收时间:</label>
                    <div class="input-text">
                        {{orderSign.signDate}}
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">供应商:</label>
                    <div class="input-text">
                        {{orderSign.supplierTenantName}}
                    </div>
                </li>
            </ul>
            <h3 class="common-title mb_20 mt_20"><span class="title-name">签收凭证</span></h3>
            <div class="imgList clearfix">
                <div class="img-item fl" v-for="(list,index) in imgList" :key="index">
                    <myFileModel :ref="list.code"></myFileModel>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import orderSign from './orderSign.js'
    export default orderSign
</script>
<style lang="scss">
    .orderSignPage{
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