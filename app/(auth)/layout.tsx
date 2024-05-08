import { ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function AuthLayout() {
  return (
    <SafeAreaView className='h-full'>
      <ScrollView>
        <Stack>
          <Stack.Screen name='sign-in' options={{ headerShown: false }}/>
          <Stack.Screen name='sign-up' options={{ headerShown: false }}/>
        </Stack>
      
        <StatusBar style={'inverted'} backgroundColor='#161622'/>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})