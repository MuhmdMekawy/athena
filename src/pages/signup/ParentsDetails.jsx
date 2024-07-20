import i18next from 'i18next'
import { AppContext } from '../../contexts/AppContext'
import React, { useContext, useState, useEffect } from 'react'

function ParentsDetails() {
  const [parentName, setParentName] = useState('')
  const [parentJob, setParentJob] = useState('')
  const [parentPhone, setParentPhone] = useState('')
  const { lang, direction, errors, setErrors } = useContext(AppContext)

  // translation
  i18next.init({
    lng: 'en',
    // debug: true,
    resources: {
      en: {
        translation: {
          h1: 'Parents Details',
          parentName: "Parent's Name",
          parentNamePlaceHolder: "What's your Parent Name ?",
          parentJob: "Parent's Job",
          parentJobPlaceHolder: "What's your Parent Job ?",
          parentPhone: "Parent's Phone Number",
          parentPhonePlaceHolder: "What's your Parent's Phone Number ?",
          submitBtn: 'Next Step',
        },
      },
      ar: {
        translation: {
          h1: 'معلومات ولي الأمر',
          parentName: 'أسم الوالد/الوالدة',
          parentNamePlaceHolder: 'ما هو أسم والدك/والدتك ؟',
          parentJob: 'وظيفة الوالد/الوالدة',
          parentJobPlaceHolder: 'ما هي وظيفة والدك/والدتك ؟',
          parentPhone: 'رقم هاتف والدك/والدتك',
          parentPhonePlaceHolder: 'ما هو رقم هاتف والدك/والدتك ؟',
          submitBtn: 'الخطوة التالية',
        },
      },
    },
  })

  useEffect(() => {
    if (window !== undefined && sessionStorage.getItem('athena_student_parents_details')) {
      const data = JSON.parse(sessionStorage.getItem('athena_student_parents_details'))
      setParentJob(data.parentJob)
      setParentName(data.parentName)
      setParentPhone(data.parentPhone)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      parentName.length !== 0 &&
      parentJob.length !== 0 &&
      parentPhone.length === 11 &&
      parentPhone.startsWith(0)
    ) {
      const data = {
        parentJob: parentJob,
        parentName: parentName,
        parentPhone: parentPhone,
      }
      const jsonData = JSON.stringify(data)
      window.sessionStorage.setItem('athena_student_parents_details', jsonData)
      window.location.assign('/signup/education-details')
    } else if (!parentPhone.startsWith(0) || parentPhone.length !== 11) {
      setErrors(
        lang === 'ar'
          ? 'أنت أدخلت رقم هاتف خاطئ يرجي التحقق واعاده المحاوله'
          : 'you entered wrong phone number , please try again',
      )
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
      <div className="parentsDetails">
        <div className="container">
          <h1>{i18next.t('h1', { lng: lang })}</h1>
          {errors && <div className="alert alert-danger">{errors}</div>}
          <form action="">
            <div className="input">
              <label htmlFor="parentName">{i18next.t('parentName', { lng: lang })}</label>
              <input
                style={{ direction: direction }}
                dir="auto"
                type="text"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                id="parentName"
                placeholder={i18next.t('parentNamePlaceHolder', { lng: lang })}
              />
            </div>
            <div className="input">
              <label htmlFor="parentJob">{i18next.t('parentJob', { lng: lang })}</label>
              <input
                style={{ direction: direction }}
                dir="auto"
                type="text"
                value={parentJob}
                onChange={(e) => setParentJob(e.target.value)}
                id="parentJob"
                placeholder={i18next.t('parentJobPlaceHolder', { lng: lang })}
              />
            </div>
            <div className="input">
              <label htmlFor="parentPhone">{i18next.t('parentPhone', { lng: lang })}</label>
              <input
                style={{ direction: direction }}
                dir="auto"
                type="string"
                value={parentPhone}
                onChange={(e) => setParentPhone(e.target.value)}
                id="parentPhone"
                placeholder={i18next.t('parentPhonePlaceHolder', { lng: lang })}
              />
            </div>
            <button type="submit" onClick={(s) => handleSubmit(s)} className="submitBtn">
              {i18next.t('submitBtn', { lng: lang })}
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ParentsDetails
