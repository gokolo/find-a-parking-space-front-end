
<template>

  <div class="layout-padding">   
     
    <q-field icon="local parking" helper="Parking Area">
      <p>Raatuse Area</p>
    </q-field>
   <q-field icon="room" helper="Destination Address">
      <q-input v-model="destination_address"/>
    </q-field>
    <q-field icon="access time" helper="Intended Booking End Time">
      <q-input type="booking_end_time" v-model="booking_end_time"/>
    </q-field>
   
    <q-field icon="local offer" helper="Choose one" label="Choose a Payment Type" :error="hasError" error-label="Select at least one option">
        <q-option-group type="radio" v-model="group" :options="[
            { label: 'Hourly Payment', value: 'hourly_payment' },
            { label: 'Real-time payment', value: 'real_time_payment' }
          ]" />
    </q-field>
    
    <q-field icon="payment" helper="Choose one" label="Choose a Payment Method" :error="hasError" error-label="Select at least one option">
        <q-option-group type="radio" v-model="group" :options="[
            { label: 'Pay now', value: 'pay_now' },
            { label: 'Pay at the end of your stay', value: 'pay_end_stay' },
            { label: 'Pay at the end of the month', value: 'pay_end_month' }
          ]" />
    </q-field>
    
    <q-btn icon="input" class="full-width" color="primary" v-on:click="book()">Book</q-btn>

    
    
  </div>
</template>

<script>
import {QField, QInput, QBtn, QOptionGroup} from 'quasar'
export default {
  components: {
    QField, QInput, QBtn, QOptionGroup
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

