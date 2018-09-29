<template>
    <div class="form login">
        <div class="container">
            <div class="form__box">
                <b-form @submit.prevent="validateBeforeSubmit" @reset="onReset" v-if="show">
                    <b-form-group id="nameInputGroup"
                                  label="Email address:"
                                  label-for="email"
                                  description="We'll never share your email with anyone else.">
                        <b-form-input id="email"
                                      type="email"
                                      v-model="form.email"
                                      name="email"
                                      v-validate="'required|email'"
                                      placeholder="Enter email"
                                      :class="{error: errors.has('email')}">
                        </b-form-input>
                        <transition name="fade">
                            <p v-if="errors.has('email')" class="form__errorMessage">
                                {{ errors.first('email') }}
                            </p>
                        </transition>
                    </b-form-group>
                    <b-form-group id="passwordInputGroup"
                                  label="Your password:"
                                  label-for="password">
                        <b-form-input id="password"
                                      type="password"
                                      v-model="form.password"
                                      name="password"
                                      v-validate="'required'"
                                      placeholder="Enter password">
                        </b-form-input>
                        <transition name="fade">
                            <p v-if="errors.has('password')" class="form__errorMessage">
                                {{ errors.first('password') }}
                            </p>
                        </transition>
                    </b-form-group>
                    <div class="form__row row justify-content-between">
                        <p class="col-5">
                            <b-button type="submit" variant="primary">Submit</b-button>
                        </p>
                        <p class="col-5">
                            <b-button type="reset" variant="danger">Reset</b-button>
                        </p>
                    </div>
                </b-form>
                <p class="text-center">
                    If you haven't account, you can <router-link tag="a" to="registration">sign up</router-link>
                </p>
                <transition name="fade">
                    <div v-if="alert.show" :class="['alert', `alert-${alert.type}`]" role="alert">
                        {{ alert.message }}
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase';

    export default {
        name: 'registration',
        components: {alert},
        data() {
            return {
                form: {
                    email: '',
                    password: '',
                },
                show: true,
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
                this.show = false;
                this.$nextTick(() => {
                    this.show = true
                });
            },
            validateBeforeSubmit() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        firebase.auth().signInWithEmailAndPassword(this.form.email, this.form.password)
                            .then((response) => {
                                console.log(response);
                                this.showAlert('Congratulations! You have sign in.', 'success');
                                this.$root.user = {
                                    email: response.user.email,
                                    uid: response.user.uid
                                };
                                this.$root.auth = true;
                            })
                            .catch(error => {
                                console.log(error);
                                this.showAlert(error.message, 'danger');
                            });
                        return;
                    }
                    setTimeout(() => {
                        this.errors.clear();
                    }, 3000)
                });
            },
            clearForm() {
                this.form.forEach(item => item = '');
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
</script>
