<template>
  <div class="w-full flex flex-col control-grid">
    <div class="w-full flex flex-row">
      <div class="flex-1 bg-gray-lighter px-4 py-2 m-2">
        <robot></robot>
      </div>
      <div class="flex-1 bg-gray-lighter px-4 py-2 m-2">
        <profile></profile>
      </div>
    </div>
    <control-panel></control-panel>
  </div>
</template>

<script>
import Profile from '../components/Profile.vue'
import ControlPanel from '../components/ControlPanel.vue'
import Robot from '../components/Robot.vue'

export default {
  components: {
    Profile, ControlPanel, Robot
  }
}
</script>

<style lang="sass" scoped>
.control-grid
  >
    @apply m-2
</style>
