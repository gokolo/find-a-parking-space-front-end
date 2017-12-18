
<template>

  <div class="layout-padding">   
    <h2>{{message}}</h2>
    <h2>Booking Information</h2>
    <p>Booking a place for {{$route.params.intented_stay}} minute(s)</p>
    <p v-if="$route.params.hourlyBasedCost !=0">Hourly rate cost:  {{$route.params.hourlyBasedCost}} euro</p>
    <p v-if="$route.params.realTimeBasedCost !=0">Real Time rate cost:  {{$route.params.realTimeBasedCost}} euro</p> 

    <div  v-if="$route.params.hourlyBasedCost !=0 & this.paymentOption != 'HOURLY'" class="form-group">
      <q-field icon="local offer" helper="Choose one" label="Choose a Payment Type" error-label="Select at least one option">
          <q-option-group type="radio" v-model="paymentType" :options="[
              { label: 'Hourly Payment', value: 'HOURLY' },
              { label: 'Real-time payment', value: 'REAL_TIME' }
            ]" />
      </q-field>
    </div>

    <div v-if="$route.params.hourlyBasedCost !=0" class="form-group">
      <q-field icon="payment" helper="Choose one" label="Choose a Payment Method" error-label="Select at least one option">
          <q-option-group type="radio" v-model="paymentOption" :options="[
              { label: 'Pay now', value: 'PAY_NOW' },
              { label: 'Pay later', value: 'PAY_LATER' }              
            ]" />
      </q-field>
    </div>
    <!--     
    <q-field icon="payment" v-model="paymentOption", helper="Choose one" label="Choose a Payment Method" :error="hasError" error-label="Select at least one option">
        <q-option-group type="radio" v-model="group" :options="[
            { label: 'Pay now', value: 'pay_now' },
            { label: 'Pay at the end of your stay', value: 'pay_end_stay' },
            { label: 'Pay at the end of the month', value: 'pay_end_month' }
          ]" />
    </q-field>
     -->
    <q-btn icon="input" class="full-width" color="primary" v-on:click="submitBookingRequest">Book</q-btn>

    
    
  </div>
</template>

<script>
import {QField, QInput, QBtn, QOptionGroup} from 'quasar'
import axios from "axios";
import auth from "./auth";

let BASE_URL = DEV ? 'http://localhost:4000' : 'http://localhost:4000';

export default {
  components: {
    QField, QInput, QBtn, QOptionGroup
  },
  data: function() {
    return {
        paymentOption: "",
        paymentType: "",
        hourlyBasedCost: this.$route.params.hourlyBasedCost,
        realTimeBasedCost: this.$route.params.realTimeBasedCost,
        intented_stay: this.$route.params.intented_stay,
        place_id: this.$route.params.place_id,
        message: null
    }
  },
  methods: {
    submitBookingRequest: function () {
      var paying_status
      var estimated_time = this.$route.params.intented_stay
      var estimated_cost
      if(this.paymentOption === "PAY_LATER"){
        paying_status = "UNPAID"
      }else{
        paying_status = "PAID"
      }

      if(this.paymentType === "REAL_TIME"){
        estimated_cost = this.realTimeBasedCost
      }else{
        estimated_cost = this.hourlyBasedCost
      }
        axios.post(BASE_URL+"/api/book-place", 
            {
              paying_status: paying_status,
              estimated_time: parseInt(estimated_time),
              estimated_cost: parseFloat(estimated_cost),
              place_id: parseInt(this.place_id),
              pay_type: this.paymentType
            }, 
            {headers: auth.getAuthHeader()})
        .then( response => {
            console.log("Received:", response );
            this.message = response.data.message
        }).catch( e => console.log("Oops"));
        
      
    }
  }
}
</script>

<!-- Notice lang="stylus" -->
<style>
</style>

