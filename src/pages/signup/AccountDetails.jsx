import React, { useContext, useState } from 'react'
import i18next from 'i18next'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import openEye from '../../images/Vector (2).svg'
import closeEye from '../../images/Vector (3).svg'
import { AppContext } from '../../contexts/AppContext'

function AccountDetails() {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [checked, setChecked] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passInputState, setPassInputState] = useState('password')
  const [passConfirmState, setPassConfirmState] = useState('password')
  const { lang, direction, errors, setErrors } = useContext(AppContext)

  // translation
  i18next.init({
    lng: 'en',
    // debug: true,
    resources: {
      en: {
        translation: {
          h1: 'Account Information',
          Username: 'Username',
          UsernamePlaceHolder: 'Create a Username',
          Password: 'Password',
          PasswordPlaceHolder: 'Create a Password',
          'Confirm Password': 'Confirm Password',
          'Confirm PasswordPlaceHolder': 'Confirm your Password',
          checkBox: 'I am 13 years of age or older and agree to ',
          'checkBox-Link1': 'the Privacy Policy',
          and: ' and ',
          'checkBox-Link2': 'Terms of Service',
          submitBtn: 'Final Step',
        },
      },
      ar: {
        translation: {
          h1: 'معلومات الحساب',
          Username: 'أسم المستخدم',
          UsernamePlaceHolder: 'قم بإنشاء أسم المستخدم ؟',
          Password: 'الرقم السري',
          PasswordPlaceHolder: 'قم بإنشاء الرقم السري ',
          'Confirm Password': 'تأكيد الرقم السري',
          'Confirm PasswordPlaceHolder': 'قم بتأكيد الرقم السري',
          checkBox: 'عمري 13 عاما أو أكثر وأوافق على ',
          'checkBox-Link1': 'سياسة الخصوصية',
          and: ' و ',
          'checkBox-Link2': 'شروط الخدمة',
          submitBtn: 'الخطوة الأخيرة',
        },
      },
    },
  })

  const EyeIconTransform = lang === 'ar' ? 'translateX(32px)' : 'translateX(-32px)'

  useEffect(() => {
    if (window !== undefined && sessionStorage.getItem('athena_student_account_details')) {
      const data = JSON.parse(sessionStorage.getItem('athena_student_account_details'))
      setChecked(data.checked)
      setUserName(data.userName)
      setPassword(data.password)
      setConfirmPassword(data.confirmPassword)
    }
  }, [])

  const handleSubmit = (s) => {
    s.preventDefault()
    try {
      if (
        userName.length >= 6 &&
        password.length >= 8 &&
        confirmPassword.length >= 8 &&
        password === confirmPassword &&
        checked === true
      ) {
        const data = {
          checked: checked,
          userName: userName,
          password: password,
          confirmPassword: confirmPassword,
        }
        const jsonData = JSON.stringify(data)
        window.sessionStorage.setItem('athena_student_account_details', jsonData)
        window.location.assign('/code-details')
        setErrors('')
      } else if (userName.length === 0 || password.length === 0 || confirmPassword.length === 0) {
        setErrors(
          lang === 'ar'
            ? 'يرجي ملئ هذه الحقول بالبيانات لاكمال عمليه التسجيل'
            : 'You have to fill all of this fields with valid information to continue',
        )
      } else if (userName.length < 6) {
        setErrors(
          lang === 'ar'
            ? 'يجب ان يكون الاسم اكبر من 6 حروف لاكمال عمليه التسجيل'
            : 'username length have to be more than 6 characters',
        )
      } else if (password.length === 0) {
        setErrors(
          lang === 'ar'
            ? 'يجب ادخال كلمه مرور صالحه اكبر من 8 حروف لاكمال عمليه التسجيل'
            : 'You have to enter a valid password greater than 8 characters to continue',
        )
      } else if (password !== confirmPassword) {
        setErrors(
          lang === 'ar'
            ? 'تم ادخال كلمات مرور غير متطابقه يرجي التحقق واعاده المحاوله'
            : 'You entered diffrent passwords',
        )
      } else if (password.length < 8) {
        setErrors(
          lang === 'ar'
            ? 'يجب ادخال كلمه مرور صالحه اكبر من 8 حروف لاكمال عمليه التسجيل'
            : 'You have to enter a valid password greater than 8 characters to continue',
        )
      } else if (checked === false) {
        setErrors(
          lang === 'ar'
            ? 'يجب ان توافق علي شروط الخدمه وسياسه الخصوصيه لاكمال عمليه التسجيل'
            : 'you have to agree to the Privacy Policy and Terms of Service',
        )
      }
    } catch (error) {
      setErrors(error.message)
    }
  }

  return (
    <React.Fragment>
      <div className="accountDetails">
        <div className="container">
          <h1>{i18next.t('h1', { lng: lang })}</h1>
          {errors && <div className="alert alert-danger">{errors}</div>}
          <form action="">
            <div className="input">
              <label htmlFor="Username">{i18next.t('Username', { lng: lang })}</label>
              <input
                style={{ direction: direction }}
                dir="auto"
                value={userName}
                onChange={(e) => setUserName(e.currentTarget.value)}
                type="text"
                id="Username"
                placeholder={i18next.t('UsernamePlaceHolder', { lng: lang })}
              />
            </div>
            <div className="input">
              <label htmlFor="Password">{i18next.t('Password', { lng: lang })}</label>
              <div className="inputWithIcon">
                <input
                  style={{ direction: direction }}
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  type={passInputState}
                  id="Password"
                  placeholder={i18next.t('PasswordPlaceHolder', { lng: lang })}
                />
                {passInputState === 'password' ? (
                  <img
                    style={{ transform: EyeIconTransform }}
                    onClick={() => setPassInputState('text')}
                    src={closeEye}
                    alt="openEyeIcon"
                    loading="lazy"
                  />
                ) : (
                  <img
                    style={{ transform: EyeIconTransform }}
                    onClick={() => setPassInputState('password')}
                    src={openEye}
                    alt="closeEyeIcon"
                    loading="lazy"
                  />
                )}
              </div>
            </div>
            <div className="input">
              <label htmlFor="Confirm Password">
                {i18next.t('Confirm Password', { lng: lang })}
              </label>
              <div className="inputWithIcon">
                <input
                  style={{ direction: direction }}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                  type={passConfirmState}
                  id="Confirm Password"
                  placeholder={i18next.t('Confirm PasswordPlaceHolder', { lng: lang })}
                />
                {passConfirmState === 'password' ? (
                  <img
                    style={{ transform: EyeIconTransform }}
                    onClick={() => setPassConfirmState('text')}
                    src={closeEye}
                    alt="openEyeIcon"
                    loading="lazy"
                  />
                ) : (
                  <img
                    style={{ transform: EyeIconTransform }}
                    onClick={() => setPassConfirmState('password')}
                    src={openEye}
                    alt="closeEyeIcon"
                    loading="lazy"
                  />
                )}
              </div>
            </div>
            <div className="checkbox">
              <input
                style={{ direction: direction, checked }}
                onChange={(e) => setChecked(e.currentTarget.checked)}
                type="checkbox"
                id="checkbox"
                checked={checked}
              />
              <label htmlFor="checkbox">
                {i18next.t('checkBox', { lng: lang })}{' '}
                <span>
                  <Link to="">{i18next.t('checkBox-Link1', { lng: lang })}</Link>
                </span>
                {i18next.t('and', { lng: lang })}
                <span>
                  <Link to="">{i18next.t('checkBox-Link2', { lng: lang })}</Link>
                </span>
              </label>
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

export default AccountDetails
