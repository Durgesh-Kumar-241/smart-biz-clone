import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PRODUCT_SERVICE_API_IMAGE = "http://localhost/product-service/";


export type ProductDetail = {
  id: string;
  title: string;
  price: number;
  rating : number;
  imageUrl: string[];
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
export default function ProductCard({ product }: { product: ProductDetail }) {
  return (
    <Link to={`/products/${product.id}`}>
      <Card className="p-4 hover:shadow-md transition cursor-pointer">
        <img src={product.imageUrl?.[0]?PRODUCT_SERVICE_API_IMAGE+product.imageUrl?.[0]:"#"} alt={product.title} className="h-40 object-contain mx-auto" />
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
