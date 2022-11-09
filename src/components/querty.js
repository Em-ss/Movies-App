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
  async getResourcePOST(url, star) {
    const res = await fetch(`${this.APIURL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value: star }),
    });

    if (!res.ok) {
      throw new Error('Vse ploxo');
    }
    return await res.json();
  }

  getAllMovies(page, name) {
    return this.getResource(
      `/search/movie?api_key=4158dc7df2e1782751f47547e3ae9bc1&language=en-US&page=${page}&query=${name}`
    );
  }

  newSession() {
    return this.getResource('/authentication/guest_session/new?api_key=4158dc7df2e1782751f47547e3ae9bc1');
  }

  getRatedMovies(sessionId) {
    return this.getResource(
      `/guest_session/${sessionId}/rated/movies?api_key=4158dc7df2e1782751f47547e3ae9bc1&language=en-US&sort_by=created_at.asc`
    );
  }
  setRatedMovie(id, sessionId, star) {
    return this.getResourcePOST(
      `/movie/${id}/rating?api_key=4158dc7df2e1782751f47547e3ae9bc1&guest_session_id=${sessionId}`,
      star
    );
  }
}
