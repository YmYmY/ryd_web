<template>
    <div id="updateSysOrgInfo">
        <div class="common-info">
            <h3 class="common-title mb_20"><span class="title-name">网点信息</span></h3>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term"><em>*</em>网点全称</label>
                    <div class="input-text">
                        <el-input v-model="obj.orgFullName"   maxlength="20" ></el-input>
                    </div>
                </li>
                <li class="item" >
                    <label class="label-term"><em>*</em>网点简称</label>
                    <div class="input-text">
                        <el-input v-model="obj.orgName"   maxlength="20" ></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term"><em>*</em>负责人</label>
                    <div class="input-text">
                        <el-input v-model="obj.orgPeople" maxlength="30"></el-input>
                    </div>
                </li>
                <li class="item" >
                    <label class="label-term"><em>*</em>联系手机</label>
                    <div class="input-text">
                        <el-input v-model="obj.orgPhone"   maxlength="11" v-mynumval></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term">网点座机</label>
                    <div class="input-text">
                        <el-input v-model="obj.orgTelephone"   maxlength="20" ></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>网点地址</label>
                    <div class="input-text">
                        <mycity ref="city" class="fl" style="width:100%;" :selectType="selectType"></mycity>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>导航地址</label>
                    <div class="input-text">
                        <el-input v-model="obj.orgAddress" maxlength="30"></el-input>
                    </div>
                </li>
            </ul>
            <h3 class="common-title mb_20"><span class="title-name">账号信息</span></h3>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>登录账号</label>
                    <div class="input-text">
                        <el-input  v-model="obj.userLogin" autocomplete="off" maxlength="11" v-mynumval></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>登录密码</label>
                    <div class="input-text">
                        <el-input type="password"   @input="forceUpdate" v-bind:disabled="showPassword" v-model="obj.userPassword" autoComplete="new-password"  maxlength="20"></el-input>
                        <a class="lint" href="javascript:;" @click="isPassword()">重置密码</a>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>状态</label>
                    <div class="input-text">
                        <el-select v-model="obj.userStatus" placeholder="请选择">
                            <el-option v-for="item in userStatusList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
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
    import updateSysOrgInfo from './updateSysOrgInfo.js'
    export default updateSysOrgInfo
</script>