/* eslint-disable react-native/no-inline-styles */
import { XStyleSheet } from '@/Theme'
import React, { memo } from 'react'
import { StatusBar, StatusBarProps, View, ViewStyle } from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface ContainerProps {
  children: React.ReactNode
  style?: ViewStyle
  disableTop?: boolean
  disableBottom?: boolean
  statusBarProps?: StatusBarProps
  useFading?: boolean
  containerStyle?: ViewStyle
  safeAreaColor?: string
}

const Container = ({
  children,
  disableTop = false,
  disableBottom = true,
  statusBarProps,
  safeAreaColor,
  useFading = false,
  style,
  containerStyle,
}: ContainerProps) => {
  const { bottom, top } = useSafeAreaInsets()
  return (
    <Animated.View
      entering={useFading ? FadeIn : null}
      style={[styles.container, containerStyle]}
    >
      {!disableTop && (
        <View
          style={[
            styles.bar,
            {
              height: top,
              backgroundColor:
                safeAreaColor ||
                style?.backgroundColor ||
                containerStyle?.backgroundColor,
            },
          ]}
        />
      )}
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
        {...statusBarProps}
      />
      <View style={[styles.container, style]}>{children}</View>
      {!disableBottom && (
        <View
          style={[
            styles.bar,
            {
              height: bottom > 0 ? bottom : 0,
              backgroundColor:
                safeAreaColor ||
                style?.backgroundColor ||
                containerStyle?.backgroundColor,
            },
          ]}
        />
      )}
    </Animated.View>
  )
}

export default memo(Container)

const styles = XStyleSheet.create({
  container: {
    flex: 1,
  },
  bar: {
    width: '100%',
  },
})
