import { ref } from "vue"
import { makeHttpReq } from '../../../../helper/makeHttpReq';
import { SingleProjectResponseType } from './getProjectDetails.types';
import { showErrorResponse } from "../../../../helper/utils";

export function useGetProjectDetail() {

    const projectData = ref<SingleProjectResponseType>({} as SingleProjectResponseType)

    async function getProjectDetails(slug:string) {

        try {
            const data:any = await makeHttpReq<undefined,SingleProjectResponseType>(`project/${slug}`, 'GET')
            projectData.value = data

        } catch (error:any) {
            showErrorResponse(error)
        }
    }

    return { getProjectDetails, projectData }
}
