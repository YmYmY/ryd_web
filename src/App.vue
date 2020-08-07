<template>
  <div id="app">
    <!-- 是否生产环境 -->
    <h1 v-if="!isEnvironment" style="color:red;font-size:30px;text-align:center;position:absolute;bottom:40px;right:40px">非生产环境</h1>
    <!-- 公用遮罩层 -->
    <!-- <div class="main-popup" id="mainPopup">
      <div class="main-popup-content">
        <i class="el-icon-loading"></i>
      </div>
    </div> -->
    <!-- 进度条 开始 -->
    <div id="fileProgress" style="display:none;">
      <div class="progress progress-striped" style="position:fixed; padding:5px;border-radius:3px; width:200px; margin:-21px 0 0 -21px;top:51%; left:44%;z-index: 999999999; ">
          <div class="progress-bar progress-bar-success" id="fileProgressRate">
            <div>1%</div>
          </div>
      </div>
      <div style="z-index: 999;" class="popup_bj"></div>
    </div>
		<!-- 进度条 结束 -->
    <component :is="componentName"></component>
  </div>
</template>

<script>
import home from './page/home/home.vue'
import homeSupplier from './page/home/homeSupplier.vue'
import homeClient from './page/home/homeClient.vue'
import login from './page/login/login.vue'
import loginClient from './page/login/loginClient.vue'
import loginSupplier from './page/login/loginSupplier.vue'

export default {
    name: 'app',  
    data(){
      return {
        isEnvironment:true,     //是否生成环境          
      }
    },
    mounted(){          
        this.init();
    },
    methods:{
      init(){
        let hreftest = window.location.href;
        let name = localStorage.getItem("defaultUrl");  //获取之前访问的缓存页面
        let pathName = this.$route.path;
        if(hreftest.indexOf('ryd98.com')>-1){ //是否生产访问          
          //管理平台 
          if(hreftest.indexOf('pt.ryd98.com')>-1){
            if(this.common.isBlank(name) || pathName=='/login'){  //没指向默认跳去登录页
              this.$store.state.componentName = 'login'
            }else{
              if(pathName=='/loginClient' || pathName=='/loginSupplier'){   //拦截其他端登录
                window.location.href = "/login";
                this.$store.state.componentName = 'login'
              }else{
                this.$store.state.componentName = name
              }
            }
          }else if(hreftest.indexOf('kh.ryd98.com')>-1){
          //客户端 
            if(this.common.isBlank(name) || pathName=='/loginClient'){
              this.$store.state.componentName = 'loginClient'
            }else{
              if(pathName=='/login' || pathName=='/loginSupplier'){   //拦截其他端登录
                window.location.href = "/loginClient";
                this.$store.state.componentName = 'loginClient'
              }else{
                this.$store.state.componentName = name
              }
            }         
          }else if(hreftest.indexOf('gys.ryd98.com')>-1){
          //供应商 
            if(this.common.isBlank(name) || pathName=='/loginSupplier'){
              this.$store.state.componentName = 'loginSupplier'
            }else{
              if(pathName=='/login' || pathName=='/loginClient'){   //拦截其他端登录
                window.location.href = "/loginSupplier";
                this.$store.state.componentName = 'loginSupplier'
              }else{
                this.$store.state.componentName = name
              }
            }           
          }else{
            // 官网
            window.location.href = '/website.html'
          }
        }else{
          this.isEnvironment = false;
          if(pathName=="/login"){
            //平台登陆
            this.$store.state.componentName = 'login'
          }else if(pathName=="/home"){
            //平台登陆主体页面
            this.$store.state.componentName = 'home'
          }else if(pathName=="/loginClient"){
            //客户登陆
            this.$store.state.componentName = 'loginClient'
  
          }else if(pathName=="/homeClient"){
            //客户主体页面
            this.$store.state.componentName = 'homeClient'
            
          }else if(pathName=="/loginSupplier"){
            //供应商登陆
            this.$store.state.componentName = 'loginSupplier'
            
          }else if(pathName=="/homeSupplier"){
            //供应商主体页面
            this.$store.state.componentName = 'homeSupplier'
            
          }else{
            if(this.common.isBlank(name)){
              this.$store.state.componentName = 'login'
            }else{
              this.$store.state.componentName = name
            }
          }
        }
      },
      toPage(page){
        let name = localStorage.getItem("defaultUrl");
        if(this.common.isBlank(name)){
          this.$store.state.componentName = page
        }else{
          this.$store.state.componentName = name
        }
      }
    },
    components:{
        home,
        homeClient,
        homeSupplier,
        login,
        loginClient,
        loginSupplier
    },
    computed:{
        componentName(){
            return this.$store.state.componentName
        },
    }
}
</script>
<style lang="scss">
@-webkit-keyframes progress-bar-stripes {
    from {
    background-position: 40px 0;
    }
    to {
    background-position: 0 0;
    }
}
@keyframes progress-bar-stripes {
    from {
    background-position: 40px 0;
    }
    to {
    background-position: 0 0;
    }
}
.progress {
    height: 20px;
    margin-bottom: 20px;
    overflow: hidden;
    background-color: #f5f5f5;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
            box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}
.progress-bar {
    float: left;
    width: 0;
    height: 100%;
    font-size: 12px;
    line-height: 20px;
    color: #ffffff;
    text-align: center;
    background-color: #428bca;
    -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);
            box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);
    -webkit-transition: width 0.6s ease;
            transition: width 0.6s ease;
}
.progress-striped .progress-bar {
    background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
    background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
    background-size: 40px 40px;
}
.progress.active .progress-bar {
    -webkit-animation: progress-bar-stripes 2s linear infinite;
            animation: progress-bar-stripes 2s linear infinite;
}
.progress-bar-success {
    background-color: #5cb85c;
}
.progress-striped .progress-bar-success {
    background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
    background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
}
</style>