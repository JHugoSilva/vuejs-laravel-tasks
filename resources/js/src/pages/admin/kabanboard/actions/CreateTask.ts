import { ref } from "vue"
import { makeHttpReq } from "../../../../helper/makeHttpReq"
import { taskStore } from "../store/KabanStore"
import { showErrorResponse } from "../../../../helper/utils"
import { successMsg } from "../../../../helper/toast-notification"


export type CreateTaskInput = {
    name: string
    memberIds: Array<number>
    projectId: number
}

export function useCreateTask() {

    const loading = ref(false)

    async function save() {
        try {
            loading.value = true
            const data:any = await makeHttpReq<CreateTaskInput, { message:string}>('task', 'POST', taskStore.taskInput)
            loading.value = false
            successMsg(data.message)
            return data
        } catch (error) {
            loading.value = false
            showErrorResponse(error)

        }
    }

    return { save, loading }
}
