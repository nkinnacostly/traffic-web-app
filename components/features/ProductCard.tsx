import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/services/api/products/get-products.api";

interface ProductCardProps {
  product: Product;
  onDelete?: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full bg-gray-200">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
          {product.name}
        </h3>

        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {product.description || "No description"}
        </p>

        <div className="flex justify-between items-center mb-3">
          <span className="text-xl font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          <span
            className={`text-sm px-2 py-1 rounded ${
              product.stock > 0
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </span>
        </div>

        <div className="text-xs text-gray-500 mb-3">
          Category: {product.category}
        </div>

        <div className="flex gap-2">
          <Link
            href={`/dashboard/products/${product.id}`}
            className="flex-1 px-3 py-2 text-sm text-center bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Edit
          </Link>
          {onDelete && (
            <button
              onClick={() => onDelete(product.id)}
              className="flex-1 px-3 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
