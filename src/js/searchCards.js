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

    //не пропускаем пустой ввод
    if (!picturesApiService.query) {
        return;
    }
    
    //сбрасываем параметр page до 1 при сабмите формы (при смене запроса)
    picturesApiService.resetPage();
    
    picturesApiService.fetchCards()
        .then(appendPicturesMarkup)
        .then(() => {
        refs.loadMoreBtn.classList.remove('is-hidden');
    })

}
    
function onLoadMore() {
    
    picturesApiService.fetchCards()
        
        .then((data) => {
            const top = refs.gallery.offsetTop + refs.gallery.clientHeight;
            appendPicturesMarkup(data);
            window.scrollTo({top, behavior: 'smooth'})
        })        
}

function appendPicturesMarkup(hits) {
    refs.gallery.insertAdjacentHTML('beforeend', cardTemplate(hits))
}

function clearGalleryContainer() {
    refs.gallery.innerHTML = "";    
}
