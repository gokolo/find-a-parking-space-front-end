<template>
  <!-- Configure "view" prop for QLayout -->
  <q-layout>
    <q-toolbar slot="header">
      <!-- opens drawer below
      <button class="hide-on-drawer-visible" @click="$refs.drawer.open()">
        <i>menu</i>
      </button>
      -->
      <!-- <q-btn @click="$refs.layout.toggleLeft()" big >
        <q-icon name="local parking" />Central Perk
      </q-btn> -->
      <!-- <q-btn round color="brown-5"> 
        <q-icon name="local parking" />
      </q-btn> -->

      <q-toolbar-title>
        
      </q-toolbar-title>
       <!-- Navigation Tabs -->
      <q-tabs slot="navigation">
        <q-route-tab slot="title" icon="home" to="/" replace hide="icon" label="Home" />
        <q-route-tab slot="title" icon="account_box" to="/customer" replace hide="icon" label="Account" />
        <q-route-tab slot="title" icon="directions_car" to="/bookings" replace label="Bookings" />
        <!-- <q-route-tab slot="title" icon="input" to="/layout/drawer" replace label="Drawer" /> -->
        <q-route-tab slot="title" icon="input" class="pull-right" to="/login" label="Logout" v-on:click="logout" /> 
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
import axios from "axios";
import auth from "./auth";

import { QLayout, QToolbar, QTabs, QRouteTab, QToolbarTitle, QIcon  } from 'quasar';
export default {
  components: {
    QLayout, QToolbar, QTabs, QRouteTab, QToolbarTitle, QIcon 
  },
  data () {
    return {}
  },
  methods: {
      logout: function() {
         // auth.logout(this, { headers: auth.getAuthHeader() });
      }
  }
}
</script>

<style>
</style>
