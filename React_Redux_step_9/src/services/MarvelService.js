class MarvelService {
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  _apiKey = "apikey=6f2c299f0d97d4be32e039b7433c3115";
  _baseOffset = 210;
  // _secondApi = "https://jsonplaceholder.typicode.com/posts";
  // _photosApi = "https://jsonplaceholder.typicode.com/photos";

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  getAllCharacters = async (offset = this._baseOffset) => {
    const res = await this.getResource(
      `${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`
    );

    return res.data.results.map(this._transformCharacter);
  };

  getCharacter = async (id) => {
    const res = await this.getResource(
      `${this._apiBase}characters/${id}?${this._apiKey}`
    );
    return this._transformCharacter(res.data.results[0]);
  };

  _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.title,
      thumbnail: char.thumbnailUrl,
      homepage: char.url,
      wiki: char.url,
      comics: char.comics.items,
    };
  };
}

export default MarvelService;
