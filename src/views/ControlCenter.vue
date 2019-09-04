<template>
  <div class="w-full flex flex-col control-grid">
    <div class="w-full flex flex-row">
      <div class="flex-1 bg-gray-lighter px-4 py-2 m-2">
        <robot-model></robot-model>
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
import RobotModel from '../components/RobotModel.vue'

export default {
  async beforeMount() {
    console.log('Control Center called')
  },
  components: {
    Profile, ControlPanel, RobotModel
  }
}
</script>

<style lang="sass" scoped>
.control-grid
  >
    @apply m-2
</style>
