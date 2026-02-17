import { Product, OrderItemOption } from '@/types';
import { X, Minus, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ProductModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
    onAddToCart: (product: Product, quantity: number, options: OrderItemOption[]) => void;
}

export default function ProductModal({ product, isOpen, onClose, onAddToCart }: ProductModalProps) {
    const [quantity, setQuantity] = useState(1);
    const [soupRichness, setSoupRichness] = useState('normal');
    const [noodleHardness, setNoodleHardness] = useState('normal');

    // Reset state when product changes
    useEffect(() => {
        if (isOpen) {
            setQuantity(1);
            setSoupRichness('normal');
            setNoodleHardness('normal');
        }
    }, [isOpen, product]);

    if (!isOpen || !product) return null;

    const handleAddToCart = () => {
        const options: OrderItemOption[] = [];
        if (product.category === 'main' || product.category === 'Ramen') {
            options.push({ name: 'Soup Richness', value: soupRichness });
            options.push({ name: 'Noodle Hardness', value: noodleHardness });
        }
        onAddToCart(product, quantity, options);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">

                {/* Header Image */}
                <div className="relative h-48 w-full">
                    <img
                        src={product.image_url || `https://source.unsplash.com/800x600/?${(product.category === 'main' || product.category === 'Ramen') ? 'ramen' : (product.category === 'drink' || product.category === 'Drinks') ? 'drink' : 'japanese-food'},${product.name}`}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                    >
                        <X size={20} />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1a1a1a] to-transparent h-20" />
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                        <h2 className="text-2xl font-bold text-white">{product.name}</h2>
                        <span className="text-xl font-bold text-orange-500">${product.price}</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-6">
                        {product.description || 'Authentic flavor tailored to your taste.'}
                    </p>

                    {/* Customization Options (Only for Main/Ramen) */}
                    {(product.category === 'main' || product.category === 'Ramen') && (
                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Soup Richness 湯頭濃淡</label>
                                <div className="flex bg-gray-800 rounded-lg p-1">
                                    {['light', 'normal', 'rich'].map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => setSoupRichness(opt)}
                                            className={`flex-1 py-1 text-sm rounded-md transition-all ${soupRichness === opt ? 'bg-orange-500 text-white shadow-md' : 'text-gray-400 hover:text-white'
                                                }`}
                                        >
                                            {opt === 'light' ? '淡 (Light)' : opt === 'normal' ? '普通 (Normal)' : '濃 (Rich)'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Noodle Hardness 麵條硬度</label>
                                <div className="flex bg-gray-800 rounded-lg p-1">
                                    {['soft', 'normal', 'hard'].map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => setNoodleHardness(opt)}
                                            className={`flex-1 py-1 text-sm rounded-md transition-all ${noodleHardness === opt ? 'bg-orange-500 text-white shadow-md' : 'text-gray-400 hover:text-white'
                                                }`}
                                        >
                                            {opt === 'soft' ? '軟 (Soft)' : opt === 'normal' ? '普通 (Normal)' : '硬 (Hard)'}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Quantity and Add Button */}
                    <div className="flex items-center gap-4 mt-8">
                        <div className="flex items-center gap-3 bg-gray-800 rounded-lg p-1">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="p-2 hover:bg-gray-700 rounded-md text-white transition-colors"
                                disabled={quantity <= 1}
                            >
                                <Minus size={18} />
                            </button>
                            <span className="text-lg font-bold text-white w-4 text-center">{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="p-2 hover:bg-gray-700 rounded-md text-white transition-colors"
                            >
                                <Plus size={18} />
                            </button>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-lg transition-all active:scale-95 shadow-lg shadow-orange-500/20"
                        >
                            Add to Order - ${product.price * quantity}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
