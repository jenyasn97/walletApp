import { createApp } from "vue";
import "./assets/index.css";
import router from "./router";
import App from "./App.vue";
import { createPinia } from "pinia";

import "/api";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
