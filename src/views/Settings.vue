<template>
  <div class="flex flex-col">
    <h2>Settings</h2>
    <connector></connector>
    <h2>Topics</h2>
    <ul v-if="$store.state.connector.topics.length">
      <li
        v-for="topic of $store.state.connector.topics"
        :key="topic.name"
      >
        Name: {{ topic.name }} Message type: {{ topic.messageType }}
      </li>
    </ul>
    <h2>Services</h2>
    <ul v-if="$store.state.connector.services.length">
      <li
        v-for="service of $store.state.connector.services"
        :key="service.name"
      >
        Name: {{ service.name }} Service type: {{ service.serviceType }}
      </li>
    </ul>
  </div>
</template>

<script>
import connector from '../components/Connector.vue'

export default {
  components: {
    connector
  },
  methods: {
    callSpeed () {
      this.$store.dispatch('connector/serviceSpeed')
    }
  }
}
</script>
