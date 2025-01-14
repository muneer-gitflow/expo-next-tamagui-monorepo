import { Box, Text, Button, BlockStack, InlineStack, Icon } from '@shopify/polaris';
import { ArrowRightIcon, ArrowLeftIcon } from '@shopify/polaris-icons';
import { useState } from 'react';

interface PromoSlide {
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  bgColor: string;
  image?: string;
}

const PROMO_SLIDES: PromoSlide[] = [
  {
    title: "Launch Your Mobile App",
    description: "Get started with our premium features and launch your mobile app in just few days",
    ctaText: "Schedule Demo",
    ctaLink: "https://meet.gitspark.com/book-meeting",
    bgColor: "var(--p-color-bg-success-subdued)",
    image: "/assets/mobile-app.png"
  },
  {
    title: "Custom Integration Services",
    description: "Connect your existing systems with our custom integration solutions",
    ctaText: "Learn More",
    ctaLink: "https://meet.gitspark.com/book-meeting",
    bgColor: "var(--p-color-bg-info-subdued)",
    image: "/assets/integration.png"
  },
];

export function PromoSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % PROMO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + PROMO_SLIDES.length) % PROMO_SLIDES.length);
  };

  const currentPromo = PROMO_SLIDES[currentSlide];

  return (
    <Box padding="400">
      <div style={{ 
        background: currentPromo.bgColor,
        borderRadius: 'var(--p-border-radius-400)',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <Box padding="600">
          <InlineStack gap="800" align="space-between">
            <BlockStack gap="400">
              <Text as="h2" variant="headingLg">
                {currentPromo.title}
              </Text>
              <Text as="p" variant="bodyLg">
                {currentPromo.description}
              </Text>
              <Box paddingBlockStart="200">
                <Button 
                  variant="primary" 
                  onClick={() => window.open(currentPromo.ctaLink, '_blank')}
                >
                  {currentPromo.ctaText}
                </Button>
              </Box>
            </BlockStack>

            {currentPromo.image && (
              <Box>
                <img 
                  src={currentPromo.image} 
                  alt={currentPromo.title}
                  style={{ maxHeight: '200px', objectFit: 'contain' }}
                />
              </Box>
            )}
          </InlineStack>
        </Box>

        {/* Navigation Buttons */}
        <InlineStack gap="200" align="center" justify="center">
          <Button 
            icon={ArrowLeftIcon} 
            onClick={prevSlide}
            variant="tertiary"
            disabled={PROMO_SLIDES.length <= 1}
          />
          <Box paddingInline="200">
            <Text as="span" variant="bodySm">
              {currentSlide + 1} / {PROMO_SLIDES.length}
            </Text>
          </Box>
          <Button 
            icon={ArrowRightIcon} 
            onClick={nextSlide}
            variant="tertiary"
            disabled={PROMO_SLIDES.length <= 1}
          />
        </InlineStack>
      </div>
    </Box>
  );
} 