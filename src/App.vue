<template>
  <div class="page-container">
    <div class="page-header">
      <div class="w-1/6"></div>
      <div class="w-4/6 text-center">
        <h1>Robot Control Center</h1>
      </div>
      <div class="w-1/6"></div>
    </div>
    <div class="page-content">
      <ControlCenter></ControlCenter>
      <!--<router-link to="/controlCenter"></router-link>-->
      <!-- content will be injected here -->
    </div>
    <div class="page-footer">
      <h6>A footer, if we need it</h6>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import ControlCenter from './views/ControlCenter.vue'

export default {
  name: 'app',
  components: {
    HelloWorld, ControlCenter
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
  @apply w-full bg-gray-bright flex flex-col

.page-header
  @apply w-full inset-x-0 top-0 bg-gray-lightest p-2 flex

.page-content
  @apply w-full p-2 overflow-y-auto

.page-footer
  @apply w-full inset-x-0 bottom-0 p-2 text-center
</style>
