import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/util/db';
import Product from '../../../../util/product.model';

interface Params {
  params: {
    id: string;
  };
}

export async function PUT(req: NextRequest, { params }: Params) {
  await connectToDatabase();

  try {
    const { id } = params;
    const { name, description, price, image } = await req.json();

    const updateProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, price, image },
      { new: true }
    );

    if (!updateProduct) {
      return NextResponse.json({ error: 'Product not found to update' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product updated successfully' }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to update the product' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
    await connectToDatabase();
  
    try {
      const { id } = params;
  
      const deleteProduct = await Product.findByIdAndDelete(id);
  
      if (!deleteProduct) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      }
  
      return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to delete the product' }, { status: 500 });
    }
  }