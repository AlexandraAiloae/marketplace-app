import prisma from "@/app/prismadb";
import { NextResponse } from "next/server";
export const dynamic = "auto";

export async function GET(request: Request) {
  try {
    const searchParams = new URLSearchParams(request.url.split('?')[1]);

    const categories = searchParams.getAll("categories[]");

    const products = categories.length > 0
      ? await prisma.product.findMany({
          where: {
            category: {
              in: categories,
            },
          },
        })
      : await prisma.product.findMany();

    return NextResponse.json({ message: "API route is working", products });
  } catch (error) {
    console.error("Error selecting product", error);
    return NextResponse.error();
  }
}