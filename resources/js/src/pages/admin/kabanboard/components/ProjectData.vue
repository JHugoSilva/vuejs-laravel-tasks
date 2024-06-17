<script setup lang="ts">
import { SingleProjectResponseType } from "../actions/getProjectDetails.types";

defineProps<{
  projectData: SingleProjectResponseType;
}>();
</script>

<template>
  <div class="row" style="margin-bottom: 20px">
    <h3 style="color: #767778">Project: {{ projectData?.data?.name }}</h3>
    <span>
      <span
        >StartDate: <b>{{ projectData?.data?.startDate }}</b> - EndDate:
        <b>{{ projectData?.data?.endDate }}</b></span
      >
    </span>
  </div>
</template>
