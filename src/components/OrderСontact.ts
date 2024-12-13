import { Order } from './Order';

export class OrderContact extends Order {
    private email: string; 
    private phone: string; 
    public close: HTMLButtonElement; 

    constructor(container: HTMLElement, onClose?: () => void) {
        super(container);
        this.email = '';
        this.phone = '';
    
        this.setupCloseButton(onClose); 
        this.setupContactForm(); 
    }

    private setupCloseButton(onClose?: () => void) {
        this.close = document.createElement('button');
        this.close.classList.add('modal__close'); 

        // Добавляем обработчик события на кнопку закрытия
        if (onClose) {
            this.close.addEventListener('click', () => {
                onClose(); 
            });
        }
    }

    private setupContactForm() {
        const contactForm = this.container.querySelector('form[name="contacts"]') as HTMLFormElement;
        const orderButton = this.container.querySelector('form[name="contacts"] .button') as HTMLButtonElement;
        const email = this.container.querySelector('input[name="email"]') as HTMLInputElement;
        const phone = this.container.querySelector('input[name="phone"]') as HTMLInputElement;

        const inputFn = () => {
            const value_email = email.value;
            const value_phone = phone.value;
            orderButton.disabled = !(value_email && value_phone); 
        };

        email.addEventListener('input', inputFn);
        phone.addEventListener('input', inputFn);

        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.email = (contactForm.elements.namedItem('email') as HTMLInputElement).value;
                this.phone = (contactForm.elements.namedItem('phone') as HTMLInputElement).value;
                console.log(`Email: ${this.email}, Телефон: ${this.phone}`);

                // Обработка отправки данных
                this.processContactData();
            });
        }
    }

    private processContactData() {
        // Логика обработки данных контактной формы, например, переход к следующему шагу
        console.log("Данные контакта обработаны");

       
    }

    public set_phone(phone: string) {
        this.phone = phone;
    }

    public set_email(email: string) {
        this.email = email;
    }

    public get_data() {
        return {
            email: this.email,
            phone: this.phone,
        };
    }
}