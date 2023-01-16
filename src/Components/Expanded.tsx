import { Layout } from '@/Theme'
import React, { memo } from 'react'
import { View, ViewProps } from 'react-native'
interface ExpandedProps extends ViewProps {
  children?: React.ReactNode
}
const Expanded = ({ children, style, ...restProps }: ExpandedProps) => {
  return (
    <View {...restProps} style={[Layout.fill, style]}>
      {children}
    </View>
  )
}

export default memo(Expanded)
