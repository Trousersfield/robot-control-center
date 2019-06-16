<template>
  <div class="w-full flex flex-col control-grid">
    <div class="w-full flex flex-row">
      <div class="flex-1 bg-gray-lighter px-4 py-2 m-2">
        <robot-model></robot-model>
      </div>
      <div class="flex-1 bg-gray-lighter px-4 py-2 m-2">
        <camera-stream></camera-stream>
      </div>
    </div>
    <control-panel></control-panel>
  </div>
</template>

<script>
import CameraStream from '../components/CameraStream.vue'
import ControlPanel from '../components/ControlPanel.vue'
import RobotModel from '../components/RobotModel.vue'

export default {
  async beforeMount() {
    console.log('got called')

    var ros = new ROSLIB.Ros({
      url: 'ws://192.168.201.128:9090'
    })

    ros.on('connection', () => {
      console.log('connected to webserver')
    })

    ros.on('error', function(error) {
      console.log('Error connecting to websocket server: ', error)
    })

    var cmdVel = new ROSLIB.Topic({
      ros : ros,
      name : '/cmd_vel',
      messageType : 'geometry_msgs/Twist'
    })
    
    var twist = new ROSLIB.Message({
      linear : {
        x : 0.1,
        y : 0.2,
        z : 0.3
      },
      angular : {
        x : -0.1,
        y : -0.2,
        z : -0.3
      }
    })

    cmdVel.publish(twist)
  },
  components: {
    CameraStream, ControlPanel, RobotModel
  }
}
</script>

<style lang="sass" scoped>
.control-grid
  >
    @apply m-2
</style>
