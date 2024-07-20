// NotificationsContext
import { AppContext } from './AppContext'
import * as signalR from '@microsoft/signalr'
import { createContext, useEffect, useState, useContext } from 'react'

const NotificationsContext = createContext()

const NotificationsProvider = ({ children }) => {
  const { server, getCookie } = useContext(AppContext)
  const [notificationsData, setNotificationsData] = useState([])

  const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(`${server}/notifications?access_token=${getCookie('token')}`)
    .withAutomaticReconnect()
    .build()

  const getNotifications = async () => {
    try {
      await hubConnection.invoke('GetNotifications')
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    async function startConnection() {
      if (
        hubConnection.state === signalR.HubConnectionState.Disconnected &&
        hubConnection.state != signalR.HubConnectionState.Connecting &&
        hubConnection.state != signalR.HubConnectionState.Reconnecting &&
        hubConnection.state != signalR.HubConnectionState.Disconnecting
      ) {
        try {
          await hubConnection.start()
          getNotifications()
        } catch (err) {
          console.error(err)
        }
      }
    }

    startConnection()

    // Register event handlers for incoming messages from the hub
    hubConnection.on('Notifications', (notificationDtos) => {
      setNotificationsData(notificationDtos)
    })

    hubConnection.on('ChangeNotificationStatus', (notification) => {
      // Handle the notification status change as needed
      console.log('Notification Status Changed:', notification)
    })

    if (hubConnection.state === signalR.HubConnectionState.Disconnecting) {
      hubConnection.stop().catch((err) => console.error(err))
    }
  }, [])

  useEffect(() => {
    console.log(notificationsData)
  }, [notificationsData])

  return (
    <NotificationsContext.Provider value={{ notificationsData, hubConnection }}>
      {children}
    </NotificationsContext.Provider>
  )
}

export { NotificationsContext, NotificationsProvider }
