
<template>

  <div class="layout-padding">    
    <q-field icon="account box" helper="des_address">
      <q-input v-model="des_address"/>
    </q-field>
    <q-field icon="lock" helper="Leaving Hour" :count="10">
      <q-input type="leaving_hour" v-model="leaving_hour"/>
    </q-field>
    <q-btn icon="input" class="full-width" color="primary" v-on:click="search()">Search</q-btn>
    <div class="layout-padding">
      <span>New to here? <a to="/layout/signup">Sign up now</a></span>
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

