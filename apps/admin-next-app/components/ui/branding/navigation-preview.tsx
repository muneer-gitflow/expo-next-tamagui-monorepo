import { Bell, Heart, Home, Search, ShoppingBag, User } from 'lucide-react';
import { MainDrawer } from '@/components/main-drawer';
import { useEffect } from 'react';

export default function NavigationPreview() {
  useEffect(() => {
    if (!document.getElementById('tailwind-css')) {
      const tailwindScript = document.createElement('script');
      tailwindScript.src = 'https://cdn.tailwindcss.com';
      tailwindScript.id = 'tailwind-css';
      document.head.appendChild(tailwindScript);
    }
  }, []);

  return (
    <>
      <div className="relative h-full bg-gray-950 text-white">
        <header className="sticky top-0 z-40 bg-gray-950 px-4 py-3">
          <div className="flex items-center gap-4">
            <MainDrawer />
            <div className="text-xl font-semibold">Trendify</div>
          </div>
          <button className="rounded-full p-2 hover:bg-gray-800">
            <Bell className="h-6 w-6" />
          </button>
        </header>

        <main className="pb-[60px]">
          {/* Search Bar */}
          <div className="px-4 py-2">
            <div className="flex items-center rounded-lg bg-gray-800 px-4 py-2">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search Trends..."
                className="ml-2 w-full bg-transparent text-sm text-white placeholder-gray-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Promotion Banner */}
          <div className="mx-4 my-4 overflow-hidden rounded-xl bg-emerald-600 bg-[url('/placeholder.svg?height=200&width=400')] bg-cover">
            <div className="bg-emerald-600/80 px-6 py-8">
              <h2 className="text-4xl font-bold">30% OFF</h2>
              <p className="mt-1 text-sm">Today's Special!</p>
              <p className="mt-1 text-xs text-gray-200">Get discount for every order, only valid for today</p>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto px-4 py-2">
            {['Discover', 'Women', 'Men', 'Shoe'].map((tab) => (
              <button
                key={tab}
                className={`rounded-full px-4 py-1.5 text-sm font-medium ${
                  tab === 'Discover' ? 'bg-emerald-600' : 'bg-gray-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Featured Products */}
          <div className="grid grid-cols-2 gap-4 px-4 py-4">
            {[
              {
                title: 'Urban Blend Long...',
                price: '$185.00',
                rating: '4.8',
                image: '/placeholder.svg?height=200&width=150',
              },
              {
                title: 'Luxe Blend Forma...',
                price: '$160.00',
                rating: '4.6',
                image: '/placeholder.svg?height=200&width=150',
              },
              {
                title: 'Urban Flex C...',
                price: '$175.00',
                rating: '4.7',
                image: '/placeholder.svg?height=200&width=150',
              },
            ].map((product, i) => (
              <div key={i} className="relative rounded-xl bg-gray-800">
                <div className="relative aspect-[3/4]">
                  <img src={product.image} alt={product.title} fill className="rounded-xl object-cover" />
                  <div className="absolute right-2 top-2 rounded-full bg-gray-900/80 px-2 py-1 text-xs">
                    ⭐ {product.rating}
                  </div>
                </div>
                <div className="p-2">
                  <h3 className="text-sm font-medium">{product.title}</h3>
                  <p className="text-sm text-emerald-400">{product.price}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-2 gap-4 px-4">
            {[
              { name: 'Women', image: '/placeholder.svg?height=100&width=200' },
              { name: 'Men', image: '/placeholder.svg?height=100&width=200' },
              { name: 'Shoe', image: '/placeholder.svg?height=100&width=200' },
              { name: 'Bag', image: '/placeholder.svg?height=100&width=200' },
              { name: 'Luxury', image: '/placeholder.svg?height=100&width=200' },
              { name: 'Kids', image: '/placeholder.svg?height=100&width=200' },
              { name: 'Sports', image: '/placeholder.svg?height=100&width=200' },
              { name: 'Beauty', image: '/placeholder.svg?height=100&width=200' },
            ].map((category, i) => (
              <div key={i} className="relative overflow-hidden rounded-xl bg-gray-800">
                <div className="relative aspect-[2/1]">
                  <img src={category.image} alt={category.name} className="object-cover" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-2">
                  <p className="text-sm font-medium">{category.name}</p>
                </div>
              </div>
            ))}
          </div>

          {/* New Arrival Section */}
          <div className="mt-6 px-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">New Arrival</h2>
              <button className="text-sm text-emerald-400">View All →</button>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {[
                {
                  title: 'Trend Craft Fleec...',
                  price: '$210.00',
                  rating: '4.9',
                  image: '/placeholder.svg?height=200&width=150',
                },
                {
                  title: 'Moda Chic Luxur...',
                  price: '$200.00',
                  rating: '4.8',
                  image: '/placeholder.svg?height=200&width=150',
                },
              ].map((product, i) => (
                <div key={i} className="relative rounded-xl bg-gray-800">
                  <div className="relative aspect-[3/4]">
                    <img src={product.image} alt={product.title} fill className="rounded-xl object-cover" />
                    <div className="absolute right-2 top-2 rounded-full bg-gray-900/80 px-2 py-1 text-xs">
                      ⭐ {product.rating}
                    </div>
                  </div>
                  <div className="p-2">
                    <h3 className="text-sm font-medium">{product.title}</h3>
                    <p className="text-sm text-emerald-400">{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hot Deals Section */}
          <div className="mt-6 px-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Hot Deals This Week</h2>
              <button className="text-sm text-emerald-400">View All →</button>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {[
                {
                  title: 'Street Style Cozy...',
                  price: '$185.00',
                  rating: '4.5',
                  image: '/placeholder.svg?height=200&width=150',
                },
                {
                  title: 'Street Style Comf...',
                  price: '$160.00',
                  rating: '4.7',
                  image: '/placeholder.svg?height=200&width=150',
                },
              ].map((product, i) => (
                <div key={i} className="relative rounded-xl bg-gray-800">
                  <div className="relative aspect-[3/4]">
                    <img src={product.image} alt={product.title} fill className="rounded-xl object-cover" />
                    <div className="absolute right-2 top-2 rounded-full bg-gray-900/80 px-2 py-1 text-xs">
                      ⭐ {product.rating}
                    </div>
                  </div>
                  <div className="p-2">
                    <h3 className="text-sm font-medium">{product.title}</h3>
                    <p className="text-sm text-emerald-400">{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        <nav className="sticky bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-gray-800 bg-gray-950 px-4 py-2">
          <button className="flex flex-col items-center text-emerald-500">
            <Home className="h-6 w-6" />
            <span className="mt-1 text-xs">Home</span>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <Heart className="h-6 w-6" />
            <span className="mt-1 text-xs">Wishlist</span>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <ShoppingBag className="h-6 w-6" />
            <span className="mt-1 text-xs">Cart</span>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <User className="h-6 w-6" />
            <span className="mt-1 text-xs">Profile</span>
          </button>
        </nav>
      </div>

      <MainDrawer />
    </>
  );
}
