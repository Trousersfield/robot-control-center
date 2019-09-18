import quaternion from '../../util/quaternion.js'
import service from '../../util/service.js'
import topic from '../../util/topic.js'

const publishMsg = (state, topicName, msg) => {
  const idx = state.topics.findIndex(t => t.name === topicName)
  if (idx > -1) state.topics[idx].publish(msg)
}

const callService = (state, serviceName, request) => {
  const idx = state.services.findIndex(s => s.name === serviceName)
  if (idx > -1) state.services[idx].callService(request, result => {
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
  speed: undefined,
  joint0: undefined,
  joint1: undefined,
  joint2: undefined,
  joint3: undefined,
  joint4: undefined,
  joint5: undefined,
  joint6: undefined,
  gripper: {
    name: undefined,
    effort: undefined,
    position: undefined,
    velocity: undefined
  }
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
    Object.assign(state.gripper, payload)
  },
  // variable updates
  softUpdate (state, payload) {
    const stateKeys = Object.keys(state)
    Object.keys(payload.res).forEach(key => {
      if (payload.topic.name.includes('gripper')) {
        const gripperKeys = Object.keys(state.gripper)
        if (gripperKeys.includes(key)) state.gripper[key] = payload.res[key]
      }
      else if (stateKeys.includes(key)) {
        state[key] = payload.res[key]
      } else {
        console.log('unknown key ', key, ': ', payload.res[key])
      }
    })
  }
}
  
const actions = {
  connect ({ commit, state, dispatch }, payload) {
    return new Promise(resolve => {

      if (state.connected) {
        commit('disconnect')
        resolve()
      }

      const ros = new ROSLIB.Ros({
        url: `ws://${payload.ip}:${payload.port}`
      })
      commit('setRos', ros)

      ros.on('connection', () => {
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

      ros.on('error', () => {
        commit('disconnect')
        resolve()
      }),

      ros.on('close', () => {
        commit('disconnect')
        resolve()
      })
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

    for (let pubTopic of publishers) {
      const idx = state.topics.findIndex(t => t.name === pubTopic.name)
      state.topics[idx].subscribe(res => {
        commit('softUpdate', { topic: pubTopic, res: res })
      })
    }
  },
  move ({ state }, payload) {
    const topicName = '/panda_movement_bridge/PoseListener'
    // const topicName = '/joint_states'
    /* const topic = new ROSLIB.Topic({
      ros: state.ros,
      name: topicName, // topic name
      messageType: 'geometry_msgs/Pose' // topic's msg type
    }) */

    let movement = state.position
    const distance = payload.distance
    switch (payload.direction) {
      case 'up':
        movement.z = movement.z + distance
        break
      case 'down':
        movement.z = movement.z - distance
        break
      case 'left':
        movement.y = movement.y - distance
        break
      case 'right':
        movement.y = movement.y + distance
        break
      case 'in':
        movement.x = movement.x - distance
        break
      case 'out':
        movement.x = movement.x + distance
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

  recover({ state }) {
    const topicName = '/franka_control/error_recovery/goal'

    publishMsg(state, topicName, {})
  },

  stop ({ state }) {
    const topicName = '/panda_movement_bridge/StopListener'

    const msg = new ROSLIB.Message(true)

    publishMsg(state, topicName, msg)
  },

  setSpeed ({ state, commit}, speed) {
    const topicName = '/panda_movement_bridge/SpeedListener'

    const msg = { data: speed }

    publishMsg(state, topicName, msg)
    commit('setSpeed', speed)
  },

  serviceSpeed ({ state }) {
    const serviceName = '/panda_movement_bridge/moveSpeedService'

    const request = {
      moveSpeed: 0.2
    }

    callService(state, serviceName, request)
  },

  turnJoint ({ state, getters }, payload) {
    const serviceName = '/panda_movement_bridge/JointService'

    let request = {}
    Object.keys(getters['joints']).forEach(key => {
      request[key] = 0
    })
    request = Object.assign(request, payload)

    callService(state, serviceName, request)
  },
  
  moveGripper ({ state, commit }, msg) {
    const topicName = '/panda_movement_bridge/GripperListenerMove'
    console.log('msg: ', msg)

    publishMsg(state, topicName, msg)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
