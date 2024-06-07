import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import * as AnimaTable from 'react-native-animatable';
import { VideoType } from '@/appwrite';
import { Images } from '@/constants';
import icons from '@/constants/icons';

type TrendingItemProps = {
  activeItemId: string, 
  item: VideoType
}

const zoomIn = {
  from: {
    scaleX: 0.9,
    scaleY: 0.9,
  },

  to: {
    scaleX: 1.1,
    scaleY: 1.1,

  }
}


const zoomOut = {
  from: {
    scaleX: 1,
    scaleY: 1,
  },

  to: {
    scaleX: 0.9,
    scaleY: 0.9,

  }
}

export default function TrendingItem({activeItemId,item}: TrendingItemProps) {
  const [play, setPlay] = useState<boolean>(false);

  return (
    <AnimaTable.View
      className='mr-5'
      animation={activeItemId === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {
        play ?
          <Text className='dark:text-white'>Playing</Text>
            :
          <TouchableOpacity className='relative items-center justify-center'>
            <ImageBackground 
              source={Images.cards}
              className='w-52 h-52 rounded-[35px] my-5 overflow-clip shadow-lg shadow-black/50'
              resizeMode='cover'
            />
            <Image 
              source={icons.play}
              className='absolute w-12 h-12'
              resizeMode='contain' 
            />
          </TouchableOpacity>
      }
    </AnimaTable.View>
  )
}

const styles = StyleSheet.create({})