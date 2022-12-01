'use strict'

const imageHandler = (selector, imageSrc, imageName = 'default-avatar.jpg') => {
  const image = new Image()
  image.src = imageSrc

  image.onerror = () => {
    $(selector).attr('src', `../../../assets/images/${imageName}`)
  }

  return { src: image.src }
}

export default imageHandler
