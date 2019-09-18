const state = {
    live: false,
    url: '',
    type: ''
  }

const mutations = {
    connect (state, payload) {
      state.live = true
      Object.assign(state, payload)
    },
    disconnect (state) {
      state.live = false
    }
  }

const actions = {
    connect ({ commit }, payload) {
      return new Promise(resolve => {


        resolve()
      })
    }
  }

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
