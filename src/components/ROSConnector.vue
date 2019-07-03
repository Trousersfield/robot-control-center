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
      <button v-if="$store.state.connected" class="button-basic" @click="disconnect">Disconnect</button>
      <button v-else class="button-basic" @click="connect" :disabled="connecting">Connect</button>
      <button class="button-basic" @click="move">Move bitch</button>
      <button class="button-basic" @click="listen">Listen</button>
    </div>
    <div>
      <p v-if="$store.state.connected">Connected to {{ parameters.ip }}:{{ parameters.port }}</p>
      <p v-if="connecting" class="meta">Trying to connect to {{ parameters.ip }}:{{ parameters.port }}</p>
      <p v-else-if="err">Unable to connect to {{ parameters.ip }}:{{ parameters.port }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      connecting: false,
      err: false,
      parameters: {
        ip: '192.168.201.128',
        port: '9090',
        topics: [
          { name: '/panda_movement_bridge/PosePublisher',
            messageType: 'geometry_msgs/Pose' }, // current position topic
          { name: '/panda_movement_bridge/PoseListener',
            messageType: 'geometry_msgs/Pose' } // goal position to move robot topic
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
    },
    move () {
      this.$store.dispatch('move', {
        msg: { x: 0, y: 0, z: 0 } }
      )
    },
    listen () {
      this.$store.dispatch('position')
    }
  }
}
</script>
