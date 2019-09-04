<template>
  <div class="page-container">
    <div class="page-header">
      <div class="w-1/6"></div>
      <div class="w-4/6 text-center">
        <h1>Robot Control Center</h1>
      </div>
      <div class="w-1/6"></div>
    </div>
    <div class="main-layout">
      <main-menu class="main-menu"></main-menu>
      <div class="main-content">
        <!-- content will be injected here -->
        <router-view></router-view>
      </div>
    </div>
    <div class="page-footer">
      <h6>A footer, if we need it</h6>
    </div>
  </div>
</template>

<script>
import ControlCenter from './views/ControlCenter.vue'
import MainMenu from './components/MainMenu.vue'

export default {
  name: 'app',
  components: {
    ControlCenter, MainMenu
  }
}
</script>

<style lang="sass">
#app 
  @apply text-gray-darkness
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale

.page-container
  @apply relative w-full h-screen bg-gray-bright

.page-header
  @apply w-full inset-x-0 top-0 bg-gray-lightest p-2 flex

.main-layout
  @apply w-full flex items-stretch overflow-y-auto

.main-menu
  @apply w-1/6 p-2

.main-content
  @apply w-5/6 p-2

.page-footer
  @apply absolute w-full inset-x-0 bottom-0 p-2 text-center
</style>
