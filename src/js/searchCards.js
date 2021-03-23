import '../styles.css';
//импортируем класс
import PicturesApiService from './apiService';
import cardTemplate from '../templates/card-template.hbs';
import buttonLoadMore from '../templates/button-template.hbs';


const refs = {
    searchForm: document.querySelector('.search-form'),
    submitBtn: document.querySelector('.btn-submit'),
    gallery: document.querySelector('.gallery'),
}
let heightContainer;

//делаем экземпляр класса
const picturesApiService = new PicturesApiService();

// let page = picturesApiService.page;
refs.searchForm.addEventListener("submit", onSearch);

function onSearch(e) {
    e.preventDefault();

    //очищаем контейнер при сабмите формы
    clearGalleryContainer();

    //при помощи сеттера в объект picturesApiService в его свойство searchQuey записали то что получаем из формы при сабмите формы 
    picturesApiService.query = e.currentTarget.elements.query.value.trim();
    
    //сбрасываем параметр page до 1 при сабмите формы (при смене запроса)
    picturesApiService.resetPage();
    
    picturesApiService.fetchCards().then(appendPicturesMarkup).then(showLoadMoreButton);
}
    
function onLoadMore() {
    picturesApiService.fetchCards().then(appendPicturesMarkup).then(scrollDown);
    
    // page = picturesApiService.page;
}

function appendPicturesMarkup(hits) {
    refs.gallery.insertAdjacentHTML('beforeend', cardTemplate(hits))
}
let allowed_create_button = true;

function showLoadMoreButton() {
    if (allowed_create_button) {
        document.body.insertAdjacentHTML('beforeend', buttonLoadMore()) ;
        allowed_create_button = false;
        heightContainer = refs.gallery.offsetHeight;
        console.log(heightContainer);
    };
    
    const loadMoreBtn = document.querySelector('[data-action="load-more"]');
    loadMoreBtn.addEventListener("click", onLoadMore);
}

function clearGalleryContainer() {
    refs.gallery.innerHTML = "";
}

function scrollDown() {
    const heidhtButtonLodaMore = document.querySelector('[data-action="load-more"]').offsetHeight;
    console.log("высота кнопки " + heidhtButtonLodaMore);
    const difference = heightContainer + heidhtButtonLodaMore;
    const scrollHeight = document.body.clientHeight - difference;
   
    let scrollOptions = {
        top: scrollHeight,
        behavior: 'smooth'
    }
    window.scrollTo(scrollOptions);
}