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
      <button v-if="$store.state.connector.connected" class="button" @click="disconnect">Disconnect</button>
      <button v-else class="button" @click="connect" :disabled="connecting">Connect</button>
    </div>
    <div>
      <p class="info" v-if="$store.state.connector.connected">Connected to {{ $store.state.connector.ip }}:{{ $store.state.connector.port }}</p>
      <p v-if="connecting" class="meta">Trying to connect to {{ parameters.ip }}:{{ parameters.port }}</p>
      <p class="warning" v-else-if="err">Unable to connect to {{ parameters.ip }}:{{ parameters.port }}</p>
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
        // ip: '192.168.201.128',
        ip: '172.17.74.42',
        port: '9090'
      }
    }
  },
  methods: {
    connect () {
      this.connecting = true
      this.$store.dispatch('connector/connect', this.parameters)
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
      this.$store.dispatch('connector/disconnect')
    }
  }
}
</script>
