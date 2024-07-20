import React, { useEffect } from 'react'
import { useContext } from 'react'
import { AppContext } from '../contexts/AppContext'
import avatar from '../images/info.png'


function Notification() {
  const { lang, direction } = useContext(AppContext)
  
  useEffect(() => {
    if (lang === 'en') {
      document.querySelector('.notification').style.right = '0'
      document.querySelector('.notification').style.left = 'unset'
    } else {
      document.querySelector('.notification').style.left = '0'
      document.querySelector('.notification').style.right = 'unset'
    }
  }, [])
  return (
    <>
      <div className="notification" style={{direction : direction}}>
        <div className="content">
          <h1 className='gradient-text'>{lang === 'ar' ? 'الإشعارات' : 'Notifications'}</h1>
          <h4>{lang === 'ar' ? 'اليوم' : 'Today'}</h4>
          <div className="cont">
            <div className="image">
              <img src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png' alt="image" loading='lazy'/>
            </div>
            <p>Mr. Albert Einstein prepared a new upcoming exam </p>
            <small>10 hours ago</small>
          </div>
          <h4>{lang === 'ar' ? 'أقدم' : 'Older'}</h4>
          <div className="cont">
            <div className="image">
              <img src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png' alt="image" loading='lazy'/>
            </div>
            <p>Mr. Albert Einstein prepared a new upcoming exam </p>
            <small>10 hours ago</small>
          </div>
          <h6>{lang === 'ar' ? 'هذه هي كل إشعاراتك من آخر 30 يوما.' : "That's all your notifications from the last 30 days."}</h6>
        </div>
      </div>
    </>
  )
}

export default Notification
