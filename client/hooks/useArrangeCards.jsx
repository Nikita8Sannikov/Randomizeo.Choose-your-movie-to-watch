import React, { useRef } from 'react'

export const useArrangeCards = (containerRef) => {
    const movieRefs = useRef([])
    movieRefs.current = []
        //расположение карточек фильмов
    const  arrangeCards = (y = 0, containerElement) => {
        const viewportWidth = window.visualViewport?.width || window.innerWidth;
        const containerWidth = containerElement?.offsetWidth ?? containerRef?.current?.offsetWidth ?? viewportWidth;
        // Синхронизировано с Card.module.css для movieSection/watchedSection
        const cardWidth = viewportWidth > 810 ? 250 : viewportWidth > 540 ? 220 : viewportWidth > 484 ? 200 : viewportWidth - 40
        const cardGap = viewportWidth > 540 ? 55 : 30
        const baseCardStep = cardWidth + cardGap
        const cardsPerRow = viewportWidth > 2300 ? 7 : viewportWidth > 1540 ? 5 : viewportWidth > 540 ? 3 : viewportWidth > 484 ? 3 : 1
        const fitsInRow = containerWidth >= 3 * cardWidth
        const effectiveCardWidth = !fitsInRow && cardsPerRow === 3 && containerWidth > 0
            ? Math.max(150, (containerWidth / 3) - 15)
            : cardWidth
        const cardStep = cardsPerRow === 3 && containerWidth > 0
            ? Math.max(effectiveCardWidth, Math.min(baseCardStep, containerWidth / 3))
            : baseCardStep
        const cardHeight = viewportWidth > 900 ? 550 : viewportWidth > 540 ? 600 : viewportWidth > 484 ? 450 : 541
        const rowWidth = cardsPerRow * cardStep
        const centerOffsetX = 0

        if (Array.isArray(movieRefs.current)) {
          movieRefs.current.forEach((card, index) => {
            const rowIndex = Math.floor(index / cardsPerRow)
            const positionInRow = index % cardsPerRow
            let offsetX, offsetY
            // Расчет позиции X (cardStep = ширина карточки + зазор)
            if (positionInRow === 0) {
              offsetX = 0
            } else if (positionInRow % 2 === 1) {
              offsetX = -Math.ceil(positionInRow / 2) * cardStep
            } else {
              offsetX = Math.ceil(positionInRow / 2) * cardStep
            }
            const arcOffset = offsetX
            offsetX += centerOffsetX

            // Увеличим коэффициент для более глубокой дуги
            const rowGap = cardsPerRow === 1 ? 40 : 20
            offsetY = rowIndex * (cardHeight + rowGap) - Math.abs(arcOffset) * 0.3

            if (card) {
              card.style.transform = `translate(${offsetX}px, ${offsetY + y}px)`
              if (!fitsInRow && cardsPerRow === 3) {
                card.style.width = effectiveCardWidth + 'px'
              } else {
                card.style.width = ''
              }
            }
          })
        } else {
          console.error("movieRefs.current is not an array")
        }
      }
  return {arrangeCards, movieRefs}
}