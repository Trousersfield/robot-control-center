const state = {
  name: undefined,
  effort: undefined,
  header: undefined,
  position: undefined,
  velocity: undefined
}

const mutations = {
  set (state, payload) {
    Object.assign(state, payload)
  },
  update (state, payload) {
    state[payload.key] = payload.value
  }
}

const actions = {
  move ({ commit }, msg) {
    const topicName = '/panda_movement_bridge/GripperListenerMove'

    dispatch('connector/publishMessage', { topicName, msg })
    commit('set', msg)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
