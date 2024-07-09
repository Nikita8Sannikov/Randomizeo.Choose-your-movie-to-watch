import React from 'react'
import Button from './Button'

const TabsSection = ({active, onChange}) => {
  return (
    <section>
        <Button isActive={active === 'main'} onclick={() => onChange('main')}>Будем смотреть</Button>
        <Button isActive={active === 'watched'} onclick={() => onChange('watched')}>Просмотренные</Button>

    </section>
  )
}

export default TabsSection