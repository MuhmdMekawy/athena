import React , {useState , useRef, useContext} from 'react'
import { Navigation, Pagination, Scrollbar, Autoplay ,A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import moment from 'moment'
import { useEffect } from 'react';
import { AppContext } from '../contexts/AppContext';




function SliderMonthYear() {
  const {lang} = useContext(AppContext)
  const [currYear , setCurrYear] = useState()
  const [currMonth , setCurrMonth] = useState()
  const [countPrevMonth , setCountPrevMonth] = useState(1)
  const [countNextMonth, setCountNextMonth] = useState(1)
  const [countPrevYear, setCountPrevYear] = useState(1)
  const [countNextYear, setCountNextYear] = useState(1)
  const sliderRef = useRef(null);

  const handlePrevForDate = () => {
    // console.log(countPrevMonth)
    if (countNextMonth > 1) {
      setCountNextMonth(1)
      setCurrMonth(moment().format("MMMM"))
      setCurrYear(moment().format("YYYY"))
    }
    else if (moment().subtract(countPrevMonth, 'months').format('MMMM') !== "December") {
      setCountPrevMonth(countPrevMonth+1)
      setCurrMonth(moment().subtract(countPrevMonth, 'months').format('MMMM'))
    } else {
      setCountPrevMonth(countPrevMonth+1)
      setCurrMonth(moment().subtract(countPrevMonth, 'months').format('MMMM'))
      setCountPrevYear(countPrevYear+1)
      setCurrYear(moment().subtract(countPrevYear, 'year').format('YYYY'))
    }
  }

  const handleNextForDate = () => {
    if (countPrevMonth > 1) {
      setCountPrevMonth(1)
      setCurrMonth(moment().format("MMMM"))
      setCurrYear(moment().format("YYYY"))
    }
    else if (moment().add(countNextMonth, 'months').format('MMMM') !== "January") {
      setCountNextMonth(countNextMonth+1)
      setCurrMonth(moment().add(countNextMonth, 'months').format('MMMM'))
    } else {
      setCountNextMonth(countNextMonth+1)
      setCurrMonth(moment().add(countNextMonth, 'months').format('MMMM'))
      setCountNextYear(countNextYear+1)
      setCurrYear(moment().add(countNextYear, 'year').format('YYYY'))
    }
  }
  // console.log(countNextMonth)
  useEffect(() => {
    setCurrMonth(moment().format("MMMM"))
    setCurrYear(moment().format("YYYY"))
  } , [ ])
  return (
    <React.Fragment>
      <div className="date-slider" style={{direction : 'ltr'}}>
        <Swiper
          ref={sliderRef}
          loop={ true}
          modules={[Navigation, Pagination, Scrollbar, Autoplay, A11y]}
          spaceBetween={15}
          slidesPerView={1}
          autoplay={{
            running: false,
            waitForTransition1: 500
          }}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween:8
            },
            768: {
              slidesPerView: 4,
              spaceBetween:8
            },
            991: {
              slidesPerView: 5,
              spaceBetween:15
            },
          }}
          navigation={{
            prevEl: '.prev',
            nextEl: '.next',
          }}
        >
          <SwiperSlide><div className="slide"><div className="slide-tab">{currMonth} {currYear}</div></div></SwiperSlide>
        </Swiper>
          <button className="prevDate" onClick={()=>handleNextForDate()}><span>&gt;</span></button>
          <button className="nextDate"  onClick={()=>handlePrevForDate()}><span>&lt;</span></button>
      </div>
    </React.Fragment>
  )
}

export default SliderMonthYear
