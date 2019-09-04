<template>
  <div class="x-controls">
    <div>
      <div
        class="control rounded-t-lg"
        title="move in"
        @click="move('in')"
      >
        <chevron-up-icon/>
      </div>
    </div>
    <div>
      <div class="filler"></div>
    </div>
    <div>
      <div
        class="control rounded-b-lg"
        title="move out"
        @click="move('out')"
      >
        <chevron-down-icon/>
      </div>
    </div>
  </div>
</template>

<script>
import { ChevronDownIcon, ChevronUpIcon } from 'vue-feather-icons'

export default {
  components: {
    ChevronDownIcon,
    ChevronUpIcon
  },
  computed: {
    gripperOpen () {
      return true
    }
  },
  methods: {
    move (pos) {
      this.$store.dispatch('move', { direction: pos })
    },
  }
}
</script>

<style lang="sass" scoped>
.x-controls
  @apply flex flex-col

  >div
    @apply flex justify-end
    
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
