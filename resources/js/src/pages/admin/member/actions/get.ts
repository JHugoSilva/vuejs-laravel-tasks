//@ts-nocheck
import { ref } from "vue"
import { showErrorResponse } from "../../../../helper/utils";
import { makeHttpReq } from "../../../../helper/makeHttpReq"

export type MemberType = {
    id: number
    name: string
    email: string
}

export type GetMemberType = {
    data: { data:Array<MemberType> }
} & Record<string, any>

export function useGetMembers() {
    const memberData = ref<GetMemberType>({} as GetMemberType)
    const loading=ref(false)
    async function get(page:number=1, query:string='') {
        loading.value = true
        try {
            const data:any = await makeHttpReq<undefined, GetMemberType>(`members?query=${query}&page=${page}`, 'GET')
            loading.value = false
            memberData.value = data
            } catch (error:any) {
            loading.value = false
            showErrorResponse(error)
        }
    }

    return { get, memberData, loading }
}
