import React, { useContext, useEffect, useState } from 'react';
import teacher from '../images/اينشتاين.png';
import '../styles/css/upcoming exams/upcoming exams.css';
import { AppContext } from '../contexts/AppContext';
import i18next from 'i18next';

function UpcomingExams(props) {
  const [data, setData] = useState(null);
  
  const {
    lang, server 
  } = useContext(AppContext);

  useEffect(() => {
    if (props.exams) {
      setData(props.exams);
    }
    if (lang === "ar") {
      document.documentElement.style.setProperty('--position-left-image', '0');
      document.documentElement.style.setProperty('--position-right-image', 'unset');
    } else {
      document.documentElement.style.setProperty('--position-left-image', 'unset');
      document.documentElement.style.setProperty('--position-right-image', '-20px');
    }
    if (window.localStorage.getItem('theme') === "dark") {
      document.documentElement.style.setProperty('--background-corrected-exam', '#4ea7ff21');
    }
  }, [lang , props.exams]);

    
  i18next.init({
    lng: 'en',
    // debug: true,
    resources: {
      en: {
        translation: {
          'h1': 'Upcoming Exams',
          'tab': 'All Exams',
          'h4' : 'There are no exams'
        }
      }, 
      ar: {
        translation: {
          'h1': 'الامتحانات القادمة',
          'tab': 'جميع الامتحانات',
          'h4' : 'لا توجد امتحانات قادمه'
        }
      }
    }
  });

  // console.log(data)

  return (
    <>
      <div className="upcoming-exams">
        <div className="specialHeader">
          <h1>{i18next.t('h1' , {lng : `${lang}`})}</h1>
          <div className="tabs">
            <div className="tab">
              <a href='/exam-homepage'><h2>{i18next.t('tab' , {lng : `${lang}`})}</h2></a>
            </div>
          </div>
        </div>
        {data !== null &&  data?.length !== 0 ? 
          <>
              <div className="allExams exam ">
                <div className="content">
            {data.map((p, index) => (
                  <a href={`/upcoming-exam/${p.id}`} className={`cont ${p.state}`}>
                    <div className="text">
                      <h3>{p.exam}</h3>
                      <div className="icon">
                        {/* <img src={upcomingCircle} alt="upcoming node" loading='lazy' /> */}
                        <div className="circle"></div>
                        <div className="status">
                          <h4>{p.state}</h4>
                        </div>
                      </div>
                      <div className="teacher">
                        <div className="img">
                          <img src={`${server}/${p.image}`} alt="" loading='lazy'/>
                        </div>
                        <div className="name">
                          <h5>Exam Author</h5>
                          <h6>{p.teacher}</h6>
                        </div>
                      </div>
                    </div>
                    <div className="image">
                      <img src={teacher} alt="teacher icon" loading='lazy'/>
                    </div>
                  </a>
                ))}
                </div>
              </div>
          </>
        : <h4>{i18next.t('h4' , {lng : `${lang}`})}</h4>}
      </div>
    </>
  );
}

export default UpcomingExams;
