import './scss/app.scss'
import 'bootstrap';

// string capitalize
Object.defineProperty(String.prototype, 'capitalize', {
    value: function() { return this.charAt(0).toUpperCase() + this.slice(1); },
    enumerable: false
});

// app
import { createApp } from 'vue'

import App from './App.vue'
const app = createApp(App);

// mitt
import mitt from 'mitt';
app.config.globalProperties.$mitt = mitt();

// globalMixins
import globalMixins from "./mixins/global.mixins"
app.mixin(globalMixins)

// globalFilters
import globalFilters from "./helpers/global.filters"
app.config.globalProperties.$filters = globalFilters

app.config.globalProperties.$location = window.location

// createPinia
import { createPinia } from 'pinia'
app.use(createPinia())

// router
import router from "./router";
app.use(router)

// dayjs
import dayjs from "dayjs"; 
import relativeTime from "dayjs/plugin/relativeTime"; 

dayjs.locale('en')
dayjs.extend(relativeTime)
app.config.globalProperties.$date = dayjs

// userStore
import { userStore } from './store/user.store'
app.config.globalProperties.$user = userStore();

// web3Store
import { web3Store } from "@/store/web3.store.js";
app.config.globalProperties.$web3 = web3Store()

// breakpoint
import { breakpoint } from './store/breakpoint.store'
app.config.globalProperties.$breakpoint = breakpoint();
app.config.globalProperties.$breakpoint.init()

// sweetalert2
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
app.use(VueSweetalert2, {
    buttonsStyling: false,
    position: 'top',
    showConfirmButton: false,
    customClass: {
        popup: '_swal2_popup',
        confirmButton: 'btn btn-success px-4 mx-2',
        denyButton: 'btn btn-primary px-4 mx-2',
        cancelButton: 'btn btn-danger px-4 mx-2',
        footer: '_swal2_footer',
    }
});

// Web3ModalVuePlugin
import { Web3ModalVuePlugin } from "web3modal-vue3"
app.use(Web3ModalVuePlugin)

// vue-loading-overlay
import { LoadingPlugin } from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
app.use(LoadingPlugin, {
    loader: 'dots',
    width: 100,
    height: 100,
    color: '#fc965c',
    backgroundColor: '#000000',
    opacity: 0.1,
    zIndex: 99999999,
    blur: '0',
    enforceFocus: false
});

// logger
import VueLogger from 'vuejs3-logger';
app.use(VueLogger, {
    isEnabled: true,
    logLevel : IS_PRODUCTION ? 'error' : 'debug',
    stringifyArguments : false,
    showLogLevel : true,
    showMethodName : true,
    separator: '|',
    showConsoleColors: true
});

// SocketIO
import VueSocketIO from 'vue-3-socket.io'
import SocketIO from 'socket.io-client'
app.use(new VueSocketIO({
    debug: false,
    connection: SocketIO(API_URL),  
    extraHeaders: { 'Access-Control-Allow-Credentials': true },
    //allowEIO3:true
}))

import { tooltip } from './helpers/tooltip'
app.directive('tooltip', tooltip)

import { popover } from './helpers/popover'
app.directive('popover', popover)

// google tag manager
//import { createGtm } from '@gtm-support/vue-gtm';
//app.use(
//    createGtm({
//        id: GTM_ID, // Your GTM single container ID, array of container ids ['GTM-xxxxxx', 'GTM-yyyyyy'] or array of objects [{id: 'GTM-xxxxxx', queryParams: { gtm_auth: 'abc123', gtm_preview: 'env-4', gtm_cookies_win: 'x'}}, {id: 'GTM-yyyyyy', queryParams: {gtm_auth: 'abc234', gtm_preview: 'env-5', gtm_cookies_win: 'x'}}], // Your GTM single container ID or array of container ids ['GTM-xxxxxx', 'GTM-yyyyyy']
//        defer: false, // Script can be set to `defer` to speed up page load at the cost of less accurate results (in case visitor leaves before script is loaded, which is unlikely but possible). Defaults to false, so the script is loaded `async` by default
//        enabled: IS_PRODUCTION && IS_MAIN_CHAIN, // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
//        debug: IS_PRODUCTION, // Whether or not display console logs debugs (optional)
//        loadScript: true, // Whether or not to load the GTM Script (Helpful if you are including GTM manually, but need the dataLayer functionality in your components) (optional)
//        vueRouter: router, // Pass the router instance to automatically sync with router (optional)
//        //ignoredViews: ['homepage'], // Don't trigger events for specified router names (optional)
//        //trackOnNextTick: false, // Whether or not call trackView in Vue.nextTick
//    }),
//)

// mount
app.mount('#app')

