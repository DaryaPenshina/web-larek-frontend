export interface AppState {
    basket: Basket;
    products: Product[];
}

export interface Basket {
    items: CartItem[];
    total: number;
    setItems(items: CartItem[]): void;
    setTotal(total: number): void;
    addItem(item: CartItem): void;
    removeItem(itemId: number): void;
}