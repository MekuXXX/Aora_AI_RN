import { ButtonProps, StyleSheet, Text, TouchableOpacity} from 'react-native'
import React from 'react'

interface CustomButtonProps extends ButtonProps 
{
  className?: string
  textStyles?: string
}

export default function CustomButton({className, textStyles, ...props}: CustomButtonProps) {
  return (
    <TouchableOpacity {...props} className={`bg-secondary rounded-xl min-h-[48px] justify-center items-center ${className} ${props.disabled && 'opacity-50'}`}>
      <Text className={`text-lg font-psemibold text-primary ${textStyles}`}>{props.title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({})