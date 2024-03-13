import prisma from "@/app/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: { url: string | URL }) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = parseInt(url.searchParams.get("limit") || "10", 10);
  const offset = (page - 1) * limit;

  try {
    const [products, total] = await prisma.$transaction([
      prisma.product.findMany({
        skip: offset,
        take: limit,
      }),
      prisma.product.count(),
    ]);

    return NextResponse.json({ products, total });
  } catch (error) {
    console.error("Error selecting product", error);
    return NextResponse.error();
  }
}
