import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react'
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  TextProps,
  TextInputProps,
  TextStyle,
  ViewStyle,
  TouchableWithoutFeedback,
  LayoutChangeEvent,
} from 'react-native'
import Animated, {
  useAnimatedStyle,
  withTiming,
  Easing,
  useDerivedValue,
  interpolateColor,
  FadeIn,
} from 'react-native-reanimated'

import { EyeOnSvg, EyeOffSvg } from '@/Assets/Svg'
import { Colors, Layout, XStyleSheet } from '@/Theme'
import AppText from './AppText'
import Padding from './Padding'

export interface Props extends Omit<TextInputProps, 'secureTextEntry'> {
  /** Style to the container of whole component */
  containerStyles?: ViewStyle
  /** Changes the color for hide/show password image */
  /** Set this to true if you want the label to be always at a set position. Commonly used with hint for displaying both label and hint for your input. Default false. */
  staticLabel?: boolean
  /** Hint displays only when staticLabel prop is set to true. This prop is used to show a preview of the input to the user */
  hint?: string
  /** Set the color to the hint */
  hintTextColor?: string
  /** Value for the label, same as placeholder */
  label: string
  /** Style to the label */
  labelStyles?: TextStyle
  /** Set this to true if is password to have a show/hide input and secureTextEntry automatically */
  isPassword?: true | false
  /** Callback for action submit on the keyboard */
  onSubmit?: () => void
  /** Style to the show/hide password container */
  showPasswordContainerStyles?: ViewStyle
  /** Style to the show/hide password image */
  /** Style to the input */
  inputStyles?: TextStyle
  /** Path to your custom image for show input */
  /** Path to your custom image for hide input */
  /** Custom Style for position, size and color for label, when it's focused or blurred */
  customLabelStyles?: CustomLabelProps
  /** Required if onFocus or onBlur is overrided */
  isFocused?: boolean
  /** Set a mask to your input */
  mask?: string
  /** Set mask type */
  /** Set currency thousand dividers */
  /** Maxinum number of decimal places allowed for currency mask. */
  /** Set currency on input value */
  multiline?: true | false
  /** Maxinum number of characters allowed. Overriden by mask if present */
  maxLength?: number
  /** Shows the remaining number of characters allowed to be typed if maxLength or mask are present */
  showCountdown?: true | false
  /** Style to the countdown text */
  showCountdownStyles?: TextStyle
  /** Label for the remaining number of characters allowed shown after the number */
  countdownLabel?: string
  /** Set your custom show password component */
  /** Set your custom hide password component */
  /** Callback for show/hide password */
  onTogglePassword?: (show: boolean) => void
  /** Prop for force toggling show/hide password. If set to true, shows the password, and when set to false hides it. */
  togglePassword?: boolean
  /** Add left component to your input. Usually used for displaying icon */
  leftComponent?: JSX.Element
  /** Add right component to your input. Be aware if using the input as password this component is positioned before the show/hide component */
  rightComponent?: JSX.Element
  /** Set custom animation duration. Default 300 ms */
  animationDuration?: number
  /** Label Props */
  labelProps?: TextProps
  /** Text Error when error */
  textError?: string
  errorStyle?: TextStyle
}

export interface SetGlobalStyles {
  /** Set global styles to all floating-label-inputs container */
  containerStyles?: ViewStyle
  /** Set global custom styles to all floating-label-inputs labels */
  customLabelStyles?: CustomLabelProps
  /** Set global styles to all floating-label-inputs input */
  inputStyles?: TextStyle
  /** Set global styles to all floating-label-inputs label */
  labelStyles?: TextStyle
  /** Set global styles to all floating-label-inputs show password container */
  showPasswordContainerStyles?: ViewStyle
  /** Set global styles to all floating-label-inputs show password image */
  /** Set global style to the countdown text */
  showCountdownStyles?: TextStyle
}

export interface CustomLabelProps {
  /** Absolute distance from left-most side of the input when focused */
  leftFocused?: number
  /** Absolute distance from left-most side of the input when blurred */
  leftBlurred?: number
  /** Absolute distance from center of the input when focused */
  topFocused?: number
  /** Absolute distance from center of the input when blurred */
  topBlurred?: number
  /** Font size of label the when focused */
  fontSizeFocused?: number
  /** Font size of label the when blurred */
  fontSizeBlurred?: number
  /** Font color of label the when blurred */
  colorFocused?: string
  /** Font color of label the when blurred */
  colorBlurred?: string
}

/** Set global styles for all your floating-label-inputs */
const setGlobalStyles: SetGlobalStyles = {
  /**Set global styles to all floating-label-inputs container */
  containerStyles: undefined as ViewStyle | undefined,
  /**Set global custom styles to all floating-label-inputs labels */
  customLabelStyles: undefined as CustomLabelProps | undefined,
  /**Set global styles to all floating-label-inputs input */
  inputStyles: undefined as TextStyle | undefined,
  /**Set global styles to all floating-label-inputs label */
  labelStyles: undefined as TextStyle | undefined,
  /**Set global styles to all floating-label-inputs show password container */
  showPasswordContainerStyles: undefined as ViewStyle | undefined,
  /**Set global styles to all floating-label-inputs show password image */
  /**Set global style to the countdown text */
  showCountdownStyles: undefined as TextStyle | undefined,
}

interface InputRef {
  focus(): void
  blur(): void
}

const AnimatedText = Animated.createAnimatedComponent(Text)

const InputField: React.ForwardRefRenderFunction<InputRef, Props> = (
  {
    style,
    label,
    labelProps,
    mask,
    isPassword,
    maxLength,
    inputStyles,
    showCountdown,
    showCountdownStyles,
    labelStyles,
    countdownLabel,
    onChangeText,
    isFocused,
    placeholder,
    onBlur,
    onFocus,
    onTogglePassword,
    togglePassword,
    leftComponent,
    rightComponent,
    customLabelStyles = {},
    staticLabel = false,
    hint,
    hintTextColor,
    onSubmit,
    containerStyles,
    showPasswordContainerStyles,
    multiline,
    value = '',
    animationDuration = 150,
    textError,
    errorStyle,
    ...rest
  }: Props,
  ref: any,
) => {
  const [halfTop, setHalfTop] = useState(0)
  const [isFocusedState, setIsFocused] = useState(false)
  const [secureText, setSecureText] = useState(true)
  const inputRef = useRef<any>(null)

  customLabelStyles = XStyleSheet.flatten([
    {
      fontSizeFocused: 10,
      fontSizeBlurred: 14,
      colorFocused: Colors.k49658c,
      colorBlurred: Colors.k49658c,
    },
    setGlobalStyles?.customLabelStyles,
    customLabelStyles,
  ])

  const [fontColorAnimated, setFontColorAnimated] = useState(0)

  const [fontSizeAnimated, setFontSizeAnimated] = useState(
    isFocused
      ? customLabelStyles.fontSizeFocused
        ? customLabelStyles.fontSizeFocused
        : 10
      : customLabelStyles.fontSizeBlurred
      ? customLabelStyles.fontSizeBlurred
      : 14,
  )

  const [leftAnimated, setLeftAnimated] = useState(
    staticLabel
      ? customLabelStyles?.leftFocused !== undefined
        ? customLabelStyles.leftFocused
        : 15
      : customLabelStyles && customLabelStyles.leftBlurred !== undefined
      ? customLabelStyles.leftBlurred
      : 0,
  )

  const [topAnimated, setTopAnimated] = useState(
    staticLabel
      ? customLabelStyles?.topFocused !== undefined
        ? customLabelStyles.topFocused
        : 0
      : customLabelStyles.topBlurred
      ? customLabelStyles.topBlurred
      : 0,
  )

  useEffect(() => {
    if (isFocused === undefined) {
      if (value !== '' || isFocusedState) {
        setIsFocused(true)
      } else if (value === '' || value === null) {
        setIsFocused(false)
      }
    }
  }, [value])

  useEffect(() => {
    if (isFocused !== undefined) {
      if (value !== '' || isFocused) {
        setIsFocused(true)
      } else {
        setIsFocused(false)
      }
    }
  }, [isFocused, value])

  useEffect(() => {
    if (togglePassword !== undefined) {
      _toggleVisibility(togglePassword)
    }
  }, [togglePassword])

  useEffect(() => {
    if (isFocusedState || value !== '') {
      if (halfTop !== 0) {
        animateFocus()
      }
    } else {
      animateBlur()
    }
  }, [isFocusedState, halfTop, value])

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current.focus()
    },
    blur() {
      inputRef.current.blur()
    },
  }))

  function handleFocus() {
    setIsFocused(true)
  }

  function handleBlur() {
    if (value === '') {
      setIsFocused(false)
    }
  }

  function setFocus() {
    inputRef.current?.focus()
  }

  function setBlur() {
    inputRef.current?.blur()
  }

  function _toggleVisibility(toggle?: boolean) {
    if (toggle === undefined) {
      if (onTogglePassword) {
        onTogglePassword(!secureText)
      }
      setSecureText(!secureText)
      secureText ? setFocus() : setBlur()
    } else {
      if (!((secureText && !toggle) || (!secureText && toggle))) {
        if (onTogglePassword) {
          onTogglePassword(!toggle)
        }
        setSecureText(!toggle)
        toggle ? setFocus() : setBlur()
      }
    }
  }

  function onSubmitEditing() {
    if (onSubmit !== undefined) {
      onSubmit()
    }
  }

  const _style: TextStyle = XStyleSheet.flatten([
    setGlobalStyles?.labelStyles,
    labelStyles,
    {
      alignSelf: 'center',
      position: 'absolute',
      flex: 1,
      zIndex: 999,
    },
  ])

  let input: TextStyle =
    inputStyles !== undefined
      ? inputStyles
      : setGlobalStyles?.inputStyles !== undefined
      ? setGlobalStyles.inputStyles
      : styles.input

  input = XStyleSheet.flatten([
    input,
    {
      flex: 1,
      color:
        input.color !== undefined
          ? input.color
          : customLabelStyles.colorFocused,
      zIndex: _style?.zIndex !== undefined ? _style.zIndex - 2 : 0,
    },
  ])

  containerStyles =
    containerStyles !== undefined
      ? containerStyles
      : setGlobalStyles?.containerStyles !== undefined
      ? setGlobalStyles?.containerStyles
      : styles.container

  containerStyles = XStyleSheet.flatten([
    containerStyles,
    {
      alignItems: 'center',
      flexDirection: 'row',
      flex: 1,
      zIndex: _style?.zIndex !== undefined ? _style.zIndex - 6 : 0,
    },
  ])

  let toggleButton =
    showPasswordContainerStyles !== undefined
      ? showPasswordContainerStyles
      : setGlobalStyles?.showPasswordContainerStyles !== undefined
      ? setGlobalStyles.showPasswordContainerStyles
      : styles.toggleButton

  toggleButton = XStyleSheet.flatten([
    toggleButton,
    {
      alignSelf: 'center',
    },
  ])

  async function animateFocus() {
    if (!staticLabel) {
      setLeftAnimated(
        customLabelStyles.leftFocused ? customLabelStyles.leftFocused : 0,
      )
      setFontSizeAnimated(
        customLabelStyles.fontSizeFocused
          ? customLabelStyles.fontSizeFocused
          : 10,
      )
      setTopAnimated(
        customLabelStyles.topFocused
          ? customLabelStyles.topFocused
          : -halfTop +
              (customLabelStyles.fontSizeFocused
                ? customLabelStyles.fontSizeFocused
                : 10),
      )
      setFontColorAnimated(1)
    } else {
      setFontColorAnimated(1)
    }
  }

  async function animateBlur() {
    if (!staticLabel) {
      setLeftAnimated(
        customLabelStyles.leftBlurred !== undefined
          ? customLabelStyles.leftBlurred
          : 0,
      )
      setFontSizeAnimated(
        customLabelStyles.fontSizeBlurred
          ? customLabelStyles.fontSizeBlurred
          : 14,
      )
      setTopAnimated(
        customLabelStyles.topBlurred ? customLabelStyles.topBlurred : 0,
      )
      setFontColorAnimated(0)
    } else {
      setFontColorAnimated(0)
    }
  }

  const countdown = XStyleSheet.flatten([
    styles.countdown,
    setGlobalStyles?.showCountdownStyles,
    showCountdownStyles,
  ])

  function onLayout(event: LayoutChangeEvent) {
    const { height } = event.nativeEvent.layout
    setHalfTop(height / 2)
  }

  const positionAnimations = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(leftAnimated, {
            duration: animationDuration,
            easing: Easing.in(Easing.ease),
          }),
        },
        {
          translateY: withTiming(topAnimated, {
            duration: animationDuration,
            easing: Easing.in(Easing.ease),
          }),
        },
      ],
      fontSize: withTiming(fontSizeAnimated, {
        duration: animationDuration,
        easing: Easing.in(Easing.ease),
      }),
    }
  }, [leftAnimated, topAnimated, fontSizeAnimated, animationDuration])

  const progress = useDerivedValue(() => {
    return withTiming(fontColorAnimated, {
      duration: animationDuration,
      easing: Easing.in(Easing.ease),
    })
  })

  const colorAnimation = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [
        customLabelStyles.colorBlurred !== undefined
          ? customLabelStyles.colorBlurred
          : '#000',
        customLabelStyles.colorFocused !== undefined
          ? customLabelStyles.colorFocused
          : '#000',
      ],
    )

    return {
      color,
    }
  })

  return (
    <View style={style}>
      <View>
        <TouchableWithoutFeedback
          style={Layout.fill}
          onPress={setFocus}
          onLayout={onLayout}
        >
          <View style={styles.rootView}>
            {staticLabel && (
              <AnimatedText
                {...labelProps}
                onPress={setFocus}
                style={[
                  _style,
                  colorAnimation,
                  {
                    left: labelStyles?.left
                      ? labelStyles?.left
                      : customLabelStyles.leftFocused
                      ? customLabelStyles.leftFocused
                      : 20,
                    top: -(_style?.fontSize ? _style?.fontSize : 10) / 2,
                  },
                ]}
              >
                {label}
              </AnimatedText>
            )}
            <View style={containerStyles}>
              {leftComponent && leftComponent}
              <View style={[Layout.fill, Layout.row]}>
                {!staticLabel && (
                  <AnimatedText
                    {...labelProps}
                    style={[_style, positionAnimations, colorAnimation]}
                  >
                    {label}
                  </AnimatedText>
                )}
                {label == null && !isFocusedState && (
                  <View style={_style}>
                    <Text {...labelProps} style={{ color: Colors.k49658c }}>
                      {placeholder}
                    </Text>
                  </View>
                )}
                <TextInput
                  value={value}
                  onSubmitEditing={onSubmitEditing}
                  secureTextEntry={
                    isPassword !== undefined ? isPassword && secureText : false
                  }
                  onFocus={onFocus !== undefined ? onFocus : handleFocus}
                  onBlur={onBlur !== undefined ? onBlur : handleBlur}
                  ref={inputRef}
                  {...rest}
                  maxLength={
                    mask !== undefined
                      ? mask.length
                      : maxLength !== undefined
                      ? maxLength
                      : undefined
                  }
                  placeholderTextColor={hintTextColor}
                  placeholder={
                    (staticLabel || isFocusedState) && hint ? hint : ''
                  }
                  multiline={multiline}
                  onChangeText={onChangeText}
                  style={[input, label != null && styles.marginTop4]}
                />
                {rightComponent && rightComponent}
                {isPassword && (
                  <TouchableOpacity
                    style={toggleButton}
                    onPress={() => _toggleVisibility()}
                  >
                    {secureText ? (
                      <EyeOffSvg size={14} />
                    ) : (
                      <EyeOnSvg size={14} />
                    )}
                  </TouchableOpacity>
                )}
              </View>
              {showCountdown && maxLength && (
                <Text style={countdown}>
                  {maxLength - (value ? value.length : 0)} {countdownLabel}
                </Text>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
      {textError && (
        <Animated.View entering={FadeIn}>
          <Padding top={6} />
          <AppText style={errorStyle} fontSize={12} color={Colors.error}>
            {textError}
          </AppText>
        </Animated.View>
      )}
    </View>
  )
}

const styles = XStyleSheet.create({
  rootView: { flexDirection: 'row', flexGrow: 1 },
  container: {
    flexDirection: 'row',
    color: Colors.k49658c,
    borderColor: Colors.k49658c,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 11,
    backgroundColor: '#00000000',
    paddingTop: 10,
    paddingBottom: 10,
    alignContent: 'center',
    justifyContent: 'center',
  },
  input: {
    minHeight: 28,
    color: Colors.white,
    paddingVertical: 0,
    flex: 1,
    zIndex: 10,
  },
  img: {
    height: 25,
    width: 25,
    alignSelf: 'center',
  },
  toggleButton: {
    zIndex: 11,
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  countdown: {
    position: 'absolute',
    right: 11,
    bottom: 0,
    color: Colors.k49658c,
    fontSize: 10,
  },
  marginTop4: {
    marginTop: 4,
  },
})

export default forwardRef(InputField)
