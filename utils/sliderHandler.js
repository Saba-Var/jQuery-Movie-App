'use strict'

const sliderHandler = (containerId) => {
  const slider = document.getElementById(containerId)

  let isDown = false
  let scrollLeft = 0
  let startX = 0

  return $(`#${containerId}`).on({
    mousedown: (e) => {
      isDown = true
      startX = e.pageX - slider.offsetLeft
      scrollLeft = slider.scrollLeft
    },

    mouseleave: () => {
      isDown = false
    },

    mouseup: () => {
      isDown = false
    },

    mousemove: (e) => {
      if (!isDown) {
        return
      }
      e.preventDefault()
      const x = e.pageX - slider.offsetLeft
      const move = (x - startX) * 3
      slider.scrollLeft = scrollLeft - move
    },
  })
}

export default sliderHandler
