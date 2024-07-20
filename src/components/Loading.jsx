import React from 'react'
import { ThreeCircles } from 'react-loader-spinner'

function Loading() {
  return (
    <React.Fragment>
      <div className="loading">
        <ThreeCircles
          height="100"
          width="100"
          color="#4EA7FF"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="three-circles-rotating"
          outerCircleColor=""
          innerCircleColor=""
          middleCircleColor=""
        />
      </div>
    </React.Fragment>
  )
}

export default Loading
