import { ref } from 'vue';
import { makeHttpReq } from '../../../../helper/makeHttpReq';
import { showErrorResponse } from '../../../../helper/utils';

export type PinnedProject = { data:any, id:number, name:string }
export type PinnedProjectType = { data: PinnedProject}

export function useGetPinnedProject() {

    const project = ref<PinnedProject>({} as PinnedProject)

    async function getProjects() {
        try {
            const data:any = await makeHttpReq<undefined, PinnedProjectType>(`get_pinned_project`, 'GET')
            project.value = data
        } catch (error) {
            showErrorResponse(error)
        }
    }

    return { getProjects, project }
}
