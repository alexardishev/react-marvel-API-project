import {useHttp} from '../hooks/http.hook';

const useMarvelService = () => {

    const {loading, request, error, clearError, setLoading, process, setProcess} = useHttp();


   const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
   const  _apiKey = 'apikey=18b4ecc9bdc0ed211ad880b5696d48c1';



    
    //  getResource = async (url) => {
    //     let res = await fetch(url);
    
    //     if(!res.ok) {
    //         throw new Error(`Could not fetch ${url}, status ${res.status}`);
    //     }
    
    //     return await res.json();
    // }

   const getAllCharacters = async (offset, isLoad = false) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`, isLoad);
        return res.data.results.map(_transformCharacter); // Каждый отдельный объект по порядку будет браться из полученных данных
    }

   const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getCharacterName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
       return res.data.results[0] ? _transformCharacter(res.data.results[0]) : res.data;
    }

    const getAllComics = async (offset = 0) => {
        const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

   const _transformCharacter = (res) => { // Берем промис, полученный и вернеи по этому шаблону объект
        return {
            id: res.id,
            name: res.name,
            description: res.description ? res.description + '...' : 'Описание отсутствует',
            thumbnail: res.thumbnail.path + '.' + res.thumbnail.extension,
            homepage: res.urls[0].url,
            wiki: res.urls[1].url,
            comics: res.comics.items
        }
    }
    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-us',
            price: comics.prices.price ? `${comics.prices.price}$` : 'not available'
        }
    }

    return {
        loading, 
        error, 
        getAllCharacters, 
        getCharacter,
        getCharacterName, 
        getAllComics, 
        getComic, 
        clearError, 
        setLoading, 
        process,
        setProcess,
    }
}


// function consLog (item, i) {
//     console.log(`${item} index = ${i}`)
// }

// const array = [1, 2, 3, 5, 6];
// const newArray = array.map(consLog);



export default useMarvelService;