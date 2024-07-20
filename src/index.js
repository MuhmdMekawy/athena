import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App/App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router } from 'react-router-dom'
import { AppProvider } from './contexts/AppContext'
import { StudentProvider } from './contexts/stdContext'
import { AuthProvider } from './contexts/AuthContext'
import { NotificationsProvider } from './contexts/notificationsContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AppProvider>
      <AuthProvider>
        <StudentProvider>
          <NotificationsProvider>
            <Router>
              <App />
            </Router>
          </NotificationsProvider>
        </StudentProvider>
      </AuthProvider>
    </AppProvider>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
