import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function MainDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { title: 'New In', count: '24' },
    { title: 'Trending Now', count: '12' },
    { title: 'Flash Sale', count: '8' },
    { title: 'Collections', count: '32' },
    { title: 'Best Sellers', count: '18' },
  ];

  const categories = [
    "Women's Fashion",
    "Men's Fashion",
    'Kids & Baby',
    'Accessories',
    'Beauty & Personal Care',
    'Sports & Outdoor',
    'Electronics',
    'Home & Living',
  ];

  return (
    <div className="absolute inset-0 z-50 pointer-events-none">
      <button 
        onClick={() => setIsOpen(true)} 
        className="absolute left-4 top-4 rounded-full p-2 hover:bg-gray-800 pointer-events-auto"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Drawer */}
      <div
        className={`pointer-events-auto absolute top-[10px] left-0 h-[calc(100%-20px)] w-[280px] transform bg-gray-900 transition-transform duration-300 ease-in-out rounded-[40px_0_0_40px] ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Content */}
        <div className="flex h-full flex-col overflow-y-auto">
          {/* User Header */}
          <div className="bg-emerald-600 p-4 rounded-tl-[40px]">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">👤</div>
              <div>
                <h3 className="font-semibold">John Doe</h3>
                <p className="text-sm text-white/80">john.doe@example.com</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 p-4">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-400">Featured</h3>
              {menuItems.map((item) => (
                <div key={item.title} className="flex items-center justify-between py-1">
                  <span className="text-sm">{item.title}</span>
                  <span className="rounded-full bg-gray-800 px-2 py-0.5 text-xs">{item.count}</span>
                </div>
              ))}
            </div>

            <div className="my-6 h-px bg-gray-800" />

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-400">Categories</h3>
              {categories.map((category) => (
                <div key={category} className="py-1">
                  <span className="text-sm">{category}</span>
                </div>
              ))}
            </div>

            <div className="my-6 h-px bg-gray-800" />

            <div className="rounded-lg bg-emerald-600/20 p-4">
              <h3 className="font-medium text-emerald-400">Premium Member</h3>
              <p className="mt-1 text-sm text-gray-300">Sign up now and get 30% off your first purchase</p>
              <button className="mt-3 w-full rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">
                Join Now
              </button>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 rounded-full bg-black/20 p-2 hover:bg-black/30"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="pointer-events-auto absolute top-[10px] left-0 right-0 bottom-[10px] bg-black/50 transition-opacity rounded-[40px]" 
          onClick={() => setIsOpen(false)} 
        />
      )}
    </div>
  );
}
