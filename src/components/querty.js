export class Querty {
  constructor() {
    this.APIURL = 'https://api.themoviedb.org/3';
  }

  async getResource(url) {
    const res = await fetch(`${this.APIURL}${url}`);

    if (!res.ok) {
      throw new Error('Vse ploxo');
    }
    return await res.json();
  }

  getAllMovies(page, name) {
    return this.getResource(
      `/search/movie?api_key=e3c7bd01103073ebcb552edef41991b9&language=en-US&page=${page}&query=${name}`
    );
  }

  searchMovie() {
    return this.getResource('/search/movie?api_key=e3c7bd01103073ebcb552edef41991b9&language=en-US&page=1&query=true');
  }
}
