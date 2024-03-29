// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueFire from 'vuefire'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'

import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader


Vue.use(VueFire)
Vue.use(Vuetify)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
