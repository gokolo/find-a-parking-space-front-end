<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <!-- <router-view /> -->
    <test></test>
    
  </div>
</template>

<script>
/*
 * Root component
 */
import Test from './components/test'

export default {
  name: 'q-app',
  components: {
    Test
  }

}
</script>

<style></style>
