import React from 'react';
import BannerSliderRender from './render';
import BannerSliderConfig from './config';
import BannerSliderPreview from './preview'

export default function BannerSlider({ mode }: { mode: 'render' | 'config' | 'preview' }) {
  switch (mode) {
    case 'render':
      return <BannerSliderRender />;
    case 'config':
      return <BannerSliderConfig />;
    case 'preview':
      return <BannerSliderPreview />;
  }
}
