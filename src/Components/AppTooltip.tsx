import {
  Colors,
  ResponsiveHeight,
  screenHeight,
  screenWidth,
  XStyleSheet,
} from '@/Theme'
import { Portal } from '@gorhom/portal'
import React, { memo, useCallback, useRef, useState } from 'react'
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
import Animated, {
  FadeIn,
  FadeInLeft,
  FadeInRight,
  ZoomIn,
} from 'react-native-reanimated'
import { Obx } from '.'
import AppText from './AppText'
interface AppTooltipProps {
  direction?:
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight'
    | 'topCenter'
    | 'bottomCenter'
  icon?: ImageSourcePropType
  svgIcon?: JSX.Element
  renderContent?: () => JSX.Element
  content?: string
  contentTextStyle?: StyleProp<TextStyle>
  contentContainerStyle?: StyleProp<ViewStyle>
  maxContentWidth?: number
  animation: 'none' | 'fade' | 'scale' | 'slide'
  children: JSX.Element
  open: boolean
  onPress?: () => void
  onClose: () => void
}
const AppTooltip = ({
  animation = 'fade',
  children,
  content,
  contentTextStyle,
  contentContainerStyle,
  maxContentWidth,
  icon,
  direction,
  renderContent,
  svgIcon,
  onPress,
  onClose,
  open,
}: AppTooltipProps) => {
  const viewRef = useRef<View>()
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    height: 50,
    width: 50,
  })
  const getEnteringType = useCallback(() => {
    switch (animation) {
      case 'fade':
        return FadeIn
      case 'scale':
        return ZoomIn
      case 'slide':
        return direction === 'topRight' || direction === 'bottomRight'
          ? FadeInLeft
          : FadeInRight
      default:
        return
    }
  }, [animation, direction])

  const _onPress = useCallback(() => {
    onPress && onPress()
    viewRef.current.measure((x, y, width, height, pageX, pageY) => {
      setPosition({ x: pageX, y: pageY, height, width })
    })
  }, [])

  const isTop = direction?.includes('top')
  const isLeft = direction?.includes('Left')
  const isRight = direction?.includes('Right')
  const isBottom = direction?.includes('bottom')

  return (
    <View>
      <Pressable onPress={_onPress} ref={viewRef}>
        {children || svgIcon || <Image source={icon} />}
      </Pressable>
      {open && (
        <Portal>
          <View style={styles.tooltipView}>
            <Pressable onPress={onClose} style={styles.backdrop} />
            <Obx>
              {() => (
                <Animated.View
                  style={[
                    styles.contentView,
                    contentContainerStyle,
                    // eslint-disable-next-line react-native/no-inline-styles
                    {
                      marginBottom: isTop ? ResponsiveHeight(8) : 0,
                      marginTop: isBottom ? ResponsiveHeight(8) : 0,
                      left: isRight ? position.x : undefined,
                      right: isLeft
                        ? screenWidth - (position.x + position.width)
                        : undefined,
                      bottom: isTop ? screenHeight - position.y : undefined,
                      top: isBottom ? position.y + position.height : undefined,
                    },
                    maxContentWidth && { maxWidth: maxContentWidth },
                  ]}
                  entering={getEnteringType()}
                >
                  {renderContent ? (
                    renderContent()
                  ) : (
                    <AppText style={contentTextStyle}>{content}</AppText>
                  )}
                </Animated.View>
              )}
            </Obx>
          </View>
        </Portal>
      )}
    </View>
  )
}

export default memo(AppTooltip)

const styles = XStyleSheet.create({
  tooltipView: {
    ...XStyleSheet.absoluteFillObject,
    zIndex: 10,
  },
  contentView: {
    position: 'absolute',
    backgroundColor: Colors.gray,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'center',
  },
  backdrop: {
    ...XStyleSheet.absoluteFillObject,
    zIndex: -1,
  },
})
