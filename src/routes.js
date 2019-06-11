import Home from './views/Home.vue'
import ControlCenter from './views/ControlCenter.vue'
import About from './views/About.vue'

export default {
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }, {
      path: '/controlCenter',
      name: 'controlCenter',
      component: ControlCenter
    }, {
      path: '/about',
      name: 'about',
      component: About
    }, {
      path: '*', // matches everything
      name: 'default',
      component: Home
    }
  ]
}
