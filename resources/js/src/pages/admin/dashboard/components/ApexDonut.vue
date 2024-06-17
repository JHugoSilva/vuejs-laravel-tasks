<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name:'ApexDonut',
    props: {
        task: { type: Array, required: true }
    },
    data() {
        return {
            options: {
                title: {
                    text: '',
                    align: 'left'
                },
                chart: {
                    id: 'apex-donut'
                },
                labels: ['pending', 'completed'],
                colors: [

                ],
                markers: {
                    size: 5,
                    hover: {
                        sizeOffset: 6
                    }
                }
            },
            series: this.$props.task
        }
    }
})
</script>
<template>
    <apexchart
    height="155"
    type="pie"
    :options="options"
    :series="series"
    ></apexchart>
</template>
