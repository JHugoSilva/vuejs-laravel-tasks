<script setup lang="ts">
//@ts-nocheck
import { onMounted } from "vue";
import { useGetPinnedProject } from "./actions/GetPinnedProject";
import ApexDonutVue from "./components/ApexDonut.vue";
import ApexRadialBarVue from "./components/ApexRadialBar.vue";
import { useGetTotalProject } from "./actions/CountProject";
import { useGetChartData } from "./actions/GetChartData";

const { countProject, getTotalProject } = useGetTotalProject()
const { getProjects, project } = useGetPinnedProject()
const { chartData, getChartData } = useGetChartData()

onMounted(async()=>{
    await getProjects()
    await getTotalProject()
    await getChartData(project.value.data.id)
})

</script>
<template>
  <div class="row mt-5">
    <h2 class="mb-3">Dashboard</h2>
    <div class="row">
      <div class="col-md-8 mb-2">
        <h3 style="color: rgb(118, 119, 120)">Project : {{ project?.data?.name }}</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 col-sm-12">
        <div class="card">
          <div class="card-header">
            <b>Total Projects</b>
          </div>
          <div class="card-body mb-3">
            <div v-if="countProject.count">
                <h2 align="center">{{ countProject.count }}</h2>
            </div>
            <div v-else>
                0
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-sm-12">
        <div class="card">
          <div class="card-header">
            <b>Task</b>
          </div>
          <div class="card-body mb-3">
            <div v-if="chartData.tasks">
                <ApexDonutVue :task="chartData.tasks"/>
            </div>
            <div v-else>
                <ApexDonutVue :task="[0,0]"/>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-sm-12">
        <div class="card">
          <div class="card-header">
            <b>Task Progress</b>
          </div>
          <div class="card-body mb-3">
            <span v-if="chartData.progress > 0">
                <ApexRadialBarVue :percent="chartData.progress"/>
            </span>
            <span v-else>
                <ApexRadialBarVue :percent="0"/>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
