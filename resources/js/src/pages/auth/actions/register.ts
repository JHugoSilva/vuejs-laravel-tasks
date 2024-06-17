import { ref } from "vue";
import { makeHttpReq } from "../../../helper/makeHttpReq";
import { showError, successMsg } from "../../../helper/toast-notification";

export type RegisterUserType = {
    email: string;
    password: string;
};

export type RegisterResponseType = {
    user: { email: string };
    message: string;
};

export const registerInput = ref<RegisterUserType>({} as RegisterUserType);

export function registerUser() {

    async function register() {
        try {

            const data: any = await makeHttpReq<
                RegisterUserType,
                RegisterResponseType
            >("register", "POST", registerInput.value);

            registerInput.value = {} as RegisterUserType

            successMsg(data.message);
            } catch (error: any) {
                // for (const message of error.errors as string[]) {
                //     console.log('FOR',message);
                //     showErrot(message);

                //     }

                for (const [k, value] of Object.entries(error.errors)) {
                    showError(`${value}`);
                  }
        }
    }

    return { register };
}
