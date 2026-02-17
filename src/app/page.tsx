'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import MenuTabs from '@/components/MenuTabs';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import Cart from '@/components/Cart';
import { supabase } from '@/utils/supabase/client';
import { Product, OrderItem, OrderItemOption } from '@/types';
import { Loader2 } from 'lucide-react';

type Category = 'main' | 'side' | 'drink';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>('main');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState<OrderItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*');

        if (error) {
          console.error('Error fetching products:', error);
          setProducts(getMockProducts());
        } else if (data && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(getMockProducts());
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setProducts(getMockProducts());
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => {
    // Database categories: "Ramen", "A La Carte", "Drinks"
    if (activeCategory === 'main') return p.category === 'Ramen' || p.category === 'main';
    if (activeCategory === 'side') return p.category === 'A La Carte' || p.category === 'side';
    if (activeCategory === 'drink') return p.category === 'Drinks' || p.category === 'drink';
    return p.category === activeCategory;
  });

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleAddToCart = (product: Product, quantity: number, options: OrderItemOption[]) => {
    const newItem: OrderItem = { product, quantity, options };
    setCartItems(prev => [...prev, newItem]);
  };

  const handleRemoveItem = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmitOrder = async () => {
    setIsSubmitting(true);
    const total_amount = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const itemsJson = cartItems.map(item => ({
      product_id: item.product.id,
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
      options: item.options
    }));

    try {
      const { error } = await supabase
        .from('orders')
        .insert({
          items: itemsJson,
          total_amount,
          status: 'pending'
        });

      if (error) throw error;

      alert('Order placed successfully! 您的訂單已送出！');
      setCartItems([]);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pb-24 min-h-screen">
      <Header />

      <div className="container mx-auto px-4">
        <MenuTabs
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-orange-500 w-10 h-10" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length === 0 ? (
              <div className="col-span-full text-center text-gray-400 py-10">
                No products found for this category.
              </div>
            ) : (
              filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => handleProductClick(product)}
                />
              ))
            )}
          </div>
        )}
      </div>

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={handleAddToCart}
      />

      <Cart
        items={cartItems}
        onRemoveItem={handleRemoveItem}
        onSubmitOrder={handleSubmitOrder}
        isSubmitting={isSubmitting}
      />
    </main>
  );
}

// Mock Data Helper
function getMockProducts(): Product[] {
  return [
    { id: 1, name: 'Tonkotsu Ramen', category: 'main', price: 120, description: 'Rich pork broth with chashu.', image_url: null },
    { id: 2, name: 'Shoyu Ramen', category: 'main', price: 110, description: 'Soy sauce based broth.', image_url: null },
    { id: 3, name: 'Gyoza', category: 'side', price: 50, description: 'Pan-fried dumplings.', image_url: null },
    { id: 4, name: 'Karaage', category: 'side', price: 60, description: 'Japanese fried chicken.', image_url: null },
    { id: 5, name: 'Green Tea', category: 'drink', price: 30, description: 'Hot green tea.', image_url: null },
    { id: 6, name: 'Cola', category: 'drink', price: 20, description: 'Refreshing cola.', image_url: null },
  ];
}
