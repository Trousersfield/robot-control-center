<template>
  <div class="page-container">
    <div class="content-container">
      <main-menu class="main-menu"></main-menu>
      <div class="main-content">
        <!-- content will be injected here -->
        <router-view></router-view>
      </div>
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
  @apply w-full h-full bg-gray-bright pt-5

.page-header
  @apply w-full inset-x-0 top-0 bg-gray-lightest p-2 flex

.content-container
  @apply relative w-full flex items-stretch overflow-y-auto

.main-menu
  @apply w-1/6 p-2

.main-content
  @apply w-5/6 p-2
</style>
