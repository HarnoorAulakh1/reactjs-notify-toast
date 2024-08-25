import { useContext } from "react";
import { notificationContext } from "../components/Notification";

export function useNotify(){
    const {data,setter} = useContext(notificationContext);
    function show(notification: string){
        setter({show: true, notification,id: Date.now()});
    }
    return {show,setter, data};
}