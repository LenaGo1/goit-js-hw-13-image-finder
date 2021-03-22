//делаем класс
export default class PicturesApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;

    }

    fetchCards() {
        // console.log(this);
        const API_KEY = '20787237-e5477ba4413f136129185c6aa';
        const BASE_URL = 'https://pixabay.com/api/';
        const url = `${BASE_URL}?key=${API_KEY}&image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12`;  
    
        //возвращаем промис из функции fetchArticles
        return fetch(url)
            .then(response => response.json())
            //только после того как запрос успешный увеличиваем page на 1
            .then(data => {
                console.log(data);
                // console.log(this.data);
                this.page += 1;
                //значение промиса
                return data.hits;
            })
    }

    resetPage() {
        this.page = 1;
    }
    
    //наш сервис хранит searchQuery, который можно взять или перезаписать через геттер и сеттер
    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}


