import axios from 'axios'
import i18next from 'i18next'
import Loading from '../../components/Loading'
import { AppContext } from '../../contexts/AppContext'
import React, { useContext, useEffect, useState } from 'react'

function EducationDetails() {
  const [data, setData] = useState(null)
  const [school, setSchool] = useState('')
  const [studentLevel, setStudentLevel] = useState(null)
  const [scientificDevision, setScientificDevision] = useState('')
  const { lang, direction, server, loading, setLoading, errors, setErrors } = useContext(AppContext)

  // translation
  i18next.init({
    lng: 'en',
    // debug: true,
    resources: {
      en: {
        translation: {
          h1: 'Education Details',
          school: 'School',
          schoolPlaceHolder: "What's your School ?",
          studentLevel: 'Study Level',
          studentLevelPlaceHolder: "What's your Study Level ?",
          scientificdevision: 'Scientific Division',
          scientificdevisionPlaceHolder: 'Select your Scientific Division ?',
          submitBtn: 'Next Step',
        },
      },
      ar: {
        translation: {
          h1: 'معلومات التعليم',
          school: 'المدرسة',
          schoolPlaceHolder: 'ما هي مدرستك ؟',
          studentLevel: 'المستوى التعليمي',
          studentLevelPlaceHolder: 'ما هو الصف الدراسي الخاص بك ؟ ',
          scientificdevision: 'الشعبة العلمية',
          scientificdevisionPlaceHolder: 'ما هي الشعبة العلمية الخاصة بك ؟ ',
          submitBtn: 'الخطوة التالية',
        },
      },
    },
  })

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      await axios
        .get(`${server}/api/dashboard/levels`)
        .then((res) => {
          setLoading(false)
          setData(res.data)
        })
        .catch((error) => {
          console.log(error)
          setLoading(false)
        })
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (window !== undefined && sessionStorage.getItem('athena_student_education_details')) {
      const data = JSON.parse(sessionStorage.getItem('athena_student_education_details'))
      setSchool(data.school)
      setStudentLevel(data.studentLevel)
      setScientificDevision(data.levelClassificationId)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(school.length, studentLevel, scientificDevision)
    if (school.length !== 0 && studentLevel !== '' && scientificDevision !== '') {
      const data = {
        school: school,
        studentLevel: studentLevel,
        levelClassificationId: scientificDevision,
      }
      const jsonData = JSON.stringify(data)
      window.sessionStorage.setItem('athena_student_education_details', jsonData)
      window.location.assign('/signup/contact-details')
      setErrors('')
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
      {loading === true ? (
        <Loading />
      ) : data !== null ? (
        <div className="educationDetails">
          <div className="container">
            <h1>{i18next.t('h1', { lng: lang })}</h1>
            {errors && <div className="alert alert-danger">{errors}</div>}
            <form action="">
              <div className="input">
                <label htmlFor="school">{i18next.t('school', { lng: lang })}</label>
                <input
                  style={{ direction: direction }}
                  type="text"
                  id="school"
                  value={school}
                  onChange={(e) => setSchool(e.currentTarget.value)}
                  placeholder={i18next.t('schoolPlaceHolder', { lng: lang })}
                />
              </div>
              <div className="input">
                <label htmlFor="studentLevel">{i18next.t('studentLevel', { lng: lang })}</label>
                <select
                  name="studentLevel"
                  id="studentLevel"
                  value={studentLevel}
                  onChange={(e) => setStudentLevel(e.currentTarget.value)}
                >
                  <option value="">{i18next.t('studentLevelPlaceHolder', { lng: lang })}</option>
                  {data.map((p) => {
                    return (
                      <option key={p.name} value={p.id}>
                        {p.name}
                      </option>
                    )
                  })}
                </select>
              </div>
              {studentLevel !== null ? (
                <div className="input">
                  {/* {console.log(studentLevel)} */}
                  <label htmlFor="scientificdevision">
                    {i18next.t('scientificdevision', { lng: lang })}
                  </label>
                  <select
                    name="scientificdevision"
                    id="scientificdevision"
                    value={scientificDevision}
                    onChange={(e) => setScientificDevision(e.currentTarget.value)}
                  >
                    <option value="">
                      {i18next.t('scientificdevisionPlaceHolder', { lng: lang })}
                    </option>
                    {data
                      .filter((f) => f.id === studentLevel)[0]
                      .classifications.map((p) => {
                        return (
                          <option key={p.levelClassificationId} value={p.levelClassificationId}>
                            {p.name}
                          </option>
                        )
                      })}
                  </select>
                </div>
              ) : null}
              <button type="submit" onClick={(s) => handleSubmit(s)} className="submitBtn">
                {i18next.t('submitBtn', { lng: lang })}
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  )
}

export default EducationDetails
