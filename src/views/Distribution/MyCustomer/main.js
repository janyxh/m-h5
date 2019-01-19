import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";

// 导入公共css
import "@/assets/css/common.scss";
import "@/assets/css/reset.scss";
import "@/assets/css/mint-variables.scss";
import "@/assets/iconfont/iconfont.css";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
