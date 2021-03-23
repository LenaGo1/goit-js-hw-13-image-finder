import '../styles.css';
//импортируем класс
import PicturesApiService from './apiService';
import cardTemplate from '../templates/card-template.hbs'

const refs = {
    searchForm: document.querySelector('.search-form'),
    submitBtn: document.querySelector('.btn-submit'),
    loadMoreBtn: document.querySelector('.btn-load-more'),
    gallery: document.querySelector('.gallery'),
}

let heightContainer;

//делаем экземпляр класса
const picturesApiService = new PicturesApiService();

refs.searchForm.addEventListener("submit", onSearch);
refs.loadMoreBtn.addEventListener("click", onLoadMore);


function onSearch(e) {
    e.preventDefault();

    //очищаем контейнер при сабмите формы
    clearGalleryContainer();

    refs.loadMoreBtn.classList.add('is-hidden');

    //при помощи сеттера в объект picturesApiService в его свойство searchQuey записали то что получаем из формы при сабмите формы 
    picturesApiService.query = e.currentTarget.elements.query.value.trim();
    
    //сбрасываем параметр page до 1 при сабмите формы (при смене запроса)
    picturesApiService.resetPage();
    
    picturesApiService.fetchCards().then(appendPicturesMarkup)
        .then(() => {
        heightContainer = refs.gallery.offsetHeight
        })
        .then(() => {
        refs.loadMoreBtn.classList.remove('is-hidden');
    })

    // setTimeout(() => {
    //     heightContainer = refs.gallery.offsetHeight
    // }, 700);

    // setTimeout(() => {
    //     refs.loadMoreBtn.classList.remove('is-hidden');
    // }, 700);

}
    
function onLoadMore() {
    
    picturesApiService.fetchCards().then(appendPicturesMarkup)
        .then(scrollDown);
    
    // setTimeout(scrollDown, 700)    
}

function appendPicturesMarkup(hits) {
    refs.gallery.insertAdjacentHTML('beforeend', cardTemplate(hits))
}

function clearGalleryContainer() {
    refs.gallery.innerHTML = "";
    
}

function scrollDown() {
    const heidhtButtonLoadMore = document.querySelector('[data-action="load-more"]').offsetHeight;
    
    const difference = heightContainer + heidhtButtonLoadMore;
    const scrollHeight = document.body.clientHeight - difference;
    let scrollOptions = {
        top: scrollHeight,
        behavior: 'smooth'
    }
    window.scrollTo(scrollOptions);
}