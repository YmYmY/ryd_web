<template>
    <div id="auditSet" class="auditSetPage">
        <div class="orderAudit">
            <div class="audit-title">
                <span class="title">运单审核</span>
                <el-radio-group v-model="radio">
                    <el-radio label="0">开启</el-radio>
                    <el-radio label="1">关闭</el-radio>
                </el-radio-group>
            </div>
            <div class="tip">注：用户可以选择以下任意一种审核方式，保存后即时生效</div>
            <div class="auditList">
                <div class="item">
                    <div>
                        <el-radio label="0" v-model="auditCheck">
                            <span class="title">按运单来源</span> <span>（只根据运单来源进行统一配置）</span>
                        </el-radio>
                    </div>
                    <div class="group">
                        <el-checkbox-group v-model="checkList">
                            <el-checkbox label="0">客户端PC端</el-checkbox>
                            <el-checkbox label="1">客户端小程序</el-checkbox>
                            <el-checkbox label="2">接口对接运单</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
                <div class="item">
                    <div>
                        <el-radio label="1" v-model="auditCheck">
                            <span class="title">按运单类型</span> <span>（只根据运单类型进行统一配置）</span>
                        </el-radio>
                    </div>
                    <div class="group">
                        <el-checkbox-group v-model="checkList">
                            <el-checkbox label="0">仓库始发</el-checkbox>
                            <el-checkbox label="1">任意调拨</el-checkbox>
                            <el-checkbox label="2">逆向回货</el-checkbox>
                            <el-checkbox label="3">工厂直发</el-checkbox>
                            <el-checkbox label="4">电商云仓</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
                <div class="item">
                    <div>
                        <el-radio label="2" v-model="auditCheck">
                            <span class="title">按运单归属</span> <span>（分别对自营、非自营运单进行统一配置）</span>
                        </el-radio>
                    </div>
                </div>
            </div>
            <div class="audit-title">
                <span class="title">二  三方店铺结算自动审核</span>
                <el-radio-group v-model="radio">
                    <el-radio label="0">开启</el-radio>
                    <el-radio label="1">关闭</el-radio>
                </el-radio-group>
            </div>
            <div class="tip">
                注：1、用户勾选了开启自动审核，则店铺下单时选择了三方结算会自动审核通过<br>
                <span style="margin-left:24px;">2、用户勾选了开启自动审核，则店铺下单时选择了三方结算会自动审核通过</span>
            </div>
        </div>
        <div class="page-bot-btn">
            <el-button type="primary">保存</el-button>
            <el-button type="info">取消</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'auditSet',
        data() {
            return {
                checkList:[],
                radio:'0',
                auditCheck:'0',
            }
        },
        mounted() {
            
        },
        methods: {
            
        },
        components: {
            
        },
    }
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