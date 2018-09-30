<template>
    <div class="form scan">
        <div class="container">
            <div class="scan__box">
                <transition name="fade">
                    <p v-if="content" class="scan__content text-center">
                        <a :href="content" target="_blank">{{ content }}</a>
                    </p>
                </transition>
                <QrcodeReader
                    @decode="onDecode"
                    @init="onInit">

                    <loadingIndicator v-show="loading"/>
                </QrcodeReader>
            </div>
        </div>
    </div>
</template>

<script>
    import {QrcodeReader} from 'vue-qrcode-reader';
    import initHandler from '@/mixins/initHandler';

    export default {
        components: {QrcodeReader},
        mixins: [initHandler],
        data() {
            return {
                content: null
            }
        },
        methods: {
            onDecode(content) {
                this.content = content
            }
        }
    }
</script>

<style>
    .scan__box {
        max-width: 500px;
        margin: 0 auto;
    }
</style>
