import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image} from 'react-native'
import React from 'react'
import { Images } from '@/constants'

export default function App() {
  return (
    <SafeAreaView className='h-full'>
      <ScrollView contentContainerStyle={{ height: '100%'  }}>
        <View className='items-center justify-center w-full h-full px-4'>
          <Image 
            source={Images.logo}
            className='w-[130px] h-[84px]'
            resizeMode='contain'
          />
          <Image 
            source={Images.cards}
            className='max-w-[380px] w-full max-h-[300px]'
            resizeMode='contain'
          />

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})