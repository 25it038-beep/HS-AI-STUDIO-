import { NextResponse } from "next/server";
import { products } from "@/data/products";

export async function GET() {
  const verifiedProducts = products.map((p) => ({
    id: p.id,
    number: p.number,
    name: p.name,
    tagline: p.tagline,
    category: p.category,
    description: p.description,
    destinationUrl: `/products/${p.id}`,
    externalUrl: p.url || null,
    downloadUrl: p.downloadUrl || null,
    status: p.status,
    features: p.features,
    accent: p.accent,
  }));

  return NextResponse.json({
    success: true,
    total: verifiedProducts.length,
    products: verifiedProducts,
  });
}
