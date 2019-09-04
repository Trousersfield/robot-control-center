<template>
  <div class="w-1/2 flex flex-col">
    <div class="flex flex-row">
      <div class="w-2/3 input-basic">
        <label for="ip">IP Address</label>
        <input id="ip" type="text" placeholder="192.168.1.1" v-model="parameters.ip">
      </div>
      <div class="w-1/3 input-basic">
        <label for="port">Port</label>  
        <input id="port" type="text" placeholder="9090" v-model="parameters.port">
      </div>
    </div>
    <div class="flex content-center justify-between flex-wrap p-2">
      <button v-if="$store.state.connected" class="button" @click="disconnect">Disconnect</button>
      <button v-else class="button" @click="connect" :disabled="connecting">Connect</button>
    </div>
    <div>
      <p class="info" v-if="$store.state.connected">Connected to {{ $store.state.ip }}:{{ $store.state.port }}</p>
      <p v-if="connecting" class="meta">Trying to connect to {{ parameters.ip }}:{{ parameters.port }}</p>
      <p class="warning" v-else-if="err">Unable to connect to {{ parameters.ip }}:{{ parameters.port }}</p>
    </div>
    <!--<div v-if="$store.state." class="flex flex-col">
      <div ></div>
    </div>-->
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      connecting: false,
      err: false,
      parameters: {
        // ip: '192.168.201.128',
        ip: '172.17.74.42',
        port: '9090',
        topics: [
            { name: '/panda_movement_bridge/PosePublisher', messageType: 'geometry_msgs/Pose' }, // current position topic
            { name: '/panda_movement_bridge/PoseListener', messageType: 'geometry_msgs/Pose' }, // goal position to move robot topic */
            { name: '/panda_movement_bridge/StopListener', messageType: 'std_msgs/Bool' },
            { name: '/franka_control/error_recovery/goal', messageType: 'franka_control/ErrorRecoveryActionGoal' },
            { name: 'gripper', messageType: 'gripper' }
          ]
      }
    }
  },
  methods: {
    connect () {
      this.connecting = true
      this.$store.dispatch('connect', this.parameters)
        .then((res) => {
          if (res) console.log('res: ', res)
          this.connecting = false
        })
        .catch(error => {
          this.connecting = false
          this.err = true
          console.log('Unable to connect to websocket server: ', error)
        })
    },
    disconnect () {
      this.$store.dispatch('disconnect')
    }
  }
}
</script>
