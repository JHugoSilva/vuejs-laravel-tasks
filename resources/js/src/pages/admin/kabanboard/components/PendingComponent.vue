<script setup lang="ts">
//@ts-nocheck
import { getChart } from '../../../../helper/utils';
import { SingleProjectResponseType, TaskStatus } from '../actions/getProjectDetails.types';

defineProps<{
    projectData: SingleProjectResponseType
}>()

const emit = defineEmits<{
    (e: 'openTaskModal'): Promise<void>
    (e: 'fromPendingToCompleted', taskId:number, projectId:number): Promise<void>
}>()
</script>

<template>
    <div class="col-md-4 pending_task">
        <div class="card card-header">
            <b>Pending</b>
        </div>
        <div draggable="true" :class="'card card-body task_card pendingTask_'+task.id" v-for="(task, i) in projectData?.data?.tasks" :key="i"
        v-show="task.status === TaskStatus.PENDING ? true : false" @drag="emit('fromPendingToCompleted', task.id, projectData?.data?.id)">
           <!--  -->
            <p>{{ task?.name }}</p>
            <div class="assignees">
                <button :class="'btn btn-primary member_'+index" v-for="(member, index) in task.task_members" :key="member.id">
                    {{ getChart(member?.members?.name) }}</button>
                <!-- <button class="btn btn-light member_2">L</button>
                <button class="btn btn-secondary member_3">F</button> -->
                {{ task?.task_members.length }} assignees
            </div>
        </div>

    </div>
</template>
