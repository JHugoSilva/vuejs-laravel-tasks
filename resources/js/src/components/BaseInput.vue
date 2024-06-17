<script setup lang="ts">

const props = defineProps<{
    type?: string;
    modelValue: string;
}>()

const emit = defineEmits<{
    (e:'update:modelValue', val:any):void
}>()

function updateValue(event: any) {
    const val = event.target.value
    emit('update:modelValue', val)
}
</script>
<template>
    <input :value="props.modelValue" :type="typeof props.type === 'undefined' ? 'text' : props.type" @input="updateValue" class="form-control" placeholder=""/>
</template>
