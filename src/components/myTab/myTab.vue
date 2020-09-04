<template>
  <div id="myTab" class="myTab" ref="myTab">
      <div class="scorllBox">
        <ul ref="scrollTab">
            <li :class="{'active':item.active}" v-for="(item,index) in tabs" :key="index" :ref="'tab'+index" @click="changeTab(index)">
                <i class="refresh" @click.stop="refresh(item.urlId)"></i>
                <span>{{item.urlName}}</span>
                <i class="close" @click.stop="close(item.urlId)">×</i>
            </li>
        </ul>
      </div>
      <div class="arrow-btn clearfix" v-show="showArrow">
          <div class="btn arrow-l" @click="moveLeft"></div>
          <div class="btn arrow-r" @click="moveRight"></div>
      </div>
  </div>
</template>

<script>
import tab from './myTab.js'
export default tab
</script>

<style lang="scss" scoped src="./myTab.scss"></style>
