# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```


## Архитектура

Используем архитектуру MVVM (Model-View-ViewModel), что обеспечит легкое связывание данных и управление состоянием приложения. Основные компоненты включают:

### СЛОЙ МОДЕЛЬ (Model)

Слой «Модель» содержит классы, отвечающие за бизнес-логику и управление данными, а также взаимодействие с API.

1. Класс Api
- Назначение: Интерфейс для работы с API, ответственный за запросы и обработку ответов.
- Методы:
- fetchProducts(): Promise<Product[]> — получает список всех доступных товаров.
- addToCart(item: CartItem): Promise<void> — добавляет товар в корзину.
- removeFromCart(itemId: number): Promise<void> — удаляет товар из корзины.

2. Класс ShopApi
- Назначение: Реализация интерфейса Api для взаимодействия с сервером интернет-магазина.
- Методы:
- fetchProducts() — получает список товаров с сервера.
- addToCart(item: CartItem) — добавляет товар в корзину на сервере.
- removeFromCart(itemId: number) — удаляет товар из корзины на сервере.

3. Класс AppState
- Назначение: Хранит глобальное состояние приложения.
- Поля:
- basket: Basket — текущее состояние корзины.
- products: Product[] — список доступных товаров.
- Методы:
- updateBasket(items: CartItem[]): void — обновляет текущее состояние корзины.

4. Класс Product
- Назначение: Модель для представления товара.
- Поля:
- id: number — уникальный идентификатор товара.
- title: string — название товара.
- category: string — категория товара.
- price: number — цена товара.
- Методы:
- getDetails(): string — возвращает строку с деталями товара.

5. Класс Basket
- Назначение: Управляет состоянием и содержимым корзины покупок.
- Поля:
- items: CartItem[] — массив товаров в корзине.
- total: number — общая стоимость товаров в корзине.
- Методы:
- setItems(items: CartItem[]): void — обновляет список товаров в корзине.
- setTotal(total: number): void — обновляет общую стоимость.
- addItem(item: CartItem): void — добавляет товар в корзину.
- removeItem(itemId: number): void — удаляет товар из корзины.

### СЛОЙ ВИД (View)

Слой «Представление» отвечает за отображение данных на экране и взаимодействие с пользователем.

1. Класс Component
- Назначение: Базовый класс для всех компонентов интерфейса.
- Методы:
- render(): void — отображает компонент.
- destroy(): void — очищает компонент и освобождает ресурсы.

2. Класс Modal
- Назначение: Управляет отображением модальных окон.
- Поля:
- content: string — содержимое модального окна.
- Методы:
- open(content: string): void — открывает модальное окно с содержимым.
- close(): void — закрывает модальное окно.
- setCloseListener(callback: () => void): void — устанавливает обработчик для закрытия окна.

3. Класс ProductCard
- Назначение: Отображает карточку товара.
- Поля:
- product: Product — экземпляр товара.
- Методы:
- render(): void — отображает информацию о товаре.
- onBuy(): void — обрабатывает нажатие кнопки "Купить", добавляя товар в корзину.

4. Класс BasketCard
- Назначение: Отображает список товаров в корзине.
- Поля:
- basket: Basket — экземпляр корзины.
- Методы:
- render(): void — отображает товары в корзине.
- onRemove(itemId: number): void — обрабатывает нажатие кнопки "Убрать", удаляя товар из корзины.

5. Класс ProductPreview
- Назначение: Отображает предварительный просмотр карточки товара.
- Поля:
- product: Product — экземпляр товара.
- Методы:
- render(): void — генерирует и отображает превью товара.

### СЛОЙ МОДЕЛЕЙ ВИДИ (ViewModel)

Слой «ViewModel» управляет взаимодействием между моделью и представлением, обеспечивая связывание данных и функциональность.

1. Класс EventDispatcher
- Назначение: Управляет событиями, регистрацией слушателей и их вызовом.
- Методы:
- on(event: string, listener: Function): void — добавляет слушателя на событие.
- off(event: string, listener: Function): void — удаляет слушателя с события.
- dispatch(event: string, data?: any): void — вызывает событие и передает данные.

2. Класс Presenter
- Назначение: Управляет взаимодействием между моделью и представлениями.
- Поля:
- basket: Basket — экземпляр корзины.
- modal: Modal — экземпляр модального окна для отображения информации.
- Методы:
- addToCart(product: Product): void — добавляет товар в корзину и обновляет представление.
- removeFromCart(itemId: number): void — удаляет товар из корзины и обновляет представление.
- showProductDetails(product: Product): void — открывает модальное окно с информацией о товаре.
- validateAndProceedToCheckout(paymentMethod: string, deliveryAddress: string): boolean — проверяет введенные данные и позволяет перейти к оформлению заказа, если данные валидны.