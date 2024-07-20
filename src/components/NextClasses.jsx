import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment/moment';
import '../styles/css/nextClasses/nextClasses.css';
import { AppContext } from '../contexts/AppContext';
import i18next from 'i18next';
import 'moment/locale/ar';

function NextClasses(props) {
  const [dayNum, setDayNum] = useState();
  const [yearNum, setYearNum] = useState();
  const [CurrMonth, setCurrMonth] = useState();
  const [CurrDay, setCurrDay] = useState();
  const [currTime, setCurrTime] = useState();
  const [daySelected, setDaySelected] = useState(null);
  const [data, setData] = useState(null);
  const { lang , server } = useContext(AppContext);

  useEffect(() => {
    if (props.classes) {
      setData(Object.entries(props.classes));
      setDaySelected('today');
    }
    moment.locale(lang);
    setDayNum(moment().format("D"));
    setYearNum(moment().format("YYYY"));
    setCurrMonth(moment().format('MMMM'));
    setCurrDay(moment().format('dddd'));
    setInterval(() => setCurrTime(moment().format('h:mm a')), 1000);

    if (window.localStorage.getItem('theme') === 'dark') {
      document.documentElement.style.setProperty('--athenahome-image-box-shadow', '0px 0px 6px 1px rgba(78, 167, 255, 0.3)');
      document.documentElement.style.setProperty('--athenahome-code-background', '#001C37');
    } else {
      document.documentElement.style.setProperty('--athenahome-image-box-shadow', '5px 5px 22px 1px rgba(78, 167, 255, 0.3)');
    }

    if (lang === 'ar') {
      document.documentElement.style.setProperty('--positionImg-right-image', 'unset');
      document.documentElement.style.setProperty('--positionImg-left-image', '0');
    }
  }, [lang, props.classes]);

  // console.log(data)

  i18next.init({
    lng: 'en',
    // debug: true,
    resources: {
      en: {
        translation: {
          'h1': 'Your Next Class',
          'h2' : 'Schedule',
          'dateHead' : 'Date & Time',
          'h4' : 'There are no classes on this day'
        }
      }, 
      ar: {
        translation: {
          'h1': 'الحصص الدراسية الآتية',
          'h2' : 'الجدول' ,
          'dateHead' : 'التاريخ والوقت',
          'h4' : 'لا توجد دروس في هذا اليوم'
        }
      }
    }
  });

  return (
    <React.Fragment>
      {data !== null ? (
        <div className="next-classes">
          <div className="left-classes">
            <div className="head">
              <h1>{i18next.t('h1' , {lng : lang})}</h1>
              <div className="days">
                  <h2
                    onClick={() => setDaySelected('yesterday')}
                    className={'yesterday' === daySelected ? 'active' : ''}
                  >
                    {lang === 'ar' ? 'البارحه' : 'yesterday'}
                  </h2>
                  <h2
                    onClick={() => setDaySelected('today')}
                    className={'today' === daySelected ? 'active' : ''}
                  >
                    {lang === 'ar' ? 'اليوم' : 'today'}
                  </h2>
                  <h2
                    onClick={() => setDaySelected('tomorrow')}
                    className={'tomorrow' === daySelected ? 'active' : ''}
                  >
                    {lang === 'ar' ? 'غداً' : 'tomorrow'}
                  </h2>
                <h2>{i18next.t('h2' , {lng : lang})}</h2>
              </div>
            </div>
            <div className="left">
              {/* {console.log(data.filter((f) => f[0] === daySelected))} */}
              {
                data.filter((f) => f[0] === daySelected)
                  .map((p) => (
                    <> {/* Use p[0] as the key */}
                      {/* {console.log(p[1])} */}
                      {p[1]?.length === 0
                      ?
                        <h4 key={`${p[1][0]}`}>{i18next.t('h4', { lng: lang })}</h4>
                        :
                        <div key={`${p[1][0]}`} className={`classes class ${p[1][0].course}`} style={p[1]?.length === 0 ? { display: 'none' } : { display: 'initial' }}>
                          <div className="text">
                            <h3>{p[1][0].course}</h3>
                            <p>{p[1][0].time}</p>
                          </div>
                          <div className="text teacherName">
                            <h3>Teacher</h3>
                            <p>{p[1][0].teacher}</p>
                          </div>
                          <div className="image">
                            {p[1][0].image !== '' && <img src={`${server}/${p[1][0].image}`} alt="info" loading='lazy' />}
                          </div>
                        </div>
                        
                      }
                      {/* {p[1]?.length === 0  && (
                        <h4 key={`h4-${p[0]}`}>{i18next.t('h4', { lng: lang })}</h4>
                      )} */}
                    </>
                  ))
              }
            </div>
          </div>
          <div className="right-date" style={{ direction: 'ltr' }}>
            <div className="header">
              <h4>{i18next.t('dateHead', { lng: lang })}</h4>
            </div>
            <div className="date">
              <div className="top">
                <div className="day">
                  <p>{dayNum}</p>
                  <hr />
                  <small>{yearNum}</small>
                </div>
                <div className="week">
                  <div className="today">
                    <p>{CurrDay}</p>
                  </div>
                  <div className="tomorrow">
                    <p>{CurrMonth}</p>
                  </div>
                </div>
              </div>
              <div className="time">
                <div className="icon">
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.4" d="M30 15C30 23.286 23.2845 30 15 30C6.7155 30 0 23.286 0 15C0 6.717 6.7155 0 15 0C23.2845 0 30 6.717 30 15Z" fill="white" />
                    <path d="M20.3605 20.7253C20.164 20.7253 19.966 20.6743 19.7845 20.5678L13.8955 17.0548C13.5565 16.8508 13.348 16.4833 13.348 16.0873V8.51685C13.348 7.89585 13.852 7.39185 14.473 7.39185C15.094 7.39185 15.598 7.89585 15.598 8.51685V15.4483L20.938 18.6328C21.4705 18.9523 21.646 19.6423 21.328 20.1763C21.1165 20.5288 20.743 20.7253 20.3605 20.7253Z" fill="white" />
                  </svg>
                </div>
                <div className="hour">
                  <p>{currTime}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
}

export default NextClasses;
