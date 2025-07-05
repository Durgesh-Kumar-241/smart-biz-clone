import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";

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

export default function ProductDetail() {
    const { productId } = useParams();

    const product = dummyProducts.find((p) => p.id === productId);

    if (!product) {
        return <div className="text-center mt-10 text-lg text-red-500">Product not found.</div>;
    }

    const [selectedImage, setSelectedImage] = useState(product.images[0]);

    return (
        <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
                {/* Main image */}
                <img
                    src={selectedImage}
                    alt="Selected"
                    className="w-full rounded-lg border h-80 object-contain"
                />

                {/* Thumbnails */}
                <div className="flex gap-2">
                    {product.images.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt={`thumb-${idx}`}
                            className={`w-16 h-16 rounded border cursor-pointer object-contain ${selectedImage === img ? "ring-2 ring-primary" : ""
                                }`}
                            onClick={() => setSelectedImage(img)}
                        />
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <h1 className="text-3xl font-bold">{product.title}</h1>
                <p className="text-muted-foreground">{product.category}</p>
                <p className="text-2xl font-semibold text-primary">₹{product.price}</p>
                <p className="text-base">{product.description}</p>
                <Button className="mt-4 w-full md:w-auto">Add to Cart</Button>
            </div>

            <div className="flex items-center gap-2 mt-2">
                <div className="flex text-yellow-500">
                    {"★★★★★☆☆☆☆☆".slice(0, product.rating)}
                </div>
                <span className="text-sm text-muted-foreground">({product.reviews.length} reviews)</span>
            </div>

            <section className="mt-10">
                <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
                <div className="space-y-4">
                    {product.reviews.map((r, i) => (
                        <div key={i} className="border p-4 rounded-md shadow-sm">
                            <p className="font-medium">{r.name}</p>
                            <div className="text-yellow-500">
                                {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{r.comment}</p>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}
