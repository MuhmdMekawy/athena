import React, { useContext } from 'react'
import SignUpnavbar from './SignUpnavbar'
import Footer from '../../components/Footer'
import i18next from 'i18next'
import celebrationVid from '../../images/celeb.mp4'
import '../../styles/css/signup/finishSignUp.css'
import { AppContext } from '../../contexts/AppContext';

function FinishSignUp() {  
  const {lang , direction , getCookie} = useContext(AppContext)

  i18next.init({
    lng: 'en',
    // debug: true,
    resources: {
      en: {
        translation: {
          h1: 'Congratulations!',
          h3: 'Account Created Successfully',
          h6: 'Your ID Code',
          p: 'Share Your ID Code With Your Teachers',
          submitButton: 'Welcome',
        },
      },
      ar: {
        translation: {
          h1: 'تهانينا',
          h3: 'لقد تم إنشاء الحساب بنجاح',
          h6: 'كود المعرف الخاص بك',
          p: 'شارك الكود مع المدرسين ',
          submitButton: 'الرئيسية',
        },
      },
    },
  })

  const handleSubmit = (s) => {
    s.preventDefault()
    sessionStorage.clear()
    window.location.assign('/athena-homepage')
  }
  return (
    <React.Fragment>
      <div className="finishSignUp">
        <video src={celebrationVid} loop autoPlay muted></video>
        <div className="container">
          <SignUpnavbar showBtn={false} />
          <div className="content">
            <div className="icon">
              {/* <img src={LedIcon} alt="icon for led" /> */}
              <svg
                width="47"
                height="84"
                viewBox="0 0 47 84"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M23.27 0C36.1012 0 46.54 9.79524 46.54 21.8355C46.54 25.1997 45.7018 28.5458 44.1114 31.548H44.1306L43.7094 32.2801C40.1352 38.4373 38.1506 45.4492 37.9705 52.5573C37.9159 54.7243 36.1748 56.4218 34.0071 56.4218H15.8736C13.537 56.4218 11.5746 54.7468 11.2076 52.4394C10.3145 46.8251 8.52827 41.4154 5.89906 36.36C2.09471 32.3564 0 27.1998 0 21.8356C0 9.79524 10.439 0 23.27 0ZM43.1455 31.9816L43.2963 31.7102C45.0013 28.6837 45.9025 25.2691 45.9025 21.8355C45.9025 10.147 35.7495 0.637534 23.27 0.637534C10.7905 0.637534 0.637534 10.147 0.637534 21.8355C0.637534 27.0501 2.68088 32.0635 6.39153 35.9528L6.44352 36.0257C9.11599 41.1533 10.9309 46.6421 11.837 52.3391C12.1546 54.3353 13.8524 55.7842 15.8736 55.7842H34.0071C35.8263 55.7842 37.2872 54.3597 37.3333 52.5412C37.5157 45.335 39.5254 38.2262 43.1455 31.9816Z" />
                <path d="M36.525 54.829H12.5837C11.8225 54.829 11.2256 55.4826 11.2945 56.2407L11.5186 58.7066C11.7062 60.7701 12.3574 62.7647 13.4234 64.5414C13.6017 64.8385 13.9383 65.0012 14.2823 64.9598C21.3765 64.1047 28.3179 64.0767 35.0929 64.9474C35.4635 64.995 35.8231 64.8056 35.9903 64.4714L36.1437 64.1645C36.9111 62.6296 37.3848 60.9647 37.5401 59.2557L37.8142 56.2407C37.8831 55.4826 37.2862 54.829 36.525 54.829Z" />
                <path d="M14.9805 63.2756H34.5846V76.0352C34.5846 78.3174 32.7318 80.1703 30.4496 80.1703H19.1155C16.8333 80.1703 14.9805 78.3174 14.9805 76.0352V63.2756Z" />
                <path d="M27.3175 83.5174H23.069C22.6017 83.5174 22.1632 83.2917 21.8916 82.9115L19.1367 79.0547H31.2499L28.495 82.9115C28.2234 83.2917 27.7848 83.5174 27.3175 83.5174Z" />
                <path d="M30.5103 11.2596C27.3911 11.9055 24.272 12.5514 21.1528 13.1972C19.7502 13.4877 18.1794 13.6384 16.905 14.3355C15.6695 15.0113 14.8042 16.4292 15.2462 17.8488C15.6683 19.2043 16.9141 20.0547 18.2504 20.357C19.733 20.6924 21.3212 20.69 22.8325 20.8066C24.4087 20.9283 25.985 21.05 27.5613 21.1717C28.3115 21.2296 29.0656 21.2696 29.814 21.3466C30.0534 21.3713 30.3144 21.4006 30.511 21.5525C30.508 21.5502 30.5774 21.5937 30.5389 21.6004C30.5314 21.6017 30.5308 21.5512 30.5319 21.5478C30.5623 21.4532 30.5498 21.5427 30.5253 21.5429C30.5167 21.543 30.2909 21.6922 30.1649 21.7157C29.8251 21.7792 29.4502 21.733 29.1059 21.7271C28.3577 21.7144 27.6091 21.7285 26.8619 21.7693C25.3582 21.8513 23.8565 22.0383 22.3774 22.3216C20.9226 22.6004 19.4746 22.9714 18.0774 23.4657C16.7226 23.945 15.3037 24.8551 15.2669 26.4609C15.2323 27.9691 16.5407 29.029 17.8732 29.4079C18.5585 29.6027 19.2807 29.6734 19.9837 29.7779C20.7679 29.8946 21.5522 30.0113 22.3365 30.1279C23.8789 30.3574 25.4213 30.5868 26.9637 30.8163C27.748 30.9329 28.5322 31.0496 29.3165 31.1663C29.6822 31.2207 30.05 31.2676 30.4145 31.3296C30.5489 31.3525 30.6756 31.3948 30.8082 31.4219C30.7192 31.4037 30.8296 31.4038 30.8114 31.4246C30.8695 31.4601 30.8696 31.4548 30.8118 31.4084L30.7724 31.3506C30.6824 31.0979 30.6855 31.0647 30.8497 30.7659C30.8811 30.7088 30.9448 30.7677 30.8636 30.7587C30.7769 30.7492 30.9155 30.7479 30.8232 30.786C30.7771 30.8051 30.7269 30.818 30.6788 30.8313C30.3157 30.9318 29.9352 30.9843 29.5656 31.0569C28.7972 31.2078 28.0288 31.3586 27.2604 31.5095C25.7492 31.8062 24.238 32.1029 22.7268 32.3997C20.0648 32.9226 17.2376 33.6297 15.6422 36.0317C15.2952 36.5542 15.0433 37.1563 14.9175 37.7705C14.814 38.276 15.0641 38.8036 15.5855 38.9469C16.0583 39.0768 16.6577 38.7873 16.7618 38.279C17.2672 35.8117 19.967 34.9256 22.1873 34.455C23.6591 34.143 25.1399 33.87 26.6162 33.5801C28.1041 33.288 29.6156 33.0501 31.0908 32.6999C31.711 32.5526 32.3838 32.1714 32.5572 31.5101C32.747 30.7861 32.3896 30.0872 31.7334 29.75C31.104 29.4265 30.3558 29.401 29.6681 29.2987C28.91 29.1859 28.1519 29.0731 27.3937 28.9603C25.8513 28.7309 24.3089 28.5014 22.7665 28.272C22.0084 28.1592 21.2502 28.0464 20.4921 27.9336C19.7892 27.8291 19.067 27.7585 18.3816 27.5636C17.9179 27.4317 17.4434 27.2055 17.2386 26.764C17.1725 26.6216 17.1555 26.518 17.2006 26.3579C17.2625 26.1381 17.4347 25.9334 17.6262 25.782C18.0678 25.4328 18.6655 25.277 19.1904 25.1086C19.8791 24.8877 20.5755 24.6905 21.2779 24.5176C22.6723 24.1743 24.0896 23.9231 25.519 23.7839C26.2638 23.7113 27.0111 23.6652 27.7591 23.6458C28.4669 23.6274 29.1759 23.6713 29.8828 23.6494C30.6362 23.626 31.4117 23.4246 31.929 22.8405C32.4613 22.2394 32.5908 21.4187 32.2204 20.6981C31.4875 19.2721 29.5456 19.4122 28.1918 19.3077C26.6418 19.1881 25.0918 19.0684 23.5418 18.9488C22.0924 18.8369 20.6023 18.8133 19.1655 18.5903C18.6334 18.5077 18.0201 18.3556 17.6189 18.0386C17.251 17.7479 17.0122 17.3668 17.0414 16.9849C17.0686 16.6297 17.4314 16.2373 17.8111 16.0192C18.3439 15.7133 18.9725 15.5991 19.5676 15.4751C22.63 14.8366 25.6941 14.2065 28.7574 13.5722C29.5112 13.4161 30.265 13.26 31.0188 13.1039C31.5247 12.9991 31.8172 12.4024 31.6867 11.9275C31.5423 11.4023 31.0177 11.1546 30.5103 11.2596Z" />
              </svg>
            </div>
            <h1>{i18next.t('h1', { lng: lang })}</h1>
            <h3>{i18next.t('h3', { lng: lang })}</h3>
            <div className="code" style={{ direction: direction }}>
              <h6>{i18next.t('h6', { lng: lang })}</h6>
              <h5 className="codeNumber">{getCookie('studentCode')}</h5>
              <p>{i18next.t('p', { lng: lang })}</p>
            </div>
            <button type="submit" onClick={(s) => handleSubmit(s)} className="submitBtn">
              {i18next.t('submitButton', { lng: lang })}
            </button>
            <Footer />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default FinishSignUp