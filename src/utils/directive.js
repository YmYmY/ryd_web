import Vue from 'vue'

//获取焦点
Vue.directive('focus', {
  inserted(el) {
    el.focus()
  }
})

//权限管理
Vue.directive('entity', {
  inserted(el, binding) {
    let entityIds = localStorage.getItem("entityIds").split(",");
    let isRemove = true;
    entityIds.forEach(item => {
      if(binding.value==item){
        isRemove = false;
      }
    })
    if(isRemove) el.remove();
  }
})

//只能输入整数
Vue.directive('mynumval', {
  inserted(el, binding,vnode) {
    let ele = el.tagName === 'INPUT' ? el : el.querySelector('input')
    ele.addEventListener("keyup",function(event){
      ele.value = ele.value.replace(/[^\d]/g, '')
      const e = document.createEvent('HTMLEvents')
      e.initEvent('input', true, true)
      ele.dispatchEvent(e);
    });
    //失去焦点时再做一次判断,针对于输入法点击数字选择文字时的坑
    ele.addEventListener("blur",function(event){
      ele.value = ele.value.replace(/[^\d]/g, '')
      const e = document.createEvent('HTMLEvents')
      e.initEvent('input', true, true)
      ele.dispatchEvent(e);
    });
  }
})
//输入两位位小数整数
Vue.directive('mydoubleval', {
  inserted(el, binding,vnode) {
    let ele = el.tagName === 'INPUT' ? el : el.querySelector('input')
    ele.addEventListener("keyup",function(event){
      ele.value = ele.value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')
      const e = document.createEvent('HTMLEvents')
      e.initEvent('input', true, true)
      ele.dispatchEvent(e)
    });
    //失去焦点时再做一次判断,针对于输入法点击数字选择文字时的坑
    ele.addEventListener("blur",function(event){
      ele.value = ele.value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')
      const e = document.createEvent('HTMLEvents')
      e.initEvent('input', true, true)
      ele.dispatchEvent(e)
    });
  }
})
//输入四位位小数整数
Vue.directive('mydouble4val', {
  inserted(el, binding,vnode) {
    let ele = el.tagName === 'INPUT' ? el : el.querySelector('input')
    ele.addEventListener("keyup",function(event){
      ele.value = ele.value.replace(/^\D*(\d*(?:\.\d{0,4})?).*$/g, '$1')
      const e = document.createEvent('HTMLEvents')
      e.initEvent('input', true, true)
      ele.dispatchEvent(e)
    });
    //失去焦点时再做一次判断,针对于输入法点击数字选择文字时的坑
    ele.addEventListener("blur",function(event){
      ele.value = ele.value.replace(/^\D*(\d*(?:\.\d{0,4})?).*$/g, '$1')
      const e = document.createEvent('HTMLEvents')
      e.initEvent('input', true, true)
      ele.dispatchEvent(e)
    });
  }
})