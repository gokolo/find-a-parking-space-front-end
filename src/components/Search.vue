
<template>

  <div class="layout-padding">    
    <q-field icon="room" helper="Destination Address">
      <q-input v-model="destination_address"/>
    </q-field>
    <q-field icon="access time" helper="Intended Stay Time(in minute)">
      <q-input type="text" v-model="intented_stay_time"/>
    </q-field>
    <q-btn icon="input" class="full-width" color="primary" v-on:click="submitBookingRequest">Search</q-btn>
    <div class="layout-padding">
      <div id="map" style="width:100%;height:400px"></div>
      <div id="map-driver"></div>
    </div>

  </div>

  
</template>

<script>
import {QField, QInput, QBtn} from 'quasar'

import axios from "axios";
import auth from "./auth";
import { Toast } from 'quasar';

let BASE_URL = DEV ? 'http://localhost:4000' : 'http://localhost:4000';

export default {
  components: {
    QField, QInput, QBtn
  },
  data: function() {
        return {
            destination_address: "",
            message: "",
            places: [],
            roads: [],
            centerLocation: null,
            intented_stay_time: 0,
            channelMessage: null,
            visible:false
        }
    },
    methods: {
        submitBookingRequest: function() {
            axios.post(BASE_URL+"/api/bookings",
                {destination_address: this.destination_address, intented_stay_time: this.intented_stay_time},
                {headers: auth.getAuthHeader()})
                .then(response => {
                    this.messages = response.data.msg;
                    this.places = response.data.places;
                    this.roads = response.data.roads;
                    this.centerLocation = response.data.center;
                    this.intented_stay_time = response.data.intented_stay_time;
                    this.addParkingPlacesInMap(this.places, this.roads, this.centerLocation, this.intented_stay_time)
                }).catch(error => {
                    console.log(error);
                    this.places = []
                    this.roads = []
                    this.message = "couldn't get parking places"
                    this.centerLocation = {lat: 58.382810, lng: 26.734172}
                    this.intented_stay_time = null
                    this.addParkingPlacesInMap(this.places, this.roads, this.centerLocation, this.intented_stay_time)
                });
        },

        addParkingPlacesInMap: function(places, roads, centerLocation, intented_stay_time){
            var centerLoc = this.centerLocation;
            var dirService = new google.maps.DirectionsService();
            var mapOptions = {
                zoom: 15, 
                center: centerLoc,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var pinColor = "800000";
            var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
                new google.maps.Size(21, 34),
                new google.maps.Point(0,0),
                new google.maps.Point(10, 34));
            var map = new google.maps.Map(document.getElementById("map"), mapOptions);
            new google.maps.Marker({position: centerLoc, map: map, title: 'Destination'});
            this.places.forEach(place =>{
                this.handleMarker(place, map)
            })
            this.roads.forEach(road => {
                var origin = road.startLat + ", " + road.startLng
                var destination = road.endLat + ", " + road.endLng
                var request = {
                    origin: origin,
                    destination: destination,
                    travelMode: google.maps.TravelMode.DRIVING
                };
                dirService.route(request, function(result, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        var dirRenderer
                        if(road.region == "A"){
                            dirRenderer = new google.maps.DirectionsRenderer({ polylineOptions: {
                                                                                    strokeColor: "red"
                                                                                },suppressMarkers: true});
                        }else if(road.region == "B"){
                            dirRenderer = new google.maps.DirectionsRenderer({ polylineOptions: {
                                                                                    strokeColor: "blue"
                                                                                },suppressMarkers: true});
                        }else{
                            dirRenderer = new google.maps.DirectionsRenderer({suppressMarkers: true});
                        }
                        dirRenderer.setMap(map);
                        dirRenderer.setDirections(result);
                    }
                });

                this.handleMarker(road, map)
            })
        },

        notify: function() {
            console.log("inside the notify");
                Toast.create({
                    html: 'Want to Extend Your Stay?',
                    timeout: 10000,
                    button: {
                    label: 'Extend for an hour: ',
                    handler () {
                        this.submitDecision({status: 'accepted'})
                    }
                    }
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
        handleMarker: function(place, map){
            var loc = {lat: place.startLat, lng: place.startLng}
                if(this.intented_stay_time == null | this.intented_stay_time <= 0){
                    var marker = new google.maps.Marker({position: loc, map: map, title: "price in hour " + place.pricePerHour+ "euro/Hour" 
                                                                            +"\n"+ "real time price " + place.pricePerMin+ "euro/5 Min"});
                    marker.set("id",place.id)
                    marker.set("intented_stay", this.intented_stay_time)
                    window.google.maps.event.addListener(marker, 'click', function(){
                        var intented_stay_time = marker.get("intented_stay");
                        if (intented_stay_time == null | intented_stay_time <= 0) {
                            this.message = "please enter valid time"
                        } else {
                            // axios.get("/#/booking/"+intented_stay_time+"/"+ marker.get("id"))
                            window.location.replace("/#/book/"+intented_stay_time+"/"+ marker.get("id")+"/0/0");
                        }
                        
                    });
                }
                else{
                    var hourlyBasedCost = (Math.floor(this.intented_stay_time / 60) * place.pricePerHour + ((this.intented_stay_time % 60 != 0) ? place.pricePerHour : 0)).toFixed(2)
                    var realTimeBasedCost = (Math.floor(this.intented_stay_time / 5) * place.pricePerMin + ((this.intented_stay_time % 5 != 0) ? place.pricePerMin : 0)).toFixed(2)
                    var marker = new google.maps.Marker({position: loc, map: map, title: "price in hour " + place.pricePerHour+ "euro/Hour" 
                                                                            +"\n"+ "real time price " + place.pricePerMin+ "euro/5 Min"
                                                                            +"\n"+ "hourly based estimated cost "+ hourlyBasedCost + " euro"
                                                                            +"\n"+ "real time based estimated cost "+realTimeBasedCost+ " euro"});
                    marker.set("id",place.id)
                    marker.set("intented_stay", this.intented_stay_time)
                    marker.set("hourlyBasedCost", hourlyBasedCost)
                    marker.set("realTimeBasedCost", realTimeBasedCost)
                    window.google.maps.event.addListener(marker, 'click', function(){
                        var intented_stay_time = marker.get("intented_stay");
                        if (intented_stay_time == null | intented_stay_time <= 0) {
                            this.message = "please enter valid time"
                        } else {
                            // axios.get("/#/booking/"+intented_stay_time+"/"+ marker.get("id"))
                            window.location.replace("/#/book/"+intented_stay_time+"/"+ marker.get("id")+"/"+marker.get("hourlyBasedCost")+"/"+marker.get("realTimeBasedCost"));
                        }
                    });
                }
        }
    },
    mounted: function() {

         var loc;
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
        navigator.geolocation.getCurrentPosition(position => {
            loc = {lat: position.coords.latitude, lng: position.coords.longitude};
            this.geocoder = new google.maps.Geocoder;
            this.geocoder.geocode({location: loc}, (results, status) => {
                if (status === "OK" && results[0])
                console.log(results[0]);
                console.log(loc)
                this.destination_address = results[0].formatted_address;
            });
        });
        
        var mapOptions = {
                zoom: 14, 
                center: loc,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        
        // init directions service
        var dirService = new google.maps.DirectionsService();
        


        // highlight a street
        var request = {
        origin: "58.382530, 26.723936",
        destination: "58.381962, 26.720085",
        travelMode: google.maps.TravelMode.DRIVING
        //waypoints: [{location:"48.12449,11.5536"}, {location:"48.12515,11.5569"}],
        };
        dirService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            var dirRenderer = new google.maps.DirectionsRenderer({suppressMarkers: true});
            dirRenderer.setMap(map);
            dirRenderer.setDirections(result);
        }
        });

        var request = {
        origin: "58.382548, 26.723975",
        destination: "58.384388, 26.723241",
        travelMode: google.maps.TravelMode.DRIVING
        //waypoints: [{location:"48.12449,11.5536"}, {location:"48.12515,11.5569"}],
        };
        dirService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            var dirRenderer = new google.maps.DirectionsRenderer({suppressMarkers: true});
            dirRenderer.setMap(map);
            dirRenderer.setDirections(result);
        }
        });

        var request = {
        origin: "58.382810, 26.734172",
        destination: "58.384231, 26.739822",
        travelMode: google.maps.TravelMode.DRIVING
        //waypoints: [{location:"48.12449,11.5536"}, {location:"48.12515,11.5569"}],
        };
        dirService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            var dirRenderer = new google.maps.DirectionsRenderer({suppressMarkers: true});
            dirRenderer.setMap(map);
            dirRenderer.setDirections(result);
        }
        });
        new google.maps.Marker({position: this.loc, map: this.map, title: "Current Location"});
    }
}
</script>

<!-- Notice lang="stylus" -->
<style>
</style>

