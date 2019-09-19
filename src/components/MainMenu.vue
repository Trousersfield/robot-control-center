<template>
  <ul class="menu menu-main">
    <li class="mb-10">
      <img src="../assets/kit-rcc.png">
    </li>
    <li
      v-if="$store.state.connector.connected"
      class="connection"
    >
      <span class="success"></span>
      <p>Connected</p>
    </li>
    <li v-else class="connection">
      <span class="alert"></span>
      <p>Disconnected</p>
    </li>
    <router-link to="/controlCenter" tag="li">Control Center</router-link>
    <router-link to="/settings" tag="li">Settings</router-link>
    <router-link to="/about" tag="li">About</router-link>
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
    @apply w-full

  >li:not(:first-child)
    @apply py-2 whitespace-no-wrap cursor-pointer
    
    &:hover
      @apply font-bold
    
    >a
      @apply 
      
    &.router-link-exact-active
      @apply pl-2 font-bold border-l-4 border-red-darker
  
  >.connection
    @apply inline-block pb-4 mb-10

    >span
      @apply w-8 h-8 bg-gray inline-block rounded-full align-middle

      &.alert
        @apply bg-red-dark
      
      &.success
        @apply bg-green

    >p
      @apply pl-3 inline-block align-middle
</style>
