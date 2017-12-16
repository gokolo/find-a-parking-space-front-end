
<template>

  <div class="layout-padding">    
    <q-field icon="account box" helper="Username" :count="10">
      <q-input v-model="username"/>
    </q-field>
    <q-field icon="lock" helper="Password" :count="10">
      <q-input type="password" v-model="password"/>
    </q-field>
    <q-btn icon="input" class="full-width" color="primary" v-on:click="login">Log in</q-btn>
    
    <div>
      <q-side-link item to="/signup"> 
        <q-item-main label="New to here? Sign up now" />
      </q-side-link>
    </div>
  </div>
</template>

<script>
import {QField, QInput, QBtn, QSideLink, QItemMain} from 'quasar'
import auth from "./auth"

export default {
  components: {
    QField, QInput, QBtn, QSideLink, QItemMain
  },
  data () {
    return {
      username: "",
      password: ""
    }
  },
  created: function () {
    // this.$notify({
    // group: 'foo',
    // title: 'Important message',
    // text: 'Hello user! This is a notification!'
});
  },
  methods: {
    login: function() {
      console.log(`Username ${this.username}, password ${this.password}`);
      auth.login(this, {username: this.username, password: this.password}, "/bookings");
    }
  }
}
</script>

<!-- Notice lang="stylus" -->
<style>

</style>

