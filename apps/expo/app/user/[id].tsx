import { LandingScreen } from 'app/features/landing/screen'
import { Stack } from 'expo-router'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'User',
          presentation: 'modal',
          animation: 'slide_from_right',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      />
      {/* <UserDetailScreen /> */}
      <LandingScreen />
    </>
  )
}
