import Vue from 'vue'
import Main from '@/main.vue'
import Router from '@/router/router.js'
import VueResource from 'vue-resource'

Vue.config.productionTip = false
Vue.use(VueResource)

new Vue({
  router: Router,
  render: h => h(Main),
}).$mount('#app')
