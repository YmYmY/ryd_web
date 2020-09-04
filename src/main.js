import Vue from 'vue'
import App from './App.vue'
//路由
import Router from 'vue-router'
//自定义指令
import './utils/directive.js'
//过滤器
import './utils/filter.js'
//公用js
import common from './utils/common.js'
//vuex
import store from './store/index.js'
//百度地图插件
import BaiduMap from 'vue-baidu-map'
//全局引入datapicker组件
import dataPicker from './components/dataPicker/dataPicker.vue'

Vue.config.productionTip = false
//引入公用方法
Vue.prototype.common = common;

//引入路由插件
Vue.use(Router)
const router = new Router({
  mode:"history",
  routes: [ //配置路由，使用数组形式
    {
      path: '/',   //链接路径
      name: 'index',  //路由名称
      meta: {
        title: '首页',
        keep:"true"
      }
    }
  ]
});
/* 路由异常错误处理，尝试解析一个异步组件时发生错误，重新渲染目标页面 */
router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
  router.replace(targetPath);
  }
});
//重写push避免push方法打开相同页面报错
const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
//地图
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: '36gqbKALpcnbkp0utVF7gS30'
})
//日期时间范围选择
Vue.component("dataPicker",dataPicker);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')