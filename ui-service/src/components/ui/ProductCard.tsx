import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type Product = {
  id: string;
  title: string;
  price: number;
  rating : number;
  images: string[];
  category: string;
  description: string;
  reviews: ProductReview[];
};

type ProductReview ={
    name: string;
    rating: number;
    comment: string;
}



// wrap entire card in a Link
export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/products/${product.id}`}>
      <Card className="p-4 hover:shadow-md transition cursor-pointer">
        <img src={product.images[0]} alt={product.title} className="h-40 object-contain mx-auto" />
        <div className="pt-4 space-y-1">
          <h3 className="text-lg font-semibold">{product.title}</h3>
          <p className="text-sm text-muted-foreground">{product.category}</p>
          <p className="font-bold text-xl">₹{product.price}</p>
          <Button className="w-full mt-2">Add to Cart</Button>
        </div>
      </Card>
    </Link>
  );
}

// export default function ProductCard({ product }: { product: Product }) {
//   return (
//     <Card className="p-4 hover:shadow-md transition">
//       <img src={product.image} alt={product.title} className="h-40 object-contain mx-auto" />
//       <CardContent className="pt-4">
//         <h3 className="text-lg font-semibold">{product.title}</h3>
//         <p className="text-sm text-muted-foreground">{product.category}</p>
//         <p className="font-bold text-xl">₹{product.price}</p>
//         <Button className="mt-2 w-full">Add to Cart</Button>
//       </CardContent>
//     </Card>
//   );
// }
