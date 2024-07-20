import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/css/explore teachers/explore teachers.css'
import avatar from '../images/info.png'
import { AppContext } from '../contexts/AppContext'
import i18next from 'i18next'

function ExploreTeachers(props) {
  const [data , setData] = useState()
  const {server , lang} = useContext(AppContext)
  // console.log(props.teachers)
  i18next.init({
    lng: 'en',
    // debug: true,
    resources: {
      en: {
        translation: {
          'h1': 'Explore New Teachers',
          'tab': 'My Teachers',
          'explore-link': 'There are no exams',
          'explore-link-1' : 'Explore',
          'explore-link-2' : 'More'
        }
      }, 
      ar: {
        translation: {
          'h1': 'اكتشف مُعلمين جدد',
          'tab': 'معُلميني',
          'explore-link-1' : 'أكتشف',
          'explore-link-2' : 'المزيد'
        }
      }
    }
  });
  useEffect(() => {
    setData(props.teachers)
  }, [props.teachers])
  return (
    <React.Fragment>
      {data !== undefined ? 
        <div className="explore-teachers">
          {/* {data.map((p)=>console.log(p))} */}
          <div className="specialHeader">
            <h1>{i18next.t('h1' , {lng : lang})}</h1>
            <div className="tabs">
              <div className="tab">
                <a href='#'><h2>{i18next.t('tab' , {lng : lang})}</h2></a>
              </div>
            </div>
          </div>
          <div className="content">
            {data.map((p) => (
              <a href={`/teacher-profile/${p.id}`} key={p.id} className="cont">
                <div className="image">                
                  <img src={p.image ? `${server}/${p.image}` : avatar} alt="avatar" loading='lazy'/>
                </div>
                <div className="text">
                  <h4>Teacher</h4>
                  <h5>{p.name.split(' ')[0]} <br /> {p.name.split(' ')[1]}</h5>
                  {/* <h5>{p.name}</h5> */}
                </div>
              </a>
            ))}
            {/* <div className="cont">
              <div className="image">
                <img src={avatar} alt="avatar" loading='lazy'/>
              </div>
              <div className="text">
                <h4>Teacher</h4>
                <h5>René <br /> Descartes</h5>
              </div>
            </div>
            <div className="cont">
              <div className="image">
                <img src={avatar} alt="avatar" loading='lazy'/>
              </div>
              <div className="text">
                <h4>Teacher</h4>
                <h5>René <br /> Descartes</h5>
              </div>
            </div>
            <div className="cont">
              <div className="image">
                <img src={avatar} alt="avatar" loading='lazy'/>
              </div>
              <div className="text">
                <h4>Teacher</h4>
                <h5>René <br /> Descartes</h5>
              </div>
            </div>
            <div className="cont">
              <div className="image">
                <img src={avatar} alt="avatar" loading='lazy'/>
              </div>
              <div className="text">
                <h4>Teacher</h4>
                <h5>René <br /> Descartes</h5>
              </div>
            </div>
            <div className="cont">
              <div className="image">
                <img src={avatar} alt="avatar" loading='lazy'/>
              </div>
              <div className="text">
                <h4>Teacher</h4>
                <h5>René <br /> Descartes</h5>
              </div>
            </div> */}
            <div className="cont explore">
              <a href='#'><h1>{i18next.t('explore-link-1' , {lng : lang})} <br /> {i18next.t('explore-link-2' , {lng : lang})}</h1></a>
            </div>
          </div>
        </div>
        : null}
        
    </React.Fragment>
  )
}

export default ExploreTeachers
