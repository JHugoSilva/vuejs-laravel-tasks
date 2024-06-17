<script setup lang="ts">
//@ts-nocheck
import { onMounted } from "vue";
import { ProjectType, useGetProject } from "./actions/GetProject";
import ProjectTable from "./component/ProjectTable.vue";
import { projectStore } from "./store/projectStore";
import { useRouter } from "vue-router";
import { ProjectInputType } from "./actions/CreateProject";
import { usePinnedProject } from "./actions/PinnedProject";

const { getProjects, projectData, loading } = useGetProject();
const router = useRouter()

async function showListOfProjects() {
  await getProjects();
}

const editProject = (project:ProjectType) => {
    projectStore.projectInput = {
        id:project.id,
        name:project.name,
        startDate:project.startDate,
        endDate:project.endDate
    }
    projectStore.edit = true
    router.push('/project-create')
}

const { pinnedProject } = usePinnedProject()

const pinnedProjectOnDashboard = async (projectId:number) => {
    await pinnedProject(projectId)
    router.push('/admin')
}

onMounted(async () => {
  await showListOfProjects();
  projectStore.edit = false
  projectStore.projectInput = {} as ProjectInputType
});
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header d-flex justify-content-around">
            Projects
            <router-link to="/project-create" class="btn btn-primary"
              >Creaste Project</router-link
            >
          </div>
          <div class="card-body">
            <ProjectTable
              @get-project="getProjects"
              @edit-project="editProject"
              @pinned-project="pinnedProjectOnDashboard"
              :loading="loading"
              :projects="projectData"
            >
            <template #pagination>
                <Bootstrap5Pagination
                v-if="projectData?.data"
                :data="projectData?.data"
                @pagination-change-page="getProjects"
                />
            </template>
            </ProjectTable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
