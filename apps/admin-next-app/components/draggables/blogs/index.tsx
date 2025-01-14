import React from 'react';
import BlogsRender from './render';
import BlogsConfig from './config';
import BlogsPreview from './preview';

export default function Blogs({ mode, blockId }: { mode: 'render' | 'config' | 'preview'; blockId: string }) {
  switch (mode) {
    case 'render':
      return <BlogsRender blockId={blockId} />;
    case 'config':
      return <BlogsConfig />;
    case 'preview':
      return <BlogsPreview />;
  }
}
