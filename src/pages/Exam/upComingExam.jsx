import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import '../../styles/css/Exam/upcomingpage.css'
import SignupFooter from '../signup/signupFooter'
import FooterIcon from '../../images/arcticons_canvasstudent.svg'
import { Link, useParams } from 'react-router-dom'
import comingexamImag from '../../images/comingexam.png'
import axios from 'axios'
import { AppContext } from '../../contexts/AppContext'
import Loading from '../../components/Loading'
import { useAuth } from '../../contexts/AuthContext'


function UpComingExam() {
  const [data, setData] = useState(null)
  const { lang, direction, server, getCookie } = useContext(AppContext)
  const { id } = useParams()
  const { accessToken } = useAuth();


  let formattedDate;
  let formattedTime;
  if (data !== null && data.publishedDate !== null && data.publishedTime !== null) {
    
    // to format the Exam date from endpoint
    const date = new Date(data.publishedDate);
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    
    
    // to format the Exam time from endpoint
    
    const publishedTimeParts = data.publishedTime.split(":");
    const hours = parseInt(publishedTimeParts[0]);
    const minutes = parseInt(publishedTimeParts[1]);
    
    let period = "AM";
    if (hours >= 12) {
      period = "PM";
    }
    if (hours > 12) {
      hours -= 12;
    }
    const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;

  }    


  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`${server}/api/student/exams/upcomming/${id}`, {
        headers: {
          Authorization : `Bearer ${accessToken}`
        }
      }).then((res) => {
        setData(res.data)
      }).catch((error) => {
        console.log(error.message)
      })
    }
    fetchData()
  }, [])
  

  return (
    <React.Fragment>
      {/* {data !== null ?  */}
      <>
      <Navbar
        showhomeNavbarBtn={true}
      />
      <div className="upcoming-page" style={{direction : direction}}>
        <div className="container">
          <div className="content">
            <div className="left">
                <h1 className="gradient-text">{lang === 'ar' ? 'امتحان قادم' :'Upcoming Exam'}</h1>
              <p>{lang === 'ar' ? 'كن مستعدا لهذا الامتحان القادم' :'Be ready to this upcoming exam'} <br />{lang === 'ar' ? 'حدد مُعلمك موعدا ...' :'Your teacher set a date...'} </p>
              <div className="upcomingexam-date gradient-border">
                <p><span>{formattedDate || '11/8/2023'}</span> | <span>{formattedTime || '2:00'}</span></p>
              </div>
              <a href='/athena-homepage'>
                <button className="submitBtn special">{lang === 'ar' ? 'العوده للصفحه الرئيسيه' : 'Back To Home'}</button>
              </a>
            </div>
            <div className="right">
              <img src={comingexamImag} alt="coming exam Imag" loading='lazy'/>
            </div>
          </div>
        </div>
      <SignupFooter img={FooterIcon}/>
        </div>
      </>
        :
        {/* null
      // <Loading />
    } */}
    </React.Fragment>
  )
}

export default UpComingExam
