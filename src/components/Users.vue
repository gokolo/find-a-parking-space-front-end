<template>
  <div class = "users">
    <h1>Users</h1>
    <form v-on:submit="add_user">
      <input type="text" v-model="new_user.name" placeholder="Enter Name"/> <br>
      <input type="text" v-model="new_user.email" placeholder="Enter Email"/> <br>
      <input type="submit" value="Submit"/> <br>
    </form>
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
export default {
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

<style scoped>
  .contacted{
    text-decoration: line-through;
  }
</style>

