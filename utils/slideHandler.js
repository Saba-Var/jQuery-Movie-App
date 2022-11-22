const sliderHandler = (operator) => {
  const slideWidth = $('#slide').width()
  const currentScrollPosition = $('#slides-container').scrollLeft()
  const maxScrollPosition =
    $('#slides-container')[0].scrollWidth - $('#slides-container').width()

  $('#slides-container').animate({ scrollLeft: operator + slideWidth }, 400)

  if (currentScrollPosition === 0) {
    return $('#slide-arrow-prev').addClass('cursor-not-allowed')
  }

  if (Math.floor(currentScrollPosition) === Math.floor(maxScrollPosition)) {
    return $('#slide-arrow-next').addClass('cursor-not-allowed')
  }

  if (currentScrollPosition > 0) {
    return $('#slide-arrow-prev').removeClass('cursor-not-allowed')
  }

  if (currentScrollPosition < maxScrollPosition) {
    return $('#slide-arrow-next').removeClass('cursor-not-allowed')
  }
}

export default sliderHandler
