import i18next from 'i18next'
import maleIcon from '../../images/Component 197.png'
import { AppContext } from '../../contexts/AppContext'
import femaleIcon from '../../images/Component 198.png'
import React, { useContext, useState, useEffect } from 'react'

function PersonalDetails() {
  const [fName, setFName] = useState('')
  const [lName, setLName] = useState('')
  const [mName, setMName] = useState('')
  const [gender, setGender] = useState('')
  const [birthday, setBirthday] = useState('')
  const [address, setAddress] = useState('')
  const { lang, direction, errors, setErrors } = useContext(AppContext)

  // translation
  i18next.init({
    lng: 'en',
    // debug: true,
    resources: {
      en: {
        translation: {
          h1: 'Personal Details',
          fname: 'First Name',
          'fname-Placeholder': "What 's your First Name ?",
          lname: 'Last Name',
          'lname-Placeholder': "What 's your Last Name ?",
          mname: 'Middle Name',
          'mname-Placeholder': "What 's your Middle Name ?",
          genderLabel: 'Your Gender',
          dateLabel: 'Date of Birth',
          dateLabelPlaceholder: "What 's your Date of Birth ?",
          addressLabel: 'Full Address',
          addressLabelPlaceholder: "What's your Full Address ?",
          submitBtn: 'Next Step',
        },
      },
      ar: {
        translation: {
          h1: 'المعلومات الشخصية',
          fname: 'الأسم الأول',
          'fname-Placeholder': 'ما هو أسمك الأول ؟',
          lname: 'الأسم الأخير',
          'lname-Placeholder': 'ما هو لقبك ؟',
          mname: 'الأسم الأوسط',
          'mname-Placeholder': 'ما هو أسمك الأوسط ؟',
          genderLabel: 'جنسك',
          dateLabel: 'تاريخ الميلاد',
          dateLabelPlaceholder: 'ما هو تاريخ ميلادك ؟',
          addressLabel: 'العنوان بالكامل',
          addressLabelPlaceholder: 'ما هو عنوانك بالكامل ؟',
          submitBtn: 'الخطوة التالية',
        },
      },
    },
  })

  useEffect(() => {
    if (window !== undefined && sessionStorage.getItem('athena_student_personal_details')) {
      const data = JSON.parse(sessionStorage.getItem('athena_student_personal_details'))
      setFName(data.firstName)
      setLName(data.lastName)
      setMName(data.middleName)
      setGender(data.gender)
      setBirthday(data.birthDay)
      setAddress(data.address)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (
      fName.length !== 0 &&
      lName.length !== 0 &&
      mName.length !== 0 &&
      gender.length !== 0 &&
      birthday.length !== 0 &&
      address.length !== 0
    ) {
      const data = {
        firstName: fName,
        middleName: mName,
        lastName: lName,
        gender: gender,
        birthDay: birthday,
        address: address,
      }
      const jsonData = JSON.stringify(data)
      window.sessionStorage.setItem('athena_student_personal_details', jsonData)
      window.location.assign('/signup/parent-details')
    } else {
      setErrors(
        lang === 'ar'
          ? 'يرجي ملئ هذه الحقول بالبيانات لاكمال عمليه التسجيل'
          : 'You have to fill all of this fields with valid information to continue',
      )
    }
  }

  return (
    <React.Fragment>
      <div className="personal-details">
        <h1>{i18next.t('h1', { lng: `${lang}` })}</h1>
        {errors && <div className="alert alert-danger">{errors}</div>}
        <form action="">
          <div className="upper">
            <div className="left">
              <div className="input">
                <label htmlFor="fName">{i18next.t('fname', { lng: `${lang}` })}</label>
                <input
                  style={{ direction: direction }}
                  dir="auto"
                  required
                  id="fName"
                  type="text"
                  value={fName}
                  onChange={(e) => setFName(e.target.value)}
                  placeholder={i18next.t('fname-Placeholder', { lng: `${lang}` })}
                />
              </div>
              <div className="input">
                <label htmlFor="lName">{i18next.t('lname', { lng: `${lang}` })}</label>
                <input
                  style={{ direction: direction }}
                  dir="auto"
                  required
                  id="lName"
                  type="text"
                  value={lName}
                  onChange={(e) => setLName(e.target.value)}
                  placeholder={i18next.t('lname-Placeholder', { lng: `${lang}` })}
                />
              </div>
              <div className="input">
                <label htmlFor="mName">{i18next.t('mname', { lng: `${lang}` })}</label>
                <input
                  style={{ direction: direction }}
                  dir="auto"
                  required
                  id="mName"
                  type="text"
                  value={mName}
                  onChange={(e) => setMName(e.target.value)}
                  placeholder={i18next.t('mname-Placeholder', { lng: `${lang}` })}
                />
              </div>
            </div>
            <div className="right">
              <div className="input">
                <div className="top">
                  <label>{i18next.t('genderLabel', { lng: `${lang}` })}</label>
                </div>
                <div className="genders">
                  <input
                    style={{ direction: direction }}
                    dir="auto"
                    required
                    onChange={(e) => setGender(e.target.value)}
                    hidden
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                  />
                  <label htmlFor="male">
                    <img src={maleIcon} alt="male Icon" loading="lazy" />
                  </label>
                  <input
                    style={{ direction: direction }}
                    dir="auto"
                    required
                    onChange={(e) => setGender(e.target.value)}
                    hidden
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                  />
                  <label htmlFor="female">
                    <img src={femaleIcon} alt="female Icon" loading="lazy" />
                  </label>
                </div>
              </div>
              <div className="input">
                <label htmlFor="birth">{i18next.t('dateLabel', { lng: `${lang}` })}</label>
                <input
                  style={{ direction: direction }}
                  dir="auto"
                  required
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  type="date"
                  id="birth"
                  placeholder={i18next.t('dateLabelPlaceholder', { lng: `${lang}` })}
                />
              </div>
              <div className="input">
                <label htmlFor="address">{i18next.t('addressLabel', { lng: `${lang}` })}</label>
                <input
                  style={{ direction: direction }}
                  dir="auto"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  id="address"
                  placeholder={i18next.t('addressLabelPlaceholder', { lng: `${lang}` })}
                />
              </div>
            </div>
          </div>
          <button type="submit" className="submitBtn" onClick={(s) => handleSubmit(s)}>
            {i18next.t('submitBtn', { lng: `${lang}` })}
          </button>
        </form>
      </div>
    </React.Fragment>
  )
}

export default PersonalDetails
