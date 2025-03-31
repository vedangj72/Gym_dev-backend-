import dayjs from "dayjs"


export const getCurrentUnix=()=>{
    return dayjs().unix().toString()
}