export const IMAGE_BY_ID = {
  inception: 'https://image.tmdb.org/t/p/original/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
  br2049: 'https://image.tmdb.org/t/p/original/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg',
  interstellar: 'https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
  tdk: 'https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
  parasite: 'https://image.tmdb.org/t/p/original/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
  lalaland: 'https://image.tmdb.org/t/p/original/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg',
  getout: 'https://image.tmdb.org/t/p/original/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg',
  furyroad: 'https://image.tmdb.org/t/p/original/hA2ple9q4qnwxp3hKVNhroipsir.jpg',
  spiritedaway: 'https://image.tmdb.org/t/p/original/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg',
  gbh: 'https://image.tmdb.org/t/p/original/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg',
  whiplash: 'https://image.tmdb.org/t/p/original/7fn624j5lj3xTme2SgiLCeuedmO.jpg',
  dune: 'https://image.tmdb.org/t/p/original/d5NXSklXo0qyIYkgV94XAgMIckC.jpg',
  eeaao: 'https://image.tmdb.org/t/p/original/u68AjlvlutfEIcpmbYpKcdi09ut.jpg',
  shawshank: 'https://image.tmdb.org/t/p/original/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
  coco: 'https://image.tmdb.org/t/p/original/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg',
  johnwick: 'https://image.tmdb.org/t/p/original/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg',
};

export const FALLBACK_POSTER = 'https://image.tmdb.org/t/p/original/8kSerJrhrJWKLk1LViesGcnrUPE.jpg';

export const getMovieImage = (movie) => IMAGE_BY_ID[movie.id] || FALLBACK_POSTER;