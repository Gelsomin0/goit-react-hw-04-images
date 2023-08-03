const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '37084690-566054f69b0903988f9ff1e75';

export const getSearchData = (searchText, page) => {
    return fetch(`${BASE_URL}?q=${searchText}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`);
}