<template>
  <div class="flex flex-col">
    <h2>Settings</h2>
    <connector></connector>
    <h2>Topics</h2>
    <ul v-if="$store.state.topics.length">
      <li
        v-for="topic of $store.state.topics"
        :key="topic.name"
      >
        Name: {{ topic.name }} Message type: {{ topic.messageType }}
      </li>
    </ul>
    <h2>Services</h2>
    <ul v-if="$store.state.services.length">
      <li
        v-for="service of $store.state.services"
        :key="service.name"
      >
        Name: {{ service.name }} Service type: {{ service.serviceType }}
      </li>
    </ul>
    <button class="button" @click="callJoint">Call Service Joint</button>
    <button class="button" @click="callSpeed">Call Service Robot Speed</button>
    {{ $store.state.position }}
  </div>
</template>

<script>
import connector from '../components/Connector.vue'

export default {
  components: {
    connector
  },
  methods: {
    callJoint () {
      this.$store.dispatch('serviceMove')
    },
    callSpeed () {
      this.$store.dispatch('serviceSpeed')
    }
  }
}
</script>
