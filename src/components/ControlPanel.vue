<template>
  <div class="w-full flex flex-row">
    <div class="flex-1 flex-col bg-gray-lighter px-4 py-2 m-2 left-0">
      <div class="w-full">
        <ul class="flex border-b">
          <li class="-mb-px mr-1">
            <a class="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold" href="#" @click="yzControl = true">Position</a>
          </li>
          <li class="mr-1">
            <a class="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" href="#" @click="yzControl = false">Orientation</a>
          </li>
        </ul>
      </div>
      <div class="w-full">
        <div v-if="yzControl" class="yz-controls">
          <div>
            <div></div>
            <div
              class="bg-blue rounded-t-lg control"
              @click="move('up')"
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
        <div v-else class="orientation-controls">
          <div class="w-1/3">
            <label for="orientation-direction">
              Orientation Direction
            </label>
            <div class="relative">
              <select class="block w-full" id="orientation-direction" v-model="direction">
                <option value="y">Y</option>
                <option value="x">X</option>
                <option value="z">Z</option>
              </select>
            </div>
          </div>
          <div class="w-1/3">
            <label for="orientation-angle">
              Angle to turn
            </label>
            <input id="orientation-angle" type="text" class="block w-full" placeholder="enter angle..." v-model="handAngle" />
          </div>
          <div class="w-1/3">
            <button class="button" @click="turnHand">Turn Hand</button>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-1 bg-gray-lighter px-4 py-2 m-2 text-center align-middle">
      <button
        class="emergency-stop"
        @click="stop"
      >
        EMERGENCY<br>STOP
      </button>
      <button
        class="emergency-stop"
        @click="recover"
      >
        recover
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
  data () {
    return {
      yzControl: true,
      direction: 'y',
      handAngle: 0
    }
  },
  computed: {
    gripperOpen () {
      return true
    },
    validAngle () {
      return Number.isInteger(this.handAngle) && ( -360 < handAngle < 360 )
    }
  },
  methods: {
    move (pos) {
      this.$store.dispatch('move', { direction: pos })
    },
    stop () {
      this.$store.dispatch('stop')
    },
    turnHand () {
      this.$store.dispatch('turnHand', { direction: this.direction, angle: this.handAngle })
    },
    recover () {
      this.$store.dispatch('recover')
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

.orientation-controls
  @apply flex w-full

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
