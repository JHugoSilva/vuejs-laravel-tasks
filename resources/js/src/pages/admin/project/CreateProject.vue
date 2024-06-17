<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { projectStore } from './store/projectStore';
import { useCreasteOrUpdateProject } from './actions/CreateProject';


const rules = {
    name: { required },
    startDate: { required },
    endDate: { required }
}

const v$ = useVuelidate(rules, projectStore.projectInput)
const { loading, save } = useCreasteOrUpdateProject()

async function submitProject() {
    const result = await v$.value.$validate()
    if (!result) return
    await save()
    v$.value.$reset()
}
</script>
<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-6">
                <h3>{{ projectStore.edit === true ? 'Edit Project' : 'Create Project' }}</h3>
                <form @submit.prevent="submitProject">
                    <div class="form-group">
                        <Error label="Name" :errors="v$.name.$errors">
                            <base-input v-model="projectStore.projectInput.name"/>
                        </Error>
                    </div>
                    <div class="form-group">
                        <Error label="StartDate" :errors="v$.startDate.$errors">
                            <base-input type="date" v-model="projectStore.projectInput.startDate"/>
                        </Error>
                    </div>
                    <div class="form-group">
                        <Error label="EndDate" :errors="v$.endDate.$errors">
                            <base-input type="date" v-model="projectStore.projectInput.endDate"/>
                        </Error>
                    </div>
                    <div class="form-group mt-3">
                        <base-btn :class="projectStore.edit ? 'btn btn-warning':'btn btn-primary'"
                        :label="projectStore.edit ? 'Update':'Create'"
                        :loading="loading"
                        />
                    </div>
                </form>
                <div class="form-group mt-3">
                    <router-link to="/projects" class="btn btn-secondary">List</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
