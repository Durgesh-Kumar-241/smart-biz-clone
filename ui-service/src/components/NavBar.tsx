import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="w-full bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="text-2xl font-bold text-primary">ShopNow</Link>

        <Input placeholder="Search products..." className="max-w-md w-full" />

        <div className="flex gap-2">
          <Link to="/cart"><Button variant="outline" size="icon"><ShoppingCart /></Button></Link>
          <Link to="/login"><Button variant="outline" size="icon"><User /></Button></Link>
        </div>
      </div>
    </header>
  );
}
