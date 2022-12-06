'use strict'

jQuery(() => {
  $('#mobile-menu').hide()
  $('#scroll-up').hide()

  $('#close-button').on('click', () => {
    $('#mobile-menu').fadeOut('fast')
  })

  $('#open-button').on('click', () => {
    $('#mobile-menu').fadeIn('fast')
  })

  const currentYear = new Date().getFullYear()
  $('#current-year').text(currentYear)

  let prevScrollPosition = window.pageYOffset

  $(window).on('scroll', () => {
    const currentScrollPosition = window.pageYOffset

    if (prevScrollPosition > currentScrollPosition) {
      $('#navbar-container').fadeIn('fast')

      if (currentScrollPosition > 500) {
        $('#scroll-up').fadeIn('fast')
      }
    } else {
      $('#navbar-container').fadeOut('fast')
      if (currentScrollPosition > 500) {
        $('#scroll-up').fadeOut('fast')
      }
    }

    if (window.pageYOffset < 500) {
      $('#scroll-up').fadeOut('fast')
    }

    prevScrollPosition = currentScrollPosition
  })

  $('#scroll-up').on('click', () => {
    $('html, body').animate({ scrollTop: 0 }, 500)
  })
})
