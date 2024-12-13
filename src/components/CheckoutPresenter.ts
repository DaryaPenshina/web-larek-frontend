import { Basket } from './Basket';
import { OrderPay } from './OrderPay'; 
import { OrderContact } from './OrderСontact'; 

export class CheckoutPresenter {
    private form: OrderPay | OrderContact; 
    private basket: Basket;

    constructor(form: OrderPay | OrderContact, basket: Basket) {
        this.form = form;
        this.basket = basket;

        this.setup_form_event(); 
    }

    private setup_form_event() {
        this.form.container.addEventListener('submit', (event: Event) => {
            event.preventDefault(); 
            this.submit_order(); 
        });
    }

    public submit_order() {
        console.log('Submitting order');
        // Логика отправки заказа
        this.reset_form(); 
    }

    public reset_form() {
        // Логика сброса формы
    }

    public update_basket_on_checkout() {
        
    }
}