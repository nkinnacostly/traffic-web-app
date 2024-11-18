import { Card } from "./ui/card";
import Image from "next/image";
import { Heart } from "iconsax-react"
import testImage from "@/public/image/product-test.jpeg"
import { Span } from "./ui/typography";

type ProductCardProps = {
    soldNumber: number;
    category: string;
    productName: string;
    favourite: number;
    coverImage: string;
};

export default function ProductCard({ soldNumber, category, productName, favourite, coverImage }: ProductCardProps) {
    return (
        <div>
        <Card className="relative w-64 overflow-hidden shadow-none">
            <div className="relative h-60 w-full">
                <Image src={testImage} alt={`${productName} cover`} layout="fill" objectFit="cover" />
                
                {/* Sold Badge */}
                <div className="absolute top-2 right-2 text-white text-lg flex flex-col px-2 py-1 rounded-lg font-semibold">
                   <Span>Sold</Span> 
                   <Span>{soldNumber}</Span> 
                </div>
                <div className="absolute bottom-4 right-4 flex items-center text-gray-900 shadow-md space-x-1">
                    <div className="rounded-full p-2 bg-gray-500">
                    <Heart className="w-4 h-4" color="#ABB4BD" />
                    </div>
                   
                    <span className="text-sm font-semibold text-white">{favourite.toLocaleString()}</span>
                </div>
            </div>
           
        </Card>
             <div className="p-4 rounded-br-none">
                <h3 className="text-gray-900 text-lg font-bold">{productName}</h3>
                <p className="text-gray-500 text-sm">{category}</p>
            </div>
        </div>
    );
}
