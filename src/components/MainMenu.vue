<template>
  <ul class="menu menu-main">
    <li>Connected: {{ $store.state.connected }}</li>
    <li><router-link to="/">Home</router-link></li>
    <li><router-link to="/controlCenter">Control Center</router-link></li>
    <li><router-link to="/settings">Settings</router-link></li>
    <li><router-link to="/about">About</router-link></li>
  </ul>
</template>

<script>
export default {
  
}
</script>

<style lang="sass">
.main-menu
  @apply text-base

  >li
    @apply py-2 whitespace-no-wrap
    
    &:hover
      @apply font-bold
    
    >a
      @apply pl-2
      
      &.router-link-exact-active
        @apply font-bold border-l-4 border-red-darker
</style>
