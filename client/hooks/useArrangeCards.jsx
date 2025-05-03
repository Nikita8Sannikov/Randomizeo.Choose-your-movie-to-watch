import React, { useRef } from 'react'

export const useArrangeCards = () => {
    const movieRefs = useRef([])
    movieRefs.current = []
        //расположение карточек фильмов
    const  arrangeCards = (y = 0) => {
        const viewportWidth = window.visualViewport?.width || window.innerWidth;
        const cardsPerRow = viewportWidth > 2300 ? 7 : viewportWidth > 1540 ? 5 : viewportWidth > 1024 ? 3 : viewportWidth > 550 ? 3 : viewportWidth > 430 ? 3 : 1
        // console.log(window.innerWidth);
        const cardWidth = viewportWidth > 900 ? 350 : viewportWidth > 800 ? 300 :  viewportWidth > 550 ? 250 : 180 // ширина карточки + расстояние между карточками
        const cardHeight = viewportWidth > 900 ? 550 :  viewportWidth > 550 ? 600 :  viewportWidth > 430 ? 350 : 600 // высота карточки
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