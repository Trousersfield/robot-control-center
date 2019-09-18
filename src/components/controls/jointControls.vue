<template>
  <div class="joint-controls">
    <div v-for="(value, key) in joints" :key="key">
      <p class="font-bold">{{ key }}: </p>
      <p>{{ value }}</p>
      <div class="w-20">
        <div class="input-basic thin">
          <input :id="key" type="text" v-model="turnAmount[key]">
        </div>
      </div>
      <p class="meta">percent?</p>
      <div class="button-group">
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
      turnAmount: {}
    }
  },
  computed: {
    joints () {
      return formatter.prettyJoints(this.$store.getters['connector/joints'])
    }
  },
  methods: {
    turnJoint (joint, direction) {
      let turn = parseFloat(this.turnAmount[joint])
      if (direction === 'right') turn = -turn
      this.$store.dispatch('connector/turnJoint', { [joint]: turn })
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
