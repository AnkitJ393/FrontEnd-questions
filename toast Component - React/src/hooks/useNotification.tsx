import { useCallback, useRef, useState } from "react"
import Notification from "../components/notification";
import { v4 as uuidv4 } from "uuid";
import {PositionType,NotificationProps,UseNotificationReturn} from '../components/types'
import React from "react";


const useNotification=(position:PositionType ='top-right'):UseNotificationReturn=>{
    const [notification, setNotification] = useState<(NotificationProps&{id:string})[]>([]);
    
 
    const triggerNotification=useCallback(
      (notificationprops:NotificationProps) => {
        const  toastId=uuidv4();

        setNotification((prevNotifications) => [
            ...prevNotifications,
            { ...notificationprops, id: toastId}
          ]);
      
        setTimeout(() => {
            setNotification((prevNotifications) =>
             prevNotifications.filter((n)=>n.id!==toastId)
            );
        },notificationprops.duration)

    },[])

    const handleNotificationClose =(index:number)=>{
        setNotification((prevNotification)=>{
            return prevNotification.filter((_, i) => i !== index);
        })
    }

    const NotificationComponent= 
        <div className={`${position}`}>
            {notification.map((notification,index)=>
                <Notification key={notification.id} {...notification} onClose={() => handleNotificationClose(index)}/>
            )
            }
        </div>
    

    return {NotificationComponent,triggerNotification}
}


export default useNotification;
