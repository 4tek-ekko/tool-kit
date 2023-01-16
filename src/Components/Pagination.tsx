import React, { memo, useMemo } from 'react'
import { Pressable, TextStyle, View, ViewStyle } from 'react-native'
import { Colors, XStyleSheet } from '@/Theme'
import AppText from './AppText'
import { ChevronRightSvg } from '@/Assets/Svg'
interface PaginationProps {
  maxPage: number
  currentPage: number
  onChange: (page: number) => void
  showArrows?: boolean
  style?: ViewStyle
  indicatorStyle?: ViewStyle
  indicatorActiveStyle?: ViewStyle
  indicatorInactiveStyle?: ViewStyle
  indicatorTextStyle?: TextStyle
  indicatorTextActiveStyle?: TextStyle
  indicatorTextInactiveStyle?: TextStyle
  arrowStyle?: ViewStyle
  icLeft?: React.ReactNode
  icRight?: React.ReactNode
}
const Pagination = ({
  currentPage,
  maxPage,
  onChange,
  showArrows = true,
  icLeft,
  icRight,
  arrowStyle,
  indicatorActiveStyle,
  indicatorInactiveStyle,
  indicatorStyle,
  indicatorTextActiveStyle,
  indicatorTextInactiveStyle,
  indicatorTextStyle,
  style,
}: PaginationProps) => {
  const showArrowLeft = showArrows && currentPage > 1
  const showArrowRight = showArrows && currentPage < maxPage
  const renderIndicatorItem = page => {
    if (page === 'dots') {
      return render3DotIndicator()
    }
    const isActive = page === currentPage
    const indicatorStyles = [
      styles.indicatorView,
      indicatorStyle,
      isActive
        ? { ...styles.activeIndicatorView, indicatorActiveStyle }
        : indicatorInactiveStyle,
    ]
    const indicatorTextStyles = [
      styles.indicatorText,
      indicatorTextStyle,
      isActive ? indicatorTextActiveStyle : indicatorTextInactiveStyle,
    ]
    return (
      <Pressable
        onPress={() => onChange(page)}
        key={page}
        style={indicatorStyles}
      >
        <AppText style={indicatorTextStyles}>{page}</AppText>
      </Pressable>
    )
  }
  const render3DotIndicator = () => {
    return (
      <View style={[styles.indicatorView, indicatorStyle]}>
        <AppText style={[styles.indicatorText, indicatorTextStyle]}>
          ...
        </AppText>
      </View>
    )
  }
  const Pages = useMemo(() => {
    const prePages = new Array(currentPage - 1)
      .fill(0)
      .slice(0, 2)
      .map((_, index) => index + 1)
    const postPages = new Array(maxPage - currentPage)
      .fill(0)
      .slice(-2)
      .map((_, index) => maxPage - index)
      .sort((a, b) => a - b)
    const dotArray = ['dots']
    const showDotLeft = prePages[prePages.length - 1] < currentPage - 1
    const showDotRight = postPages[0] > currentPage + 1
    return [
      ...prePages,
      ...(showDotLeft ? dotArray : []),
      currentPage,
      ...(showDotRight ? dotArray : []),
      ...postPages,
    ]
  }, [currentPage, maxPage])
  return (
    <View style={[styles.rootView, style]}>
      {showArrowLeft && (
        <Pressable
          onPress={() => onChange(currentPage - 1)}
          style={[styles.arrowView, arrowStyle]}
        >
          {icLeft || (
            <View style={{ transform: [{ rotate: '180deg' }] }}>
              <ChevronRightSvg color={Colors.white} />
            </View>
          )}
        </Pressable>
      )}
      {Pages.map(renderIndicatorItem)}
      {showArrowRight && (
        <Pressable
          onPress={() => onChange(currentPage + 1)}
          style={[styles.arrowView, arrowStyle]}
        >
          {icRight || <ChevronRightSvg color={Colors.white} />}
        </Pressable>
      )}
    </View>
  )
}

export default memo(Pagination)
const styles = XStyleSheet.create({
  rootView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  arrowView: {
    marginHorizontal: 5,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.black,
    borderRadius: 6,
  },
  indicatorView: {
    marginHorizontal: 5,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.black75,
    borderRadius: 6,
  },
  indicatorText: {
    color: Colors.white,
    fontSize: 16,
  },
  activeIndicatorView: {
    backgroundColor: Colors.primary,
  },
})
