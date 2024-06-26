export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
  }

export  interface AddProduct {
    name: string;
    description: string;
    price: number;
    image: string;
  }
