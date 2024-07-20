import React from 'react'
import NotFoundImage from '../../images/notfound.png'


function NotFound() {
  return (
    <React.Fragment>
      <div className="notFound">
        <img src={NotFoundImage} alt="nothing is here" loading='lazy'/>
      </div>
    </React.Fragment>
  )
}

export default NotFound
