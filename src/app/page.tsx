"use client";
import Head from 'next/head';
import PaginatedCards from '@/components/pagination';
import AddItem from '../components/AddItemDialog';
import { useState } from 'react';
import { AddProduct,Product } from '@/interface/page';



// // interface Product {
// //   _id: string;
// //   name: string;
// //   description: string;
// //   price: number;
// //   image: string;
// // }
// export default function Home() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const handleAddProduct = (newProduct: Product) => {
//     setProducts([...products, newProduct]);
//   }
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center py-2">
//       <Head>
//         <title>My Next.js App</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//       <main className="flex flex-col items-center justify-center w-full">
//         <div className="w-full flex justify-between items-center px-4 py-2">
//           {/* <h1 className="text-xl font-bold">Home Page</h1> */}
//           <AddItem
//           onAdd={handleAddProduct}/>
//         </div>
//         <PaginatedCards/>  
//       </main>
//     </div>
//   );
// }

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  const handleAddProduct = (product: AddProduct) => {
    const newProduct: Product = {
      _id: (new Date()).toISOString(), // or generate a unique id in another way
      ...product
    };
    setProducts([...products, newProduct]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-2">
      <Head>
        <title>My Next.js App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center w-full">
        <div className="w-full flex justify-between items-center px-4 py-2">
          {/* <h1 className="text-xl font-bold">Home Page</h1> */}
          <AddItem onAdd={handleAddProduct} />
        </div>
        <PaginatedCards />
      </main>
    </div>
  );
}






