import React from 'react';
import ProductDetailsBasicRender from './render';
import ProductDetailsBasicConfig from './config';
import ProductDetailsBasicPreview from './preview';
import type { UIBlock } from '@/lib/store/types';

export default function ProductDetailsBasic({
  mode,
  block,
  blockId,
  isActive,
}: {
  mode: 'render' | 'config' | 'preview';
  block: UIBlock;
  blockId: string;
  isActive: boolean;
}) {
  switch (mode) {
    case 'render':
      return <ProductDetailsBasicRender blockId={blockId} isActive={isActive} />;
    case 'config':
      return <ProductDetailsBasicConfig block={block} />;
    case 'preview':
      return <ProductDetailsBasicPreview blockId={blockId} isActive={isActive} />;
  }
}
