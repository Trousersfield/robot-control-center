<template>
  <div>
  <div class="w-full flex flex-row">
    <!-- <div class="flex-1 flex-col bg-gray-lighter px-4 py-2 m-2 left-0"> -->
    <div class="flex-1 flex-col card">
      <div class="flex items-center justify-center">
        <div>Move distance: </div>
        <div class="w-20">
          <div class="input-basic">
            <input id="gripperSpeed" type="text" v-model="distance">
          </div>
        </div>
        <div class="meta">m</div>
      </div>
      <div class="flex">
        <yz-controls class="flex-1" @move="move"/>
        <x-controls class="flex-1" @move="move"/>
      </div>
      <div class="flex items-center justify-center">
        <div class="button-group">
          <button @click="stop">STOP</button>
          <button @click="recover" title="make robot recover from error state">RECOVER</button>
        </div>  
      </div>
    </div>
    <!-- <div class="flex-1 bg-gray-lighter px-4 py-2 m-2"> -->
    <div class="flex-1 card">
      <div class="flex flex-col relative">
        <button
          class="button-icon absolute top-0 right-0"
          @click="showRobotInfo = !showRobotInfo"
        >
          <info-icon />
        </button>
        <h6 class="text-center mb-3">Joint Controls</h6>
        <joint-controls v-if="jointsSet" />
        <p v-else class="warning">no joint data available</p>
      </div>
    </div>
  </div>
  <div v-if="showRobotInfo" class="modal">
    <button
      class="button-icon absolute top-0 right-0 mr-2 mt-2"
      @click="showRobotInfo = !showRobotInfo"
      title="close"
    >
      <x-icon />
    </button>
    <div class="header">Robot Joint Info</div>
    <div class="content">
      <img src="../assets/joint-info.png" />
    </div>
  </div>
  </div>
</template>

<script>
import xControls from '../components/controls/xControls.vue'
import yzControls from '../components/controls/yzControls.vue'
import gripperControls from '../components/controls/gripperControls.vue'
import jointControls from '../components/controls/jointControls.vue'
import { InfoIcon, XIcon } from 'vue-feather-icons'

export default {
  components: { xControls, yzControls, gripperControls, jointControls, InfoIcon, XIcon },
  data () {
    return {
      showRobotInfo: false,
      yzControl: true,
      direction: 'y',
      handAngle: 0,
      distance: 0.1
    }
  },
  computed: {
    gripperOpen () {
      return true
    },
    validAngle () {
      return Number.isInteger(this.handAngle) && ( -360 < handAngle < 360 )
    },
    jointsSet () {
      return this.$store.state.connector.connected && this.$store.getters['connector/jointsSet']
    }
  },
  methods: {
    stop () {
      this.$store.dispatch('connector/stop')
    },
    turnHand () {
      this.$store.dispatch('connector/turnHand', { direction: this.direction, angle: this.handAngle })
    },
    recover () {
      this.$store.dispatch('connector/recover')
    },
    move (pos) {
      this.$store.dispatch('connector/move', { distance: parseFloat(this.distance), direction: pos })
    },
  }
}
</script>

<style lang="sass" scoped>
.orientation-controls
  @apply flex w-full

.emergency-stop
  @apply p-2 rounded-lg bg-red cursor-pointer text-red-darkest text-lg font-bold

  &:hover
    @apply bg-red-darker text-gray-darkest
</style>
