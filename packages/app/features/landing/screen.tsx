"use client";

import { Button, H2, Image, Input, Paragraph, ScrollView, XStack, YStack } from '@my/ui'
import { Search } from '@tamagui/lucide-icons'

export function LandingScreen() {
  return (
    <YStack backgroundColor="$background" flex={1}>
      {/* Main scrollable content */}
      <YStack flex={1} maxWidth={600} width="100%" alignSelf="center">
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          {/* Main Content Container */}
          <YStack padding="$4" gap="$4">
            {/* Search Header */}
            <XStack alignItems="center" gap="$2">
              <Input 
                flex={1} 
                placeholder="Search Trends..."
                borderRadius="$4"
                backgroundColor="$gray3"
                paddingHorizontal="$4"
              />
              <Button icon={Search} circular size="$3" />
            </XStack>

            {/* Promo Banner */}
            <YStack 
              backgroundColor="$green7" 
              borderRadius="$4" 
              padding="$4" 
              height={150}
            >
              <H2 color="white">30% OFF</H2>
              <Paragraph color="white">Today's Special!</Paragraph>
              <Paragraph color="white" size="$2">Get discount for every order, only valid for today</Paragraph>
            </YStack>

            {/* Categories */}
            <YStack gap="$2">
              <XStack justifyContent="space-between" alignItems="center">
                <H2 size="$6">Categories</H2>
              </XStack>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <XStack gap="$4" padding="$2">
                  {['Shoes', 'T-Shirts', 'Clothes', 'Jeans'].map((category) => (
                    <YStack key={category} alignItems="center" gap="$2">
                      <YStack 
                        width={60} 
                        height={60} 
                        borderRadius="$10" 
                        backgroundColor="$gray3" 
                        alignItems="center" 
                        justifyContent="center"
                      >
                        {/* Category Icon placeholder */}
                      </YStack>
                      <Paragraph size="$2">{category}</Paragraph>
                    </YStack>
                  ))}
                </XStack>
              </ScrollView>
            </YStack>

            {/* New Arrival */}
            <YStack gap="$2">
              <XStack justifyContent="space-between" alignItems="center">
                <H2 size="$6">New Arrival</H2>
                <Button variant="ghost" size="$2">View All</Button>
              </XStack>
              <XStack gap="$4" flexWrap="wrap">
                {[
                  { name: 'Polo Half T-Shirt', price: '$185.00' },
                  { name: 'Hogan Sneaker', price: '$185.00' },
                  { name: 'Women Stretch J', price: '$185.00' },
                  { name: 'Maceys Clothing', price: '$185.00' },
                ].map((item) => (
                  <YStack key={item.name} width="47%" gap="$2">
                    <YStack height={150} backgroundColor="$gray3" borderRadius="$4" />
                    <Paragraph size="$3" fontWeight="bold">{item.name}</Paragraph>
                    <Paragraph size="$3" color="$gray11">{item.price}</Paragraph>
                    <Button backgroundColor="$green7">Add to Cart</Button>
                  </YStack>
                ))}
              </XStack>
            </YStack>
          </YStack>
        </ScrollView>
      </YStack>

      {/* Bottom Navigation - Fixed */}
      <XStack 
        position="absolute" 
        bottom={0}
        left={0}
        right={0}
        backgroundColor="$background" 
        padding="$4" 
        justifyContent="space-between"
        borderTopWidth={1}
        borderColor="$gray5"
        maxWidth={600}
        alignSelf="center"
        width="100%"
        elevation={5}
      >
        {['Home', 'Wishlist', 'Cart', 'My Order', 'Account'].map((item) => (
          <YStack key={item} alignItems="center" gap="$1">
            {/* Icon placeholder */}
            <Paragraph size="$2">{item}</Paragraph>
          </YStack>
        ))}
      </XStack>
    </YStack>
  )
}
