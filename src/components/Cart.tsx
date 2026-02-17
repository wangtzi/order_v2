import { OrderItem } from '@/types';
import { ShoppingBag, X, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface CartProps {
    items: OrderItem[];
    onRemoveItem: (index: number) => void;
    onSubmitOrder: () => Promise<void>;
    isSubmitting: boolean;
}

export default function Cart({ items, onRemoveItem, onSubmitOrder, isSubmitting }: CartProps) {
    const [isOpen, setIsOpen] = useState(false);

    const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    if (items.length === 0 && !isOpen) return null;

    return (
        <>
            {/* Floating Action Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-40 bg-orange-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center gap-2 group"
            >
                <ShoppingBag className="w-6 h-6" />
                <span className="bg-white text-orange-600 font-bold rounded-full w-6 h-6 flex items-center justify-center text-xs">
                    {itemCount}
                </span>
            </button>

            {/* Cart Drawer/Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Drawer Panel */}
                    <div className="relative w-full max-w-md bg-[#1a1a1a] border-l border-gray-800 h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <ShoppingBag className="text-orange-500" />
                                <h2 className="text-xl font-bold text-white">Your Order</h2>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {items.length === 0 ? (
                                <div className="text-center text-gray-500 mt-20">
                                    <p>Your cart is empty.</p>
                                    <p className="text-sm">Add some delicious ramen!</p>
                                </div>
                            ) : (
                                items.map((item, idx) => (
                                    <div key={idx} className="bg-white/5 rounded-xl p-4 border border-white/10 flex gap-4">
                                        <img
                                            src={item.product.image_url || `https://source.unsplash.com/100x100/?${(item.product.category === 'main' || item.product.category === 'Ramen') ? 'ramen' : 'food'},${item.product.name}`}
                                            alt={item.product.name}
                                            className="w-16 h-16 rounded-lg object-cover"
                                        />
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className="font-bold text-white line-clamp-1">{item.product.name}</h4>
                                                <button
                                                    onClick={() => onRemoveItem(idx)}
                                                    className="text-gray-500 hover:text-red-400 p-1"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                            <div className="text-sm text-orange-400 font-medium mb-1">
                                                ${item.product.price} x {item.quantity}
                                            </div>
                                            {item.options && item.options.length > 0 && (
                                                <div className="text-xs text-gray-400 space-y-0.5">
                                                    {item.options.map((opt, i) => (
                                                        <div key={i}>{opt.name}: {opt.value}</div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="p-6 border-t border-gray-800 bg-[#151515]">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-gray-400">Total Amount</span>
                                <span className="text-2xl font-bold text-white">${total}</span>
                            </div>
                            <button
                                disabled={items.length === 0 || isSubmitting}
                                onClick={onSubmitOrder}
                                className="w-full py-4 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-xl font-bold text-lg transition-all active:scale-95 shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    'Confirm Order'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
