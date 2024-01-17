import 'primeflex/primeflex.css';
import "primevue/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css';
import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Avatar from 'primevue/avatar';
import Paginator from 'primevue/paginator';
import Panel from 'primevue/panel';
import SelectButton from 'primevue/selectbutton';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import OverlayPanel from 'primevue/overlaypanel';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue);
app.component('AvatarPrime', Avatar);
app.component('PaginatorPrime', Paginator);
app.component('PanelPrime', Panel);
app.component('SelectButton', SelectButton);
app.component('DataTable', DataTable);
app.component('ColumnPrime', Column);
app.component('InputText', InputText);
app.component('ButtonPrime', Button);
app.component('OverlayPanel', OverlayPanel);

app.mount('#app');
