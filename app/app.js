import Vue from "nativescript-vue";
import Home from "./components/Home";
import Store from './store'

import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios)

const Axios = axios.create({
    baseURL: "https://api.todolist.sherpa.one/"
});

new Vue({
    store: Store,
    template: `
        <Frame>
            <Home />
        </Frame>`,

    components: {
        Home,
    }
}).$start();
