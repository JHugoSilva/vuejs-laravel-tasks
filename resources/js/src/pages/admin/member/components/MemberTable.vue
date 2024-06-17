<script setup lang="ts">
//@ts-nocheck
import { ref } from "vue";
import { GetMemberType, MemberType } from "../actions/get";
import { myDebounce } from "../../../../helper/utils";

defineProps<{
    members: GetMemberType,
    loading: boolean
}>();

const emit = defineEmits<{
    (e: "editMember", member: MemberType): void;
    (e: "reload"): void;
    (e: "getMember", query: string): Promise<void>;
}>();

const query = ref("");
const search = myDebounce(async function () {
    await emit("getMember", 1, query.value);
}, 200);
</script>
<template>
    <div class="row">
        <div class="row">
            <div class="col-md-4">
                <input type="text" @keydown="search" v-model="query" placeholder="Search..." class="form-control" />
                <span style="color:blue;" v-show="loading === true ? true : false"><b>Searching...</b></span>
                </div>
            <br><br>
        </div>
        <div class="row ml-2 mt-2">
            <table class="table table-bordered table-hover table-striped">
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Edit</td>
                    </tr>
                </thead>
                <tbody v-if="members.data?.data.length > 0">
                    <tr v-for="(member, i) in members.data?.data" :key="i">
                        <td>{{ i + 1 }}</td>
                        <td>{{ member.name }}</td>
                        <td>{{ member.email }}</td>
                        <td>
                            <button class="btn btn-warning btn-sm" @click="emit('editMember', member)">
                                Edit
                            </button>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <p>Não localizado</p>
                </tbody>
            </table>
        </div>
        <slot name="pagination"></slot>
    </div>
</template>
