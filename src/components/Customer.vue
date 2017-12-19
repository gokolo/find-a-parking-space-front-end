<template>
  <div class="layout-padding row justify-center">
    <div style="width: 500px; max-width: 90vw;">
      <h5>Account Details</h5>

      <q-field helper="Name">
          <q-input v-model="user.name"/>
        </q-field>    
        <q-field helper="Username" :count="10">
          <q-input v-model="user.username"/>
        </q-field>
        <q-field helper="Password" :count="10">
          <q-input type="password" v-model="user.password"/>
        </q-field>
        
        <p class="caption">Payment Card Details:</p>
        <q-field helper="Cardholder Name:">
          <q-input v-model="user.card_holder_name"/>
        </q-field>
        <q-field helper="Card Number:">
          <q-input v-model="user.card_number" max-length="16"/>
        </q-field>
        <q-field helper="CVC:">
          <q-input type="password" v-model="user.card_cvc" max-length="3"/>
        </q-field>
        <q-field helper="Expiry Date (mmyy) :">
          <q-input type="text" v-model="user.expiry_date" max-length="5"/>
        </q-field>
        <q-btn icon="input" class="full-width" color="primary" v-on:click="update_user()">Update</q-btn>
      
    </div>
  </div>
</template>

<script>
import {
  QList,
  QField, 
  QInput,
  QListHeader,
  QItem,
  QItemSeparator,
  QItemSide,
  QItemMain,
  QItemTile,
  QBtn
} from 'quasar'

import auth from "./auth"
import axios from "axios";

let BASE_URL = DEV ? 'http://localhost:4000' : 'http://localhost:4000';

export default {
  components: {
    QList,
    QField, 
    QInput,
    QListHeader,
    QItem,
    QItemSeparator,
    QItemSide,
    QItemMain,
    QItemTile,
    QBtn
  },
  data () {
    return {
      user: {}
    }
  },

  methods: {
    fetch_user (id, options) {
      axios.get(BASE_URL+"/api/user/"+id, options)
        .then(response => {
          this.user = response.data
        })
    },
    notify () {
      Toast.create("Account information updated sucessfully!")
    },
    sign_up: function() {      
      auth.newUser({name: this.name, username: this.username, password: this.password, card_holder_name: this.card_holder_name, card_number: this.card_number, card_cvc: this.card_cvc, expiry_date: this.expiry_date});
      console.log("sent new user");
    },
    update_user: function() {      
      auth.updateUser({name: this.name, username: this.username, password: this.password, card_holder_name: this.card_holder_name, card_number: this.card_number, card_cvc: this.card_cvc, expiry_date: this.expiry_date});
      console.log("sent update user");
    }
  },
  created: function() {
    var user = auth.getAuthUserId()
    var id = user.id
    this.fetch_user(id,{ headers: auth.getAuthHeader() } )
  }
}
</script>