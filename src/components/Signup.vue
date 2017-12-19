
<template>
  <div class="layout-padding">   
  <p class="caption">Personal Information:</p> 
    <q-field helper="Name">
      <q-input v-model="name"/>
    </q-field>    
    <q-field helper="Username" :count="10">
      <q-input v-model="username"/>
    </q-field>
    <q-field helper="Password" :count="10">
      <q-input type="password" v-model="password"/>
    </q-field>
    
    <p class="caption">Payment Card Details:</p>
    <q-field helper="Cardholder Name:">
      <q-input v-model="card_holder_name"/>
    </q-field>
    <q-field helper="Card Number:">
      <q-input v-model="card_number" max-length="16"/>
    </q-field>
    <q-field helper="CVC:">
      <q-input type="password" v-model="card_cvc" max-length="3"/>
    </q-field>
    <q-field helper="Expiry Date (mmyy) :">
      <q-input type="text" v-model="expiry_date" max-length="5"/>
    </q-field>

    <q-btn icon="input" class="full-width" color="primary" v-on:click="sign_up()">Signup</q-btn>
   
    <div>
      <q-side-link item to="/login"> 
        <q-item-main label="Have an account? Log in" />
      </q-side-link>
    </div>

  </div>
</template>

<script>
import {QField, QInput, QBtn, QSideLink, QItemMain} from 'quasar'
import auth from "./auth";

export default {
  components: {
    QField, QInput, QBtn, QSideLink, QItemMain
  },
  data () {
    return {
      name: "",
      username: "",
      password: "",
      card_holder_name: "",
      card_number: "",
      card_cvc: "",
      expiry_date: ""
    }
  },
  methods: {
    sign_up: function() {      
      auth.newUser({name: this.name, username: this.username, password: this.password, card_holder_name: this.card_holder_name, card_number: this.card_number, card_cvc: this.card_cvc, expiry_date: this.expiry_date});
      console.log(`sent new user`);
    }
  }
}
</script>

<!-- Notice lang="stylus" -->
<style>

</style>

