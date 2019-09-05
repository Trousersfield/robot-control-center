<template>
  <div>
    <button class="button" @click="setSpeed(0.1)">Slow</button>
    <button class="button" @click="setSpeed(0.35)">Medium</button>
    <button class="button" @click="setSpeed(0.6)">Fast</button>
    <div
      class="w-full bg-green cursor-pointer relative"
      :class="`h-${sliderSize}`"
      ref="sliderContainer"
      @mousedown="startDrag"
      @mouseup="endDrag"
      @mouseout="endDrag"
    >
      <div
        class="bg-red absolute"
        :class="`h-${sliderSize} w-${sliderSize}`"
        ref="slider"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sliderSize: 10
    }
  },
  computed: {
    speed () {
      return 0.5
    },
    sliderPos () {
      return 90
    }
  },
  methods: {
    startDrag (e) {
      this.$refs.sliderContainer.addEventListener('mousemove', this.moveSlider)
    },
    endDrag (e) {
      this.$refs.sliderContainer.removeEventListener('mousemove', this.moveSlider)
    },
    moveSlider (e) {
      const sRadius = this.sliderSize / 2
      this.$refs.slider.style.transform = (`translate(${e.offsetX}px, 0px`)
    },
    setSpeed (speed) {
      this.$store.dispatch('setSpeed', speed)
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
