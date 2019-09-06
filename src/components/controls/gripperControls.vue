<template>
  <div class="w-full flex flex-col">
    <div class="flex justify-center">
      <div class="button-group">
        <button
          @click="moveGripper('open')"
          :class="{ active: !maxOpened, active: opening, disabled: disabled }"
        >
          OPEN
        </button>
        <button
          @click="moveGripper('close')"
          :class="{ active: !maxClosed, active: closing, disabled: disabled }"
        >
          CLOSE
        </button>
      </div>
    </div>
    <div class="flex items-center justify-center">
      <div>Speed: </div>
      <div class="w-20">
        <div class="input-basic">
          <input id="gripperSpeed" type="text" v-model="speed">
        </div>
      </div>
      <div class="meta">m/s</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      width: 0.5,
      speed: '0.1'
    }
  },
  computed: {
    maxOpened () {
      return this.$store.state.gripper.width > 0.079
    },
    maxClosed () {
      return this.$store.state.gripper.width < 0.0015
    },
    opening () {
      return this.$store.state.gripper.opening
    },
    closing () {
      return this.$store.state.gripper.closing
    },
    disabled () {
      return (this.opening && this.closing) || parseFloat(this.speed) <= 0
    }
  },
  methods: {
    moveGripper (direction) {
      let width = this.$store.state.gripper.width
      switch (direction) {
        case 'open':
          width += 0.02
          break
        case 'close':
          width -= 0.02
          break
        default:
          break
      }
      this.$store.dispatch('moveGripper', { width: width, speed: parseFloat(this.speed) })
    }
  }
}
</script>
