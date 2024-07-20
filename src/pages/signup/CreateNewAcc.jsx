import i18next from 'i18next'
import { useEffect } from 'react'
import avatar from '../../images/Group 448.png'
import React, { useContext, useState } from 'react'
import { AppContext } from '../../contexts/AppContext'
import { getFileExtension } from '../../utils/handlers'
import { convertFileToBase64 } from '../../utils/converters'

function CreateNewAcc() {
  const [data, setData] = useState(null)
  const { lang, errors, setErrors } = useContext(AppContext)

  // translation
  i18next.init({
    lng: 'en',
    // debug: true,
    resources: {
      en: {
        translation: {
          h1: 'Create a New Account',
          h6: 'Upload Your Profile Picture',
          'f-li': 'Your picture must be clear and belong to you',
          's-li': 'Students who uploading fake profile pics will be banned',
          'th-li': 'Upload your pic only in square size 500*500px',
          btn: 'Next Step',
        },
      },
      ar: {
        translation: {
          h1: 'إنشاء حساب جديد',
          h6: 'قم بتحميل صورة ملفك الشخصي',
          'f-li': 'يجب أن تكون صورتك واضحة وتنتمي إليك',
          's-li': ' سيتم حظر الطلاب الذين يقومون بتحميل صور مزيفة لا تنتمي إليهم',
          'th-li': ' قم بتحميل صورتك فقط بحجم مربع 500 * 500 بكسل',
          btn: 'الخطوة التالية',
        },
      },
    },
  })

  useEffect(() => {
    if (window !== undefined && sessionStorage.getItem('athena_student_encrypted_image')) {
      const data = JSON.parse(sessionStorage.getItem('athena_student_encrypted_image'))
      setData(data)
    }
  }, [])

  // handle image input
  const imageHandler = async (file) => {
    if (file) {
      const size = file.size
      const extension = getFileExtension(file)
      const image = await convertFileToBase64(file)
      setData({ image, extension, size })
    }
  }

  // validate data before submit it
  const validation = () => {
    if (data.image === '' && data.extension === '') {
      setErrors(
        lang === 'ar'
          ? 'يرجي ارفاق صوره لك لاكمال عمليه التسجيل'
          : 'you have to upload an image to continue',
      )
      return false
    } else if (
      data.extension !== '.png' &&
      data.extension !== '.jpeg' &&
      data.extension !== '.jpg'
    ) {
      setErrors(
        lang === 'ar'
          ? 'هذه النوعيه من الملفات غير مدعومه يرجي ارفاق صوره اخري'
          : "this file format isn't supported",
      )
      return false
    } else if (data.size < 90000) {
      setErrors(
        lang === 'ar'
          ? 'يرجي ارفاق صوره اخري تتطابق مع التعليمات المرفقه'
          : 'try another picture of you',
      )
      return false
    } else {
      setErrors('')
      return true
    }
  }

  // submit data
  const submitImage = async () => {
    try {
      if (validation()) {
        setErrors('')
        delete data.size
        const jsonData = JSON.stringify(data)
        window.sessionStorage.setItem('athena_student_encrypted_image', jsonData)
        window.location.assign('/signup/personal-details')
      }
    } catch (error) {
      setErrors(error.message)
    }
  }

  return (
    <React.Fragment>
      <div className="createNewAcc">
        <div className="content">
          <h1>{i18next.t('h1', { lng: `${lang}` })}</h1>
          <h6>{i18next.t('h6', { lng: `${lang}` })}</h6>
          {errors && <div className="alert alert-danger">{errors}</div>}
          <label htmlFor="uploadImage">
            <img
              loading="lazy"
              src={data?.image || avatar}
              alt="profile"
              style={{ objectFit: 'cover', borderRadius: '5px', width: 150, height: 150 }}
            />
          </label>
          <input
            type="file"
            onChange={(e) => imageHandler(e.target.files[0])}
            id="uploadImage"
            required
          />
          <ul>
            <li>{i18next.t('f-li', { lng: `${lang}` })}</li>
            <li>{i18next.t('s-li', { lng: `${lang}` })}</li>
            <li>{i18next.t('th-li', { lng: `${lang}` })}</li>
          </ul>
          <button onClick={() => submitImage()}>{i18next.t('btn', { lng: `${lang}` })}</button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default CreateNewAcc
