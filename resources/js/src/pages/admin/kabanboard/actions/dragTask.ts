import { makeHttpReq } from "../../../../helper/makeHttpReq"
import { successMsg } from "../../../../helper/toast-notification"
import { showErrorResponse } from "../../../../helper/utils"
import { taskStore } from "../store/KabanStore"

export type changeTaskInput = {
    taskId: number
    projectId: number
}

export function useDragTask(fn:(slug:string)=>Promise<void>, slug:string) {

    async function fromNotStartedToPending(taskId:number, projectId: number) {

        const notStartedTask = document.querySelector('.notStartedTask_'+taskId) as HTMLElement

        const pendingColumn = document.querySelector('.pending_task') as HTMLElement

        let isDragged = false

        pendingColumn.addEventListener('dragstart', function(){

            console.log('dragstart');

        })

        pendingColumn.addEventListener('dragover', function(event){

            if (!isDragged) {
                event.preventDefault()
                pendingColumn.className += ' hovered'
                isDragged = true
            }
            // console.log('dragover');

        })

        pendingColumn.addEventListener('dragleave', function(){
            isDragged = false
            pendingColumn.classList.remove('hovered')
            // console.log('dragleave');

        })

        pendingColumn.addEventListener('drop', function(event){
            event.preventDefault()
            pendingColumn.append(notStartedTask)
            pendingColumn.classList.remove('hovered')
            isDragged = false
            taskStore.currentTaskId = taskId

            if (!pendingColumn.getAttribute('data-listeners-added')) {
                pendingColumn.setAttribute('data-listeners-added', 'true')


                setTimeout(async () => {

                    await Promise.all([
                       changeTaskStatus(taskStore.currentTaskId, projectId, 'tasks/not_started_to_pending'),
                       fn(slug)
                    ])
                    pendingColumn.removeAttribute('data-listeners-added')
                }, 200)
            }
        })
    }

    function fromPendingToCompleted(taskId:number, projectId: number) {

        const pendingTask = document.querySelector('.pendingTask_'+taskId) as HTMLElement

        const completedColumn = document.querySelector('.completed_task') as HTMLElement

        let isDragged = false

        completedColumn.addEventListener('dragstart', function(){

            console.log('dragstart');

        })

        completedColumn.addEventListener('dragover', function(event){

            if (!isDragged) {
                event.preventDefault()
                completedColumn.className += ' hovered'
                isDragged = true
            }
            // console.log('dragover');

        })

        completedColumn.addEventListener('dragleave', function(){
            isDragged = false
            completedColumn.classList.remove('hovered')
            // console.log('dragleave');

        })

        completedColumn.addEventListener('drop', function(event){
            event.preventDefault()
            completedColumn.append(pendingTask)
            completedColumn.classList.remove('hovered')
            isDragged = false
            taskStore.currentTaskId = taskId

            if (!completedColumn.getAttribute('data-listeners-added')) {
                completedColumn.setAttribute('data-listeners-added', 'true')


                setTimeout(async () => {

                    await Promise.all([
                       changeTaskStatus(taskStore.currentTaskId, projectId, 'tasks/pending_to_completed'),
                       fn(slug)
                    ])
                    completedColumn.removeAttribute('data-listeners-added')
                }, 200)
            }

        })
    }

    function fromCompletedToPending(taskId:number, projectId: number) {

        const completedTask = document.querySelector('.completedTask_'+taskId) as HTMLElement

        const pendingColumn = document.querySelector('.pending_task') as HTMLElement

        let isDragged = false

        pendingColumn.addEventListener('dragstart', function(){

            console.log('dragstart');

        })

        pendingColumn.addEventListener('dragover', function(event){

            if (!isDragged) {
                event.preventDefault()
                pendingColumn.className += ' hovered'
                isDragged = true
            }
            // console.log('dragover');

        })

        pendingColumn.addEventListener('dragleave', function(){
            isDragged = false
            pendingColumn.classList.remove('hovered')
            // console.log('dragleave');
        })

        pendingColumn.addEventListener('drop', function(event){
            event.preventDefault()
            pendingColumn.append(completedTask)
            pendingColumn.classList.remove('hovered')
            isDragged = false
            // console.log('drop');
            taskStore.currentTaskId = taskId

            if (!pendingColumn.getAttribute('data-listeners-added')) {
                pendingColumn.setAttribute('data-listeners-added', 'true')


                setTimeout(async () => {

                    await Promise.all([
                       changeTaskStatus(taskStore.currentTaskId, projectId, 'tasks/completed_to_pending'),
                       fn(slug)
                    ])
                    pendingColumn.removeAttribute('data-listeners-added')
                }, 200)
            }


        })
    }

    return { fromNotStartedToPending, fromPendingToCompleted, fromCompletedToPending }
}

export async function changeTaskStatus(
    taskId: number,
    projectId: number,
    endPoint: string
) {

    try {

        const data:any = await makeHttpReq<changeTaskInput, { message: string}>(endPoint, 'POST', {
            taskId: taskId,
            projectId: projectId
        })

        successMsg(data.message)
    } catch (error) {
        showErrorResponse(error)
    }
}
