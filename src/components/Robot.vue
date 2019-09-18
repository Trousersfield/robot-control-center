<template>
  <div>
    <h2 class="text-center">Livestream</h2>
    <div class="frame-container" ref="frameContainer">
      <iframe
        :src="source"
        frameborder="0"
        allowfullscreen>
      </iframe>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      width: 640,
      ratio: 3/4
    }
  },
  computed: {
    streamLive () {
      return this.$store.state.stream.live
    },
    height () {
      return parseInt(this.width * this.ratio)
    },
    urlWidth () {
      return `&width=${this.width}`
    },
    urlHeight () {
      return `&height=${this.height}`
    },
    source () {
      return `http://172.17.74.42:8080/stream?topic=/camera/color/image_raw${this.urlWidth}${this.urlHeight}`
    }
  },
  mounted () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize () {
      const rect = this.$refs.frameContainer.getBoundingClientRect()
      const padding = this.$refs.frameContainer
      this.width = parseInt(rect.width - 20)
    }
  }
}
</script>

<style lang="sass" scoped>
.frame-container
  @apply relative overflow-hidden
  padding-bottom: 75%

  &.ratio16x9
    padding-bottom: 56.25%

  >iframe
    @apply absolute w-full h-full left-0 top-0 
</style>
