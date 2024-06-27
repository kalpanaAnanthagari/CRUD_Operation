
import React, { useState, useRef, useEffect } from 'react';
import { Product } from '@/interface/page';
import { useSearchStore } from '@/util/search.Store';
import * as Dialog from '@radix-ui/react-dialog';

type CardData = {
  product: Product;
  onDelete: (productId: string) => void;
  onUpdate: (updatedProduct: Product) => void;
}

const Card = ({ product, onDelete, onUpdate }: CardData) => {
  const { search, products, fetchProducts, updateProduct, deleteProduct } = useSearchStore();
  const [showOptions, setShowOptions] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [isEditing, setIsEditing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to handle dialog visibility
  const cardRef = useRef<HTMLDivElement>(null);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedProduct({ ...updatedProduct, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      updateProduct(updatedProduct);
      const res = await fetch(`/api/product/${product._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });

      if (res.ok) {
        const updatedProductData = await res.json();
        onUpdate(updatedProductData);
        setIsEditing(false);
      } else {
        console.error('Failed to update the product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDelete = async () => {
    try {
      deleteProduct(product._id);
      const res = await fetch(`/api/product/${product._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        onDelete(product._id);
      } else {
        console.error('Failed to delete the product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={cardRef} className="rounded shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 hover:bg-gray-100">
      <img className="w-full h-48 object-cover transform transition-transform duration-300 hover:scale-110" src={product.image} loading='lazy' alt={product.name} />
      <div className="px-6 py-4">
        <div className='flex justify-between'>
          <div className="font-bold text-xl mb-2">
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={updatedProduct.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
            ) : (
              product.name
            )}
          </div>
          <div className="relative">
            <button onClick={toggleOptions} className="focus:outline-none">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.625 2.5C8.625 3.12132 8.12132 3.625 7.5 3.625C6.87868 3.625 6.375 3.12132 6.375 2.5C6.375 1.87868 6.87868 1.375 7.5 1.375C8.12132 1.375 8.625 1.87868 8.625 2.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM7.5 13.625C8.12132 13.625 8.625 13.1213 8.625 12.5C8.625 11.8787 8.12132 11.375 7.5 11.375C6.87868 11.375 6.375 11.8787 6.375 12.5C6.375 13.1213 6.87868 13.625 7.5 13.625Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
              </svg>
            </button>
            {showOptions && (
              <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-300 rounded shadow-md z-10">
                <button
                  className="block px-4 py-2 text-left text-gray-800 hover:bg-gray-100 w-full"
                  onClick={() => { setIsEditing(true); toggleOptions() }}
                >
                  Update
                </button>
                <button
                  className="block px-4 py-2 text-left text-gray-800 hover:bg-gray-100 w-full"
                  onClick={() => {setIsDialogOpen(true); toggleOptions()} }// Open the dialog
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="md:items-start md:justify-between">
          <div className="md:w-[calc(100%-2rem)]">
            {isEditing ? (
              <textarea
                name="description"
                value={updatedProduct.description}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-2 py-1 mb-2"
              />
            ) : (
              <p className="text-gray-700 text-base md:line-clamp-3 mobile:line-clamp-2">{product.description}</p>
            )}
          </div>
          <div className="text-gray-700 text-base">
            {isEditing ? (
              <input
                type="number"
                name="price"
                value={updatedProduct.price}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-2 py-1 mb-2"
              />
            ) : (
              <p>Price: ${product.price}</p>
            )}
          </div>
        </div>
        {isEditing && (
          <div className="flex gap-1 justify-end">
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600 transition-colors duration-300"
            >
              Save
            </button>
          </div>
        )}
      </div>

      <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 shadow-lg">
          <Dialog.Title className="text-lg font-bold">Confirm Delete</Dialog.Title>
          <Dialog.Description className="mt-2 text-gray-700">
            Are you sure you want to delete the product "{product.name}"?
          </Dialog.Description>
          <div className="mt-4 flex gap-4 justify-end">
            <Dialog.Close asChild>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-300"
              >
                Cancel
              </button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
              >
                Delete
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default Card;
