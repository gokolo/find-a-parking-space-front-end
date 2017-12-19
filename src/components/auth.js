import axios from "axios";
import {Socket} from "phoenix";

let BASE_URL = DEV ? 'http://localhost:4000' : 'http://localhost:4000';
let SOCKET_URL = DEV ? 'ws://localhost:4000' : 'ws://localhost:4000';

export default {
  user: { role: "", username: "" },
  socket: null, 
  login: function (context, creds, redirect) {
    axios.post(BASE_URL+"/api/sessions", creds)
      .then(response => {
        this.user.username = creds.username;
        this.user.role = response.data.role;
        window.localStorage.setItem('token-'+this.user.username, response.data.token);
        window.localStorage.setItem('id-'+this.user.username, response.data.id);

        this.socket = new Socket(SOCKET_URL + "/socket", {params: {token: response.data.token}});
        this.socket.connect();
        if (redirect)
          context.$router.push({path: redirect});
      })
      .catch(error => {
        console.log(error);
      });
  },
  logout: function(context, options) {
    axios.delete(BASE_URL+"/api/sessions/1", options)
      .then(response => {
        window.localStorage.removeItem('token-'+this.user.username);
        this.user.authenticated = false;
        this.user.username = "";
        this.socket = null;
        context.$router.push({path: '/login'});
      }).catch(error => {
        console.log(error)
      });
  },
  newUser: function (context) {
    axios.post(BASE_URL+"/api/sign-up", context)
      .then(response => {
        window.location.replace("/#/login");
      })
      .catch(error => {
        console.log(error);
      });
  },
  updateUser: function (context) {
    var user = window.localStorage.getItem('id-'+this.user.username)
    var id = user.id
    axios.put(BASE_URL+"/api/user/", context, getAuthHeader())
      .then(response => {
        // window.location.replace("/#/login");
      })
      .catch(error => {
        console.log(error);
      });
  },
  getChannel: function(prefix) {
    var token = window.localStorage.getItem('token-'+this.user.username);
    var channel = this.socket.channel(prefix + this.user.username, { guardian_token: token });
    return channel;
  },
  authenticated: function() {
    const jwt = window.localStorage.getItem('token-'+this.user.username);
    return !!jwt;
  },
  getAuthHeader: function() {
    return {
      "Authorization": window.localStorage.getItem('token-'+this.user.username)
    }
  },
  getAuthUserId: function() {
    return {
      "id": window.localStorage.getItem('id-'+this.user.username)
    }
  }
}