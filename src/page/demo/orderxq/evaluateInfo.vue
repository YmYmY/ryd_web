<template>
    <div id="evaluateInfo"  class="evaluateInfoPage">
        <div class="evaluate">
            <h3 class="grade">{{rate}}分</h3>
            <el-rate v-model="rate" disabled="true"></el-rate>
        </div>
        <h3 class="common-title mb_20 mt_20"><span class="title-name">评价他的</span></h3>
        <ul class="evaluateList clearfix">
            <li class="clearfix">
                <img class="evaluateHeader" src="@/static/image/$tenantId$/uesrhead.png" alt="">
                <div class="info fr">
                    <div class="rate-box clearfix">
                        <el-rate v-model="rate" class="fl" disabled="true"></el-rate>
                        <span class="fr">2019-04-11  15:30</span>
                    </div>
                    <div class="msg">
                        师傅挺好的，主动搬货。开车稳当，线路熟悉。4分好评
                    </div>
                </div>
            </li>
            <li class="clearfix">
                <img class="evaluateHeader" src="@/static/image/$tenantId$/uesrhead.png" alt="">
                <div class="info fr">
                    <div class="rate-box clearfix">
                        <el-rate v-model="rate" class="fl" disabled="true"></el-rate>
                        <span class="fr">2019-04-11  15:30</span>
                    </div>
                    <div class="msg">
                        师傅挺好的，主动搬货。开车稳当，线路熟悉。4分好评
                    </div>
                </div>
            </li>
            <li class="clearfix">
                <img class="evaluateHeader" src="@/static/image/$tenantId$/uesrhead.png" alt="">
                <div class="info fr">
                    <div class="rate-box clearfix">
                        <el-rate v-model="rate" class="fl" disabled="true"></el-rate>
                        <span class="fr">2019-04-11  15:30</span>
                    </div>
                    <div class="msg">
                        师傅挺好的，主动搬货。开车稳当，线路熟悉。4分好评
                    </div>
                </div>
            </li>
        </ul>
        <h3 class="common-title mb_20"><span class="title-name">他评价的</span></h3>
        <ul class="evaluateList clearfix">
            <li class="clearfix">
                <img class="evaluateHeader" src="@/static/image/$tenantId$/uesrhead.png" alt="">
                <div class="info fr">
                    <div class="rate-box clearfix">
                        <el-rate v-model="rate" class="fl" disabled="true"></el-rate>
                        <span class="fr">2019-04-11  15:30</span>
                    </div>
                    <div class="msg">
                        师傅挺好的，主动搬货。开车稳当，线路熟悉。4分好评
                    </div>
                </div>
            </li>
            <li class="clearfix">
                <img class="evaluateHeader" src="@/static/image/$tenantId$/uesrhead.png" alt="">
                <div class="info fr">
                    <div class="rate-box clearfix">
                        <el-rate v-model="rate" class="fl" disabled="true"></el-rate>
                        <span class="fr">2019-04-11  15:30</span>
                    </div>
                    <div class="msg">
                        师傅挺好的，主动搬货。开车稳当，线路熟悉。4分好评
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'evaluateInfo',
        data() {
            return {
                rate:3.5,
            }
        },
        mounted() { 
            
        },
        methods: {
            
        },
    }
</script>
<style lang="scss">
.evaluateInfoPage{
    padding:0 30px;
    background: #fff;
    .evaluate{
        padding-top: 30px;
        .grade{
            font-size: 48px;
            line-height: 50px;
            font-weight: bold;
            text-align: center;
            color: $main-color;
            margin-bottom: 10px;
        }
    }
    .evaluateList{
        padding-bottom: 10px;
        li{
            padding:35px 20px;
            float: left;
            width: 48%;
            border:$border;
            box-sizing: border-box;
            margin-right: 4%;
            margin-bottom: 20px;
            border-radius: 3px;
            &:nth-child(even){
                margin-right: 0;
            }
            .evaluateHeader{
                float: left;
                width: 70px;
                height: 70px;
                border-radius: 50%;
            }
            .info{
                float:right;
                width: calc(100% - 90px);
                .rate-box{
                    padding: 5px 0 10px;
                    line-height: 24px;
                }
                .rate{
                    font-size: 24px;
                }
            }
            .msg{
                font-size: 14px;
                text-align: justify;
                word-break: break-all;
            }
        }
    }
    .el-rate{
        text-align: center;
    }
    .el-rate__icon {
        font-size: 24px;
    }
}
</style>