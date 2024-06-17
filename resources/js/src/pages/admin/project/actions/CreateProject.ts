import { ref } from 'vue';
import { showErrorResponse } from '../../../../helper/utils';
import { projectStore } from '../store/projectStore';
import { successMsg } from '../../../../helper/toast-notification';
import { makeHttpReq } from '../../../../helper/makeHttpReq';


export type ProjectInputType = {
    id?: number
    name: string
    startDate: string
    endDate: string
}

export type ProjectResponseType = {
    message: string
}

export function useCreasteOrUpdateProject() {

const loading = ref(false)


async function save() {
        try {
            loading.value = true
            const data:any =  projectStore.edit ? await update() : await create()
            loading.value = false
            projectStore.projectInput = {} as ProjectInputType
            successMsg(data.message)
        } catch (error) {
            loading.value = false
            showErrorResponse(error)
        }
    }

    return { save, loading }
}

const update = async () => {
    const data = await makeHttpReq<ProjectInputType, ProjectResponseType>('project_update', 'POST', projectStore.projectInput)
    return data
}

const create = async () => {
    const data = await makeHttpReq<ProjectInputType, ProjectResponseType>('project', 'POST', projectStore.projectInput)
    return data
}

