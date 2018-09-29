// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
// Firebase
import firebase from 'firebase';
// Bootstrap
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
// VeeValidate
import VeeValidate from 'vee-validate';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VeeValidate);

let app;

// Initialize Firebase
let config = {
    apiKey: "AIzaSyAt22AkiKk_0QIPT9UnVYPsZPpw5NARK_A",
    authDomain: "vue-qr-demo.firebaseapp.com",
    databaseURL: "https://vue-qr-demo.firebaseio.com",
    projectId: "vue-qr-demo",
    storageBucket: "vue-qr-demo.appspot.com",
    messagingSenderId: "66074794422"
};
firebase.initializeApp(config);
firebase.auth().onAuthStateChanged(function (user) {
    console.log(user);
    if (!app) {
        app = new Vue({
            el: '#app',
            router,
            components: {App},
            template: '<App/>',
            data() {
                return {
                    auth: !!user,
                    user: user,
                    settings: null,
                }
            },
            watch: {
                auth() {
                    if (this.auth) {
                        setTimeout(() => {
                            router.replace({name: 'home'})
                        }, 2000)
                    } else {
                        this.user = null;
                    }
                }
            }
        });
    }
});


