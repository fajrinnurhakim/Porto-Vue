import { createApp } from "vue";
import "./styles/globals.css";
import App from "./App.vue";
import router from "./router";
import { createHead } from "@vueuse/head";
const head = createHead();
createApp(App).use(head).use(router).mount("#app");
