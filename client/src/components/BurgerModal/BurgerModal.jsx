import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import  LeftUpShadow  from '../Gradients/LeftUpShadow'
import  RightUpShadow  from '../Gradients/RightUpShadow'
import  DownShadow  from '../Gradients/DownShadow'

import styles from "./BurgerModal.module.css"

const BurgerModal = ({isOpen, onClose}) => {
    const userName = useSelector((state) => state.auth.user.name)
    const navigate = useNavigate()

    useEffect(() => {

        const lefShadow = document.querySelector('[data-shadow="leftUp"]')
        const rightShadow = document.querySelector('[data-shadow="rightUp"]')
        const downShadow =  document.querySelector('[data-shadow="downShad"]')
           


if (isOpen) {
    if (lefShadow) lefShadow.classList.add(`${styles.burgerHeader}`);
    if (rightShadow) rightShadow.classList.add(`${styles.burgerHeader}`);
    if (downShadow) downShadow.classList.add(`${styles.burgerHeader}`);
    document.body.classList.add(`${styles.noScroll}`);
    } else {
          document.body.classList.remove(`${styles.noScroll}`);
          if (lefShadow) lefShadow.classList.remove(`${styles.burgerHeader}`);
          if (rightShadow) rightShadow.classList.remove(`${styles.burgerHeader}`);
          if (downShadow) downShadow.classList.remove(`${styles.burgerHeader}`);
        }
      }, [isOpen]);

  return (
    


    <div className={`${styles.burgerModal} ${isOpen ? styles.active : ""}`} >
        {/* <LeftUpShadow/>
        <RightUpShadow/>
        <DownShadow/> */}
    <ul className={`${isOpen ? styles.active : ""}`}>
        {userName}
        <li onClick={() =>  {navigate("/"); onClose()}   }>
        {"Фильмы"}
        </li>
        <li onClick={() => {navigate("/series"); onClose()}}>
        {"Сериалы"}
        </li>
        <li onClick={() => {navigate("/watched"); onClose()}}>
        {"Просмотренные фильмы"}
        </li>
        <li onClick={() => {navigate("/watched/series"); onClose()}}>
        {"Просмотренные сериалы"}
        </li>
    </ul>
</div>

  )
}

export default BurgerModal