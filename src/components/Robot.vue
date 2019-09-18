<template>
  <div>
    <h2 class="text-center">Franka Robot</h2>
    <video v-if="streamLive">
      <source src="video.ogg" type="video/ogg">
    </video>
    <img v-else src="../assets/robot-model.jpg" >
  </div>
</template>

<script>
export default {
  computed: {
    streamLive () {
      return this.$store.state.stream.live
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
