
<template>

  <div class="layout-padding">    
    <q-field helper="Name">
      <q-input v-model="name"/>
    </q-field>    
    <q-field helper="Username" :count="10">
      <q-input v-model="username"/>
    </q-field>
    <q-field helper="Password" :count="10">
      <q-input type="password" v-model="password"/>
    </q-field>
    <q-btn icon="input" class="full-width" color="primary" v-on:click="login()">Signup</q-btn>
    <div class="layout-padding">
      <span>Have an account? <a to="/layout/login">Log in</a></span>
    </div>
  </div>
</template>

<script>
import {QField, QInput, QBtn} from 'quasar'
export default {
  components: {
    QField, QInput, QBtn
  },
  name: 'users',
  data () {
    return {
      new_user: {},
      users: []
    }
  },
  methods: {
    
  }
}
</script>

<!-- Notice lang="stylus" -->
<style>

</style>

