<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <!-- <router-view /> -->
    <users></users>
    
  </div>
</template>

<script>
/*
 * Root component
 */
import Test from './components/test'
import Users from './components/users'

export default {
  name: 'q-app',
  components: {
    Test, Users
  }

}
</script>

<style></style>
