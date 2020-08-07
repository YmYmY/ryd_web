<template>
    <div id="login" class="loginClientPage">
        <div class="topBanner"></div>
        <div class="bottomInfo"></div>
        <div class="loginFrom">
            <h3>欢迎登录<span>任e调官方网站</span></h3>
            <div style="color:red;font-size:30px;font-weight:700;text-align:center;position:relative;top:-10px;" wx:if="!isEnvironment">测试环境</div>
            <div class="loginInfo">
                <form class="login_wrap" name="loginForm" novalidate @keyup.enter="submit()">
                    <div class="item">
                        <img class="ipt-icon" src="@/static/image/$tenantId$/userNameIcon.png" alt="">
                        <input type="text" v-model="userName" placeholder="请输入账号">
                    </div>
                    <div class="item">
                        <img class="ipt-icon" src="@/static/image/$tenantId$/passwordIcon.png" alt="">
                        <input type="password" v-model="password" placeholder="请输入密码">
                    </div>
                    <div class="item">
                        <img class="ipt-icon" src="@/static/image/$tenantId$/codeIcon.png" alt="">
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
        <!-- <div class="copyRight">Copyright©粤ICP备19141128号-1广州工商实名认证</div> -->
    </div>
</template>

<script>
    import loginClient from './login.js?v=client'
    export default loginClient
</script>
<style lang="scss" src="./login.scss"></style>