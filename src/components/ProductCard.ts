import { CDN_URL } from '../utils/constants';
import { IProductItem } from '../types/index';
import { Basket } from './Basket';

export class ProductCard {
    private title: HTMLElement;
    private category: HTMLElement;
    private image: HTMLImageElement;
    private price: HTMLElement;
    private card_data: IProductItem;
    actions?: { openCard?: () => void, addToBasket?: (item: IProductItem) => void };

    constructor(container: HTMLElement, card_data: IProductItem, actions?: { openCard?: () => void, addToBasket?: (item: IProductItem) => void }) {
        this.card_data = card_data; // Инициализируем card_data
        this.title = container.querySelector('.card__title') as HTMLElement;
        this.category = container.querySelector('.card__category') as HTMLElement;
        this.image = container.querySelector('.card__image') as HTMLImageElement;
        this.price = container.querySelector('.card__price') as HTMLElement;

        // Заполняем элементы данными карточки
        this.init(card_data);

        this.actions = actions;

        if (actions && actions.openCard) {
            container.addEventListener('click', actions.openCard);
        }

        if (actions && actions.addToBasket) {
            const addToBasketButton = container.querySelector('.card__button') as HTMLElement;
            if (addToBasketButton) {
                addToBasketButton.addEventListener('click', (event) => {
                    event.stopPropagation(); // Предотвращаем всплытие события
                    console.log(`Добавление товара ${this.card_data.title} в корзину...`);
                    actions.addToBasket(this.card_data); // Передаем объект card_data в функцию добавления
                });
            }
        }
    }

    open_card(): void {
        console.log("Opening product card...");

        const template = document.getElementById('card-preview') as HTMLTemplateElement;

        if (!template) {
            console.error("Шаблон card-preview не найден!");
            return;
        }

        const clone = document.importNode(template.content, true);
        console.log("Card template cloned.");

        // Извлечь элементы из клона шаблона
        const previewTitle = clone.querySelector('.card__title') as HTMLElement;
        const previewCategory = clone.querySelector('.card__category') as HTMLElement;
        const previewImage = clone.querySelector('.card__image') as HTMLImageElement;
        const previewPrice = clone.querySelector('.card__price') as HTMLElement;
        const previewDescription = clone.querySelector('.card__text') as HTMLElement;

        // Заполнить клонированный шаблон данными продукта
        previewTitle.textContent = this.card_data.title;
        previewCategory.textContent = this.card_data.category;
        previewImage.src = `${CDN_URL}/${this.card_data.image}`;
        previewPrice.textContent = this.card_data.price !== null ? `${this.card_data.price} синапсов` : "Бесценно";
        previewDescription.textContent = this.card_data.description || "Описание отсутствует";

        const previewContainer = document.createElement('div');
        previewContainer.classList.add('card-preview-container');
        previewContainer.appendChild(clone);
        console.log("Preview card container created and appended.");

        // Создание наложения
        const overlay = document.createElement('div');
        overlay.classList.add('overlay'); // Добавляем класс overlay

        // Добавляем элементы в документ
        document.body.appendChild(overlay);
        document.body.appendChild(previewContainer);
        console.log("Preview card and overlay appended to body.");

        // Обработчик для закрытия (только при клике на наложение)
        const closeCard = () => {
            console.log("Closing product card...");
            document.body.removeChild(overlay); 
            document.body.removeChild(previewContainer); 
        };

        // Поведение при клике на наложение
        overlay.addEventListener('click', closeCard);

        // Добавляем функционал для кнопки "В корзину"
        const addToBasketButton = previewContainer.querySelector('.card__button') as HTMLElement;
        if (addToBasketButton) {
            addToBasketButton.addEventListener('click', (event) => {
                event.stopPropagation(); 
                console.log(`Добавление товара ${this.card_data.title} в корзину...`);
                this.actions.addToBasket?.(this.card_data); 
            });
        }
    }

    set_title(title: string): void {
        this.title.textContent = title;
    }

    set_category(category: string): void {
        this.category.textContent = category;

        const categoryColors: { [key: string]: string } = {
            'софт-скил': 'var(--category1)',
            'другое': 'var(--category2)',
            'дополнительное': 'var(--category3)',
            'кнопка': 'var(--category4)',
            'хард-скил': 'var(--category5)',
        };

        const color = categoryColors[category.toLowerCase()] || 'var(--defaultColor)';
        this.category.style.backgroundColor = color;

        if (!categoryColors[category.toLowerCase()]) {
            console.warn(`Неизвестная категория: ${category}`);
        }
    }

    set_image(imagePath: string): void {
        this.image.src = `${CDN_URL}/${imagePath}`;
    }

    set_price(price: number | null): void {
        this.price.textContent = price !== null ? `${price} синапсов` : "Бесценно";
    }

    init(card_data: IProductItem): void {
        this.card_data = card_data;
        this.set_title(card_data.title);
        this.set_category(card_data.category); 
        this.set_image(card_data.image);
        this.set_price(card_data.price);
    }
}