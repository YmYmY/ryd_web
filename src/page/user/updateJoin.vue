<template>
    <div id="updateJoin">
        <div class="common-info">
            <h3 class="common-title mb_20"><span class="title-name">加盟商信息</span></h3>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>加盟商类型</label>
                    <div class="input-text">
                        <el-select v-model="obj.tenantType" placeholder="请选择" @change="selectType()">
                            <el-option v-for="item in tenantTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>上级组织</label>
                    <div class="input-text">
                        <el-input v-model="obj.pTenantName" v-bind:disabled=true></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix" v-show="obj.showTenant">
                <li class="item">
                    <label class="label-term"><em>*</em>企业全称</label>
                    <div class="input-text">
                        <el-input v-model="obj.tenantFullName" maxlength="60"></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>企业简称</label>
                    <div class="input-text">
                        <el-input v-model="obj.tenantName" maxlength="50"></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix" v-show="obj.showTenant">
                <li class="item" >
                    <label class="label-term"><em>*</em>社会信用代码</label>
                    <div class="input-text">
                        <el-input v-model="obj.socialCreditCode" maxlength="30"></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>办公地址</label>
                    <div class="input-text">
                        <el-input v-model="obj.officeAddress" maxlength="50"></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term"><em>*</em>联系人</label>
                    <div class="input-text">
                        <el-input v-model="obj.tenantPrincipal" maxlength="10"></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>联系手机</label>
                    <div class="input-text">
                        <el-input v-model="obj.tenantPhone" maxlength="11" v-mynumval></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>状态</label>
                    <div class="input-text">
                        <el-select v-model="obj.tenantStatus" placeholder="请选择" >
                            <el-option v-for="item in tenantStatusList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>开通子加盟</label>
                    <div class="input-text">
                        <el-select v-model="obj.tenantPermission" placeholder="请选择" >
                            <el-option v-for="item in tenantPermissionList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item img-upload">
                    <label class="label-term">上传身份证照正面</label>
                    <div class="input-text">
                        <myFileModel ref="cardId"></myFileModel>
                    </div>
                </li>
                <li class="item img-upload" v-show="obj.showTenant">
                    <label class="label-term">上传营业执照正面</label>
                    <div class="input-text">
                        <myFileModel ref="businessLicense"></myFileModel>
                    </div>
                </li>
                <li class="item img-upload" v-show="obj.showTenant">
                    <label class="label-term">上传企业LOGO正面</label>
                    <div class="input-text">
                        <myFileModel ref="tenantLogo"></myFileModel>
                    </div>
                </li>
            </ul>
            <h3 class="common-title mb_20"><span class="title-name">加盟管理</span></h3>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>加盟费</label>
                    <div class="input-text">
                        <el-input v-model="obj.tenantCost" maxlength="15" v-mydoubleval></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>加盟期限</label>
                    <div class="input-text">
                        <dataPicker :model="obj.jmDate" @callback="data=>{obj.jmDate=data}" startPlaceholder="开始" endPlaceholder="结束"></dataPicker>
                    </div>
                </li>
            </ul>
            <h3 class="common-title mb_20"><span class="title-name">账号设置</span></h3>
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
                        <el-input type="password" :disabled="showPassword" @input="forceUpdate" v-model="obj.userPassword" autoComplete="new-password" maxlength="20"></el-input>
                        <a class="lint" href="javascript:;" @click="isPassword()">重置密码</a>
                    </div>

                </li>
            </ul>
            <div class="bot-btn">
                <el-button type="primary" @click="doUpdate()">保存</el-button>
                <el-button type="info" @click="cancel()">取消</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import updateJoin from './updateJoin.js'
    export default updateJoin
</script>