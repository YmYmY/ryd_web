<template>
    <div id="auditSettings" class="auditSetPage">
        <div class="orderAudit">
            <div class="audit-title">
                <span class="title">运单审核</span>
                <el-radio-group v-model="orderAudit" @change="showAudit">
                    <el-radio   label="1">开启</el-radio>
                    <el-radio   label="2">关闭</el-radio>
                </el-radio-group>
            </div>
            <div v-show="orderAuditShow" class="tip">运单审核：
                释义:对于流入系统平台的运单，各用户可以自定义是否开启审核功能，也可以通过不同方式配置自动审核。<br>
                注：用户可以选择以下任意一种审核方式，保存后即时生效</div>
            <div v-show="orderAuditShow" class="auditList">
                <div class="item">
                    <div>
                        <el-radio label="1" v-model="orderType" @change="cancelType">
                            <span class="title">按运单来源</span> <span>（只根据运单来源进行统一配置）</span>
                        </el-radio>
                    </div>
                    <div class="group">
                        <el-checkbox-group v-model="orderSourceList" v-bind:disabled="orderType!='1'">
                            <el-checkbox label="4">客户端PC端</el-checkbox>
                            <el-checkbox label="3">客户端小程序</el-checkbox>
                            <el-checkbox label="1">接口对接运单</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
                <div class="item">
                    <div>
                        <el-radio label="2" v-model="orderType" @change="cancelType">
                            <span class="title">按运单类型</span> <span>（只根据运单类型进行统一配置）</span>
                        </el-radio>
                    </div>
                    <div class="group">
                        <el-checkbox-group v-model="orderTypeList" v-bind:disabled="orderType!='2'">
                            <el-checkbox label="1">仓库始发</el-checkbox>
                            <el-checkbox label="2">任意调拨</el-checkbox>
                            <el-checkbox label="3">逆向回货</el-checkbox>
                            <el-checkbox label="4">工厂直发</el-checkbox>
                            <el-checkbox label="5">电商云仓</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
                <div class="item">
                    <div>
                        <el-radio label="3" v-model="orderType" @change="cancelType">
                            <span class="title">按运单归属</span> <span>（分别对自营、非自营运单进行统一配置）</span>
                        </el-radio>
                    </div>
                    <div class="group">
                        <el-checkbox-group v-model="orderAttributionList" v-bind:disabled="orderType!='3'">
                            <el-checkbox label="1">直营运单</el-checkbox>
                            <el-checkbox label="2">非自营运单</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
            </div>
            <div class="tip">
                释义：三方店铺结算指的是店铺在调货时出现了由A店发往B店，但是由C店进行物流费用结算，
                主要用以准确统计财务数据，请根据自身业务准确选择。<br>
                注意：若您开启了结算审核，则下单界面会出现三方结算选项<br>
                <span>打开自动审核通过，则不需要用户点击确认，下单即立即通过审核；关闭自动审核通过，第三方店铺手动确认通过。</span>
            </div>
            <div class="audit-title">
                <span class="title">三方店铺结算</span>
                <el-radio-group v-model="shopSettlement">
                    <el-radio label="1">开启</el-radio>
                    <el-radio label="2">关闭</el-radio>
                </el-radio-group>
            </div>
            <div class="audit-title">
                <span class="title">三方店铺结算自动审核</span>
                <el-radio-group v-model="shopAudit">
                    <el-radio label="1">开启</el-radio>
                    <el-radio label="2">关闭</el-radio>
                </el-radio-group>
            </div>
        </div>
        <div class="page-bot-btn">
            <el-button type="primary" @click="doSave">{{button}}</el-button>
            <el-button type="info" @click="cancel">取消</el-button>
        </div>
    </div>
</template>


<script>
    import auditSettings from './auditSettings.js'
    export default auditSettings
</script>
<style lang="scss">
    .auditSetPage{
        padding:10px 30px;
        background: #fff;
        .orderAudit{
            .audit-title{
                line-height: 60px;
                padding:0 30px;
                border-bottom: $border;
                .title{
                    font-size: 14px;
                    font-weight: 700;
                    margin-right: 20px;
                }
            }
            .tip{
                color: red;
                background: #ffffcc;
                padding: 5px 30px;
                line-height: 24px;
            }
            .auditList{
                padding:0 30px;
                border-bottom: $border;
                .item{
                    padding: 20px 0;
                    border-bottom: $border;
                }
                .item:last-child{
                    border:none;
                }
                .title{
                    line-height: 32px;
                    font-size: 14px;
                    font-weight: 700;
                    span{
                        font-size: 12px;
                        font-weight: normal;
                    }
                }
                .group{
                    padding-left: 20px;
                    .el-checkbox{
                        display: block;
                        line-height: 34px;
                    }
                }
            }
        }
    }
</style>