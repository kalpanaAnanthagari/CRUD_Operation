import create from 'zustand';

import { Product } from '@/interface/page';
interface SearchStore {
  search: string;
  setSearch: (search: string) => void;
  products: Product[];
  fetchProducts: () => void;
  updateProduct: (updatedProduct: Product) => void;
  deleteProduct: (productId: string) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  search: '',
  setSearch: (search: string) => set(() => ({ search })),
  products: [],
  fetchProducts: async () => {
    const response = await fetch('/api/product');
    const data: Product[] = await response.json();
    set(() => ({ products: data }));
  },
  updateProduct: (updatedProduct: Product) => {
    set((state) => ({
      products: state.products.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      ),
    }));
  },
  deleteProduct: (productId: string) => {
    set((state) => ({
      products: state.products.filter((product) => product._id !== productId),
    }));
  },
}));
