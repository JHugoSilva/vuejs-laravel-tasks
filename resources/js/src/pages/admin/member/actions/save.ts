import { makeHttpReq } from '../../../../helper/makeHttpReq';
import { successMsg } from '../../../../helper/toast-notification';
import { showErrorResponse } from '../../../../helper/utils';
import { memberStore } from '../store/memberStore';

export type MemberInputType = {
    id?:number
    name:string
    email:string
}

export type MemberResponseType = {
    message: string
}


export function useCreateOrUpdateMember () {
    async function save () {
        try {
            const data:any = memberStore.edit ? await update() : await create()
            memberStore.memberInput = {} as MemberInputType
            successMsg(data.message)
        } catch (error:any) {
            showErrorResponse(error.mesage)
        }
    }

    return { save }
}

async function create() {
    const data:any = await makeHttpReq<MemberInputType, MemberResponseType>('member', 'POST', memberStore.memberInput)
    return data
}

async function update() {
    const data:any = await makeHttpReq<MemberInputType, MemberResponseType>('member', 'POST', memberStore.memberInput)
    return data
}

