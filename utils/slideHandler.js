const slideHandler = (containerId) => {
  const slider = document.getElementById(containerId)

  let isDown = false
  let scrollLeft = 0
  let startX = 0

  return $(`#${containerId}`)
    .on('mousedown', (e) => {
      isDown = true
      startX = e.pageX - slider.offsetLeft
      scrollLeft = slider.scrollLeft
    })
    .on('mouseleave', () => {
      isDown = false
    })
    .on('mouseup', () => {
      isDown = false
    })
    .on('mousemove', (e) => {
      if (!isDown) {
        return
      }
      e.preventDefault()
      const x = e.pageX - slider.offsetLeft
      const move = (x - startX) * 3
      slider.scrollLeft = scrollLeft - move
    })
}

export default slideHandler
