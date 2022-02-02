

class MarvelService {

    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=18b4ecc9bdc0ed211ad880b5696d48c1';


    
     getResource = async (url) => {
        let res = await fetch(url);
    
        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }
    
        return await res.json();
    }

    getAllCharacters = async (limit) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=${limit}&offset=210&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter); // Каждый отдельный объект по порядку будет браться из полученных данных
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (res) => { // Берем промис, полученный и вернеи по этому шаблону объект
        return {
            id: res.id,
            name: res.name,
            description: res.description ? res.description + '...' : 'Описание отсутствует',
            thumbnail: res.thumbnail.path + '.' + res.thumbnail.extension,
            homepage: res.urls[0].url,
            wiki: res.urls[1].url
        }
    }
}


// function consLog (item, i) {
//     console.log(`${item} index = ${i}`)
// }

// const array = [1, 2, 3, 5, 6];
// const newArray = array.map(consLog);



export default MarvelService;