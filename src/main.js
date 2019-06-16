import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './App.vue'
import routes from './routes.js'
import storeComponents from './store/rosConnector.js'
import '@/assets/css/main.sass'

const router = new VueRouter(routes)

Vue.use(VueRouter)
Vue.use(Vuex)

const store = new Vuex.Store(storeComponents)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
