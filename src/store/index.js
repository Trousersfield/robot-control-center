import Vue from 'vue'
import Vuex from 'vuex'
import connector from './modules/connector.js'
import stream from './modules/stream.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    connector,
    stream
  },
  strict: false,
  plugins: []
})
