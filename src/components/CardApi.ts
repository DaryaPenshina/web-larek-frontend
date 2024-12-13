

import { Api, ApiListResponse } from './base/api';
import { IProductItem } from '../types/index';
import { API_URL } from '../utils/constants'; 

export class CardApi extends Api {
    constructor(API_URL: string) {
        super(API_URL);
    }

    async get_product(): Promise<IProductItem[]> {
        try {
            const response = await this.get('/product');
            if (!response || !Array.isArray((response as ApiListResponse<IProductItem>).items)) {
                throw new Error('Некорректный ответ от API');
            }
            return (response as ApiListResponse<IProductItem>).items;
        } catch (error) {
            console.error('Ошибка при получении продуктов:', error);
            throw error;
        }
    }

    async place_order(orderData: object): Promise<any> {
        try {
            const response = await this.post('/orders', orderData);
            return response;
        } catch (error) {
            console.error('Ошибка при отправке заказа:', error);
            throw error;
        }
    }
}