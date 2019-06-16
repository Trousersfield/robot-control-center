let ros

export default {
  state: {
    connected: false
  },
  mutations: {
    connect (state) {
      state.connected = true
    },
    disconnect (state) {
      state.connected = false
    }
  },
  actions: {
    connect ({ commit, state }, payload) {
      return new Promise((resolve, reject) => {

        if (state.connected) commit('disconnect')
        ros = new ROSLIB.Ros({
          url: `ws://${payload.ip}:${payload.port}`
        })

        ros.on('connection', () => {
          console.log('connected to webserver')
          commit('connect')
          resolve()
        })

        ros.on('error', (event) => {
          console.log('Error connecting to websocket server: ', event)
          commit('disconnect')
          reject()
        }),

        ros.on('close', (event) => {
          console.log('Connection to websocket server closed')//, event)
          commit('disconnect')
          reject()
        })
      })
    },
    disconnect ({ commit, state }) {
      ros.close()
      commit('disconnect')
    }
  }
}
