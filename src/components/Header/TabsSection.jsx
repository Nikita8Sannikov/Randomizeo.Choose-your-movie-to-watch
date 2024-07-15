import React from 'react'
import Button from '../Button'
import  styles from "./Header.module.css"

const TabsSection = ({active, onChange}) => {
  return (
    <section className={styles.navigationSection}>
        <Button isActive={active === 'main'} onclick={() => onChange('main')} className={styles.navButton}>Будем смотреть</Button>
        <Button isActive={active === 'watched'} onclick={() => onChange('watched')} className={styles.navButton}>Просмотренные</Button>

    </section>
  )
}

export default TabsSection