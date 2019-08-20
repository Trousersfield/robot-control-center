import Vue from 'vue'

const isNewPos = (state, pos) => {
  const oldPos = JSON.stringify(state.position)
  const newPos = JSON.stringify(pos)
  return oldPos !== newPos
}

const isNewOrientation = (state, orientation) => {
  const oldOrientation = JSON.stringify(state.orientation)
  const newOrientation = JSON.stringify(orientation)
  return oldOrientation !== newOrientation
}

export default {
  state: {
    ros: undefined,
    connected: false,
    topics: {},
    position: undefined, // current position
    orientation: undefined // current orientation
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
      state.position = undefined
      state.orientation = undefined
    },
    setTopic (state, topic) {
      Vue.set(state.topics, topic.name, topic)
    },
    resetTopic (state, payload) {
      Vue.delete(state.topic, payload.topic)
    },
    setPosition (state, position) {
      console.log('setting position: ', position)
      state.position = position
    },
    setOrientation (state, payload) {
      state.orientation = payload
    },
    setRobot (state, payload) {
      state.position = payload.position
      state.orientation = payload.orientation
    },
    resetRobot (state) {
      state.position = undefined
      state.orientation = undefined
    },
  },

  actions: {
    connect ({ commit, state, dispatch }, payload) {
      return new Promise((resolve, reject) => {

        if (state.connected) {
          commit('disconnect')
          resolve()
        }

        const ros = new ROSLIB.Ros({
          url: `ws://${payload.ip}:${payload.port}`
        })
        commit('setRos', ros)

        ros.on('connection', () => {
          console.log('connected to webserver')
          commit('connect')
          dispatch('subscribe', payload.topics) // init default topics
            .then(() => {
              dispatch('position') // init robot's current position
            })
          // resolve()
        })

        ros.on('error', (event) => {
          console.log('Error connecting to websocket server: ', event)
          commit('disconnect')
          // reject()
        }),

        ros.on('close', (event) => {
          console.log('Connection to websocket server closed')//, event)
          commit('disconnect')
          // reject()
        })
        resolve()
      })
    },
    disconnect ({ commit, state }) {
      state.ros.close()
      commit('disconnect')
    },
    subscribe ({ commit, state }, payload) {
      return new Promise(resolve => {
        if (!state.connected) resolve()

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
        resolve()
      })
    },
    unsubscribe ({ commit, state }, topic) {
      if (!state.connected) return

      if (state.topics[topic]) {
        state.topics[topic].unsubscribe()
        commit('resetTopic', topic)
      }
    },
    position ({ state, commit }) {
      const topicName = '/panda_movement_bridge/PosePublisher'
      const topic = new ROSLIB.Topic({
        ros: state.ros,
        name: topicName, // topic name
        messageType: 'geometry_msgs/Pose' // topic's msg type
      })

      state.topics[topicName].subscribe((msg) => {
        // check if payload differs to current state
        if (isNewPos(state, msg.position)) commit('setPosition', msg.position)
        if (isNewOrientation(state, msg.orientation)) commit('setOrientation', msg.orientation)
        // console.log('Received message on ' + topicName + ': ' + JSON.stringify(msg))
      })
    },
    move ({ state, commit }, payload) {
      const topicName = '/panda_movement_bridge/PoseListener'
      const topic = new ROSLIB.Topic({
        ros: state.ros,
        name: topicName, // topic name
        messageType: 'geometry_msgs/Pose' // topic's msg type
      })

      /* var poseMsg = new ROSLIB.Message({
        position: { ...payload.position },
        orientation: {
          x: 0.707102,
          y: -0.00000908329,
          z: -0.707112,
          w: 0.00000867363
        }
      }) */

      var poseMsg = new ROSLIB.Message({
        position: payload.position,
        orientation: payload.orientation
      })

      // topic.publish(poseMsg)
      state.topics[topicName].publish(poseMsg)
    }
  }
}
