<template>
  <div class="w-full flex flex-col">
    <h4 class="text-center mb-4">Gripper Controls</h4>
    <div class="flex justify-center">
      <div class="button-group mb-2">
        <button
          @click="move('open')"
          :class="{ active: !maxOpened, active: opening, disabled: disabled }"
          title="Open gripper"
        >
          OPEN
        </button>
        <button
          @click="move('close')"
          :class="{ active: !maxClosed, active: closing, disabled: disabled }"
          title="Close gripper without force"
        >
          CLOSE
        </button>
        <button
          @click="grasp"
          :class="{ active: !maxOpened, active: opening, disabled: disabled }"
          title="Grasp object with force"
        >
          <template v-if="!maxClosed">GRASP</template>
          <template v-else>RELEASE</template>
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
    <div class="flex items-center justify-center">
      <div>Force: </div>
      <div class="w-20">
        <div class="input-basic">
          <input id="gripperSpeed" type="text" v-model="force">
        </div>
      </div>
      <div class="meta">N</div>
    </div>
    <div class="flex items-center justify-center">
      <div>Object Width: </div>
      <div class="w-20">
        <div class="input-basic">
          <input id="gripperSpeed" type="text" v-model="widthInCM">
        </div>
      </div>
      <div class="meta">cm</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      speed: 0.1,
      force: 0.5,
      widthInCM: 2
    }
  },
  computed: {
    maxOpened () {
      return this.$store.state.connector.gripper.position[0] > 0.038
    },
    maxClosed () {
      return this.$store.state.connector.gripper.position[0] < 0.0015
    },
    opening () {
      return this.$store.state.connector.gripper.opening
    },
    closing () {
      return this.$store.state.connector.gripper.closing
    },
    disabled () {
      return (this.opening && this.closing) || parseFloat(this.speed) <= 0
    }
  },
  methods: {
    move (direction) {
      let width = this.$store.state.connector.gripper.position[0] + this.$store.state.connector.gripper.position[1]
      switch (direction) {
        case 'open':
          width = width + 0.02
          break
        case 'close':
          width = width - 0.02
          break
        default:
          break
      }
      this.$store.dispatch('connector/moveGripper', { width: width, speed: parseFloat(this.speed) })
    },
    grasp () {
      let msg = {
        width: this.widthInCM * 0.01,
        speed: this.speed,
        force: this.force
      }
      this.$store.dispatch('connector/grasp', msg)
    }
  }
}
</script>
