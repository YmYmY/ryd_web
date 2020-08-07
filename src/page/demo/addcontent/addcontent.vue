<template>
  <div id="addcontent" class="infoPage">
    <div class="common-info">
      <h3 class="common-title mb_20"><span class="title-name">加盟商信息</span></h3>
      <ul class="content clearfix">
        <li class="item">
          <label class="label-term"><em>*</em>加盟商类型</label>
          <div class="input-text">
            <el-select v-model="typeSelect"></el-select>
          </div>
        </li>
        <li class="item">
          <label class="label-term"><em>*</em>上级组织</label>
          <div class="input-text">
            <el-select v-model="typeSelect"></el-select>
          </div>
        </li>
      </ul>
      <ul class="content clearfix">
        <li class="item">
          <label class="label-term"><em>*</em>企业全称</label>
          <div class="input-text">
            <el-input v-model="inputvalue"></el-input>
          </div>
        </li>
        <li class="item">
          <label class="label-term"><em>*</em>企业简称</label>
          <div class="input-text">
            <el-input v-model="inputvalue"></el-input>
          </div>
        </li>
      </ul>
      <ul class="content clearfix">
        <li class="item">
          <label class="label-term"><em>*</em>社会信用代码</label>
          <div class="input-text">
            <el-input v-model="inputvalue"></el-input>
          </div>
        </li>
        <li class="item">
          <label class="label-term"><em>*</em>办公地址</label>
          <div class="input-text">
            <el-input v-model="inputvalue"></el-input>
          </div>
        </li>
      </ul>
      <ul class="content clearfix">
        <li class="item img-upload">
          <label class="label-term"><em>*</em>上传照片</label>
          <div class="input-text">
            <myFileModel></myFileModel>
          </div>
        </li>
      </ul>
      <h3 class="common-title mb_20"><span class="title-name">加盟管理</span></h3>
      <ul class="content clearfix">
        <li class="item">
          <label class="label-term"><em>*</em>加盟费</label>
          <div class="input-text">
            <el-input v-model="inputvalue"></el-input>
          </div>
        </li>
        <li class="item">
          <label class="label-term"><em>*</em>加盟期限</label>
          <div class="input-text">
            <dataPicker :model="daterange" @callback="data=>{daterange=data}" startPlaceholder="开始" endPlaceholder="结束"></dataPicker>
          </div>
        </li>
      </ul>
      <ul class="content clearfix">
        <li class="item" style="width:auto;">
          <label class="label-term"><em>*</em>加盟区域</label>
          <div class="input-text">
            <el-checkbox-group v-model="checkList" @change="getCheckList()">
              <el-checkbox v-for="item in areaList" :key="item.id" :label="item.id" :checked="checked"
                @change="checked=!checked">{{item.name}}</el-checkbox>
              <el-checkbox label="复选框 A">广州</el-checkbox>
              <el-checkbox label="复选框 B">深圳</el-checkbox>
              <el-checkbox label="复选框 C">东莞</el-checkbox>
            </el-checkbox-group>
          </div>
        </li>
      </ul>
      <ul class="content clearfix" v-if="showDefaultArea">
        <li class="item" style="width:auto;">
          <label class="label-term"><em>*</em>选择默认区域</label>
          <div class="input-text">
            <el-select v-model="typeSelect">
              <el-option v-for="item in defaultAreaoptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </li>
      </ul>
      <h3 class="common-title mb_20"><span class="title-name">账号设置</span></h3>
      <ul class="content clearfix">
        <li class="item">
          <label class="label-term"><em>*</em>登录账号</label>
          <div class="input-text">
            <el-input type="password" v-model="inputvalue"></el-input>
          </div>
        </li>
        <li class="item">
          <label class="label-term"><em>*</em>登录密码</label>
          <div class="input-text">
            <el-input v-model="inputvalue"></el-input>
            <a class="lint" href="javascript:;">重置密码</a>
          </div>
        </li>
      </ul>
      <h3 class="common-title mb_20"><span class="title-name">区域配置</span></h3>
      <ul class="content clearfix">
        <li class="item w_auto">
          <label class="label-term"><em>*</em>添加区域</label>
          <mycity ref="city" class="fl"></mycity>
          <el-button class="fl" type="primary" style="margin-left:20px;" @click="getAreaInfo()">添加省份城市</el-button>
        </li>
      </ul>
      <ul class="content clearfix">
        <li class="item w_auto">
          <label class="label-term">总运费折扣1</label>
          <div class="input-text input-range">
            <el-input></el-input>
            <span>-</span>
            <el-input></el-input>
          </div>
        </li>
      </ul>
      <div class="areaList">
        <div class="item"><span>广东省广州市</span><i class="el-icon-error"></i></div>
        <div class="item"><span>湖南省长沙市</span><i class="el-icon-error"></i></div>
      </div>
      <div class="bot-btn">
        <el-button type="primary" @click="doSomeThing()">保存</el-button>
        <el-button type="info">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import addcontent from './addcontent.js'
  export default addcontent
</script>
<style lang="scss">
  .areaList {
    .item {
      float: left;
      margin: 0 20px 10px 0;

      .el-icon-error:hover {
        color: red;
        cursor: pointer;
      }
    }
  }
</style>