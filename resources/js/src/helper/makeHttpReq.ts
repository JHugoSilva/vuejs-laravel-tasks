import { APP } from "../App/APP"
import { getUserData } from "./getUserData"

type HttpVerbType = 'GET'|'POST'|'PUT'|'DELETE'

export function makeHttpReq<TInput, TResponse>(endpoint:string, verb:HttpVerbType, input?:TInput) {

    return new Promise(async(resolve, reject)=>{
        try {
            const userData = getUserData()
            const response = await fetch(`${APP.apiBaseURL}/${endpoint}`,{
                method: verb,
                headers: {
                    'Accept':'application/json',
                    'Content-type': 'application/json',
                    Authorization: "Bearer "+userData?.token
                },
                body: JSON.stringify(input)
            })

            const data = await response.json()

            if (!response.ok) {
                reject(data)
            }

            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}
