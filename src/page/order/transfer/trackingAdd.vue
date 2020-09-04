<template>
  <div id="listTrackingAdd" class="listTrackingAddPage">
    <innerTab :tabs="tabs" @selectCallback="selectCallback"></innerTab>
    <div class="common-info">
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>跟踪时间</label>
                    <div class="input-text">
                        <el-date-picker v-model="tracking.trackingDate" value-format="yyyy-MM-dd HH:mm:ss"  type="datetime" placeholder="选择日期"></el-date-picker>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                <label class="label-term"><em>*</em>运输状态</label>
                    <div class="input-text">
                          <el-select v-model="tracking.trackingOrderSts"  placeholder="请选择" @change="selectTrackingOrderSts">
                           <el-option v-for="item in selectTrackingOrderStsList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                         </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item w_auto">
                    <label class="label-term">跟踪信息</label>
                    <div class="input-text">
                        <el-input v-model="tracking.trackingContent" v-bind:disabled="currentTab.selectType == 2" type="textarea" maxlength="100"></el-input>
                        <div class="addremark" @click="showRemark"><i class="el-icon-plus"></i></div>
                        <remark ref="remark" v-if="currentTab.selectType == 1" @remarkCallBack="remarkCallBack" :remarkType="2"></remark>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix" v-show="currentTab.selectType == 1">
                <li class="item w_auto">
                    <label class="label-term"></label>
                    <div class="input-text">
                        <el-checkbox v-model="tracking.trackingFlagView">更新到运单跟踪日志</el-checkbox>
                    </div>
                </li>
            </ul>

            <div class="bot_btn">
                <el-button type="primary" @click="saveTransitTrackings()">保存</el-button>
                <el-button type="info" @click="closeTab()">取消</el-button>
            </div>
     </div>
       <h3 class="common-title"><span class="title-name">跟踪清单</span></h3>
      <div class="table-content">
        <tableCommon ref="outgoingTrackingAddManager" :head="head" @dblclickItem="dblclickItem" tableName="outgoingTrackingAddTable"></tableCommon>
      </div>
  </div>
 
</template>

<script>
import outgoingTrackingAdd from './trackingAdd.js'
export default outgoingTrackingAdd
</script>
<style lang="scss">
    .listTrackingAddPage{
        .addremark{
            width:18px;
            height: 18px;
            border-radius: 3px;
            border:1px solid $main-color;
            position: absolute;
            top:10px;
            right: -30px;
            font-size: 14px;
            color:$main-color;
            text-align: center;
            cursor: pointer;
            font-weight: bold;
        }
        .selectAlertBox{
            left: 431px;
            top: 10px;
        }
        .delorder{
            text-align: right;
            padding: 20px 0 12px;
        }
        .tableCommon{
            border-left: $border;
            border-right: $border;
        }
        .table_height{
            overflow-x:auto;
        }
    }
</style>