<script setup lang="ts">
//@ts-nocheck
import useVuelidate from '@vuelidate/core';
import { registerInput, registerUser } from './actions/register';
import { email, required } from '@vuelidate/validators';
import { ref } from 'vue';

const rules = {
    email: { required, email },
    password: { required }
}

const v$ = useVuelidate(rules, registerInput)
const { register } = registerUser()
const loading = ref(false);

const submitRegister = async () => {
    const result = await v$.value.$validate()
    if (!result) return

    loading.value = true;
    await register()
    loading.value = false;
    v$.value.$reset()

}
</script>
<template>
    <div class="row mt-5">
        <div class="row">
            <div class="col-md-4"></div>
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h2 class="text-align-center">Register</h2>
                        <form @submit.prevent="submitRegister">
                            <div class="form-group">
                                <Error label="Email" :errors="v$.email.$errors">
                                    <BaseInput v-model="registerInput.email" type="email" />
                                </Error>
                            </div>
                            <div class="form-group mb-3">
                                <Error label="Password" :errors="v$.password.$errors">
                                    <BaseInput v-model="registerInput.password" type="password" />
                                </Error>
                            </div>
                            <div class="form-group">
                                <BaseBtn label="Register" :loading="loading" />
                            </div>
                        </form>
                    </div>
                </div>
                <div class="form-group">
                    <router-link to="/login">Login</router-link>
                </div>
            </div>
            <div class="col-md-4"></div>
        </div>
    </div>
</template>
