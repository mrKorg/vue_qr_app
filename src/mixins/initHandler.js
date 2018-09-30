import loadingIndicator from '@/components/loadingIndicator'

export default {
    components: {loadingIndicator},
    data() {
        return {
            loading: true
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
            } finally {
                this.loading = false;
            }
        }
    }
}