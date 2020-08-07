<template>
    <div id="sysUserSupplierDetails">
        <div class="common-info" v-show="type==1">
            <h3 class="common-title mb_20"><span class="title-name">个人信息</span></h3>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term"><em>*</em>姓名</label>
                    <div class="input-text">
                        <el-input v-model="obj.userName" v-bind:disabled="type==1"  maxlength="10"></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>联系手机</label>
                    <div class="input-text">
                        <el-input v-model="obj.userPhone" v-bind:disabled="type==1" maxlength="11"></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term">网点信息</label>
                    <div class="input-text">
                        <el-select v-model="obj.orgId" placeholder="请选择" v-bind:disabled="type==1">
                            <el-option v-for="item in sysOrgInfo" :key="item.orgId" :label="item.orgFullName" :value="item.orgId"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term">职位名称</label>
                    <div class="input-text">
                        <el-input v-model="obj.userPosition" v-bind:disabled="type==1"  maxlength="10"></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">邮箱地址</label>
                    <div class="input-text">
                        <el-input v-model="obj.userMailbox"  v-bind:disabled="type==1" maxlength="20"></el-input>
                    </div>
                </li>
            </ul>
            <h3 class="common-title mb_20"><span class="title-name">账号设置</span></h3>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>登录账号</label>
                    <div class="input-text">
                        <el-input  v-model="obj.userLogin" v-bind:disabled="type==1" autocomplete="off" maxlength="11"></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>登录密码</label>
                    <div class="input-text">
                        <el-input type="password" v-model="obj.userPassword" v-bind:disabled="type==1" autoComplete="new-password"  maxlength="10"></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>状态</label>
                    <div class="input-text">
                        <el-select v-model="obj.userStatus" placeholder="请选择" v-bind:disabled="type==1">
                            <el-option v-for="item in userStatusList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item" style="width:auto;">
                    <label class="label-term"><em>*</em>分配角色</label>
                    <div class="input-text">
                        <el-checkbox-group v-model="obj.roleIds" v-bind:disabled="type==1">
                            <el-checkbox v-for="item in roleList" :key="item.roleId" :label="item.roleId" :checked="checked" @change="checked=!checked">{{item.roleName}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </li>
            </ul>

        </div>
        <div class="common-info" v-show="type==2 || type==3">
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>登录账号</label>
                    <div class="input-text">
                        <el-input  v-model="obj.userLogin" v-bind:disabled="type==1" autocomplete="off" maxlength="11"></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>登录密码</label>
                    <div class="input-text">
                        <el-input type="password" v-model="obj.userPassword" v-bind:disabled="type==1 || showPassword" autoComplete="new-password"  maxlength="10"></el-input>
                        <a class="lint" href="javascript:;" @click="isPassword()">重置密码</a>
                    </div>
                </li>
            </ul>
            <div class="bot-btn">
                <el-button type="primary" @click="doSave()">保存</el-button>
                <el-button type="info" @click="cancel()">取消</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    import sysUserSupplierDetails from './sysUserSupplierDetails.js'
    export default sysUserSupplierDetails
</script>