<template>
  <div class = "test">
    <input type="text" v-model="title"><br>
    <h1>{{title}}</h1>
    <p v-if="show_name">{{user.first_name}}</p>
    <p v-else>nOBODY</p>

    <ul>
      <li v-for="item in items" :key="item.title">{{item.title}}</li>
    </ul>
    <button v-on:click="greet('Hello Grace')">Say Greeting</button>
    <input type="text" v-on:keyup="pressKey" v-on:keyup.enter="enterHit">
    <hr/>
    <label for="">First Name:</label>
    <input type="text" v-model="user.first_name">
    <br><br>
    <label for="">Last Name:</label>
    <input type="text" v-model="user.last_name">
    <h3>{{full_name}}</h3>
    <h2>{{msg}}</h2>
  </div>
</template>

<script>
export default {
  name: 'test',
  props: {
    msg: {
      type: String,
      default: 'Foobar'
    }
  },
  data () {
    return {
      title: 'Hello World!',
      user: {
        first_name: 'John',
        last_name: 'Doe'
      },
      show_name: false,
      items: [
        {title: 'Item One'},
        {title: 'Item Two'},
        {title: 'Item Three'},
        {title: 'Item Four'}
      ]
    }
  },
  methods: {
    greet: function (greeting) {
      alert(greeting)
    },
    pressKey: function (e) {
      console.log(e.target.value)
    },
    enterHit: function () {
      console.log('You hit enter')
    }
  },
  computed: {
    full_name: function () {
      return this.user.first_name + ' ' + this.user.last_name
    }
  }
}
</script>

<style scoped>

</style>

