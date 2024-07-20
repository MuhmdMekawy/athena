import axios from 'axios'
import i18next from 'i18next'
import SignUpNavbar from './SignUpnavbar'
import Footer from '../../components/Footer'
import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../contexts/AppContext'

function CodeDetails() {
  const { lang, loading, setLoading, server, setCookie, errors, setErrors } = useContext(AppContext)
  const animatinCircleStyle = loading === true ? 'atomRotate' : 'unset'

  // translation
  i18next.init({
    lng: 'en',
    // debug: true,
    resources: {
      en: {
        translation: {
          h1: 'Generate your ID Code',
          submitButton: 'Generate',
        },
      },
      ar: {
        translation: {
          h1: 'إنشاء كود المعرف الخاص بك',
          submitButton: 'إنشاء',
        },
      },
    },
  })

  useEffect(() => {
    setLoading(false)
  }, [])

  const handleSignUp = async (event) => {
    event.preventDefault()
    setLoading(true)
    const storage = window.sessionStorage
    const encrypted_image = JSON.parse(storage.getItem('athena_student_encrypted_image'))
    const personal_details = JSON.parse(storage.getItem('athena_student_personal_details'))
    const parents_details = JSON.parse(storage.getItem('athena_student_parents_details'))
    const education_details = JSON.parse(storage.getItem('athena_student_education_details'))
    const contact_details = JSON.parse(storage.getItem('athena_student_contact_details'))
    const account_details = JSON.parse(storage.getItem('athena_student_account_details'))
    try {
      await axios
        .post(`${server}/api/student/students`, {
          createUser: {
            firstName: personal_details.firstName,
            middleName: personal_details.middleName,
            lastName: personal_details.lastName,
            gender: personal_details.gender,
            email: contact_details.email,
            userName: account_details.userName,
            password: account_details.password,
            confirmPassword: account_details.confirmPassword,
            phoneNumber: contact_details.phoneNumber,
          },
          image: {
            data: encrypted_image.image,
            extension: encrypted_image.extension,
          },
          address: personal_details.address,
          birthDay: new Date(personal_details.birthDay).toISOString(),
          parentName: parents_details.parentName,
          parentJob: parents_details.parentJob,
          parentPhone: parents_details.parentPhone,
          homePhone: contact_details.homePhone,
          school: education_details.school,
          levelClassificationId: education_details.levelClassificationId,
        })
        .then((res) => {
          setLoading(false)
          setErrors('')
          setCookie('studentCode', res.data.code, '2023-07-11T01:53:34Z')
          storage.removeItem('athena_student_encrypted_image')
          storage.removeItem('athena_student_personal_details')
          storage.removeItem('athena_student_parents_details')
          storage.removeItem('athena_student_education_details')
          storage.removeItem('athena_student_contact_details')
          storage.removeItem('athena_student_account_details')
          window.location.assign('/finishsignup')
        })
    } catch (error) {
      setLoading(false)
      setErrors(
        lang === 'ar'
          ? 'حدث خطأ ما يرجي المحاوله لاحقا'
          : 'something went wrong , please try again',
      )
    }
  }

  return (
    <React.Fragment>
      <div className="codeDetails">
        <div className="container">
          <SignUpNavbar showBtn={true} />
          <div className="content">
            {errors.length === 0 ? null : <div className="alert alert-danger">{errors}</div>}
            <h1>{i18next.t('h1', { lng: lang })}</h1>
            <div className="icon">
              <svg
                style={{ animationName: animatinCircleStyle }}
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 22.0866C15.7192 22.0866 15.4446 22.1699 15.2111 22.3259C14.9776 22.4819 14.7956 22.7037 14.6881 22.9632C14.5806 23.2227 14.5525 23.5082 14.6073 23.7836C14.6621 24.0591 14.7973 24.3121 14.9959 24.5107C15.1945 24.7093 15.4475 24.8445 15.723 24.8993C15.9984 24.9541 16.2839 24.926 16.5434 24.8185C16.8029 24.711 17.0247 24.529 17.1807 24.2955C17.3367 24.062 17.42 23.7874 17.42 23.5066C17.42 23.13 17.2704 22.7688 17.0041 22.5025C16.7378 22.2362 16.3766 22.0866 16 22.0866ZM16 26.2866C15.0275 26.2894 14.0884 26.6417 13.3541 27.2794C12.6197 27.917 12.1392 28.7974 12 29.7599C14.6112 30.5292 17.3888 30.5292 20 29.7599C19.8608 28.7974 19.3803 27.917 18.6459 27.2794C17.9116 26.6417 16.9725 26.2894 16 26.2866Z"
                  strokeWidth="0.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.6933 22.7267C11.4776 22.7267 12.1133 22.0909 12.1133 21.3067C12.1133 20.5224 11.4776 19.8867 10.6933 19.8867C9.90907 19.8867 9.27332 20.5224 9.27332 21.3067C9.27332 22.0909 9.90907 22.7267 10.6933 22.7267Z"
                  strokeWidth="0.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.72666 23.2733C8.04145 22.5805 7.12689 22.1616 6.1547 22.0953C5.18252 22.029 4.21957 22.3199 3.44666 22.9133C4.75927 25.286 6.71399 27.2407 9.08666 28.5533C9.68009 27.7804 9.97096 26.8175 9.90468 25.8453C9.83839 24.8731 9.4195 23.9585 8.72666 23.2733Z"
                  strokeWidth="0.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.49337 17.42C9.27762 17.42 9.91338 16.7843 9.91338 16C9.91338 15.2158 9.27762 14.58 8.49337 14.58C7.70912 14.58 7.07336 15.2158 7.07336 16C7.07336 16.7843 7.70912 17.42 8.49337 17.42Z"
                  strokeWidth="0.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.71329 16C5.7105 15.0275 5.35814 14.0884 4.72051 13.3541C4.08287 12.6197 3.20248 12.1392 2.23996 12C1.47063 14.6112 1.47063 17.3888 2.23996 20C3.20248 19.8608 4.08287 19.3803 4.72051 18.6459C5.35814 17.9116 5.7105 16.9725 5.71329 16Z"
                  strokeWidth="0.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.6933 12.1134C11.4776 12.1134 12.1133 11.4776 12.1133 10.6934C12.1133 9.90912 11.4776 9.27336 10.6933 9.27336C9.90907 9.27336 9.27332 9.90912 9.27332 10.6934C9.27332 11.4776 9.90907 12.1134 10.6933 12.1134Z"
                  strokeWidth="0.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.72664 8.72666C9.41948 8.04145 9.83837 7.12689 9.90465 6.15471C9.97094 5.18252 9.68006 4.21957 9.08664 3.44666C6.71397 4.75927 4.75926 6.71399 3.44666 9.08666C4.21956 9.68008 5.18251 9.97096 6.15469 9.90467C7.12688 9.83839 8.04143 9.4195 8.72664 8.72666ZM16 7.07332C15.7178 7.07201 15.4416 7.15439 15.2062 7.31006C14.9709 7.46573 14.787 7.68769 14.6778 7.94787C14.5686 8.20805 14.539 8.49477 14.5928 8.77177C14.6465 9.04877 14.7812 9.3036 14.9798 9.50406C15.1784 9.70451 15.4319 9.84157 15.7084 9.89791C15.9849 9.95425 16.2719 9.92734 16.5331 9.82058C16.7943 9.71382 17.0179 9.53201 17.1758 9.29813C17.3337 9.06426 17.4186 8.78882 17.4199 8.50666C17.4217 8.31906 17.3863 8.13298 17.3157 7.95915C17.2451 7.78533 17.1408 7.62721 17.0088 7.49394C16.8767 7.36066 16.7196 7.25487 16.5465 7.18268C16.3733 7.11048 16.1876 7.07332 16 7.07332ZM16 5.71999C16.9742 5.71975 17.9156 5.36743 18.6507 4.72794C19.3857 4.08845 19.8649 3.20488 19.9999 2.23999C17.3888 1.47066 14.6111 1.47066 12 2.23999C12.135 3.20488 12.6142 4.08845 13.3492 4.72794C14.0843 5.36743 15.0257 5.71975 16 5.71999Z"
                  strokeWidth="0.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21.3 12.1134C22.0843 12.1134 22.72 11.4776 22.72 10.6934C22.72 9.90912 22.0843 9.27336 21.3 9.27336C20.5158 9.27336 19.88 9.90912 19.88 10.6934C19.88 11.4776 20.5158 12.1134 21.3 12.1134Z"
                  strokeWidth="0.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M23.2733 8.72668C23.9586 9.41952 24.8731 9.83841 25.8453 9.90469C26.8175 9.97098 27.7804 9.6801 28.5534 9.08668C27.2407 6.714 25.286 4.75928 22.9133 3.44667C22.3199 4.21958 22.029 5.18253 22.0953 6.15472C22.1616 7.12691 22.5805 8.04147 23.2733 8.72668Z"
                  strokeWidth="0.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M23.5066 17.42C24.2908 17.42 24.9266 16.7843 24.9266 16C24.9266 15.2158 24.2908 14.58 23.5066 14.58C22.7223 14.58 22.0865 15.2158 22.0865 16C22.0865 16.7843 22.7223 17.42 23.5066 17.42Z"
                  strokeWidth="0.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M29.7599 12C28.699 12 27.6816 12.4214 26.9315 13.1716C26.1813 13.9217 25.7599 14.9391 25.7599 16C25.7599 17.0609 26.1813 18.0783 26.9315 18.8284C27.6816 19.5786 28.699 20 29.7599 20C30.5292 17.3888 30.5292 14.6112 29.7599 12Z"
                  strokeWidth="0.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21.3 22.7267C22.0843 22.7267 22.72 22.0909 22.72 21.3067C22.72 20.5224 22.0843 19.8867 21.3 19.8867C20.5158 19.8867 19.88 20.5224 19.88 21.3067C19.88 22.0909 20.5158 22.7267 21.3 22.7267Z"
                  strokeWidth="0.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M23.2733 23.2733C22.5805 23.9585 22.1616 24.8731 22.0953 25.8453C22.029 26.8175 22.3199 27.7804 22.9133 28.5533C25.286 27.2407 27.2407 25.286 28.5534 22.9133C27.7804 22.3199 26.8175 22.029 25.8453 22.0953C24.8731 22.1616 23.9586 22.5805 23.2733 23.2733Z"
                  strokeWidth="0.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <button type="submit" onClick={(s) => handleSignUp(s)} className="submitBtn">
              {i18next.t('submitButton', { lng: lang })}
            </button>
          </div>
          <Footer />
        </div>
      </div>
    </React.Fragment>
  )
}

export default CodeDetails
