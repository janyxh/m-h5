import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store";

// 导入公共css
import "@/assets/css/common.scss";
import "@/assets/css/reset.scss";
import "@/assets/css/mint-variables.scss";
import "@/assets/iconfont/iconfont.css";
import "mescroll.js/mescroll.min.css";
import { Button, Cell, Field, Search, Toast } from "mint-ui";

import "@/assets/iconfont/iconfont.js";

Vue.component(Button.name, Button);
Vue.component(Cell.name, Cell);
Vue.component(Field.name, Field);
Vue.component(Search.name, Search);
Vue.component(Toast.name, Toast);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
