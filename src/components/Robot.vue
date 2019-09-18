<template>
  <div>
    <h2 class="text-center">Franka Robot</h2>
    <video v-if="streamLive">
      <source src="video.ogg" type="video/ogg">
    </video>
    <img
      v-if="streamLive"
      src="http://172.17.74.42:8080/stream_viewer?topic=/camera/color/image_raw"
      crossorigin="anonymus"
    >
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
