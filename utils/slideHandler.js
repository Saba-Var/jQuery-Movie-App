const sliderHandler = (operator) => {
  const slideWidth = $('#slide').width()

  $('#slides-container').animate(
    { scrollLeft: operator + Math.floor(slideWidth) },
    500
  )
}

export default sliderHandler
