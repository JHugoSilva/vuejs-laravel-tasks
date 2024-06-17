import { ref } from "vue"
import { makeHttpReq } from "../../../../helper/makeHttpReq"
import { showErrorResponse } from "../../../../helper/utils"


type chartDataType = {
    tasks: Array<number>
    progress: number
}

export function useGetChartData() {

    const chartData = ref<chartDataType>({} as chartDataType)

    async function getChartData(projectId:number) {
        try {
            const data:any = await makeHttpReq<undefined, chartDataType>(`chart-data/projects?projectId=${projectId}`, 'GET')
            chartData.value = data
            console.log('AQUI');

            updateData()
        } catch (error) {
            showErrorResponse(error)
        }
    }

    function updateData () {
        console.log('UPDATE');

        window.Echo.channel('projectProgress').listen('TrackProjectProgress',(e:{ projectProgress:number }) => {
            console.log(e);
            chartData.value.progress = 0
            setTimeout(()=>{
                chartData.value.progress = e.projectProgress
            },2000)
        })

        window.Echo.channel('tasks').listen('TrackCompletedAndPendingTask',(e:{ tasks:Array<number>}) => {
            chartData.value.tasks = undefined as any
            setTimeout(()=>{
                chartData.value.tasks = e.tasks
            },2000)

        })



    }

    return { getChartData, chartData }
}

