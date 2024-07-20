import i18next from 'i18next'
import { AppContext } from '../../contexts/AppContext'
import React, { useContext, useState, useEffect } from 'react'

function ContactDetails() {
  const [email, setEmail] = useState('')
  const [homePhone, setHomePhone] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const { lang, direction, errors, setErrors } = useContext(AppContext)

  // translation
  i18next.init({
    lng: 'en',
    // debug: true,
    resources: {
      en: {
        translation: {
          h1: 'Contact Details',
          'Email Address': 'Email Address',
          'Email AddressPlaceHolder': "What's your Email Address ?",
          'Phone Number': 'Phone Number',
          'Phone NumberPlaceHolder': "What's your Phone Number?",
          'Home Phone Number': 'Home Phone Number',
          'Home Phone NumberPlaceHolder': "What's your Home Number ?",
          submitBtn: 'Next Step',
        },
      },
      ar: {
        translation: {
          h1: 'معلومات الإتصال',
          'Email Address': 'البريد الإلكتروني',
          'Email AddressPlaceHolder': 'ما هو بريدك الإلكتروني ؟',
          'Phone Number': 'رقم الهاتف',
          'Phone NumberPlaceHolder': 'ما هو رقم هاتفك ؟ ',
          'Home Phone Number': 'رقم هاتف المنزل',
          'Home Phone NumberPlaceHolder': 'ما هو رقم هاتف المنزل الخاص بك ؟ ',
          submitBtn: 'الخطوة التالية',
        },
      },
    },
  })

  useEffect(() => {
    if (window !== undefined && sessionStorage.getItem('athena_student_contact_details')) {
      const data = JSON.parse(sessionStorage.getItem('athena_student_contact_details'))
      setEmail(data.email)
      setHomePhone(data.homePhone)
      setPhoneNumber(data.phoneNumber)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email.length >= 3 && phoneNumber.length === 11 && homePhone.length === 7) {
      const data = {
        email: email,
        homePhone: homePhone,
        phoneNumber: phoneNumber,
      }
      const jsonData = JSON.stringify(data)
      window.sessionStorage.setItem('athena_student_contact_details', jsonData)
      window.location.assign('/signup/account-details')
    } else if (email.length === 0 || phoneNumber.length === 0 || homePhone.length === 0) {
      setErrors(
        lang === 'ar'
          ? 'يرجي ملئ هذه الحقول بالبيانات لاكمال عمليه التسجيل'
          : 'You have to fill all of this fields with valid information to continue',
      )
    } else if (phoneNumber.length === 0) {
      setErrors(
        lang === 'ar'
          ? 'يرجي ادخال رقم الهاتف الخاص بك لاكمال عمليه التسجيل'
          : 'You have to enter your phone number to continue',
      )
    } else if (homePhone.length === 0) {
      setErrors(
        lang === 'ar'
          ? 'يرجي ادخال رقم الهاتف المنزلي لاكمال عمليه التسجيل'
          : 'You have to enter your homephone number to continue',
      )
    } else if (phoneNumber.length !== 11 || !phoneNumber.startsWith(0)) {
      setErrors(
        lang === 'ar'
          ? 'أنت أدخلت رقم هاتف خاطئ يرجي التحقق واعاده المحاوله'
          : 'you entered wrong phone number , please try again',
      )
    } else if (homePhone.length !== 7) {
      setErrors(
        lang === 'ar'
          ? 'أنت أدخلت رقم هاتف منزلي خاطئ يرجي التحقق واعاده المحاوله'
          : 'You entered wrong homephone number ,please try again',
      )
    }
  }

  return (
    <React.Fragment>
      <div className="contactDetails">
        <div className="container">
          <h1>{i18next.t('h1', { lng: lang })}</h1>
          {errors && <div className="alert alert-danger">{errors}</div>}
          <form action="">
            <div className="input">
              <label htmlFor="Email Address">{i18next.t('Email Address', { lng: lang })}</label>
              <input
                style={{ direction: direction }}
                required
                dir="auto"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                id="Email Address"
                placeholder={i18next.t('Email AddressPlaceHolder', { lng: lang })}
              />
            </div>
            <div className="input">
              <label htmlFor="Phone Number">{i18next.t('Phone Number', { lng: lang })}</label>
              <input
                style={{ direction: direction }}
                dir="auto"
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.currentTarget.value)}
                id="Phone Number"
                placeholder={i18next.t('Phone NumberPlaceHolder', { lng: lang })}
              />
            </div>
            <div className="input">
              <label htmlFor="Home Phone Number">
                {i18next.t('Home Phone Number', { lng: lang })}
              </label>
              <input
                style={{ direction: direction }}
                dir="auto"
                type="text"
                value={homePhone}
                onChange={(e) => setHomePhone(e.currentTarget.value)}
                id="Home Phone Number"
                placeholder={i18next.t('Home Phone NumberPlaceHolder', { lng: lang })}
              />
            </div>
            <button type="submit" onClick={(e) => handleSubmit(e)} className="submitBtn">
              {i18next.t('submitBtn', { lng: lang })}
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ContactDetails
