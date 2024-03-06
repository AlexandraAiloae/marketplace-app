import prisma from "@/app/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { title, description, category, inventory, color, price, images } =
    body;

  try {
    const product = await prisma.product.create({
      data: {
        title,
        description,
        category,
        inventory,
        color,
        price,
        images,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("Error creating the product", error);
    return NextResponse.error();
  }
}
