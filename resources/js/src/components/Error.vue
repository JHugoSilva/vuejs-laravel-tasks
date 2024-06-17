<script setup lang="ts">
import { ErrorObject } from "@vuelidate/core"

const props = defineProps<{
    label: string
    errors: ErrorObject[]
}>()
</script>
<template>
    <div>
        <div :class="{ error: props.errors?.length }">
            <label for="">{{ props.label }}</label>
            <slot></slot>
            <div class="input-errors" v-for="error of props.errors" :key="error.$uid">
                <div class="error-msg">{{ error.$message }}</div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.input-errors {
    color: red;
}
</style>
