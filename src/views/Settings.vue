<template>
  <div class="flex flex-col">
    <h2>Settings</h2>
    <ros-connector></ros-connector>
  </div>
</template>

<script>
import RosConnector from '../components/ROSConnector.vue'

export default {
  components: {
    RosConnector
  }
}
</script>
