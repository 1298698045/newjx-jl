import Vue from 'vue'
import App from './App'
import '../static/css/fonts.css'
import '../static/css/iconfont.css'
import WXrequest from './utils/wx-request'
import fetch from './utils/request';

import store from '@/store/index'
import api from '@/utils/interface'

// import getDataQuery from './utils/util';
// getDataQuery();
Vue.prototype.$api = api;
Vue.prototype.$store = store;

Vue.prototype.$httpWX = WXrequest
Vue.prototype.$fetch = fetch;
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
