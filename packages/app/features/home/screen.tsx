"use client";

import { Anchor, Button, H1, MyMotiLink, Paragraph, Separator, Text, XStack, YStack } from '@my/ui'
import { Banana, Monitor, Moon, Sun } from '@tamagui/lucide-icons'
import { useThemeStore } from 'app/zustand'
import { useLink } from 'solito/navigation'
import { Clock } from './Clock'
import { SheetDemo } from './sheet'

const icons = {
  dark: <Moon />,
  light: <Sun />,
  system: <Monitor />,
}

export function HomeScreen({ appName = 'Tamagui' }: { appName: string }) {
  const { scheme, toggleScheme } = useThemeStore()
  const linkProps = useLink({
    href: '/user/nate',
  })

  return (
    <YStack f={1} jc="center" ai="center" p="$4" gap="$8">
      <YStack gap="$4">
        <Clock />
        <H1 ta="center" col="$color12">
          Welcome to {appName}.
        </H1>
        <Paragraph ta="center" col="$color10">
          Here's a basic starter to show navigating from one screen to another.
        </Paragraph>
        <Separator />
        <Paragraph ta="center">
          This screen uses the same code on Next.js and React Native.
        </Paragraph>
        <Separator />

        <XStack gap="$2" jc="center">
          <Paragraph ta="center">Made by</Paragraph>
          <Anchor col="$blue10" href="https://twitter.com/natebirdman" target="_blank">
            @natebirdman,
          </Anchor>
          <Banana />
          <Anchor
            col="$purple10"
            href="https://github.com/tamagui/tamagui"
            target="_blank"
            rel="noreferrer"
          >
            give it a ⭐️
          </Anchor>
        </XStack>
      </YStack>

      <XStack gap="$4" ai="center">
        <Button {...linkProps}>Link to user</Button>
        <MyMotiLink slug="/user/fernando">
          <Text ff="$body">Moti Link</Text>
        </MyMotiLink>
      </XStack>

      <SheetDemo />
      <Button pos="absolute" b={30} l={20} icon={icons[scheme]} onPress={toggleScheme} circular />
    </YStack>
  )
}
