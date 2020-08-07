<template>
    <div id="supplierDetails">
        <div class="common-info">
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term"><em>*</em>公司全称</label>
                    <div class="input-text">
                        <el-input v-model="obj.tenantFullName" maxlength="30" v-bind:disabled=true></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>公司简称</label>
                    <div class="input-text">
                        <el-input v-model="obj.tenantName" maxlength="30" v-bind:disabled=true></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>车队类型</label>
                    <div class="input-text">
                        <el-select v-model="obj.tenantType" placeholder="请选择" v-bind:disabled="true">
                            <el-option v-for="item in tenantTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term">注册手机</label>
                    <div class="input-text">
                        <el-input v-model="userLogin" maxlength="11" v-bind:disabled="isShowUser"></el-input>
                        <a class="lint" href="javascript:;" @click="isUserLogin()">变更手机号</a>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term">联系人</label>
                    <div class="input-text">
                        <el-input v-model="obj.tenantPrincipal" maxlength="30" v-bind:disabled=true></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term">联系手机</label>
                    <div class="input-text">
                        <el-input v-model="obj.tenantPhone" maxlength="30" v-bind:disabled=true></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term">座机号码</label>
                    <div class="input-text">
                        <el-input v-model="obj.phoneOne" maxlength="30" v-bind:disabled=true></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item img-upload">
                    <label class="label-term">身份证照</label>
                    <div class="input-text">
                        <myFileModel ref="cardId"></myFileModel>
                    </div>
                </li>
                <li class="item img-upload" >
                    <label class="label-term">营业执照</label>
                    <div class="input-text">
                        <myFileModel ref="businessLicense"></myFileModel>
                    </div>
                </li>
                <li class="item img-upload">
                    <label class="label-term">企业LOGO</label>
                    <div class="input-text">
                        <myFileModel ref="tenantLogo"></myFileModel>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term">办公地址</label>
                    <div class="input-text">
                        <el-input v-model="obj.officeAddress" maxlength="50" v-bind:disabled=true></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term">公司说明</label>
                    <div class="input-text">
                        <el-input maxlength="200"  v-bind:disabled=true type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入内容"  v-model="obj.remark"></el-input>
                    </div>
                </li>
            </ul>
        </div>
        <div class="page-bot-btn">
            <el-button type="primary" @click="doSave()">保存</el-button>
            <el-button type="info" @click="cancel">取消</el-button>
        </div>

    </div>
</template>
<script>
    import supplierDetails from './supplierDetails.js'
    export default supplierDetails
</script>