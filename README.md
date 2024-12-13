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
- src/scss/styles.scss — корневой файл стилей
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

## Данные и типы данных, используемые в приложении
Карточка

interface ICardItem {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  price: number | null;
}

Интерфейс для модели данных карточек

interface IProductsList {
  products: ICardItem[];
  preview: string | null;
}

Этот интерфейс представляет результат оформления заказа, который может содержать идентификатор созданного заказа

interface IOrderResult {
  id: string;
}

## Архитектура

Используем архитектуру MVP (Model-View-Presenter), обеспечивающую разделение логики приложения и их представления. 

### Основные части архитектуры проекта:

1. Слой МОДЕЛЬ (Model):
- Отвечает за данные приложения и бизнес-логику, взаимодействие с API и управление состоянием.

2. Слой ПРЕДСТАВЛЕНИЕ (View):
- Отвечает за отображение данных на экране и взаимодействие с пользователем.


3. Слой ПРЕЗЕНТЕР (Presenter):
- Обеспечивает связь между моделью и представлениями, управляет логикой взаимодействия.
- Презентеры управляют всеми пользовательскими событиями, передавая данные от представлений к модели и обратно.

### Базовый код

#### Класс Api
Содержит в себе базовую логику отправки запросов. В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.
- Методы:
`get` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает пропис с объектом, которым ответил сервер
`post` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отпралвяет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется POST запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.
`handleResponse` - обработка ответа сервера, возвращает либо JSON либо объект ошибки

#### Класс EventEmitter
Брокер событий позволяет отправлять события и подписываться на события, происходящие в системе. Класс используется в презентере для обработки событий и в слоях приложения для генерации событий.
Основные методы:
`on` - подписка на событие
`emit` - инициализация события
`trigger` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие

### СЛОЙ МОДЕЛЬ (Model)

#### Класс CardApi

Этот класс отвечает за взаимодействие с API , обеспечивая методы для получения данных о продуктах и списка заказов.

Конструктор
- принимает передает в родительский конструктор Api поля baseUrl 
- принимает и сохраняет входящий url запроса 

Поля:

`BASE_URL` строка, содержащая базовый URL для API.

Методы:

`get_products` выполняет GET-запрос к API для получения списка всех продуктов. Возвращает список продуктов в формате JSON.
`place_order` принимает объект с данными заказа и выполняет POST-запрос для размещения заказа на сервере. Возвращает ответ сервера в формате JSON.

#### Класс AppState

Этот класс представляет состояние приложения, храня данные о продуктах, корзине и данных заказа.

Поля:

`catalog: ICardItem[]` список объектов продуктов, доступных в магазине.
`preview: string` ссылка  на элемент, который находится в режиме предварительного просмотра
`basket: ICardItem[]` список объектов продуктов, добавленных в корзину.



Методы:

`add_to_cart`- принимает объект продукта и добавляет его в корзину.
`remove_from_cart`- принимает идентификатор продукта и удаляет его из корзины.
`set_order_form`- устанавливает данные формы заказа.
`get_catalog`- возвращает список доступных продуктов из каталога.
`set_catalog`- принимает список продуктов и обновляет каталог.
`get_basket` - метод для получения массива товаров в корзине.
`includes_basket` - метод для проверки наличий товара в корзине
`get_basket_counter` - метод для получения количества товаров в корзине
`get_basket_total` - метод для получения суммы товаров в корзине
`validate_user_info` метод для валидации данных пользователя
`get_user_info` метод для получения данных пользователя для формирования заказа для сервера
`remove_item` удаляет товар из корзины
`create_order_for_server` метод для формирования объекта заказа для отправки на сервер, используя данные из заказа, а также суммируя и получая список товаров из корзины


### СЛОЙ ВИД (View)

#### Класс ProductCard

Этот класс представляет собой компонент пользовательского интерфейса для отображения карточки продукта, , так и для предпросмотра.

Конструктор

При создании экземпляра класса ProductCard передаётся контейнер. Также сохраняются необходимые элементы разметки. Если передан объект actions, добавляется обработчик клика на контейнер.

Поля:
`title`: Элемент DOM для отображения названия карточки
`category`: Элемент DOM для отображения категории карточки
`image`: Элемент изображения, отображающий картинку карточки
`price`: Элемент DOM для отображения цены карточки
`card_data`: Данные карточки товара

Методы:

`set_title`: Устанавливает текст элемента _title. Обновляет содержимое с помощью метода из базового класса.
`set_category`: Устанавливает текст элемента _category и CSS-класс в зависимости от категории.
`set_image`: Обновляет атрибут src элемента _image 
`set_price`: Устанавливает текст элемента _price. Если значение null, отображается "Бесценно", иначе — цена с текстом "синапсов"
`open_card`: Запускает событие открытия полной карточки товара

#### Класс Basket

Класс Basket управляет корзиной покупок на веб-странице, отображая товары и их общую стоимость. 

Конструктор принимает контейнер типа HTMLElement и объект событий типа IEvent. Он сохраняет необходимые элементы:

Поля

`items`:  список товаров в корзине.
`container` -  контейнер для представления корзины
Методы

`set_items`: Устанавливает новые товары в корзину. Если массив пустой, отображает сообщение "Корзина пуста".
`get_total_price` получает общую стоимость товаров в корзине
`remove_item` удаляет товар из корзины
`on_order` метод запуска события оформления заказа
`getItems` получения списка товаров в корзине
`addItem` Метод для добавления товара в корзину
`clear` Метод для очистки корзины



#### Класс Order

Класс Order управляет формами оформления заказа. 

Конструктор

Принимает элемент контейнера типа HTMLElement и объект событий типа IEvent, сохраняет нужные элементы формы. 

Поля

`stage` состояние этапов оформления

Методы

`set_stage` меняет этапы оформления
`pay` запускает событие оплаты
`addCloseButton` Метод для добавления кнопки закрытия в модальное окно
`clearModalContent` Метод для очищения содержимого модального окна


#### Класс OrderPay

Класс OrderPay управляет формой оформления заказа с указанием способа оплаты и адресса доставки , наследуется от Order

Конструктор

Принимает элемент контейнера типа HTMLElement и объект событий типа IEvent, сохраняет нужные элементы формы. На кнопки выбора способа оплаты добавляет обработчик клика, который активирует соответствующую кнопку.

Поля

`payment` - состояние способа оплаты
`adress` адрес доставки
`close`  закрытие окна

Методы

`setupPaymentButtons`: Устанавливает активное состояние для кнопок оплаты.
`set_address`: Устанавливает значение поля адреса в форме.
`getContainer` Возвращает контейнер модального окна.
`set_payment` Устанавливает способ оплаты.
`get_data` Возвращает данные, связанные с заказом, включая адрес и способ оплаты.
`openModal` Показывает модальное окно.
`clearModalContent`  Очищает содержимое модального окна.


#### Класс OrderСontact

Класс OrderСontact управляет формой оформления заказа с указанием почты и телефона, наследуется от Order

Конструктор

Принимает элемент контейнера типа HTMLElement и объект событий типа IEvent, сохраняет нужные элементы формы. 

Поля

`email` почта
`phone` телефон
close  Кнопка закрытия

Методы

`set_phone`: Устанавливает значение поля телефона.
`set_email`: Устанавливает значение поля электронной почты.
`setupCloseButton` Настраивает кнопку закрытия модального окна.
`setupContactForm` Настраивает контактную форму для ввода данных.
`processContactData`Обрабатывает собранные данные контактной формы после отправки
`get_data` Возвращает данные, связанные с контактной информацией.



#### Класс Result

Класс Result отвечает за отображение успешного оформления заказа в модальном окне

Конструктор

Принимает элемент контейнера типа HTMLElement и опциональный объект действий. сохраняет необходимые элементы и, если передан объект действий, добавляет обработчик клика на кнопку закрытия.

Поля

`total`: хранит элемент с общей суммой заказа.
`close`: хранит элемент кнопки для закрытия окна.

Методы

`set_total`: Устанавливает значение общей суммы заказа. 
`openModal` Показывает модальное окно.
`clearModalContent`  Очищает содержимое модального окна.

### СЛОЙ ПРЕЗЕНТЕР (Presenter)

#### Класс Presenter
Назначение: Управляет взаимодействием между моделью и представлениями.
Поля

`modal`: объект, представляющий модальное окно
`appState`: объект, представляющий состояние приложения.
`basket` экземпляр класса Basket, который будет использован для управления корзиной покупок

Методы
`addProductToBasket`Добавляет продукт в корзину
`add_to_cart` Добавляет товар в корзину, возможно, выполняя дополнительную бизнес-логику
`remove_from_cart` Удаляет товар из корзины по его идентификатору.
`show_product_details`Отображает детали товара
`update_view`Обновляет представление в приложении


#### Класс CheckoutPresenter
Назначение: Управляет процессом оформления заказа.
Поля:
`form`  — экземпляр формы для ввода данных.
`basket` — экземпляр корзины.
Методы:

`setup_form_event` Настраивает обработчик события отправки формы.
`submit_order`  — управляет отправкой заказа и обработкой данных формы.
`reset_form`  — очищает поля формы после успешного оформления заказа, чтобы позволить пользователю начать новый процесс оформления.
`update_basket_on_checkout`  — обновляет состояние корзины, удаляя товары и сбрасывая их при успешном оформлении заказа.