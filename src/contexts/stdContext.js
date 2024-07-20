// StudentContext.js
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { useContext } from 'react';
import { AppContext } from './AppContext';
import { useAuth } from './AuthContext';

const StudentContext = createContext();

const StudentProvider = ({ children }) => {


  const {lang , server, setErrors, deleteCookie , setLoading} = useContext(AppContext)
  const [studentData, setStudentData] = useState(null);
  const { accessToken } = useAuth();
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await axios.get(`${server}/api/student/account`, {
        headers: {
          Authorization : `Bearer ${accessToken}`
        }
      }).then((res) => {
        setLoading(false)
        setStudentData(res.data)
        // console.log(res.data)
      }).catch((error) => {
        setLoading(false)
        if (error.response && error.response.status === 401) {
          setErrors(lang === 'ar' ? 'وقت الجلسه الخاصه بك انتهي يرجي اعاده تسجيل الدخول للمنصه' : 'session timeout please login again')
          // console.log(error.message)
          setTimeout(() => {
            deleteCookie('token')
            deleteCookie('refreshToken')
          }, 1000);
        } else {
          setErrors(lang === 'ar' ? 'حدث خطأ ما يرجي التحقق من اتصالك بالانترنت والمحاوله لاحقا' : 'something went wrong please check your connection and try again');
        }
      })
    }
    fetchData()
  } , [ ])
  return (
    <StudentContext.Provider value={{ studentData, setStudentData }}>
      {children}
    </StudentContext.Provider>
  );
};

export { StudentContext, StudentProvider };
