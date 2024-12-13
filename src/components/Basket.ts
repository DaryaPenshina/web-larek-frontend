export class Basket {
	private items: {
		id: string;
		title: string;
		price: number | null;
		quantity: number;
	}[] = [];
	private container: HTMLElement;

	constructor(container: HTMLElement) {
		this.container = container;
		this.updateView();
	}

	public getItems(): {
		id: string;
		title: string;
		price: number | null;
		quantity: number;
	}[] {
		return this.items;
	}
	public getTotalPrice(): number {
		return this.items.reduce((total, item) => total + (item.price || 0), 0);
	}

	public addItem(item: {
		id: string;
		title: string;
		price: number | null;
		quantity?: number;
	}) {
		const existingItem = this.items.find((i) => i.id === item.id);
		if (existingItem) {
			existingItem.quantity += item.quantity || 1;
		} else {
			this.items.push({ ...item, quantity: item.quantity || 1 });
		}
		this.updateView();
	}

	public clear() {
		this.items = [];
		this.updateView();
	}

	public updateView() {
		const basketList = this.container.querySelector(
			'.basket__list'
		) as HTMLElement;
		const basketPrice = this.container.querySelector(
			'.basket__price'
		) as HTMLElement;
		const checkoutButton = this.container.querySelector(
			'.checkout-button'
		) as HTMLElement;

		if (!basketList) {
			console.error(
				'Корзина не найдена: элемент с классом .basket__list отсутствует в контейнере.'
			);
			return;
		}

		// Очистка содержимого перед обновлением
		basketList.innerHTML = '';

		// Получаем товары из корзины
		const itemsInBasket = this.getItems();
		let total = 0;

		itemsInBasket.forEach((item, index) => {
			const listItem = document.createElement('li');
			listItem.className = 'basket__item card card_compact';

			// Индекс товара в корзине
			const indexElement = document.createElement('span');
			indexElement.className = 'basket__item-index';
			indexElement.textContent = `${index + 1}`;

			// Название товара
			const titleElement = document.createElement('span');
			titleElement.className = 'card__title';
			titleElement.textContent = item.title;

			// Цена товара
			const priceElement = document.createElement('span');
			priceElement.className = 'card__price';
			priceElement.textContent = `${
				item.price !== null ? item.price : 'Бесценно'
			} синапсов`;

			// Кнопка удаления товара
			const deleteButton = document.createElement('button');
			deleteButton.className = 'basket__item-delete';

			// Обработчик удаления
			deleteButton.addEventListener('click', () => {
				this.removeItem(item.id);
			});

			total += item.price !== null ? item.price * item.quantity : 0; // Считаем общую стоимость

			listItem.appendChild(indexElement);
			listItem.appendChild(titleElement);
			listItem.appendChild(priceElement);
			listItem.appendChild(deleteButton);
			basketList.appendChild(listItem); // Добавляем новый элемент в список корзины
		});

		// Обновляем общую цену
		basketPrice.textContent = `${total} синапсов`;

		// Если корзина пустая, отображаем соответствующее сообщение
		if (this.items.length === 0) {
			const emptyMessage = document.createElement('li');
			emptyMessage.className = 'basket__empty-message'; // Добавляем класс для стилей
			basketList.appendChild(emptyMessage);
		}

		// Устанавливаем видимость кнопки "Оформить"
		if (checkoutButton) {
			checkoutButton.style.display = this.items.length > 0 ? 'block' : 'none';
		}
	}

	private removeItem(itemId: string) {
		this.items = this.items.filter((item) => item.id !== itemId);
		this.updateView(); // Обновляем представление после удаления
	}
}
