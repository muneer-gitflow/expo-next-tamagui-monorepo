import React from 'react';
import AnnouncementBarRender from './render';
import AnnouncementBarConfig from './config';
import AnnouncementBarPreview from './preview';

export default function AnnouncementBar({ mode, blockId }: { mode: 'render' | 'config' | 'preview'; blockId: string }) {
  switch (mode) {
    case 'render':
      return <AnnouncementBarRender blockId={blockId} />;
    case 'config':
      return <AnnouncementBarConfig blockId={blockId} />;
    case 'preview':
      return <AnnouncementBarPreview blockId={blockId} />;
  }
}
