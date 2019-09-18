import quaternion from '../../util/quaternion.js'
import service from '../../util/service.js'
import topic from '../../util/topic.js'

const publishMsg = (state, topicName, msg) => {
  const idx = state.topics.findIndex(t => t.name === topicName)
  if (idx > -1) state.topics[idx].publish(msg)
}

const callService = (state, serviceName, request) => {
  const idx = state.services.findIndex(s => s.name === serviceName)
  console.log('id: ', idx)
  console.log('services: ', state.services)
  if (idx > -1) state.services[idx].callService(request, result => {
    console.log('service result: ', result)
    const stateKeys = Object.keys(state)
    Object.keys(result).forEach(key => {
      if (!stateKeys.includes(key)) return // unable to properly map result dimension
      state[key] = result[key]
    })
  })
}

const state = {
    ros: undefined,
    connected: false,
    ip: '',
    port: '',
    topics: [],
    services: [],
    position: undefined, // current position
    orientation: undefined, // current orientation
    gripper: {
      effort: undefined,
      header: undefined,
      name: undefined,
      position: undefined,
      velocity: undefined,
    },
    speed: undefined,
    joint0: undefined,
    joint1: undefined,
    joint2: undefined,
    joint3: undefined,
    joint4: undefined,
    joint5: undefined,
    joint6: undefined
  }

const getters = {
    jointsSet: state => {
      return state.joint0 && state.joint1 && state.joint2 && state.joint3 && state.joint4 && state.joint5 && state.joint6
    },
    joints: state => {
      return {
        joint0: state.joint0,
        joint1: state.joint1,
        joint2: state.joint2,
        joint3: state.joint3,
        joint4: state.joint4,
        joint5: state.joint5,
        joint6: state.joint6,
      }
    }
  }

const mutations = {
    setRos (state, ros) {
      state.ros = ros
    },
    connect (state, payload) {
      state.ip = payload.ip
      state.port = payload.port
      state.connected = true
    },
    disconnect (state) {
      state.connected = false
      state.ip = ''
      state.port = ''
      state.topics = []
      state.ros = undefined
      state.position = undefined
      state.orientation = undefined,
      state.speed = undefined,
      state.joints = {}
    },
    addTopic (state, topic) {
      const idx = state.topics.findIndex(t => t.name === topic.name)
      if (idx < 0) state.topics.push(topic)
    },
    removeTopic (state, topic) {
      const idx = state.topics.findIndex(t => t.name === topic.name)
      if (idx > -1) state.topics.splice(idx, 1)
    },
    addService (state, service) {
      const idx = state.services.findIndex(s => s.name === service.name)
      if (idx < 0) state.services.push(service)
      console.log('service added: ', state.services)
    },
    removeService (state, service) {
      const idx = state.topics.findIndex(s => s.name === service.name)
      if (idx > -1) state.services.splice(idx, 1)
    },
    setPosition (state, position) {
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
    setSpeed (state, speed) {
      state.speed = speed
    },
    setGripper (state, payload) {
      state.gripper = payload
    },
    // variable updates
    softUpdate (state, payload) {
      const stateKeys = Object.keys(state)
      Object.keys(payload.res).forEach(key => {
        if (payload.topic.name.includes('gripper')) state.gripper[key] = payload.res[key]
        else if (stateKeys.includes(key)) {
          state[key] = payload.res[key]
        }
      })
    }
  }
  
const actions = {
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
          console.log('connected to rosbridge')
          commit('connect', payload)
          
          // initialize topics
          dispatch('subscribe')
            .then(() => {
              dispatch('initPublishers')
              resolve()
            })
          
          // initialize services
          dispatch('serviceRequest')
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
        resolve()
      })
    },
    disconnect ({ commit, state }) {
      state.ros.close()
      commit('disconnect')
    },
    subscribe ({ commit, state }) {
      const listeners = topic.listeners
      const publishers = topic.publishers
      return new Promise(resolve => {
        if (!state.connected) resolve()

        for (let entry of [...listeners, ...publishers]) {
          const idx = state.topics.findIndex(t => t.name === entry.name)
          if (!state.topics[idx]) {
            const topic = new ROSLIB.Topic({
              ros: state.ros,
              name: entry.name, // topic name
              messageType: entry.messageType // topic's msg type
            })
            commit('addTopic', topic)
          } else console.log('already subscribed to topic ', entry.name)
        }
        resolve()
      })
    },
    serviceRequest ({ commit, state }) {
      if (!state.connected) return
      const services = service.services

      for (let entry of services) {
        const idx = state.services.findIndex(t => t.name === entry.name)
        if (!state.services[idx]) {
          const newService = new ROSLIB.Service({
            ros: state.ros,
            name: entry.name,
            serviceType: entry.serviceType
          })
          commit('addService', newService)
        } else console.log('already requested service ', entry.name)

        // init service with empty request
        if (entry.emptyRequest) callService(state, entry.name, entry.emptyRequest)
      }
    },
    unsubscribe ({ commit, state }, topic) {
      if (!state.connected) return
      const idx = state.topics.findIndex(t => t.name === topic)

      if (idx > -1) {
        state.topics[idx].unsubscribe()
        commit('removeTopic', topic)
      }
    },
    initPublishers ({ state, commit }) {
      const publishers = topic.publishers

      for (let topic of publishers) {
        const idx = state.topics.findIndex(t => t.name === topic.name)
        state.topics[idx].subscribe(res => {
          commit('softUpdate', { topic: topic, res: res })
        })
      }
    },
    move ({ state, commit }, payload) {
      const topicName = '/panda_movement_bridge/PoseListener'
      // const topicName = '/joint_states'
      const topic = new ROSLIB.Topic({
        ros: state.ros,
        name: topicName, // topic name
        messageType: 'geometry_msgs/Pose' // topic's msg type
      })

      let movement = state.position
      switch (payload.direction) {
        case 'up':
          movement.z = movement.z + 0.3
          break
        case 'down':
          movement.z = movement.z - 0.3
          break
        case 'left':
          movement.y = movement.y - 0.3
          break
        case 'right':
          movement.y = movement.y + 0.3
          break
        case 'in':
          movement.x = movement.x - 0.05
          break
        case 'out':
          movement.x = movement.x + 0.05
          break
        default: 
          break
      }

      var poseMsg = new ROSLIB.Message({
        position: movement,
        orientation: state.orientation
      })

      publishMsg(state, topicName, poseMsg)
    },

    turnHand ({ state, commit }, { direction, angle }) {
      const topicName = '/panda_movement_bridge/PoseListener'
      const computedTurn = quaternion.turn(state.orientation, direction, angle)
      const poseMsg = { position: state.position, orientation: computedTurn }

      publishMsg(state, topicName, poseMsg)
      commit('setOrientation', computedTurn)
    },

    recover({ state, commit }) {
      const topicName = '/franka_control/error_recovery/goal'

      publishMsg(state, topicName, {})
    },

    stop ({ state, commit }) {
      const topicName = '/panda_movement_bridge/StopListener'

      const msg = new ROSLIB.Message(true)

      publishMsg(state, topicName, msg)
    },

    moveGripper ({ state, commit }, msg) {
      const topicName = '/panda_movement_bridge/GripperListenerMove'

      publishMsg(state, topicName, msg)
      commit('setGripper', msg)
    },

    setSpeed ({ state, commit}, speed) {
      const topicName = '/panda_movement_bridge/SpeedListener'

      const msg = { data: speed }

      publishMsg(state, topicName, msg)
      commit('setSpeed', speed)
    },

    serviceMove ({ state, commit }) {
      const serviceName = '/panda_movement_bridge/JointService'

      const request = {
        joint0: -0.2,
        joint1: 0,
        joint2: 0,
        joint3: 0,
        joint4: 0,
        joint5: 0,
        joint6: 0
      }

      callService(state, serviceName, request)
    },

    serviceSpeed ({ state, commit }) {
      const serviceName = '/panda_movement_bridge/moveSpeedService'

      const request = {
        moveSpeed: 0.2
      }

      callService(state, serviceName, request)
    },

    turnJoint ({ state, getters, commit }, payload) {
      const serviceName = '/panda_movement_bridge/JointService'

      let request = {}
      Object.keys(getters['connector/joints']).forEach(key => {
        request[key] = 0
      })
      request = Object.assign(request, payload)
      console.log('request: ', request)

      callService(state, serviceName, request)
    }
  }

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
