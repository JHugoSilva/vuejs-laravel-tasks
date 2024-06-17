import { ref } from "vue";
import { makeHttpReq } from "../../../../helper/makeHttpReq";
import { successMsg } from "../../../../helper/toast-notification";
import { showErrorResponse } from "../../../../helper/utils";


export function usePinnedProject() {

    const loading = ref(false)

    async function  pinnedProject(projectId:number) {
        try {
            loading.value = true
            const data:any = await makeHttpReq<{ projectId:number }, { message:string}>('pinned_project', 'POST', {projectId:projectId})
            loading.value = false
            successMsg(data.message)
        } catch (error) {
            loading.value = false
            showErrorResponse(error)
        }
    }

    return { pinnedProject, loading}
}
