import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";

import VueEasyLightbox from "vue-easy-lightbox";

import "./styles/app.css";

import "vue-easy-lightbox/dist/external-css/vue-easy-lightbox.css";

axios.defaults.baseURL = "https://auaserver-production.up.railway.app";

const app = createApp(App);
app.use(VueEasyLightbox);
app.mount("#app");
