
<template>

  <div class="users justify-center layout">
    <h1>Users</h1>
    <!-- <form v-on:submit="add_user"> -->
      <q-field icon="account box" helper="Username" :count="10" >
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
    <ul>
      <li v-for="user in users" :key="user.name">
        <input type="checkbox" class="toggle" v-model="user.contacted">
        <span :class="{contacted: user.contacted}">
          {{user.name}}: {{user.email}} <button v-on:click="delete_user(user)">x</button>
        </span>
      </li>
    </ul>
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
    add_user: function (e) {
      console.log('add')
      this.users.push({
        name: this.new_user.name,
        email: this.new_user.email,
        contacted: false
      })
      e.preventDefault()
    },
    delete_user: function (user) {
      this.users.splice(this.users.indexOf(user), 1)
    }
  },
  created: function () {
    this.$http.get('https://jsonplaceholder.typicode.com/users')
    .then(function(response) {
      this.users = response.data
    })
  }
}
</script>

<!-- Notice lang="stylus" -->
<style>

</style>

