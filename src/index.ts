// src/index.ts
// import './scss/styles.scss';
// import { AppState } from './components/AppState';
// import { CardApi } from './components/CardApi';
// import { ProductCard } from './components/ProductCard';
// import { EventEmitter } from './components/EventEmitter';
// import { IProductItem } from './types/index';
// import { ProductPresenter } from './components/ProductPresenter';
// import { CDN_URL } from './utils/constants'; // Импортируем CDN_URL из утилит

// const appState = new AppState();
// const cardApi = new CardApi();
// const eventEmitter = new EventEmitter();
// const productPresenter = new ProductPresenter(appState, cardApi, eventEmitter); // Объявление productPresenter

// // Функция для обновления галереи продуктов
// const updateCards = () => {
//     const gallery = document.querySelector<HTMLElement>('.gallery');

//     if (gallery) {
//         gallery.innerHTML = ''; // Очищаем текущие карточки
//         appState.get_catalog().forEach((item: IProductItem) => {
//             const cardContainer = document.createElement('div');
//             cardContainer.className = 'card card_full'; // Применяем нужный класс
            
//             // Создаем экземпляр ProductCard
//             const productCard = new ProductCard(cardContainer);
//             try {
//                 productCard.setTitle(item.title);
//                 productCard.setCategory(item.category);
//                 productCard.setImage(CDN_URL + item.image); // Проверка правильности пути к изображению
//                 productCard.setPrice(item.price);
//             } catch (error) {
//                 console.error('Ошибка при настройке карточки:', error);
//             }

//             // Добавляем карточку в галерею
//             gallery.appendChild(cardContainer);
//         });
//     } else {
//         console.error('Контейнер галереи не найден!');
//     }
// };

// // Подписка на события
// eventEmitter.on('productsLoaded', updateCards);
// // Загружаем продукты с API
// eventEmitter.emit('loadProducts');
