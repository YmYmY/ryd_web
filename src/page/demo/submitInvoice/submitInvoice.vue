<template>
<div id="submitInvoice" class="submitInvoicePage">
    <div class="common-info">
        <h3 class="common-title mb_20">            
            <el-checkbox class="title-name" label="往期运单">往期运单</el-checkbox>            
            <span class="tip">共50单，合计总收入200</span>
        </h3>
        <scrollTable :head="head" ref="table1" height="200"></scrollTable>

        <h3 class="common-title mb_20" style="margin-top:30px;">            
            <el-checkbox class="title-name" label="往期运单">本期运单</el-checkbox>            
            <span class="tip">共100单，合计总收入10000，<em>总运费优惠99折，计9900</em></span>
        </h3>
        <scrollTable :head="head" ref="table2" height="200"></scrollTable>
        
        <h3 class="common-title mb_20" style="margin-top:30px;">            
            <el-checkbox class="title-name" label="往期运单">异常信息</el-checkbox>            
            <span class="tip">共10单，合计总收入-100</span>
        </h3>
        <scrollTable :head="head" ref="table3" height="200"></scrollTable>

        <div class="settlementAmount">
            <h4>结算金额：<em>¥10010</em></h4>
            <div>
                <span>上期运单：</span>
                <el-input type="text"></el-input>
                <span style="margin-right:10px">+</span>
                <span>本期运单(折扣后)：</span>
                <el-input type="text"></el-input>
                <span style="margin-right:10px">+</span>
                <span>异常金额：</span>
                <el-input type="text"></el-input>
                <span style="margin-right:10px">=</span>
                <span>结算总金额：</span>
                <el-input class="red" type="text"></el-input>
            </div>
            <div class="bot-btn">
                <el-button type="info">取消</el-button>
                <el-button type="primary">确认提交</el-button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import submitInvoice from './submitInvoice.js'
export default submitInvoice
</script>

<style lang="scss">
.submitInvoicePage{
    position: relative;
    .common-title{
        margin-bottom: 0;
        padding:10px 5px;
        .title-name{
            padding-left: 10px;
            &::before{
                display: none;
            }
            .el-checkbox__label{
                padding-left: 5px;
            }
        }
        .tip{
            margin-left: 10px;
            em{
                font-weight: bold;
            }
        }
    }
    .table_height{
        border-left: $border;
    }
    .settlementAmount{
        margin-top: 20px;
        h4{
            font-weight: bold;
            font-size: 14px;
            line-height: 40px;
        }
        .el-input{
            display: inline-block;
            width: 100px;
            padding:0 10px;
            .el-input__inner{
                height: 30px;
            }
        }
    }
}
</style>