const services = [
  {
    name: '/panda_movement_bridge/JointService',
    serviceType: '/pandarosbridge/jntMovement',
    emptyRequest: { joint0: 0, joint1: 0, joint2: 0, joint3: 0, joint4: 0, joint5: 0, joint6: 0, }
  },
  {
    name: '/panda_movement_bridge/moveSpeedService',
    serviceType: '/pandarosbridge/movementSpeed'
  }
]

export default {
  services
}
