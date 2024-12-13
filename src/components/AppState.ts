import { IProductItem, IOrder } from '../types';

export class AppState {
	public catalog: IProductItem[] = [];
	public preview: IProductItem | null = null;
	public basket: IProductItem[] = [];
	public order_form: IOrder = {
		// items: [],
		// totalPrice: 0,
		payment: '',
		address: '',
		phone: '',
		email: '',
	};
	public loading: boolean = false;

	// Метод для добавления товара в корзину
	add_to_cart(product: IProductItem): void {
		this.basket.push(product);
	}

	// Метод для удаления товара из корзины
	remove_from_cart(productId: string): void {
		this.basket = this.basket.filter((item) => item.id !== productId);
	}

	// Метод для установки данных формы заказа
	set_order_form(fn: (order: IOrder) => IOrder): void {
		const formform = fn(this.order_form);
		console.log(formform);
		this.order_form = fn(this.order_form);
	}

	// Метод для получения каталога товаров
	get_catalog(): IProductItem[] {
		return this.catalog;
	}

	// Метод для установки каталога
	set_catalog(products: IProductItem[]): void {
		this.catalog = products;
	}

	// Метод для получения товаров в корзине
	get_basket(): IProductItem[] {
		return this.basket;
	}

	// Метод для проверки наличия товара в корзине
	includes_basket(productId: string): boolean {
		return this.basket.some((item) => item.id === productId);
	}

	// Метод для получения количества товаров в корзине
	get_basket_counter(): number {
		return this.basket.length;
	}

	// Метод для получения общей суммы товаров в корзине
	get_basket_total(): number {
		return this.basket.reduce(
			(total, item) => (item.price ? total + item.price : total),
			0
		);
	}

	// Метод для валидации данных пользователя
	validate_user_info(userInfo: IOrder): boolean {
		
		return true; 
	}

	// Метод для получения данных пользователя
	get_user_info(): Partial<IOrder> {
		return {
			items: this.basket.map((item) => item.id), 
			...this.order_form, 
		};
	}

	// Метод для удаления товара из корзины
	remove_item(productId: string): void {
		this.remove_from_cart(productId);
	}

	// Метод для формирования объекта заказа для отправки на сервер
	create_order_for_server(): IOrder {
		return {
			items: this.basket.map((item) => item.id), // Возвращаем массив ID товаров в заказе
			...this.order_form, 
			totalPrice: this.get_basket_total(), 
		};
	}
}
