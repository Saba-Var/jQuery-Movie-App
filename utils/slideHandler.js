'use strict'

const sliderHandler = (operator) => {
  const slideWidth = $('#slide').width()

  $('#slides-container').animate(
    { scrollLeft: operator + Math.floor(slideWidth) },
    400
  )
}

export default sliderHandler
