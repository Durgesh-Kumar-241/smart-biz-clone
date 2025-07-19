import ProductCard, { type ProductDetail } from "@/components/ui/ProductCard";
import { useEffect, useState } from "react";
import type { Product } from "./ManageProducts";
import { dashboardProducts } from "@/dummy_data/dummy_data";

const PRODUCT_SERVICE_API_BASE = "http://localhost/product-service/api/products";

const dummyProd = dashboardProducts;

export default function CustomerDashboard() {
  const [products, setProducts] = useState<ProductDetail[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch(`${PRODUCT_SERVICE_API_BASE}`);
    const data = await res.json();
    setProducts(data);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 space-y-10 py-8">
      <div className="bg-yellow-100 p-6 text-center rounded-xl text-lg font-semibold">
        🛍️ Big Sale Week – Up to 50% OFF!
      </div>

      <section>
        <h2 className="text-xl font-bold mb-4">Featured Products</h2>
        <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
