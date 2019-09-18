<template>
  <div class="w-full flex flex-row">
    <div class="flex-1 flex-col bg-gray-lighter px-4 py-2 m-2 left-0">
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
    </div>
    <div class="flex-1 bg-gray-lighter px-4 py-2 m-2 text-center align-middle">
      <button
        class="button"
        @click="stop"
      >
        STOP
      </button>
      <button
        class="button"
        @click="recover"
      >
        recover
      </button>
    </div>
    <div class="flex-1 bg-gray-lighter px-4 py-2 m-2">
      <div class="flex flex-col">
        <h6 class="text-center mb-3">Gripper Controls</h6>
        <gripper-controls />
      </div>
    </div>
  </div>
</template>

<script>
import xControls from '../components/controls/xControls.vue'
import yzControls from '../components/controls/yzControls.vue'
import gripperControls from '../components/controls/gripperControls.vue'

export default {
  components: { xControls, yzControls, gripperControls },
  data () {
    return {
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
