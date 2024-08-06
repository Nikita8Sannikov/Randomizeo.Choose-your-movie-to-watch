import React, { useRef } from 'react'

export const useArrangeCards = () => {
    const movieRefs = useRef([])
    movieRefs.current = []
        //расположение карточек фильмов
    const  arrangeCards = (y = 0) => {
        const cardsPerRow = window.innerWidth < 1650 ? 3 : 5
        // console.log(window.innerWidth);
        const cardWidth = window.innerWidth < 900 ? 300 : 350 // ширина карточки + расстояние между карточками
        const cardHeight = 650 // высота карточки
        let maxOffsetY = 0
    
        // console.log('Total cards:', movieRefs.current);
        if (Array.isArray(movieRefs.current)) {
          movieRefs.current.forEach((card, index) => {
            const rowIndex = Math.floor(index / cardsPerRow)
            const positionInRow = index % cardsPerRow
            let offsetX, offsetY
            // console.log(movieRefs.current);
            // Расчет позиции X
            if (positionInRow === 0) {
              offsetX = 0
            } else if (positionInRow % 2 === 1) {
              offsetX = -Math.ceil(positionInRow / 2) * cardWidth
            } else {
              offsetX = Math.ceil(positionInRow / 2) * cardWidth
            }
    
            // Увеличим коэффициент для более глубокой дуги
            offsetY = rowIndex * (cardHeight + 20) - Math.abs(offsetX) * 0.3
    
            // console.log(`Card ${index}: rowIndex=${rowIndex}, positionInRow=${positionInRow}, offsetX=${offsetX}, offsetY=${offsetY}`);
            if (card) {
              card.style.transform = `translate(${offsetX}px, ${offsetY + y}px)`
            }
          })
        } else {
          console.error("movieRefs.current is not an array")
        }
      }
  return {arrangeCards, movieRefs}
}