export default {
    name: 'login',
    data() {
        return {
            userName: "",           //用户名
            password: "",           //密码
            vaildCode: "",          //验证码
            codeUrl: "",            //验证码路径
            rememberAccount:false,  //记住账号密码
            isEnvironment:true,     //是否生成环境
        }
    },
    mounted(){
        this.checkEnvironment();//检测是否生产环境
        this.initWindwoSize();  //初始化页面高度
        this.genCode()  //获取验证码
        this.initAccount(); //初始化账户信息
    },
    methods: {
        // 检测是否生产环境
        checkEnvironment(){            
            let pathUrl = window.location.href;
            if(pathUrl.indexOf('ryd98')==-1){
                this.isEnvironment = false;
            }
        },
        initAccount(){
            let account = JSON.parse(localStorage.getItem("rememberAccount"));
            if(this.common.isNotBlank(account)){
                this.userName = account.userName;
                this.password = this.common.base64.decode(account.password);
                this.rememberAccount = true;
            }
        },
        initWindwoSize(){
            let login = document.getElementById('login');
            login.style.height = window.innerHeight + 'px';
            window.onresize = function(){
                login.style.height = window.innerHeight + 'px';
            }
        },
        genCode() {
            let timestamp = (new Date()).valueOf();
            let host = window.location.host;
            if(host.indexOf('localhost')>-1 || host.indexOf('127.0.0.1') >-1 || host.indexOf('192.168') >-1){
                this.codeUrl = "api/genCode?timestamp=" + timestamp;
            }else{
                this.codeUrl = "genCode?timestamp=" + timestamp;
            }
        },
        getBrowser : function () {
            let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
            let isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
            let isIE = userAgent.indexOf("compatible") > -1
                    && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
            let isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
            let isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
            let isSafari = userAgent.indexOf("Safari") > -1
                    && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
            let isChrome = userAgent.indexOf("Chrome") > -1
                    && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器

            if (isIE) {
                let reIE = new RegExp("MSIE (\\d+\\.\\d+);");
                reIE.test(userAgent);
                let fIEVersion = parseFloat(RegExp["$1"]);
                if (fIEVersion == 7) {
                    return "IE7";
                } else if (fIEVersion == 8) {
                    return "IE8";
                } else if (fIEVersion == 9) {
                    return "IE9";
                } else if (fIEVersion == 10) {
                    return "IE10";
                } else if (fIEVersion == 11) {
                    return "IE11";
                } else {
                    return "0";
                }//IE版本过低
                return "IE";
            }
            if (isOpera) {
                return "Opera";
            }
            if (isEdge) {
                return "Edge";
            }
            if (isFF) {
                return "Firefox";
            }
            if (isSafari) {
                return "Safari";
            }
            if (isChrome) {
                return "Chrome";
            }
            
        },
        submit(){
            let that=this;
            let username = this.userName;
            let password = this.password;
            let vaildCode = this.vaildCode;
            
            if(this.common.isBlank(username)){
                alert("请输入用户名!")
                document.getElementById('_userName').focus()
                return false;
            }
            if(this.common.isBlank(password)){
                alert("请输入密码!")
                document.getElementById('_password').focus()
                return false;
            }
            let first = Math.round(Math.random()*80) + 10;
            let last = Math.round(Math.random()*80) + 10;
            let login = {};
            login.selectId={};
            login.selectId.username=username;
            login.selectId.password=password;
            login.selectId.vaildCode=vaildCode;
            let pathname = window.location.pathname;
            let pathUrl = window.location.href;
            login.selectId.attributionType  = 1;
            if(pathname == '/login' || pathUrl.indexOf('pt.ryd98')>-1){
                login.selectId.attributionType  = 1;
            }else if(pathname == '/loginSupplier' || pathUrl.indexOf('gys.ryd98')>-1){
                login.selectId.attributionType  = 3;
            }else if(pathname == '/loginClient' || pathUrl.indexOf('kh.ryd98')>-1){
                login.selectId.attributionType  = 2;
            }
            vaildCode = this.common.base64.encode(first+""+vaildCode+""+last+"{zx}");
            login.selectId.browser =  this.browser;
            let url = "api/portalBusiBO.ajax?cmd=doLogin";
            this.common.postUrl(url,login.selectId,function(data){
                //成功执行
                if(that.common.isNotBlank(data) && data.result=="1"){
                    alert("用户名和密码错误!");
                    that.genCode();
                    that.userName="";
                    that.password="";
                    that.vaildCode="";
                    return;
                }else if(that.common.isNotBlank(data) && data.result=="0"){
                    localStorage.clear();
                    localStorage.setItem("userInfo",data);
                    if(that.rememberAccount){   //记住账户密码
                        let account = {userName:username,password:that.common.base64.encode(password)}
                        localStorage.setItem("rememberAccount",JSON.stringify(account));
                    }
                    that.$router.replace('/');   //防止后退去到登录页  
                    if(pathname == "/"){    //处理没指定页面且没访问记录
                        if(pathUrl.indexOf('pt.ryd98')>-1) pathname = '/login';
                        else if(pathUrl.indexOf('gys.ryd98')>-1) pathname = '/loginSupplier';
                        else if(pathUrl.indexOf('kh.ryd98')>-1) pathname = '/loginClient';
                        else pathname = "/login"
                    }
                    if(pathname == '/login' || pathUrl.indexOf('pt.ryd98')>-1){    //跳转到平台
                        that.$store.commit('resetData',{name:'componentName',data:'home'});
                        localStorage.setItem("defaultUrl","home");
                    }else if(pathname == '/loginSupplier' || pathUrl.indexOf('gys.ryd98')>-1){         //供应商
                        that.$store.commit('resetData',{name:'componentName',data:'homeSupplier'});
                        localStorage.setItem("defaultUrl","homeSupplier");
                    }else if(pathname == '/loginClient' || pathUrl.indexOf('kh.ryd98')>-1){           //客户
                        that.$store.commit('resetData',{name:'componentName',data:'homeClient'});
                        localStorage.setItem("defaultUrl","homeClient");
                    }
                }else{
                    alert("系统异常!");
                    that.genCode();
                    that.vaildCode="";
                    that.password="";
                }
            },null,null,true)
        }
    }
}