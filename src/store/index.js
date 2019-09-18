import Vue from 'vue'
import Vuex from 'vuex'
import connector from './modules/connector.js'
import gripper from './modules/connector.js'
import stream from './modules/stream.js'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    connector,
    gripper,
    stream
  },
  strict: debug,
  plugins: []
})
