<template>
    <div id="login" class="loginSupplier">
        <div class="topTip">
            <img src="@/static/image/$tenantId$/loginLogo.png" class="loginLogo fl" alt="">
            <span class="fl">登录</span>
        </div>
        <div class="topBanner"></div>
        <div class="bottomInfo">
            <div class="introduce clearfix">
                <img class="fr" src="@/static/image/$tenantId$/loginCompany.png" alt="">
                <img class="fr" src="@/static/image/$tenantId$/loginPeople.png" alt="">
                <img class="fr" src="@/static/image/$tenantId$/loginTime.png" alt="">
            </div>
            <div class="friendLink">
                <a href="#">产品</a>
                <span>|</span>
                <a href="#">服务</a>
                <span>|</span>
                <a href="#">咨询</a>
                <span>|</span>
                <a href="#">联系我们</a>
                <span>|</span>
                <a href="#">关于我们</a>
            </div>
        </div>
        <div class="loginFrom">
            <h3>欢迎登录</h3>
            <div style="color:red;font-size:30px;font-weight:700;text-align:center;position:relative;top:-10px;" wx:if="!isEnvironment">测试环境</div>
            <div class="loginInfo">
                <form class="login_wrap" name="loginForm" novalidate @keyup.enter="submit()">
                    <div class="item">
                        <div class="label">账号</div>
                        <div class="input-text">
                            <el-input v-model="userName" placeholder="请输入账号"></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">密码</div>
                        <div class="input-text">
                            <el-input v-model="password" placeholder="请输入账号" show-password></el-input>
                            <!-- <div class="seePw">
                                <img src="@/static/image/$tenantId$/seePw.png" class="seePwIco" />
                            </div> -->
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">验证码</div>
                        <div class="input-text">
                            <el-input v-model="vaildCode" placeholder="请输入账号"></el-input>
                            <img @click="genCode()" :src="codeUrl" class="imgCode" width="82" height="40" />
                        </div>
                    </div>
                    <div class="remember clearfix">
                        <el-checkbox v-model="rememberAccount" class="fl">记住账号密码</el-checkbox>
                        <!-- <a href="#" class="fr">忘记密码?</a> -->
                    </div>
                    <el-button type="primary" @click="submit()">登录</el-button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import login from './login.js?v?supplier'
    export default login
</script>
<style lang="scss" src="./login.scss"></style>