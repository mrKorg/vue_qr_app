<template>
    <div class="home">
        <div class="container">
            <div class="home__box text-center">
                <div v-if="$root.auth">
                    <h2>Hello, dear {{ $root.user.email }}.</h2>
                    <p>This is a Vue.js QR scanner app.</p>
                    <br>
                    <p class="text-center">
                        <router-link tag="a" to="scan" class="btn btn-success">Open Scanner</router-link>
                    </p>
                    <br>
                    <p>
                        or you can <a href="#" v-on:click.prevent="logout()">logout</a>
                    </p>
                </div>
                <div v-else>
                    <h2>Hello, dear user.</h2>
                    <p>This is a Vue.js QR scanner app.</p>
                    <br>
                    <p class="home__row row justify-content-center align-items-center">
                        <span class="home__col col-12">
                            To use the application you need to
                        </span>
                        <span class="home__col col-xs-auto">
                            <router-link tag="a" to="login" class="btn btn-success">Login</router-link>
                        </span>
                        <span class="home__col home__col--or col-xs-auto">
                            or
                        </span>
                        <span class="home__col col-xs-auto">
                            <router-link tag="a" to="registration" class="btn btn-primary">Register</router-link>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase';

    export default {
        name: 'home',
        methods: {
            logout() {
                firebase.auth().signOut()
                    .then(() => {
                        this.$root.auth = false;
                        this.$root.user = null;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
    }
</script>

<style>
    .home__col{
        margin-bottom: 20px;
    }
    .home__col--or{
        padding: 0 20px;
    }
    .home__box {
        max-width: 320px;
        margin: 0 auto;
    }
</style>
