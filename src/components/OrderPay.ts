import { Order } from './Order';

export class OrderPay extends Order {
	private payment: string; // Способ оплаты
	private address: string; // Адрес доставки
	public close: HTMLButtonElement;

	constructor(container: HTMLElement, options: { onClose: () => void }) {
		super(container);
		this.payment = '';
		this.address = '';
		this.setupPaymentButtons();

		// Создаем кнопку закрытия
		this.close = document.createElement('button');
		this.close.classList.add('modal__close');
		this.close.addEventListener('click', options.onClose);
	}

	private setupPaymentButtons() {
		const cardButton = this.getContainer().querySelector(
			'button[name="card"]'
		) as HTMLButtonElement;
		const cashButton = this.getContainer().querySelector(
			'button[name="cash"]'
		) as HTMLButtonElement;

		if (cardButton) {
			cardButton.addEventListener('click', () => this.set_payment('card'));
		}

		if (cashButton) {
			cashButton.addEventListener('click', () => this.set_payment('cash'));
		}
	}

	private getContainer(): HTMLElement {
		return this.container;
	}

	public set_payment(payment: string) {
		this.payment = payment;
		console.log(`Выбранный способ оплаты: ${this.payment}`);
	}

	public set_address(address: string) {
		this.address = address;
	}

	public get_data() {
		return {
			address: this.address,
			payment: this.payment,
		};
	}
}


function openModal(modal: HTMLElement) {
	modal.style.display = 'block'; 
}

// Функция для очистки содержимого модального окна
function clearModalContent(modal: HTMLElement) {
	while (modal.firstChild) {
		modal.removeChild(modal.firstChild);
	}
}
