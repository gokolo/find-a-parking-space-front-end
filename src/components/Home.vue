
<template>

  <div class="layout-padding">    
    <q-field icon="room" helper="Destination Address">
      <q-input v-model="destination_address"/>
    </q-field>
    <q-field icon="access time" helper="Intended Stay Time(in minute)">
      <q-input type="text" v-model="intented_stay_time"/>
    </q-field>
    <q-btn icon="input" class="full-width" color="primary" v-on:click="submitBookingRequest">Search</q-btn>
    <div class="layout-padding">
      <div id="map" style="width:100%;height:400px">
        
      </div>
    </div>
  </div>
</template>

<script>
import {QField, QInput, QBtn} from 'quasar'

import axios from "axios";
import auth from "./auth";

export default {
  components: {
    QField, QInput, QBtn
  },
  data: function() {
    return {   }
  },
  methods: {
    }
}
</script>

<!-- Notice lang="stylus" -->
<style>
</style>

