<script setup lang="ts">
const props = defineProps<{
  loading: boolean;
  label: string;
}>();
</script>
<template>
  <button :disabled="props.loading" type="submit" class="btn btn-primary w-100">
    <span v-if="!props.loading">{{ props.label }}</span>
    <div v-if="props.loading ? true : false" class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </button>
</template>
