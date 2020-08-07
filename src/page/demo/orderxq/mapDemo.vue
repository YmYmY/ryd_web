<template>
  <div id="map" class="mapdemo">
      <baidu-map class="bm-view"  :center="center" :zoom="zoom"></baidu-map>
      <div class="trackSchedule">
          <h4>结果轨迹
              <i class="el-icon-arrow-down" v-show="showTrackList" @click="isShowTrack"></i>
              <i class="el-icon-arrow-up" v-show="!showTrackList" @click="isShowTrack"></i>
            </h4>
          <ul class="trackList" v-show="showTrackList">
              <li>
                  <p>2018-09-28  16:28:15</p>
                  <p>货物已全部签收完成</p>
              </li>
              <li>
                  <p>2018-09-28  16:28:15</p>
                  <p>货物已全部签收完成</p>
              </li>
              <li>
                  <p>2018-09-28  16:28:15</p>
                  <p>货物已全部签收完成</p>
              </li>
              <li class="first">
                  <p>2018-09-28  16:28:15</p>
                  <p>货物已全部签收完成</p>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
    name: 'map',
    data() {
        return {
            showTrackList:true,
            center: {lng: 116.404, lat: 39.915},
            zoom: 15
        }
    },
    methods:{
        isShowTrack(){
            this.showTrackList = this.showTrackList?false:true;
        }
    },
    components:{

    }
}
</script>
<style lang="scss">
.mapdemo{
    width: 100%;
    height: 100%;
    position: relative;
    .bm-view{
        height: 600px;
        width: 100%;
    }
    .trackSchedule{
        position: absolute;
        top:20px;
        right:30px;
        background: #fff;
        z-index: 999;
        padding:30px 50px;
        width: 300px;
        box-shadow: 0 0 5px rgba(0,0,0,0.3);
        h4{
            font-weight: bold;
            font-weight: 16px;
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
            max-height: 400px;
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
                padding-left: 30px;
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