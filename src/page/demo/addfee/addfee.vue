<template>
  <div id="addfee">
    <innerTab :tabs="tabs" @selectCallback="selectCallback"></innerTab>
      <div class="common-info">
          <ul class="content clearfix">
            <li class="item">
                <label class="label-term">出发地</label>
                <div class="input-text">
                    <el-select v-model="selVal"></el-select>
                </div>
            </li>
            <li class="item">
                <label class="label-term">结算方式</label>
                <div class="input-text">
                    <el-input></el-input>
                </div>
            </li>
            <li class="item">
                <label class="label-term">账期信息</label>
                <div class="input-text">
                    <el-input></el-input>
                </div>
            </li>
            <li class="item">
                <label class="label-term">保险费率</label>
                <div class="input-text">
                    <el-select v-model="selVal"></el-select>
                </div>
            </li>
            <li class="item">
                <label class="label-term">结算方式</label>
                <div class="input-text">
                    <el-input></el-input>
                </div>
            </li>
            <li class="item">
                <label class="label-term">结算方式</label>
                <div class="input-text">
                    <el-input></el-input>
                </div>
            </li>
        </ul>  
      </div>
      <ladderTable></ladderTable>
  </div>
</template>

<script>
import addfee from './addfee.js'
export default addfee
</script>

<style lang="scss" scoped src="./addfee.scss"></style>
