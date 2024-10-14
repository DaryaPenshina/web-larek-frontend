export interface ApiResponse<T> {
    data: T;
    error?: string;
}

export interface Product {
    id: number;
    title: string;
    category: string;
    price: number;
    description?: string; // Опциональное описание продукта
}

export interface CartItem {
    productId: number;
    quantity: number;
}

// Интерфейс клиента API
export interface Api {
    fetchProducts(): Promise<ApiResponse<Product[]>>;
    addToCart(item: CartItem): Promise<ApiResponse<void>>;
    removeFromCart(itemId: number): Promise<ApiResponse<void>>;
}

export interface ShopApi extends Api {
    // Дополнительные методы 
}