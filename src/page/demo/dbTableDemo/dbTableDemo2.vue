<template>
  <div id="dbTableDemo2" class="transferPage">
    <innerTab :tabs="tabs" @selectCallback="selectCallback"></innerTab>
    <div class="common-info">
      <h3 class="common-title mb_20"><span class="title-name">配载信息</span></h3>
      <ul class="content clearfix">
        <li class="item">
          <label class="label-term"><em>*</em>批次号</label>
          <div class="input-text">
            <el-input v-model="inputValue"></el-input>
          </div>
        </li>
        <li class="item">
          <label class="label-term">中转类型</label>
          <div class="input-text">
            <el-select v-model="typeSelect"></el-select>
          </div>
        </li>
      </ul>
      <h3 class="common-title mb_20"><span class="title-name">供应商信息</span></h3>
      <ul class="content clearfix">
        <li class="item">
          <label class="label-term"><em>*</em>供应商</label>
          <div class="input-text">
            <el-select v-model="typeSelect"></el-select>
          </div>
        </li>
        <li class="item">
          <label class="label-term">中转件数</label>
          <div class="input-text">
            <el-input v-model="inputValue"></el-input>
          </div>
        </li>
        <li class="item">
          <label class="label-term">中转重量</label>
          <div class="input-text">
            <el-input v-model="inputValue"></el-input>
            <span class="unit">公斤</span>
          </div>
        </li>
        <li class="item">
          <label class="label-term">中转体积</label>
          <div class="input-text">
            <el-input v-model="inputValue"></el-input>
            <span class="unit">方</span>
          </div>
        </li>
        <li class="item">
          <label class="label-term"><em>*</em>接货网点</label>
          <div class="input-text">
            <el-select v-model="typeSelect"></el-select>
          </div>
        </li>
        <li class="item">
          <label class="label-term"><em>*</em>本地交货方式</label>
          <div class="input-text">
            <el-select v-model="typeSelect"></el-select>
          </div>
        </li>
        <li class="item">
          <label class="label-term"><em>*</em>目的网点</label>
          <div class="input-text">
            <el-select v-model="typeSelect"></el-select>
          </div>
        </li>
        <li class="item">
          <label class="label-term"><em>*</em>末端交货方式</label>
          <div class="input-text">
            <el-select v-model="typeSelect"></el-select>
          </div>
        </li>
      </ul>
      <h3 class="common-title mb_20"><span class="title-name">中转费用</span></h3>
      <ul class="content clearfix">
        <li class="item">
          <label class="label-term">中转成本合计</label>
          <div class="input-text">
            <el-input v-model="inputValue"></el-input>
          </div>
        </li>
        <li class="item">
          <label class="label-term">中转单号</label>
          <div class="input-text">
            <el-input v-model="inputValue"></el-input>
          </div>
        </li>
        <li class="item">
          <label class="label-term">结算方式</label>
          <div class="input-text">
            <el-select v-model="typeSelect"></el-select>
          </div>
        </li>
        <li class="item">
          <label class="label-term">运费分摊</label>
          <div class="input-text">
            <el-select v-model="typeSelect"></el-select>
          </div>
        </li>
        <li class="item">
          <label class="label-term">中转运费</label>
          <div class="input-text">
            <el-input v-model="inputValue"></el-input>
          </div>
        </li>
        <li class="item">
          <label class="label-term">提货费</label>
          <div class="input-text">
            <el-input v-model="inputValue"></el-input>
          </div>
        </li>
        <li class="item">
          <label class="label-term">装卸费</label>
          <div class="input-text">
            <el-input v-model="inputValue"></el-input>
          </div>
        </li>
        <li class="item">
          <label class="label-term">打包费</label>
          <div class="input-text">
            <el-input v-model="inputValue"></el-input>
          </div>
        </li>
        <li class="item">
          <label class="label-term">送货费</label>
          <div class="input-text">
            <el-input v-model="inputValue"></el-input>
          </div>
        </li>
        <li class="item">
          <label class="label-term">
            <span v-show="!showOtherFeeEdit">
              <span>{{otherFeeName}}</span>
              <i class="el-icon-edit" @click="editOtherFee"></i>
            </span>
            <el-input v-model="otherFeeName" maxlength="5" type="text" v-show="showOtherFeeEdit" @keyup.enter.native="sureEditOtherFee"></el-input>
          </label>
          <div class="input-text">
            <el-input v-model="inputValue"></el-input>
          </div>
        </li>
        <li class="item item100">
          <label class="label-term">备注</label>
          <div class="input-text">
            <el-input type="textarea" v-model="inputValue" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
          </div>
        </li>
      </ul>
      <div class="delorder">
        <el-button type="danger" size="mini">移除订单</el-button>
      </div>
    </div>
    <table class="tableCommon" width="100%" border="0" cellspacing="0" cellpadding="0">
        <thead>
            <tr>
                <th width="60"><el-checkbox></el-checkbox></th>
                <th :width="hd.width == undefined ? defaultW : hd.width" v-for="hd in head" :key="hd.code">{{hd.name}}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(data,index) in tableData" :key="index">
                <td width="60"><el-checkbox></el-checkbox></td>
                <td :width="hd.width == undefined ? defaultW : hd.width" v-for="hd in head" :key="hd.code">{{data[hd.code]}}</td>
            </tr>
        </tbody>
    </table>
    <div class="page-bot-btn">
        <el-button type="info" @click="goback">上一步</el-button>
        <el-button type="primary">保存</el-button>
        <el-button type="primary">保存并发车</el-button>
    </div>
  </div>
</template>

<script>
import dbTableDemo2 from './dbTableDemo2.js'
export default dbTableDemo2
</script>
<style lang="scss">
.transferPage{
  .el-icon-edit{
    margin-left: 5px;
    cursor: pointer;
    color:$tip-color;
  }
  .common-info{
    padding-bottom: 0;
  }
  .delorder{
    text-align: right;
    padding:20px 0 12px;
  }
}
</style>