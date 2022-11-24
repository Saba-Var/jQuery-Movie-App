jQuery(() => {
  $('#mobile-menu').hide()
  $('#scroll-up').hide()

  $('#close-button').on('click', () => {
    $('#mobile-menu').fadeOut('fast')
  })

  $('#open-button').on('click', () => {
    $('#mobile-menu').fadeIn('fast')
  })

  let prevScrollPosition = window.pageYOffset

  $(window).on('scroll', () => {
    const currentScrollPosition = window.pageYOffset

    if (prevScrollPosition > currentScrollPosition) {
      $('#navbar-container').fadeIn('slow')

      if (currentScrollPosition > 500) {
        $('#scroll-up').fadeIn('slow')
      }
    } else {
      $('#navbar-container').fadeOut('slow')
      if (currentScrollPosition > 500) {
        $('#scroll-up').fadeOut('slow')
      }
    }

    if (window.pageYOffset < 500) {
      $('#scroll-up').fadeOut('slow')
    }

    prevScrollPosition = currentScrollPosition
  })

  $('#scroll-up').on('click', () => {
    $('html, body').animate({ scrollTop: 0 }, 500)
  })
})
