<template>
  <div class="w-full flex flex-col control-grid">
    <div class="w-full flex flex-row">
      <div class="card">
        <div class="header">
          Position
          <p v-if="positionIsSet" class="success">live</p>
        </div>
        <div class="content">
          <template v-if="positionIsSet">
            <div class="profile-row" v-for="(value, key) in position" :key="key">
              <p class="font-bold">{{ key }}: </p>
              <p>{{ value }}</p>
            </div>
          </template>
          <p v-else class="warning">no position available</p>
        </div>
      </div>
      <div class="card">
        <div class="header">
          Orientation
          <p v-if="orientationIsSet" class="success">live</p>
        </div>
        <div class="content">
          <template v-if="orientationIsSet">
            <div class="profile-row" v-for="(value, key) in orientation" :key="key">
              <p class="font-bold">{{ key }}: </p>
              <p>{{ value }}</p>
            </div>
            <div class="button-group">
              <button @click="eulerAngles = false" :class="{ active: !eulerAngles }">QUATERNION</button>
              <button @click="eulerAngles = true" :class="{ active: eulerAngles }">ANGLES</button>
            </div>
          </template>
          <p v-else class="warning">no orientation available</p>
        </div>
      </div>
      <div class="card">
        <div class="header">
          Gripper
          <p v-if="gripperIsSet" class="success">live</p>
        </div>
        <div class="content">
          <template v-if="gripperIsSet">
            <div class="profile-row" v-for="(value, key) in gripper" :key="key">
              <p class="font-bold">{{ key }}: </p>
              <p>{{ value }}</p>
            </div>
          </template>
          <p v-else class="warning">no gripper data available</p>
        </div>
      </div>
    </div>
    <div class="w-full flex flex-row">
      <div class="w-2/3 mr-4">
        <div class="card">
          <stream />
        </div>
      </div>
      <div class="w-1/3 mr-4">
        <!--<profile></profile>-->
        <div class="card">
          <gripper-controls />
        </div>
      </div>
    </div>
    <control-panel></control-panel>
  </div>
</template>

<script>
import formatter from '../util/formatter.js'
import Profile from '../components/Profile.vue'
import ControlPanel from '../components/ControlPanel.vue'
import Stream from '../components/Stream.vue'
import gripperControls from '../components/controls/gripperControls.vue'

export default {
  components: {
    Profile, ControlPanel, Stream, gripperControls
  },
  computed: {
    connected () {
      return this.$store.state.connector.connected
    },
    positionIsSet () {
      return this.connected && this.$store.state.connector.position
    },
    orientationIsSet () {
      return this.connected && this.$store.state.connector.orientation
    },
    gripperIsSet () {
      return this.connected && this.$store.state.connector.gripper.name
    },
    position () {
      return formatter.prettyPos(this.$store.state.connector.position)
    },
    orientation () {
      return formatter.prettyOrientation(this.$store.state.connector.orientation, this.eulerAngles)
    },
    gripper () {
      return formatter.prettyGripper(this.$store.state.connector.gripper)
    }
  },
  data () {
    return {
      eulerAngles: true
    }
  },
  methods: {
    setSpeed (speed) {
      this.$store.dispatch('connector/setSpeed', { data: speed })
    }
  }
}
</script>

<style lang="sass" scoped>
.control-grid
  >
    @apply m-2

.profile-row
  @apply flex justify-start
  
  >p
    @apply mx-2 my-1
</style>
