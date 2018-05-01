import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'
import './global' // global

import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog'// error log
import './permission' // permission control
// import './mock' // simulation data

import YunserUI from 'yunser-ui-vue'// 答题控件
import 'yunser-ui-vue/dist/yunser-ui.css'// 答题控件
import './scss/main.scss'
import 'nprogress/nprogress.css'
import qs from 'qs'
import storage from './utils/storage'
import ui from './components/index'
import * as filters from './filters' // global filters
import VueDPlayer from '../src/index'

Vue.use(VueDPlayer)
Vue.use(Element, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false
Vue.use(YunserUI)
Vue.prototype.$qs = qs
Vue.prototype.$storage = storage
Vue.use(ui)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})
