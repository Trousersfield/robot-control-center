<template>
  <div class="w-full flex flex-row">
    <div class="flex-1 flex-col bg-gray-lighter px-4 py-2 m-2 left-0">
      <div class="w-full flex">
        <yz-controls class="flex-1" />
        <x-controls class="flex-1" />
        <!--<div v-else class="orientation-controls">
          <div class="w-1/3">
            <label for="orientation-direction">
              Orientation Direction
            </label>
            <div class="relative">
              <select class="block w-full" id="orientation-direction" v-model="direction">
                <option value="y">Y</option>
                <option value="x">X</option>
                <option value="z">Z</option>
              </select>
            </div>
          </div>
          <div class="w-1/3">
            <label for="orientation-angle">
              Angle to turn
            </label>
            <input id="orientation-angle" type="text" class="block w-full" placeholder="enter angle..." v-model="handAngle" />
          </div>
          <div class="w-1/3">
            <button class="button" @click="turnHand">Turn Hand</button>
          </div>
        </div>-->
      </div>
    </div>
    <div class="flex-1 bg-gray-lighter px-4 py-2 m-2 text-center align-middle">
      <button
        class="emergency-stop"
        @click="stop"
      >
        EMERGENCY<br>STOP
      </button>
      <button
        class="emergency-stop"
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
      handAngle: 0
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
      this.$store.dispatch('stop')
    },
    turnHand () {
      this.$store.dispatch('turnHand', { direction: this.direction, angle: this.handAngle })
    },
    recover () {
      this.$store.dispatch('recover')
    }
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
