export type EventType =
    | 'PRODUCT_ADDED'
    | 'PRODUCT_REMOVED'
    | 'BASKET_UPDATED'
    | 'ORDER_PLACED';

export interface EventPayload {
    // Данные, которые могут быть переданы с событием
    [key: string]: any;
}

export interface Event {
    type: EventType;
    payload?: EventPayload;
}