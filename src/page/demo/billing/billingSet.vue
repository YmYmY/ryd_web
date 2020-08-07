<template>
  <div id="billingSet">
    <div class="billingPage">
        <div class="feeTotal clearfix">
            <h5>运费合计</h5>
            <span class="symbol">=</span>
            <el-checkbox>运费</el-checkbox>
            <span class="symbol">+</span>
            <el-checkbox>送货费</el-checkbox>
            <span class="symbol">+</span>
            <el-checkbox>提货费</el-checkbox>
            <span class="symbol">+</span>
            <el-checkbox>装卸费</el-checkbox>
            <span class="symbol">+</span>
            <el-checkbox>包装费</el-checkbox>
            <span class="symbol">+</span>
            <el-checkbox>代收手续费</el-checkbox>
            <span class="symbol">+</span>
            <el-checkbox>代收手续费</el-checkbox>
            <span class="symbol">+</span>
            <el-checkbox>其他费</el-checkbox>
        </div>
        <div class="common-info">
            <div class="feeSet-item">
                <div class="title"><span class="name">报价费</span></div>
                <div class="list">
                    <ul class="content clearfix">
                        <li class="item">
                            <label class="label-term">最大保价</label>
                            <div class="input-text">
                                <el-input v-model="inputvalue"></el-input>
                                <span class="unit">元</span>
                            </div>
                        </li>
                        <li class="item">
                            <label class="label-term">保险费率</label>
                            <div class="input-text">
                                <el-input v-model="inputvalue"></el-input>
                                <span class="unit">%</span>
                            </div>
                        </li>
                        <li class="item">
                            <label class="label-term">最低保费</label>
                            <div class="input-text">
                                <el-input v-model="inputvalue"></el-input>
                                <span class="unit">元</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="feeSet-item">
                <div class="title"><span class="name">代收货款</span></div>
                <div class="list">
                    <ul class="content clearfix">
                        <li class="item">
                            <label class="label-term">最大金额</label>
                            <div class="input-text">
                                <el-input v-model="inputvalue"></el-input>
                                <span class="unit">元</span>
                            </div>
                        </li>
                        <li class="item">
                            <label class="label-term">手续费</label>
                            <div class="input-text">
                                <el-input v-model="inputvalue"></el-input>
                                <span class="unit">%</span>
                            </div>
                        </li>
                        <li class="item">
                            <label class="label-term">最低收费</label>
                            <div class="input-text">
                                <el-input v-model="inputvalue"></el-input>
                                <span class="unit">元</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="feeSet-item">
                <div class="title"><span class="name">默认设置</span></div>
                <div class="list">
                    <ul class="content clearfix">
                        <li class="item">
                            <label class="label-term">订单类型</label>
                            <div class="input-text">
                                <el-select v-model="selectvalue"></el-select>
                            </div>
                        </li>
                        <li class="item">
                            <label class="label-term">前端交货方式</label>
                            <div class="input-text">
                                <el-select v-model="selectvalue"></el-select>
                            </div>
                        </li>
                        <li class="item">
                            <label class="label-term">末端交货方式</label>
                            <div class="input-text">
                                <el-select v-model="selectvalue"></el-select>
                            </div>
                        </li>
                        <li class="item">
                            <label class="label-term">提货区间</label>
                            <div class="input-text">
                                <el-input v-model="inputvalue"></el-input>
                            </div>
                        </li>
                        <li class="item">
                            <label class="label-term">结算方式</label>
                            <div class="input-text">
                                <el-select v-model="selectvalue"></el-select>
                            </div>
                        </li>
                        <li class="item">
                            <label class="label-term">其他费命名</label>
                            <div class="input-text">
                                <el-input v-model="inputvalue"></el-input>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>    
    <div class="page-bot-btn">
        <el-button type="primary" @click="doSomeThing()">保存</el-button>
        <el-button type="info">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
    name: 'billingSet',
    data(){
        return{
            inputvalue:"",
            selectvalue:"",
        }
    },
    mounted(){
        
    },
    methods:{
        
    },
}
</script>

<style lang="scss">
    .billingPage{
        padding: 30px;
        background: #fff;
        .feeTotal{
            padding:0 25px;
            border:$border;
            border-radius: 5px;
            h5{
                line-height: 60px;
                font-weight: bold;
                margin-right: 20px;
                float: left;
            }
            .el-checkbox{
                line-height: 60px;
                float: left;
                margin-right: 15px;
            }
            .symbol{
                float: left;
                font-weight: bold;
                line-height: 60px;
                font-size: 16px;
                margin-right: 15px;
            }
        }
        .common-info{
            padding:0;
            border:$border;
            border-radius: 5px;
            margin-top: 20px;
            .feeSet-item{
                position: relative;
                padding: 13px 10px 3px 105px;
                border-bottom: $border;
                &:last-child{
                    border:none;
                }
                .title{
                    position: absolute;
                    left: 0;
                    top:0;
                    height: 100%;
                    background: $bg-color;
                    font-weight: bold;
                    width: 90px;
                    border-right: $border;
                    text-align: center;
                    .name{
                        position: absolute;
                        top: 50%;
                        width: 100%;
                        left: 0;
                        margin-top: -10px;
                    }
                }
            }
            .content{
                >.item{
                    width:30%;
                }
            }
        }
    }
</style>
