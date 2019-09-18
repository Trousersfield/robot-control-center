<template>
  <div class="yz-controls">
    <div>
      <div></div>
      <div
        class="rounded-t-lg control"
        @click="move('up')"
        title="move up"
      >
        <chevron-up-icon/>
      </div>
      <div></div>
    </div>
    <div>
      <div
        class="rounded-l-lg control"
        @click="move('left')"
        title="move left"
      >
        <chevron-left-icon/>
      </div>
      <div class="filler"></div>
      <div
        class="rounded-r-lg control"
        @click="move('right')"
        title="move right"
      >
        <chevron-right-icon/>
      </div>
    </div>
    <div>
      <div></div>
      <div
        class="rounded-b-lg control"
        @click="move('down')"
        title="move down"
      >
        <chevron-down-icon/>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
import { ChevronLeftIcon, ChevronDownIcon, ChevronRightIcon, ChevronUpIcon } from 'vue-feather-icons'

export default {
  components: {
    ChevronLeftIcon,
    ChevronDownIcon,
    ChevronRightIcon, 
    ChevronUpIcon
  },
  methods: {
    move (pos) {
      this.$store.dispatch('connector/move', { direction: pos })
    },
  }
}
</script>

<style lang="sass" scoped>
.yz-controls
  @apply flex flex-col

  >div
    @apply flex justify-start

    >div 
      @apply w-12 h-12

      >svg:not(.small)
        @apply w-full h-full

.control
  @apply cursor-pointer bg-gray text-gray-darkest

  &:hover
    @apply text-white
    
.filler
  @apply bg-gray
</style>
