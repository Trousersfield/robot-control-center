<template>
  <div>
    <button class="button" @click="moveGripper('close')">CLOSE</button>
    <button class="button" @click="moveGripper('open')">OPEN</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      width: 0.5,
      speed: 0.5
    }
  },
  methods: {
    moveGripper () {
      this.$store.dispatch('moveGripper', { width: this.width, speed: this.speed })
    }
  }
}
</script>
