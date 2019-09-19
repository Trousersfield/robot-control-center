<template>
  <div class="joint-controls">
    <div v-for="(value, key) in joints" :key="key">
      <p class="font-bold">{{ key }}: </p>
      <p>{{ value }}°</p>
      <div class="w-15">
        <div class="input-basic thin">
          <input :id="key" type="text" v-model="turnDegree[key]" placeholder="45°">
        </div>
      </div>
      <div class="button-group small">
        <button @click="turnJoint(key, 'left')">left</button>
        <button @click="turnJoint(key, 'right')">right</button>
      </div>
    </div>
  </div>
</template>

<script>
import formatter from '../../util/formatter.js'

export default {
  data () {
    return {
      turnDegree: {}
    }
  },
  computed: {
    joints () {
      return formatter.prettyJoints(this.$store.getters['connector/joints'])
    }
  },
  methods: {
    turnJoint (joint, direction) {
      let turnRAD = parseFloat(this.turnDegree[joint]) || 45
      turnRAD = turnRAD / 180 * Math.PI
      if (direction === 'right') turnRAD = -turnRAD
      this.$store.dispatch('connector/turnJoint', { [joint]: turnRAD })
    }
  }
}
</script>

<style lang="sass" scoped>
.joint-controls
  @apply flex flex-col
  
  >div
    @apply inline-flex items-center
    
    >p
      @apply flex-1 mx-2 my-1
</style>
