import Vue from 'vue'
import App from './App.vue'
import '@/assets/css/main.sass'

/* const routes = [
  { path: '/routes/connector' }
] */

new Vue({
  // routes,
  render: h => h(App),
}).$mount('#app')
