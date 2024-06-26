"use client"

import * as Dialog from '@radix-ui/react-dialog';
import { Button, Text } from '@radix-ui/themes';
import React from 'react';
import { Product, AddProduct } from '@/interface/page';
import { addProductSchema } from '@/validator/page';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface AddItemProps {
  onAdd: (product: Product) => void;
}

type Data = z.infer<typeof addProductSchema>;

const AddItem: React.FC<AddItemProps> = ({ onAdd }: AddItemProps) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Data>({
    resolver: zodResolver(addProductSchema),
  });

  const handleSave = async (data: Data) => {
    const newProduct: AddProduct = {
      name: data.name,
      description: data.description,
      price: parseFloat(data.price),
      image: data.image,
    };

    try {
      const response = await fetch('/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        const savedProduct = await response.json();
        onAdd(savedProduct);
        reset();
      } else {
        console.error('Failed to save product');
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300">Add Product</Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <Dialog.Content
          className="fixed top-1/2 left-1/2 max-w-md w-full md:w-1/2 lg:w-1/3 bg-white p-6 rounded shadow-lg transform -translate-x-1/2 -translate-y-1/2"
        >
          <Dialog.Title className="text-lg font-semibold mb-4">Add Product</Dialog.Title>
          <Dialog.Description className="text-sm text-gray-600 mb-4">
            Please fill out the product details.
          </Dialog.Description>

          <form onSubmit={handleSubmit(handleSave)} className="flex flex-col gap-4">
            <label className="flex flex-col gap-1">
              <Text as="div" className="text-sm font-bold">
                Name
              </Text>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded hover:border-gray-400 focus:border-blue-500 transition-colors duration-300"
                placeholder="Enter Product Title"
                {...register('name')}
              />
              {errors.name && <Text className="text-red-500 text-sm">{errors.name.message}</Text>}
            </label>
            <label className="flex flex-col gap-1">
              <Text as="div" className="text-sm font-bold">
                Description
              </Text>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded resize-none hover:border-gray-400 focus:border-blue-500 transition-colors duration-300"
                placeholder="Enter Product Description"
                {...register('description')}
              />
              {errors.description && <Text className="text-red-500 text-sm">{errors.description.message}</Text>}
            </label>
            <label className="flex flex-col gap-1">
              <Text as="div" className="text-sm font-bold">
                Price
              </Text>
              <input
                className="w-1/2 px-3 py-2 border border-gray-300 rounded hover:border-gray-400 focus:border-blue-500 transition-colors duration-300"
                placeholder="Enter Product Price"
                type="number"
                {...register('price')}
              />
              {errors.price && <Text className="text-red-500 text-sm">{errors.price.message}</Text>}
            </label>
            <label className="flex flex-col gap-1">
              <Text as="div" className="text-sm font-bold">
                Image
              </Text>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded hover:border-gray-400 focus:border-blue-500 transition-colors duration-300"
                placeholder="Enter Product Image URL"
                {...register('image')}
              />
              {errors.image && <Text className="text-red-500 text-sm">{errors.image.message}</Text>}
            </label>

            <div className="flex justify-end gap-3 mt-4">
              <Dialog.Close asChild>
                <Button type="button" className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition-colors duration-300" onClick={() => reset()}>
                  Cancel
                </Button>
              </Dialog.Close>
              <Button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300">
                Save
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AddItem;

