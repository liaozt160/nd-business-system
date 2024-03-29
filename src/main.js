import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import i18n from './lang' // internationalization
import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
// import { mockXHR } from '../mock'
// if (process.env.NODE_ENV === 'production') {
//   mockXHR()
// }
/***
 * When I wrote this, only God and I understood what I was doing
 * Now, God only knows
 */
Vue.directive('enterNumber', {
  inserted: function (el) {
    el.addEventListener("keypress",function(e){
      e = e || window.event;
      let charcode = typeof e.charCode === 'number' ? e.charCode : e.keyCode;
      let re = /\d/;
      if(!re.test(String.fromCharCode(charcode)||e=='NA'||e=='未知') && charcode > 9 && !e.ctrlKey){
        if(e.preventDefault){
          e.preventDefault();
        }else{
          e.returnValue = false;
        }
      }
    });
  }
});
// 数字添加千分数
Vue.prototype.toThousands=function(num) {
  let nums = (num || 0).toString(), result = '';
  while (nums.length > 3) {
    result = ',' + nums.slice(-3) + result;
    nums = nums.slice(0, nums.length - 3);
  }
  if (nums) { result = nums + result; }
  return result;
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,

  mounted(){
    if (window.location.origin.indexOf("dev.newdreamservices.com") !== -1 && (window.location.protocol == "http:"||window.location.protocol == "")) {
      //强制https
      window.location.href = "https://" + window.location.href.substring(window.location.protocol.length);
    }
  },
  render: h => h(App),
})
