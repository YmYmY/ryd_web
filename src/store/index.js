import Vue from 'vue'
import Vuex from 'vuex'

//引入vuex状态管理插件
Vue.use(Vuex)
const store = new Vuex.Store({
    state:{
        componentName:"",   //各端登录逻辑处理
    },
    mutations:{
        resetData(state,{name,data}){
            state[name] = data;
        }
    }
});

export default store