<template>
  <div>
    <h2 class="text-center">Robot Profile</h2>
    <div class="container">
      <div>
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
      </div>
      <div>
        <div class="card">
          <div class="header">
            Gripper
            <p v-if="gripperIsSet" class="success">live</p>
          </div>
          <div class="content">
            <template v-if="gripperIsSet">
              <div class="profile-entry" v-for="(value, key) in position" :key="key">
                <p class="font-bold">{{ key }}: </p>{{ value }}
              </div>
            </template>
            <p v-else class="warning">no gripper data available</p>
          </div>
        </div>
        <div class="card">
          <div class="header">
            Speed Controls
          </div>
          <div class="content">
            <speed-controls />
          </div>
        </div>
      </div>
      <div>
        <div class="card">
          <div class="header">
            Joint States
            <p v-if="jointsSet" class="success">live</p>
          </div>
          <div class="content">
            <joint-controls v-if="jointsSet" />
            <!--<template v-if="jointsSet">
              <div class="profile-entry" v-for="(value, key) in joints" :key="key">
                <p class="font-bold">{{ key }}: </p>{{ value }}
              </div>
            </template>-->
            <p v-else class="warning">no joint state data available</p>
          </div>
        </div>
      </div>
      {{ $store.state.connector.gripper }}
    </div>
  </div>
</template>

<script>
import formatter from '../util/formatter.js'
import SpeedControls from '../components/controls/speedControls.vue'
import JointControls from '../components/controls/jointControls.vue'
import { format } from 'path';

export default {
  components: {
    SpeedControls, JointControls
  },
  computed: {
    positionIsSet () {
      return this.$store.state.connector.connected && this.$store.state.connector.position
    },
    orientationIsSet () {
      return this.$store.state.connector.connected && this.$store.state.connector.orientation
    },
    gripperIsSet () {
      return this.$store.state.connector.connected && this.$store.state.connector.gripper.width
    },
    jointsSet () {
      return this.$store.state.connector.connected && this.$store.getters['connector/jointsSet']
    },
    position () {
      return formatter.prettyPos(this.$store.state.connector.position)
    },
    orientation () {
      return formatter.prettyOrientation(this.$store.state.connector.orientation, this.eulerAngles)
    },
    gripperData () {
      return this.$store.state.connector.gripper
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
.container
  @apply flex flex-col

  >div
    @apply flex

.profile-row
  @apply flex justify-start
  
  >p
    @apply mx-2 my-1
</style>
