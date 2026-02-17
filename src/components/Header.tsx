import { Soup } from 'lucide-react';

export default function Header() {
    return (
        <header className="glass-panel sticky top-0 z-50 w-full px-6 py-4 mb-6">
            <div className="flex items-center justify-between container mx-auto">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-orange-500 rounded-lg">
                        <Soup className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-white">
                        極上ラーメン
                        <span className="text-sm font-normal text-gray-400 ml-2">Premium Ramen</span>
                    </h1>
                </div>
                <div className="text-sm text-gray-400">
                    Open 11:00 - 22:00
                </div>
            </div>
        </header>
    );
}
