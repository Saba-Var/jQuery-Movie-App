const sliderHandler = (operator) => {
  const slideWidth = $('#slide').width()

  $('#slides-container').animate({ scrollLeft: operator + slideWidth }, 400)
}

export default sliderHandler
