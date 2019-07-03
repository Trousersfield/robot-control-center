import Vue from 'vue'

export default {
  state: {
    ros: undefined,
    connected: false,
    topics: {}
  },
  mutations: {
    setRos (state, ros) {
      state.ros = ros
    },
    connect (state) {
      state.connected = true
    },
    disconnect (state) {
      state.connected = false
      state.ros = undefined
    },
    setTopic (state, topic) {
      Vue.set(state.topics, topic.name, topic)
    },
    resetTopic (state, payload) {
      Vue.delete(state.topic, payload.topic)
    }
  },
  actions: {
    connect ({ commit, state, dispatch }, payload) {
      return new Promise((resolve, reject) => {

        if (state.connected) commit('disconnect')
        const ros = new ROSLIB.Ros({
          url: `ws://${payload.ip}:${payload.port}`
        })
        commit('setRos', ros)

        ros.on('connection', () => {
          console.log('connected to webserver')
          commit('connect')
          dispatch('subscribe', payload.topics) // initialize default topics
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
      state.ros.close()
      commit('disconnect')
    },
    subscribe ({ commit, state }, payload) {
      if (!state.connected) return

      for (let entry of payload) {
        if (!state.topics[entry.name]) {
          const topic = new ROSLIB.Topic({
            ros: state.ros,
            name: entry.name, // topic name
            messageType: entry.messageType // topic's msg type
          })
          commit('setTopic', topic)
        } else console.log('already subscribed to topic ', entry.name)
      }
    },
    unsubscribe ({ commit, state }, topic) {
      if (!state.connected) return

      if (state.topics[topic]) {
        state.topics[topic].unsubscribe()
        commit('resetTopic', topic)
      }
    },
    position ({ state, commit }) {
      // const topicName = '/panda_movement_bridge/PosePublisher'
      const topic = new ROSLIB.Topic({
        ros: state.ros,
        name: '/panda_movement_bridge/PosePublisher', // topic name
        messageType: 'geometry_msgs/Pose' // topic's msg type
      })

      topic.subscribe((msg) => {
        console.log('Received message on ' + topicName + ': ' + JSON.stringify(msg))
      })

      /* state.topics[topicName].subscribe((msg) => {
        console.log('Received message on ' + topicName + ': ' + JSON.stringify(msg))
      }) */
    },
    move ({ state, commit }, payload) {
      // const topicName = '/panda_movement_bridge/PoseListener'
      const topic = new ROSLIB.Topic({
        ros: state.ros,
        name: '/panda_movement_bridge/PoseListener', // topic name
        messageType: 'geometry_msgs/Pose' // topic's msg type
      })

      var poseMsg = new ROSLIB.Message({
        position: {
          x: 0.5,
          y: 0.5,
          z: 0
        },
        orientation: {
          x: 0.707102,
          y: -0.00000908329,
          z: -0.707112,
          w: 0.00000867363
        }
      })

      topic.publish(poseMsg)

      // state.topics[topicName].publish(poseMsg)
    }
  }
}
