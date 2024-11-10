import React from 'react'
import useNotification from './hooks/useNotification'
import './App.css'


const notificationProps={
  success:{
    type: "success",
    message: "This is a success message!",
    duration: 3000,
    animationType: "pop",
  },
  info:{
    type: "info",
    message: "This is an info message!",
    duration: 3000,
    animationType: "fade"
  },
  warning:{
    type: "warning",
    message: "This is a warning message!",
    duration: 3000,
    animationType: "slide"
  },
  error:{
    type: "error",
    message: "This is an error message!",
    duration: 3000,
    animationType: "pop"
  }


}
const App = () => {

  const {NotificationComponent,triggerNotification}=useNotification('bottom-left');

 

  return (
    <div className='App'>
    {NotificationComponent}
      <h1>Toast Component</h1>
      <div className="btns">
        <button
          onClick={() =>
            triggerNotification(notificationProps.success)
          }
        >
          Show Success
        </button>
        <button
          onClick={() =>
            triggerNotification(notificationProps.info)
          }
        >
          Show Info
        </button>
        <button
          onClick={() =>
            triggerNotification(notificationProps.warning)
          }
        >
          Show Warning
        </button>
        <button
          onClick={() =>
            triggerNotification(notificationProps.error)
          }
        >
          Show Error
        </button>
      </div>
    </div>
  )
}

export default App