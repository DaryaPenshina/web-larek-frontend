
import { Basket } from './Basket';
import { Order } from './Order';

export class Presenter {
    private modal: any; 
    private appState: any; 
    private basket: Basket;

    constructor(basket: Basket, modal: any, appState: any) {
        this.modal = modal;
        this.appState = appState;
        this.basket = basket;
    }
    public addProductToBasket(item: { id: string; title: string; price: number | null }) {
                console.log(`addProductToBasket`)
                this.basket.addItem(item); 
            }

    public add_to_cart(item: any) { 
        console.log('Adding product to cart');
      
        this.update_view(); // Обновить представление
    }

    public remove_from_cart(itemId: string) {
        console.log('Removing product from cart');
       
        this.update_view();
    }

    public show_product_details(productId: string) {
        console.log(`Showing details for product: ${productId}`);
        // Логика для отображения деталей продукта
    }

    private update_view() {
       
    }
}