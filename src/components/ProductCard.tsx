/* eslint-disable @next/next/no-img-element */
import { Product } from '@/types';
import { Plus } from 'lucide-react';

interface ProductCardProps {
    product: Product;
    onClick: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
    return (
        <div
            onClick={onClick}
            className="glass-panel group relative flex flex-col overflow-hidden rounded-2xl transition-all hover:scale-[1.02] hover:shadow-2xl hover:border-orange-500/50 cursor-pointer"
        >
            <div className="aspect-[4/3] w-full overflow-hidden bg-gray-800">
                <img
                    src={product.image_url || `https://source.unsplash.com/800x600/?${(product.category === 'main' || product.category === 'Ramen') ? 'ramen' : (product.category === 'drink' || product.category === 'Drinks') ? 'drink' : 'japanese-food'},${product.name}`}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
            </div>

            <div className="p-4 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                        {product.name}
                    </h3>
                    <span className="text-lg font-bold text-orange-400">
                        ${product.price}
                    </span>
                </div>

                <p className="text-sm text-gray-400 line-clamp-2 mb-4 flex-1">
                    {product.description || 'Delicious authentic Japanese ramen'}
                </p>

                <button className="w-full py-2 bg-white/10 hover:bg-orange-500 text-white rounded-lg flex items-center justify-center gap-2 transition-all font-medium">
                    <Plus size={18} />
                    Add to Order
                </button>
            </div>
        </div>
    );
}
