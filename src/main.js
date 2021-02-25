import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './common/style.scss';
import {Message,Select,Option,Input,Button  } from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.component('Select', Select);
Vue.component('Option', Option);
Vue.component('Input', Input);
Vue.component('Button', Button);
Vue.prototype.$Message=Message;
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
