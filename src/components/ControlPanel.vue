<template>
  <div class="w-full flex flex-row">
    <div class="flex-1 bg-gray-lighter px-4 py-2 m-2">
      <p>Here comes the arrow control panel</p>
    </div>
    <div class="flex-1 bg-gray-lighter px-4 py-2 m-2">
      <p>Here come the emergency stop</p>
      <button @click="doMovement"></button>
    </div>
    <div class="flex-1 bg-gray px-4 py-2 m-2 meta">
      <p>Here come the z-Axis controls</p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    
  }
}
</script>

<style lang="sass" scoped>

</style>
