<template>
    <div id="orderTrack" class="orderTrackPage">
        <div class="orderTab clearfix">
            <div class="item" :class="item.active?'active':''" v-for="(item,index) in orderTrackList"
             :key="index" @click="changeTab(item)" >
                {{item.transitTrackingNum}}
                </div>
            <!-- <div class="item">1230923</div>
            <div class="item">1230923</div> -->
        </div>
        <baidu-map class="bm-view"  :center="center" :zoom="zoom"></baidu-map>
        <div class="track">
            <h4>结果轨迹
                <i class="el-icon-arrow-down" v-show="showTrackList" @click="isShowTrack"></i>
                <i class="el-icon-arrow-up" v-show="!showTrackList" @click="isShowTrack"></i>
            </h4>
            <ul class="trackList" v-show="showTrackList">
                <li :class="{'first':index == 0}" v-for="(item,index) in orderTrack" :key="index">
                    <p>{{item.trackingDate}}</p>
                    <p>{{item.content}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import orderTrack from './orderTrack.js'
    export default orderTrack
</script>
<style lang="scss">
    .orderTrackPage{
        width: 100%;
        height: 100%;
        position: relative;
        .orderTab{
            border-top: $border;
            border-left: $border;
            background: #fff;
            .item{
                float: left;
                line-height: 40px;
                padding: 0 15px;
                border-right: $border;
                cursor:pointer;
                &.active{
                    // color:$main-color;
                    background: $hover-color;
                }
                &:hover{
                    background: $focus-color;
                }
            }
        }
        .bm-view{
            height: 600px;
            width: 100%;
        }
        .track{
            position: absolute;
            top:20px;
            right:30px;
            background: #fff;
            z-index: 999;
            padding:30px 0 50px 30px;
            width: 300px;
            box-shadow: 0 0 5px rgba(0,0,0,0.3);
            h4{
                font-weight: bold;
                font-size: 16px;
                padding-right: 30px;
                .el-icon-arrow-down,.el-icon-arrow-up{
                    color: $main-color;
                    float: right;
                    font-size: 20px;
                    font-weight: bold;
                    cursor: pointer;
                }
            }
            .trackList{
                margin-top: 20px;
                max-height: 300px;
                overflow-y:auto;
                position: relative;
                &::before,&::after{
                    content: "";
                    height: calc(100% - 60px);
                    width: 1px;
                    background: $border-color;
                    position: absolute;
                    left: 5px;
                    top: 20px;
                }
                &::after{
                    left:10px;
                }
                li{
                    padding: 0 10px 0 30px;
                    position: relative;
                    margin-bottom: 20px;
                    z-index: 99;
                    &::after{
                        content: '';
                        width:14px;
                        height: 14px;
                        border:$border;
                        border-radius: 50%;
                        position: absolute;
                        left: 0;
                        top:50%;
                        margin-top: -8px;
                        background: #fff;
                        z-index: 9;
                    }
                    &::before{
                        content: '';
                        width:8px;
                        height: 8px;
                        background:$border-color;
                        border-radius: 50%;
                        position: absolute;
                        left: 4px;
                        top:50%;
                        margin-top: -4px;
                        z-index: 99;
                    }
                }
                li.first{
                    &::before{
                        background: $tip-color;
                    }
                    &::after{
                        border-color: $tip-color;
                    }
                    p{
                        color:$tip-color;
                    }
                }
            }
        }
    }
</style>