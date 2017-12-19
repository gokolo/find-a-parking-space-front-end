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
        <q-route-tab v-if="is_auth() === true" slot="title" icon="home" to="/" replace hide="icon" label="Home" />
        <q-route-tab v-if="is_auth() === true" slot="title" icon="account_box" to="/customer" replace hide="icon" label="Account" />
        <q-route-tab v-if="is_auth() === true" slot="title" icon="directions_car" to="/bookings" replace label="Bookings" />
        <!-- <q-route-tab slot="title" icon="input" to="/layout/drawer" replace label="Drawer" /> -->
        <q-route-tab v-if="is_auth() === true" slot="title" icon="input" class="pull-right" to="/login" label="Logout" v-on:click="logout" /> 
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

    <!-- <div class="modal fade" id="myModal" role="dialog">
      <div class="modal-dialog">
    
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Want to Extend Your Stay!</h4>
          </div>
          <div class="modal-body">
            <div class="well">
                <div class="alert alert-info" v-if="visible">
                    Parking Time is about to finish.
                    <button class="btn btn-default" v-on:click="submitDecision({status: 'accepted'})">Extend for an hour</button>
                    <button class="btn btn-danger" v-on:click="submitDecision({status: 'rejected'})">Reject</button>
                </div>
            </div>
          </div>  
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      
      </div>
    </div> -->

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
    return {
      auth,
      channelMessage: null,
      visible:false
    }
  },
  methods: {
    notify () {
      Toast.create({
        html: 'Want to Extend Your Stay?',
        button: {
          label: 'Extend for an hour: ',
          handler () {
            submitDecision({status: 'accepted'})
          }
        },
        button: {
          label: 'Reject',
          handler () {
            submitDecision({status: 'rejected'})
          }
        }
      })
    },
    openSpecialPosition (position) {
      this.position = position
      this.$nextTick(() => {
        this.$refs.positionModal.open()
      })
    },
    submitDecision: function (decision) {
        if (this.channelMessage) {
            axios.patch(BASE_URL+"/api/bookings/" +this.channelMessage.booking_id, 
                {status: decision.status}, {headers: auth.getAuthHeader()})
            .then( response => {
                console.log("Received:", response );
            }).catch( e => console.log("Oops"));
            this.channelMessage = null;
            this.visible = false;
        }
    },
  logout: function() {
      auth.logout(this, { headers: auth.getAuthHeader() });
  },
  is_auth: function() {
    return auth.authenticated()
  },
  getUserRole: () => auth.user.role
  },
  mounted: function() {
    if (auth.socket) {
            var channel = auth.getChannel("customer:");
            console.log(channel)
            channel.join()
                .receive("ok", resp => { console.log("Joined successfully", resp) })
                .receive("error", resp => { console.log("Unable to join", resp) });

            channel.on("requests", payload => {
                console.log("notification")
                console.log(payload)
                this.channelMessage = payload;
                this.visible = true;
                this.notify();
                //$("#myModal").modal('show');
            });
        }
  },
  created: function () {
    
  }
}
</script>

<style>
</style>
