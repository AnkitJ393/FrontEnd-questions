import {
    AiOutlineCheckCircle,
    AiOutlineClose,
    AiOutlineCloseCircle,
    AiOutlineInfoCircle,
    AiOutlineWarning,
  } from "react-icons/ai";
  import './notification.css'
import React, { useEffect, useRef } from "react";
import { NotificationProps } from "./types";

  const iconStyles: React.CSSProperties = {marginRight: "10px"};
const icons: Record<string,JSX.Element> = {
    success: <AiOutlineCheckCircle style={iconStyles} />,
    info: <AiOutlineInfoCircle style={iconStyles} />,
    warning: <AiOutlineWarning style={iconStyles} />,
    error: <AiOutlineCloseCircle style={iconStyles} />,
  };

  const animations: Record<string, string> = {
    fade: "fadeIn",
    pop: "popup",
    slide: "slideIn",
  };

  const Notification:React.FC<NotificationProps> = ({type = "info", message, onClose = () => {} , animationType}) => {

    const notificationRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (notificationRef.current) {
        notificationRef.current.focus();
      }
    }, []);

    const ariaRole = type === "error" || type === "warning" ? "alert" : "status";
    const ariaLive =
      type === "error" || type === "warning" ? "assertive" : "polite";
    


  return (
    <div 
      ref={notificationRef}
      className={`notification ${type} ${animations[animationType]}`}
      role={ariaRole}
      aria-live={ariaLive}
      tabIndex={-1}
    >
      {/* icon */}
      {icons[type]}
      {/* message */}
        {message}
      {/* close button */}
      <AiOutlineClose className='closeBtn' color="white" onClick={()=>{onClose()} }/>
    </div>
  )
}

export default Notification
