import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import globalComponents from "./global-components";
import utils from "./utils";
import "./assets/css/app.css";

import i18n from "./language/i18n";

const app = createApp(App).use(i18n).use(router).use(createPinia());

globalComponents(app);
utils(app);

app.mount("#app");

/*
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import globalComponents from "./global-components";
import utils from "./utils";
import "./assets/css/app.css";

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App).use(router).use(createPinia());

app.component('Datepicker', Datepicker);

globalComponents(app);
utils(app);

app.mount("#app");
*/
