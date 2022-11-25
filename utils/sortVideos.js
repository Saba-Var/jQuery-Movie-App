const sortVideos = (a, b) => {
  if (a?.name === 'Official Trailer') {
    return -1
  }

  if (a.name.includes('Official') && b.name.includes('Official')) {
    return a.name.split(' ')[2] - b.name.split(' ')[2]
  }

  if (a.name < b.name) {
    return -1
  }
  if (a.name > b.name) {
    return 1
  }
  return 0
}

export default sortVideos
