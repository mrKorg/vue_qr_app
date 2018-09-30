<template>
    <div class="form scan">
        <div class="container">
            <div class="form__box">
                <qrcode-reader @decode="onDecode"></qrcode-reader>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            onDecode (decodedString) {
                console.log(decodedString);
            }
        }
    }
</script>