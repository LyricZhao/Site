import ElementUI from 'element-ui'
import Main from '@/main.vue'
import Router from '@/router/router.js'
import Vue from 'vue'
import VueResource from 'vue-resource'

import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueResource)

new Vue({
  router: Router,
  render: h => h(Main),
}).$mount('#app')
