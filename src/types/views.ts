export interface View<T> {
    render(data: T): void;
    destroy(): void;
}

export interface Modal {
    open(content: string): void;
    close(): void;
    setCloseListener(callback: () => void): void;
}

export interface ProductCard extends View<Product> {
    onBuy(): void;
}

export interface BasketCard extends View<Basket> {
    onRemove(itemId: number): void;
}

export interface ProductPreview extends View<Product> {}