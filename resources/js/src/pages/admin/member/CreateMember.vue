<script setup lang="ts">
//@ts-nocheck
import useVuelidate from '@vuelidate/core';
import { email, required } from '@vuelidate/validators';
import { useCreateOrUpdateMember } from './actions/save';
import { ref } from 'vue';
import { memberStore } from './store/memberStore';
import { useRouter } from 'vue-router';

const rules = {
    email: { required, email },
    name: { required }
}
const router = useRouter()

const loading = ref(false)

const v$ = useVuelidate(rules, memberStore.memberInput)

const createdMember = async () => {
    const result = await v$.value.$validate()
    if (!result) return
    const { save } = useCreateOrUpdateMember()

    loading.value = true
    await save()
    loading.value = false
    router.push('/members')
}

const backPage = () => {
    memberStore.memberInput = {}
    memberStore.edit = false
    router.push('/members')
}
</script>
<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-6 form-group">
                <h3>{{ memberStore.edit === true ? 'Edit Member' : 'Create Member' }}</h3>
                <form @submit.prevent="createdMember">
                    <div class="form-group">
                        <Error label="Name" :errors="v$.name.$errors">
                            <BaseInput v-model="memberStore.memberInput.name"></BaseInput>
                        </Error>
                    </div>
                    <div class="form-group">
                        <Error label="Email" :errors="v$.email.$errors">
                            <BaseInput v-model="memberStore.memberInput.email"></BaseInput>
                        </Error>
                    </div>
                    <div class="form-group mt-3">
                        <BaseBtn :class="memberStore.edit ? 'btn btn-warning' : 'btn btn-primary'"
                            :label="memberStore.edit ? 'Update' : 'Create'" :loading="loading"></BaseBtn>
                    </div>
                </form>
                <div class="form-group col-md-6 mt-3">
                    <button class="btn btn-secondary " @click="backPage">List</button>
                </div>
            </div>
        </div>
    </div>
</template>
