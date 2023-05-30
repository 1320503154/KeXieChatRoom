import { createApp } from "vue";
import { createPinia } from "pinia";

import mitt from "mitt";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";

const pinia = createPinia();
const app = createApp(App);

const Mit = mitt();

app.config.globalProperties.$Bus = Mit;

// pinia.use(piniaPluginPersistedstate);

app.use(ElementPlus);
app.use(pinia);
app.use(router);

app.mount("#app");
