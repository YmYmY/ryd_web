<template>
  <div id="home" class="homePage">
    <div class="main">
      <!-- 头部 -->
      <div class="header header-mini" ref="header">
        <img src="@/static/image/$tenantId$/logo.png" class="logo fl" alt="">
        <img src="@/static/image/$tenantId$/logo4.png" class="logo4 fl" alt="">
        <img src="@/static/image/$tenantId$/more.png" @click="hideSlider" class="more fl" alt="">
        <img src="@/static/image/$tenantId$/home.png" @click="toHome" class="home fl" alt="">
        <div class="search-ipt fl">
          <el-autocomplete
            class="inline-input"
            v-model="trackingNum"
            :fetch-suggestions="getOrderInfo"
            placeholder="快速查单"
            :trigger-on-focus="false"
            valueKey="orderNo"
            @select="selectOrder"
          ></el-autocomplete>
          <!-- <p>温馨提示：受国庆阅兵影响，北京件收发均受不同程度影响。</p> -->
        </div>
        <div class="fr">
          <div class="user fl">
            <img src="@/static/image/$tenantId$/car.png" class="uesrhead fl" alt="">
            <div class="userInfo fl">
              <div class="belong infoList">
                <p class="name">{{orgName}}</p>
                <ul>
                  <li v-for="(item,index) in sysUserRegion" :key="index" @click="selectOrg(item)">{{item.regionName}}</li>
                </ul>
              </div>
              <div class="userArea infoList fl">
                <p class="name">{{oragnizeName}}</p>
                <ul>
                  <li v-for="(item,index) in sysUserOragnizeList" :key="index">{{item.oragnizeName}}</li>
                </ul>
              </div>
              <div class="userName infoList fl">
                <p class="name">欢迎您,{{userName}}</p>
                <ul>
                  <li @click="sysUserDetails(1)">个人信息</li>
                  <li @click="sysUserDetails(2)">修改密码</li>
                  <li @click="sysUserDetails(3)">更换手机号</li>
                  <li @click="doLogout">退出系统</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 头部结束 -->
      <div class="home_main" ref="maincontent">
        <!-- 侧边栏 -->
        <div class="slide_bar fl" :class="{'slide_bar_mini':!isShowSlider}">
          <div class="search-box" :class="{'showMenuSearch':showMenuSearchState}" @mouseenter="showMenuSearch" @mouseleave="hideMenuSearch">
            <el-input prefix-icon="el-icon-search" v-model="menuSearch" @input="searchMenu"  @focus="searchMenu" @blur="hideMenuSearchList"></el-input>
            <ul class="menuSearchList" v-show="menuSearchList.length>0">
              <li v-for="(list,index) in menuSearchList" :key="index" @click="openTab(list)">{{list.urlName}}</li>
            </ul>
          </div>
          <div class="useMore" @mouseenter="showUsuallyUse" @mouseleave="hideUsuallyUse" >
            <h3 class="tabTitle" @click="isShowUsuallyUse" style="cursor:pointer;">我的常用</h3>
             <!-- v-show="usuallyUse" -->
            <ul v-show="usuallyUse">
              <li v-for="(tab3,index) in sysMenuUse" :key="index" @click.stop="openTab(tab3)">
                <span> {{tab3.urlName}}</span>
                <span class="delmenu" @click.stop="deleteSysMenuUse(tab3)" ><i class="el-icon-minus"></i></span>
              </li>
            </ul>
          </div>
          <h3 class="tabTitle">菜单列表</h3>
          <div class="menu">
            <div class="menuList">
              <div class="menu-one">
                <span class="menu-one-name" @click="toHome">
                  <i class="navIcon"></i>
                  <span class="menu-text">首页</span> 
                </span>
              </div>
              <!-- 一层 -->
              <div class="menu-one" @click="openTab(tab1)" v-for="tab1 in tabsCache" :key="tab1.urlId" @mouseenter="showChild(tab1)" @mouseleave="hideChild(tab1)">
                <span class="menu-one-name" @click="openChild(tab1)">
                  <i class="navIcon" :class="'navIcon'+tab1.id"></i>
                  <span class="menu-text">{{tab1.urlName}}</span>
                </span>
                <!-- 二层 -->
                <div class="menu-two-box" v-show="tab1.isOpen">
                  <div class="menu-item menu-two" v-for="tab2 in tab1.children" :key="tab2.urlId">
                    <span class="menu-name menu-two-name" @click="openChild(tab2);openTab(tab2);" :class="{'open':tab2.isOpen,'noNext':tab2.children==null,'haveNext':tab2.children!=null}">
                      {{tab2.urlName}}
                      <span class="addmenu"   @click.stop="doSaveSysMenuUse(tab2)" v-if="tab2.urlType==2"><i class="el-icon-plus"></i></span>
                    </span>
                    <!-- 三层 -->
                    <div class="menu-item menu-three" v-for="tab3 in tab2.children" :key="tab3.urlId" v-show="tab2.isOpen">
                      <span class="menu-name menu-three-name" @click="openChild(tab3);openTab(tab3);" :class="{'open':tab3.isOpen,'noNext':tab3.children==null,'haveNext':tab3.children!=null}">
                        {{tab3.urlName}}
                        <span class="addmenu"   @click.stop="doSaveSysMenuUse(tab3)" v-if="tab3.urlType==2"><i class="el-icon-plus"></i></span>
                      </span>
                      <!-- 四层 -->
                      <div class="menu-item menu-four" @click.stop="openTab(tab4)" v-for="tab4 in tab3.children" :key="tab4.urlId" v-show="tab3.isOpen">
                        <span class="menu-name menu-four-name" @click="openChild(tab4);openTab(tab4);" :class="{'open':tab4.isOpen,'noNext':tab4.children==null,'haveNext':tab4.children!=null}">
                          {{tab4.urlName}}
                          <span class="addmenu" @click.stop="doSaveSysMenuUse(tab4)" v-if="tab4.urlType==2"><i class="el-icon-plus"></i></span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 侧边栏结束 -->
        <!-- 主体页面 -->
        <div class="main_content fr" :class="{'main_content_100':!isShowSlider}">
          <!-- 首页 -->
          <div v-show="!menuPage">
            <toMain @openTab="openTab" v-if="!menuPage"></toMain>
          </div>
          <!-- 子菜单页 -->
          <div v-show="menuPage">
            <div class="tabs clearfix">
              <myTab ref="myTab" @isShowMenuPage='isShowMenuPage'></myTab>
            </div>
            <div class="main_frame" ref="mainFrame">
              <!-- 生命周期保持的页面 -->
              <keep-alive>
                <router-view :key="$route.meta.id" @openTab="openTab" @closeTab="closeTab" @clostToOther="clostToOther" v-if="$route.meta.keep"></router-view>
              </keep-alive>
              <!-- 切换结束生命周期的页面 -->
              <router-view :key="$route.meta.id" @openTab="openTab" @closeTab="closeTab" @clostToOther="clostToOther" v-if="!$route.meta.keep"></router-view>
              <!-- 公用遮罩层 -->
              <div class="main-popup" id="mainPopup">
                <div class="main-popup-content">
                  <i class="el-icon-loading"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 主题页面 结束 -->
      </div>
    </div>
  </div>
</template>

<script>
  import home from "./home.js"
  export default home
</script>

<style lang="scss" src="./home.scss"></style>