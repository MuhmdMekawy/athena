import React, { useContext } from 'react'
import {  Route, Routes } from 'react-router-dom'
import FooterIcon from '../../images/arcticons_canvasstudent.svg'
import CreateNewAcc from './CreateNewAcc'
import SignupFooter from './signupFooter'
import PersonalDetails from './PersonalDetails'
import ParentsDetails from './ParentsDetails'
import EducationDetails from './EducationDetails'
import ContactDetails from './ContactDetails'
import AccountDetails from './AccountDetails'
import SignUpnavbar from './SignUpnavbar'
import '../../styles/css/signup/signup.css'
import { AppContext } from '../../contexts/AppContext'

function Signup() {

  
  const {direction , theme}
    = useContext(AppContext)
  
  let offcanavsBackground;
  if (theme === "light") {
    offcanavsBackground = "linear-gradient(84.3deg, #1C8EFF 4.54%, #6DB7FF 100%)"
  } else {
    offcanavsBackground = "linear-gradient(292.87deg, #001E3A 0%, #000E1B 100%)"
  }
  return (
    <React.Fragment>
      <div className="signup" style={{direction : direction}}>
        <div className="content">
          <SignUpnavbar showBtn={true} />
          <div className="bottom" style={{background : offcanavsBackground}}>
            <div className="container">
              <Routes>
              <Route path='/' element={<CreateNewAcc /> } />
                <Route path='/personal-details' element={<PersonalDetails />} />
                <Route path='/parent-details' element={<ParentsDetails />} />
                <Route path='/education-details' element={<EducationDetails />} />
                <Route path='/contact-details' element={<ContactDetails />} />
                <Route path='/account-details' element={<AccountDetails />} />
              </Routes>
              <SignupFooter img={FooterIcon} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Signup
