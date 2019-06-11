import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import routes from './routes.js'
import '@/assets/css/main.sass'

const router = new VueRouter(routes)

Vue.use(VueRouter)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
