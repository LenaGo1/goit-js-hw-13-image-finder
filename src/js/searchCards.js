import '../styles.css';
//импортируем класс
import PicturesApiService from './apiService';
import cardTemplate from '../templates/card-template.hbs'

const refs = {
    searchForm: document.querySelector('.search-form'),
    submitBtn: document.querySelector('.btn-submit'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]'),
    gallery: document.querySelector('.gallery'),
}

//делаем экземпляр класса
const picturesApiService = new PicturesApiService();

refs.searchForm.addEventListener("submit", onSearch);
refs.loadMoreBtn.addEventListener("click", onLoadMore);
// refs.loadMoreBtn.addEventListener("click", scrollDown);

function onSearch(e) {
    e.preventDefault();

    //очищаем контейнер при сабмите формы
    clearGalleryContainer();

    //при помощи сеттера в объект picturesApiService в его свойство searchQuey записали то что получаем из формы при сабмите формы 
    picturesApiService.query = e.currentTarget.elements.query.value;
    
    //сбрасываем параметр page до 1 при сабмите формы (при смене запроса)
    picturesApiService.resetPage();
    
    picturesApiService.fetchCards().then(appendPicturesMarkup);
}
    
function onLoadMore() {
    picturesApiService.fetchCards().then(appendPicturesMarkup);
    // picturesApiService.scrollDown();
    setTimeout(scrollDown, 700)   
    
}

function appendPicturesMarkup(hits) {
    refs.gallery.insertAdjacentHTML('beforeend', cardTemplate(hits))
}

function clearGalleryContainer() {
    refs.gallery.innerHTML = "";
}

function scrollDown() {
    
    let scrollHeight = document.body.offsetHeight;
    console.log(scrollHeight);
    let scrollOptions = {
        top: scrollHeight,
        behavior: 'smooth'
    }
    window.scrollTo(scrollOptions);
}

