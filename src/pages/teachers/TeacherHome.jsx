import React, { useEffect , useState , useContext} from 'react'
import Navbar from '../../components/Navbar'
import avatar from '../../images/info.png'
import { Link } from 'react-router-dom'
import '../../styles/css/teachers/teacherHome.css'
import Footer from '../../components/Footer'
import ExploreTeachers from '../../components/ExploreTeachers'
import { AppContext } from '../../contexts/AppContext'
import i18next from 'i18next'
import axios from 'axios'
import Loading from '../../components/Loading'
import { useAuth } from '../../contexts/AuthContext'

function TeacherHome() {
  const { lang, direction, server , getCookie  , loading , setLoading , errors , setErrors} = useContext(AppContext)
  const [myTeachers, setMyTeachers] = useState(null)
  const [exploreTeachers, setExploreTeachers] = useState(null)
  const {accessToken} = useAuth()
  i18next.init({
    lng: 'en',
    // debug: true,
    resources: {
      en: {
        translation: {
          'head-exam-h1' : 'Teachers' ,
          'head-exam-input': 'Looking for a specific Exam ?',
          'special-header-h1': 'My Teachers List',
          'button-outline-1' : 'Outline',
          'button-outline-2' : 'Mode',
        }
      }, 
      ar: {
        translation: {
          'head-exam-h1' : 'المُعلمين' ,
          'head-exam-input': 'هل تبحث عن مُعلم تعرفه ؟',
          'special-header-h1': 'مُعلميني',
          'button-outline-1' : 'المخطط',
          'button-outline-2' : 'التفصيلي',
        }
      }
    }
  });
  useEffect(() => {
    const token = getCookie('token')
    const fetchData = async () => {
      setLoading(true)
      await axios.get(`${server}/api/student/teachers`, {
        headers: {
          Authorization : `Bearer ${accessToken}`
        }
      }).then((res) => {
        setMyTeachers(res.data.assignedTeachers)
        setExploreTeachers(res.data.exploreTeachers)
        setLoading(false)
        console.log('fetch data is done')
      }).catch((error) => {
        setLoading(false)
        setErrors(lang === 'ar' ? 'حدث خطأ ما يرجي المحاوله لاحقا' : 'something went wrong ,please try again')
      })
    }
    fetchData()
  }, [])
  return (
    <React.Fragment>
      {errors && (
        <div className="alert alert-danger">{errors}</div>
      )}
      {loading && (
        <Loading />
      )}
      <div className="teachers-home" style={{direction : direction}}>
        <Navbar showhomeNavbarBtn={true}/>
        <div className="container">
          <div className="head-exam">
            <div className="text">
              <h1>{i18next.t('head-exam-h1' , {lng : lang})}</h1>
            </div>
            <div className="input">
              <input type="text" id='search for exam' placeholder={i18next.t('head-exam-input' , {lng : lang})} />
              <label htmlFor="search for exam" style={lang === 'ar' ? {right : '10px'} : {}}>
                <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.0208 18.0833H19.0004L18.6388 17.7346C19.9483 16.2156 20.6681 14.2764 20.6667 12.2708C20.6667 10.6103 20.1743 8.98705 19.2517 7.60636C18.3292 6.22567 17.0179 5.14956 15.4838 4.5141C13.9496 3.87864 12.2615 3.71237 10.6329 4.03633C9.00426 4.36028 7.50826 5.15991 6.33409 6.33409C5.15991 7.50826 4.36028 9.00426 4.03633 10.6329C3.71237 12.2615 3.87864 13.9496 4.5141 15.4838C5.14956 17.0179 6.22567 18.3292 7.60636 19.2517C8.98705 20.1743 10.6103 20.6667 12.2708 20.6667C14.3504 20.6667 16.2621 19.9046 17.7346 18.6388L18.0833 19.0004V20.0208L24.5417 26.4663L26.4663 24.5417L20.0208 18.0833ZM12.2708 18.0833C9.05459 18.0833 6.45834 15.4871 6.45834 12.2708C6.45834 9.05459 9.05459 6.45834 12.2708 6.45834C15.4871 6.45834 18.0833 9.05459 18.0833 12.2708C18.0833 15.4871 15.4871 18.0833 12.2708 18.0833Z" fill="url(#paint0_linear_4954_2618)"/>
                <defs>
                <linearGradient id="paint0_linear_4954_2618" x1="3.875" y1="15.1706" x2="26.4661" y2="15.2278" gradientUnits="userSpaceOnUse">
                <stop stopColor="#33F3FF"/>
                <stop offset="0.494792" stopColor="#8987FF"/>
                <stop offset="1" stopColor="#B843FF"/>
                </linearGradient>
                </defs>
                </svg>
              </label>
            </div>
          </div>
          <div className="explore-teachers">
            <div className="specialHeader">
              <h1>{i18next.t('special-header-h1' , {lng : lang})}</h1>
            </div>
            <div className="content">
              {myTeachers !== null && (
                myTeachers.map((p) => {
                  <a href={`/teacher-profile/${p.id}`} className="cont">
                    <div className="image">
                      <img src={p.image !== '' ? p.image : avatar} alt="avatar" loading='lazy'/>
                    </div>
                    <div className="text">
                      <h4>Teacher</h4>
                      <h5>{p.name.split(' ')[0]} <br /> {p.name.split(' ')[1]}</h5>
                    </div>
                  </a>
                })
              )}
              <div className="cont outline">
                <a href='#'><h1>{i18next.t('button-outline-1' , {lng : lang})} <br /> {i18next.t('button-outline-2' , {lng : lang})}</h1></a>
              </div>
            </div>
          </div>
          {/* <ExploreTeachers  teachers={exploreTeachers}/> */}
        </div>
      </div>
        <Footer />
    </React.Fragment>
  )
}

export default TeacherHome
