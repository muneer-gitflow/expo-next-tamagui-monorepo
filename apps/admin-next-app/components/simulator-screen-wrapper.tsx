import { useEffect } from 'react';
import Searchbar from './draggables/searchbar';
import ProductDetailNavigation from './ui/product-detail-navigation';
import { useSelector } from 'react-redux';
import type { RootState } from '@/lib/store/store';

export default function SimulatorScreenWrapper({ children }: { children: React.ReactNode }) {
  const currentScreen = useSelector((state: RootState) => state.theme.currentScreen);
  useEffect(() => {
    if (!document.getElementById('tailwind-css2')) {
      const tailwindScript = document.createElement('script');
      tailwindScript.src = 'https://cdn.tailwindcss.com';
      tailwindScript.id = 'tailwind-css';
      document.head.appendChild(tailwindScript);
    }
  }, []);

  switch (currentScreen?.name) {
    case 'home':
      return (
        <>
          <div className="flex flex-col gap-5 px-2 pb-3 noScroll h-[calc(100%-50px)] overflow-y-auto overflow-x-hidden">
            <Searchbar mode="render" blockId="searchbar" />
            {children}
          </div>
        </>
      );
    case 'product_list':
      return (
        <div className="flex flex-col gap-5 px-3 pb-3 noScroll h-[calc(100%-50px)] overflow-y-auto overflow-x-hidden">
          <ProductDetailNavigation showBackButton={true} title="Products" />
          {children}
        </div>
      );
    case 'product_details':
      return (
        <div className="flex flex-col gap-5 px-3 pb-3 noScroll h-[calc(100%-50px)] overflow-y-auto overflow-x-hidden">
          <ProductDetailNavigation showBackButton={true} title="Products" />
          {children}
        </div>
      );
    case 'collection_details':
      return (
        <div className="flex flex-col gap-5 px-3 pb-3 noScroll h-[calc(100%-50px)] overflow-y-auto overflow-x-hidden">
          <ProductDetailNavigation showBackButton={true} title="Collection" />
          {children}
        </div>
      );
    case 'cart':
      return (
        <>
          <div className="flex flex-col gap-5 px-3 pb-3 noScroll h-[calc(100%-50px)] overflow-y-auto overflow-x-hidden">
            <ProductDetailNavigation showBackButton={true} title="cart" />
            <div className="flex flex-col items-center gap-4 h-full justify-center">
              <span className="border-4 rounded-xl border-[#528F65] p-4 w-[240px]">
                <img src="/cart.png" alt="cart" />
              </span>
              <div className="flex flex-col gap-2 items-center">
                <span className="text-base font-bold text-white">Empty Cart</span>
                <span className="font-semibold text-white text-center">
                  Cart is Empty{' '}
                  <a className="text-[#528F65] underline" href="/">
                    Click here
                  </a>{' '}
                  to Continue Shopping
                </span>
              </div>
            </div>
            {children}
          </div>
        </>
      );
    default:
      return (
        <>
          <div className="flex flex-col gap-5 px-3 pb-3 noScroll h-[calc(100%-50px)] overflow-y-auto overflow-x-hidden">
            <ProductDetailNavigation showBackButton={true} title={currentScreen?.display_name} />
            {children}
          </div>
        </>
      );
  }
}
