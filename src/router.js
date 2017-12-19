import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from './components/auth'

const requireAuth = (to, _from, next) => {
  if (!auth.authenticated()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
}

const afterAuth = (_to, from, next) => {
  if (auth.authenticated()) {                     
    next(from.path);
  } else {
    next();
  }
}

Vue.use(VueRouter)

function load (component) {
  // '@' is aliased to src/components
  return () => import(`@/${component}.vue`)
}

Vue.component('layout', load('Layout'))

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),

  routes: [
    { path: '/modal', component: load('Modal')},
    { path: '/', component: load('Search'), beforeEnter: requireAuth },
    { path: '/login', component: load('Login'), beforeEnter: afterAuth},
    { path: '/signup', component: load('Signup'), beforeEnter: afterAuth},
    { path: '/bookings', component: load('Bookings'), beforeEnter: requireAuth},   
    { path: '/book', component: load('Book'), beforeEnter: requireAuth},
    { path: '/book/:intented_stay/:place_id/:hourlyBasedCost/:realTimeBasedCost', component: load('Book'), beforeEnter: requireAuth},
    { path: '/customer', component: load('Customer'), beforeEnter: requireAuth },
    { path: '*', redirect: '/login' }
    // Always leave this last one
    //{ path: '*', component: load('Error404') }, // Not found
  ]
});


// {
//   path: '/booking/:intented_stay/:place_id/:hourlyBasedCost/:realTimeBasedCost',
//   component: load('Book'),
//   props: true,
//   beforeEnter: requireAuth
// },