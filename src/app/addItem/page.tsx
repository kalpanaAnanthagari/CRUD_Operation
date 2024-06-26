import * as Dialog from '@radix-ui/react-dialog';
import { Button, Text, TextField } from '@radix-ui/themes';
import React, { useState } from 'react';
import { AddProduct } from '@/interface/page';


interface AddItemProps {
  onAdd: (product: AddProduct) => void;
}

const AddItem: React.FC<AddItemProps> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setImage('');
  };

  const handleSave = async () => {
    const newProduct: AddProduct = {
      name,
      description,
      price: parseFloat(price),
      image,
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
        console.log(savedProduct,"sssssss");
        
        onAdd(savedProduct);
        resetForm();
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
        <Button className="px-4 py-2 bg-blue-600 text-white rounded">Add Product</Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <Dialog.Content
          className="fixed top-1/2 left-1/2 max-w-md w-full bg-white p-6 rounded shadow-lg transform -translate-x-1/2 -translate-y-1/2"
        >
          <Dialog.Title className="text-lg font-semibold mb-4">Add Product</Dialog.Title>
          <Dialog.Description className="text-sm text-gray-600 mb-4">
            Please fill out the product details.
          </Dialog.Description>

          <div className="flex flex-col gap-4">
            <label>
              <Text as="div" className="text-sm font-bold mb-1">
                Name
              </Text>
              <TextField.Root
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="Enter Product Title"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              <Text as="div" className="text-sm font-bold mb-1">
                Description
              </Text>
              <TextField.Root
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="Enter Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <label>
              <Text as="div" className="text-sm font-bold mb-1">
                Price
              </Text>
              <TextField.Root
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="Enter Product Price"
                type='number'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>
            <label>
              <Text as="div" className="text-sm font-bold mb-1">
                Image
              </Text>
              <TextField.Root
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="Enter Product Image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </label>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <Dialog.Close asChild>
              <Button className="px-4 py-2 bg-gray-300 text-black rounded">Cancel</Button>
            </Dialog.Close>
            <Dialog.Close>
            <Button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleSave}>
              Save
            </Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AddItem;

