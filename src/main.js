import Vue from 'vue'
import App from './App.vue'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
 
Vue.use(VueSweetalert2);


Vue.config.productionTip = false
Vue.config.baseApiUrl = "http://192.168.0.8:3000/api/v1/library/"

new Vue({
  render: h => h(App),
}).$mount('#app')
