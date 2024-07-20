import React, { useEffect, useContext } from 'react'
import "../../styles/css/global styles/style.css"
import "../../../node_modules/bootstrap/dist/css/bootstrap.css"
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Routes , Route, Navigate } from 'react-router-dom';
import Home from '../signup//Home';
import Signup from '../signup/Signup';
import PersonalDetails from '../signup/PersonalDetails';
import ParentsDetails from '../signup/ParentsDetails';
import EducationDetails from '../signup/EducationDetails';
import ContactDetails from '../signup/ContactDetails';
import AccountDetails from '../signup/AccountDetails';
import CodeDetails from '../signup/CodeDetails';
import FinishSignUp from '../signup/FinishSignUp';
import Login from '../Login/Login';
import SignInSendResetCode from '../Login/SignInSendResetCode';
import SignInConfirmCode from '../Login/SignInConfirmCode';
import SigninSetNewPass from '../Login/SigninSetNewPass';
import AthenaHome from '../athena home/AthenaHome';
import ExamHome from '../Exam/ExamHome';
import NotFound from '../Not Found/NotFound';
import Protected from '../../components/Protected';
import UnderReviewExam from '../Exam/UnderReviewExam';
import UpComingExam from '../Exam/upComingExam';
import AnswerBoard from '../Exam/AnswerBoard';
import AnswerResults from '../Exam/AnswerResults';
import TimeTable from '../teachers/TimeTable';
import { AppContext } from '../../contexts/AppContext';
import UnProtected from '../../components/UnProtected';
import TeacherHome from '../teachers/TeacherHome'
import TeacherProfile from '../teachers/TeacherProfile'
import StudentHomePage from '../student/StudentHomePage';
import StudentImageControl from '../student/studentImageControl';
import StdPersonalDetails from '../student/StdPersonalDetails';
import StdParentDetails from '../student/StdParentDetails'
import StdEducation from '../student/StdEducation';
import StdContacts from '../student/StdContacts';
import StdSettings from '../student/StdSettings';
import TakeExamTest from '../Exam/TakeExamTest';


function App() {
  const {lang} = useContext(AppContext)
  
  //backgroung based on theme
  useEffect(() => {
    if (lang === "ar") {
      document.body.style.fontFamily = 'Baloo Bhaijaan 2'
    }if (lang === "en") {
      document.body.style.fontFamily = 'Comfortaa'
    }
    if (window.localStorage.getItem("theme") === "light") {
      document.body.style.backgroundColor = "#fff"
      document.documentElement.style.setProperty('--text-in-light-dark', '#4EA7FF');
    } else {
      document.body.style.backgroundColor = "#001C37" 
      document.documentElement.style.setProperty('--text-in-light-dark', '#fff');
    }
  }, [window.localStorage.getItem("theme")])

  return (
    <React.Fragment>
      <Routes>
        {/* signup routes */}
        <Route path='/home' element={<UnProtected><Home/></UnProtected>}/>
        <Route path="/signup/*" element={<UnProtected ><Signup /></UnProtected>}>
          <Route path="personal-details" element={<PersonalDetails />} />
          <Route path="parent-details" element={<ParentsDetails />} />
          <Route path="education-details" element={<EducationDetails />} />
          <Route path="contact-details" element={<ContactDetails />} />
          <Route path="account-details" element={<AccountDetails />} />
        </Route>
        <Route path='/code-details' element={<UnProtected><CodeDetails /></UnProtected>} />
        <Route path='/finishsignup' element={<UnProtected><FinishSignUp /></UnProtected>} />

        {/* login routes */}
        <Route path='login' element={<UnProtected><Login/></UnProtected>}/>
        <Route path='/sendresetcode' element={<UnProtected><SignInSendResetCode/></UnProtected>} />
        <Route path='/confirmresetcode' element={<UnProtected><SignInConfirmCode/></UnProtected>} />
        <Route path='/setnewpass' element={<UnProtected><SigninSetNewPass /></UnProtected>} />

        {/* Home page */}
        <Route path='/athena-homepage' element={<Protected><AthenaHome /></Protected>} />
        {/* Exam section */}
        <Route path='/exam-homepage' element={<Protected><ExamHome /></Protected>}/>
        <Route path='/upcoming-exam/:id' element={<Protected><UpComingExam /></Protected>} />
        <Route path='/under-review-exam/:id' element={<Protected><UnderReviewExam /></Protected>} />
        <Route path='/answer-board/:id' element={<Protected><AnswerBoard /></Protected>} />
        <Route path='/exam-results/:id' element={<Protected><AnswerResults /></Protected>} />
        <Route path='/test-exam/:id' element={<Protected><TakeExamTest /></Protected>} />
        {/* teachers section*/}
        <Route path='/time-table' element={<Protected><TimeTable /></Protected>} />
        <Route path='/teachers-homepage' element={<Protected><TeacherHome /></Protected>} />
        <Route path='/teacher-profile/:id' element={<Protected><TeacherProfile /></Protected>} />

        {/* student Account */}
        <Route path='/student-homepage' element={<Protected><StudentHomePage /></Protected>} />
        <Route path='/student-control-image' element={<Protected><StudentImageControl /></Protected>} />
        <Route path='/student-control-personal-details' element={<Protected><StdPersonalDetails /></Protected>} />
        <Route path='/student-control-parent-details' element={<Protected><StdParentDetails /></Protected>} />
        <Route path='/student-control-education-details' element={<Protected><StdEducation /></Protected>} />
        <Route path='/student-control-contact-details' element={<Protected><StdContacts /></Protected>} />
        <Route path='/student-control-settings-details' element={<Protected><StdSettings /></Protected>} />
        
        
        {/* error 404 route */}
        <Route path='*' element={<NotFound />} />

        {/* navigate route ' / ' */}
        <Route path='/' element={<Navigate to='/home' />} />
      </Routes>
    </React.Fragment>
  )
}

export default App
