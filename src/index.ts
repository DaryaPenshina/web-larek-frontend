import './scss/styles.scss';
import { CardApi } from './components/CardApi';
import { API_URL } from './utils/constants';
import { ProductCard } from './components/ProductCard';
import { IProductItem } from './types/index';
import { Basket } from './components/Basket';
import { AppState } from './components/AppState';
import { Presenter } from './components/Presenter';
import { CheckoutPresenter } from './components/CheckoutPresenter';
import { OrderPay } from './components/OrderPay';
import { OrderContact } from './components/OrderСontact';
import { Result } from './components/Result';

const cardApi = new CardApi(API_URL);
const appState = new AppState();
let loadedProducts: IProductItem[] = [];
let presenter: Presenter;
let checkoutPresenter: CheckoutPresenter;

// Функция для получения продуктов
async function fetchProducts() {
	try {
		const products = await cardApi.get_product();
		console.log('Products:', products);
		loadedProducts = products;
		displayProductCards(products);
	} catch (error) {
		console.error('Ошибка при получении продуктов:', error);
		const catalogContainer = document.querySelector('.gallery');
		if (catalogContainer) {
			catalogContainer.innerHTML =
				'<p>Ошибка загрузки продуктов. Попробуйте позже.</p>';
		}
	}
}

// Функция для отображения карточек продуктов
function displayProductCards(products: IProductItem[]) {
	const catalogContainer = document.querySelector('.gallery');
	if (catalogContainer) {
		catalogContainer.innerHTML = '';
		products.forEach((product) => {
			const cardTemplate = document.getElementById(
				'card-catalog'
			) as HTMLTemplateElement;
			const cardClone = document.importNode(cardTemplate.content, true);
			const cardElement = cardClone.querySelector('.card') as HTMLElement;

			const productCard = new ProductCard(cardElement, product, {
				openCard: () => {
					console.log('Product card clicked');
					productCard.open_card();
				},
				addToBasket: (item) => {
					appState.add_to_cart(item);
					const basketCounter = document.querySelector(
						'.header__basket-counter'
					);
					basketCounter.innerHTML = appState.get_basket_counter().toString();
				},
			});
			catalogContainer.appendChild(cardElement);
		});
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const modal = document.createElement('div');
	document.body.appendChild(modal);

	const basketButton = document.querySelector('.header__basket') as HTMLElement;
	fetchProducts();

	basketButton.addEventListener('click', () => {
		const basketTemplate = document.getElementById(
			'basket'
		) as HTMLTemplateElement;
		const basketClone = document.importNode(basketTemplate.content, true);

		Object.assign(modal.style, {
			display: 'block',
			justifyContent: 'center',
			alignItems: 'center',
			position: 'fixed',
			top: '50%',
			left: '50%',
			width: '1320px',
			height: '645px',
			transform: 'translate(-50%, -50%)',
			borderRadius: '60px',
			background: 'rgba(30, 51, 79)',
			zIndex: '1000',
			padding: '2rem',
		});

		modal.innerHTML = '';
		modal.appendChild(basketClone);

		const basketContainer = modal.querySelector('.basket') as HTMLElement;
		const basket = new Basket(basketContainer);
		const itemsInBasket = appState.get_basket();
		itemsInBasket.forEach((item) => {
			basket.addItem(item);
		});

		presenter = new Presenter(basket, modal, appState);
		basket.updateView();

		const closeButton = document.createElement('button');
		closeButton.classList.add('modal__close');
		closeButton.addEventListener('click', () => {
			modal.style.display = 'none';
			modal.innerHTML = '';
		});
		modal.appendChild(closeButton);

		// Кнопка "Оформить"
		const checkoutButton = modal.querySelector(
			'.basket__button'
		) as HTMLElement;
		if (checkoutButton) {
			checkoutButton.style.display = basket.getItems().length
				? 'block'
				: 'none';
			checkoutButton.addEventListener('click', () => {
				openOrderModal(modal, basket);
			});
		}

		basket.updateView();
	});
});

function openOrderModal(modal: HTMLElement, basket: any) {
    // Создаем обработчик для закрытия модального окна
    const handleClose = () => {
        modal.style.display = 'none'; // Скрываем модальное окно
    };
    
    clearModalContent(modal);

    // Создаем экземпляр OrderPay с необходимыми параметрами
    const orderPay = new OrderPay(modal, { onClose: handleClose });

    // Создаем содержимое из шаблона order
    const orderTemplate = document.getElementById('order') as HTMLTemplateElement;
    if (orderTemplate) {
        const orderClone = document.importNode(orderTemplate.content, true);
        modal.appendChild(orderClone); // Добавляем копию содержимого в модальное окно
    } else {
        console.error('Шаблон order не найден.');
        return;
    }

    // Получаем кнопки оплаты и кнопку "Далее"
    const paymentButtons = modal.querySelectorAll('.order__buttons button');
    const nextButton = getModalContainer(modal, '.order__button') as HTMLButtonElement;

    // Обработчик для кнопок выбора способа оплаты
    paymentButtons.forEach((button) => {
        button.addEventListener('click', () => {
            
            paymentButtons.forEach((btn) => btn.classList.remove('active'));
            button.classList.add('active');

            nextButton.disabled = false; 
        });
    });

    // Проверяем, существует ли кнопка "Далее" перед установкой слушателя
    if (nextButton) {
        nextButton.addEventListener('click', (e) => {
            e.preventDefault();
            const formData = orderPay.get_data();
            appState.set_order_form((state) => {
                return {
                    ...state,
                    ...formData,
                };
            });

            showContactFormModal(modal, basket); 
        });
    } else {
        console.error('Кнопка .order__button не найдена в модальном окне.', modal);
    }

    
    modal.appendChild(orderPay.close); // Добавляем кнопку закрытия в модальное окно

  
    openModal(modal);
}

function showContactFormModal(modal: HTMLElement, basket: Basket) {
    const contactFormTemplate = document.getElementById('contacts') as HTMLTemplateElement;

    if (contactFormTemplate) {
        const contactClone = document.importNode(contactFormTemplate.content, true);
        
        clearModalContent(modal);
        modal.appendChild(contactClone);

        const orderContact = new OrderContact(modal, () => {
            modal.style.display = 'none';
        });
        
        const paymentButton = modal.querySelector('form[name="contacts"] .button') as HTMLButtonElement;
        if (paymentButton) {
            paymentButton.addEventListener('click', () => {
                const isValid = true; 

                if (isValid) {
                    modal.style.display = 'none';

                    
                    if (modal) {
                        openResultModal(modal, basket);
                    } else {
                        console.error('Модальное окно для результата не найдено.');
                    }
                } else {
                    alert("Пожалуйста, исправьте ошибки в форме.");
                }
            });
        }
        
        openModal(modal);
    } else {
        console.error('Шаблон контактной формы не найден.');
    }
}

function openResultModal(modal: HTMLElement, basket: Basket) {
    const resultTemplate = document.getElementById('success') as HTMLTemplateElement;
    const resultClone = document.importNode(resultTemplate.content, true);

    clearModalContent(modal); // Очищаем текущее содержимое модального окна

    const result = new Result(modal, {
        onClose: () => {
            modal.style.display = 'none'; 
        },
    });

    const totalAmount = basket.getTotalPrice(); // Получаем общую сумму из корзины
    result.set_total(totalAmount); // Устанавливаем сумму в результат

   
    modal.appendChild(resultClone);

    const descriptionElement = modal.querySelector('.order-success__description') as HTMLElement;
    if (descriptionElement) {
        descriptionElement.innerText = `Списано ${totalAmount} синапсов`; 
    }

    modal.appendChild(result.close); 
    openModal(modal); 
}


function openModal(modal: HTMLElement) {
	modal.style.display = 'block';
}

function clearModalContent(modal: HTMLElement) {
	modal.innerHTML = ''; 
}

function getModalContainer(
	modal: HTMLElement,
	selector: string
): HTMLElement | null {
	return modal.querySelector(selector) as HTMLElement | null;
}

