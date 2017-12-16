
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
   
    <div>
      <q-side-link item to="/login"> 
        <q-item-main label="Have an account? Log in" />
      </q-side-link>
    </div>

  </div>
</template>

<script>
import {QField, QInput, QBtn, QSideLink, QItemMain} from 'quasar'
export default {
  components: {
    QField, QInput, QBtn, QSideLink, QItemMain
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

