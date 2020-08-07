<template>
    <div id="supplierSetUp">
        <div class="common-info">
            <h3 class="common-title mb_20"><span class="title-name">账号设置</span></h3>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>超级管理员</label>
                    <div class="input-text">
                        <el-input  v-model="obj.userLogin" autocomplete="off" maxlength="11" v-mynumval></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>登录密码</label>
                    <div class="input-text">
                        <el-input type="password"  v-bind:disabled="showPassword" v-model="obj.userPassword" autoComplete="new-password"  maxlength="20"></el-input>
                        <a class="lint" href="javascript:;" @click="isPassword()">重置密码</a>
                    </div>
                </li>
            </ul>
            <h3 class="common-title mb_20"><span class="title-name">菜单权限</span></h3>
            <div class="treeBox">
                <simpleTree ref="tree" :treedata="data4" label="urlName"></simpleTree>
            </div>
            <div class="bot-btn">
                <el-button type="primary" @click="doSave()">保存</el-button>
                <el-button type="info" @click="cancel()">取消</el-button>
            </div>
        </div>
    </div>
</template>



<script>
    import supplierSetUp from './supplierSetUp.js'
    export default supplierSetUp
</script>
<style lang="scss">
.supplierSetUp{
    .treeBox{
        border:$border;
        border-bottom: none;
        border-radius: 3px;
        .el-tree-node__content{
            border-bottom:$border;
            padding:3px 0;
        }
    }
}
</style>