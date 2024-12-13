
export interface IProductItem {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  price: number | null;
}

export interface IProductsList {
  products: IProductItem[];
}

export interface IOrder {
  items?: string[]; 
  totalPrice?: number;
  payment?: string;
  address?: string;
  phone?: string;
  email?: string;
}

export interface IOrderResult {
  id: string;
}

export interface IAppState {
  catalog: IProductItem[];
  preview: IProductItem | null; 
  order_form: IOrder; 
  basket: IProductItem[]; 
  loading: boolean; 
}