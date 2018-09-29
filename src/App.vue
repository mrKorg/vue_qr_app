<template>
    <div id="app" class="page">
        <header class="header text-center">
            <div class="container">
                <router-link tag="a" :to="{name: 'home'}" class="row justify-content-center align-items-center logo">
                    <span class="logo__col col-xs-auto">
                        <img class="logo__img" src="./assets/logo.png">
                    </span>
                    <span class="logo__col col-xs-auto">
                        Vue QR-scanner
                    </span>
                </router-link>
            </div>
        </header>
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style>
    html {
        height: 100% !important
    }
    body {
        position: relative;
        width: 100%;
        height: 100%;
    }
    .page {
        min-height: 100%;
        height: auto !important;
        height: 100%;
        position: relative;
        overflow: hidden;
        background: #0d0f0f;
        color: #fff;
    }
    .header {
        padding: 30px 0;
    }
    .logo {
        text-align: center;
        font-weight: bold;
        font-size: 20px;
        display: inline-block;
        cursor: pointer;
        color: inherit;
        text-decoration: none;
        transition: color .3s ease;
    }
    .logo:hover {
        color: rgba(255, 255, 255, .5);
        text-decoration: none;
    }
    .logo__col {
        padding: 0 10px;
    }
    .logo__img{
        width: 50px;
    }
    .form__errorMessage {
        color: #dc3545;
        font-size: 12px;
        margin-bottom: 5px;
    }
    input.error {
        border-color: #dc3545;
    }

    .form__box {
        max-width: 320px;
        margin: 0 auto;
    }
    .form__row {
        padding: 10px 0;
    }
    .form__row button {
        width: 100%;
    }
</style>
