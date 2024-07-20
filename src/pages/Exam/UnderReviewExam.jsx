import React from 'react'
import Navbar from '../../components/Navbar'
import reviewExam from '../../images/reviewExam.png'
import '../../styles/css/Exam/underReviewExam.css'
import SignupFooter from '../signup/signupFooter'
import FooterIcon from '../../images/arcticons_canvasstudent.svg'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../../contexts/AppContext'


function UnderReviewExam() {
  const {lang , direction} = useContext(AppContext)
  return (
    <React.Fragment>
      <Navbar
        showhomeNavbarBtn={true}
      />
      <div className="underreview-exams" style={{direction : direction}}>
        <div className="container">
          <div className="content">
            <div className="image">
              <img src={reviewExam} alt="exam is under review" loading='lazy'/>
            </div>
            <h1 className='gradient-text'>{lang === 'ar' ? 'الامتحان قيد التصحيح' : 'Exam Correcting'}</h1>
            <h3>{lang === 'ar' ? 'عُدّ لاحقاً ' : 'Come back later'}</h3>
            <p>{lang === 'ar' ? 'اصنع شيئا مفيدا أثناء تصحيح الامتحان' : 'Make something helpfully while exam being corrected'}</p>
            <a href='/athena-homepage'>
              <button className="submitBtn special">{lang === 'ar' ? 'العوده للصفحه الرئيسيه' : 'Back To Home'}</button>
            </a>
          </div>
        </div>
      <SignupFooter img={FooterIcon} />
      </div>
    </React.Fragment>
  )
}

export default UnderReviewExam
