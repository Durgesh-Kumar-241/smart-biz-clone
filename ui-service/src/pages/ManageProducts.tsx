import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from 'axios';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";


export type Product = {
    id: string;
    title: string;
    category: string;
    price: number;
    description: string;
};

const PRODUCT_SERVICE_API_BASE = "http://localhost/product-service/api/products";
//const PRODUCT_SERVICE_API_BASE = "http://localhost:8083/api/products";


export default function ManageProducts() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editProduct, setEditProduct] = useState<Product | null>(null);

    const [products, setProducts] = useState<Product[]>([]);
    const [newProduct, setNewProduct] = useState<Product>({
        id: "",
        title: "",
        category: "",
        price: 0,
        description: "",
    });

    const [images, setImages] = useState<File[]>([]);


    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const res = await fetch(`${PRODUCT_SERVICE_API_BASE}`);
        const data = await res.json();
        setProducts(data);
    };

    const handleAdd = async () => {
        const formData = new FormData();
        formData.append("product",JSON.stringify(newProduct));

        images.forEach((file, idx) => {
            formData.append("images", file); // assuming backend accepts "images" as array
        });

        const res = await axios.post(`${PRODUCT_SERVICE_API_BASE}`, formData);

        await fetchProducts();
        setNewProduct({ id: "", title: "", category: "", price: 0, description: ""});
        setImages([]);
    };


    const handleDelete = async (id: string) => {
        const res = await fetch(`${PRODUCT_SERVICE_API_BASE}/${id}`, { method: "DELETE" });
        if (res.ok) fetchProducts();
    };

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-8">
            <h2 className="text-2xl font-bold">Manage My Products</h2>


            <Button onClick={() => {
                setEditProduct(null); // ensure it's in add mode
                setDialogOpen(true);
            }}>
                Add Product
            </Button>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>{editProduct ? "Edit Product" : "Add Product"}</DialogTitle>
                    </DialogHeader>

                    {/* Form inside dialog */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            placeholder="Title"
                            value={newProduct.title}
                            onChange={(e) =>
                                setNewProduct({ ...newProduct, title: e.target.value })
                            }
                        />
                        <Input
                            type="number"
                            placeholder="Price"
                            value={newProduct.price}
                            onChange={(e) =>
                                setNewProduct({ ...newProduct, price: Number(e.target.value) })
                            }
                        />
                        <Input className="md:col-span-2"
                            placeholder="Category"
                            value={newProduct.category}
                            onChange={(e) =>
                                setNewProduct({ ...newProduct, category: e.target.value })
                            }
                        />

                        <Textarea
                            placeholder="Description"
                            value={newProduct.description}
                            onChange={(e) =>
                                setNewProduct({ ...newProduct, description: e.target.value })
                            }
                            className="md:col-span-2"
                        />
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => {
                                if (e.target.files) {
                                    setImages(Array.from(e.target.files));
                                }
                            }}
                            className="border rounded px-3 py-2 text-sm md:col-span-2"
                        />

                        {images.length > 0 && (
                            <div className="flex flex-wrap gap-3 mt-4 md:col-span-2">
                                {images.map((file, idx) => (
                                    <div key={idx} className="relative w-20 h-20">
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={`preview-${idx}`}
                                            className="w-full h-full object-cover rounded border"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setImages((prev) => prev.filter((_, i) => i !== idx))
                                            }
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center shadow"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <Button
                            className="md:col-span-2"
                            onClick={async () => {
                                if (editProduct) {
                                    // handle update
                                } else {
                                    await handleAdd(); // your add function
                                }
                                setDialogOpen(false); // close dialog after submit
                            }}
                        >
                            {editProduct ? "Update Product" : "Add Product"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>



            {/* Product List Table */}
            <div>
                <h3 className="text-lg font-semibold mb-2">My Products</h3>
                <table className="w-full border">
                    <thead>
                        <tr className="bg-muted text-left">
                            <th className="p-2">Title</th>
                            <th className="p-2">Category</th>
                            <th className="p-2">Price</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p) => (
                            <tr key={p.id} className="border-t">
                                <td className="p-2">{p.title}</td>
                                <td className="p-2">{p.category}</td>
                                <td className="p-2">₹{p.price}</td>
                                <td className="p-2">
                                    <Button variant="outline" className="mr-2">Edit</Button>
                                    <Button variant="destructive" onClick={() => handleDelete(p.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
