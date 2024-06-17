<script setup lang="ts">
//@ts-nocheck
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import BreadCrumb from './components/BreadCrumb.vue'
import ProjectData from './components/ProjectData.vue'
import ProjectProgress from './components/ProjectProgress.vue'
import NotStartedComponent from './components/NotStartedComponent.vue'
import PendingComponent from './components/PendingComponent.vue'
import CompletedComponent from './components/CompletedComponent.vue'

import { useGetProjectDetail } from "./actions/getProjectDetail";
import { closeModal, openModal } from "../../../helper/utils";
import AddTaskModal from "./components/AddTaskModal.vue";
import { useGetMembers } from "../member/actions/get";
import { taskStore } from "./store/KabanStore";
import { useDragTask } from "./actions/dragTask";

const route = useRoute()
const slug = route.query?.query as string
const { projectData, getProjectDetails } = useGetProjectDetail()
const { get, memberData, loading } = useGetMembers()
const { fromNotStartedToPending, fromPendingToCompleted, fromCompletedToPending } = useDragTask(getProjectDetails, slug)

async function refreshKabanBoard() {
    await getProjectDetails(slug)
}

async function openTaskModal() {
    await openModal('taskModal').then(()=>{
        taskStore.taskInput.projectId = projectData.value?.data.id
        taskStore.taskInput.memberIds = []
        console.log('task...');

    })
}

function closeTaskModal() {
    closeModal('taskModal')
}

onMounted(async () => {
    await getProjectDetails(slug)
    await get(1, '')
})
</script>
<template>
    <div class="row">
        <BreadCrumb />
        <AddTaskModal @close-modal="closeTaskModal" @get-members="get" @refresh-kaban-board="refreshKabanBoard" :members="memberData"/>
        <ProjectData :project-data="projectData" />
        <ProjectProgress :project-data="projectData" />
        <div class="card mt-5">
            <div class="card-body">
                <div class="row" style="height: 500px;">
                    <NotStartedComponent @open-task-modal="openTaskModal"
                        @fromNotStartedToPending="fromNotStartedToPending"
                        :projectData="projectData"/>
                    <PendingComponent @fromPendingToCompleted="fromPendingToCompleted"
                        :projectData="projectData"/>
                    <CompletedComponent @fromCompletedToPending="fromCompletedToPending"
                        :projectData="projectData"/>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.hovered {
    border: 2px dashed rgb(158, 156, 156);
    border-radius: 5px;
}
.assignees button {
    border-radius: 50px;
    width: 40px;
    border: 1px solid grey;
}

.assignees .member_1 {
    position: relative;
    left: -10px;
}

.assignees .member_2 {
    position: relative;
    left: -10px;
}

.assignees .member_3 {
    position: relative;
    left: -20px;
}

.task_card {
    padding: 10px;
    margin-top: 5px;
}

.not_started_task {
    background-color: aliceblue;
}

.pending_task {
    background-color: rgb(211, 213, 214);
}
</style>
