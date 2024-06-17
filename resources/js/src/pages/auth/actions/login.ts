import { ref } from "vue";
import { makeHttpReq } from "../../../helper/makeHttpReq";
import { successMsg } from "../../../helper/toast-notification";
import { showErrorResponse } from "../../../helper/utils";

export type LoginUserType = {
    email: string;
    password: string;
};

export type LoginResponseType = {
    user: { email:string, id:number };
    message: string;
    isLoggedIn: boolean;
    token: string
};

export const loginInput = ref<LoginUserType>({} as LoginUserType);


export function loginUser() {

    async function login() {
        try {

            const data: any = await makeHttpReq<
                LoginUserType,
                LoginResponseType
            >("login", "POST", loginInput.value);

            loginInput.value = {} as LoginUserType
            successMsg(data.message);

            if (data.isLoggedIn) {
                localStorage.setItem('userData', JSON.stringify(data))
                window.location.href = '/app/admin'
            }

            } catch (error: any) {
               showErrorResponse(error)
        }
    }

    return { login };
}
