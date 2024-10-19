export interface ICardItem {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  price: number | null;
}

export interface IProductsList {
  products: ICardItem[];
  preview: string | null;
}
  
export interface IOrderForm {
  payment?: string;
  address?: string;
  phone?: string;
  email?: string;
  total?: string | number;
}
  
export interface IOrder extends IOrderForm {
  items: string[];
}
  
  export interface IOrderResult {
  id: string;
}

export interface IAppState {
  catalog: ICardItem[];
  preview: string;
  basket: string[];
  order: IOrder;
  total: string | number;
  loading: boolean;
}

