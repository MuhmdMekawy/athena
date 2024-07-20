import React , { useEffect , useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import '../../styles/css/student/studenthomepage.css'
import avatar from '../../images/imageBackground.png'
import imgEdit from '../../images/Group 681.png'
import { useContext } from 'react'
import { AppContext } from '../../contexts/AppContext'
import Footer from '../../components/Footer'
import CryptoJS from 'crypto-js';
import i18next from 'i18next'
import axios from 'axios'
import Loading from '../../components/Loading'
import StudentInfo from './StudentInfo'
import { StudentContext } from '../../contexts/stdContext'
import { useAuth } from '../../contexts/AuthContext'


function StudentImageControl() {
  const [fileInput, setFileInput] = useState(null);
  const [avatarImage, setAvatarImage] = useState(avatar);

  const { studentData } = useContext(StudentContext)
  const {server ,getCookie ,deleteCookie ,loading , setLoading , errors,setErrors , lang , direction} = useContext(AppContext)
  const {accessToken} = useAuth()
  i18next.init({
    lng: 'en',
    // debug: true,
    resources: {
      en: {
        translation: {
          "h1": "Create a New Account",
          "h6": "Upload Your Profile Picture",
          "f-li": "Your picture must be clear and belong to you",
          "s-li": "Students who uploading fake profile pics will be banned",
          "th-li": "Upload your pic only in square size 500*500px",
          "btn": "Next Step",
        },
      },
      ar: {
        translation: {
          "h1": "إنشاء حساب جديد",
          "h6": "قم بتحميل صورة ملفك الشخصي",
          "f-li": "يجب أن تكون صورتك واضحة وتنتمي إليك",
          "s-li": " سيتم حظر الطلاب الذين يقومون بتحميل صور مزيفة لا تنتمي إليهم",
          "th-li": " قم بتحميل صورتك فقط بحجم مربع 500 * 500 بكسل",
          "btn": "الخطوة التالية",
        },
      },
    },
  });

  const handleUploadImage = () => {
    if (fileInput) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageBinaryData = e.target.result;
        const encryptedBase64 = encryptImage(imageBinaryData); // Call your encryption function here
        const imageType = fileInput.type; // Get the image type from the file object
        const imageExtension = getFileExtension(fileInput.name); // Get the file extension
        
        // Send the encrypted image data and image extension to the API
        sendEncryptedImage(encryptedBase64, imageType, imageExtension);
      };
      reader.readAsBinaryString(fileInput);
    }
    if (!fileInput) {
      setErrors('you have to upload an image to continue')
    }
  };
  
  const getFileExtension = (filename) => {
    return filename.split('.').pop().toLowerCase();
  };


  const encryptImage = (imageData) => {
    // Convert the image data to a WordArray object
    const wordArray = CryptoJS.lib.WordArray.create(imageData);
  
    // Encrypt the WordArray using AES
    const encryptedData = CryptoJS.AES.encrypt(wordArray, 'encryptionKey123');
  
    // Convert the encrypted data to Base64
    const encryptedBase64 = encryptedData.toString();
  
    // console.log('Encrypted Image Data:', encryptedBase64); // Print the encrypted image data
    return encryptedBase64;
  };

    
  const sendEncryptedImage = (encryptedImage, imageType, imageExtension) => {
    try {
      if (encryptedImage !== '' && imageExtension !== '') {
        if (!['png', 'jpeg', 'jpg'].includes(imageExtension)) {
          setErrors("this file format isn't supported")
        } else if (fileInput.size < 90000) {
          setErrors('Try another pic of you')
        } else {
          setErrors('')
          const token = getCookie('token')
          // console.log(encryptedImage)
          // console.log(`.${imageExtension}`)
          if (!token) {
            throw new Error('token not found')
          }
          const putImageFun = async () => {
            setLoading(true)
            await axios.put(`${server}/api/student/account/image`, {
              image: {
                extension: `.${imageExtension}`,
                data : `${encryptedImage}`
              }
            }, {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            }).then((res) => {
              setLoading(false)
              setErrors('')
              console.log(res)
            }).catch((error) => {
              setLoading(false)
              setErrors(error.response.statusText)
              if (error.response.statusText === 'Unauthorized') {
                setTimeout(() => {
                  deleteCookie('token')
                  window.location.reload()
                } , 500)
              }
            })
          }
          putImageFun()
        }
      }
    } catch (error) {
      setErrors(error.message)
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true)
      await axios.get(`${server}/api/student/account`, {
        headers: {
          Authorization : `Bearer ${accessToken}`
        }
      }).then((res) => {
        setLoading(false)
        // console.log(res.data)
        setAvatarImage(`${server}/${res.data.image}`)
      })
    }
    fetchData()
    // if (studentData) {
    //   setAvatarImage(`${server}/${studentData.image}`)
    // }
    if (fileInput) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarImage(e.target.result);
        setErrors('')
      };
      reader.readAsDataURL(fileInput);
    }
  }, [fileInput]);


  return (
    <React.Fragment>
      {loading === true ? 
        <Loading />
        :
          <>
            <Navbar showhomeNavbarBtn={true}/>
            <div className="student-homepage  image-control" style={{direction : direction}}>
              <div className="container">
                <div className="head-exam">
                  <div className="text">
                    <h1>{lang === 'ar' ? 'التحكم في الحساب' :'Account Control'}</h1>
                  </div>
                  <div className="gradient-text backHome">
                    <button onClick={()=>window.location.assign('/athena-homepage')}>{lang === 'ar' ? 'العودة إلى الرئيسية' :'Back To Home'}</button>
                  </div>
                </div>
                <div className="content">
                  <div className="account-control">
                    <div className="header">
                      <h1>
                        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.7392 8.80936C12.7392 10.721 11.1891 12.2708 9.2775 12.2708C7.36562 12.2708 5.8158 10.721 5.8158 8.80936C5.8158 6.89748 7.36562 5.34766 9.2775 5.34766C11.1891 5.34766 12.7392 6.89748 12.7392 8.80936Z"/>
                        <path d="M17.4999 35.0004C27.1493 35.0004 35 27.1497 35 17.5003V17.5001C35 7.85066 27.1493 0 17.4999 0C16.7565 0 16.1537 0.60254 16.1537 1.34619C16.1537 2.08963 16.7563 2.69239 17.4999 2.69239C24.4412 2.69239 30.28 7.49441 31.875 13.9499L28.168 10.4248L17.7179 18.3398L14.3058 14.1951L3.25195 21.522C2.88989 20.242 2.69214 18.894 2.69214 17.5C2.69214 16.7565 2.0896 16.1538 1.34595 16.1538C0.602503 16.1538 0 16.7565 0 17.5C0 27.1494 7.85067 35 17.5001 35L17.4999 35.0004ZM13.7696 17.7809L17.2821 22.0476L27.9697 13.9526L32.2934 18.0644C31.9956 25.9688 25.4759 32.3082 17.4996 32.3082C11.7024 32.3082 6.67516 28.9576 4.24577 24.0932L13.7696 17.7809Z"/>
                        </svg>
                        <span>{lang === 'ar' ? 'صورة الملف الشخصي' :'Profile Picture'}</span>
                      </h1>
                      <Link to='/student-homepage' className="arrow-back">
                        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.4" d="M21 42C9.4185 42 0 32.5794 0 21C0 9.4206 9.4185 0 21 0C32.5794 0 42 9.4206 42 21C42 32.5794 32.5794 42 21 42Z"/>
                        <path d="M24.0293 29.8645C23.6282 29.8645 23.225 29.7112 22.9184 29.4046L15.5957 22.1176C15.2996 21.8215 15.1337 21.4204 15.1337 21.0004C15.1337 20.5825 15.2996 20.1814 15.5957 19.8853L22.9184 12.5941C23.5337 11.9809 24.5291 11.9809 25.1444 12.5983C25.7576 13.2157 25.7555 14.2132 25.1402 14.8264L18.9389 21.0004L25.1402 27.1744C25.7555 27.7876 25.7576 28.783 25.1444 29.4004C24.8378 29.7112 24.4325 29.8645 24.0293 29.8645Z"/>
                        </svg>
                      </Link>
                    </div>
                  <h4>{lang === 'ar' ? 'صورة الملف الشخصي' :'Update Your Profile Picture'}</h4>
                  {errors !== '' ?
                    <div className="alert alert-danger">
                      {errors}
                    </div>
                    : null}
                    <label htmlFor='photo-control' className="image">
                      <img className='std-img' src={avatarImage} alt="student-image" loading='lazy' />
                      <img className='edit-icon' src={imgEdit} alt="student-image" loading='lazy' />
                  </label>
                    <input type="file" id='photo-control' onChange={(e) => setFileInput(e.target.files[0])} hidden />
                    <ul>
                      <li>{i18next.t('f-li', { lng: `${lang}` })}</li>
                      <li>{i18next.t('s-li', { lng: `${lang}` })}</li>
                      <li>{i18next.t('th-li', { lng: `${lang}` })}</li>
                    </ul>
                    <button className='submitBtn special' onClick={() => handleUploadImage()}>{lang === 'ar' ? 'تأكيد' :'Confirm'}</button>
                    <h6><Link to=''>{lang === 'ar' ? 'سياسة الخصوصية' :'Privacy Policy'}</Link>{lang === 'ar' ? 'و' :'and'}  <Link to=''>{lang === 'ar' ? ' شروط الخدمة' :'Terms of Service'}</Link></h6>
                  </div>
                  <StudentInfo />
                </div>
              </div>
            </div>
            <Footer />
          </>
      }
    </React.Fragment>
  )
}

export default StudentImageControl
