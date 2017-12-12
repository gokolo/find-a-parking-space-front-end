
<template>

  <div class="layout-padding">    
     <span>Book Parking Lot in Zone 6</span>

    <q-field icon="room" helper="Destination Address">
      <q-input v-model="destination_address"/>
    </q-field>
    <q-field icon="access time" helper="Intended Booking End Time">
      <q-input type="booking_end_time" v-model="booking_end_time"/>
    </q-field>
    <q-btn icon="input" class="full-width" color="primary" v-on:click="search()">Search</q-btn>
    <div class="layout-padding">
      <div id="map" class="full-width">
        Map
      </div>
    </div>
  </div>
</template>

<script>
import {QField, QInput, QBtn} from 'quasar'
export default {
  components: {
    QField, QInput, QBtn
  },
  data: function() {
    return {
    }
  },
  methods: {
  }
}
</script>

<!-- Notice lang="stylus" -->
<style>
</style>

