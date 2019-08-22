<template>
  <div class="w-full flex flex-row">
    <div class="flex-1 bg-gray-lighter px-4 py-2 m-2 left-0">
      <div class="yz-controls">
        <div>
          <div></div>
          <div
            class="bg-blue rounded-t-lg control"
            @click="move('top')"
            title="move up"
          >
            <chevron-up-icon/>
          </div>
          <div></div>
        </div>
        <div>
          <div
            class="bg-blue rounded-l-lg control"
            @click="move('left')"
            title="move left"
          >
            <chevron-left-icon/>
          </div>
          <div class="bg-blue"></div>
          <div
            class="bg-blue rounded-r-lg control"
            @click="move('right')"
            title="move right"
          >
            <chevron-right-icon/>
          </div>
        </div>
        <div>
          <div></div>
          <div
            class="bg-blue rounded-b-lg control"
            @click="move('down')"
            title="move down"
          >
            <chevron-down-icon/>
          </div>
          <div></div>
        </div>
      </div>
    </div>
    <div class="flex-1 bg-gray-lighter px-4 py-2 m-2 text-center align-middle">
      <button class="emergency-stop">
        EMERGENCY<br>STOP
      </button>
    </div>
    <div class="flex-1 bg-gray px-4 py-2 m-2 meta">
      <div class="x-controls">
        <div
          class="bg-blue control rounded-t-lg"
          title="move in"
          @click="move('in')"
        >
          <chevron-up-icon/>
        </div>
        <div
          class="bg-blue control"
          title="grasp"
        >
          <lock-icon
            v-if="gripperOpen"
            class="small"
          />
          <unlock-icon
            v-else
            class="small"
          />
        </div>
        <div
          class="bg-blue control rounded-b-lg"
          title="move out"
          @click="move('out')"
        >
          <chevron-down-icon/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ChevronLeftIcon, ChevronDownIcon, ChevronRightIcon, ChevronUpIcon, LockIcon, UnlockIcon } from 'vue-feather-icons'

export default {
  components: { ChevronLeftIcon, ChevronDownIcon, ChevronRightIcon, ChevronUpIcon, LockIcon, UnlockIcon },
  computed: {
    gripperOpen () {
      return true
    }
  },
  methods: {
    move (pos) {
      const currentPos = this.$store.state.position
      const orientation = this.$store.state.orientation
      let computedPos = currentPos
      switch (pos) {
        case 'left':
          computedPos.y = currentPos.y - 0.2
        case 'down':
          computedPos.z = currentPos.z - 0.2
        case 'top':
          computedPos.z = currentPos.z + 0.2
        case 'right':
          computedPos.y = currentPos.y + 0.2
        case 'in':
          computedPos.x = currentPos.x - 0.2
        case 'out':
          computedPos.x = currentPos.x + 0.2
        default: break
      }
      this.$store.dispatch('move', { position: computedPos, orientation })
    }
  }
}
</script>

<style lang="sass" scoped>
.yz-controls
  @apply flex flex-col

  >div
    @apply flex

    >div 
      @apply w-8 h-8

      >svg:not(.small)
        @apply w-full h-full

.control
  @apply cursor-pointer 

  &:hover
    @apply bg-blue-dark

.x-controls
  @apply flex flex-col

  >div
    @apply w-8 h-8

    >svg:not(.small)
      @apply w-full h-full

.emergency-stop
  @apply p-2 rounded-lg bg-red cursor-pointer text-red-darkest text-lg font-bold

  &:hover
    @apply bg-red-darker text-gray-darkest
</style>
