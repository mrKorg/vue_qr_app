<template>
    <div class="form registration">
        <div class="container">
            <div class="form__box">
                <b-form @submit.prevent="validateBeforeSubmit" @reset="onReset">
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
                    <b-form-group id="passwordInputGroup2"
                                  label="Enter password:"
                                  label-for="password2">
                        <b-form-input id="password2"
                                      type="password"
                                      name="password"
                                      v-validate="'required'"
                                      v-model="form.password2"
                                      ref="password2"
                                      placeholder="Enter password">
                        </b-form-input>
                        <transition name="fade">
                            <p v-if="errors.has('password')" class="form__errorMessage">
                                {{ errors.first('password') }}
                            </p>
                        </transition>
                    </b-form-group>
                    <b-form-group id="passwordInputGroup"
                                  label="Confirm password:"
                                  label-for="password">
                        <b-form-input id="password"
                                      type="password"
                                      v-model="form.password"
                                      name="confirm password"
                                      v-validate="'required|confirmed:password2'"
                                      placeholder="Confirm password">
                        </b-form-input>
                        <transition name="fade">
                            <p v-if="errors.has('confirm password')" class="form__errorMessage">
                                {{ errors.first('confirm password') }}
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
                    If you have account, you can <router-link tag="a" to="login">sign in</router-link>
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
    import form from '@/mixins/form';

    export default {
        name: 'registration',
        mixins: [form],
        data() {
            return {
                form: {
                    email: null,
                    password: null,
                    password2: null
                }
            }
        },
        methods: {
            validateBeforeSubmit(evt) {
                evt.preventDefault();
                this.$validator.validateAll()
                    .then((result) => {
                        if (result) {
                            firebase.auth().createUserWithEmailAndPassword(this.form.email, this.form.password)
                                .then((response) => {
                                    console.log(response);
                                    this.showAlert('Congratulations! You have successfully registered.', 'success');
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
            }
        }
    }
</script>
