import loadingIndicator from '@/components/loadingIndicator'

export default {
    components: {loadingIndicator},
    data() {
        return {
            loading: true,
            alert: {
                show: false,
                message: null,
                type: 'danger'
            }
        }
    },
    methods: {
        async onInit(promise) {
            this.loading = true;
            try {
                await promise;
                this.$emit('success');
            } catch (error) {
                this.$emit('error', error);
                this.alert.show = true;
                this.alert.message = error.message;
            } finally {
                this.loading = false;
            }
        }
    }
}