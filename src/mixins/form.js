export default {
    data() {
        return {
            alert: {
                show: false,
                message: null,
                type: null
            }
        }
    },
    methods: {
        onReset(evt) {
            evt.preventDefault();
            this.clearForm();
        },
        clearForm() {
            for (let index in this.form) {
                if (this.form.hasOwnProperty(index)) {
                    this.form[index] = null;
                }
            }
            this.errors.clear();
        },
        showAlert(message, type) {
            this.alert.show = true;
            this.alert.message = message;
            this.alert.type = type;
            setTimeout(() => {
                this.clearAlert();
            }, 3000)
        },
        clearAlert() {
            this.alert.show = false;
            this.alert.message = null;
            this.alert.type = null;
        }
    }
}