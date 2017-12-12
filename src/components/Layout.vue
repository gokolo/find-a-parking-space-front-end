<template>
  <!-- Configure "view" prop for QLayout -->
  <q-layout>
    <q-toolbar slot="header">
      <!-- opens drawer below
      <button class="hide-on-drawer-visible" @click="$refs.drawer.open()">
        <i>menu</i>
      </button>
      -->
      <q-toolbar-title>
        
      </q-toolbar-title>
       <!-- Navigation Tabs -->
      <q-tabs slot="navigation">
        <q-route-tab slot="title" icon="home" to="/layout/home" replace hide="icon" label="Home" />
        <q-route-tab slot="title" icon="account_box" to="/layout/toolbar" replace hide="icon" label="Account" />
        <q-route-tab slot="title" icon="directions_car" to="/layout/tabs" replace label="Bookings" />
        <!-- <q-route-tab slot="title" icon="input" to="/layout/drawer" replace label="Drawer" /> -->
      </q-tabs>
    
    </q-toolbar>

   

    <!-- Left Side Panel
    <div slot="left">
      <q-list no-border link inset-delimiter>
        <q-list-header>Essential Links</q-list-header>
        <q-item>
          <q-item-side icon="school" />
          <q-item-main label="Docs" sublabel="quasar-framework.org" />
        </q-item>
        <q-item>
          <q-item-side icon="record_voice_over" />
          <q-item-main label="Forum" sublabel="forum.quasar-framework.org" />
        </q-item>
        <q-item>
          <q-item-side icon="chat" />
          <q-item-main label="Gitter Channel" sublabel="Quasar Lobby" />
        </q-item>
        <q-item>
          <q-item-side icon="rss feed" />
          <q-item-main label="Twitter" sublabel="@quasarframework" />
        </q-item>
      </q-list>
    </div>
    -->

    <!-- Right Side Panel
    <div slot="right">
      ...
    </div>
    -->

    <router-view />

    <!-- Footer -->
    <q-toolbar slot="footer">
      ...
    </q-toolbar>
   
  </q-layout>
</template>

<script>
import { QLayout, QToolbar, QTabs, QRouteTab, QToolbarTitle } from 'quasar';
export default {
  components: {
    QLayout, QToolbar, QTabs, QRouteTab, QToolbarTitle
  },
  data () {
    return {}
  }
}
</script>

<style>
</style>
