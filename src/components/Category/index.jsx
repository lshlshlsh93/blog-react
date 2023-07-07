import { useState } from 'react'
import { MdNavigateNext } from 'react-icons/md'
import { GrFormPrevious } from 'react-icons/gr'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from './category.module.css'

import { category } from '../../api/data/category'

const SimpleNextArrow = (props) => {
  const { onClick } = props
  return (
    <div className={styles.ControlBtn} onClick={onClick}>
      <button className={styles.Next}>
        <MdNavigateNext className="icon" />
      </button>
    </div>
  )
}
const SimplePrevArrow = (props) => {
  const { onClick } = props
  return (
    <div className={styles.ControlBtn} onClick={onClick}>
      <button className={styles.Prev}>
        <GrFormPrevious className={styles.Icon} />
      </button>
    </div>
  )
}

const Category = () => {
  const [current, setCurrent] = useState(1)
  const [size, setSize] = useState(10)
  const [data, setData] = useState(null)
  const token = useSelector((state) => state.token)

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    nextArrow: <SimpleNextArrow />,
    prevArrow: <SimplePrevArrow />,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
    ],
  }

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(
        `/api/v1/category/findPage?current=${current}&size=${size}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const _data = await resp.json()
      _data.data.code === 200 && setData(_data)
    }
    fetchData()
  }, [])

  return (
    <section
      className={styles.Category}
      style={{
        minHeight: '590px',
      }}
    >
      <div className={styles.Content}>
        <Slider {...settings}>
          {category
            ? category.map((c) => (
                <div className={styles.Boxs} key={c.id}>
                  <div className={styles.Box}>
                    <img src={c.image_url} alt="" />
                    <div className={styles.Overlay}>
                      <h4>{c.name}</h4>
                      <h4>{c.desc}</h4>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </Slider>
      </div>
    </section>
  )
}

export default Category
