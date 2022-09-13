import Vue from "vue";
import App from "./App";
import router from "./router";
import BaiduMap from "vue-baidu-map";
import ElementUI from "element-ui";
import axios from "axios";
import echarts from "echarts";
import moment from "moment";
import "element-ui/lib/theme-chalk/index.css";
import store from "./store";
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.moment = moment;

Vue.use(router);
Vue.use(ElementUI);

Vue.use(echarts);
Vue.use(BaiduMap, {
  ak: "vVFHQe9Za2y0R6jEMLGlfDrg7qrtmhMK"
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  axios,
  router,
  components: { App },
  template: "<App/>"
});


axios.interceptors.request.use(
  config => {
    let token = localStorage.getItem("Authorization");

    if (token) {
      config.headers["Content-Type"] = "application/json;charset=utf-8";
      config.headers.token = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
