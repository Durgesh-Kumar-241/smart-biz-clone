import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

const PRODUCT_SERVICE_API_IMAGE = "http://localhost/product-service/";


export type ProductDetail = {
  id: string
  category: string
  imageUrl: string[]
  title: string
  description: string
  rating: number
  totalReviews: number
  discountPercent: number
  price: number
  originalPrice: number
};

// type ProductReview ={
//     name: string;
//     rating: number;
//     comment: string;
// }



// wrap entire card in a Link
// export default function ProductCard({ product }: { product: ProductDetail }) {
//   return (
//     <Link to={`/products/${product.id}`}>
//       <Card className="p-4 hover:shadow-md transition cursor-pointer">
//         <img src={product.imageUrl?.[0]?PRODUCT_SERVICE_API_IMAGE+product.imageUrl?.[0]:"#"} alt={product.title} className="h-40 object-contain mx-auto" />
//         <div className="pt-4 space-y-1">
//           <h3 className="text-lg font-semibold">{product.title}</h3>
//           <p className="text-sm text-muted-foreground">{product.category}</p>
//           <p className="font-bold text-xl">₹{product.price}</p>
//           <Button className="w-full mt-2">Add to Cart</Button>
//         </div>
//       </Card>
//     </Link>
//   );
// }





export default function ProductCard({ product }: { product: ProductDetail }) {
  return (
    <Card className="flex flex-col h-full shadow-md hover:shadow-lg transition-shadow rounded-xl overflow-hidden">
      <img
        src={product.imageUrl?.[0]?PRODUCT_SERVICE_API_IMAGE+product.imageUrl?.[0]:"#"}
        alt={product.title}
        className="h-48 w-full object-contain bg-white p-2"
        loading="lazy"
      />
      <CardContent className="flex flex-col justify-between flex-1 p-4">
        <div className="space-y-1">
          <h3 className="font-semibold text-sm">{product.title}</h3>
          <p className="text-xs text-gray-600">{product.description}</p>
          <div className="flex items-center text-yellow-500 text-sm mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < product.rating ? "fill-yellow-500" : "fill-gray-300"}`}
              />
            ))}
            <span className="ml-1 text-xs text-gray-500">
              ({product.totalReviews})
            </span>
          </div>
          <div className="mt-1">
            <span className="text-red-600 font-semibold text-sm">
              -{product.discountPercent}%
            </span>{" "}
            <span className="text-lg font-bold">
              ₹{product.price.toLocaleString()}
            </span>
            <span className="line-through text-xs text-gray-500 ml-2">
              ₹{product?.originalPrice?.toLocaleString()}
            </span>
          </div>
        </div>
        <Button className="mt-4 w-full">Add to Cart</Button>
      </CardContent>
    </Card>
  );
}
