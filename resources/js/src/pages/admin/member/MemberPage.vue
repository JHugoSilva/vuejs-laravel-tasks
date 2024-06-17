<script setup lang="ts">
//@ts-nocheck
import { onMounted } from "vue";
import MemberTableVue from "./components/MemberTable.vue";
import { useGetMembers } from "./actions/get";
const { get, memberData, loading } = useGetMembers();
import { useRouter } from "vue-router";
import { memberStore } from "./store/memberStore";

const getAllMembers = async () => {
  await get();
};

const router = useRouter()

const editMember = (member:MemberType) => {
    memberStore.memberInput = member
    memberStore.edit = true
    router.push('/create-members')
}

onMounted(async () => {
    memberStore.memberInput ={}
    memberStore.edit = false
    await getAllMembers();
});
</script>
<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header d-flex justify-content-around">
            Members
            <router-link to="/create-members" class="btn btn-primary"
              >Create</router-link
            >
          </div>
          <div class="card-body">
            <MemberTableVue
              @get-member="get"
              @edit-member="editMember"
              :loading="loading"
              :members="memberData"
            >
                <template #pagination>
                    <Bootstrap5Pagination
                        v-if="memberData?.data"
                        :data="memberData?.data"
                        @pagination-change-page="get"
                    />
                </template>
            </MemberTableVue>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
