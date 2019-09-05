<template>
  <div class="flex flex-col">
    <h2>Settings</h2>
    <ros-connector></ros-connector>
    <h2>Topics</h2>
    <ul v-if="$store.state.topics.length">
      <li
        v-for="topic of $store.state.topics"
        :key="topic.name"
      >
        Name: {{ topic.name }} Message type: {{ topic.messageType }}
      </li>
    </ul>
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
