import { useCallback, useState } from "react"
import Notification from "../components/notification";

const useNotification=(position='top-right')=>{
    const [notification, setNotification] = useState(null);

    let timer;
    const triggerNotification=useCallback(
      (notificationprops) => {
          setNotification(notificationprops)
          clearTimeout(timer);
          timer=setTimeout(()=>{
              setNotification(null);
          },notificationprops.duration)
        
      },
      [],
    )
 

    const NotificationComponent=notification ? 
        <div className={`${position}`}>
            <Notification {...notification}/>
        </div>
    : null

    return {NotificationComponent,triggerNotification}
}


export default useNotification;
