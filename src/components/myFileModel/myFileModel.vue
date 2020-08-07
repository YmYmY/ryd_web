<template>
  <div id="myFileModel" class="myFileModel">
    <el-upload
    class="avatar-uploader"
    :action="postUrl"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload">
      <!-- 上传图片 -->
      <img v-if="imageUrl&&type=='img'" :src="imageUrl" class="avatar">
      <!-- 上传excel文档 -->
      <img v-else-if="imageUrl=='table'" src="@/static/image/$tenantId$/excel.png" class="excelIco">
      <!-- 上传文件 -->
      <img v-else-if="imageUrl=='file'" src="@/static/image/$tenantId$/fileIco.png" class="excelIco">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      <div v-show="haveImg" @click.stop="visitFile()" class="img_popup">
        <i class="close" @click.stop="delImg()">×</i>
        <div class="editImg">修改文件</div>
      </div>
    </el-upload>
    <div class="popup_bj" v-show="isShowBigImg" @click="hideBigImg">
      <img :src="bigImageUrl" class="bigImg">
    </div>
  </div>
</template>

<script>
  import myFileModel from './myFileModel.js'
  export default myFileModel
</script>
<style src="./myFileModel.scss" lang="scss"></style>