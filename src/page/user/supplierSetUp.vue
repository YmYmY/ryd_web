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
                <li class="item">
                    <div class="input-text">
                        <el-checkbox v-model="openTransportShow">开通裹小二</el-checkbox>
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
            <h3 class="common-title mb_20"><span class="title-name">账号信息</span></h3>
            <div class="table-content">
                <div class="table-title">
                    <div class="table-title-btn">
                        <el-button type="primary" plain size="mini" @click="addSysUser()">新增</el-button>
                        <el-button type="primary" plain size="mini" @click="updateSysUser()">修改</el-button>
                        <el-button type="primary" plain size="mini" @click="deleteSysUser()">删除</el-button>
                    </div>
                </div>
                <tableCommon tableName="supplierSetUpTable" ref="table" :head="head" :showNum="true"></tableCommon>
            </div>
        </div>

        <el-dialog title="裹小二信息" :visible.sync="dialogFormVisible" center width="350px">
            <div class="common-info" style="border:none;">
                <ul class="content clearfix">
                    <li class="item item100">
                        <label class="label-term"><em>*</em>姓名</label>
                        <div class="input-text">
                            <el-input v-model="userName" maxlength="11"></el-input>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item item100">
                        <label class="label-term"><em>*</em>手机</label>
                        <div class="input-text">
                            <el-input v-model="userPhone" maxlength="11" v-mynumval></el-input>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item item100">
                        <label class="label-term"><em>*</em>登录账号</label>
                        <div class="input-text">
                            <el-input v-model="userLogin"  maxlength="11" autocomplete="off" v-mynumval></el-input>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item item100">
                        <label class="label-term"><em>*</em>登录密码</label>
                        <div class="input-text">
                            <el-input v-model="userPassword" v-bind:disabled="passwordType==2" type="password" autoComplete="new-password"  maxlength="20"></el-input>
                            <a class="lint" href="javascript:;" @click="isTransporPassword()">重置密码</a>
                        </div>
                    </li>
                </ul>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="doSaveUser()">确 定</el-button>
            </div>
        </el-dialog>


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