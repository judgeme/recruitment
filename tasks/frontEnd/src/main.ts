import { createApp } from 'vue';
import { VueFire, VueFireAuth } from 'vuefire';

import App from '@/App.vue';
import router from '@/router';
import { firebaseApp } from './firebase';
import './assets/main.css';

const app = createApp(App);

app.use(router);
// set up firebase here...
app.use(VueFire, {
  firebaseApp,
  modules: [
    VueFireAuth(),
  ],
});
app.mount('#app');
