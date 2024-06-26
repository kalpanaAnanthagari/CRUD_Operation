import React, { useEffect, useState } from 'react';
import Card from './Card';
import { useSearchStore } from '@/util/search.Store';
import { Product } from '@/interface/page';


const PaginatedCards: React.FC = () => {
  const { search, products, fetchProducts, updateProduct, deleteProduct } = useSearchStore();
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 16; // Changed from 12 to 16 for 16 cards per page

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = products.filter((prod) =>
    prod.name.toLocaleLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstCard, indexOfLastCard);

  const nextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-2 w-[80%]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-9 justify-center">
      {currentProducts.map((product: Product) => (
        <Card
          key={product._id}
          product={product}
          onDelete={() => deleteProduct(product._id)}
          onUpdate={updateProduct}
        />
      ))}
    </div>
      <div className="mt-4 flex items-center">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-600 text-white rounded mr-2"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-600 text-white rounded ml-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginatedCards;

