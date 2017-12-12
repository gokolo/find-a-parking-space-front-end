
<template>

  <div class="users justify-center layout">
    <h1>Login</h1>
    <!-- <form v-on:submit="add_user"> -->
      <q-field icon="account box" helper="Username" >
        <q-input v-model="new_user.name"/>
      </q-field>
      <q-field icon="account" helper="Name">
        <q-input type="text" v-model="new_user.name" placeholder="Enter Name"/>
      </q-field>
      <q-field icon="mail" helper="Email">
        <q-input type="text" v-model="new_user.email" placeholder="Enter Email"/>
      </q-field>
      <q-btn icon="input" color="primary" class="full-width"> Submit </q-btn>
    <!-- </form> -->
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

