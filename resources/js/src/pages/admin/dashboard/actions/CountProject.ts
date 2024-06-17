import { ref } from "vue"
import { makeHttpReq } from "../../../../helper/makeHttpReq"
import { showErrorResponse } from "../../../../helper/utils"


type CountProjectType = { count:number; }

export function useGetTotalProject() {

    const countProject = ref<CountProjectType>({} as CountProjectType)

    async function getTotalProject() {
        try {
            const data:any = await makeHttpReq<undefined, CountProjectType>('count_project', 'GET')
            countProject.value = data
            updateData()
        } catch (error) {
            showErrorResponse(error)
        }

    }
    function updateData ()  {
        window.Echo.channel('countProject').listen('NewProjectCreated', (e:{ countProject: number })=>{
            countProject.value = { count: e.countProject }
            // console.log(e);
        })
    }

    return { countProject, getTotalProject}
}
