//公用方法

import axios from 'axios'
import {
    Message,
    MessageBox
} from 'element-ui'
import md5 from './md5.js'
import base64 from './base64.js'
import ReconnectingWebSocket from 'reconnecting-websocket';

//对象深拷贝
const copyObj = (obj) => JSON.parse(JSON.stringify(obj));
//对象合并,key相同则后对象覆盖前对象
const mergeObj = (...obj) => Object.assign({}, ...obj);

// 复制相同 key 值
const copyObjValue = function (obj,objValue){
  for(let k in obj){
     if(!isBlank(objValue[k])){
        obj[k] = objValue[k]
     }
  }
  return obj;
};

const postUrl = function (url, param, successFun, errorFun, type = "post", shadow) {
    if(shadow) shade.show();//遮罩层

    return new Promise((resolve, reject) => {
        if (isBlank(url)) return;
        // if(isBlank(param)) return;
        if (isBlank(type)) {
            type = "post";
        };
        let urlManager = {};    //url请求记录（限制重复请求）
        // 数据格式转换
        const tranParam = function (obj) {
            let query = "";
            for (let name in obj) {
                let value = obj[name];
                if (value instanceof Array) {
                    for (let i = 0; i < value.length; ++i) {
                        let subValue = value[i];
                        let fullSubName = name + "[" + i + "]";
                        let innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + "&";
                    }
                } else if (value instanceof Object) {
                    for (let subName in value) {
                        let subValue = value[subName];
                        let fullSubName = name + "[" + subName + "]";
                        let innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + "&";
                    }
                } else if (value !== undefined && value !== null) {
                    query += encodeURIComponent(name) + "=" + encodeURIComponent(value) + "&";
                }
            }
            return query.length ? query.substr(0, query.length - 1) : query;
        };

        /**
         * 用于解析的内容是对象
         */
        const objToPostObj = function (obj, key, retmap) {
            let j = 0;
            for (let i in obj) {
                if (obj[i] instanceof Array == true) {
                    objToPostList(obj[i], key + "[" + j + "]", retmap);
                } else if (obj[i] instanceof Object == true) {
                    objToPostObj(obj[i], key + "." + i, retmap);
                } else {
                    retmap[key + "." + i] = obj[i];
                }
                j++;
            }
        }
        /**
         * 用于解析的内容是列表
         * 
         * 
         */
        const objToPostList = function (obj, key, retmap) {
            let j = 0;
            for (let i in obj) {
                if (obj[i] instanceof Array == true) {
                    objToPostList(obj[i], key + "[" + j + "]", retmap);
                } else if (obj[i] instanceof Object == true) {
                    objToPostObj(obj[i], key + "[" + j + "]", retmap);
                }
                j++;
            }
            retmap[key] = obj.toString();
        }
        /**
         * 对于传入的对象转换成可以post的形式
         * 
         * 
         */
        const objToPostParam = function (obj) {
            let map = {};
            for (let i in obj) {
                if (obj[i] instanceof Array == true) {
                    objToPostList(obj[i], i, map);
                } else if (obj[i] instanceof Object == true) {
                    objToPostObj(obj[i], i, map);
                } else {
                    map[i] = obj[i];
                }
            }
            return map;
        }
        // encode转码
        const urlEncode = function (param, key, encode) {
            if (param == null) return '';
            let paramStr = '';
            let t = typeof (param);
            if (t == 'string' || t == 'number' || t == 'boolean' || param instanceof Array) {
                if (param !== "") {
                    paramStr = key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
                }
            } else {
                let idx = 0;
                let paramArray = new Array();
                if (param.url != undefined) {
                    if ((idx = param.url.indexOf("&")) > 0) {
                        paramStr = param.url.substring(0, idx);
                        let params = param.url.substring(idx + 1).split("&");
                        for (let i in params) {
                            if (params[i].split("=")[1] !== "null" && params[i].split("=")[1] !== "") {
                                paramArray.push(params[i]);
                            }
                        }
                    } else {
                        paramStr = param.url;
                    }
                }
                if (param.data != undefined) {
                    for (let i in param.data) {
                        if (param.data[i] != null && param.data[i] !== "null" && param.data[i] !== "") {
                            paramArray.push(urlEncode(param.data[i], i, encode));
                        }
                    }
                }
                if (paramArray.length > 0)
                    paramStr += "&" + paramArray.sort().join("&");
            }
            return paramStr;
        };

        //发起请求
        const httpPost = function (queryObject, successFun, errorFun, urlStr, shadow) {
            //调用发送请求
            axios(queryObject).then(function ({
                data: response,
                status,
                headers,
                config
            }) {
                // let {data, status, headers, config} = data;
                delete urlManager[urlStr];
                try {
                    if(shadow) shade.hide();
                    if (typeof (successFun) == "function") {
                        successFun(response, status, headers, config);
                        resolve(response)
                    } else {
                        resolve(response)
                    }
                } catch (error) {
                    console.log(error)
                }

            }).catch(function ({
                response
            }) {
                delete urlManager[urlStr];
                if(shadow) shade.hide();
                let {
                    status
                } = response;
                let {
                    message
                } = response.data;
                if (status == 403) {
                    MessageBox("登录信息有误",function(){
                        window.location.href = "/login";
                    })
                } else if (status == 500) {
                    if (typeof errorFun == "function") {
                        errorFun(response);
                    }
                    MessageBox("系统网络丢啦，请刷新试试~");
                } else if (status == 501) {
                    if (typeof errorFun == "function") {
                        errorFun(response);
                    } else {
                        MessageBox(message);
                    }
                } else if (typeof errorFun == "function") {
                    errorFun(response);
                } else if (status == 0 || status == 504) {

                } else if (errorFun == undefined || errorFun == "" || errorFun == null) {
                    MessageBox(message);
                }
                reject(response);
            });
        }

        let queryObject;
        if (typeof param == "string") {
            if (param !== "") {
                if (url.indexOf("?") == -1) {
                    url = url + "?" + param;
                } else {
                    url = url + "&" + param;
                }
            }
            queryObject = {
                method: type,
                url: url
            };
        } else {
            queryObject = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                transformRequest: [tranParam],
                method: type,
                data: objToPostParam(param),
                url: url
            };
        }
        if (queryObject.data != undefined && queryObject.data.sign != undefined) {
            delete queryObject.data.sign;
        }
        let urlStr = urlEncode(queryObject, null, false).replace("api/", "");
        let sign = md5(urlStr + getCookie("token"));
        if (queryObject.data != undefined) {
            queryObject.data.sign = sign;
        } else {
            queryObject.url += "&sign=" + sign;
        }
        if (type == "POST") {
            //限制重复请求
            if (urlManager[urlStr] == undefined) {
                urlManager[urlStr] = "1";
                //zycode
                httpPost(queryObject, successFun, errorFun, urlStr, shadow);
            }else{
                console.log("重复请求")
            }
        } else {
            //zycode
            httpPost(queryObject, successFun, errorFun, urlStr, shadow);
        }
    })
}

//变量是否不为空
const isNotBlank = function (data) {
    if (data !== null && data !== undefined && data !== "") {
        return true
    } else {
        return false
    }
}
//变量是否为空
const isBlank = function (data) {
    if (data === null || data === undefined || data === "") {
        return true
    } else {
        return false
    }
}

 /**检查手机号码 新增属性进行校验 很多地方用到**/
 const validatemobile = function(mobile){
    if(mobile==undefined || mobile.length==0){
       return false;
    }
    if(mobile.length!=11){
        return false;
    }
    let myreg = /^0?(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])[0-9]{8}$/;
    if(!myreg.test(mobile)){
        return false;
    }
   return true;
}

 /**检查固定电话**/
 const validateTel = function(tel){
    if(tel.length==0 || tel==undefined){
       return false;
    }
    var myreg = /^((0\d{2,3})-?)(\d{7,8})(-(\d{3,}))?$/;
    if(!myreg.test(tel)){
        return false;
    }
   return true;
}

/** 格式化当前 时间**/
const  formatTime = function(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'y+': date.getFullYear + 1,
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
 }
 const padLeftZero = function (str) {
    return ('00' + str).substr(str.length);
}
/** 获取cookie  */
const getCookie = function(name) {
    let arr,reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    let obj  = "";
    if(arr=document.cookie.match(reg)){
         obj =  decodeURIComponent(arr[2]);
         if(isNotBlank(obj)){
            obj =  obj.replace(/\"/g, "");
         }
    }
    return obj;
}   
/**获取当前路径 */
const getRootPath = function() {
	var curWwwPath = window.document.location.href;
	var pathName = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathName);
	var localhostPaht = curWwwPath.substring(0, pos);
	return localhostPaht;
}
// 查询 初始化打印
const  initDevices = function(businessTypes,callback){
	let params = {};
    params.businessTypes = businessTypes;
	postUrl("api/sysPrintBO.ajax?cmd=queryPrinters", params,function(data){
        let items = data.items;
        callback(items);
    });
}
// 获取 json 第一层长度
const getMapLength = function(json){
    let j = 0;
    for(let k in json){
        j ++;
    }
    return j;
}

//下载文件
const downloadFile = function(url){
    let div = document.createElement("div");
    div.innerHTML = `<iframe id="downloadFileFrame" name="downloadFileFrame" src="${url}" style = "display:none;visibility:hidden" ></iframe>`
    document.body.appendChild(div);
    const timer = setTimeout(() => {
        document.getElementById('downloadFileFrame').parentNode.remove();
        clearTimeout(timer);
    },500)
}

//websocket
const startWebSocket = function(callback) {
    if (!window.WebSocket) alert("WebSocket not supported by this browser!");
    // 创建WebSocket
    let ishttps = 'https:' == document.location.protocol ? true : false;
    if(ishttps){
        var url = document.location.toString().replace('https://', '');
    }else{
        var url = document.location.toString().replace('http://', '');
    }
    let ip,ws;
    if (url.indexOf(":") > 0) {
        ip = url.substring(0, url.indexOf(":"));
    } else {
        ip = url.substring(0, url.indexOf("/"));
    }
    if(isLocalHost()){
        url = "ws://" + ip + ":11002/ws";
    }else if(ishttps){
        // url = "wss://" + ip + ":1000/ws";
        url = "wss://" + ip + "/ws";
    }else{
        url = "ws://" + ip + "/ws";
        // url = "ws://" + ip + ":1000/ws";
    }
    try {
        ws = new ReconnectingWebSocket(url, null, {debug: false, reconnectInterval: 5000, maxReconnectInterval: 120000});
    } catch (e) {
        ws = new WebSocket(url);
    }
    // 收到消息时在消息框内显示
    
    ws.onmessage = function(evt) {
        console.info(evt);
        let data = eval("("+evt.data+")");
        callback(data);
    };
    // 断开时会走这个方法
    ws.onclose = function() { 
        console.log("close~~");
    };
    // 连接上时走这个方法
    ws.onopen = function() {   
        console.log("open~~");
    };
}


//get URL加密
function signUrl(orgiUrl) {
	let paramArray = new Array();
	let idx,paramStr; 
	if (orgiUrl != undefined) {
        let url = orgiUrl.substring(orgiUrl.lastIndexOf("/")+1);
		 if ((idx = url.indexOf("&")) > 0) {
			 paramStr = url.substring(0, idx);
			 let params = url.substring(idx+1).split("&");
			 for (let i in params) {
				 if (params[i].split("=")[1] !== "null" && params[i].split("=")[1] !== "") {
					 paramArray.push(params[i]);
				 }
			 }
		 } else {
			 paramStr = url;
		 }
	}
    if (paramArray.length > 0)
    	paramStr += "&"+ paramArray.sort().join("&");
        paramStr += "&sign=" +md5(paramStr+getCookie("token"));
    return paramStr;
}

//导出功能
/**
 * queryUrl  格式如：api/commonExportBO.ajax?cmd=downloadExcelFile
 * params   请求的参数对象:{"date":"2016-07-12"}
 * excelLables  excel的列名: 批次号，时间
 * excelKeys    excel的字段名称:batchNum,date
 * tableName  用于多次提交导出时区分不同的导出，系统唯一
 */
const downloadExcelFile=function(queryUrl,params,excelLables,excelKeys,filename,tableName,isAscTrue){
    
    let progress = document.getElementById('fileProgress');
    let rate = document.getElementById('fileProgressRate');
    let queryBo=queryUrl.substr(0,queryUrl.indexOf(".ajax"));
    let queryCmd=queryUrl.substr(queryUrl.indexOf("cmd=")+4,queryUrl.length);

    var url = queryBo+".ajax?cmd=downloadExcelFile";
    
    let queryParamStr="";
    for(let key in params){
        if(params[key]!=undefined){
            queryParamStr=queryParamStr+"&"+key+"="+params[key];
        }
    }
    tableName = tableName || queryBo+"@"+queryCmd;

    filename = filename||"";

    let that=this;
    params["queryUrl"]=queryBo.replace('api/','')+"|"+queryCmd;
    params["excelKeys"]=excelKeys;
    params["excelLables"]=excelLables;
    params["_ALLEXPORT"]=1;
    params["fileName"]=filename;
    params["tableName"]=tableName;
    
    if(typeof isAscTrue != "undefined"){
        params["isAscTrue"]=isAscTrue;
    }
    that.postUrl(url,params,function(){});
    params["_ALLEXPORT"]=0;

    progress.style.display = "block";
    let checkUrl=queryBo+".ajax?cmd=checkFinishDownLoad&time="+(new Date()).getTime()+"&tableName="+tableName;;

    postUrl(checkUrl,"",function(data){
        if(data.result=="true"){
            rate.style.width = "100%";
            rate.innerHTML = "<div>100%</div>"
            let frameDownloadExcel = document.createElement("iframe");
            frameDownloadExcel.id = "frameDownloadExcel";
            frameDownloadExcel.src = encodeURI('api/'+signUrl(queryBo+".ajax?cmd=downloadExcelFileFromServer&tableName="+tableName));
            frameDownloadExcel.style.display = "none";
            document.body.appendChild(frameDownloadExcel);
            progress.style.display = "none";
            rate.style.width = "1%";
            rate.innerHTML = "<div>1%</div>"
        } else {
            let preRate = 0;
            let reqCount = 0;  //重复请求进度条相同次数
            let interval=setInterval(() => {
                postUrl(checkUrl,"",function(data){
                    if(preRate == data.rate){
                        reqCount++;
                        if(reqCount == 6){     //多次请求进度不变，则认为导出失败取消请求
                            clearInterval(interval);
                            progress.style.display = "none";
                            rate.style.width = "1%";
                            rate.innerHTML = "<div>1%</div>"
                            MessageBox("导出超时");
                        }
                    }else{
                        preRate = data.rate;
                        reqCount = 0;
                    }
                    let rateBar = parseInt(data.rate)-5;
                    if(rate>0){
                        progress.style.display = "none";
                        rate.style.width = rateBar+"%";
                        rate.innerHTML = `<div>${rateBar}%</div>`
                    }
                    if(data.result=="true"){
                        rate.style.width = "100%";
                        rate.innerHTML = "<div>100%</div>"
                        clearInterval(interval);
                        let frameDownloadExcel = document.createElement("iframe");
                        frameDownloadExcel.id = "frameDownloadExcel";
                        frameDownloadExcel.src = encodeURI('api/'+signUrl(queryBo+".ajax?cmd=downloadExcelFileFromServer&tableName="+tableName));
                        frameDownloadExcel.style.display = "none";
                        document.body.appendChild(frameDownloadExcel);
                        const timer = setTimeout(() => {
                            progress.style.display = "none";
                            rate.style.width = "1%";
                            rate.innerHTML = "<div>1%</div>"
                            clearTimeout(timer);
                        },1000)
                    }

                });
            }, 5000)
        }
    });

};

//el-tree控件获取全部id（包括父级id）
/**
 * data 树对象
 * ids  子集选中id集合
 * urlId   节点id字段名称,默认urlId
 * childrenName  子节点对象字段名称,默认children
 */
const treeFn = {
    getTreeParentId(data,ids,urlId="urlId",childrenName="children"){
        let dataCopy = copyObj(data);
        this.ids = ids;
        //遍历生成模拟id,id记录所有父级的id,例子 1-11-123
        this.setSimulateId(dataCopy,urlId,childrenName);
        //获取所有父级id
        this.ids.forEach(id => {
            this.getParentId(dataCopy,id,urlId,childrenName)
        });
        //id转number再去重
        this.ids = Array.from(new Set(this.ids.map(Number)));
        return this.ids;
    },
    ids:[],//用于记录id
    simulateIds:[],
    setSimulateId(data,urlId="urlId",childrenName="children",simulateId){
        data.forEach(el => {
            if(isNotBlank(simulateId)){
                el.simulateId =  simulateId + '-' + el[urlId];
            }else{
                el.simulateId = el[urlId].toString();
            }
            this.simulateIds.push(el.simulateId);
            //有子节点时进行递归
            if(isNotBlank(el[childrenName])&&el[childrenName].length>0){
                this.setSimulateId(el[childrenName],urlId,childrenName,el.simulateId);
            }
        });
    },
    getParentId(data,id,urlId,childrenName){
        data.forEach(el => {
            if(id==el[urlId]){
                let array = el.simulateId.split("-");//id转数组获取索取所有父级id
                this.ids = this.ids.concat(array);
            }
            //有子节点时进行递归
            if(isNotBlank(el[childrenName])&&el[childrenName].length>0){
                this.getParentId(el[childrenName],id,urlId,childrenName);
            }
        });
    },
    checkChange(data,checked,indeterminate,ids){
        let array = data.simulateId.split("-");//id转数组获取索取所有父级id
        if(checked){    //选中节点时
            let currentId = '';//遍历存储id
            array.forEach((id,index) => {   //遍历拿出父级id
                if(index==0){
                    currentId = id;
                }else{
                    currentId += '-' + id;
                }
                ids.push(currentId);
            });
            this.simulateIds.forEach((id,index) => {    //遍历拿出子级id
                if(id.indexOf(data.simulateId)==0){
                    ids.push(id);
                }
            })
            ids = Array.from(new Set(ids)); //数组去重
            return ids;
        }else{
            this.simulateIds.
            array.forEach(a => {
                for(let index=0;index<ids.length-1;index++){
                    if(a==ids[index]){
                        ids.splice(index,1);
                        index--;
                    }
                }
            });
        }
    }
}

//禁用页面输入
/*
    id  页面id
*/
const diabledInput = function(id){
    let dom = document.getElementById(id);
    let inputList = dom.querySelectorAll(".el-input");
    let selectList = dom.querySelectorAll(".el-select");
    let dateList = dom.querySelectorAll(".el-date-editor");
    let textareaList = dom.querySelectorAll(".el-textarea");
    let checkboxList = dom.querySelectorAll(".el-checkbox");
    inputList.forEach(el => {
        el.classList.add("is-disabled");
        el.querySelector("input").disabled=true;
        el.style.pointerEvents = 'none'
    })
    selectList.forEach(el => {
        el.style.pointerEvents = 'none'
    })
    dateList.forEach(el => {
        el.style.pointerEvents = 'none'
        el.classList.add("is-disabled");
    })
    textareaList.forEach(el => {
        el.classList.add("is-disabled");
        el.querySelector("textarea").disabled=true;
    })
    checkboxList.forEach(el => {
        el.classList.add("is-disabled");
        el.querySelector(".el-checkbox__input").classList.add("is-disabled");
        el.style.pointerEvents = 'none'
    })
}

//判断是否为本地环境
const isLocalHost = function(){
    let host = window.location.host;
    if(host.indexOf('localhost')>-1 || host.indexOf('127.0.0.1') >-1 || host.indexOf('192.168') >-1){
        return true
    }else{
        return false
    }
}

//遮罩层方法
const shade = {
    show(){        
        //获取加载中遮罩层对象
        const mainPopup = document.getElementById("mainPopup");
        if(isBlank(mainPopup)) return;
        mainPopup.style.display = "block";
    },
    hide(){
        //获取加载中遮罩层对象
        const mainPopup = document.getElementById("mainPopup");
        if(isBlank(mainPopup)) return;
        mainPopup.style.display = "none";
    }
}
// 格式 内容 
const formatData = function(v){
    if(isBlank(v)){
       return "";
    }
    return v;
}
// 获取 年月下拉列表
const queryMonthList = function(m){
    let date = new Date();
    let year = date.getFullYear();  //获取当前年份
    let month = date.getMonth()+1; //获取当前月份
    let months =[];
    months.push({"codeValue":m,"codeName":"近"+m+"个月"}); // 数字代表近3个月
    for(let i = 1;i <= m; i++){
        let j = month -  i;
        let yyyyMM = "";
        if(j > 9){
            yyyyMM = year + "-"+ j;
            months.push({"codeValue": yyyyMM,"codeName":year+"年"+""+j+"月"});
        }else{
            yyyyMM = year + "-0"+ j;
            months.push({"codeValue":yyyyMM,"codeName":year+"年"+"0"+j+"月"});
        }
    }
     return months;
}

// 获取以后的年月，默认一年
const getYearMonths = function(){
    let date = new Date();
    let year = date.getFullYear();  //获取当前年份
    let month = date.getMonth()+1; //获取当前月份
    let array = [];
    //获取当前年份的月份
    for(month;month<=12;month++){
        let m = month;
        if(m<10){
            m = '0'+m;
        }
        let obj = {
            codeValue:year+"-"+m,
        };
        array.push(obj);
    }
    //获取下年离现月份刚好一年的剩余月份
    let remain = 12 - array.length;
    for(let nextM=1;nextM<=remain;nextM++){
        let m = nextM;
        if(m<10){
            m = '0'+m;
        }
        let obj = {
            codeValue:(year+1)+"-"+m,
        };
        array.push(obj);
    }
    return array;
}

//tableCommon表格高度计算（表格内部和minxi.js监听窗口变化时需要使用）
const initTableHeight = function(){
    let main_frame = document.querySelector(".main_frame").offsetHeight;     //路由内容高度
    let innerTabDom = document.getElementById("innerTab");         //内部tab栏
    let searchListDom = document.querySelector(".search-list");         //搜索内容
    let tableTitleDom = document.querySelector(".table-title");         //表格名称
    let innerTab = 0;
    let searchList = 0;
    let tableTitle = 0;
    if(innerTabDom) innerTab = innerTabDom.offsetHeight;
    if(searchListDom) searchList = searchListDom.offsetHeight;    //搜索内容高度
    if(tableTitleDom) tableTitle = tableTitleDom.offsetHeight;    //表格名称高度
    let tableCommon = document.getElementById('tableCommon');   //组件dom对象
    let table = tableCommon.querySelector('.table_height');     //表格对象
    let tableFooter = tableCommon.querySelector('.table_page').offsetHeight; //组件脚部高度
    table.style.height = (main_frame - innerTab - searchList - tableTitle - tableFooter - 40) + 'px';
}

//对象抛出
const common = {
    copyObj,    //对象深度拷贝
    mergeObj,   //对象合并或拷贝
    copyObjValue, // 复制相同key值
    postUrl,    //请求公用方法
    isBlank,    //是否为空
    isNotBlank, //是否不为空
    md5,        //md5加密
    base64,     //base64转换
    validatemobile, //验证手机号
    validateTel,    //验证固定电话
    formatTime, // 格式时间
    getCookie, // 获取cookie
    getRootPath, // 获取 当前路径
    initDevices, // 初始化打印机
    downloadFile,//下载文件
    startWebSocket,//初始化websocket
    treeFn,//el-tree控件获取全部id
    getMapLength, // 获取json 第一层长度
    downloadExcelFile,//导出文件
    diabledInput,//可操作框禁用
    isLocalHost,//判断是否为本地打开
    shade,//遮罩层公用方法
    formatData, // 格式内容
    getYearMonths,//获取接下来一年的年月
    initTableHeight,//计算表格高度
    queryMonthList, // 获取近3个月列表
}

export default common