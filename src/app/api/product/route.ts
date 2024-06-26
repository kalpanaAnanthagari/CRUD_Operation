// api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../util/db';
import Product from '../../../util/product.model';

export async function GET() {
  await connectToDatabase();

  try {
    const products = await Product.find({});
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const { name, description, price, image } = await req.json();

  try {
    const newProduct = new Product({ name, description, price, image });
    await newProduct.save();
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}



