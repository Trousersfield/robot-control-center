<template>
  <div class="w-full flex flex-row">
    <div class="flex-1 bg-gray-lighter px-4 py-2 m-2">
      <div class="flex">
        <div class="flex flex-col">
          <div class="flex">
            <div class="w-1/3">1</div>
            <div class="w-1/3">
              <button class="button-basic" @click="move('top')">Top</button>
            </div>
            <div class="w-1/3">3</div>
          </div>
          <div class="flex">
            <div class="w-1/3">
              <button class="button-basic" @click="move('left')">Left</button>
            </div>
            <div class="w-1/3">5</div>
            <div class="w-1/3">
              <button class="button-basic" @click="move('right')">Right</button>
            </div>
          </div>
          <div class="flex">
            <div class="w-1/3">7</div>
            <div class="w-1/3">
              <button class="button-basic" @click="move('down')">Down</button>
            </div>
            <div class="w-1/3">9</div>
          </div>
        </div>
        <div class="flex flex-col">
          <button class="button-basic" @click="move('in')">In</button>
          <button class="button-basic" @click="move('out')">Out</button>
        </div>
      </div>
    </div>
    <div class="flex-1 bg-gray-lighter px-4 py-2 m-2">
      <p>Here comes the emergency stop</p>
      <!--<button @click="doMovement"></button>-->
    </div>
    <div class="flex-1 bg-gray px-4 py-2 m-2 meta">
      <p>Here come the z-Axis controls</p>
    </div>
  </div>
</template>

<script>
export default {
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

</style>
