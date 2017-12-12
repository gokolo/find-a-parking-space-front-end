
<template>

  <div class="layout-padding">    
    <q-field icon="room" helper="Destination Address">
      <q-input v-model="destination_address"/>
    </q-field>
    <q-field icon="access time" helper="Intended Booking End Time">
      <q-input type="booking_end_time" v-model="booking_end_time"/>
    </q-field>
    <q-btn icon="input" class="full-width" color="primary" v-on:click="search()">Search</q-btn>
    <div class="layout-padding">
      <div id="map" class="full-width">
        Map
      </div>
    </div>
  </div>
</template>

<script>
import {QField, QInput, QBtn} from 'quasar'
export default {
  components: {
    QField, QInput, QBtn
  },
  data: function() {
    return {
        destination_address: "",
        booking_end_time: "",
        messages: ""
    }
  },
  methods: {
    submitBookingRequest: function() {
      axios.post("/api/bookings",
        {destination_address: this.destination_address, booking_start_time: this.booking_start_time, booking_end_time: this.booking_end_time},
        {headers: auth.getAuthHeader()})
        .then(response => {
            this.messages = response.data.msg;
        }).catch(error => {
            console.log(error);
        });
    }
  },
  mounted: function() {
      if (auth.socket) {
          var channel = auth.getChannel("customer:");
          channel.join()
              .receive("ok", resp => { console.log("Joined successfully", resp) })
              .receive("error", resp => { console.log("Unable to join", resp) });

          channel.on("requests", payload => {
              this.messages += "\n" + payload.msg;
          });
      }
      navigator.geolocation.getCurrentPosition(position => {
      let loc = {lat: position.coords.latitude, lng: position.coords.longitude};
      this.geocoder = new google.maps.Geocoder;
      this.geocoder.geocode({location: loc}, (results, status) => {
          if (status === "OK" && results[0])
            console.log(results[0]);
            this.destination_address = results[0].formatted_address;
        });
      this.map = new google.maps.Map(document.getElementById('map'), {zoom: 14, center: loc});
      new google.maps.Marker({position: loc, map: this.map, title: "Pickup address"});
    });
  }
}
</script>

<!-- Notice lang="stylus" -->
<style>
</style>

