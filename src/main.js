import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faUser,
  faSignOutAlt,
  faEllipsisV
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faUser,
  faSignOutAlt,
  faEllipsisV
)


import { firestorePlugin } from 'vuefire'          
import firebase from 'firebase'
import 'firebase/firestore'

Vue.use(firestorePlugin)

firebase.initializeApp({
  apiKey: "AIzaSyBLY7YLM95KrIZu2PvDQOUOZjFRx3Oah_Y",
  authDomain: "whisperer-1dd94.firebaseapp.com",
  databaseURL: "https://whisperer-1dd94.firebaseio.com",
  projectId: "whisperer-1dd94",
  storageBucket: "whisperer-1dd94.appspot.com",
  messagingSenderId: "180539255385",
  appId: "1:180539255385:web:132861e81bc3fac6e89f48",
  measurementId: "G-51XB65WJ25"
})

export const db = firebase.firestore()
export const auth = firebase.auth()
// Headerにエキスポートしている

Vue.component('fa', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
