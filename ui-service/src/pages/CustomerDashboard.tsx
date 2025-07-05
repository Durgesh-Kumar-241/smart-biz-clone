import ProductCard, { type ProductDetail } from "@/components/ui/ProductCard";
import { useEffect, useState } from "react";
import type { Product } from "./ManageProducts";

const PRODUCT_SERVICE_API_BASE = "http://localhost/product-service/api/products";

const dummyProducts = [
  {
    id: "1",
    title: "Smartphone XYZ",
    category: "Electronics",
    price: 19999,
    description: "Feature-rich smartphone with great performance.",
    images: [
      "https://placehold.co/300x300?text=Front",
      "https://placehold.co/300x300?text=Back",
      "https://placehold.co/300x300?text=Side",
    ],
    rating: 4,
    reviews: [
      { name: "Alice", rating: 5, comment: "Amazing performance!" },
      { name: "Bob", rating: 4, comment: "Good value for money." },
    ],
  },
  {
    id: "2",
    title: "Laptop XYZ",
    category: "Electronics",
    price: 19999,
    description: "Feature-rich smartphone with great performance.",
    images: [
      "https://placehold.co/300x300?text=Front",
      "https://placehold.co/300x300?text=Back",
      "https://placehold.co/300x300?text=Side",
    ],
    rating: 4,
    reviews: [
      { name: "Alice", rating: 5, comment: "Amazing performance!" },
      { name: "Bob", rating: 4, comment: "Good value for money." },
    ],
  },
  {
    id: "3",
    title: "Item XYZ",
    category: "Electronics",
    price: 19999,
    description: "Feature-rich smartphone with great performance.",
    images: [
      "https://placehold.co/300x300?text=Front",
      "https://placehold.co/300x300?text=Back",
      "https://placehold.co/300x300?text=Side",
    ],
    rating: 4,
    reviews: [
      { name: "Alice", rating: 5, comment: "Amazing performance!" },
      { name: "Bob", rating: 4, comment: "Good value for money." },
    ],
  },
  {
    id: "4",
    title: "Iphone XYZ",
    category: "Electronics",
    price: 19999,
    description: "Feature-rich smartphone with great performance.",
    images: [
      "https://placehold.co/300x300?text=Front",
      "https://placehold.co/300x300?text=Back",
      "https://placehold.co/300x300?text=Side",
    ],
    rating: 4,
    reviews: [
      { name: "Alice", rating: 5, comment: "Amazing performance!" },
      { name: "Bob", rating: 4, comment: "Good value for money." },
    ],
  }
];

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
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
