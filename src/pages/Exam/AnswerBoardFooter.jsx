import React from 'react'
import SignupFooter from '../signup/signupFooter'
import FooterIcon from '../../images/arcticons_canvasstudent (1).png'
import logo from '../../images/Group 637.png'
import mcqImg from '../../images/Group 507 (1).png'
import { useContext } from 'react'
import { AppContext } from '../../contexts/AppContext'

function AnswerboardFooter() {
  const { direction } = useContext(AppContext)
  return (
    <React.Fragment>
      <div className="answerboardFooter" style={{direction : direction}}>
        <div className="left">
          <SignupFooter img={FooterIcon} />
        </div>
        <div className="right">
          <img src={logo} alt="athena logo" loading='lazy' />
          <img src={mcqImg} alt="mcq img" loading='lazy'/>
        </div>
      </div>
    </React.Fragment>
  )
}

export default AnswerboardFooter
