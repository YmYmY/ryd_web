<template>
    <div id="login" class="loginPage">
        <div class="leftBanner"></div>
        <div class="loginFrom">
            <div style="color:red;font-size:30px;font-weight:700;text-align:center;position:relative;top:-30px;" wx:if="!isEnvironment">测试环境</div>
            <h3><img src="@/static/image/$tenantId$/logo3.png" alt="">任e调数据分析平台</h3>
            <div class="loginInfo">
                <form class="login_wrap" name="loginForm" novalidate @keyup.enter="submit()">
                    <div class="item">
                        <img class="ipt-icon" src="@/static/image/$tenantId$/loginSupplierNameIcon.png" alt="">
                        <input type="text" v-model="userName" placeholder="请输入账号">
                    </div>
                    <div class="item">
                        <img class="ipt-icon" src="@/static/image/$tenantId$/loginSupplierpasswordIcon.png" alt="">
                        <input type="password" v-model="password" placeholder="请输入密码">
                    </div>
                    <div class="item itemCode">
                        <input type="text" v-model="vaildCode" placeholder="请输入验证码">
                        <img @click="genCode()" :src="codeUrl" class="imgCode" width="80" height="36" />
                    </div>
                    <div class="remember clearfix">
                        <el-checkbox v-model="rememberAccount" class="fl">记住账号密码</el-checkbox>
                    </div>
                    <el-button type="primary" @click="submit()">登录</el-button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import loginSupplier from './login.js'
    export default loginSupplier
</script>
<style lang="scss" src="./login.scss"></style>