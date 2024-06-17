import { makeHttpReq } from "../../../helper/makeHttpReq";
import { successMsg } from "../../../helper/toast-notification";
import { showErrorResponse } from "../../../helper/utils";

export function useLogoutUser() {

    async function logout(id:number|undefined) {
        try {
            const data:any = await makeHttpReq<{id:number|undefined}, {message:string}>('logout','POST', {id:id})
            successMsg(data.message)
        } catch (error) {
            showErrorResponse(error)
            if ((error as Error).message === 'Unauthenticated.'){
                window.location.href = '/app/login'
            }
        }
    }

    return { logout }
}
