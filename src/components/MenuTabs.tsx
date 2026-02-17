import { clsx } from 'clsx';

type Category = 'main' | 'side' | 'drink';

interface MenuTabsProps {
    activeCategory: Category;
    onCategoryChange: (category: Category) => void;
}

export default function MenuTabs({ activeCategory, onCategoryChange }: MenuTabsProps) {
    const tabs: { id: Category; label: string }[] = [
        { id: 'main', label: '主餐 (Main)' },
        { id: 'side', label: '單點 (Sides)' },
        { id: 'drink', label: '飲料 (Drinks)' },
    ];

    return (
        <div className="flex gap-2 p-1 mb-6 glass-panel rounded-xl w-fit mx-auto">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onCategoryChange(tab.id)}
                    className={clsx(
                        'px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                        activeCategory === tab.id
                            ? 'bg-orange-500 text-white shadow-lg scale-105'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                    )}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
